import { Barcode } from "./barcode";
import { SymbologySettings } from "./symbologySettings";
/**
 * A configuration object for scanning options.
 *
 * Modified ScanSettings need to be applied to a scanner via
 * [[BarcodePicker.applyScanSettings]] or [[Scanner.applyScanSettings]] to take effect.
 */
export class ScanSettings {
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
    constructor({ enabledSymbologies = [], codeDuplicateFilter = 0, maxNumberOfCodesPerFrame = 1, searchArea = { x: 0, y: 0, width: 1.0, height: 1.0 }, gpuAcceleration = true, blurryRecognition = true } = {}) {
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
    toJSONString() {
        const symbologies = {};
        this.symbologySettings.forEach((symbologySettings, symbology) => {
            symbologies[Barcode.Symbology.toJSONName(symbology)] = symbologySettings;
        });
        const combinedSearchArea = {
            x: Math.min(1, this.baseSearchArea.x + this.searchArea.x * this.baseSearchArea.width),
            y: Math.min(1, this.baseSearchArea.y + this.searchArea.y * this.baseSearchArea.height),
            width: Math.min(1, this.baseSearchArea.width * this.searchArea.width),
            height: Math.min(1, this.baseSearchArea.height * this.searchArea.height)
        };
        const isFullSearchArea = Math.round(combinedSearchArea.x * 100) === 0 &&
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
    }
    /**
     * Get the configuration object for a symbology (which can then be modified).
     *
     * @param symbology The symbology for which to retrieve the configuration.
     * @returns The symbology configuration object for the specified symbology.
     */
    getSymbologySettings(symbology) {
        if (this.symbologySettings.has(symbology)) {
            return this.symbologySettings.get(symbology);
        }
        else {
            if (symbology in Barcode.Symbology || Object.values(Barcode.Symbology).includes(symbology)) {
                this.symbologySettings.set(symbology, new SymbologySettings());
                return this.symbologySettings.get(symbology);
            }
            else {
                throw new TypeError(`Invalid symbology "${symbology}"`);
            }
        }
    }
    /**
     * Get the recognition enabled status for a symbology.
     *
     * @param symbology The symbology for which to retrieve the recognition enabled status.
     * @returns Whether the symbology enabled for recognition.
     */
    isSymbologyEnabled(symbology) {
        return this.getSymbologySettings(symbology).isEnabled();
    }
    /**
     * Enable recognition of a symbology or list/set of symbologies.
     *
     * @param symbology The single symbology or list/set of symbologies to enable.
     * @returns The updated [[ScanSettings]] object.
     */
    enableSymbologies(symbology) {
        return this.setSymbologiesEnabled(symbology, true);
    }
    /**
     * Disable recognition of a symbology or list/set of symbologies.
     *
     * @param symbology The single symbology or list/set of symbologies to disable.
     * @returns The updated [[ScanSettings]] object.
     */
    disableSymbologies(symbology) {
        return this.setSymbologiesEnabled(symbology, false);
    }
    /**
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     *
     * @returns The code duplicate filter value.
     */
    getCodeDuplicateFilter() {
        return this.codeDuplicateFilter;
    }
    /**
     * Set the code duplicate filter value.
     *
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     *
     * @param durationMilliseconds The new value (-1, 0, or positive integer).
     * @returns The updated [[ScanSettings]] object.
     */
    setCodeDuplicateFilter(durationMilliseconds) {
        this.codeDuplicateFilter = durationMilliseconds;
        return this;
    }
    /**
     * @returns The maximum number of barcodes to be recognized every frame.
     */
    getMaxNumberOfCodesPerFrame() {
        return this.maxNumberOfCodesPerFrame;
    }
    /**
     * Set the maximum number of barcodes to be recognized every frame.
     *
     * @param limit The new value (non-zero positive integer).
     * @returns The updated [[ScanSettings]] object.
     */
    setMaxNumberOfCodesPerFrame(limit) {
        this.maxNumberOfCodesPerFrame = limit;
        return this;
    }
    /**
     * @returns The area of the image in which barcodes are searched.
     */
    getSearchArea() {
        return this.searchArea;
    }
    /**
     * Set the area of the image in which barcodes are searched.
     *
     * @param searchArea The new search area.
     * @returns The updated [[ScanSettings]] object.
     */
    setSearchArea(searchArea) {
        this.searchArea = searchArea;
        return this;
    }
    /**
     * @hidden
     *
     * @returns The base area of the image in which barcodes are searched.
     */
    getBaseSearchArea() {
        return this.baseSearchArea;
    }
    /**
     * @hidden
     *
     * Set the base area of the image in which barcodes are searched, this is set automatically by a [[BarcodePicker]]
     * and is combined with the searchArea to obtain the final combined search area.
     *
     * @param baseSearchArea The new base search area.
     * @returns The updated [[ScanSettings]] object.
     */
    setBaseSearchArea(baseSearchArea) {
        this.baseSearchArea = baseSearchArea;
        return this;
    }
    /**
     * @returns Whether GPU acceleration is configured to be enabled ot not.
     *
     * Note that this refers to the settings: depending on browser capabilities the actual GPU usage might be prevented.
     */
    isGpuAccelerationEnabled() {
        return this.gpuAcceleration;
    }
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
    setGpuAccelerationEnabled(enabled) {
        this.gpuAcceleration = enabled;
        return this;
    }
    /**
     * @returns Whether blurry recognition is configured to be enabled ot not.
     */
    isBlurryRecognitionEnabled() {
        return this.blurryRecognition;
    }
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
    setBlurryRecognitionEnabled(enabled) {
        this.blurryRecognition = enabled;
        return this;
    }
    setSingleSymbologyEnabled(symbology, enabled) {
        if (symbology in Barcode.Symbology || Object.values(Barcode.Symbology).includes(symbology)) {
            if (this.symbologySettings.has(symbology)) {
                this.symbologySettings.get(symbology).setEnabled(enabled);
            }
            else {
                this.symbologySettings.set(symbology, new SymbologySettings({ enabled: enabled }));
            }
        }
        else {
            throw new TypeError(`Invalid symbology "${symbology}"`);
        }
    }
    setMultipleSymbologiesEnabled(symbology, enabled) {
        for (const s of symbology) {
            if (!(s in Barcode.Symbology || Object.values(Barcode.Symbology).includes(s))) {
                throw new TypeError(`Invalid symbology "${s}"`);
            }
        }
        for (const s of symbology) {
            if (this.symbologySettings.has(s)) {
                this.symbologySettings.get(s).setEnabled(enabled);
            }
            else {
                this.symbologySettings.set(s, new SymbologySettings({ enabled: enabled }));
            }
        }
    }
    setSymbologiesEnabled(symbology, enabled) {
        if (typeof symbology === "object") {
            this.setMultipleSymbologiesEnabled(symbology, enabled);
        }
        else {
            this.setSingleSymbologyEnabled(symbology, enabled);
        }
        return this;
    }
}
//# sourceMappingURL=scanSettings.js.map