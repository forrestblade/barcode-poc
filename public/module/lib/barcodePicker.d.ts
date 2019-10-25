import { ListenerFn } from "eventemitter3";
import { Camera } from "./camera";
import { CameraSettings } from "./cameraSettings";
import { Parser } from "./parser";
import { Scanner } from "./scanner";
import { ScanResult } from "./scanResult";
import { ScanSettings } from "./scanSettings";
import { SearchArea } from "./searchArea";
/**
 * @hidden
 */
declare type EventName = "ready" | "submitFrame" | "processFrame" | "scan" | "scanError";
/**
 * A barcode picker element used to get and show camera input and perform scanning operations.
 *
 * The barcode picker will automatically fit and scale inside the given *originElement*.
 *
 * Each barcode picker internally contains a [[Scanner]] object with its own WebWorker thread running a
 * separate copy of the external Scandit Engine library. To optimize loading times and performance it's
 * recommended to reuse the same picker and to already create the picker in advance (hidden) and just
 * display it when needed whenever possible.
 *
 * As the loading of the external Scandit Engine library can take some time the picker always starts inactive
 * (but showing GUI and video) and then activates, if not paused, as soon as the library is ready to scan.
 * The [[on]] method targeting the [[ready]] event can be used to set up a listener function to be called when the
 * library is loaded.
 *
 * The picker can also operate in "single image mode", letting the user click/tap to take a single image to be scanned
 * via the camera (mobile/tablet) or a file select dialog (desktop). This is provided automatically as fallback by
 * default when the OS/browser only supports part of the needed features and cannot provide direct access to the camera
 * for video streaming and continuous scanning, or can also be forced. This behaviour can be set up on creation. Note
 * that in this mode some of the functions provided by the picker will have no effect.
 *
 * By default an alert is shown if an internal error during scanning is encountered which prevents the scanning
 * procedure from continuing when running on a local IP address. As this uses the built-in [[scanError]] event
 * functionality, if unwanted it can be disabled by calling [[removeAllListeners]] on the BarcodePicker
 * instance (right after creation).
 *
 * You are not allowed to hide the Scandit logo present in the corner of the GUI.
 */
export declare class BarcodePicker {
    private readonly cameraManager;
    private readonly barcodePickerGui;
    private readonly eventEmitter;
    private readonly scanner;
    private readonly beepSound;
    private readonly vibrateFunction;
    private readonly scannerReadyEventListener;
    private playSoundOnScan;
    private vibrateOnScan;
    private scanningPaused;
    private fatalError;
    private latestVideoTimeProcessed;
    private destroyed;
    private isReadyToWork;
    private cameraAccess;
    private targetScanningFPS;
    private averageProcessingTime;
    private constructor();
    /**
     * Create a [[BarcodePicker]] instance, creating the needed HTML in the given origin element.
     * If the *accessCamera* option is enabled (active by default) and the picker is not in "single image mode",
     * the available cameras are accessed and camera access permission is requested to the user if needed.
     * This object expects that at least a camera is available. The active camera is accessed and kept active during the
     * lifetime of the picker (also when hidden or scanning is paused), and is only released when [[destroy]] is called.
     *
     * It is required to having configured the library via [[configure]] before this object can be created.
     *
     * The "single image mode" behaviour of the picker can be set up via the
     * *singleImageMode* option, which accepts a configuration object of the form:
     * ```
     * {
     *   desktop: {
     *     always: false, allowFallback: true
     *   },
     *   mobile: {
     *     always: false, allowFallback: true
     *   }
     * }
     * ```
     *
     * Depending on parameters, device features and user permissions for camera access, any of the following errors
     * could be the rejected result of the returned promise:
     * - `LibraryNotConfiguredError`
     * - `NoOriginElementError`
     * - `UnsupportedBrowserError`
     * - `PermissionDeniedError`
     * - `NotAllowedError`
     * - `NotFoundError`
     * - `AbortError`
     * - `NotReadableError`
     * - `InternalError`
     * - `NoCameraAvailableError`
     *
     * @param originElement The HTMLElement inside which all the necessary elements for the picker will be added.
     * @param visible <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether the picker starts in a visible state.
     * @param singleImageMode <div class="tsd-signature-symbol">Default =&nbsp;
     * { desktop: { always: false, allowFallback: true }, mobile: { always: false, allowFallback: true } }</div>
     * Whether to provide a UI to pick/snap a single image from the camera instead of accessing and using the persistent
     * video stream from a camera ("force"), or to allow to provide this as a fallback ("allowFallback") in case the
     * necessary features for direct camera access are not provided by the OS/browser.
     * @param playSoundOnScan <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether a sound is played on barcode recognition (iOS requires user input).
     * @param vibrateOnScan <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the device vibrates on barcode recognition (only Chrome & Firefox, requires user input).
     * @param scanningPaused <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the picker starts in a paused scanning state.
     * @param guiStyle <div class="tsd-signature-symbol">Default =&nbsp;GuiStyle.LASER</div>
     * The GUI style for the picker.
     * @param videoFit <div class="tsd-signature-symbol">Default =&nbsp;ObjectFit.CONTAIN</div>
     * The fit type for the video element of the picker.
     * @param laserArea <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The area of the laser displayed when the GUI style is set to *laser* (the laser will match the width and be
     * vertically centered), by default the area will match the current [[ScanSettings]]'s *searchArea*.
     * @param viewfinderArea <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The area of the viewfinder displayed when the GUI style is set to *viewfinder*, by default the area will match
     * the current [[ScanSettings]]'s *searchArea*.
     * @param enableCameraSwitcher <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to show a GUI button to switch between different cameras (when available).
     * @param enableTorchToggle <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to show a GUI button to toggle device torch on/off (when available, only Chrome).
     * @param enableTapToFocus <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to trigger a manual focus of the camera when clicking/tapping on the video (when available, only Chrome).
     * @param enablePinchToZoom <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to control the zoom of the camera when doing a pinching gesture on the video (when available, only Chrome).
     * @param accessCamera <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to immediately access the camera (and requesting user permissions if needed) on picker creation.
     * @param camera <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The camera to be used for video input, if not specified the back or only camera will be used.
     * @param cameraSettings <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The camera options used when accessing the camera, by default HD resolution is used.
     * @param scanner <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The scanner object responsible for scanning via the external Scandit Engine library
     * (a new scanner will be created and initialized if not provided).
     * @param scanSettings <div class="tsd-signature-symbol">Default =&nbsp;new ScanSettings()</div>
     * The configuration object for scanning options to be applied to the scanner (all symbologies disabled by default).
     * @param targetScanningFPS <div class="tsd-signature-symbol">Default =&nbsp;30</div>
     * The target frames per second to be processed, the final speed is limited by the camera framerate (usually 30 FPS)
     * and the frame processing time of the device. By setting this to lower numbers devices can save power by performing
     * less work during scanning operations, depending on device speed (faster devices can "sleep" for longer periods).
     * Must be a number bigger than 0.
     * @returns A promise resolving to the created ready [[BarcodePicker]] object.
     */
    static create(originElement: HTMLElement, { visible, singleImageMode, playSoundOnScan, vibrateOnScan, scanningPaused, guiStyle, videoFit, laserArea, viewfinderArea, scanner, scanSettings, enableCameraSwitcher, enableTorchToggle, enableTapToFocus, enablePinchToZoom, accessCamera, camera, cameraSettings, targetScanningFPS }?: {
        visible?: boolean;
        singleImageMode?: {
            desktop: {
                always: boolean;
                allowFallback: boolean;
            };
            mobile: {
                always: boolean;
                allowFallback: boolean;
            };
        };
        playSoundOnScan?: boolean;
        vibrateOnScan?: boolean;
        scanningPaused?: boolean;
        guiStyle?: BarcodePicker.GuiStyle;
        videoFit?: BarcodePicker.ObjectFit;
        laserArea?: SearchArea;
        viewfinderArea?: SearchArea;
        scanner?: Scanner;
        scanSettings?: ScanSettings;
        enableCameraSwitcher?: boolean;
        enableTorchToggle?: boolean;
        enableTapToFocus?: boolean;
        enablePinchToZoom?: boolean;
        accessCamera?: boolean;
        camera?: Camera;
        cameraSettings?: CameraSettings;
        targetScanningFPS?: number;
    }): Promise<BarcodePicker>;
    /**
     * Stop scanning and displaying video output, remove HTML elements added to the page,
     * destroy the internal [[Scanner]] (by default) and destroy the barcode picker itself; ensuring complete cleanup.
     *
     * This method should be called after you don't plan to use the picker anymore,
     * before the object is automatically cleaned up by JavaScript.
     * The barcode picker must not be used in any way after this call.
     *
     * If the [[Scanner]] is or will be in use for other purposes, the relative option can be passed to prevent
     * its destruction.
     *
     * @param destroyScanner Whether to destroy the internally used [[Scanner]] or not.
     */
    destroy(destroyScanner?: boolean): void;
    /**
     * Apply a new set of scan settings to the internal scanner (replacing old settings).
     *
     * @param scanSettings The scan configuration object to be applied to the scanner.
     * @returns The updated [[BarcodePicker]] object.
     */
    applyScanSettings(scanSettings: ScanSettings): BarcodePicker;
    /**
     * @returns Whether the scanning is currently paused.
     */
    isScanningPaused(): boolean;
    /**
     * Pause the recognition of codes in the input image.
     *
     * By default video from the camera is still shown, if the *pauseCamera* option is enabled the camera stream
     * is paused (camera access is fully interrupted) and will be resumed when calling [[resumeScanning]] or
     * [[accessCamera]], possibly requesting user permissions if needed.
     *
     * In "single image mode" the input for submitting a picture is disabled.
     *
     * @param pauseCamera Whether to also pause the camera stream.
     * @returns The updated [[BarcodePicker]] object.
     */
    pauseScanning(pauseCamera?: boolean): BarcodePicker;
    /**
     * Resume the recognition of codes in the input image.
     *
     * If the camera stream was stopped when calling [[pauseScanning]], the camera stream is also resumed and
     * user permissions are requested if needed to resume video input.
     *
     * In "single image mode" the input for submitting a picture is enabled.
     *
     * @returns The updated [[BarcodePicker]] object.
     */
    resumeScanning(): Promise<BarcodePicker>;
    /**
     * @returns The currently active camera.
     */
    getActiveCamera(): Camera | undefined;
    /**
     * Select a camera to be used for video input, if no camera is passed, the default one is selected.
     *
     * If camera access is enabled, the camera is enabled and accessed.
     *
     * Depending on device features and user permissions for camera access, any of the following errors
     * could be the rejected result of the returned promise:
     * - `PermissionDeniedError`
     * - `NotAllowedError`
     * - `NotFoundError`
     * - `AbortError`
     * - `NotReadableError`
     * - `InternalError`
     * - `NoCameraAvailableError`
     *
     * In "single image mode" this method has no effect.
     *
     * @param camera The new camera to be used, by default the automatically detected back camera is used.
     * @param cameraSettings The camera options used when accessing the camera, by default HD resolution is used.
     * @returns A promise resolving to the updated [[BarcodePicker]] object when the camera is set
     * (and accessed, if camera access is currently enabled).
     */
    setActiveCamera(camera?: Camera, cameraSettings?: CameraSettings): Promise<BarcodePicker>;
    /**
     * Try to apply new settings to the currently used camera for video input,
     * if no settings are passed the default ones are set.
     *
     * If camera access is enabled, the camera is updated and accessed with the new settings.
     *
     * Depending on device features and user permissions for camera access, any of the following errors
     * could be the rejected result of the returned promise:
     * - `PermissionDeniedError`
     * - `NotAllowedError`
     * - `NotFoundError`
     * - `AbortError`
     * - `NotReadableError`
     * - `InternalError`
     * - `NoCameraAvailableError`
     *
     * In "single image mode" this method has no effect.
     *
     * @param cameraSettings The new camera options used when accessing the camera, by default HD resolution is used.
     * @returns A promise resolving to the updated [[BarcodePicker]] object when the camera is updated
     * (and accessed, if camera access is currently enabled).
     */
    applyCameraSettings(cameraSettings?: CameraSettings): Promise<BarcodePicker>;
    /**
     * @returns Whether the picker is in a visible state or not.
     */
    isVisible(): boolean;
    /**
     * Enable or disable picker visibility.
     *
     * @param visible Whether the picker is in a visible state or not.
     * @returns The updated [[BarcodePicker]] object.
     */
    setVisible(visible: boolean): BarcodePicker;
    /**
     * @returns Whether the currently selected camera's video is mirrored along the vertical axis.
     */
    isMirrorImageEnabled(): boolean;
    /**
     * Enable or disable camera video mirroring along the vertical axis.
     * By default front cameras are automatically mirrored.
     * This setting is applied per camera and the method has no effect if no camera is currently selected.
     *
     * In "single image mode" this method has no effect.
     *
     * @param enabled Whether the camera video is mirrored along the vertical axis.
     * @returns The updated [[BarcodePicker]] object.
     */
    setMirrorImageEnabled(enabled: boolean): BarcodePicker;
    /**
     * @returns Whether a sound should be played on barcode recognition (iOS requires user input).
     * Note that the sound is played if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
     */
    isPlaySoundOnScanEnabled(): boolean;
    /**
     * Enable or disable playing a sound on barcode recognition (iOS requires user input).
     *
     * The sound is played if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
     *
     * @param enabled Whether a sound should be played on barcode recognition.
     * @returns The updated [[BarcodePicker]] object.
     */
    setPlaySoundOnScanEnabled(enabled: boolean): BarcodePicker;
    /**
     * @returns Whether the device should vibrate on barcode recognition (only Chrome & Firefox, requires user input).
     * Note that the vibration is triggered if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
     */
    isVibrateOnScanEnabled(): boolean;
    /**
     * Enable or disable vibrating the device on barcode recognition (only Chrome & Firefox, requires user input).
     *
     * The vibration is triggered if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
     *
     * @param enabled Whether the device should vibrate on barcode recognition.
     * @returns The updated [[BarcodePicker]] object.
     */
    setVibrateOnScanEnabled(enabled: boolean): BarcodePicker;
    /**
     * @returns Whether a GUI button to switch between different cameras is shown (when available).
     */
    isCameraSwitcherEnabled(): boolean;
    /**
     * Show or hide a GUI button to switch between different cameras (when available).
     *
     * In "single image mode" this method has no effect.
     *
     * @param enabled Whether to show a GUI button to switch between different cameras.
     * @returns The updated [[BarcodePicker]] object.
     */
    setCameraSwitcherEnabled(enabled: boolean): BarcodePicker;
    /**
     * @returns Whether a GUI button to toggle device torch on/off is shown (when available, only Chrome).
     */
    isTorchToggleEnabled(): boolean;
    /**
     * Show or hide a GUI button to toggle device torch on/off (when available, only Chrome).
     *
     * In "single image mode" this method has no effect.
     *
     * @param enabled Whether to show a GUI button to toggle device torch on/off.
     * @returns The updated [[BarcodePicker]] object.
     */
    setTorchToggleEnabled(enabled: boolean): BarcodePicker;
    /**
     * @returns Whether manual camera focus when clicking/tapping on the video is enabled (when available, only Chrome).
     */
    isTapToFocusEnabled(): boolean;
    /**
     * Enable or disable manual camera focus when clicking/tapping on the video (when available, only Chrome).
     *
     * In "single image mode" this method has no effect.
     *
     * @param enabled Whether to enable manual camera focus when clicking/tapping on the video.
     * @returns The updated [[BarcodePicker]] object.
     */
    setTapToFocusEnabled(enabled: boolean): BarcodePicker;
    /**
     * @returns Whether camera zoom control via pinching gesture on the video is enabled (when available, only Chrome).
     */
    isPinchToZoomEnabled(): boolean;
    /**
     * Enable or disable camera zoom control via pinching gesture on the video (when available, only Chrome).
     *
     * In "single image mode" this method has no effect.
     *
     * @param enabled Whether to enable camera zoom control via pinching gesture on the video.
     * @returns The updated [[BarcodePicker]] object.
     */
    setPinchToZoomEnabled(enabled: boolean): BarcodePicker;
    /**
     * Enable or disable the torch/flashlight of the device (when available, only Chrome).
     * Changing active camera or camera settings will cause the torch to become disabled.
     *
     * A button on the [[BarcodePicker]] GUI to let the user toggle this functionality can also be set
     * on creation via the *enableTorchToggle* option (enabled by default, when available).
     *
     * In "single image mode" this method has no effect.
     *
     * @param enabled Whether the torch should be enabled or disabled.
     * @returns The updated [[BarcodePicker]] object.
     */
    setTorchEnabled(enabled: boolean): BarcodePicker;
    /**
     * Set the zoom level of the device (when available, only Chrome).
     * Changing active camera or camera settings will cause the zoom to be reset.
     *
     * In "single image mode" this method has no effect.
     *
     * @param zoomPercentage The percentage of the max zoom (between 0 and 1).
     * @returns The updated [[BarcodePicker]] object.
     */
    setZoom(zoomPercentage: number): BarcodePicker;
    /**
     * @returns Whether the barcode picker has loaded the external Scandit Engine library and is ready to scan.
     */
    isReady(): boolean;
    /**
     * Add the listener function to the listeners array for an event.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @param eventName The name of the event to listen to.
     * @param listener The listener function.
     * @param once <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    on(eventName: EventName, listener: ListenerFn, once?: boolean): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[ready]] event, fired when the external
     * Scandit Engine library has been loaded and the barcode picker can thus start to scan barcodes.
     * If the library has already been loaded the listener is called immediately.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @param eventName The name of the event to listen to.
     * @param listener The listener function.
     * @returns The updated [[BarcodePicker]] object.
     */
    on(eventName: "ready", listener: () => void): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[submitFrame]] event, fired when a new frame is submitted
     * to the engine to be processed. As the frame is not processed yet, the [[ScanResult.barcodes]] property will
     * always be empty (no results yet).
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @param eventName The name of the event to listen to.
     * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
     * @param once <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    on(eventName: "submitFrame", listener: (scanResult: ScanResult) => void, once?: boolean): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[processFrame]] event, fired when a new frame is
     * processed. This event is fired on every frame, independently from the number of recognized barcodes (can be none).
     * The returned barcodes are affected by the [[ScanSettings.setCodeDuplicateFilter]] option.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @param eventName The name of the event to listen to.
     * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
     * @param once <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    on(eventName: "processFrame", listener: (scanResult: ScanResult) => void, once?: boolean): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[scan]] event, fired when new barcodes
     * are recognized in the image frame. The returned barcodes are affected
     * by the [[ScanSettings.setCodeDuplicateFilter]] option.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @param eventName The name of the event to listen to.
     * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
     * @param once <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    on(eventName: "scan", listener: (scanResult: ScanResult) => void, once?: boolean): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[scanError]] event, fired when an error occurs
     * during scanning initialization and execution. The barcode picker will be automatically paused when this happens.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @param eventName The name of the event to listen to.
     * @param listener The listener function, which will be invoked with an `ScanditEngineError` object.
     * @param once <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    on(eventName: "scanError", listener: (error: Error) => void, once?: boolean): BarcodePicker;
    /**
     * Remove the specified listener from the given event's listener array.
     *
     * @param eventName The name of the event from which to remove the listener.
     * @param listener The listener function to be removed.
     * @returns The updated [[BarcodePicker]] object.
     */
    removeListener(eventName: EventName, listener: ListenerFn): BarcodePicker;
    /**
     * Remove all listeners from the given event's listener array.
     *
     * @param eventName The name of the event from which to remove all listeners.
     * @returns The updated [[BarcodePicker]] object.
     */
    removeAllListeners(eventName: EventName): BarcodePicker;
    /**
     * *See the [[on]] method.*
     *
     * @param eventName The name of the event to listen to.
     * @param listener The listener function.
     * @param once <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    addListener(eventName: EventName, listener: ListenerFn, once?: boolean): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[ready]] event, fired when the external
     * Scandit Engine library has been loaded and the barcode picker can thus start to scan barcodes.
     * If the library has already been loaded the listener is called immediately.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @deprecated Use the [[on]] method instead.
     *
     * @param listener The listener function.
     * @returns The updated [[BarcodePicker]] object.
     */
    onReady(listener: () => void): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[scan]] event, fired when new barcodes
     * are recognized in the image frame. The returned barcodes are affected
     * by the [[ScanSettings.setCodeDuplicateFilter]] option.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @deprecated Use the [[on]] method instead.
     *
     * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
     * @param once Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    onScan(listener: (scanResult: ScanResult) => void, once?: boolean): BarcodePicker;
    /**
     * Remove the specified listener from the [[scan]] event's listener array.
     *
     * @deprecated Use the [[removeListener]] method instead.
     *
     * @param listener The listener function to be removed.
     * @returns The updated [[BarcodePicker]] object.
     */
    removeScanListener(listener: (scanResult: ScanResult) => void): BarcodePicker;
    /**
     * Remove all listeners from the [[scan]] event's listener array.
     *
     * @deprecated Use the [[removeAllListeners]] method instead.
     *
     * @returns The updated [[BarcodePicker]] object.
     */
    removeScanListeners(): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[scanError]] event, fired when an error occurs
     * during scanning initialization and execution. The barcode picker will be automatically paused when this happens.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @deprecated Use the [[on]] method instead.
     *
     * @param listener The listener function, which will be invoked with an `ScanditEngineError` object.
     * @param once Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    onScanError(listener: (error: Error) => void, once?: boolean): BarcodePicker;
    /**
     * Remove the specified listener from the [[scanError]] event's listener array.
     *
     * @deprecated Use the [[removeListener]] method instead.
     *
     * @param listener The listener function to be removed.
     * @returns The updated [[BarcodePicker]] object.
     */
    removeScanErrorListener(listener: (error: Error) => void): BarcodePicker;
    /**
     * Remove all listeners from the [[scanError]] event's listener array.
     *
     * @deprecated Use the [[removeAllListeners]] method instead.
     *
     * @returns The updated [[BarcodePicker]] object.
     */
    removeScanErrorListeners(): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[submitFrame]] event, fired when a new frame is submitted
     * to the engine to be processed. As the frame is not processed yet, the [[ScanResult.barcodes]] property will
     * always be empty (no results yet).
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @deprecated Use the [[on]] method instead.
     *
     * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
     * @param once Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    onSubmitFrame(listener: (scanResult: ScanResult) => void, once?: boolean): BarcodePicker;
    /**
     * Remove the specified listener from the [[submitFrame]] event's listener array.
     *
     * @deprecated Use the [[removeListener]] method instead.
     *
     * @param listener The listener function to be removed.
     * @returns The updated [[BarcodePicker]] object.
     */
    removeSubmitFrameListener(listener: (scanResult: ScanResult) => void): BarcodePicker;
    /**
     * Remove all listeners from the [[submitFrame]] event's listener array.
     *
     * @deprecated Use the [[removeAllListeners]] method instead.
     *
     * @returns The updated [[BarcodePicker]] object.
     */
    removeSubmitFrameListeners(): BarcodePicker;
    /**
     * Add the listener function to the listeners array for the [[processFrame]] event, fired when a new frame is
     * processed. This event is fired on every frame, independently from the number of recognized barcodes (can be none).
     * The returned barcodes are affected by the [[ScanSettings.setCodeDuplicateFilter]] option.
     *
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
     *
     * @deprecated Use the [[on]] method instead.
     *
     * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
     * @param once Whether the listener should just be triggered only once and then discarded.
     * @returns The updated [[BarcodePicker]] object.
     */
    onProcessFrame(listener: (scanResult: ScanResult) => void, once?: boolean): BarcodePicker;
    /**
     * Remove the specified listener from the [[processFrame]] event's listener array.
     *
     * @deprecated Use the [[removeListener]] method instead.
     *
     * @param listener The listener function to be removed.
     * @returns The updated [[BarcodePicker]] object.
     */
    removeProcessFrameListener(listener: (scanResult: ScanResult) => void): BarcodePicker;
    /**
     * Remove all listeners from the [[processFrame]] event's listener array.
     *
     * @deprecated Use the [[removeAllListeners]] method instead.
     *
     * @returns The updated [[BarcodePicker]] object.
     */
    removeProcessFrameListeners(): BarcodePicker;
    /**
     * Set the GUI style for the picker.
     *
     * In "single image mode" this method has no effect.
     *
     * When the GUI style is set to *laser* or *viewfinder*, the GUI will flash on barcode recognition.
     * Note that the GUI will flash if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
     *
     * @param guiStyle The new GUI style to be applied.
     * @returns The updated [[BarcodePicker]] object.
     */
    setGuiStyle(guiStyle: BarcodePicker.GuiStyle): BarcodePicker;
    /**
     * Set the fit type for the video element of the picker.
     *
     * If the "cover" type is selected the maximum available search area for barcode detection is (continuously) adjusted
     * automatically according to the visible area of the picker.
     *
     * In "single image mode" this method has no effect.
     *
     * @param objectFit The new fit type to be applied.
     * @returns The updated [[BarcodePicker]] object.
     */
    setVideoFit(objectFit: BarcodePicker.ObjectFit): BarcodePicker;
    /**
     * Access the currently set or default camera, requesting user permissions if needed.
     * This method is meant to be used after the picker has been initialized with disabled camera access
     * (*accessCamera*=false) or after [[pauseScanning]] has been called with the pause camera stream option.
     * Calling this doesn't do anything if the camera is already being accessed.
     *
     * Depending on device features and user permissions for camera access, any of the following errors
     * could be the rejected result of the returned promise:
     * - `PermissionDeniedError`
     * - `NotAllowedError`
     * - `NotFoundError`
     * - `AbortError`
     * - `NotReadableError`
     * - `InternalError`
     * - `NoCameraAvailableError`
     *
     * In "single image mode" this method has no effect.
     *
     * @returns A promise resolving to the updated [[BarcodePicker]] object when the camera is accessed.
     */
    accessCamera(): Promise<BarcodePicker>;
    /**
     * Create a new parser object.
     *
     * @param dataFormat The format of the input data for the parser.
     * @returns The newly created parser.
     */
    createParserForFormat(dataFormat: Parser.DataFormat): Parser;
    /**
     * Reassign the barcode picker to a different HTML element.
     *
     * All the barcode picker elements inside the current origin element will be moved to the new given one.
     *
     * If an invalid element is given, a `NoOriginElementError` error is thrown.
     *
     * @param originElement The HTMLElement into which all the necessary elements for the picker will be moved.
     * @returns The updated [[BarcodePicker]] object.
     */
    reassignOriginElement(originElement: HTMLElement): BarcodePicker;
    /**
     * Set the target frames per second to be processed by the scanning engine.
     *
     * The final speed is limited by the camera framerate (usually 30 FPS) and the frame processing time of the device.
     * By setting this to lower numbers devices can save power by performing less work during scanning operations,
     * depending on device speed (faster devices can "sleep" for longer periods).
     *
     * In "single image mode" this method has no effect.
     *
     * @param targetScanningFPS The target frames per second to be processed.
     * Must be a number bigger than 0, by default set to 30.
     * @returns The updated [[BarcodePicker]] object.
     */
    setTargetScanningFPS(targetScanningFPS: number): BarcodePicker;
    /**
     * @returns The internally used initialized (and possibly configured) [[Scanner]] object instance.
     */
    getScanner(): Scanner;
    /**
     * Clear the internal scanner session.
     *
     * This removes all recognized barcodes from the scanner session and allows them to be scanned again in case a custom
     * *codeDuplicateFilter* was set in the [[ScanSettings]].
     *
     * @returns The updated [[BarcodePicker]] object.
     */
    clearSession(): BarcodePicker;
    /**
     * Set the area of the laser displayed when the GUI style is set to *laser* (the laser will match the width and be
     * vertically centered).
     * Note that this functionality affects UI only and doesn't change the actual search area set via [[ScanSettings]].
     * If no area is passed, the default automatic size behaviour is set, where the laser will match the current area
     * of the image in which barcodes are searched, controlled via the *searchArea* option in [[ScanSettings]].
     *
     * @param area The new search area, by default the area will match the [[ScanSettings]]'s *searchArea*.
     * @returns The updated [[BarcodePicker]] object.
     */
    setLaserArea(area?: SearchArea): BarcodePicker;
    /**
     * Set the area of the viewfinder displayed when the GUI style is set to *viewfinder*.
     * Note that this functionality affects UI only and doesn't change the actual search area set via [[ScanSettings]].
     * If no area is passed, the default automatic size behaviour is set, where the viewfinder will match the current area
     * of the image in which barcodes are searched, controlled via the *searchArea* option in [[ScanSettings]].
     *
     * @param area The new search area, by default the area will match the [[ScanSettings]]'s *searchArea*.
     * @returns The updated [[BarcodePicker]] object.
     */
    setViewfinderArea(area?: SearchArea): BarcodePicker;
    private triggerFatalError;
    private handleScanResult;
    private scheduleVideoProcessing;
    private scheduleNextVideoProcessing;
    private processVideoFrame;
    private videoProcessing;
    private handleScannerReady;
}
export declare namespace BarcodePicker {
    /**
     * GUI style to be used by a barcode picker, used to hint barcode placement in the frame.
     */
    enum GuiStyle {
        /**
         * No GUI is shown to indicate where the barcode should be placed.
         * Be aware that the Scandit logo continues to be displayed as showing it is part of the license agreement.
         */
        NONE = "none",
        /**
         * A laser line is shown.
         */
        LASER = "laser",
        /**
         * A rectangular viewfinder with rounded corners is shown.
         */
        VIEWFINDER = "viewfinder"
    }
    /**
     * Fit type used to control the resizing (scale) of the barcode picker to fit in its container *originElement*.
     */
    enum ObjectFit {
        /**
         * Scale to maintain aspect ratio while fitting within the *originElement*'s content box.
         * Aspect ratio is preserved, so the barcode picker will be "letterboxed" if its aspect ratio
         * does not match the aspect ratio of the box.
         */
        CONTAIN = "contain",
        /**
         * Scale to maintain aspect ratio while filling the *originElement*'s entire content box.
         * Aspect ratio is preserved, so the barcode picker will be clipped to fit if its aspect ratio
         * does not match the aspect ratio of the box.
         */
        COVER = "cover"
    }
}
export {};
