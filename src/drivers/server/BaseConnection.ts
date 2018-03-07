import { QueuedItem } from "../../QueuedItem";

import events = require("events");

export abstract class BaseConnection extends events.EventEmitter {
    public sessions: string[] = [];
    public receivedData: number[] = [];
    public queue: QueuedItem[] = [];

    constructor() {
        super();
        this.on("setHandlers", (h: any) => {
            this.sessions = h;
        });
    }
}
