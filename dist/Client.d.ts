import { BaseClient } from "./drivers/client/BaseClient";
export declare class Client {
    private client;
    private handlers;
    private data;
    constructor(client: BaseClient, handlers: {
        [key: string]: (q: any, data: any) => Promise<any>;
    });
}
