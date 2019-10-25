import { Camera } from "./camera";
import { CameraSettings } from "./cameraSettings";
/**
 * @hidden
 */
export declare abstract class CameraManager {
    selectedCamera?: Camera;
    activeCamera?: Camera;
    activeCameraSettings?: CameraSettings;
    abstract setInteractionOptions(cameraSwitcherEnabled: boolean, torchToggleEnabled: boolean, tapToFocusEnabled: boolean, pinchToZoomEnabled: boolean): void;
    abstract isCameraSwitcherEnabled(): boolean;
    abstract setCameraSwitcherEnabled(enabled: boolean): Promise<void>;
    abstract isTorchToggleEnabled(): boolean;
    abstract setTorchToggleEnabled(enabled: boolean): void;
    abstract isTapToFocusEnabled(): boolean;
    abstract setTapToFocusEnabled(enabled: boolean): void;
    abstract isPinchToZoomEnabled(): boolean;
    abstract setPinchToZoomEnabled(enabled: boolean): void;
    abstract setSelectedCamera(camera?: Camera): void;
    abstract setSelectedCameraSettings(cameraSettings?: CameraSettings): void;
    abstract setupCameras(): Promise<void>;
    abstract stopStream(): void;
    abstract applyCameraSettings(cameraSettings?: CameraSettings): Promise<void>;
    abstract reinitializeCamera(): void;
    abstract initializeCameraWithSettings(camera: Camera, cameraSettings?: CameraSettings): Promise<void>;
    abstract setTorchEnabled(enabled: boolean): void;
    abstract toggleTorch(): void;
    abstract setZoom(zoomPercentage: number, currentZoom?: number): void;
}
