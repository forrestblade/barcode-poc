import { BarcodePicker } from "./barcodePicker";
import { CameraManager } from "./cameraManager";
import { Scanner } from "./scanner";
import { SearchArea } from "./searchArea";
/**
 * @hidden
 */
declare type ConstructorOptions = {
    scanner: Scanner;
    originElement: HTMLElement;
    singleImageMode: boolean;
    scanningPaused: boolean;
    visible: boolean;
    guiStyle: BarcodePicker.GuiStyle;
    videoFit: BarcodePicker.ObjectFit;
    hideLogo: boolean;
    laserArea?: SearchArea;
    viewfinderArea?: SearchArea;
    cameraUploadCallback(): Promise<void>;
};
/**
 * @hidden
 */
export declare class BarcodePickerGui {
    static readonly grandParentElementClassName: string;
    static readonly parentElementClassName: string;
    static readonly hiddenClassName: string;
    static readonly hiddenOpacityClassName: string;
    static readonly videoElementClassName: string;
    static readonly scanditLogoImageElementClassName: string;
    static readonly laserContainerElementClassName: string;
    static readonly viewfinderElementClassName: string;
    static readonly cameraSwitcherElementClassName: string;
    static readonly torchTogglerElementClassName: string;
    static readonly cameraUploadElementClassName: string;
    static readonly flashColorClassName: string;
    static readonly flashWhiteClassName: string;
    static readonly flashWhiteInsetClassName: string;
    static readonly opacityPulseClassName: string;
    static readonly mirroredClassName: string;
    static readonly pausedClassName: string;
    readonly videoElement: HTMLVideoElement;
    readonly cameraSwitcherElement: HTMLImageElement;
    readonly torchTogglerElement: HTMLImageElement;
    private readonly scanner;
    private readonly singleImageMode;
    private readonly grandParentElement;
    private readonly parentElement;
    private readonly laserContainerElement;
    private readonly laserActiveImageElement;
    private readonly laserPausedImageElement;
    private readonly viewfinderElement;
    private readonly cameraUploadElement;
    private readonly cameraUploadInputElement;
    private readonly cameraUploadLabelElement;
    private readonly cameraUploadProgressElement;
    private readonly videoImageCanvasContext;
    private readonly visibilityListener;
    private readonly newScanSettingsListener;
    private readonly licenseFeaturesReadyListener;
    private readonly resizeInterval;
    private readonly cameraUploadCallback;
    private readonly mirrorImageOverrides;
    private cameraManager?;
    private originElement;
    private scanningPaused;
    private visible;
    private guiStyle;
    private videoFit;
    private lastKnownElementWidth;
    private lastKnownElementHeight;
    private customLaserArea?;
    private customViewfinderArea?;
    constructor(options: ConstructorOptions);
    destroy(): void;
    setCameraManager(cameraManager: CameraManager): void;
    pauseScanning(): void;
    resumeScanning(): void;
    isVisible(): boolean;
    setVisible(visible: boolean): void;
    isMirrorImageEnabled(): boolean;
    setMirrorImageEnabled(enabled: boolean, override: boolean): void;
    setGuiStyle(guiStyle: BarcodePicker.GuiStyle): void;
    setLaserArea(area?: SearchArea): void;
    setViewfinderArea(area?: SearchArea): void;
    setVideoFit(objectFit: BarcodePicker.ObjectFit): void;
    reassignOriginElement(originElement: HTMLElement): void;
    flashGUI(): void;
    getVideoImageData(): Uint8ClampedArray | undefined;
    getVideoCurrentTime(): number;
    setCameraSwitcherVisible(visible: boolean): void;
    setTorchTogglerVisible(visible: boolean): void;
    playVideo(): void;
    private setCameraUploadGuiAvailable;
    private setupVideoElement;
    private setupCameraUploadGuiAssets;
    private setupFullGuiAssets;
    private flashLaser;
    private flashViewfinder;
    private resizeIfNeeded;
    private resizeCameraUploadIfNeeded;
    private resizeVideoIfNeeded;
    private checkAndRecoverPlayback;
    private updateCameraUploadProgress;
    private cameraUploadImageLoad;
    private cameraUploadFileProcess;
    private cameraUploadFile;
    private setupCameraSwitcher;
    private setupTorchToggler;
    private showScanditLogo;
    private handleNewScanSettings;
}
export {};
