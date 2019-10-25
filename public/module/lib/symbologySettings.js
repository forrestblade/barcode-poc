/**
 * A symbology-specific configuration object.
 *
 * See https://docs.scandit.com/stable/c_api/symbologies.html for more details.
 */
export class SymbologySettings {
    /**
     * Create a SymbologySettings instance.
     *
     * @param enabled <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the symbology is enabled for recognition.
     * @param colorInvertedEnabled <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether color inverted recognition is enabled.
     * @param activeSymbolCounts
     * <div class="tsd-signature-symbol">Default =&nbsp;[] &nbsp;(default symbology range)</div>
     * The list of active symbol counts.
     * @param extensions
     * <div class="tsd-signature-symbol">Default =&nbsp;undefined &nbsp;(default symbology extensions)</div>
     * The list/set of enabled extensions.
     * @param checksums
     * <div class="tsd-signature-symbol">Default =&nbsp;undefined &nbsp;(default symbology checksums)</div>
     * The list/set of enabled checksums.
     */
    constructor({ enabled = false, colorInvertedEnabled = false, activeSymbolCounts = [], extensions, checksums } = {}) {
        this.enabled = enabled;
        this.colorInvertedEnabled = colorInvertedEnabled;
        this.activeSymbolCounts = activeSymbolCounts;
        this.customExtensions = extensions != null;
        this.customChecksums = checksums != null;
        if (extensions == null) {
            extensions = [];
        }
        if (checksums == null) {
            checksums = [];
        }
        this.extensions = new Set(Array.from(extensions).filter(e => {
            return e in SymbologySettings.Extension || Object.values(SymbologySettings.Extension).includes(e.toLowerCase());
        }));
        this.checksums = new Set(Array.from(checksums).filter(c => {
            return c in SymbologySettings.Checksum || Object.values(SymbologySettings.Checksum).includes(c.toLowerCase());
        }));
    }
    /**
     * @returns Whether the symbology enabled for recognition.
     */
    isEnabled() {
        return this.enabled;
    }
    /**
     * Enable or disable recognition of the symbology.
     *
     * @param enabled Whether the symbology is enabled for recognition.
     * @returns The updated [[SymbologySettings]] object.
     */
    setEnabled(enabled) {
        this.enabled = enabled;
        return this;
    }
    /**
     * @returns Whether color inverted recognition is enabled.
     */
    isColorInvertedEnabled() {
        return this.colorInvertedEnabled;
    }
    /**
     * Enable or disable recognition of inverted-color symbology (in addition to normal colors).
     *
     * @param enabled Whether color inverted recognition is enabled.
     * @returns The updated [[SymbologySettings]] object.
     */
    setColorInvertedEnabled(enabled) {
        this.colorInvertedEnabled = enabled;
        return this;
    }
    /**
     * Get the currently set custom list of active symbol counts.
     * If never set, an empty array is returned
     * but the Scandit Engine library will use the default list for the symbology.
     *
     * @returns The list of active symbol counts.
     */
    getActiveSymbolCounts() {
        return this.activeSymbolCounts;
    }
    /**
     * Set the list of active symbol counts.
     *
     * @param activeSymbolCounts The list of active symbol counts.
     * @returns The updated [[SymbologySettings]] object.
     */
    setActiveSymbolCounts(activeSymbolCounts) {
        this.activeSymbolCounts = activeSymbolCounts;
        return this;
    }
    /**
     * Set the (inclusive) range of active symbol counts.
     *
     * @param minCount The minimum accepted number of symbols.
     * @param maxCount The maximum accepted number of symbols.
     * @returns The updated [[SymbologySettings]] object.
     */
    setActiveSymbolCountsRange(minCount, maxCount) {
        this.activeSymbolCounts = Array.from({ length: maxCount - minCount + 1 }, (_, k) => {
            return k + minCount;
        });
        return this;
    }
    /**
     * Get the currently set custom set of extensions.
     * If never set, an empty set is returned
     * but the Scandit Engine library will use the default extension set for the symbology.
     *
     * @returns The set of enabled extensions.
     */
    getEnabledExtensions() {
        return this.extensions;
    }
    /**
     * Enable an extension or list/set of extensions
     *
     * @param extension The single extension or list/set of extensions to enable.
     * @returns The updated [[SymbologySettings]] object.
     */
    enableExtensions(extension) {
        this.customExtensions = true;
        if (typeof extension === "object") {
            this.extensions = new Set([
                ...this.extensions,
                ...Array.from(extension).filter(e => {
                    return (e in SymbologySettings.Extension || Object.values(SymbologySettings.Extension).includes(e.toLowerCase()));
                })
            ]);
        }
        else {
            if (extension in SymbologySettings.Extension ||
                Object.values(SymbologySettings.Extension).includes(extension.toLowerCase())) {
                this.extensions.add(extension);
            }
        }
        return this;
    }
    /**
     * Disable an extension or list/set of extensions.
     *
     * @param extension The single extension or list/set of extensions to disable.
     * @returns The updated [[SymbologySettings]] object.
     */
    disableExtensions(extension) {
        if (typeof extension === "object") {
            this.extensions = new Set([...this.extensions].filter(x => {
                return extension instanceof Array ? !extension.includes(x) : !extension.has(x);
            }));
        }
        else {
            this.extensions.delete(extension);
        }
        return this;
    }
    /**
     * Get the currently set custom set of checksums.
     * If never set, an empty set is returned
     * but the Scandit Engine library will use the default checksum set for the symbology.
     *
     * @returns The set of enabled checksums.
     */
    getEnabledChecksums() {
        return this.checksums;
    }
    /**
     * Enable a checksum or list/set of checksums.
     *
     * @param checksum The single checksum or list/set of checksums to enable.
     * @returns The updated [[SymbologySettings]] object.
     */
    enableChecksums(checksum) {
        this.customChecksums = true;
        if (typeof checksum === "object") {
            this.checksums = new Set([
                ...this.checksums,
                ...Array.from(checksum).filter(c => {
                    return c in SymbologySettings.Checksum || Object.values(SymbologySettings.Checksum).includes(c.toLowerCase());
                })
            ]);
        }
        else {
            if (checksum in SymbologySettings.Checksum ||
                Object.values(SymbologySettings.Checksum).includes(checksum.toLowerCase())) {
                this.checksums.add(checksum);
            }
        }
        return this;
    }
    /**
     * Disable a checksum or list/set of checksums.
     *
     * @param checksum The single checksum or list/set of checksums to disable.
     * @returns The updated [[SymbologySettings]] object.
     */
    disableChecksums(checksum) {
        if (typeof checksum === "object") {
            this.checksums = new Set([...this.checksums].filter(x => {
                return checksum instanceof Array ? !checksum.includes(x) : !checksum.has(x);
            }));
        }
        else {
            this.checksums.delete(checksum);
        }
        return this;
    }
    toJSON() {
        return {
            enabled: this.enabled,
            colorInvertedEnabled: this.colorInvertedEnabled,
            activeSymbolCounts: this.activeSymbolCounts.length === 0 ? undefined : this.activeSymbolCounts,
            extensions: this.customExtensions ? Array.from(this.extensions) : undefined,
            checksums: this.customChecksums ? Array.from(this.checksums) : undefined
        };
    }
}
// istanbul ignore next
(function (SymbologySettings) {
    /**
     * Symbology extensions for particular functionalities, only applicable to specific barcodes.
     * See: https://docs.scandit.com/stable/c_api/symbologies.html.
     */
    let Extension;
    (function (Extension) {
        /**
         * Improve scan performance when reading direct part marked (DPM) Data Matrix codes.
         * Enabling this extension comes at the cost of increased frame processing times.
         */
        Extension["DIRECT_PART_MARKING_MODE"] = "direct_part_marking_mode";
        /**
         * Interpret the Code 39 / Code 93 code data using two symbols per output character to encode all ASCII characters.
         */
        Extension["FULL_ASCII"] = "full_ascii";
        /**
         * Enable scanning codes that have quiet zones (white area before and after the code) significantly smaller
         * than what's allowed by the symbology specification.
         */
        Extension["RELAXED_SHARP_QUIET_ZONE_CHECK"] = "relaxed_sharp_quiet_zone_check";
        /**
         * Remove the leading zero digit from the result.
         */
        Extension["REMOVE_LEADING_ZERO"] = "remove_leading_zero";
        /**
         * Remove the leading zero digit from the result if the UPC-A representation extension "RETURN_AS_UPCA" is enabled.
         */
        Extension["REMOVE_LEADING_UPCA_ZERO"] = "remove_leading_upca_zero";
        /**
         * Transform the UPC-E result into its UPC-A representation.
         */
        Extension["RETURN_AS_UPCA"] = "return_as_upca";
        /**
         * Remove the leading FNC1 character that indicates a GS1 code.
         */
        Extension["STRIP_LEADING_FNC1"] = "strip_leading_fnc1";
    })(Extension = SymbologySettings.Extension || (SymbologySettings.Extension = {}));
    /**
     * Checksum algorithms, only applicable to specific barcodes.
     * See: https://docs.scandit.com/stable/c_api/symbologies.html.
     */
    let Checksum;
    (function (Checksum) {
        /**
         * Modulo 10 checksum.
         */
        Checksum["MOD_10"] = "mod10";
        /**
         * Modulo 11 checksum.
         */
        Checksum["MOD_11"] = "mod11";
        /**
         * Modulo 16 checksum.
         */
        Checksum["MOD_16"] = "mod16";
        /**
         * Modulo 43 checksum.
         */
        Checksum["MOD_43"] = "mod43";
        /**
         * Modulo 47 checksum.
         */
        Checksum["MOD_47"] = "mod47";
        /**
         * Modulo 103 checksum.
         */
        Checksum["MOD_103"] = "mod103";
        /**
         * Two modulo 10 checksums.
         */
        Checksum["MOD_1010"] = "mod1010";
        /**
         * Modulo 11 and modulo 10 checksum.
         */
        Checksum["MOD_1110"] = "mod1110";
    })(Checksum = SymbologySettings.Checksum || (SymbologySettings.Checksum = {}));
})(SymbologySettings || (SymbologySettings = {}));
//# sourceMappingURL=symbologySettings.js.map