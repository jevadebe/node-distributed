import { BaseDriver } from "../BaseDriver";
export declare class SocketIOHandlerDriver extends BaseDriver {
    private port;
    private host;
    private password;
    private server;
    private io;
    private started;
    constructor(port: number, host?: string, password?: string);
    start(): Promise<void>;
    stop(): Promise<void>;
}
