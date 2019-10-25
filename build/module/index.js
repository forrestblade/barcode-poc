import "objectFitPolyfill";
import "webrtc-adapter/out/adapter_no_global";
import { BrowserHelper } from "./lib/browserHelper";
import { CustomError } from "./lib/customError";
import { UnsupportedBrowserError } from "./lib/unsupportedBrowserError";
import "./styles/styles.scss";
export * from "./lib/barcode";
export * from "./lib/barcodePicker";
export * from "./lib/browserCompatibility";
export * from "./lib/browserHelper";
export * from "./lib/camera";
export * from "./lib/cameraAccess";
export * from "./lib/cameraSettings";
export * from "./lib/customError";
export * from "./lib/imageSettings";
export * from "./lib/parser";
export * from "./lib/scanResult";
export * from "./lib/scanner";
export * from "./lib/scanSettings";
export * from "./lib/symbologySettings";
export * from "./lib/workers/engineWorker";
/**
 * @hidden
 */
export let deviceId = BrowserHelper.getDeviceId();
/**
 * @hidden
 */
export let userLicenseKey;
/**
 * @hidden
 */
export let scanditEngineLocation;
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
export function configure(licenseKey, { engineLocation = "/" } = {}) {
    const browserCompatibility = BrowserHelper.checkBrowserCompatibility();
    if (!browserCompatibility.fullSupport && !browserCompatibility.scannerSupport) {
        return Promise.reject(new UnsupportedBrowserError(browserCompatibility));
    }
    if (licenseKey == null || licenseKey.trim() === "") {
        return Promise.reject(new CustomError({ name: "NoLicenseKeyError", message: "No license key provided" }));
    }
    userLicenseKey = licenseKey;
    engineLocation += engineLocation.slice(-1) === "/" ? "" : "/";
    if (/^https?:\/\//.test(engineLocation)) {
        scanditEngineLocation = `${engineLocation}`;
    }
    else {
        engineLocation = engineLocation
            .split("/")
            .filter(s => {
            return s.length > 0;
        })
            .join("/");
        if (engineLocation === "") {
            engineLocation = "/";
        }
        else {
            engineLocation = `/${engineLocation}/`;
        }
        if (location.protocol === "file:" || location.origin === "null") {
            scanditEngineLocation = `${location.href
                .split("/")
                .slice(0, -1)
                .join("/")}${engineLocation}`;
        }
        else {
            scanditEngineLocation = `${location.origin}${engineLocation}`;
        }
    }
    return Promise.resolve();
}
//# sourceMappingURL=index.js.map