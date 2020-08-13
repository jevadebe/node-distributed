import { BaseConnection } from "./drivers/server/BaseConnection";
import { QueuedItem } from "./QueuedItem";
import { Server } from "./Server";

export class Session<T1, T2> {
    private internalqueue: QueuedItem[] = [];
    private counter = 0;
    private data: {[key: string]: any} = {};

    constructor(private server: Server, private name: string, private sessId: number) {
        server.on("requeue", () => this.executeItem());
    }

    public bind() {
        return (d: T1) => this.queue(d);
    }

    public requeue(q: QueuedItem) {
        this.internalqueue.unshift(q);
        this.executeItem();
    }

    public queue(d: T1, options: { retries: number, retrydelay: number } = { retries: 0, retrydelay: 0 }) {
        return new Promise<T2>((resolve, reject) => {
            const qi = new QueuedItem(this, d, resolve, reject, options);
            this.internalqueue.push(qi);
            this.executeItem();
        });
    }

    public updateData(key: string, value: any) {
        this.data[key] = value;
        const conn = this.server.getConnections(this.name).filter((c) => c.receivedData.indexOf(this.sessId) !== -1);
        for (const c of conn) {
            c.emit("updateData", {
                data: value,
                handler: this.name,
                key,
                session: this.sessId,
            });
        }
    }

    private fullResync(c: BaseConnection) {
        c.emit("updateDataFull", {
            data: this.data,
            handler: this.name,
            session: this.sessId,
        });
        c.receivedData.push(this.sessId);
    }

    private executeItem() {
        if (this.internalqueue.length > 0) {
            const connections = this.server.getConnections(this.name).filter((c) => c.queue.length === 0);
            if (connections.length > 0) {
                const item = this.internalqueue.shift();
                connections[0].queue.push(item);
                if (connections[0].receivedData.indexOf(this.sessId) === -1) {
                    this.fullResync(connections[0]);
                }
                const id = this.counter++;
                connections[0].once("feedback_" + this.sessId + "_" + id, (f: any) => {
                    connections[0].queue = connections[0].queue.filter((q) => q !== item);
                    if (f.error === null) {
                        item.resolve(f.output);
                    } else {
                        if(item.options.retries === 0) {
                            item.reject(new Error(f.error));
                        } else {
                            --item.options.retries;
                            setTimeout(() => {
                                this.internalqueue.unshift(item);
                                this.server.emit("requeue");
                            }, item.options.retrydelay || 0);
                        }
                    }
                    this.server.emit("requeue");
                });
                connections[0].emit("handle", {
                    a: item.data,
                    handler: this.name,
                    id,
                    session: this.sessId,
                });
            }
        }
    }
}
