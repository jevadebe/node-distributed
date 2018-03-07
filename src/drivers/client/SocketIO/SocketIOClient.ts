import http = require("http");
import socketioclient = require("socket.io-client");

import { BaseClient } from "../BaseClient";

export class SocketIOClient extends BaseClient {
    private socket: SocketIOClient.Socket;

    constructor(private url: string, private password: string) {
        super();

        this.socket = socketioclient(url, {
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax : 5000,
            transports: ["websocket"],
          });

        this.socket.on("connect", () => {
            this.socket.emit("authenticate", password);
            this.socket.emit("setHandlers", this.handlers);
        });

        this.socket.on("send", (e: any) => {
            super.emit(e.event, ...e.args);
        });

    }

    public emit(event: string | symbol, ...args: any[]): boolean {
        this.socket.emit("send", { event, args });
        return true;
    }

    public stop() {
        this.socket.close();
    }
}
