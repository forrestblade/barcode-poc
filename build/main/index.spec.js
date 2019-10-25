"use strict";
/* tslint:disable:no-implicit-dependencies */
/**
 * Index tests
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = tslib_1.__importDefault(require("ava"));
var ScanditSDK = tslib_1.__importStar(require("."));
// Set inside setupBrowserEnv.js
var baseUrl = "https://example.com/";
ava_1.default.serial("configure", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var error;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, t.throwsAsync(ScanditSDK.configure(""))];
            case 1:
                error = _a.sent();
                t.is(error.name, "UnsupportedBrowserError");
                ScanditSDK.BrowserHelper.checkBrowserCompatibility = function () {
                    return {
                        fullSupport: true,
                        scannerSupport: true,
                        missingFeatures: []
                    };
                };
                return [4 /*yield*/, t.throwsAsync(ScanditSDK.configure(null))];
            case 2:
                error = _a.sent();
                t.is(error.name, "NoLicenseKeyError");
                return [4 /*yield*/, t.throwsAsync(ScanditSDK.configure(""))];
            case 3:
                error = _a.sent();
                t.is(error.name, "NoLicenseKeyError");
                return [4 /*yield*/, t.throwsAsync(ScanditSDK.configure(" "))];
            case 4:
                error = _a.sent();
                t.is(error.name, "NoLicenseKeyError");
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure("license_key"))];
            case 5:
                _a.sent();
                t.is(ScanditSDK.userLicenseKey, "license_key");
                t.is(ScanditSDK.scanditEngineLocation, baseUrl);
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "" }))];
            case 6:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, baseUrl);
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "/" }))];
            case 7:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, baseUrl);
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "test" }))];
            case 8:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, baseUrl + "test/");
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "https://example1.com" }))];
            case 9:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, "https://example1.com/");
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "https://example2.com/" }))];
            case 10:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, "https://example2.com/");
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.spec.js.map