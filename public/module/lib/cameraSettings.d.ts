/**
 * A configuration object to request custom capabilities when accessing a camera.
 */
export interface CameraSettings {
    /**
     * The preferred video frame resolution (not guaranteed to be precise depending on device, could be imprecise/lower).
     */
    readonly resolutionPreference: CameraSettings.ResolutionPreference;
}
export declare namespace CameraSettings {
    /**
     * Video frame resolution request (not guaranteed to be precise depending on device, could be imprecise/lower).
     */
    enum ResolutionPreference {
        /**
         * Resolution of around 1080p (or less).
         */
        FULL_HD = "full-hd",
        /**
         * Resolution of around 720p (or less).
         */
        HD = "hd"
    }
}
