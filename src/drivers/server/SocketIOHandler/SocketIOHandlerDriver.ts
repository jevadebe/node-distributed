import Client from "../../../Client";
import SelfHandlerClient from "../../client/SelfHandler/SelfHandlerClient";
import BaseDriver from "../BaseDriver";
import SelfHandlerConnection from "../SelfHandler/SelfHandlerConnection";

import http = require("http");
import * as socketIo from "socket.io";
import util = require("util");
import SocketIOHandlerConnection from "./SocketIOHandlerConnection";

export default class SocketIOHandlerDriver extends BaseDriver {
    private server: http.Server;
    private io: SocketIO.Server;
    private started = false;

    constructor(private port: number, private host = "0.0.0.0", private password = "") {
        super();
    }

    public async start() {
        if (this.started) {
            throw new Error("Already started Socket IO driver");
        }
        this.started = true;

        this.server = http.createServer();

        this.io = socketIo(this.server);
        this.server.listen(this.port, this.host);

        const self = this;
        this.io.on("connect", (socket: SocketIO.Socket) => {
            this.emit("connect", new SocketIOHandlerConnection(socket, this.password));
        });
    }

    public async stop() {
        this.server.close();
    }
}
