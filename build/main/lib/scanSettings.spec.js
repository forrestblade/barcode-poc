"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-implicit-dependencies */
/**
 * ScanSettings tests
 */
var ava_1 = tslib_1.__importDefault(require("ava"));
var __1 = require("..");
ava_1.default("constructor", function (t) {
    var ss = new __1.ScanSettings();
    t.deepEqual(ss.symbologySettings, new Map());
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({ enabledSymbologies: [__1.Barcode.Symbology.QR] });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({ enabledSymbologies: new Set([__1.Barcode.Symbology.QR]) });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR, codeDuplicateFilter: 10 });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR, maxNumberOfCodesPerFrame: 10 });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({
        enabledSymbologies: __1.Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10
    });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({
        enabledSymbologies: __1.Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 }
    });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 0.1, width: 0.5, x: 0.5, y: 0.5 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({
        enabledSymbologies: __1.Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 },
        gpuAcceleration: false
    });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 0.1, width: 0.5, x: 0.5, y: 0.5 });
    t.deepEqual(ss.gpuAcceleration, false);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({
        enabledSymbologies: __1.Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 },
        gpuAcceleration: false,
        blurryRecognition: false
    });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 0.1, width: 0.5, x: 0.5, y: 0.5 });
    t.deepEqual(ss.gpuAcceleration, false);
    t.deepEqual(ss.blurryRecognition, false);
});
ava_1.default("constructor (strings)", function (t) {
    var ss = new __1.ScanSettings();
    t.deepEqual(ss.symbologySettings, new Map());
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({ enabledSymbologies: "qr" });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({ enabledSymbologies: ["qr"] });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new __1.ScanSettings({ enabledSymbologies: new Set(["qr"]) });
    t.deepEqual(ss.symbologySettings, new Map([[__1.Barcode.Symbology.QR, new __1.SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    t.throws(function () {
        return new __1.ScanSettings({ enabledSymbologies: "i_dont_exist" });
    }, TypeError, "i_dont_exist");
    t.throws(function () {
        return new __1.ScanSettings({ enabledSymbologies: Array.from(["i_dont_exist"]) });
    }, TypeError, "i_dont_exist");
    t.throws(function () {
        return new __1.ScanSettings({ enabledSymbologies: new Set(["i_dont_exist"]) });
    }, TypeError, "i_dont_exist");
});
ava_1.default("getSymbologySettings", function (t) {
    var ss = new __1.ScanSettings();
    t.deepEqual(ss.getSymbologySettings(__1.Barcode.Symbology.QR), new __1.SymbologySettings());
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR });
    t.deepEqual(ss.getSymbologySettings(__1.Barcode.Symbology.QR), new __1.SymbologySettings({ enabled: true }));
    ss = new __1.ScanSettings();
    ss.getSymbologySettings(__1.Barcode.Symbology.QR).setColorInvertedEnabled(true);
    t.deepEqual(ss.getSymbologySettings(__1.Barcode.Symbology.QR), new __1.SymbologySettings({ colorInvertedEnabled: true }));
});
ava_1.default("getSymbologySettings (strings)", function (t) {
    var ss = new __1.ScanSettings();
    t.throws(function () {
        ss.getSymbologySettings("i_dont_exist");
    }, TypeError, "i_dont_exist");
    t.deepEqual(ss.getSymbologySettings("qr"), new __1.SymbologySettings());
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR });
    t.deepEqual(ss.getSymbologySettings("qr"), new __1.SymbologySettings({ enabled: true }));
    ss = new __1.ScanSettings();
    ss.getSymbologySettings(__1.Barcode.Symbology.QR).setColorInvertedEnabled(true);
    t.deepEqual(ss.getSymbologySettings("qr"), new __1.SymbologySettings({ colorInvertedEnabled: true }));
});
ava_1.default("isSymbologyEnabled & enableSymbologies & disableSymbologies", function (t) {
    var ss = new __1.ScanSettings();
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR });
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    // Set
    ss = new __1.ScanSettings();
    ss.enableSymbologies(new Set([__1.Barcode.Symbology.QR]));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.enableSymbologies(new Set([__1.Barcode.Symbology.CODE128, __1.Barcode.Symbology.EAN13]));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies(new Set([__1.Barcode.Symbology.QR]));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies(new Set([__1.Barcode.Symbology.CODE128, __1.Barcode.Symbology.EAN13]));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    // Array
    ss = new __1.ScanSettings();
    ss.enableSymbologies([__1.Barcode.Symbology.QR]);
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.enableSymbologies([__1.Barcode.Symbology.CODE128, __1.Barcode.Symbology.EAN13]);
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies([__1.Barcode.Symbology.QR]);
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies([__1.Barcode.Symbology.CODE128, __1.Barcode.Symbology.EAN13]);
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    // Single
    ss = new __1.ScanSettings();
    ss.enableSymbologies(__1.Barcode.Symbology.QR);
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.enableSymbologies(__1.Barcode.Symbology.CODE128);
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies(__1.Barcode.Symbology.QR);
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies(__1.Barcode.Symbology.CODE128);
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
});
ava_1.default("isSymbologyEnabled & enableSymbologies & disableSymbologies (strings)", function (t) {
    var ss = new __1.ScanSettings();
    t.false(ss.isSymbologyEnabled("qr"));
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR });
    t.true(ss.isSymbologyEnabled("qr"));
    ss = new __1.ScanSettings();
    t.throws(function () {
        ss.enableSymbologies("i_dont_exist");
    }, TypeError, "i_dont_exist");
    t.deepEqual(ss.symbologySettings, new Map());
    t.throws(function () {
        ss.enableSymbologies(Array.from(["i_dont_exist"]));
    }, TypeError, "i_dont_exist");
    t.deepEqual(ss.symbologySettings, new Map());
    t.throws(function () {
        ss.enableSymbologies(new Set(["i_dont_exist"]));
    }, TypeError, "i_dont_exist");
    t.deepEqual(ss.symbologySettings, new Map());
    // Set
    ss = new __1.ScanSettings();
    ss.enableSymbologies(new Set(["qr"]));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.enableSymbologies(new Set(["code128", "ean13"]));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies(new Set(["qr"]));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies(new Set(["code128", "ean13"]));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    // Array
    ss = new __1.ScanSettings();
    ss.enableSymbologies(["qr"]);
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.enableSymbologies(["code128", "ean13"]);
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies(["qr"]);
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies(["code128", "ean13"]);
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    // Single
    ss = new __1.ScanSettings();
    ss.enableSymbologies("qr");
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.enableSymbologies("code128");
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies("qr");
    t.true(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
    ss.disableSymbologies("code128");
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(__1.Barcode.Symbology.QR));
});
ava_1.default("getCodeDuplicateFilter & setCodeDuplicateFilter", function (t) {
    var ss = new __1.ScanSettings();
    t.deepEqual(ss.getCodeDuplicateFilter(), 0);
    ss.setCodeDuplicateFilter(100);
    t.deepEqual(ss.getCodeDuplicateFilter(), 100);
});
ava_1.default("getMaxNumberOfCodesPerFrame & setMaxNumberOfCodesPerFrame", function (t) {
    var ss = new __1.ScanSettings();
    t.deepEqual(ss.getMaxNumberOfCodesPerFrame(), 1);
    ss.setMaxNumberOfCodesPerFrame(10);
    t.deepEqual(ss.getMaxNumberOfCodesPerFrame(), 10);
});
ava_1.default("getSearchArea & setSearchArea", function (t) {
    var ss = new __1.ScanSettings();
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    ss.setSearchArea({ x: 0.5, y: 0.5, width: 0.5, height: 0.1 });
    t.deepEqual(ss.getSearchArea(), { height: 0.1, width: 0.5, x: 0.5, y: 0.5 });
});
ava_1.default("isGpuAccelerationEnabled & setGpuAccelerationEnabled", function (t) {
    var ss = new __1.ScanSettings();
    t.deepEqual(ss.isGpuAccelerationEnabled(), true);
    ss.setGpuAccelerationEnabled(false);
    t.deepEqual(ss.isGpuAccelerationEnabled(), false);
    ss.setGpuAccelerationEnabled(true);
    t.deepEqual(ss.isGpuAccelerationEnabled(), true);
});
ava_1.default("isBlurryRecognitionEnabled & setBlurryRecognitionEnabled", function (t) {
    var ss = new __1.ScanSettings();
    t.deepEqual(ss.isBlurryRecognitionEnabled(), true);
    ss.setBlurryRecognitionEnabled(false);
    t.deepEqual(ss.isBlurryRecognitionEnabled(), false);
    ss.setBlurryRecognitionEnabled(true);
    t.deepEqual(ss.isBlurryRecognitionEnabled(), true);
});
// tslint:disable-next-line:max-func-body-length
ava_1.default("toJSONString", function (t) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var ss = new __1.ScanSettings();
    var baseJSONScanSettings = {
        symbologies: {},
        codeDuplicateFilter: 0,
        maxNumberOfCodesPerFrame: 1,
        searchArea: ss.getSearchArea(),
        gpuAcceleration: true,
        blurryRecognition: true
    };
    t.deepEqual(ss.toJSONString(), JSON.stringify(baseJSONScanSettings));
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR });
    t.deepEqual(ss.toJSONString(), JSON.stringify(tslib_1.__assign({}, baseJSONScanSettings, { symbologies: (_a = {}, _a[__1.Barcode.Symbology.QR] = new __1.SymbologySettings({ enabled: true }), _a) })));
    ss = new __1.ScanSettings({ enabledSymbologies: [__1.Barcode.Symbology.QR] });
    t.deepEqual(ss.toJSONString(), JSON.stringify(tslib_1.__assign({}, baseJSONScanSettings, { symbologies: (_b = {}, _b[__1.Barcode.Symbology.QR] = new __1.SymbologySettings({ enabled: true }), _b) })));
    ss = new __1.ScanSettings({ enabledSymbologies: new Set([__1.Barcode.Symbology.QR]) });
    t.deepEqual(ss.toJSONString(), JSON.stringify(tslib_1.__assign({}, baseJSONScanSettings, { symbologies: (_c = {}, _c[__1.Barcode.Symbology.QR] = new __1.SymbologySettings({ enabled: true }), _c) })));
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR, codeDuplicateFilter: 10 });
    t.deepEqual(ss.toJSONString(), JSON.stringify(tslib_1.__assign({}, baseJSONScanSettings, { symbologies: (_d = {}, _d[__1.Barcode.Symbology.QR] = new __1.SymbologySettings({ enabled: true }), _d), codeDuplicateFilter: 10 })));
    ss = new __1.ScanSettings({ enabledSymbologies: __1.Barcode.Symbology.QR, maxNumberOfCodesPerFrame: 10 });
    t.deepEqual(ss.toJSONString(), JSON.stringify(tslib_1.__assign({}, baseJSONScanSettings, { symbologies: (_e = {}, _e[__1.Barcode.Symbology.QR] = new __1.SymbologySettings({ enabled: true }), _e), maxNumberOfCodesPerFrame: 10 })));
    ss = new __1.ScanSettings({
        enabledSymbologies: __1.Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10
    });
    t.deepEqual(ss.toJSONString(), JSON.stringify(tslib_1.__assign({}, baseJSONScanSettings, { symbologies: (_f = {}, _f[__1.Barcode.Symbology.QR] = new __1.SymbologySettings({ enabled: true }), _f), codeDuplicateFilter: 10, maxNumberOfCodesPerFrame: 10 })));
    ss = new __1.ScanSettings({
        enabledSymbologies: __1.Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        gpuAcceleration: false,
        blurryRecognition: true
    });
    t.deepEqual(ss.toJSONString(), JSON.stringify(tslib_1.__assign({}, baseJSONScanSettings, { symbologies: (_g = {}, _g[__1.Barcode.Symbology.QR] = new __1.SymbologySettings({ enabled: true }), _g), codeDuplicateFilter: 10, maxNumberOfCodesPerFrame: 10, gpuAcceleration: false, blurryRecognition: true })));
    ss = new __1.ScanSettings({
        enabledSymbologies: __1.Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        gpuAcceleration: false,
        blurryRecognition: false
    });
    t.deepEqual(ss.toJSONString(), JSON.stringify(tslib_1.__assign({}, baseJSONScanSettings, { symbologies: (_h = {}, _h[__1.Barcode.Symbology.QR] = new __1.SymbologySettings({ enabled: true }), _h), codeDuplicateFilter: 10, maxNumberOfCodesPerFrame: 10, gpuAcceleration: false, blurryRecognition: false })));
    ss = new __1.ScanSettings({
        enabledSymbologies: __1.Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 },
        gpuAcceleration: false,
        blurryRecognition: false
    });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        symbologies: (_j = {}, _j[__1.Barcode.Symbology.QR] = new __1.SymbologySettings({ enabled: true }), _j),
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: ss.getSearchArea(),
        codeLocation1d: {
            area: {
                x: ss.getSearchArea().x,
                y: ss.getSearchArea().y + (ss.getSearchArea().height * 0.75) / 2,
                width: ss.getSearchArea().width,
                height: ss.getSearchArea().height * 0.25
            }
        },
        codeLocation2d: { area: ss.getSearchArea() },
        gpuAcceleration: false,
        blurryRecognition: false
    }));
});
ava_1.default("getBaseSearchArea & setBaseSearchArea", function (t) {
    var _a, _b;
    var ss = new __1.ScanSettings({
        enabledSymbologies: __1.Barcode.Symbology.AZTEC,
        codeDuplicateFilter: 5,
        maxNumberOfCodesPerFrame: 5,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 }
    });
    t.deepEqual(ss.getBaseSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        symbologies: (_a = {}, _a[__1.Barcode.Symbology.AZTEC] = new __1.SymbologySettings({ enabled: true }), _a),
        codeDuplicateFilter: 5,
        maxNumberOfCodesPerFrame: 5,
        searchArea: ss.getSearchArea(),
        codeLocation1d: {
            area: {
                x: ss.getSearchArea().x,
                y: ss.getSearchArea().y + (ss.getSearchArea().height * 0.75) / 2,
                width: ss.getSearchArea().width,
                height: ss.getSearchArea().height * 0.25
            }
        },
        codeLocation2d: { area: ss.getSearchArea() },
        gpuAcceleration: true,
        blurryRecognition: true
    }));
    ss.setBaseSearchArea({ x: 0.5, y: 0.5, width: 0.5, height: 0.1 });
    var baseSearchArea = ss.getBaseSearchArea();
    var searchArea = ss.getSearchArea();
    t.deepEqual(baseSearchArea, { x: 0.5, y: 0.5, width: 0.5, height: 0.1 });
    var combinedSearchArea = {
        x: baseSearchArea.x + searchArea.x * baseSearchArea.width,
        y: baseSearchArea.y + searchArea.y * baseSearchArea.height,
        width: baseSearchArea.width * searchArea.width,
        height: baseSearchArea.height * searchArea.height
    };
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        symbologies: (_b = {}, _b[__1.Barcode.Symbology.AZTEC] = new __1.SymbologySettings({ enabled: true }), _b),
        codeDuplicateFilter: 5,
        maxNumberOfCodesPerFrame: 5,
        searchArea: combinedSearchArea,
        codeLocation1d: {
            area: {
                x: combinedSearchArea.x,
                y: combinedSearchArea.y + (combinedSearchArea.height * 0.75) / 2,
                width: combinedSearchArea.width,
                height: combinedSearchArea.height * 0.25
            }
        },
        codeLocation2d: { area: combinedSearchArea },
        gpuAcceleration: true,
        blurryRecognition: true
    }));
});
//# sourceMappingURL=scanSettings.spec.js.map