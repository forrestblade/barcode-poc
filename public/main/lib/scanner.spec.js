"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-implicit-dependencies */
/* tslint:disable:insecure-random */
/**
 * Scanner tests
 */
var ava_1 = tslib_1.__importDefault(require("ava"));
var sinon = tslib_1.__importStar(require("sinon"));
var __1 = require("..");
var postMessageStub = sinon.stub();
var terminateStub = sinon.stub();
var stubs = [postMessageStub, terminateStub];
global.Worker = sinon.stub().returns({
    postMessage: postMessageStub,
    terminate: terminateStub
});
URL.createObjectURL = sinon.stub();
function resetStubs() {
    stubs.forEach(function (mock) {
        mock.resetHistory();
    });
}
function checkBrowserCompatibility() {
    return {
        fullSupport: true,
        scannerSupport: true,
        missingFeatures: []
    };
}
function prepareBrowserAndLibrary() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    __1.BrowserHelper.checkBrowserCompatibility = checkBrowserCompatibility;
                    return [4 /*yield*/, __1.configure("license_key")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
ava_1.default.serial("constructor", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, error, ss, is;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = t.throws(function () {
                    s = new __1.Scanner();
                });
                t.is(error.name, "UnsupportedBrowserError");
                __1.BrowserHelper.checkBrowserCompatibility = checkBrowserCompatibility;
                error = t.throws(function () {
                    s = new __1.Scanner();
                });
                t.is(error.name, "LibraryNotConfiguredError");
                return [4 /*yield*/, __1.configure("license_key")];
            case 1:
                _a.sent();
                resetStubs();
                s = new __1.Scanner();
                t.false(s.isReady());
                t.false(s.isBusyProcessing());
                t.is(postMessageStub.callCount, 3);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        deviceId: __1.BrowserHelper.getDeviceId(),
                        libraryLocation: "https://example.com/",
                        path: "/",
                        type: "load-library"
                    }
                ]);
                t.deepEqual(postMessageStub.getCall(1).args, [
                    {
                        licenseKey: "license_key",
                        type: "license-key"
                    }
                ]);
                t.deepEqual(postMessageStub.getCall(2).args, [
                    {
                        settings: new __1.ScanSettings().toJSONString(),
                        type: "settings"
                    }
                ]);
                resetStubs();
                ss = new __1.ScanSettings({
                    enabledSymbologies: __1.Barcode.Symbology.QR,
                    codeDuplicateFilter: 10,
                    maxNumberOfCodesPerFrame: 10,
                    searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 }
                });
                s = new __1.Scanner({
                    scanSettings: ss
                });
                t.is(postMessageStub.callCount, 3);
                t.deepEqual(postMessageStub.getCall(2).args, [
                    {
                        settings: ss.toJSONString(),
                        type: "settings"
                    }
                ]);
                resetStubs();
                is = {
                    width: 640,
                    height: 480,
                    format: __1.ImageSettings.Format.RGBA_8U
                };
                s = new __1.Scanner({
                    imageSettings: is
                });
                t.is(postMessageStub.callCount, 4);
                t.deepEqual(postMessageStub.getCall(3).args, [
                    {
                        imageSettings: is,
                        type: "image-settings"
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("destroy", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                s = new __1.Scanner();
                s.destroy();
                t.true(terminateStub.called);
                resetStubs();
                s = new __1.Scanner();
                s.engineWorker = null;
                s.destroy();
                t.false(terminateStub.called);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("applyScanSettings", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var ss, s;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                ss = new __1.ScanSettings({
                    enabledSymbologies: __1.Barcode.Symbology.QR,
                    codeDuplicateFilter: 10,
                    maxNumberOfCodesPerFrame: 10,
                    searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 }
                });
                s = new __1.Scanner();
                t.is(postMessageStub.callCount, 3);
                t.deepEqual(postMessageStub.getCall(2).args, [
                    {
                        settings: new __1.ScanSettings().toJSONString(),
                        type: "settings"
                    }
                ]);
                s.applyScanSettings(ss);
                t.is(postMessageStub.callCount, 4);
                t.deepEqual(postMessageStub.getCall(3).args, [
                    {
                        settings: ss.toJSONString(),
                        type: "settings"
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("applyImageSettings", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var is, s;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                is = {
                    width: 640,
                    height: 480,
                    format: __1.ImageSettings.Format.RGBA_8U
                };
                s = new __1.Scanner();
                t.is(postMessageStub.callCount, 3);
                t.deepEqual(postMessageStub.getCall(2).args, [
                    {
                        settings: new __1.ScanSettings().toJSONString(),
                        type: "settings"
                    }
                ]);
                s.applyImageSettings(is);
                t.is(postMessageStub.callCount, 4);
                t.deepEqual(postMessageStub.getCall(3).args, [
                    {
                        imageSettings: is,
                        type: "image-settings"
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("clearSession", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                s = new __1.Scanner();
                t.is(postMessageStub.callCount, 3);
                s.clearSession();
                t.is(postMessageStub.callCount, 4);
                t.deepEqual(postMessageStub.getCall(3).args, [
                    {
                        type: "clear-session"
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("addListener", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, onSpy, callbackSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                s = new __1.Scanner();
                onSpy = sinon.spy(s, "on");
                callbackSpy = sinon.spy();
                s.addListener("ready", callbackSpy);
                t.true(onSpy.calledOnceWithExactly("ready", callbackSpy));
                return [2 /*return*/];
        }
    });
}); });
// Deprecated method
ava_1.default.serial("onReady", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, onSpy, callbackSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                s = new __1.Scanner();
                onSpy = sinon.spy(s, "on");
                callbackSpy = sinon.spy();
                s.onReady(callbackSpy);
                t.true(onSpy.calledOnceWithExactly("ready", callbackSpy));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isReady & on ready", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, callbackSpy1, callbackSpy2, callbackSpy3;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                s = new __1.Scanner();
                callbackSpy1 = sinon.spy();
                callbackSpy2 = sinon.spy();
                t.false(s.isReady());
                s.on("ready", callbackSpy1);
                s.on("ready", callbackSpy2);
                t.false(callbackSpy1.called);
                t.false(callbackSpy2.called);
                s.engineWorkerOnMessage({
                    data: ["status", "example-not-ready"]
                });
                t.false(s.isReady());
                t.false(callbackSpy1.called);
                t.false(callbackSpy2.called);
                s.engineWorkerOnMessage({
                    data: ["status", "ready"]
                });
                t.true(s.isReady());
                t.true(callbackSpy1.called);
                t.true(callbackSpy2.called);
                t.true(callbackSpy2.calledAfter(callbackSpy1));
                s = new __1.Scanner();
                s.engineWorkerOnMessage({
                    data: ["status", "ready"]
                });
                callbackSpy3 = sinon.spy();
                t.true(s.isReady());
                s.on("ready", callbackSpy3);
                t.true(callbackSpy3.called);
                return [2 /*return*/];
        }
    });
}); });
// tslint:disable-next-line:max-func-body-length
ava_1.default.serial("processImage calls", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, error, imageData;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                resetStubs();
                return [4 /*yield*/, t.throwsAsync(s.processImage(new Uint8ClampedArray(0)))];
            case 2:
                error = _a.sent();
                t.is(error.name, "NoImageSettings");
                t.is(s.workerScanRequestId, 0);
                t.is(s.workerScanQueueLength, 0);
                t.false(s.isBusyProcessing());
                t.false(postMessageStub.called);
                s.applyImageSettings({
                    width: 3,
                    height: 2,
                    format: __1.ImageSettings.Format.RGBA_8U
                });
                resetStubs();
                return [4 /*yield*/, t.throwsAsync(s.processImage(new Uint8ClampedArray(0)))];
            case 3:
                error = _a.sent();
                t.is(error.name, "ImageSettingsDataMismatch");
                t.is(s.workerScanRequestId, 0);
                t.is(s.workerScanQueueLength, 0);
                t.false(s.isBusyProcessing());
                t.false(postMessageStub.called);
                resetStubs();
                imageData = Uint8ClampedArray.from({ length: 24 }, function () {
                    return Math.floor(Math.random() * 255);
                });
                s.processImage(imageData); // 3 * 2 * 4
                t.true(s.isBusyProcessing());
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "work",
                        requestId: 1,
                        data: imageData,
                        highQualitySingleFrameMode: false
                    },
                    [imageData.buffer]
                ]);
                s.applyImageSettings({
                    width: 3,
                    height: 2,
                    format: __1.ImageSettings.Format.RGB_8U
                });
                resetStubs();
                imageData = Uint8ClampedArray.from({ length: 18 }, function () {
                    return Math.floor(Math.random() * 255);
                });
                s.processImage(imageData); // 3 * 2 * 3
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "work",
                        requestId: 2,
                        data: imageData,
                        highQualitySingleFrameMode: false
                    },
                    [imageData.buffer]
                ]);
                s.applyImageSettings({
                    width: 3,
                    height: 2,
                    format: __1.ImageSettings.Format.GRAY_8U
                });
                resetStubs();
                imageData = Uint8ClampedArray.from({ length: 6 }, function () {
                    return Math.floor(Math.random() * 255);
                });
                s.processImage(imageData); // 3 * 2 * 1
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "work",
                        requestId: 3,
                        data: imageData,
                        highQualitySingleFrameMode: false
                    },
                    [imageData.buffer]
                ]);
                s.applyImageSettings({
                    width: 3,
                    height: 2,
                    format: 999 // Fake format
                });
                resetStubs();
                imageData = Uint8ClampedArray.from({ length: 6 }, function () {
                    return Math.floor(Math.random() * 255);
                });
                s.processImage(imageData); // 3 * 2 * 1
                t.is(s.workerScanRequestId, 4);
                t.is(s.workerScanQueueLength, 4);
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "work",
                        requestId: 4,
                        data: imageData,
                        highQualitySingleFrameMode: false
                    },
                    [imageData.buffer]
                ]);
                resetStubs();
                __1.BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) " +
                    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15");
                imageData = Uint8ClampedArray.from({ length: 6 }, function () {
                    return Math.floor(Math.random() * 255);
                });
                s.processImage(imageData); // 3 * 2 * 1
                __1.BrowserHelper.userAgentInfo.setUA(navigator.userAgent);
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "work",
                        requestId: 5,
                        data: imageData,
                        highQualitySingleFrameMode: false
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("processImage highQualitySingleFrameMode calls", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, error, imageData;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                resetStubs();
                return [4 /*yield*/, t.throwsAsync(s.processImage(new Uint8ClampedArray(0), true))];
            case 2:
                error = _a.sent();
                t.is(error.name, "NoImageSettings");
                t.is(s.workerScanRequestId, 0);
                t.is(s.workerScanQueueLength, 0);
                t.false(s.isBusyProcessing());
                t.false(postMessageStub.called);
                s.applyImageSettings({
                    width: 3,
                    height: 2,
                    format: __1.ImageSettings.Format.RGBA_8U
                });
                resetStubs();
                return [4 /*yield*/, t.throwsAsync(s.processImage(new Uint8ClampedArray(0), true))];
            case 3:
                error = _a.sent();
                t.is(error.name, "ImageSettingsDataMismatch");
                t.is(s.workerScanRequestId, 0);
                t.is(s.workerScanQueueLength, 0);
                t.false(s.isBusyProcessing());
                t.false(postMessageStub.called);
                resetStubs();
                imageData = Uint8ClampedArray.from({ length: 24 }, function () {
                    return Math.floor(Math.random() * 255);
                });
                s.processImage(imageData, true); // 3 * 2 * 4
                t.true(s.isBusyProcessing());
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "work",
                        requestId: 1,
                        data: imageData,
                        highQualitySingleFrameMode: true
                    },
                    [imageData.buffer]
                ]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("processImage calls with ImageData", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    function getImageFromCanvas(canvasElement) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var image = new Image();
                        image.onload = function () {
                            resolve(image);
                        };
                        image.src = canvasElement.toDataURL();
                    })];
            });
        });
    }
    var s, canvas, imageData;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                canvas = document.createElement("canvas");
                canvas.width = 3;
                canvas.height = 2;
                return [4 /*yield*/, getImageFromCanvas(canvas)];
            case 2:
                imageData = _a.sent();
                s.applyImageSettings({
                    width: 3,
                    height: 2,
                    format: __1.ImageSettings.Format.RGBA_8U
                });
                resetStubs();
                s.processImage(imageData); // 3 * 2 * 4
                t.true(s.isBusyProcessing());
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "work",
                        requestId: 1,
                        data: new Uint8ClampedArray(3 * 2 * 4),
                        highQualitySingleFrameMode: false
                    },
                    [new Uint8ClampedArray(3 * 2 * 4).buffer]
                ]);
                s.applyImageSettings({
                    width: 5,
                    height: 4,
                    format: __1.ImageSettings.Format.RGBA_8U
                });
                resetStubs();
                canvas.width = 5;
                canvas.height = 4;
                return [4 /*yield*/, getImageFromCanvas(canvas)];
            case 3:
                imageData = _a.sent();
                s.processImage(imageData); // 5 * 4 * 4
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "work",
                        requestId: 2,
                        data: new Uint8ClampedArray(5 * 4 * 4),
                        highQualitySingleFrameMode: false
                    },
                    [new Uint8ClampedArray(5 * 4 * 4).buffer]
                ]);
                return [2 /*return*/];
        }
    });
}); });
// tslint:disable-next-line:max-func-body-length
ava_1.default.serial("processImage scan results", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, imageSettings, imageData1, processImage1, imageData2, processImage2, imageData3, processImage3, error, scanResult;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                s = new __1.Scanner();
                imageSettings = {
                    width: 3,
                    height: 2,
                    format: __1.ImageSettings.Format.RGBA_8U
                };
                s.applyImageSettings(imageSettings);
                imageData1 = Uint8ClampedArray.from({ length: 24 }, function () {
                    return Math.floor(Math.random() * 255);
                });
                processImage1 = s.processImage(imageData1);
                t.true(s.isBusyProcessing());
                imageData2 = Uint8ClampedArray.from({ length: 24 }, function () {
                    return Math.floor(Math.random() * 255);
                });
                processImage2 = s.processImage(imageData2);
                imageData3 = Uint8ClampedArray.from({ length: 24 }, function () {
                    return Math.floor(Math.random() * 255);
                });
                processImage3 = s.processImage(imageData3);
                t.is(s.workerScanRequestId, 3);
                t.is(s.workerScanQueueLength, 3);
                s.engineWorkerOnMessage({
                    data: [
                        "work-error",
                        {
                            requestId: 2,
                            error: {
                                errorCode: 123,
                                errorMessage: "example_error"
                            }
                        }
                    ]
                });
                return [4 /*yield*/, t.throwsAsync(processImage2)];
            case 2:
                error = _a.sent();
                t.deepEqual(error.message, "example_error (123)");
                t.is(s.workerScanQueueLength, 2);
                s.engineWorkerOnMessage({
                    data: [
                        "work-result",
                        {
                            requestId: 1,
                            result: {
                                scanResult: [],
                                matrixScanResult: {
                                    barcodesAppeared: [],
                                    barcodesUpdated: [],
                                    barcodesLost: [],
                                    barcodesPredicted: []
                                }
                            }
                        }
                    ]
                });
                return [4 /*yield*/, processImage1];
            case 3:
                scanResult = _a.sent();
                t.deepEqual(scanResult, new __1.ScanResult([], imageData1, imageSettings));
                t.is(s.workerScanQueueLength, 1);
                s.engineWorkerOnMessage({
                    data: [
                        "work-result",
                        {
                            requestId: 3,
                            result: {
                                scanResult: [
                                    {
                                        symbology: __1.Barcode.Symbology.QR,
                                        rawData: [97, 98, 99, 100],
                                        location: [[1, 2], [3, 4], [5, 6], [7, 8]],
                                        compositeFlag: __1.Barcode.CompositeFlag.NONE,
                                        isGs1DataCarrier: false,
                                        encodingArray: [],
                                        isRecognized: true
                                    }
                                ],
                                matrixScanResult: {
                                    barcodesAppeared: [],
                                    barcodesUpdated: [],
                                    barcodesLost: [],
                                    barcodesPredicted: []
                                }
                            }
                        }
                    ]
                });
                return [4 /*yield*/, processImage3];
            case 4:
                scanResult = _a.sent();
                t.deepEqual(scanResult, new __1.ScanResult([
                    {
                        compositeFlag: __1.Barcode.CompositeFlag.NONE,
                        data: "abcd",
                        encodingArray: [],
                        isGs1DataCarrier: false,
                        location: {
                            bottomLeft: {
                                x: 7,
                                y: 8
                            },
                            bottomRight: {
                                x: 5,
                                y: 6
                            },
                            topLeft: {
                                x: 1,
                                y: 2
                            },
                            topRight: {
                                x: 3,
                                y: 4
                            }
                        },
                        rawData: new Uint8Array([97, 98, 99, 100]),
                        symbology: __1.Barcode.Symbology.QR
                    }
                ], imageData3, imageSettings));
                t.is(s.workerScanQueueLength, 0);
                s.engineWorkerOnMessage({
                    data: []
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("getImageSettings", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var ss, s;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                ss = {
                    width: 640,
                    height: 480,
                    format: __1.ImageSettings.Format.RGBA_8U
                };
                s = new __1.Scanner();
                t.is(s.getImageSettings(), undefined);
                s.applyImageSettings(ss);
                t.deepEqual(s.getImageSettings(), ss);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("getScanSettings", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var ss, s;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                ss = new __1.ScanSettings({
                    enabledSymbologies: __1.Barcode.Symbology.QR,
                    codeDuplicateFilter: 10,
                    maxNumberOfCodesPerFrame: 10,
                    searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 }
                });
                s = new __1.Scanner();
                t.deepEqual(s.getScanSettings(), new __1.ScanSettings());
                s.applyScanSettings(ss);
                t.deepEqual(s.getScanSettings(), ss);
                return [2 /*return*/];
        }
    });
}); });
// tslint:disable-next-line:max-func-body-length
ava_1.default.serial("createParserForFormat & parseString", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, parser, parseString1, parseString2, parseString3, error, resultData, parserResult, fieldsByName;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                resetStubs();
                parser = s.createParserForFormat(__1.Parser.DataFormat.DLID);
                t.not(parser, null);
                t.is(s.workerParseRequestId, 0);
                t.false(s.isBusyProcessing());
                t.false(postMessageStub.called);
                parseString1 = s.parseString(__1.Parser.DataFormat.DLID, "abcd");
                t.is(s.workerParseRequestId, 1);
                t.false(s.isBusyProcessing());
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "parse-string",
                        requestId: 1,
                        dataFormat: __1.Parser.DataFormat.DLID,
                        dataString: "abcd",
                        options: "{}"
                    }
                ]);
                resetStubs();
                parseString2 = s.parseString(__1.Parser.DataFormat.GS1_AI, "efgh");
                t.is(s.workerParseRequestId, 2);
                t.false(s.isBusyProcessing());
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "parse-string",
                        requestId: 2,
                        dataFormat: __1.Parser.DataFormat.GS1_AI,
                        dataString: "efgh",
                        options: "{}"
                    }
                ]);
                resetStubs();
                parseString3 = s.parseString(__1.Parser.DataFormat.HIBC, "ijkl", {
                    exampleOption: true
                });
                t.is(s.workerParseRequestId, 3);
                t.false(s.isBusyProcessing());
                t.is(postMessageStub.callCount, 1);
                t.deepEqual(postMessageStub.getCall(0).args, [
                    {
                        type: "parse-string",
                        requestId: 3,
                        dataFormat: __1.Parser.DataFormat.HIBC,
                        dataString: "ijkl",
                        options: '{"exampleOption":true}'
                    }
                ]);
                resetStubs();
                s.engineWorkerOnMessage({
                    data: [
                        "parse-string-error",
                        {
                            requestId: 2,
                            error: {
                                errorCode: 123,
                                errorMessage: "example_error"
                            }
                        }
                    ]
                });
                return [4 /*yield*/, t.throwsAsync(parseString2)];
            case 2:
                error = _a.sent();
                t.deepEqual(error.message, "example_error (123)");
                resultData = [
                    {
                        name: "field1",
                        parsed: 1,
                        rawString: "123"
                    },
                    {
                        name: "field2",
                        parsed: "abcd",
                        rawString: "efgh"
                    },
                    {
                        name: "field3",
                        parsed: {
                            subField1: 1,
                            subField2: 2
                        },
                        rawString: "sf1sf2"
                    }
                ];
                s.engineWorkerOnMessage({
                    data: [
                        "parse-string-result",
                        {
                            requestId: 1,
                            result: JSON.stringify(resultData)
                        }
                    ]
                });
                return [4 /*yield*/, parseString1];
            case 3:
                parserResult = _a.sent();
                fieldsByName = {};
                resultData.forEach(function (parserField) {
                    fieldsByName[parserField.name] = parserField;
                });
                t.deepEqual(parserResult, {
                    fields: resultData,
                    fieldsByName: fieldsByName,
                    jsonString: JSON.stringify(resultData)
                });
                s.engineWorkerOnMessage({
                    data: [
                        "parse-string-result",
                        {
                            requestId: 3,
                            result: JSON.stringify([])
                        }
                    ]
                });
                return [4 /*yield*/, parseString3];
            case 4:
                parserResult = _a.sent();
                t.deepEqual(parserResult, {
                    fields: [],
                    fieldsByName: {},
                    jsonString: JSON.stringify([])
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("onLicenseFeaturesReady", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, callbackSpy1, callbackSpy2, callbackSpy3;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prepareBrowserAndLibrary()];
            case 1:
                _a.sent();
                resetStubs();
                s = new __1.Scanner();
                callbackSpy1 = sinon.spy();
                callbackSpy2 = sinon.spy();
                callbackSpy3 = sinon.spy();
                s.onLicenseFeaturesReady(callbackSpy1);
                s.onLicenseFeaturesReady(callbackSpy2);
                t.false(callbackSpy1.called);
                t.false(callbackSpy2.called);
                s.engineWorkerOnMessage({
                    data: ["license-features"]
                });
                t.false(callbackSpy1.called);
                t.false(callbackSpy2.called);
                s.engineWorkerOnMessage({
                    data: [
                        "license-features",
                        {
                            hiddenScanditLogoAllowed: true
                        }
                    ]
                });
                t.true(callbackSpy1.called);
                t.true(callbackSpy2.called);
                t.true(callbackSpy2.calledAfter(callbackSpy1));
                t.deepEqual(callbackSpy1.getCall(0).args, [
                    {
                        hiddenScanditLogoAllowed: true
                    }
                ]);
                t.deepEqual(callbackSpy1.getCall(0).args, callbackSpy2.getCall(0).args);
                s.onLicenseFeaturesReady(callbackSpy3);
                t.true(callbackSpy3.called);
                t.deepEqual(callbackSpy1.getCall(0).args, callbackSpy3.getCall(0).args);
                callbackSpy1.resetHistory();
                callbackSpy2.resetHistory();
                callbackSpy3.resetHistory();
                s.engineWorkerOnMessage({
                    data: [
                        "license-features",
                        {
                            hiddenScanditLogoAllowed: true
                        }
                    ]
                });
                t.false(callbackSpy1.called);
                t.false(callbackSpy2.called);
                t.false(callbackSpy3.called);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=scanner.spec.js.map