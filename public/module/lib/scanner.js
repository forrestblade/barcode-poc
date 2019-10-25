import { EventEmitter } from "eventemitter3";
import { engineWorkerBlob } from "./workers/engineWorker";
import { deviceId, scanditEngineLocation, userLicenseKey } from "../index";
import { Barcode } from "./barcode";
import { BrowserHelper } from "./browserHelper";
import { CustomError } from "./customError";
import { ImageSettings } from "./imageSettings";
import { Parser } from "./parser";
import { ScanResult } from "./scanResult";
import { ScanSettings } from "./scanSettings";
import { UnsupportedBrowserError } from "./unsupportedBrowserError";
/**
 * @hidden
 */
class ScannerEventEmitter extends EventEmitter {
}
/**
 * A low-level scanner interacting with the external Scandit Engine library.
 * Used to set up scan / image settings and to process single image frames.
 *
 * The loading of the external Scandit Engine library which takes place on creation can take some time,
 * the [[on]] method targeting the [[ready]] event can be used to set up a listener function to be called when the
 * library is loaded and the [[isReady]] method can return the current status. The scanner will be ready to start
 * scanning when the library is fully loaded.
 *
 * In the special case where a single [[Scanner]] instance is shared between multiple active [[BarcodePicker]]
 * instances, the fairness in resource allocation for processing images between the different pickers is not guaranteed.
 */
export class Scanner {
    /**
     * Create a Scanner instance.
     *
     * It is required to having configured the library via [[configure]] before this object can be created.
     *
     * Before processing an image the relative settings must also have been set.
     *
     * If the library has not been correctly configured yet a `LibraryNotConfiguredError` error is thrown.
     *
     * If a browser is incompatible a `UnsupportedBrowserError` error is thrown.
     *
     * @param scanSettings <div class="tsd-signature-symbol">Default =&nbsp;new ScanSettings()</div>
     * The configuration object for scanning options.
     * @param imageSettings <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The configuration object to define the properties of an image to be scanned.
     */
    constructor({ scanSettings = new ScanSettings(), imageSettings } = {}) {
        const browserCompatibility = BrowserHelper.checkBrowserCompatibility();
        if (!browserCompatibility.scannerSupport) {
            throw new UnsupportedBrowserError(browserCompatibility);
        }
        if (userLicenseKey == null || userLicenseKey.trim() === "") {
            throw new CustomError({
                name: "LibraryNotConfiguredError",
                message: "The library has not correctly been configured yet, please call 'configure' with valid parameters"
            });
        }
        this.isReadyToWork = false;
        this.workerScanQueueLength = 0;
        this.engineWorker = new Worker(URL.createObjectURL(engineWorkerBlob));
        this.engineWorker.onmessage = this.engineWorkerOnMessage.bind(this);
        this.engineWorker.postMessage({
            type: "load-library",
            deviceId: deviceId,
            libraryLocation: scanditEngineLocation,
            path: self.location.pathname
        });
        this.eventEmitter = new EventEmitter();
        this.workerParseRequestId = 0;
        this.workerScanRequestId = 0;
        this.applyLicenseKey(userLicenseKey);
        this.applyScanSettings(scanSettings);
        if (imageSettings != null) {
            this.applyImageSettings(imageSettings);
        }
    }
    /**
     * Stop the internal `WebWorker` and destroy the scanner itself; ensuring complete cleanup.
     *
     * This method should be called after you don't plan to use the scanner anymore,
     * before the object is automatically cleaned up by JavaScript.
     * The barcode picker must not be used in any way after this call.
     */
    destroy() {
        if (this.engineWorker != null) {
            this.engineWorker.terminate();
        }
        this.eventEmitter.removeAllListeners();
    }
    /**
     * Apply a new set of scan settings to the scanner (replacing old settings).
     *
     * @param scanSettings The scan configuration object to be applied to the scanner.
     * @returns The updated [[Scanner]] object.
     */
    applyScanSettings(scanSettings) {
        this.scanSettings = scanSettings;
        this.engineWorker.postMessage({
            type: "settings",
            settings: this.scanSettings.toJSONString()
        });
        this.eventEmitter.emit("newScanSettings", this.scanSettings);
        return this;
    }
    /**
     * Apply a new set of image settings to the scanner (replacing old settings).
     *
     * @param imageSettings The image configuration object to be applied to the scanner.
     * @returns The updated [[Scanner]] object.
     */
    applyImageSettings(imageSettings) {
        this.imageSettings = imageSettings;
        this.engineWorker.postMessage({
            type: "image-settings",
            imageSettings
        });
        return this;
    }
    /**
     * Clear the scanner session.
     *
     * This removes all recognized barcodes from the scanner session and allows them to be scanned again in case a custom
     * *codeDuplicateFilter* was set in the [[ScanSettings]].
     *
     * @returns The updated [[Scanner]] object.
     */
    clearSession() {
        this.engineWorker.postMessage({
            type: "clear-session"
        });
        return this;
    }
    /**
     * Process a given image using the previously set scanner and image settings,
     * recognizing codes and retrieving the result as a list of barcodes (if any).
     *
     * Multiple requests done without waiting for previous results will be queued and handled in order.
     *
     * If *highQualitySingleFrameMode* is enabled the image will be processed with really accurate internal settings,
     * resulting in much slower but more precise scanning results. This should be used only for single images not part
     * of a continuous video stream.
     *
     * Passing image data as a *Uint8ClampedArray* is the fastest option, passing a *HTMLImageElement* will incur
     * in additional operations.
     *
     * Depending on the current image settings, given *imageData* and scanning execution, any of the following errors
     * could be the rejected result of the returned promise:
     * - `NoImageSettings`
     * - `ImageSettingsDataMismatch`
     * - `ScanditEngineError`
     *
     * @param imageData The image data given as a byte array, complying with the previously set image settings.
     * @param highQualitySingleFrameMode Whether to process the image as a high quality single frame.
     * @returns A promise resolving to the [[ScanResult]] object.
     */
    processImage(imageData, highQualitySingleFrameMode = false) {
        if (this.imageSettings == null) {
            return Promise.reject(new CustomError({ name: "NoImageSettings", message: "No image settings set up in the scanner" }));
        }
        if (imageData instanceof HTMLImageElement) {
            const imageDataConversionContext = (document.createElement("canvas").getContext("2d"));
            imageDataConversionContext.canvas.width = imageData.naturalWidth;
            imageDataConversionContext.canvas.height = imageData.naturalHeight;
            imageDataConversionContext.drawImage(imageData, 0, 0, imageData.naturalWidth, imageData.naturalHeight);
            imageData = imageDataConversionContext.getImageData(0, 0, imageData.naturalWidth, imageData.naturalHeight).data;
        }
        let channels;
        switch (this.imageSettings.format.valueOf()) {
            case ImageSettings.Format.GRAY_8U:
                channels = 1;
                break;
            case ImageSettings.Format.RGB_8U:
                channels = 3;
                break;
            case ImageSettings.Format.RGBA_8U:
                channels = 4;
                break;
            default:
                channels = 1;
                break;
        }
        if (this.imageSettings.width * this.imageSettings.height * channels !== imageData.length) {
            return Promise.reject(new CustomError({
                name: "ImageSettingsDataMismatch",
                message: "The provided image data doesn't match the previously set image settings"
            }));
        }
        this.workerScanRequestId++;
        this.workerScanQueueLength++;
        const originalImageData = imageData.slice();
        return new Promise((resolve, reject) => {
            const workResultEvent = `workResult-${this.workerScanRequestId}`;
            const workErrorEvent = `workError-${this.workerScanRequestId}`;
            this.eventEmitter.once(workResultEvent, (workResult) => {
                this.eventEmitter.removeAllListeners(workErrorEvent);
                resolve(new ScanResult(workResult.scanResult.map(Barcode.createFromWASMResult), originalImageData, (this.imageSettings)));
            });
            this.eventEmitter.once(workErrorEvent, (error) => {
                console.error(`Scandit Engine error (${error.errorCode}):`, error.errorMessage);
                this.eventEmitter.removeAllListeners(workResultEvent);
                const errorObject = new CustomError({
                    name: "ScanditEngineError",
                    message: `${error.errorMessage} (${error.errorCode})`
                });
                reject(errorObject);
            });
            // Important! Do not use the recommended postMessage "ArrayBuffer/Transferable" option to send data on Safari!
            // Doing so (mysteriously) causes memory and stability issues.
            // Going with the simple data copy approach instead seems to work.
            // https://developer.mozilla.org/en-US/docs/Web/API/Transferable
            // https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage
            const browserName = BrowserHelper.userAgentInfo.getBrowser().name;
            const message = {
                type: "work",
                requestId: this.workerScanRequestId,
                data: imageData,
                highQualitySingleFrameMode
            };
            if (browserName != null && browserName.includes("Safari")) {
                this.engineWorker.postMessage(message);
            }
            else {
                this.engineWorker.postMessage(message, [imageData.buffer]);
            }
        });
    }
    /**
     * @returns Whether the scanner is currently busy processing an image.
     */
    isBusyProcessing() {
        return this.workerScanQueueLength !== 0;
    }
    /**
     * @returns Whether the scanner has loaded the external Scandit Engine library and is ready to scan.
     */
    isReady() {
        return this.isReadyToWork;
    }
    on(eventName, listener) {
        if (eventName === "ready") {
            if (this.isReadyToWork) {
                listener();
            }
            else {
                this.eventEmitter.once(eventName, listener, this);
            }
        }
        else if (eventName === "licenseFeaturesReady") {
            if (this.licenseFeatures != null) {
                listener(this.licenseFeatures);
            }
            else {
                this.eventEmitter.once(eventName, listener, this);
            }
        }
        else {
            this.eventEmitter.on(eventName, listener, this);
        }
        return this;
    }
    /**
     * Add the listener function to the listeners array for the [[ready]] event, fired only once when the external
     * Scandit Engine library has been loaded and the scanner can thus start to scan barcodes.
     * If the external Scandit Engine library has already been loaded the listener is called immediately.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @deprecated Use the [[on]] method instead.
     *
     * @param listener The listener function.
     * @returns The updated [[Scanner]] object.
     */
    onReady(listener) {
        console.warn("The onReady(<listener>) method is deprecated and will be removed in the next major library version." +
            'Please use on("ready", <listener>) instead.');
        return this.on("ready", listener);
    }
    /**
     * *See the [[on]] method.*
     *
     * @param eventName The name of the event to listen to.
     * @param listener The listener function.
     * @returns The updated [[Scanner]] object.
     */
    addListener(eventName, listener) {
        return this.on(eventName, listener);
    }
    /**
     * Create a new parser object.
     *
     * @param dataFormat The format of the input data for the parser.
     * @returns The newly created parser.
     */
    createParserForFormat(dataFormat) {
        return new Parser(this, dataFormat);
    }
    /**
     * Return the current image settings.
     *
     * @returns The current image settings.
     */
    getImageSettings() {
        return this.imageSettings;
    }
    /**
     * Return the current scan settings.
     *
     * @returns The current scan settings.
     */
    getScanSettings() {
        return this.scanSettings;
    }
    /**
     * @hidden
     *
     * Process a given string using the Scandit Parser library,
     * parsing the data in the given format and retrieving the result as a [[ParserResult]] object.
     *
     * Multiple requests done without waiting for previous results will be queued and handled in order.
     *
     * If parsing of the data fails the returned promise is rejected with a `ScanditEngineError` error.
     *
     * @param dataFormat The format of the given data.
     * @param dataString The string containing the data to be parsed.
     * @param options Options for the specific data format parser.
     * @returns A promise resolving to the [[ParserResult]] object.
     */
    parseString(dataFormat, dataString, options) {
        this.workerParseRequestId++;
        return new Promise((resolve, reject) => {
            const parseStringResultEvent = `parseStringResult-${this.workerParseRequestId}`;
            const parseStringErrorEvent = `parseStringError-${this.workerParseRequestId}`;
            this.eventEmitter.once(parseStringResultEvent, (result) => {
                this.eventEmitter.removeAllListeners(parseStringErrorEvent);
                const parserResult = {
                    jsonString: result,
                    fields: [],
                    fieldsByName: {}
                };
                JSON.parse(result).forEach(parserField => {
                    parserResult.fields.push(parserField);
                    parserResult.fieldsByName[parserField.name] = parserField;
                });
                resolve(parserResult);
            });
            this.eventEmitter.once(parseStringErrorEvent, (error) => {
                console.error(`Scandit Engine error (${error.errorCode}):`, error.errorMessage);
                this.eventEmitter.removeAllListeners(parseStringResultEvent);
                const errorObject = new CustomError({
                    name: "ScanditEngineError",
                    message: `${error.errorMessage} (${error.errorCode})`
                });
                reject(errorObject);
            });
            this.engineWorker.postMessage({
                type: "parse-string",
                requestId: this.workerParseRequestId,
                dataFormat: dataFormat,
                dataString: dataString,
                options: options == null ? "{}" : JSON.stringify(options)
            });
        });
    }
    /**
     * @hidden
     *
     * Add the listener function to the listeners array for the "licenseFeaturesReady" event, fired only once
     * when the external Scandit Engine library has verified and loaded the license key and parsed its features.
     * If the license features are already available the listener is called immediately.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @param listener The listener function, which will be invoked with a *licenseFeatures* object.
     * @returns The updated [[Scanner]] object.
     */
    onLicenseFeaturesReady(listener) {
        return this.on("licenseFeaturesReady", listener);
    }
    /**
     * @hidden
     *
     * Add the listener function to the listeners array for the "newScanSettings" event, fired when new a new
     * [[ScanSettings]] object is applied via the [[applyScanSettings]] method.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @param listener The listener function, which will be invoked with a [[ScanSettings]] object.
     * @returns The updated [[Scanner]] object.
     */
    onNewScanSettings(listener) {
        return this.on("newScanSettings", listener);
    }
    /**
     * @hidden
     *
     * Remove the specified listener from the given event's listener array.
     *
     * @param eventName The name of the event from which to remove the listener.
     * @param listener The listener function to be removed.
     * @returns The updated [[Scanner]] object.
     */
    removeListener(eventName, listener) {
        this.eventEmitter.removeListener(eventName, listener);
        return this;
    }
    applyLicenseKey(licenseKey) {
        this.engineWorker.postMessage({
            type: "license-key",
            licenseKey: licenseKey
        });
        return this;
    }
    engineWorkerOnMessage(ev) {
        const messageType = ev.data[0];
        const messageData = ev.data[1];
        if (messageType === "status" && messageData === "ready") {
            this.isReadyToWork = true;
            this.eventEmitter.emit("ready");
        }
        else if (messageData != null) {
            if (messageType === "license-features") {
                this.licenseFeatures = messageData;
                this.eventEmitter.emit("licenseFeaturesReady", this.licenseFeatures);
            }
            else if (messageType === "work-result") {
                this.eventEmitter.emit(`workResult-${messageData.requestId}`, messageData.result);
                this.workerScanQueueLength--;
            }
            else if (messageType === "work-error") {
                this.eventEmitter.emit(`workError-${messageData.requestId}`, messageData.error);
                this.workerScanQueueLength--;
            }
            else if (messageType === "parse-string-result") {
                this.eventEmitter.emit(`parseStringResult-${messageData.requestId}`, messageData.result);
            }
            else if (messageType === "parse-string-error") {
                this.eventEmitter.emit(`parseStringError-${messageData.requestId}`, messageData.error);
            }
        }
    }
}
// istanbul ignore next
(function (Scanner) {
    /**
     * @hidden
     *
     * Fired when the external Scandit Engine library has verified and loaded the license key and parsed its features.
     *
     * @asMemberOf Scanner
     * @event
     * @param licenseFeatures The features of the used license key.
     */
    // @ts-ignore
    // declare function licenseFeaturesReady(licenseFeatures: any): void;
    /**
     * @hidden
     *
     * Fired when new a new [[ScanSettings]] object is applied via the [[applyScanSettings]] method.
     *
     * @asMemberOf Scanner
     * @event
     * @param newScanSettings The features of the used license key.
     */
    // @ts-ignore
    // declare function newScanSettings(newScanSettings: any): void;
})(Scanner || (Scanner = {}));
//# sourceMappingURL=scanner.js.map