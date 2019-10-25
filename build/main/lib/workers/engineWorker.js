"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 * @returns Engine
 */
// tslint:disable-next-line:max-func-body-length
function engine() {
    var scanQueue = [];
    var parseQueue = [];
    var gpuAccelerationAvailable = typeof self.OffscreenCanvas === "function";
    var imageBufferPointer;
    var licenseKey;
    var settings;
    var imageSettings;
    var scanWorkSubmitted = false;
    var fileSystemSynced = false;
    var runtimeLoaded = false;
    var wasmReady = false;
    var scannerSettingsReady = false;
    var scannerImageSettingsReady = false;
    var contextAvailable = false;
    var fsSyncInProgress;
    var fsSyncScheduled = false;
    // Public
    // Promise is used only during testing
    function loadLibrary(deviceId, libraryLocation, locationPath) {
        function start() {
            if (!wasmReady && fileSystemSynced && runtimeLoaded) {
                wasmReady = true;
                Module.callMain();
                postMessage(["status", "ready"]);
                workOnScanQueue();
                workOnParseQueue();
            }
        }
        var _a = getLibraryLocationURIs(libraryLocation), jsURI = _a.jsURI, wasmURI = _a.wasmURI;
        Module = {
            arguments: [deviceId],
            canvas: gpuAccelerationAvailable ? new self.OffscreenCanvas(32, 32) : /* istanbul ignore next */ undefined,
            instantiateWasm: function (importObject, successCallback) {
                // wasmJSVersion is globally defined inside scandit-engine-sdk.min.js
                var wasmJSVersion = self.wasmJSVersion;
                // istanbul ignore if
                if (wasmJSVersion == null) {
                    wasmJSVersion = "undefined";
                }
                // istanbul ignore if
                if (wasmJSVersion !== "4.3.0") {
                    console.error("The Scandit SDK Engine library JS file found at " + jsURI + " seems invalid: " +
                        ("expected version doesn't match (received: " + wasmJSVersion + ", expected: " + "4.3.0" + "). ") +
                        "Please ensure the correct Scandit SDK Engine file (with correct version) is retrieved.");
                }
                if (typeof self.WebAssembly.instantiateStreaming === "function") {
                    instantiateWebAssemblyStreaming(importObject, wasmURI, successCallback);
                }
                else {
                    instantiateWebAssembly(importObject, wasmURI, successCallback);
                }
                return {};
            },
            noInitialRun: true,
            preRun: function () {
                try {
                    FS.mkdir("/scandit_sync_folder");
                }
                catch (error) {
                    // istanbul ignore next
                    if (error.code !== "EEXIST") {
                        throw error;
                    }
                }
                FS.mount(IDBFS, {}, "/scandit_sync_folder");
                FS.syncfs(true, function () {
                    fileSystemSynced = true;
                    start();
                });
            },
            onRuntimeInitialized: function () {
                runtimeLoaded = true;
                start();
            }
        };
        self.window = self.document = self; // Fix some Emscripten quirks
        self.path = locationPath; // Used by the Scandit SDK Engine library
        function tryImportScripts() {
            try {
                var importScriptsResults = importScripts(jsURI);
                // istanbul ignore else
                if (importScriptsResults != null) {
                    return importScriptsResults;
                }
                else {
                    return Promise.resolve();
                }
            }
            catch (error) {
                return Promise.reject(error);
            }
        }
        return retryWithExponentialBackoff(tryImportScripts, 250, 4000, function (error) {
            console.warn(error);
            console.warn("Couldn't retrieve Scandit SDK Engine library at " + jsURI + ", retrying...");
        }).catch(function (error) {
            console.error(error);
            console.error("Couldn't retrieve Scandit SDK Engine library at " + jsURI + ", did you configure the path for it correctly?");
            return Promise.resolve(error); // Promise is used only during testing
        });
    }
    function createContext(newLicenseKey) {
        licenseKey = newLicenseKey;
        if (contextAvailable || licenseKey == null || !wasmReady) {
            return;
        }
        var licenseKeyLength = Module.lengthBytesUTF8(licenseKey) + 1;
        var licenseKeyPointer = Module._malloc(licenseKeyLength);
        Module.stringToUTF8(licenseKey, licenseKeyPointer, licenseKeyLength);
        Module._create_context(licenseKeyPointer, false);
        Module._free(licenseKeyPointer);
        contextAvailable = true;
        postMessage([
            "license-features",
            {
                hiddenScanditLogoAllowed: Module._can_hide_logo() === 1
            }
        ]);
    }
    function setSettings(newSettings) {
        settings = newSettings;
        applySettings();
    }
    function setImageSettings(newImageSettings) {
        imageSettings = newImageSettings;
        applyImageSettings();
    }
    function processScanWorkUnit(currentScanWorkUnit) {
        var resultData;
        if (currentScanWorkUnit.highQualitySingleFrameMode) {
            applySettings(true);
        }
        // TODO: For now it's not possible to use imported variables as the worker doesn't have access at runtime
        if (imageSettings.format.valueOf() === 1) {
            // RGB_8U
            resultData = scanImage(convertImageDataToGrayscale(currentScanWorkUnit.data, 3));
        }
        else if (imageSettings.format.valueOf() === 2) {
            // RGBA_8U
            resultData = scanImage(convertImageDataToGrayscale(currentScanWorkUnit.data, 4));
        }
        else {
            // GRAY_8U
            resultData = scanImage(currentScanWorkUnit.data);
        }
        if (currentScanWorkUnit.highQualitySingleFrameMode) {
            applySettings(false);
        }
        var result = JSON.parse(resultData);
        if (result.error != null) {
            postMessage([
                "work-error",
                {
                    requestId: currentScanWorkUnit.requestId,
                    error: result.error
                }
            ]);
        }
        else {
            // istanbul ignore else
            if (result.scanResult != null) {
                if (result.scanResult.length > 0 || fsSyncInProgress == null) {
                    syncFS();
                }
                postMessage([
                    "work-result",
                    {
                        requestId: currentScanWorkUnit.requestId,
                        result: result
                    }
                ]);
            }
            else {
                console.error("Unrecognized Scandit Engine result:", result);
                postMessage([""], [currentScanWorkUnit.data.buffer]);
            }
        }
    }
    function workOnScanQueue() {
        if ((!scannerSettingsReady || !scannerImageSettingsReady) && scanQueue.length !== 0) {
            // First submitted work unit
            createContext(licenseKey);
            applySettings();
            applyImageSettings();
        }
        if (!scannerSettingsReady || !scannerImageSettingsReady || scanQueue.length === 0) {
            return;
        }
        while (scanQueue.length !== 0) {
            processScanWorkUnit(scanQueue.shift());
        }
    }
    function workOnParseQueue() {
        if (!contextAvailable && parseQueue.length !== 0) {
            // First submitted work unit
            createContext(licenseKey);
        }
        if (!contextAvailable || !wasmReady || parseQueue.length === 0) {
            return;
        }
        var currentParseWorkUnit;
        var resultData;
        while (parseQueue.length !== 0) {
            currentParseWorkUnit = parseQueue.shift();
            resultData = parseString(currentParseWorkUnit.dataFormat, currentParseWorkUnit.dataString, currentParseWorkUnit.options);
            var result = JSON.parse(resultData);
            if (result.error != null) {
                postMessage([
                    "parse-string-error",
                    {
                        requestId: currentParseWorkUnit.requestId,
                        error: result.error
                    }
                ]);
            }
            else {
                // istanbul ignore else
                if (result.result != null) {
                    postMessage([
                        "parse-string-result",
                        {
                            requestId: currentParseWorkUnit.requestId,
                            result: result.result
                        }
                    ]);
                }
                else {
                    console.error("Unrecognized Scandit Parser result:", result);
                    postMessage([
                        "parse-string-error",
                        {
                            requestId: currentParseWorkUnit.requestId,
                            error: {
                                errorCode: -1,
                                errorMessage: "Unknown Scandit Parser error"
                            }
                        }
                    ]);
                }
            }
        }
        syncFS();
    }
    function addScanWorkUnit(scanWorkUnit) {
        scanWorkSubmitted = true;
        scanQueue.push(scanWorkUnit);
        workOnScanQueue();
    }
    function addParseWorkUnit(parseWorkUnit) {
        parseQueue.push(parseWorkUnit);
        workOnParseQueue();
    }
    function clearSession() {
        if (scannerSettingsReady) {
            Module._scanner_session_clear();
        }
    }
    // Private
    function retryWithExponentialBackoff(handler, backoffMs, maxBackoffMs, singleTryRejectionCallback) {
        return new Promise(function (resolve, reject) {
            handler()
                .then(resolve)
                .catch(function (error) {
                var newBackoffMs = backoffMs * 2;
                if (newBackoffMs > maxBackoffMs) {
                    return reject(error);
                }
                singleTryRejectionCallback(error);
                setTimeout(function () {
                    retryWithExponentialBackoff(handler, newBackoffMs, maxBackoffMs, singleTryRejectionCallback)
                        .then(resolve)
                        .catch(reject);
                }, backoffMs);
            });
        });
    }
    function getLibraryLocationURIs(libraryLocation) {
        var cdnURI = false;
        if (/^https?:\/\/([^\/.]*\.)*cdn.jsdelivr.net\//.test(libraryLocation)) {
            libraryLocation = "https://cdn.jsdelivr.net/npm/scandit-sdk@4.3.0/build/";
            cdnURI = true;
        }
        else if (/^https?:\/\/([^\/.]*\.)*unpkg.com\//.test(libraryLocation)) {
            libraryLocation = "https://unpkg.com/scandit-sdk@4.3.0/build/";
            cdnURI = true;
        }
        if (cdnURI) {
            return {
                jsURI: libraryLocation + "scandit-engine-sdk.min.js",
                wasmURI: libraryLocation + "scandit-engine-sdk.wasm"
            };
        }
        return {
            jsURI: libraryLocation + "scandit-engine-sdk.min.js?v=4.3.0",
            wasmURI: libraryLocation + "scandit-engine-sdk.wasm?v=4.3.0"
        };
    }
    function arrayBufferToHexString(arrayBuffer) {
        return Array.from(new Uint8Array(arrayBuffer))
            .map(function (byteNumber) {
            var byteHex = byteNumber.toString(16);
            return byteHex.length === 1 ? /* istanbul ignore next */ "0" + byteHex : byteHex;
        })
            .join("");
    }
    function applySettings(highQualitySingleFrameMode) {
        if (highQualitySingleFrameMode === void 0) { highQualitySingleFrameMode = false; }
        if (settings == null || !contextAvailable || !wasmReady || !scanWorkSubmitted) {
            return;
        }
        scannerSettingsReady = false;
        var parsedSettings = JSON.parse(settings);
        var settingsLength = Module.lengthBytesUTF8(settings) + 1;
        var settingsPointer = Module._malloc(settingsLength);
        Module.stringToUTF8(settings, settingsPointer, settingsLength);
        var resultPointer = Module._scanner_settings_new_from_json(settingsPointer, parsedSettings.blurryRecognition, parsedSettings.matrixScanEnabled, highQualitySingleFrameMode, gpuAccelerationAvailable && parsedSettings.gpuAcceleration);
        Module._free(settingsPointer);
        var result = Module.UTF8ToString(resultPointer);
        if (result !== "") {
            scannerSettingsReady = true;
            console.debug(JSON.parse(result));
        }
    }
    function applyImageSettings() {
        if (imageSettings == null || !wasmReady || !scanWorkSubmitted) {
            return;
        }
        scannerImageSettingsReady = false;
        // We allocate for a grayscale image only as we will do a conversion here in the worker before passing it
        Module._scanner_image_settings_new(imageSettings.width, imageSettings.height, 1);
        if (imageBufferPointer != null) {
            Module._free(imageBufferPointer);
            imageBufferPointer = undefined;
        }
        imageBufferPointer = Module._malloc(imageSettings.width * imageSettings.height);
        scannerImageSettingsReady = true;
    }
    function convertImageDataToGrayscale(imageData, channels) {
        var grayscaleImageData = new Uint8ClampedArray(imageData.length / channels);
        var grayscaleImageDataIndex = imageData.length / channels - 1;
        var imageDataIndex = imageData.length - channels;
        while (imageDataIndex >= 0) {
            grayscaleImageData[grayscaleImageDataIndex--] =
                imageData[imageDataIndex] * 0.299 +
                    imageData[imageDataIndex + 1] * 0.587 +
                    imageData[imageDataIndex + 2] * 0.114;
            imageDataIndex -= channels;
        }
        return grayscaleImageData;
    }
    function scanImage(imageData) {
        Module.HEAPU8.set(imageData, imageBufferPointer);
        return Module.UTF8ToString(Module._scanner_scan(imageBufferPointer));
    }
    function parseString(dataFormat, dataString, options) {
        var dataStringLength = Module.lengthBytesUTF8(dataString) + 1;
        var dataStringPointer = Module._malloc(dataStringLength);
        Module.stringToUTF8(dataString, dataStringPointer, dataStringLength);
        var optionsLength = Module.lengthBytesUTF8(options) + 1;
        var optionsPointer = Module._malloc(optionsLength);
        Module.stringToUTF8(options, optionsPointer, optionsLength);
        var resultPointer = Module._parser_parse_string(dataFormat.valueOf(), dataStringPointer, dataStringLength - 1, optionsPointer);
        Module._free(dataStringPointer);
        Module._free(optionsPointer);
        return Module.UTF8ToString(resultPointer);
    }
    function verifiedWasmFetch(wasmURI, awaitFullResponse) {
        function verifyResponseData(responseData) {
            // istanbul ignore else
            if (crypto.subtle != null && typeof crypto.subtle === "object" && typeof crypto.subtle.digest === "function") {
                crypto.subtle.digest("SHA-256", responseData).then(function (hash) {
                    var hashString = arrayBufferToHexString(hash);
                    // istanbul ignore if
                    if (hashString !== "db47c76cfbc6c82736dcf6ae97c6d2d2eb8055e9461e2acc0cc050880a6c0252") {
                        console.error("The Scandit SDK Engine library WASM file found at " + wasmURI + " seems invalid: " +
                            ("expected file hash doesn't match (received: " + hashString + ", ") +
                            ("expected: " + "db47c76cfbc6c82736dcf6ae97c6d2d2eb8055e9461e2acc0cc050880a6c0252" + "). ") +
                            "Please ensure the correct Scandit SDK Engine file (with correct version) is retrieved.");
                    }
                });
            }
            else {
                console.warn("Insecure origin (see https://goo.gl/Y0ZkNV): " +
                    ("The hash of the Scandit SDK Engine library WASM file found at " + wasmURI + " could not be verified"));
            }
        }
        function tryFetch() {
            return new Promise(function (resolve, reject) {
                fetch(wasmURI)
                    .then(function (response) {
                    // istanbul ignore else
                    if (response.ok) {
                        response
                            .clone()
                            .arrayBuffer()
                            .then(function (responseData) {
                            if (awaitFullResponse) {
                                resolve(response);
                            }
                            verifyResponseData(responseData);
                        })
                            .catch(
                        // istanbul ignore next
                        function (error) {
                            if (awaitFullResponse) {
                                reject(error);
                            }
                        });
                        if (!awaitFullResponse) {
                            resolve(response);
                        }
                    }
                    else {
                        reject(new Error("HTTP status code is not ok"));
                    }
                })
                    .catch(function (error) {
                    reject(error);
                });
            });
        }
        return retryWithExponentialBackoff(tryFetch, 250, 4000, function (error) {
            console.warn(error);
            console.warn("Couldn't retrieve Scandit SDK Engine library at " + wasmURI + ", retrying...");
        }).catch(function (error) {
            console.error(error);
            console.error("Couldn't retrieve/instantiate Scandit SDK Engine library at " + wasmURI + ", " +
                "did you configure the path for it correctly?");
            return Promise.reject(error);
        });
    }
    function instantiateWebAssembly(importObject, wasmURI, successCallback) {
        verifiedWasmFetch(wasmURI, true)
            .then(function (response) {
            return response.arrayBuffer();
        })
            .then(function (bytes) {
            return self.WebAssembly.instantiate(bytes, importObject)
                .then(function (results) {
                successCallback(results.instance);
            })
                .catch(function (error) {
                console.error(error);
                console.error("Couldn't instantiate Scandit SDK Engine library at " + wasmURI + ", " +
                    "did you configure the path for it correctly?");
            });
        })
            .catch(
        /* istanbul ignore next */ function () {
            // Ignored
        });
    }
    function instantiateWebAssemblyStreaming(importObject, wasmURI, successCallback) {
        verifiedWasmFetch(wasmURI, false)
            .then(function (response) {
            self.WebAssembly.instantiateStreaming(response, importObject)
                .then(function (results) {
                successCallback(results.instance);
            })
                .catch(function (error) {
                console.warn(error);
                console.warn("WebAssembly streaming compile failed. " +
                    "Falling back to ArrayBuffer instantiation (this will make things slower)");
                instantiateWebAssembly(importObject, wasmURI, successCallback);
            });
        })
            .catch(
        /* istanbul ignore next */ function () {
            // Ignored
        });
    }
    function syncFS() {
        // istanbul ignore if
        if (fsSyncInProgress === true) {
            fsSyncScheduled = true;
        }
        else {
            fsSyncInProgress = true;
            fsSyncScheduled = false;
            FS.syncfs(false, function () {
                fsSyncInProgress = false;
                // istanbul ignore if
                if (fsSyncScheduled) {
                    syncFS();
                }
            });
        }
    }
    return {
        loadLibrary: loadLibrary,
        createContext: createContext,
        setSettings: setSettings,
        setImageSettings: setImageSettings,
        workOnScanQueue: workOnScanQueue,
        workOnParseQueue: workOnParseQueue,
        addScanWorkUnit: addScanWorkUnit,
        addParseWorkUnit: addParseWorkUnit,
        clearSession: clearSession
    };
}
exports.engine = engine;
/**
 * @hidden
 */
// istanbul ignore next
function engineWorkerFunction() {
    var engineInstance = engine();
    onmessage = function (e) {
        // Setting settings triggers license verification and activation: delay until first frame processed
        var data = e.data;
        switch (data.type) {
            case "load-library":
                engineInstance.loadLibrary(data.deviceId, data.libraryLocation, data.path);
                break;
            case "license-key":
                engineInstance.createContext(data.licenseKey);
                engineInstance.workOnParseQueue();
                break;
            case "settings":
                engineInstance.setSettings(data.settings);
                engineInstance.workOnScanQueue();
                break;
            case "image-settings":
                engineInstance.setImageSettings(data.imageSettings);
                engineInstance.workOnScanQueue();
                break;
            case "work":
                engineInstance.addScanWorkUnit({
                    requestId: data.requestId,
                    data: data.data,
                    highQualitySingleFrameMode: data.highQualitySingleFrameMode
                });
                break;
            case "parse-string":
                engineInstance.addParseWorkUnit({
                    requestId: data.requestId,
                    dataFormat: data.dataFormat,
                    dataString: data.dataString,
                    options: data.options
                });
                break;
            case "clear-session":
                engineInstance.clearSession();
                break;
            default:
                break;
        }
    };
}
exports.engineWorkerFunction = engineWorkerFunction;
/**
 * @hidden
 */
exports.engineWorkerBlob = new Blob(["var Module;" + engine.toString() + "(" + engineWorkerFunction.toString() + ")()"], {
    type: "text/javascript"
});
//# sourceMappingURL=engineWorker.js.map