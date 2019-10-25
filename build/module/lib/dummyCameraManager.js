import { CameraManager } from "./cameraManager";
/**
 * @hidden
 *
 * A dummy barcode picker utility class used to (not) handle camera interaction.
 */
// istanbul ignore next
export class DummyCameraManager extends CameraManager {
    setInteractionOptions(_1, _2, _3, _4) {
        return;
    }
    isCameraSwitcherEnabled() {
        return false;
    }
    setCameraSwitcherEnabled(_1) {
        return Promise.resolve();
    }
    isTorchToggleEnabled() {
        return false;
    }
    setTorchToggleEnabled(_1) {
        return;
    }
    isTapToFocusEnabled() {
        return false;
    }
    setTapToFocusEnabled(_1) {
        return;
    }
    isPinchToZoomEnabled() {
        return false;
    }
    setPinchToZoomEnabled(_1) {
        return;
    }
    setSelectedCamera(_1) {
        return;
    }
    setSelectedCameraSettings(_1) {
        return;
    }
    setupCameras() {
        return Promise.resolve();
    }
    stopStream() {
        return;
    }
    applyCameraSettings(_1) {
        return Promise.resolve();
    }
    reinitializeCamera() {
        return;
    }
    initializeCameraWithSettings(_1, _2) {
        return Promise.resolve();
    }
    setTorchEnabled(_1) {
        return;
    }
    toggleTorch() {
        return;
    }
    setZoom(_1, _2) {
        return;
    }
}
//# sourceMappingURL=dummyCameraManager.js.map