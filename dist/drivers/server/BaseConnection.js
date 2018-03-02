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
var BaseConnection = /** @class */ (function (_super) {
    __extends(BaseConnection, _super);
    function BaseConnection() {
        var _this = _super.call(this) || this;
        _this.sessions = [];
        _this.receivedData = [];
        _this.queue = [];
        _this.on("setHandlers", function (h) {
            _this.sessions = h;
        });
        return _this;
    }
    return BaseConnection;
}(events.EventEmitter));
exports.default = BaseConnection;
//# sourceMappingURL=BaseConnection.js.map