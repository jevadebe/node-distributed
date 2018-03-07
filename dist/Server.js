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
var Session_1 = require("./Session");
var events = require("events");
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server(driver) {
        var _this = _super.call(this) || this;
        _this.driver = driver;
        _this.sessCount = 1;
        _this.connections = [];
        _this.driver.on("connect", function (c) {
            c.on("authenticated", function () {
                _this.connections.push(c);
                _this.emit("requeue");
            });
            c.on("setHandlers", function () { return _this.emit("requeue"); });
            c.on("disconnect", function () {
                _this.connections = _this.connections.filter(function (v) { return v !== c; });
                for (var _i = 0, _a = c.queue; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i.session.requeue(i);
                }
            });
        });
        return _this;
    }
    Server.prototype.getConnections = function (sessionName) {
        return this.connections.filter(function (c) { return c.sessions.indexOf(sessionName) !== -1; });
    };
    Server.prototype.start = function () {
        return this.driver.start();
    };
    Server.prototype.session = function (name) {
        return new Session_1.Session(this, name, this.sessCount++);
    };
    return Server;
}(events.EventEmitter));
exports.Server = Server;
//# sourceMappingURL=Server.js.map