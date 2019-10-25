import { Barcode } from "./barcode";
import { SearchArea } from "./searchArea";
import { SymbologySettings } from "./symbologySettings";
/**
 * @hidden
 */
declare type SymbologyParameter = Barcode.Symbology | Barcode.Symbology[] | Set<Barcode.Symbology>;
/**
 * A configuration object for scanning options.
 *
 * Modified ScanSettings need to be applied to a scanner via
 * [[BarcodePicker.applyScanSettings]] or [[Scanner.applyScanSettings]] to take effect.
 */
export declare class ScanSettings {
    private readonly symbologySettings;
    private codeDuplicateFilter;
    private maxNumberOfCodesPerFrame;
    private baseSearchArea;
    private searchArea;
    private gpuAcceleration;
    private blurryRecognition;
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
    constructor({ enabledSymbologies, codeDuplicateFilter, maxNumberOfCodesPerFrame, searchArea, gpuAcceleration, blurryRecognition }?: {
        enabledSymbologies?: SymbologyParameter;
        codeDuplicateFilter?: number;
        maxNumberOfCodesPerFrame?: number;
        searchArea?: SearchArea;
        gpuAcceleration?: boolean;
        blurryRecognition?: boolean;
    });
    /**
     * @returns The configuration object as a JSON string.
     */
    toJSONString(): string;
    /**
     * Get the configuration object for a symbology (which can then be modified).
     *
     * @param symbology The symbology for which to retrieve the configuration.
     * @returns The symbology configuration object for the specified symbology.
     */
    getSymbologySettings(symbology: Barcode.Symbology): SymbologySettings;
    /**
     * Get the recognition enabled status for a symbology.
     *
     * @param symbology The symbology for which to retrieve the recognition enabled status.
     * @returns Whether the symbology enabled for recognition.
     */
    isSymbologyEnabled(symbology: Barcode.Symbology): boolean;
    /**
     * Enable recognition of a symbology or list/set of symbologies.
     *
     * @param symbology The single symbology or list/set of symbologies to enable.
     * @returns The updated [[ScanSettings]] object.
     */
    enableSymbologies(symbology: SymbologyParameter): ScanSettings;
    /**
     * Disable recognition of a symbology or list/set of symbologies.
     *
     * @param symbology The single symbology or list/set of symbologies to disable.
     * @returns The updated [[ScanSettings]] object.
     */
    disableSymbologies(symbology: SymbologyParameter): ScanSettings;
    /**
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     *
     * @returns The code duplicate filter value.
     */
    getCodeDuplicateFilter(): number;
    /**
     * Set the code duplicate filter value.
     *
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     *
     * @param durationMilliseconds The new value (-1, 0, or positive integer).
     * @returns The updated [[ScanSettings]] object.
     */
    setCodeDuplicateFilter(durationMilliseconds: number): ScanSettings;
    /**
     * @returns The maximum number of barcodes to be recognized every frame.
     */
    getMaxNumberOfCodesPerFrame(): number;
    /**
     * Set the maximum number of barcodes to be recognized every frame.
     *
     * @param limit The new value (non-zero positive integer).
     * @returns The updated [[ScanSettings]] object.
     */
    setMaxNumberOfCodesPerFrame(limit: number): ScanSettings;
    /**
     * @returns The area of the image in which barcodes are searched.
     */
    getSearchArea(): SearchArea;
    /**
     * Set the area of the image in which barcodes are searched.
     *
     * @param searchArea The new search area.
     * @returns The updated [[ScanSettings]] object.
     */
    setSearchArea(searchArea: SearchArea): ScanSettings;
    /**
     * @hidden
     *
     * @returns The base area of the image in which barcodes are searched.
     */
    getBaseSearchArea(): SearchArea;
    /**
     * @hidden
     *
     * Set the base area of the image in which barcodes are searched, this is set automatically by a [[BarcodePicker]]
     * and is combined with the searchArea to obtain the final combined search area.
     *
     * @param baseSearchArea The new base search area.
     * @returns The updated [[ScanSettings]] object.
     */
    setBaseSearchArea(baseSearchArea: SearchArea): ScanSettings;
    /**
     * @returns Whether GPU acceleration is configured to be enabled ot not.
     *
     * Note that this refers to the settings: depending on browser capabilities the actual GPU usage might be prevented.
     */
    isGpuAccelerationEnabled(): boolean;
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
    setGpuAccelerationEnabled(enabled: boolean): ScanSettings;
    /**
     * @returns Whether blurry recognition is configured to be enabled ot not.
     */
    isBlurryRecognitionEnabled(): boolean;
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
    setBlurryRecognitionEnabled(enabled: boolean): ScanSettings;
    private setSingleSymbologyEnabled;
    private setMultipleSymbologiesEnabled;
    private setSymbologiesEnabled;
}
export {};
