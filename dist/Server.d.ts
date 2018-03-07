/// <reference types="node" />
import { BaseConnection } from "./drivers/server/BaseConnection";
import { BaseDriver } from "./drivers/server/BaseDriver";
import { Session } from "./Session";
import events = require("events");
export declare class Server extends events.EventEmitter {
    private driver;
    private sessCount;
    private connections;
    constructor(driver: BaseDriver);
    getConnections(sessionName: string): BaseConnection[];
    start(): Promise<void>;
    session<T1, T2>(name: string): Session<T1, T2>;
}
