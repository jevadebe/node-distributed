
import http = require("http");
import { BaseConnection } from "./drivers/server/BaseConnection";
import { BaseDriver } from "./drivers/server/BaseDriver";
import { Session } from "./Session";

import events = require("events");

export class Server extends events.EventEmitter {
    private sessCount = 1;
    private connections: BaseConnection[] = [];

    constructor(private driver: BaseDriver) {
        super();
        this.driver.on("connect", (c: BaseConnection) => {
            c.on("authenticated", () => {
                this.connections.push(c);
                this.emit("requeue");
            });
            c.on("setHandlers", () => this.emit("requeue"));
            c.on("disconnect", () => {
                this.connections = this.connections.filter((v) => v !== c);
                for (const i of c.queue) {
                    i.session.requeue(i);
                }
            });
        });
    }

    public getConnections(sessionName: string) {
        return this.connections.filter((c) => c.sessions.indexOf(sessionName) !== -1);
    }

    public start() {
        return this.driver.start();
    }

    public session<T1, T2>(name: string) {
        return new Session<T1, T2> (this, name, this.sessCount++);
    }
}
