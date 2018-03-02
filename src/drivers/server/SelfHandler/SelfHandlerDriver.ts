import Client from "../../../Client";
import SelfHandlerClient from "../../client/SelfHandler/SelfHandlerClient";
import BaseDriver from "../BaseDriver";
import SelfHandlerConnection from "../SelfHandler/SelfHandlerConnection";

export default class SelfHandlerDriver extends BaseDriver {
    constructor(private handlers: {[key: string]: (q: any, data: {[key: string]: any}) => Promise<any> }) {
        super();
    }

    public async start() {
        for (let i = 0; i < 2; i++) {
            this.createClient();
        }
    }

    public createClient(): Client {
        const client = new SelfHandlerClient();
        this.emit("connect", new SelfHandlerConnection(this, client));
        return new Client(client, this.handlers);
    }

}
