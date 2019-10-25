"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-implicit-dependencies */
/**
 * Parser tests
 */
var ava_1 = tslib_1.__importDefault(require("ava"));
var sinon = tslib_1.__importStar(require("sinon"));
var __1 = require("..");
global.Worker = sinon.stub().returns({
    postMessage: sinon.stub(),
    terminate: sinon.stub()
});
URL.createObjectURL = sinon.stub();
function prepareBrowserAndLibrary() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    __1.BrowserHelper.checkBrowserCompatibility = function () {
                        return {
                            fullSupport: true,
                            scannerSupport: true,
                            missingFeatures: []
                        };
                    };
                    return [4 /*yield*/, __1.configure("license_key")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
ava_1.default("constructor", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, p;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                p = new __1.Parser(s, __1.Parser.DataFormat.DLID);
                t.is(p.scanner, s);
                t.is(p.dataFormat, __1.Parser.DataFormat.DLID);
                t.is(p.options, undefined);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("setOptions", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, p;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                p = new __1.Parser(s, __1.Parser.DataFormat.DLID);
                t.is(p.options, undefined);
                p.setOptions({});
                t.deepEqual(p.options, {});
                p.setOptions({
                    option1: true
                });
                t.deepEqual(p.options, {
                    option1: true
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("parseString", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, p, parseStringSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                p = new __1.Parser(s, __1.Parser.DataFormat.DLID);
                parseStringSpy = sinon.spy(s, "parseString");
                p.parseString("");
                t.is(parseStringSpy.callCount, 1);
                t.deepEqual(parseStringSpy.getCall(0).args, [__1.Parser.DataFormat.DLID, "", undefined]);
                p.parseString("abcd");
                t.is(parseStringSpy.callCount, 2);
                t.deepEqual(parseStringSpy.getCall(1).args, [__1.Parser.DataFormat.DLID, "abcd", undefined]);
                p.setOptions({
                    option1: true
                });
                p.parseString("abcd");
                t.is(parseStringSpy.callCount, 3);
                t.deepEqual(parseStringSpy.getCall(2).args, [
                    __1.Parser.DataFormat.DLID,
                    "abcd",
                    {
                        option1: true
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("parseRawData", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, p, parseStringSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                p = new __1.Parser(s, __1.Parser.DataFormat.DLID);
                parseStringSpy = sinon.spy(s, "parseString");
                p.parseRawData(new Uint8Array([]));
                t.is(parseStringSpy.callCount, 1);
                t.deepEqual(parseStringSpy.getCall(0).args, [__1.Parser.DataFormat.DLID, "", undefined]);
                p.parseRawData(new Uint8Array([97, 98, 99, 100]));
                t.is(parseStringSpy.callCount, 2);
                t.deepEqual(parseStringSpy.getCall(1).args, [__1.Parser.DataFormat.DLID, "abcd", undefined]);
                p.setOptions({
                    option1: true
                });
                p.parseRawData(new Uint8Array([97, 98, 99, 100]));
                t.is(parseStringSpy.callCount, 3);
                t.deepEqual(parseStringSpy.getCall(2).args, [
                    __1.Parser.DataFormat.DLID,
                    "abcd",
                    {
                        option1: true
                    }
                ]);
                p.setOptions();
                p.parseRawData(new Uint8Array([255]));
                t.is(parseStringSpy.callCount, 4);
                t.deepEqual(parseStringSpy.getCall(3).args, [__1.Parser.DataFormat.DLID, "", undefined]);
                p.parseRawData(new Uint8Array([97, 98, 99, 100, 128]));
                t.is(parseStringSpy.callCount, 5);
                t.deepEqual(parseStringSpy.getCall(4).args, [__1.Parser.DataFormat.DLID, "", undefined]);
                p.parseRawData(new Uint8Array([1, 2, 9, 32, 13, 10]));
                t.is(parseStringSpy.callCount, 6);
                t.deepEqual(parseStringSpy.getCall(5).args, [__1.Parser.DataFormat.DLID, "\u0001\u0002\t \r\n", undefined]);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=parser.spec.js.map