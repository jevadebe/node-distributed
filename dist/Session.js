"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueuedItem_1 = require("./QueuedItem");
var Session = /** @class */ (function () {
    function Session(server, name, sessId) {
        var _this = this;
        this.server = server;
        this.name = name;
        this.sessId = sessId;
        this.internalqueue = [];
        this.counter = 0;
        this.data = {};
        server.on("requeue", function () { return _this.executeItem(); });
    }
    Session.prototype.bind = function () {
        var _this = this;
        return function (d) { return _this.queue(d); };
    };
    Session.prototype.requeue = function (q) {
        this.internalqueue.unshift(q);
        this.executeItem();
    };
    Session.prototype.queue = function (d) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var qi = new QueuedItem_1.QueuedItem(_this, d, resolve, reject);
            _this.internalqueue.push(qi);
            _this.executeItem();
        });
    };
    Session.prototype.updateData = function (key, value) {
        var _this = this;
        this.data[key] = value;
        var conn = this.server.getConnections(this.name).filter(function (c) { return c.receivedData.indexOf(_this.sessId) !== -1; });
        for (var _i = 0, conn_1 = conn; _i < conn_1.length; _i++) {
            var c = conn_1[_i];
            c.emit("updateData", {
                data: value,
                handler: this.name,
                key: key,
                session: this.sessId,
            });
        }
    };
    Session.prototype.fullResync = function (c) {
        c.emit("updateDataFull", {
            data: this.data,
            handler: this.name,
            session: this.sessId,
        });
        c.receivedData.push(this.sessId);
    };
    Session.prototype.executeItem = function () {
        var _this = this;
        if (this.internalqueue.length > 0) {
            var item_1 = this.internalqueue[0];
            var connections_1 = this.server.getConnections(this.name).filter(function (c) { return c.queue.length === 0; });
            if (connections_1.length > 0) {
                connections_1[0].queue.push(this.internalqueue.shift());
                if (connections_1[0].receivedData.indexOf(this.sessId) === -1) {
                    this.fullResync(connections_1[0]);
                }
                var id = this.counter++;
                connections_1[0].once("feedback_" + this.sessId + "_" + id, function (f) {
                    connections_1[0].queue = connections_1[0].queue.filter(function (q) { return q !== item_1; });
                    if (f.error === null) {
                        item_1.resolve(f.output);
                    }
                    else {
                        item_1.reject(new Error(f.error));
                    }
                    _this.server.emit("requeue");
                });
                connections_1[0].emit("handle", {
                    a: item_1.data,
                    handler: this.name,
                    id: id,
                    session: this.sessId,
                });
            }
        }
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=Session.js.map