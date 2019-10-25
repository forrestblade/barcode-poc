"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-implicit-dependencies */
/**
 * BarcodePicker tests
 */
var ava_1 = tslib_1.__importDefault(require("ava"));
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var node_fetch_1 = require("node-fetch");
var sinon = tslib_1.__importStar(require("sinon"));
var imageSettings_1 = require("../imageSettings");
var parser_1 = require("../parser");
var scanSettings_1 = require("../scanSettings");
var engineWorker_1 = require("./engineWorker");
function wait(ms) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, ms);
                })];
        });
    });
}
function setupSpyModuleFunctions(m) {
    m.HEAPU8 = new Uint8Array(1);
    m.HEAPU8.set = function (a, p) {
        p.a = a;
    };
    m.lengthBytesUTF8 = sinon.spy(function (_) {
        return 0;
    });
    m.UTF8ToString = sinon.spy(function (p) {
        return p.s;
    });
    m.stringToUTF8 = sinon.spy(function (s, p) {
        p.s = s;
    });
    m._malloc = sinon.spy(function (_) {
        return {};
    });
    m._free = sinon.spy();
    m._create_context = sinon.spy();
    m._scanner_settings_new_from_json = sinon.spy(function (p) {
        // Mock invalid config
        if (p.s === JSON.stringify({})) {
            return {
                s: ""
            };
        }
        return {
            s: JSON.stringify({})
        };
    });
    m._scanner_image_settings_new = sinon.spy();
    m._scanner_session_clear = sinon.spy();
    m._can_hide_logo = sinon.spy(function () {
        return 1;
    });
    m._scanner_scan = sinon.spy(function (imageData) {
        // Mock error
        if (imageData.a[0] === 255) {
            return {
                s: JSON.stringify({
                    error: {
                        errorCode: 1,
                        errorMessage: "Error."
                    }
                })
            };
        }
        return {
            s: JSON.stringify({ scanResult: [] })
        };
    });
    m._parser_parse_string = sinon.spy(function (parserType) {
        // Mock error
        if (parserType === -1) {
            return {
                s: JSON.stringify({
                    error: {
                        errorCode: 1,
                        errorMessage: "Error."
                    }
                })
            };
        }
        return {
            s: JSON.stringify({ result: { x: "y" } })
        };
    });
    m.callMain = sinon.spy();
}
var moduleInstance;
Object.defineProperty(global, "self", {
    writable: true
});
Object.defineProperty(global, "postMessage", {
    writable: true
});
Object.defineProperty(global, "window", {
    writable: true
});
Object.defineProperty(global, "document", {
    writable: true
});
global.self = global;
global.Module = {};
global.crypto = {
    subtle: {
        digest: function (_, data) {
            return Promise.resolve(crypto_1.default
                .createHash("sha256")
                .update(new DataView(data))
                .digest());
        }
    }
};
global.fetch = function (filePath) {
    return new Promise(function (resolve, reject) {
        filePath = filePath.split("?")[0];
        // tslint:disable-next-line:non-literal-fs-path
        if (!fs_1.default.existsSync(filePath)) {
            reject(new Error("File not found: " + filePath));
        }
        try {
            // tslint:disable-next-line:non-literal-fs-path
            resolve(new node_fetch_1.Response(fs_1.default.readFileSync(filePath)));
        }
        catch (error) {
            reject(error);
        }
    });
};
global.importScripts = function (filePath) {
    filePath = filePath.split("?")[0];
    // tslint:disable-next-line:non-literal-fs-path
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error("File not found: " + filePath);
    }
    moduleInstance = global.Module;
    console.log(moduleInstance);
    setupSpyModuleFunctions(moduleInstance);
    return new Promise(function (resolve) {
        // Retrieve wasmJSVersion variable
        // tslint:disable-next-line:non-literal-fs-path
        var readStream = fs_1.default.createReadStream(filePath, { encoding: "utf8" });
        readStream.on("readable", function () {
            var dataString = "";
            var character = readStream.read(1);
            while (character !== ";") {
                dataString += character;
                character = readStream.read(1);
            }
            readStream.destroy();
            var regexMatch = dataString.match(/"(.+)"/);
            if (regexMatch != null) {
                self.wasmJSVersion = regexMatch[1];
            }
            moduleInstance.instantiateWasm({ env: {} }, function () {
                moduleInstance.preRun();
                moduleInstance.onRuntimeInitialized();
                resolve();
            });
        });
    });
};
global.FS = {
    mkdir: sinon.spy(),
    mount: sinon.spy(),
    syncfs: function (_, callback) {
        callback(undefined);
    }
};
global.IDBFS = null;
global.WebAssembly.instantiate = global.WebAssembly.instantiateStreaming = function () {
    return Promise.resolve({
        module: "module",
        instance: "instance"
    });
};
global.OffscreenCanvas = function () {
    return;
};
var postMessageSpy = sinon.spy();
global.postMessage = postMessageSpy;
ava_1.default.serial("engine load", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var engineInstance, importScriptsSpy, originalSetTimeout, setTimeoutStub, fetchStub, instantiateStreamingStub, instantiateStub, instantiateStreamingFunction;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                engineInstance = engineWorker_1.engine();
                importScriptsSpy = sinon.spy(global, "importScripts");
                originalSetTimeout = global.setTimeout;
                setTimeoutStub = sinon.stub(global, "setTimeout").callsFake(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return originalSetTimeout(args[0], args[1] / 100);
                });
                // importScripts fails (js)
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./wrong-path/", "fakePath")];
            case 1:
                // importScripts fails (js)
                _a.sent();
                t.is(importScriptsSpy.callCount, 5);
                fetchStub = sinon.stub(global, "fetch").rejects();
                importScriptsSpy.resetHistory();
                engineInstance = engineWorker_1.engine();
                engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
                return [4 /*yield*/, wait(8000)];
            case 2:
                _a.sent();
                t.is(importScriptsSpy.callCount, 1);
                t.is(fetchStub.callCount, 5);
                t.false(moduleInstance.callMain.called);
                fetchStub.restore();
                importScriptsSpy.restore();
                setTimeoutStub.restore();
                instantiateStreamingStub = sinon.stub(global.WebAssembly, "instantiateStreaming").rejects();
                instantiateStub = sinon.stub(global.WebAssembly, "instantiate").rejects();
                engineInstance = engineWorker_1.engine();
                engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
                return [4 /*yield*/, wait(2000)];
            case 3:
                _a.sent();
                t.true(instantiateStreamingStub.called);
                t.true(instantiateStub.called);
                t.false(moduleInstance.callMain.called);
                // instantiateStreaming fails, instantiate succeeds
                instantiateStub.restore();
                postMessageSpy.resetHistory();
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath")];
            case 4:
                _a.sent();
                t.true(moduleInstance.callMain.called);
                t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
                instantiateStreamingStub.restore();
                instantiateStreamingFunction = global.WebAssembly.instantiateStreaming;
                global.WebAssembly.instantiateStreaming = null;
                postMessageSpy.resetHistory();
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath")];
            case 5:
                _a.sent();
                t.true(moduleInstance.callMain.called);
                t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
                global.WebAssembly.instantiateStreaming = instantiateStreamingFunction;
                // instantiateStreaming succeeds
                postMessageSpy.resetHistory();
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath")];
            case 6:
                _a.sent();
                t.true(moduleInstance.callMain.called);
                t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
                engineInstance.workOnScanQueue(); // Try to work on queue with non-ready engine
                t.is(postMessageSpy.callCount, 1);
                engineInstance.createContext("");
                t.is(postMessageSpy.callCount, 2);
                engineInstance.setSettings(JSON.stringify({})); // Try to set invalid settings
                engineInstance.workOnScanQueue(); // Try to work on queue with non-ready engine
                t.is(postMessageSpy.callCount, 2);
                engineInstance.clearSession(); // Try to clear non-existent session
                engineInstance.setImageSettings({
                    width: 1,
                    height: 1,
                    format: imageSettings_1.ImageSettings.Format.RGBA_8U
                });
                engineInstance.setImageSettings({
                    width: 1,
                    height: 1,
                    format: imageSettings_1.ImageSettings.Format.RGBA_8U
                }); // Set image settings again
                engineInstance.addScanWorkUnit({
                    requestId: 0,
                    data: new Uint8ClampedArray([0, 0, 0, 0]),
                    highQualitySingleFrameMode: true
                }); // Add work unit to allow settings to be set
                engineInstance.setSettings(new scanSettings_1.ScanSettings().toJSONString());
                engineInstance.clearSession();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("engine load - CDN", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var originalSetTimeout, setTimeoutStub, engineInstance, importScriptsSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                originalSetTimeout = global.setTimeout;
                setTimeoutStub = sinon.stub(global, "setTimeout").callsFake(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return originalSetTimeout(args[0], args[1] / 100);
                });
                engineInstance = engineWorker_1.engine();
                importScriptsSpy = sinon.spy(global, "importScripts");
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "https://cdn.jsdelivr.net/npm/scandit-sdk", "fakePath")];
            case 1:
                _a.sent();
                t.is(importScriptsSpy.callCount, 5);
                t.regex(importScriptsSpy.lastCall.args[0], /https:\/\/cdn.jsdelivr.net\/npm\/scandit-sdk@([1-9]+\.[0-9]+\.[0-9]+|%VER%)\/build\/scandit-engine-sdk.min.js/);
                engineInstance = engineWorker_1.engine();
                // tslint:disable-next-line:no-http-string
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "http://cdn.jsdelivr.net/npm/scandit-sdk@0.0.1", "fakePath")];
            case 2:
                // tslint:disable-next-line:no-http-string
                _a.sent();
                t.is(importScriptsSpy.callCount, 10);
                t.regex(importScriptsSpy.lastCall.args[0], /https:\/\/cdn.jsdelivr.net\/npm\/scandit-sdk@([1-9]+\.[0-9]+\.[0-9]+|%VER%)\/build\/scandit-engine-sdk.min.js/);
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "https://unpkg.com/scandit-sdk@4.0.0", "fakePath")];
            case 3:
                _a.sent();
                t.is(importScriptsSpy.callCount, 15);
                t.regex(importScriptsSpy.lastCall.args[0], /https:\/\/unpkg.com\/scandit-sdk@([1-9]+\.[0-9]+\.[0-9]+|%VER%)\/build\/scandit-engine-sdk.min.js/);
                engineInstance = engineWorker_1.engine();
                // tslint:disable-next-line:no-http-string
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "http://unpkg.com/scandit-sdk@0.0.1", "fakePath")];
            case 4:
                // tslint:disable-next-line:no-http-string
                _a.sent();
                t.is(importScriptsSpy.callCount, 20);
                t.regex(importScriptsSpy.lastCall.args[0], /https:\/\/unpkg.com\/scandit-sdk@([1-9]+\.[0-9]+\.[0-9]+|%VER%)\/build\/scandit-engine-sdk.min.js/);
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./wrong-path/", "fakePath")];
            case 5:
                _a.sent();
                t.is(importScriptsSpy.callCount, 25);
                t.regex(importScriptsSpy.lastCall.args[0], /^\.\/wrong-path\//);
                setTimeoutStub.restore();
                importScriptsSpy.restore();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("engine license features", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var engineInstance;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postMessageSpy.resetHistory();
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath")];
            case 1:
                _a.sent();
                t.true(moduleInstance.callMain.called);
                t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
                engineInstance.createContext("");
                t.is(postMessageSpy.callCount, 2);
                t.deepEqual(postMessageSpy.getCall(1).lastArg, [
                    "license-features",
                    {
                        hiddenScanditLogoAllowed: true
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("engine scan", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    function getWorkResult(requestId) {
        return [
            "work-result",
            {
                result: {
                    scanResult: []
                },
                requestId: requestId
            }
        ];
    }
    var engineInstance;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postMessageSpy.resetHistory();
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath")];
            case 1:
                _a.sent();
                t.true(moduleInstance.callMain.called);
                t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
                engineInstance.createContext("");
                t.is(postMessageSpy.callCount, 2);
                engineInstance.addScanWorkUnit({
                    requestId: 0,
                    data: new Uint8ClampedArray([0, 0, 0, 0]),
                    highQualitySingleFrameMode: true
                }); // Try to add work unit with non-ready engine
                t.is(postMessageSpy.callCount, 2);
                engineInstance.setSettings(new scanSettings_1.ScanSettings().toJSONString());
                engineInstance.setImageSettings({
                    width: 1,
                    height: 1,
                    format: imageSettings_1.ImageSettings.Format.RGBA_8U
                });
                engineInstance.addScanWorkUnit({
                    requestId: 1,
                    data: new Uint8ClampedArray([0, 0, 0, 0]),
                    highQualitySingleFrameMode: true
                });
                t.is(postMessageSpy.callCount, 4);
                t.deepEqual(postMessageSpy.getCall(2).lastArg, getWorkResult(0));
                t.deepEqual(postMessageSpy.getCall(3).lastArg, getWorkResult(1));
                engineInstance.setImageSettings({
                    width: 1,
                    height: 1,
                    format: imageSettings_1.ImageSettings.Format.RGB_8U
                }); // Set image settings again
                engineInstance.addScanWorkUnit({
                    requestId: 2,
                    data: new Uint8ClampedArray([0, 0, 0]),
                    highQualitySingleFrameMode: false
                });
                t.is(postMessageSpy.callCount, 5);
                t.deepEqual(postMessageSpy.getCall(4).lastArg, getWorkResult(2));
                engineInstance.setImageSettings({
                    width: 1,
                    height: 1,
                    format: imageSettings_1.ImageSettings.Format.GRAY_8U
                }); // Set image settings again
                engineInstance.addScanWorkUnit({
                    requestId: 3,
                    data: new Uint8ClampedArray([0]),
                    highQualitySingleFrameMode: false
                });
                t.is(postMessageSpy.callCount, 6);
                t.deepEqual(postMessageSpy.getCall(5).lastArg, getWorkResult(3));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("engine scan error", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var engineInstance;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postMessageSpy.resetHistory();
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath")];
            case 1:
                _a.sent();
                t.true(moduleInstance.callMain.called);
                t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
                engineInstance.createContext("");
                t.is(postMessageSpy.callCount, 2);
                engineInstance.setSettings(new scanSettings_1.ScanSettings().toJSONString());
                engineInstance.setImageSettings({
                    width: 1,
                    height: 1,
                    format: imageSettings_1.ImageSettings.Format.GRAY_8U
                });
                engineInstance.addScanWorkUnit({
                    requestId: 0,
                    data: new Uint8ClampedArray([255]),
                    highQualitySingleFrameMode: false
                });
                t.is(postMessageSpy.callCount, 3);
                t.deepEqual(postMessageSpy.getCall(2).lastArg, [
                    "work-error",
                    {
                        error: {
                            errorCode: 1,
                            errorMessage: "Error."
                        },
                        requestId: 0
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("engine parse", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var engineInstance;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postMessageSpy.resetHistory();
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath")];
            case 1:
                _a.sent();
                t.true(moduleInstance.callMain.called);
                t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
                engineInstance.addParseWorkUnit({
                    requestId: 0,
                    dataFormat: parser_1.Parser.DataFormat.DLID,
                    dataString: "test",
                    options: JSON.stringify({})
                }); // Try to add work unit with non-ready engine
                t.is(postMessageSpy.callCount, 1);
                engineInstance.createContext("");
                t.is(postMessageSpy.callCount, 2);
                engineInstance.addParseWorkUnit({
                    requestId: 1,
                    dataFormat: parser_1.Parser.DataFormat.GS1_AI,
                    dataString: "test",
                    options: JSON.stringify({})
                });
                t.is(postMessageSpy.callCount, 4);
                t.deepEqual(postMessageSpy.getCall(2).lastArg, [
                    "parse-string-result",
                    {
                        result: {
                            x: "y"
                        },
                        requestId: 0
                    }
                ]);
                t.deepEqual(postMessageSpy.getCall(3).lastArg, [
                    "parse-string-result",
                    {
                        result: {
                            x: "y"
                        },
                        requestId: 1
                    }
                ]);
                engineInstance.addParseWorkUnit({
                    requestId: 2,
                    dataFormat: parser_1.Parser.DataFormat.HIBC,
                    dataString: "test",
                    options: JSON.stringify({})
                });
                engineInstance.addParseWorkUnit({
                    requestId: 3,
                    dataFormat: parser_1.Parser.DataFormat.MRTD,
                    dataString: "test",
                    options: JSON.stringify({})
                });
                engineInstance.addParseWorkUnit({
                    requestId: 4,
                    dataFormat: parser_1.Parser.DataFormat.SWISSQR,
                    dataString: "test",
                    options: JSON.stringify({})
                });
                t.is(postMessageSpy.callCount, 7);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("engine parse error", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var engineInstance;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postMessageSpy.resetHistory();
                engineInstance = engineWorker_1.engine();
                return [4 /*yield*/, engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath")];
            case 1:
                _a.sent();
                t.true(moduleInstance.callMain.called);
                t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
                engineInstance.createContext("");
                t.is(postMessageSpy.callCount, 2);
                engineInstance.addParseWorkUnit({
                    requestId: 0,
                    dataFormat: -1,
                    dataString: "test",
                    options: JSON.stringify({})
                });
                t.is(postMessageSpy.callCount, 3);
                t.deepEqual(postMessageSpy.getCall(2).lastArg, [
                    "parse-string-error",
                    {
                        error: {
                            errorCode: 1,
                            errorMessage: "Error."
                        },
                        requestId: 0
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=engineWorker.spec.js.map