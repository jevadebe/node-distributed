/// <reference types="node" />
import { QueuedItem } from "../../QueuedItem";
import events = require("events");
export declare abstract class BaseConnection extends events.EventEmitter {
    sessions: string[];
    receivedData: number[];
    queue: QueuedItem[];
    constructor();
}
