import events = require("events");

export class BaseClient extends events.EventEmitter {
    protected handlers: string[];

    public setHandlers(handlers: string[]) {
        this.handlers = handlers;
        this.emit("setHandlers", this.handlers);
    }
}
