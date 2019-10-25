export var CameraSettings;
(function (CameraSettings) {
    /**
     * Video frame resolution request (not guaranteed to be precise depending on device, could be imprecise/lower).
     */
    let ResolutionPreference;
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
})(CameraSettings || (CameraSettings = {}));
//# sourceMappingURL=cameraSettings.js.map