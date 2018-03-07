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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var SelfHandlerDriver_1 = require("../drivers/server/SelfHandler/SelfHandlerDriver");
var Server_1 = require("../Server");
var chai = require("chai");
var expect = chai.expect;
describe("Generic test", function () {
    var server;
    var shd;
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(1000000);
                        shd = new SelfHandlerDriver_1.SelfHandlerDriver({
                            test1: function (q, d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, q - 5];
                            }); }); },
                            test2: function (q, d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                throw new Error("Failed");
                            }); }); },
                            testSubstract: function (q, d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, q - d.base];
                            }); }); },
                            testSubstractWithObject: function (q, d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, q - d.base.sub];
                            }); }); },
                            testSum: function (q, d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, q + d.base];
                            }); }); },
                        });
                        server = new Server_1.Server(shd);
                        return [4 /*yield*/, server.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should handle queue", function () {
        return __awaiter(this, void 0, void 0, function () {
            var test1, _a, _b, p, i, total;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.timeout(1000000);
                        test1 = server.session("test1");
                        _a = expect;
                        return [4 /*yield*/, (test1.queue(8))];
                    case 1:
                        _a.apply(void 0, [_c.sent()]).to.equal(3);
                        _b = expect;
                        return [4 /*yield*/, (test1.queue(10))];
                    case 2:
                        _b.apply(void 0, [_c.sent()]).to.equal(5);
                        p = [];
                        for (i = 0; i < 100; i++) {
                            p.push(test1.queue(i));
                        }
                        total = 0;
                        return [4 /*yield*/, Promise.all(p)];
                    case 3:
                        (_c.sent()).forEach(function (a) { return total += a; });
                        expect(total).to.equal(4450);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should bind", function () { return __awaiter(_this, void 0, void 0, function () {
        var test1, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    test1 = server.session("test1").bind();
                    _a = expect;
                    return [4 /*yield*/, (test1(8))];
                case 1:
                    _a.apply(void 0, [_c.sent()]).to.equal(3);
                    _b = expect;
                    return [4 /*yield*/, (test1(10))];
                case 2:
                    _b.apply(void 0, [_c.sent()]).to.equal(5);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should handle errors", function () { return __awaiter(_this, void 0, void 0, function () {
        var thrown, test2, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    thrown = 0;
                    test2 = server.session("test2").bind();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (test2(8))];
                case 2:
                    _a.sent();
                    expect(thrown).to.equal(1);
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    expect(ex_1.toString()).to.equal("Error: Failed");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should correctly handle data", function () {
        return __awaiter(this, void 0, void 0, function () {
            var testSum1, testSum2, _a, _b, testSubstract, _c, _d, _e, testSubstractWithObject, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.timeout(100000);
                        testSum1 = server.session("testSum");
                        testSum1.updateData("base", 5);
                        testSum2 = server.session("testSum");
                        testSum2.updateData("base", 8);
                        _a = expect;
                        return [4 /*yield*/, (testSum1.queue(10))];
                    case 1:
                        _a.apply(void 0, [_g.sent()]).to.equal(15);
                        _b = expect;
                        return [4 /*yield*/, (testSum2.queue(14))];
                    case 2:
                        _b.apply(void 0, [_g.sent()]).to.equal(22);
                        testSum2.updateData("base", 15);
                        testSubstract = server.session("testSubstract");
                        testSubstract.updateData("base", 11);
                        _c = expect;
                        return [4 /*yield*/, (testSubstract.queue(100))];
                    case 3:
                        _c.apply(void 0, [_g.sent()]).to.equal(89);
                        _d = expect;
                        return [4 /*yield*/, (testSum1.queue(10))];
                    case 4:
                        _d.apply(void 0, [_g.sent()]).to.equal(15);
                        _e = expect;
                        return [4 /*yield*/, (testSum2.queue(14))];
                    case 5:
                        _e.apply(void 0, [_g.sent()]).to.equal(29);
                        testSubstractWithObject = server.session("testSubstractWithObject");
                        testSubstractWithObject.updateData("base", { sub: 8 });
                        _f = expect;
                        return [4 /*yield*/, (testSubstractWithObject.queue(14))];
                    case 6:
                        _f.apply(void 0, [_g.sent()]).to.equal(6);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=GenericTest.js.map