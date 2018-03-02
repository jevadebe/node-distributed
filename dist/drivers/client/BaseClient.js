"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events = require("events");
var BaseClient = /** @class */ (function (_super) {
    __extends(BaseClient, _super);
    function BaseClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseClient.prototype.setHandlers = function (handlers) {
        this.handlers = handlers;
        this.emit("setHandlers", this.handlers);
    };
    return BaseClient;
}(events.EventEmitter));
exports.default = BaseClient;
//# sourceMappingURL=BaseClient.js.map