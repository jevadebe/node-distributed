/// <reference types="node" />
import events = require("events");
export declare abstract class BaseDriver extends events.EventEmitter {
    abstract start(): Promise<void>;
}
