import { Client } from "../../../Client";
import { SelfHandlerClient } from "../../client/SelfHandler/SelfHandlerClient";
import { BaseDriver } from "../BaseDriver";
import { SelfHandlerConnection } from "../SelfHandler/SelfHandlerConnection";

import http = require("http");
import * as socketIo from "socket.io";
import util = require("util");
import { SocketIOHandlerConnection } from "./SocketIOHandlerConnection";

export class SocketIOHandlerDriver extends BaseDriver {
    private server: http.Server;
    private io: SocketIO.Server;
    private started = false;
    private port: number;

    constructor(server: http.Server)
    constructor(port: number, host: string, password: string)
    constructor(portOrServer: number|http.Server, private host = "0.0.0.0", private password = "") {
        super();
        if(portOrServer instanceof http.Server) {
            this.server = portOrServer;
        } else {
            this.server = http.createServer();
            this.port = portOrServer;
            this.server.listen(this.port, this.host);
        }
        this.io = socketIo(this.server);
    }

    public async start() {
        if (this.started) {
            throw new Error("Already started Socket IO driver");
        }
        this.started = true;

        const self = this;
        this.io.on("connect", (socket: SocketIO.Socket) => {
            this.emit("connect", new SocketIOHandlerConnection(socket, this.password));
        });
    }

    public async stop() {
        this.server.close();
    }
}
