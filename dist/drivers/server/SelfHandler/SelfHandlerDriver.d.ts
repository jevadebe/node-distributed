import { Client } from "../../../Client";
import { BaseDriver } from "../BaseDriver";
export declare class SelfHandlerDriver extends BaseDriver {
    private handlers;
    constructor(handlers: {
        [key: string]: (q: any, data: {
            [key: string]: any;
        }) => Promise<any>;
    });
    start(): Promise<void>;
    createClient(): Client;
}
