"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
var debug = require("debug")("distributed-client");
var Client = /** @class */ (function () {
    function Client(client, handlers) {
        var _this = this;
        this.client = client;
        this.handlers = handlers;
        this.data = {};
        client.setHandlers(Object.keys(handlers));
        client.on("handle", function (data) {
            if (_this.handlers[data.handler]) {
                if (_this.data[data.handler + "_" + data.session] === undefined) {
                    _this.data[data.handler + "_" + data.session] = {};
                }
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var output, ex_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                debug("Executing handler " + data.handler + " for " + data.session + " id " + data.id);
                                return [4 /*yield*/, this.handlers[data.handler](data.a, this.data[data.handler + "_" + data.session])];
                            case 1:
                                output = _a.sent();
                                debug("Successfully executed for " + data.session + " id " + data.id);
                                client.emit("feedback_" + data.session + "_" + data.id, {
                                    error: null,
                                    output: output,
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                ex_1 = _a.sent();
                                debug("Feedback for " + data.session + " id " + data.id + " error: " + ex_1.toString().substr(7));
                                client.emit("feedback_" + data.session + "_" + data.id, {
                                    error: ex_1.toString().substr(7),
                                });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 1);
            }
            else {
                debug("Handler " + data.handler + " for " + data.session + " id " + data.id + " not found");
                client.emit("feedback_" + data.session + "_" + data.id, {
                    error: "Handler " + data.handler + " not available",
                });
            }
        });
        client.on("updateDataFull", function (data) {
            debug("Received full data update for " + data.handler + " session " + data.session + " " + JSON.stringify(data.data));
            _this.data[data.handler + "_" + data.session] = data.data;
        });
        client.on("updateData", function (data) {
            debug("Received partial data update for " + data.handler + " session " + data.session + " key " + data.key + " " + data.data);
            if (_this.data[data.handler + "_" + data.session] === undefined) {
                _this.data[data.handler + "_" + data.session] = {};
            }
            _this.data[data.handler + "_" + data.session][data.key] = data.data;
        });
    }
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=Client.js.map