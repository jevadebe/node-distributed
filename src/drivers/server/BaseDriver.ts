import events = require("events");

import Session from "../../Session";

export default abstract class BaseDriver extends events.EventEmitter {
    public abstract async start(): Promise<void>;
}
