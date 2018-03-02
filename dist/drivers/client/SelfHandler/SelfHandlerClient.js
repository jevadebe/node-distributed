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
var BaseClient_1 = require("../BaseClient");
var SelfHandlerClient = /** @class */ (function (_super) {
    __extends(SelfHandlerClient, _super);
    function SelfHandlerClient() {
        return _super.call(this) || this;
    }
    SelfHandlerClient.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _super.prototype.emit.call(this, "send", { event: event, args: args });
        return true;
    };
    SelfHandlerClient.prototype.receive = function (event, data) {
        _super.prototype.emit.apply(this, [event].concat(data));
    };
    return SelfHandlerClient;
}(BaseClient_1.default));
exports.default = SelfHandlerClient;
//# sourceMappingURL=SelfHandlerClient.js.map