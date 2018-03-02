import Session from "../../../Session";
import SelfHandlerClient from "../../client/SelfHandler/SelfHandlerClient";
import BaseConnection from "../BaseConnection";

export default class SocketIOHandlerConnection extends BaseConnection {
    constructor(private socket: SocketIO.Socket, private password: string) {
        super();

        socket.on("authenticate", async (p: string) => {
            if (p === this.password) {
                setTimeout(() => super.emit("authenticated"), 0);
            }
        });

        socket.on("send", (m: any) => {
            if (m.event !== "authenticated") {
                super.emit(m.event, ...m.args);
            }
        });

        socket.on("disconnect", () => {
            this.emit("disconnect");
        });
    }

    public emit(event: string | symbol, ...args: any[]): boolean {
        this.socket.emit("send", { event, args });
        return true;
    }
}
