"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueuedItem = /** @class */ (function () {
    function QueuedItem(session, data, resolve, reject) {
        this.session = session;
        this.data = data;
        this.resolve = resolve;
        this.reject = reject;
    }
    return QueuedItem;
}());
exports.QueuedItem = QueuedItem;
//# sourceMappingURL=QueuedItem.js.map