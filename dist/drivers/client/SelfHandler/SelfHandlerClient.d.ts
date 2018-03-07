import { BaseClient } from "../BaseClient";
export declare class SelfHandlerClient extends BaseClient {
    constructor();
    emit(event: string | symbol, ...args: any[]): boolean;
    receive(event: string | symbol, data: any[]): void;
}
