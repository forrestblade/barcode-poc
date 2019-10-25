import { Camera } from "./camera";
/**
 * A helper object to interact with cameras.
 */
export declare namespace CameraAccess {
    /**
     * @hidden
     *
     * Adjusts the cameras' type classification based on the given currently active video stream:
     * If the stream comes from an environment-facing camera, the camera is marked to be a back-facing camera
     * and the other cameras to be of other types accordingly (if they are not correctly set already).
     *
     * The method returns the currently active camera if it's actually the main (back or only) camera in use.
     *
     * @param mediaStreamTrack The currently active `MediaStreamTrack`.
     * @param cameras The array of available [[Camera]] objects.
     * @returns Whether the stream was actually from the main camera.
     */
    function adjustCamerasFromMainCameraStream(mediaStreamTrack: MediaStreamTrack, cameras: Camera[]): Camera | undefined;
    /**
     * Get a list of cameras (if any) available on the device, a camera access permission is requested to the user
     * the first time this method is called if needed.
     *
     * Depending on device features and user permissions for camera access, any of the following errors
     * could be the rejected result of the returned promise:
     * - `UnsupportedBrowserError`
     * - `PermissionDeniedError`
     * - `NotAllowedError`
     * - `NotFoundError`
     * - `AbortError`
     * - `NotReadableError`
     * - `InternalError`
     *
     * @returns A promise resolving to the array of available [[Camera]] objects (could be empty).
     */
    function getCameras(): Promise<Camera[]>;
    /**
     * @hidden
     *
     * Try to access a given camera for video input at the given resolution level.
     *
     * @param resolutionFallbackLevel The number representing the wanted resolution, from 0 to 6,
     * resulting in higher to lower video resolutions.
     * @param camera The camera to try to access for video input.
     * @returns A promise resolving to the `MediaStream` object coming from the accessed camera.
     */
    function accessCameraStream(resolutionFallbackLevel: number, camera: Camera): Promise<MediaStream>;
}
