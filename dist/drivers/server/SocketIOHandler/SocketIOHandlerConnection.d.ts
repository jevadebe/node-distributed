/// <reference types="socket.io" />
import { BaseConnection } from "../BaseConnection";
export declare class SocketIOHandlerConnection extends BaseConnection {
    private socket;
    private password;
    constructor(socket: SocketIO.Socket, password: string);
    emit(event: string | symbol, ...args: any[]): boolean;
}
