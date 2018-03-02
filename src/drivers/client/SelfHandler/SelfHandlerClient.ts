import BaseClient from "../BaseClient";

export default class SelfHandlerClient extends BaseClient {
    constructor() {
        super();
    }

    public emit(event: string | symbol, ...args: any[]): boolean {
        super.emit("send", { event, args });
        return true;
    }

    public receive(event: string | symbol, data: any[]) {
        super.emit(event, ...data);
    }
}
