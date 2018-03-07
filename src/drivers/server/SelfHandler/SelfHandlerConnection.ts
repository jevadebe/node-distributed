import { Session } from "../../../Session";
import { SelfHandlerClient } from "../../client/SelfHandler/SelfHandlerClient";
import { BaseConnection } from "../BaseConnection";
import { SelfHandlerDriver } from "./SelfHandlerDriver";

export class SelfHandlerConnection extends BaseConnection {
    constructor(private shd: SelfHandlerDriver, private shc: SelfHandlerClient) {
        super();
        shc.on("send", (a: any) => {
            super.emit(a.event, ...a.args);
        });
        setTimeout(() => super.emit("authenticated"), 0);
    }

    public emit(event: string | symbol, ...args: any[]): boolean {
        this.shc.receive(event, args);
        return true;
    }
}
