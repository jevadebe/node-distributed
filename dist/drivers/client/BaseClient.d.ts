/// <reference types="node" />
import events = require("events");
export declare class BaseClient extends events.EventEmitter {
    protected handlers: string[];
    setHandlers(handlers: string[]): void;
}
