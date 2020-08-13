import { Session } from "./Session";

export class QueuedItem {
    constructor(
        public session: Session<any, any>,
        public data: any,
        public resolve: (data: any) => void,
        public reject: (data: any) => void,
        public options: { retries: number, retrydelay: number}
    ) { }
}
