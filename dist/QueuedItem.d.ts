import { Session } from "./Session";
export declare class QueuedItem {
    session: Session<any, any>;
    data: any;
    resolve: (data: any) => void;
    reject: (data: any) => void;
    constructor(session: Session<any, any>, data: any, resolve: (data: any) => void, reject: (data: any) => void);
}
