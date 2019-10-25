import { Camera } from "./camera";
import { CameraManager } from "./cameraManager";
import { CameraSettings } from "./cameraSettings";
/**
 * @hidden
 *
 * A dummy barcode picker utility class used to (not) handle camera interaction.
 */
export declare class DummyCameraManager extends CameraManager {
    setInteractionOptions(_1: boolean, _2: boolean, _3: boolean, _4: boolean): void;
    isCameraSwitcherEnabled(): boolean;
    setCameraSwitcherEnabled(_1: boolean): Promise<void>;
    isTorchToggleEnabled(): boolean;
    setTorchToggleEnabled(_1: boolean): void;
    isTapToFocusEnabled(): boolean;
    setTapToFocusEnabled(_1: boolean): void;
    isPinchToZoomEnabled(): boolean;
    setPinchToZoomEnabled(_1: boolean): void;
    setSelectedCamera(_1?: Camera): void;
    setSelectedCameraSettings(_1?: CameraSettings): void;
    setupCameras(): Promise<void>;
    stopStream(): void;
    applyCameraSettings(_1?: CameraSettings): Promise<void>;
    reinitializeCamera(): void;
    initializeCameraWithSettings(_1: Camera, _2?: CameraSettings): Promise<void>;
    setTorchEnabled(_1: boolean): void;
    toggleTorch(): void;
    setZoom(_1: number, _2?: number): void;
}
