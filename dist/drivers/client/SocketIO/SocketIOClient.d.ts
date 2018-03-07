import { BaseClient } from "../BaseClient";
export declare class SocketIOClient extends BaseClient {
    private url;
    private password;
    private socket;
    constructor(url: string, password: string);
    emit(event: string | symbol, ...args: any[]): boolean;
    stop(): void;
}
