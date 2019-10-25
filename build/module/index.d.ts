import "objectFitPolyfill";
import "webrtc-adapter/out/adapter_no_global";
import "./styles/styles.scss";
export * from "./lib/barcode";
export * from "./lib/barcodeEncodingRange";
export * from "./lib/barcodePicker";
export * from "./lib/browserCompatibility";
export * from "./lib/browserHelper";
export * from "./lib/camera";
export * from "./lib/cameraAccess";
export * from "./lib/cameraSettings";
export * from "./lib/customError";
export * from "./lib/imageSettings";
export * from "./lib/point";
export * from "./lib/quadrilateral";
export * from "./lib/parser";
export * from "./lib/parserField";
export * from "./lib/parserResult";
export * from "./lib/scanResult";
export * from "./lib/scanner";
export * from "./lib/scanSettings";
export * from "./lib/searchArea";
export * from "./lib/symbologySettings";
export * from "./lib/workers/engineWorker";
/**
 * @hidden
 */
export declare let deviceId: string;
/**
 * @hidden
 */
export declare let userLicenseKey: string;
/**
 * @hidden
 */
export declare let scanditEngineLocation: string;
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
export declare function configure(licenseKey: string, { engineLocation }?: {
    engineLocation?: string;
}): Promise<void>;
