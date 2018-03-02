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
var BaseConnection_1 = require("../BaseConnection");
var SelfHandlerConnection = /** @class */ (function (_super) {
    __extends(SelfHandlerConnection, _super);
    function SelfHandlerConnection(shd, shc) {
        var _this = _super.call(this) || this;
        _this.shd = shd;
        _this.shc = shc;
        shc.on("send", function (a) {
            _super.prototype.emit.apply(_this, [a.event].concat(a.args));
        });
        setTimeout(function () { return _super.prototype.emit.call(_this, "authenticated"); }, 0);
        return _this;
    }
    SelfHandlerConnection.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.shc.receive(event, args);
        return true;
    };
    return SelfHandlerConnection;
}(BaseConnection_1.default));
exports.default = SelfHandlerConnection;
//# sourceMappingURL=SelfHandlerConnection.js.map