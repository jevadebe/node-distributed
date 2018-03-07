import { QueuedItem } from "./QueuedItem";
import { Server } from "./Server";
export declare class Session<T1, T2> {
    private server;
    private name;
    private sessId;
    private internalqueue;
    private counter;
    private data;
    constructor(server: Server, name: string, sessId: number);
    bind(): (d: T1) => Promise<T2>;
    requeue(q: QueuedItem): void;
    queue(d: T1): Promise<T2>;
    updateData(key: string, value: any): void;
    private fullResync(c);
    private executeItem();
}
