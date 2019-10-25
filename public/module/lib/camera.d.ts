/**
 * A camera for video input available to be used on the device.
 */
export interface Camera {
    /**
     * The unique identifier for the device, can change between page loads.
     */
    readonly deviceId: string;
    /**
     * The label describing the device.
     */
    readonly label: string;
    /**
     * The type of camera, back or front (not guaranteed to be correct, depending on the device).
     */
    readonly cameraType: Camera.Type;
    /**
     * The current video resolution if and when the camera is in use, given as width and height in pixels.
     */
    currentResolution?: {
        width: number;
        height: number;
    };
}
export declare namespace Camera {
    /**
     * Camera type (not guaranteed to be correct, depending on the device).
     */
    enum Type {
        /**
         * Front facing camera.
         */
        FRONT = "front",
        /**
         * Back facing camera.
         */
        BACK = "back"
    }
}
