import { BaseClient } from "./drivers/client/BaseClient";

// tslint:disable-next-line:no-var-requires
const debug = require("debug")("distributed-client");
import events = require("events");

export class Client extends events.EventEmitter {
    private data: {[key: string]: {[key: string]: any}} = {};

    constructor(private client: BaseClient, private handlers: {[key: string]: (q: any, data: any) => Promise<any> }) {
        super();
        client.setHandlers(Object.keys(handlers));
        client.on("handle", (data: any) => {
            if (this.handlers[data.handler]) {
                if (this.data[data.handler + "_" + data.session] === undefined) {
                    this.data[data.handler + "_" + data.session] = {};
                }
                setTimeout(async () => {
                    try {
                        debug("Executing handler " + data.handler + " for " + data.session + " id " + data.id);
                        const output = await this.handlers[data.handler](data.a, this.data[data.handler + "_" + data.session]);
                        debug("Successfully executed for " + data.session + " id " + data.id);
                        client.emit("feedback_" + data.session + "_" + data.id, {
                            error: null,
                            output,
                        });
                    } catch (ex) {
                        debug("Feedback for " + data.session + " id " + data.id + " error: " + ex.toString().substr(7));
                        client.emit("feedback_" + data.session + "_" + data.id, {
                            error: ex.toString().substr(7),
                        });
                    }
                }, 1);
            } else {
                debug("Handler " + data.handler + " for " + data.session + " id " + data.id + " not found");
                client.emit("feedback_" + data.session + "_" + data.id, {
                    error: "Handler " + data.handler + " not available",
                });
            }
        });

        client.on("updateDataFull", (data: any) => {
            debug("Received full data update for " + data.handler + " session " + data.session + " " + JSON.stringify(data.data));
            this.data[data.handler + "_" + data.session] = data.data;
            this.emit("updateData", data);
        });

        client.on("updateData", (data: any) => {
            debug("Received partial data update for " + data.handler + " session " + data.session + " key " + data.key + " " + data.data);
            if (this.data[data.handler + "_" + data.session] === undefined) {
                this.data[data.handler + "_" + data.session] = {};
            }
            this.data[data.handler + "_" + data.session][data.key] = data.data;
            this.emit("updateData", data);
        });
    }
}
