import { SelfHandlerClient } from "../../client/SelfHandler/SelfHandlerClient";
import { BaseConnection } from "../BaseConnection";
import { SelfHandlerDriver } from "./SelfHandlerDriver";
export declare class SelfHandlerConnection extends BaseConnection {
    private shd;
    private shc;
    constructor(shd: SelfHandlerDriver, shc: SelfHandlerClient);
    emit(event: string | symbol, ...args: any[]): boolean;
}
