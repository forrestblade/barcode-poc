"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-implicit-dependencies */
/**
 * BarcodePickerGui tests
 */
var ava_1 = tslib_1.__importDefault(require("ava"));
var sinon = tslib_1.__importStar(require("sinon"));
var __1 = require("..");
var barcodePickerGui_1 = require("./barcodePickerGui");
var imageSettings_1 = require("./imageSettings");
var defaultBarcodePickerGuiOptions = {
    scanner: sinon.createStubInstance(__1.Scanner, {
        getScanSettings: new __1.ScanSettings()
    }),
    originElement: document.createElement("div"),
    singleImageMode: false,
    scanningPaused: false,
    visible: true,
    guiStyle: __1.BarcodePicker.GuiStyle.LASER,
    videoFit: __1.BarcodePicker.ObjectFit.CONTAIN,
    laserArea: undefined,
    viewfinderArea: undefined,
    cameraUploadCallback: function () {
        return Promise.resolve();
    },
    hideLogo: false
};
function defineConfigurableProperty(object, property, value) {
    Object.defineProperty(object, property, {
        value: value,
        configurable: true
    });
}
ava_1.default("constructor & destroy", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var gui;
    return tslib_1.__generator(this, function (_a) {
        gui = new barcodePickerGui_1.BarcodePickerGui(tslib_1.__assign({}, defaultBarcodePickerGuiOptions, { visible: false }));
        gui.destroy();
        t.pass();
        __1.BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) " +
            "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15");
        gui = new barcodePickerGui_1.BarcodePickerGui(tslib_1.__assign({}, defaultBarcodePickerGuiOptions, { singleImageMode: true, scanningPaused: true, guiStyle: __1.BarcodePicker.GuiStyle.VIEWFINDER, videoFit: __1.BarcodePicker.ObjectFit.COVER, hideLogo: true }));
        gui.destroy();
        t.pass();
        return [2 /*return*/];
    });
}); });
ava_1.default("constructor visible option & isVisible & setVisible", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var gui;
    return tslib_1.__generator(this, function (_a) {
        gui = new barcodePickerGui_1.BarcodePickerGui(defaultBarcodePickerGuiOptions);
        t.is(gui.isVisible(), true);
        gui.setVisible(false);
        t.is(gui.isVisible(), false);
        gui.setVisible(true);
        t.is(gui.isVisible(), true);
        gui = new barcodePickerGui_1.BarcodePickerGui(tslib_1.__assign({}, defaultBarcodePickerGuiOptions, { visible: false, guiStyle: __1.BarcodePicker.GuiStyle.VIEWFINDER }));
        t.is(gui.isVisible(), false);
        gui.setVisible(true);
        t.is(gui.isVisible(), true);
        return [2 /*return*/];
    });
}); });
ava_1.default("constructor guiStyle option & setGuiStyle", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var gui;
    return tslib_1.__generator(this, function (_a) {
        gui = new barcodePickerGui_1.BarcodePickerGui(defaultBarcodePickerGuiOptions);
        t.is(gui.guiStyle, __1.BarcodePicker.GuiStyle.LASER);
        gui.setGuiStyle(__1.BarcodePicker.GuiStyle.VIEWFINDER);
        t.is(gui.guiStyle, __1.BarcodePicker.GuiStyle.VIEWFINDER);
        gui.setGuiStyle(__1.BarcodePicker.GuiStyle.NONE);
        t.is(gui.guiStyle, __1.BarcodePicker.GuiStyle.NONE);
        gui.setGuiStyle("invalid");
        t.is(gui.guiStyle, __1.BarcodePicker.GuiStyle.NONE);
        gui = new barcodePickerGui_1.BarcodePickerGui(tslib_1.__assign({}, defaultBarcodePickerGuiOptions, { singleImageMode: true }));
        gui.flashGUI();
        t.is(gui.guiStyle, __1.BarcodePicker.GuiStyle.NONE);
        gui.setGuiStyle(__1.BarcodePicker.GuiStyle.LASER);
        t.is(gui.guiStyle, __1.BarcodePicker.GuiStyle.NONE);
        return [2 /*return*/];
    });
}); });
ava_1.default("reassignOriginElement", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var originElement1, originElement2, gui;
    return tslib_1.__generator(this, function (_a) {
        originElement1 = document.createElement("div");
        originElement2 = document.createElement("div");
        gui = new barcodePickerGui_1.BarcodePickerGui(tslib_1.__assign({}, defaultBarcodePickerGuiOptions, { originElement: originElement1 }));
        t.deepEqual(gui.originElement, originElement1);
        gui.reassignOriginElement(originElement2);
        t.deepEqual(gui.originElement, originElement2);
        gui.setVisible(false);
        gui.reassignOriginElement(originElement1);
        t.deepEqual(gui.originElement, originElement1);
        t.true(originElement1.classList.contains(barcodePickerGui_1.BarcodePickerGui.hiddenClassName));
        t.false(originElement2.classList.contains(barcodePickerGui_1.BarcodePickerGui.hiddenClassName));
        gui.reassignOriginElement(originElement2);
        t.deepEqual(gui.originElement, originElement2);
        t.false(originElement1.classList.contains(barcodePickerGui_1.BarcodePickerGui.hiddenClassName));
        t.true(originElement2.classList.contains(barcodePickerGui_1.BarcodePickerGui.hiddenClassName));
        return [2 /*return*/];
    });
}); });
ava_1.default("flashGUI", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var gui, flashLaserSpy, flashViewfinderSpy;
    return tslib_1.__generator(this, function (_a) {
        gui = new barcodePickerGui_1.BarcodePickerGui(tslib_1.__assign({}, defaultBarcodePickerGuiOptions, { guiStyle: __1.BarcodePicker.GuiStyle.NONE }));
        flashLaserSpy = sinon.spy(gui, "flashLaser");
        flashViewfinderSpy = sinon.spy(gui, "flashViewfinder");
        t.is(flashLaserSpy.callCount, 0);
        t.is(flashViewfinderSpy.callCount, 0);
        gui.flashGUI();
        t.is(flashLaserSpy.callCount, 0);
        t.is(flashViewfinderSpy.callCount, 0);
        gui.setGuiStyle(__1.BarcodePicker.GuiStyle.LASER);
        gui.flashGUI();
        t.is(flashLaserSpy.callCount, 1);
        t.is(flashViewfinderSpy.callCount, 0);
        gui.setGuiStyle(__1.BarcodePicker.GuiStyle.VIEWFINDER);
        gui.flashGUI();
        t.is(flashLaserSpy.callCount, 1);
        t.is(flashViewfinderSpy.callCount, 1);
        return [2 /*return*/];
    });
}); });
ava_1.default("setCameraSwitcherVisible", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var gui;
    return tslib_1.__generator(this, function (_a) {
        gui = new barcodePickerGui_1.BarcodePickerGui(defaultBarcodePickerGuiOptions);
        gui.setCameraSwitcherVisible(false);
        t.true(gui.cameraSwitcherElement.classList.contains(barcodePickerGui_1.BarcodePickerGui.hiddenClassName));
        gui.setCameraSwitcherVisible(true);
        t.false(gui.cameraSwitcherElement.classList.contains(barcodePickerGui_1.BarcodePickerGui.hiddenClassName));
        return [2 /*return*/];
    });
}); });
ava_1.default("setTorchTogglerVisible", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var gui;
    return tslib_1.__generator(this, function (_a) {
        gui = new barcodePickerGui_1.BarcodePickerGui(defaultBarcodePickerGuiOptions);
        gui.setTorchTogglerVisible(false);
        t.true(gui.torchTogglerElement.classList.contains(barcodePickerGui_1.BarcodePickerGui.hiddenClassName));
        gui.setTorchTogglerVisible(true);
        t.false(gui.torchTogglerElement.classList.contains(barcodePickerGui_1.BarcodePickerGui.hiddenClassName));
        return [2 /*return*/];
    });
}); });
ava_1.default("resize video", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var scanSettings, scanner, originElement, gui;
    return tslib_1.__generator(this, function (_a) {
        scanSettings = new __1.ScanSettings();
        scanner = sinon.createStubInstance(__1.Scanner, {
            getScanSettings: scanSettings
        });
        originElement = document.createElement("div");
        gui = new barcodePickerGui_1.BarcodePickerGui(tslib_1.__assign({}, defaultBarcodePickerGuiOptions, { originElement: originElement, scanner: scanner }));
        t.is(gui.parentElement.style.maxWidth, "");
        t.is(gui.parentElement.style.maxHeight, "");
        gui.setVideoFit(__1.BarcodePicker.ObjectFit.CONTAIN);
        defineConfigurableProperty(originElement, "clientWidth", 100);
        defineConfigurableProperty(originElement, "clientHeight", 100);
        defineConfigurableProperty(gui.videoElement, "videoWidth", 100);
        defineConfigurableProperty(gui.videoElement, "videoHeight", 100);
        gui.setVideoFit(__1.BarcodePicker.ObjectFit.CONTAIN);
        t.is(gui.parentElement.style.maxWidth, "100px");
        t.is(gui.parentElement.style.maxHeight, "100px");
        gui.resizeVideoIfNeeded();
        t.is(gui.parentElement.style.maxWidth, "100px");
        t.is(gui.parentElement.style.maxHeight, "100px");
        gui.setVideoFit(__1.BarcodePicker.ObjectFit.COVER);
        t.deepEqual(scanSettings.getBaseSearchArea(), {
            x: 0,
            y: 0,
            width: 1,
            height: 1
        });
        t.is(gui.parentElement.style.maxWidth, "");
        t.is(gui.parentElement.style.maxHeight, "");
        defineConfigurableProperty(gui.videoElement, "videoWidth", 200);
        defineConfigurableProperty(gui.videoElement, "videoHeight", 100);
        gui.setVideoFit(__1.BarcodePicker.ObjectFit.CONTAIN);
        t.is(gui.parentElement.style.maxWidth, "100px");
        t.is(gui.parentElement.style.maxHeight, "50px");
        gui.setVideoFit(__1.BarcodePicker.ObjectFit.COVER);
        t.deepEqual(scanSettings.getBaseSearchArea(), {
            x: 0.25,
            y: 0,
            width: 0.5,
            height: 1
        });
        t.is(gui.parentElement.style.maxWidth, "");
        t.is(gui.parentElement.style.maxHeight, "");
        defineConfigurableProperty(gui.videoElement, "videoWidth", 100);
        defineConfigurableProperty(gui.videoElement, "videoHeight", 200);
        gui.setVideoFit(__1.BarcodePicker.ObjectFit.CONTAIN);
        t.is(gui.parentElement.style.maxWidth, "50px");
        t.is(gui.parentElement.style.maxHeight, "100px");
        gui.setVideoFit(__1.BarcodePicker.ObjectFit.COVER);
        t.deepEqual(scanSettings.getBaseSearchArea(), {
            x: 0,
            y: 0.25,
            width: 1,
            height: 0.5
        });
        t.is(gui.parentElement.style.maxWidth, "");
        t.is(gui.parentElement.style.maxHeight, "");
        return [2 /*return*/];
    });
}); });
ava_1.default("resize singleImage", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var originElement, gui;
    return tslib_1.__generator(this, function (_a) {
        originElement = document.createElement("div");
        gui = new barcodePickerGui_1.BarcodePickerGui(tslib_1.__assign({}, defaultBarcodePickerGuiOptions, { originElement: originElement, singleImageMode: true }));
        t.is(gui.parentElement.style.maxWidth, "");
        t.is(gui.parentElement.style.maxHeight, "");
        t.is(gui.cameraUploadLabelElement.style.transform, "");
        t.is(gui.cameraUploadProgressElement.style.transform, "");
        gui.resizeIfNeeded();
        t.is(gui.parentElement.style.maxWidth, "");
        t.is(gui.parentElement.style.maxHeight, "");
        t.is(gui.cameraUploadLabelElement.style.transform, "scale(0)");
        t.is(gui.cameraUploadProgressElement.style.transform, "scale(0)");
        defineConfigurableProperty(originElement, "clientWidth", 1);
        defineConfigurableProperty(originElement, "clientHeight", 1);
        defineConfigurableProperty(gui.cameraUploadElement, "clientWidth", 500);
        defineConfigurableProperty(gui.cameraUploadElement, "clientHeight", 300);
        gui.resizeIfNeeded();
        t.is(gui.cameraUploadLabelElement.style.transform, "scale(1)");
        defineConfigurableProperty(gui.cameraUploadElement, "clientWidth", 1000);
        defineConfigurableProperty(gui.cameraUploadElement, "clientHeight", 600);
        gui.resizeIfNeeded();
        t.is(gui.cameraUploadLabelElement.style.transform, "scale(1)");
        defineConfigurableProperty(gui.cameraUploadElement, "clientWidth", 250);
        gui.resizeIfNeeded();
        t.is(gui.cameraUploadLabelElement.style.transform, "scale(0.5)");
        defineConfigurableProperty(gui.cameraUploadElement, "clientHeight", 30);
        gui.resizeIfNeeded();
        t.is(gui.cameraUploadLabelElement.style.transform, "scale(0.1)");
        defineConfigurableProperty(gui.cameraUploadElement, "clientWidth", 5);
        gui.resizeIfNeeded();
        t.is(gui.cameraUploadLabelElement.style.transform, "scale(0.01)");
        return [2 /*return*/];
    });
}); });
// tslint:disable-next-line:max-func-body-length
ava_1.default("cameraUploadFile", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    function base64StringtoPngFile(base64String) {
        var byteString = atob(base64String);
        var byteArray = new Uint8ClampedArray(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }
        return new File([byteArray], "/test", {
            type: "image/png"
        });
    }
    var imageSettings, scanner, gui, fileList;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scanner = sinon.createStubInstance(__1.Scanner, {
                    getScanSettings: new __1.ScanSettings(),
                    getImageSettings: sinon.stub().callsFake(function () {
                        return imageSettings;
                    }),
                    applyImageSettings: sinon.stub().callsFake(function (newImageSettings) {
                        imageSettings = newImageSettings;
                        return scanner;
                    })
                });
                gui = new barcodePickerGui_1.BarcodePickerGui(tslib_1.__assign({}, defaultBarcodePickerGuiOptions, { scanner: scanner, singleImageMode: true }));
                Object.defineProperty(Image.prototype, "onprogress", {
                    set: function (value) {
                        value(new ProgressEvent("progress", {
                            loaded: 0,
                            total: 100,
                            lengthComputable: true
                        }));
                    }
                });
                gui.cameraUploadFile();
                fileList = [
                    // 4x4 white image
                    base64StringtoPngFile("iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAQAAAAD+Fb1AAAAEElEQVR42mP8/58BDBhxMwCn1gf9tpc9tgAAAABJRU5ErkJggg==")
                ];
                defineConfigurableProperty(gui.cameraUploadInputElement, "files", fileList);
                gui.cameraUploadFile();
                return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(resolve, 100);
                    })];
            case 1:
                _a.sent();
                t.deepEqual(scanner.getImageSettings(), {
                    width: 4,
                    height: 4,
                    format: imageSettings_1.ImageSettings.Format.RGBA_8U
                });
                fileList = [
                    // 1600x100 white image
                    base64StringtoPngFile(
                    // tslint:disable-next-line:max-line-length
                    "iVBORw0KGgoAAAANSUhEUgAABkAAAABkCAQAAAB06DQ2AAABz0lEQVR42u3XQREAAAgDINc/9Czh+YIWpB0AAIAXERAAAEBAAAAAAQEAABAQAABAQAAAAAQEAAAQEAAAQEAAAAAEBAAAEBAAAAABAQAABAQAABAQAAAAAQEAAAQEAABAQAAAAAEBAAAEBAAAQEAAAAABAQAAEBAAAEBAAAAAAQEAABAQAABAQAAAAAQEAAAQEAAAQEAAAAAEBAAAEBAAAAABAQAABAQAAEBAAAAAAQEAAAQEAABAQAAAAAEBAAAQEAAAQEAAAAABAQAAEBAAAEBAAAAABAQAABAQAABAQAAAAAQEAAAQEAAAAAEBAAAEBAAAEBAAAAABAQAABAQAAEBAAAAAAQEAAAQEAABAQAAAAAEBAAAQEAAAQEAAAAAEBAAAEBAAAEBAAAAABAQAABAQAAAAAQEAAAQEAAAQEAAAAAEBAAAEBAAAQEAAAAABAQAABAQAAEBAAAAAAQEAABAQAABAQAAAAAEBAAAQEAAAQEAAAAAEBAAAEBAAAEBAAAAABAQAABAQAAAAAQEAAAQEAAAQEAEBAAAEBAAAEBAAAAABAQAABAQAAEBAAAAAAQEAAAQEAABAQAAAAAEBAAAQEAAAQEAAAAABAQAAuLNeC8edzcWfbQAAAABJRU5ErkJggg==")
                ];
                defineConfigurableProperty(gui.cameraUploadInputElement, "files", fileList);
                gui.cameraUploadFile();
                return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(resolve, 100);
                    })];
            case 2:
                _a.sent();
                t.deepEqual(scanner.getImageSettings(), {
                    width: 1440,
                    height: 90,
                    format: imageSettings_1.ImageSettings.Format.RGBA_8U
                });
                fileList = [
                    // 100x1600 white image
                    base64StringtoPngFile(
                    // tslint:disable-next-line:max-line-length
                    "iVBORw0KGgoAAAANSUhEUgAAAGQAAAZACAQAAAAlBi/FAAAE+UlEQVR42u3PAQ0AAAgDIN8/9M2hgwaknRciIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiJy2QLJ03p1wqRRzwAAAABJRU5ErkJggg==")
                ];
                defineConfigurableProperty(gui.cameraUploadInputElement, "files", fileList);
                gui.cameraUploadFile();
                return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(resolve, 100);
                    })];
            case 3:
                _a.sent();
                t.deepEqual(scanner.getImageSettings(), {
                    width: 90,
                    height: 1440,
                    format: imageSettings_1.ImageSettings.Format.RGBA_8U
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=barcodePickerGui.spec.js.map