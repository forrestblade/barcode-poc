"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var barcode_1 = require("./barcode");
var symbologySettings_1 = require("./symbologySettings");
/**
 * A configuration object for scanning options.
 *
 * Modified ScanSettings need to be applied to a scanner via
 * [[BarcodePicker.applyScanSettings]] or [[Scanner.applyScanSettings]] to take effect.
 */
var ScanSettings = /** @class */ (function () {
    /**
     * Create a ScanSettings instance.
     *
     * @param enabledSymbologies <div class="tsd-signature-symbol">Default =&nbsp;[]</div>
     * The single symbology or list/set of symbologies that should be initialized as enabled for recognition.
     * @param codeDuplicateFilter <div class="tsd-signature-symbol">Default =&nbsp;0</div>
     * The duplicate filter specifying how often a code can be scanned.
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     * When the same code (data/symbology) is scanned within the specified interval it is filtered out as a duplicate.
     * @param maxNumberOfCodesPerFrame <div class="tsd-signature-symbol">Default =&nbsp;1</div>
     * The maximum number of barcodes to be recognized every frame.
     * @param searchArea <div class="tsd-signature-symbol">Default =&nbsp;{ x: 0, y: 0, width: 1.0, height: 1.0 }</div>
     * The area of the image in which barcodes are searched.
     * @param gpuAcceleration <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to enable/disable GPU support via WebGL, to provide faster and more accurate barcode localization.
     * The GPU can and will be used only if the browser also supports the needed technologies
     * ([WebGL](https://caniuse.com/#feat=webgl) and [OffscreenCanvas](https://caniuse.com/#feat=offscreencanvas)).
     * @param blurryRecognition <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to enable/disable blurry recognition, to allow accurate scanning capabilities for out-of-focus (1D) codes.
     * If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order
     * to successfully decode/scan difficult codes.
     */
    function ScanSettings(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.enabledSymbologies, enabledSymbologies = _c === void 0 ? [] : _c, _d = _b.codeDuplicateFilter, codeDuplicateFilter = _d === void 0 ? 0 : _d, _e = _b.maxNumberOfCodesPerFrame, maxNumberOfCodesPerFrame = _e === void 0 ? 1 : _e, _f = _b.searchArea, searchArea = _f === void 0 ? { x: 0, y: 0, width: 1.0, height: 1.0 } : _f, _g = _b.gpuAcceleration, gpuAcceleration = _g === void 0 ? true : _g, _h = _b.blurryRecognition, blurryRecognition = _h === void 0 ? true : _h;
        this.symbologySettings = new Map();
        this.enableSymbologies(enabledSymbologies);
        this.codeDuplicateFilter = codeDuplicateFilter;
        this.maxNumberOfCodesPerFrame = maxNumberOfCodesPerFrame;
        this.baseSearchArea = { x: 0, y: 0, width: 1.0, height: 1.0 };
        this.searchArea = searchArea;
        this.gpuAcceleration = gpuAcceleration;
        this.blurryRecognition = blurryRecognition;
    }
    /**
     * @returns The configuration object as a JSON string.
     */
    ScanSettings.prototype.toJSONString = function () {
        var symbologies = {};
        this.symbologySettings.forEach(function (symbologySettings, symbology) {
            symbologies[barcode_1.Barcode.Symbology.toJSONName(symbology)] = symbologySettings;
        });
        var combinedSearchArea = {
            x: Math.min(1, this.baseSearchArea.x + this.searchArea.x * this.baseSearchArea.width),
            y: Math.min(1, this.baseSearchArea.y + this.searchArea.y * this.baseSearchArea.height),
            width: Math.min(1, this.baseSearchArea.width * this.searchArea.width),
            height: Math.min(1, this.baseSearchArea.height * this.searchArea.height)
        };
        var isFullSearchArea = Math.round(combinedSearchArea.x * 100) === 0 &&
            Math.round(combinedSearchArea.y * 100) === 0 &&
            Math.round(combinedSearchArea.width * 100) === 100 &&
            Math.round(combinedSearchArea.height * 100) === 100;
        return JSON.stringify({
            symbologies: symbologies,
            codeDuplicateFilter: this.codeDuplicateFilter,
            maxNumberOfCodesPerFrame: this.maxNumberOfCodesPerFrame,
            searchArea: combinedSearchArea,
            codeLocation1d: isFullSearchArea
                ? undefined
                : {
                    area: {
                        x: combinedSearchArea.x,
                        y: combinedSearchArea.y + (combinedSearchArea.height * 0.75) / 2,
                        width: combinedSearchArea.width,
                        height: combinedSearchArea.height * 0.25
                    }
                },
            codeLocation2d: isFullSearchArea
                ? undefined
                : {
                    area: combinedSearchArea
                },
            gpuAcceleration: this.gpuAcceleration,
            blurryRecognition: this.blurryRecognition
        });
    };
    /**
     * Get the configuration object for a symbology (which can then be modified).
     *
     * @param symbology The symbology for which to retrieve the configuration.
     * @returns The symbology configuration object for the specified symbology.
     */
    ScanSettings.prototype.getSymbologySettings = function (symbology) {
        if (this.symbologySettings.has(symbology)) {
            return this.symbologySettings.get(symbology);
        }
        else {
            if (symbology in barcode_1.Barcode.Symbology || Object.values(barcode_1.Barcode.Symbology).includes(symbology)) {
                this.symbologySettings.set(symbology, new symbologySettings_1.SymbologySettings());
                return this.symbologySettings.get(symbology);
            }
            else {
                throw new TypeError("Invalid symbology \"" + symbology + "\"");
            }
        }
    };
    /**
     * Get the recognition enabled status for a symbology.
     *
     * @param symbology The symbology for which to retrieve the recognition enabled status.
     * @returns Whether the symbology enabled for recognition.
     */
    ScanSettings.prototype.isSymbologyEnabled = function (symbology) {
        return this.getSymbologySettings(symbology).isEnabled();
    };
    /**
     * Enable recognition of a symbology or list/set of symbologies.
     *
     * @param symbology The single symbology or list/set of symbologies to enable.
     * @returns The updated [[ScanSettings]] object.
     */
    ScanSettings.prototype.enableSymbologies = function (symbology) {
        return this.setSymbologiesEnabled(symbology, true);
    };
    /**
     * Disable recognition of a symbology or list/set of symbologies.
     *
     * @param symbology The single symbology or list/set of symbologies to disable.
     * @returns The updated [[ScanSettings]] object.
     */
    ScanSettings.prototype.disableSymbologies = function (symbology) {
        return this.setSymbologiesEnabled(symbology, false);
    };
    /**
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     *
     * @returns The code duplicate filter value.
     */
    ScanSettings.prototype.getCodeDuplicateFilter = function () {
        return this.codeDuplicateFilter;
    };
    /**
     * Set the code duplicate filter value.
     *
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     *
     * @param durationMilliseconds The new value (-1, 0, or positive integer).
     * @returns The updated [[ScanSettings]] object.
     */
    ScanSettings.prototype.setCodeDuplicateFilter = function (durationMilliseconds) {
        this.codeDuplicateFilter = durationMilliseconds;
        return this;
    };
    /**
     * @returns The maximum number of barcodes to be recognized every frame.
     */
    ScanSettings.prototype.getMaxNumberOfCodesPerFrame = function () {
        return this.maxNumberOfCodesPerFrame;
    };
    /**
     * Set the maximum number of barcodes to be recognized every frame.
     *
     * @param limit The new value (non-zero positive integer).
     * @returns The updated [[ScanSettings]] object.
     */
    ScanSettings.prototype.setMaxNumberOfCodesPerFrame = function (limit) {
        this.maxNumberOfCodesPerFrame = limit;
        return this;
    };
    /**
     * @returns The area of the image in which barcodes are searched.
     */
    ScanSettings.prototype.getSearchArea = function () {
        return this.searchArea;
    };
    /**
     * Set the area of the image in which barcodes are searched.
     *
     * @param searchArea The new search area.
     * @returns The updated [[ScanSettings]] object.
     */
    ScanSettings.prototype.setSearchArea = function (searchArea) {
        this.searchArea = searchArea;
        return this;
    };
    /**
     * @hidden
     *
     * @returns The base area of the image in which barcodes are searched.
     */
    ScanSettings.prototype.getBaseSearchArea = function () {
        return this.baseSearchArea;
    };
    /**
     * @hidden
     *
     * Set the base area of the image in which barcodes are searched, this is set automatically by a [[BarcodePicker]]
     * and is combined with the searchArea to obtain the final combined search area.
     *
     * @param baseSearchArea The new base search area.
     * @returns The updated [[ScanSettings]] object.
     */
    ScanSettings.prototype.setBaseSearchArea = function (baseSearchArea) {
        this.baseSearchArea = baseSearchArea;
        return this;
    };
    /**
     * @returns Whether GPU acceleration is configured to be enabled ot not.
     *
     * Note that this refers to the settings: depending on browser capabilities the actual GPU usage might be prevented.
     */
    ScanSettings.prototype.isGpuAccelerationEnabled = function () {
        return this.gpuAcceleration;
    };
    /**
     * Enable or disable GPU acceleration.
     *
     * Provide faster and more accurate barcode localization.
     * The GPU can and will be used only if the browser also supports the needed technologies
     * ([WebGL](https://caniuse.com/#feat=webgl) and [OffscreenCanvas](https://caniuse.com/#feat=offscreencanvas)).
     *
     * @param enabled Whether to enable or disable GPU acceleration.
     * @returns The updated [[ScanSettings]] object.
     */
    ScanSettings.prototype.setGpuAccelerationEnabled = function (enabled) {
        this.gpuAcceleration = enabled;
        return this;
    };
    /**
     * @returns Whether blurry recognition is configured to be enabled ot not.
     */
    ScanSettings.prototype.isBlurryRecognitionEnabled = function () {
        return this.blurryRecognition;
    };
    /**
     * Enable or disable blurry recognition.
     *
     * Allow accurate scanning capabilities for out-of-focus (1D) codes.
     * If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order
     * to successfully decode/scan difficult codes.
     *
     * @param enabled Whether to enable or disable blurry recognition.
     * @returns The updated [[ScanSettings]] object.
     */
    ScanSettings.prototype.setBlurryRecognitionEnabled = function (enabled) {
        this.blurryRecognition = enabled;
        return this;
    };
    ScanSettings.prototype.setSingleSymbologyEnabled = function (symbology, enabled) {
        if (symbology in barcode_1.Barcode.Symbology || Object.values(barcode_1.Barcode.Symbology).includes(symbology)) {
            if (this.symbologySettings.has(symbology)) {
                this.symbologySettings.get(symbology).setEnabled(enabled);
            }
            else {
                this.symbologySettings.set(symbology, new symbologySettings_1.SymbologySettings({ enabled: enabled }));
            }
        }
        else {
            throw new TypeError("Invalid symbology \"" + symbology + "\"");
        }
    };
    ScanSettings.prototype.setMultipleSymbologiesEnabled = function (symbology, enabled) {
        var e_1, _a, e_2, _b;
        try {
            for (var symbology_1 = tslib_1.__values(symbology), symbology_1_1 = symbology_1.next(); !symbology_1_1.done; symbology_1_1 = symbology_1.next()) {
                var s = symbology_1_1.value;
                if (!(s in barcode_1.Barcode.Symbology || Object.values(barcode_1.Barcode.Symbology).includes(s))) {
                    throw new TypeError("Invalid symbology \"" + s + "\"");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (symbology_1_1 && !symbology_1_1.done && (_a = symbology_1.return)) _a.call(symbology_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var symbology_2 = tslib_1.__values(symbology), symbology_2_1 = symbology_2.next(); !symbology_2_1.done; symbology_2_1 = symbology_2.next()) {
                var s = symbology_2_1.value;
                if (this.symbologySettings.has(s)) {
                    this.symbologySettings.get(s).setEnabled(enabled);
                }
                else {
                    this.symbologySettings.set(s, new symbologySettings_1.SymbologySettings({ enabled: enabled }));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (symbology_2_1 && !symbology_2_1.done && (_b = symbology_2.return)) _b.call(symbology_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    ScanSettings.prototype.setSymbologiesEnabled = function (symbology, enabled) {
        if (typeof symbology === "object") {
            this.setMultipleSymbologiesEnabled(symbology, enabled);
        }
        else {
            this.setSingleSymbologyEnabled(symbology, enabled);
        }
        return this;
    };
    return ScanSettings;
}());
exports.ScanSettings = ScanSettings;
//# sourceMappingURL=scanSettings.js.map