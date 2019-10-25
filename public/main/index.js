"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("objectFitPolyfill");
require("webrtc-adapter/out/adapter_no_global");
var browserHelper_1 = require("./lib/browserHelper");
var customError_1 = require("./lib/customError");
var unsupportedBrowserError_1 = require("./lib/unsupportedBrowserError");
require("./styles/styles.scss");
tslib_1.__exportStar(require("./lib/barcode"), exports);
tslib_1.__exportStar(require("./lib/barcodePicker"), exports);
tslib_1.__exportStar(require("./lib/browserCompatibility"), exports);
tslib_1.__exportStar(require("./lib/browserHelper"), exports);
tslib_1.__exportStar(require("./lib/camera"), exports);
tslib_1.__exportStar(require("./lib/cameraAccess"), exports);
tslib_1.__exportStar(require("./lib/cameraSettings"), exports);
tslib_1.__exportStar(require("./lib/customError"), exports);
tslib_1.__exportStar(require("./lib/imageSettings"), exports);
tslib_1.__exportStar(require("./lib/parser"), exports);
tslib_1.__exportStar(require("./lib/scanResult"), exports);
tslib_1.__exportStar(require("./lib/scanner"), exports);
tslib_1.__exportStar(require("./lib/scanSettings"), exports);
tslib_1.__exportStar(require("./lib/symbologySettings"), exports);
tslib_1.__exportStar(require("./lib/workers/engineWorker"), exports);
/**
 * @hidden
 */
exports.deviceId = browserHelper_1.BrowserHelper.getDeviceId();
/**
 * Initialize and configure the Scandit Barcode Scanner SDK library. This function must be called as first thing
 * before using any other function of the library.
 *
 * Depending on parameters and device features, any of the following errors could be the rejected result of the returned
 * promise:
 * - `NoLicenseKeyError`
 * - `UnsupportedBrowserError`
 *
 * Camera access requests and external Scandit Engine library loads are done lazily only when needed by a
 * [[BarcodePicker]] (or [[Scanner]]) object. To make the loading process faster when scanning is actually needed, it is
 * recommended depending on the use case to create in advance a (hidden and paused) [[BarcodePicker]] or [[Scanner]]
 * object, to later simply show and unpause it when needed. You can also eagerly ask only for camera access permissions
 * by calling the [[CameraAccess.getCameras]] function.
 *
 * @param licenseKey The Scandit license key to be used by the library.
 * @param engineLocation <div class="tsd-signature-symbol">Default =&nbsp;"/"</div>
 * The location of the folder containing the external scandit-engine-sdk.min.js and
 * scandit-engine-sdk.wasm files (external Scandit Engine library).
 * By default they are retrieved from the root of the web application.
 * Can be a full URL to folder or an absolute folder path.
 * @returns A promise resolving when the library has been configured.
 */
function configure(licenseKey, _a) {
    var _b = (_a === void 0 ? {} : _a).engineLocation, engineLocation = _b === void 0 ? "/" : _b;
    var browserCompatibility = browserHelper_1.BrowserHelper.checkBrowserCompatibility();
    if (!browserCompatibility.fullSupport && !browserCompatibility.scannerSupport) {
        return Promise.reject(new unsupportedBrowserError_1.UnsupportedBrowserError(browserCompatibility));
    }
    if (licenseKey == null || licenseKey.trim() === "") {
        return Promise.reject(new customError_1.CustomError({ name: "NoLicenseKeyError", message: "No license key provided" }));
    }
    exports.userLicenseKey = licenseKey;
    engineLocation += engineLocation.slice(-1) === "/" ? "" : "/";
    if (/^https?:\/\//.test(engineLocation)) {
        exports.scanditEngineLocation = "" + engineLocation;
    }
    else {
        engineLocation = engineLocation
            .split("/")
            .filter(function (s) {
            return s.length > 0;
        })
            .join("/");
        if (engineLocation === "") {
            engineLocation = "/";
        }
        else {
            engineLocation = "/" + engineLocation + "/";
        }
        if (location.protocol === "file:" || location.origin === "null") {
            exports.scanditEngineLocation = "" + location.href
                .split("/")
                .slice(0, -1)
                .join("/") + engineLocation;
        }
        else {
            exports.scanditEngineLocation = "" + location.origin + engineLocation;
        }
    }
    return Promise.resolve();
}
exports.configure = configure;
//# sourceMappingURL=index.js.map