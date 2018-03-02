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
var socketioclient = require("socket.io-client");
var BaseClient_1 = require("../BaseClient");
var SelfHandlerClient = /** @class */ (function (_super) {
    __extends(SelfHandlerClient, _super);
    function SelfHandlerClient(url, password) {
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.password = password;
        _this.socket = socketioclient(url, {
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            transports: ["websocket"],
        });
        _this.socket.on("connect", function () {
            _this.socket.emit("authenticate", password);
            _this.socket.emit("setHandlers", _this.handlers);
        });
        _this.socket.on("send", function (e) {
            _super.prototype.emit.apply(_this, [e.event].concat(e.args));
        });
        return _this;
    }
    SelfHandlerClient.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.socket.emit("send", { event: event, args: args });
        return true;
    };
    SelfHandlerClient.prototype.stop = function () {
        this.socket.close();
    };
    return SelfHandlerClient;
}(BaseClient_1.default));
exports.default = SelfHandlerClient;
//# sourceMappingURL=SocketIOClient.js.map