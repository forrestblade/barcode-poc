"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraSettings;
(function (CameraSettings) {
    /**
     * Video frame resolution request (not guaranteed to be precise depending on device, could be imprecise/lower).
     */
    var ResolutionPreference;
    (function (ResolutionPreference) {
        /**
         * Resolution of around 1080p (or less).
         */
        ResolutionPreference["FULL_HD"] = "full-hd";
        /**
         * Resolution of around 720p (or less).
         */
        ResolutionPreference["HD"] = "hd";
    })(ResolutionPreference = CameraSettings.ResolutionPreference || (CameraSettings.ResolutionPreference = {}));
})(CameraSettings = exports.CameraSettings || (exports.CameraSettings = {}));
//# sourceMappingURL=cameraSettings.js.map