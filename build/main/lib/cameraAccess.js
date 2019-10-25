"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var browserCompatibility_1 = require("./browserCompatibility");
var browserHelper_1 = require("./browserHelper");
var camera_1 = require("./camera");
var unsupportedBrowserError_1 = require("./unsupportedBrowserError");
/**
 * A helper object to interact with cameras.
 */
var CameraAccess;
(function (CameraAccess) {
    /**
     * @hidden
     *
     * Handle localized camera labels. Supported languages:
     * English, German, French, Spanish (spain), Portuguese (brasil), Portuguese (portugal), Italian,
     * Chinese (simplified), Chinese (traditional), Japanese, Russian, Turkish, Dutch, Arabic, Thai, Swedish,
     * Danish, Vietnamese, Norwegian, Polish, Finnish, Indonesian, Hebrew, Greek, Romanian, Hungarian, Czech,
     * Catalan, Slovak, Ukraininan, Croatian, Malay, Hindi.
     */
    var backCameraKeywords = [
        "rear",
        "back",
        "rück",
        "arrière",
        "trasera",
        "trás",
        "traseira",
        "posteriore",
        "后面",
        "後面",
        "背面",
        "后置",
        "後置",
        "背置",
        "задней",
        "الخلفية",
        "후",
        "arka",
        "achterzijde",
        "หลัง",
        "baksidan",
        "bagside",
        "sau",
        "bak",
        "tylny",
        "takakamera",
        "belakang",
        "אחורית",
        "πίσω",
        "spate",
        "hátsó",
        "zadní",
        "darrere",
        "zadná",
        "задня",
        "stražnja",
        "belakang",
        "बैक"
    ];
    /**
     * @hidden
     */
    var cameraObjects = new Map();
    /**
     * @hidden
     */
    var getCamerasPromise;
    /**
     * @hidden
     *
     * @param label The camera label.
     * @returns Whether the label mentions the camera being a back-facing one.
     */
    function isBackCameraLabel(label) {
        var lowercaseLabel = label.toLowerCase();
        return backCameraKeywords.some(function (keyword) {
            return lowercaseLabel.includes(keyword);
        });
    }
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
    function adjustCamerasFromMainCameraStream(mediaStreamTrack, cameras) {
        var mediaTrackSettings;
        if (typeof mediaStreamTrack.getSettings === "function") {
            mediaTrackSettings = mediaStreamTrack.getSettings();
        }
        var activeCamera = cameras.find(function (camera) {
            return ((mediaTrackSettings != null && camera.deviceId === mediaTrackSettings.deviceId) ||
                camera.label === mediaStreamTrack.label);
        });
        if (activeCamera !== undefined) {
            var activeCameraIsBackFacing = (mediaTrackSettings != null && mediaTrackSettings.facingMode === "environment") ||
                isBackCameraLabel(mediaStreamTrack.label);
            // TODO: also correct camera types when active camera is not back-facing
            if (activeCameraIsBackFacing && cameras.length > 1) {
                // Correct camera types if needed
                cameras.forEach(function (camera) {
                    if (camera.deviceId === activeCamera.deviceId) {
                        camera.cameraType = camera_1.Camera.Type.BACK;
                    }
                    else if (!isBackCameraLabel(camera.label)) {
                        camera.cameraType = camera_1.Camera.Type.FRONT;
                    }
                });
            }
            if (cameras.length === 1 || activeCameraIsBackFacing) {
                return activeCamera;
            }
        }
        return undefined;
    }
    CameraAccess.adjustCamerasFromMainCameraStream = adjustCamerasFromMainCameraStream;
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
    function getCameras() {
        if (getCamerasPromise != null) {
            return getCamerasPromise;
        }
        var browserCompatibility = browserHelper_1.BrowserHelper.checkBrowserCompatibility();
        if (!browserCompatibility.fullSupport) {
            return Promise.reject(new unsupportedBrowserError_1.UnsupportedBrowserError(browserCompatibility));
        }
        var accessPermissionPromise = new Promise(function (resolve, reject) {
            return enumerateDevices()
                .then(function (devices) {
                if (devices
                    .filter(function (device) {
                    return device.kind === "videoinput";
                })
                    .every(function (device) {
                    return device.label === "";
                })) {
                    resolve(navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false
                    }));
                }
                else {
                    resolve();
                }
            })
                .catch(reject);
        });
        getCamerasPromise = new Promise(function (resolve, reject) {
            accessPermissionPromise
                .then(function (stream) {
                return enumerateDevices()
                    .then(function (devices) {
                    var cameras = devices
                        .filter(function (device) {
                        return device.kind === "videoinput";
                    })
                        .map(function (videoDevice) {
                        if (cameraObjects.has(videoDevice.deviceId)) {
                            return cameraObjects.get(videoDevice.deviceId);
                        }
                        var label = videoDevice.label != null ? videoDevice.label : "";
                        var camera = {
                            deviceId: videoDevice.deviceId,
                            label: label,
                            cameraType: isBackCameraLabel(label) ? camera_1.Camera.Type.BACK : camera_1.Camera.Type.FRONT
                        };
                        if (label !== "") {
                            cameraObjects.set(videoDevice.deviceId, camera);
                        }
                        return camera;
                    });
                    if (cameras.length > 1 &&
                        !cameras.some(function (camera) {
                            return camera.cameraType === camera_1.Camera.Type.BACK;
                        })) {
                        // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
                        // Otherwise pick the last camera
                        var backCameraIndex = cameras.length - 1;
                        var cameraResolutions = cameras.map(function (camera) {
                            var match = camera.label.match(/\b([0-9]+)MP?\b/i);
                            if (match != null) {
                                return parseInt(match[1], 10);
                            }
                            return NaN;
                        });
                        if (!cameraResolutions.some(function (cameraResolution) {
                            return isNaN(cameraResolution);
                        })) {
                            backCameraIndex = cameraResolutions.lastIndexOf(Math.max.apply(Math, tslib_1.__spread(cameraResolutions)));
                        }
                        cameras[backCameraIndex].cameraType = camera_1.Camera.Type.BACK;
                    }
                    // istanbul ignore else
                    if (stream != null) {
                        stream.getVideoTracks().forEach(function (track) {
                            track.stop();
                        });
                    }
                    console.debug.apply(console, tslib_1.__spread(["Camera list: "], cameras));
                    getCamerasPromise = undefined;
                    return resolve(cameras);
                })
                    .catch(function (error) {
                    // istanbul ignore else
                    if (stream != null) {
                        stream.getVideoTracks().forEach(function (track) {
                            track.stop();
                        });
                    }
                    getCamerasPromise = undefined;
                    return reject(error);
                });
            })
                .catch(function (error) {
                getCamerasPromise = undefined;
                // istanbul ignore if
                if (error.name === "SourceUnavailableError") {
                    error.name = "NotReadableError";
                }
                return reject(error);
            });
        });
        return getCamerasPromise;
    }
    CameraAccess.getCameras = getCameras;
    /**
     * @hidden
     *
     * Call `navigator.mediaDevices.getUserMedia` asynchronously in a `setTimeout` call.
     *
     * @param getUserMediaParams The parameters for the `navigator.mediaDevices.getUserMedia` call.
     * @returns A promise resolving when the camera is accessed.
     */
    function getUserMediaDelayed(getUserMediaParams) {
        console.debug("Camera access:", getUserMediaParams.video);
        return new Promise(function (resolve, reject) {
            window.setTimeout(function () {
                navigator.mediaDevices
                    .getUserMedia(getUserMediaParams)
                    .then(resolve)
                    .catch(reject);
            }, 0);
        });
    }
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
    function accessCameraStream(resolutionFallbackLevel, camera) {
        var browserName = browserHelper_1.BrowserHelper.userAgentInfo.getBrowser().name;
        var isSafariBrowser = browserName != null && browserName.includes("Safari");
        var getUserMediaParams = {
            audio: false,
            video: {}
        };
        if (resolutionFallbackLevel === 0) {
            getUserMediaParams.video = {
                width: {
                    min: 1400,
                    ideal: 1920,
                    max: 1920
                },
                height: {
                    min: 900,
                    ideal: isSafariBrowser ? 1080 : 1440,
                    max: 1440
                }
            };
        }
        else if (resolutionFallbackLevel === 1) {
            getUserMediaParams.video = {
                width: {
                    min: 1200,
                    ideal: isSafariBrowser ? 1600 : 1920,
                    max: 1920
                },
                height: {
                    min: 900,
                    ideal: isSafariBrowser ? 1080 : 1200,
                    max: 1200
                }
            };
        }
        else if (resolutionFallbackLevel === 2) {
            getUserMediaParams.video = {
                width: {
                    min: 1080,
                    ideal: isSafariBrowser ? 1600 : 1920,
                    max: 1920
                },
                height: {
                    min: 900,
                    ideal: isSafariBrowser ? 900 : 1080,
                    max: 1080
                }
            };
        }
        else if (resolutionFallbackLevel === 3) {
            getUserMediaParams.video = {
                width: {
                    min: 960,
                    ideal: 1280,
                    max: 1440
                },
                height: {
                    min: 480,
                    ideal: isSafariBrowser ? 720 : 960,
                    max: 960
                }
            };
        }
        else if (resolutionFallbackLevel === 4) {
            getUserMediaParams.video = {
                width: {
                    min: 720,
                    ideal: isSafariBrowser ? 1024 : 1280,
                    max: 1440
                },
                height: {
                    min: 480,
                    ideal: isSafariBrowser ? 768 : 720,
                    max: 768
                }
            };
        }
        else if (resolutionFallbackLevel === 5) {
            getUserMediaParams.video = {
                width: {
                    min: 640,
                    ideal: isSafariBrowser ? 800 : 960,
                    max: 1440
                },
                height: {
                    min: 480,
                    ideal: isSafariBrowser ? 600 : 720,
                    max: 720
                }
            };
        }
        if (camera.deviceId === "") {
            getUserMediaParams.video.facingMode = {
                ideal: camera.cameraType === camera_1.Camera.Type.BACK ? "environment" : "user"
            };
        }
        else {
            getUserMediaParams.video.deviceId = {
                exact: camera.deviceId
            };
        }
        return getUserMediaDelayed(getUserMediaParams);
    }
    CameraAccess.accessCameraStream = accessCameraStream;
    /**
     * @hidden
     *
     * Get a list of available devices in a cross-browser compatible way.
     *
     * @returns A promise resolving to the `MediaDeviceInfo` array of all available devices.
     */
    function enumerateDevices() {
        if (typeof navigator.enumerateDevices === "function") {
            return navigator.enumerateDevices();
        }
        else if (typeof navigator.mediaDevices === "object" &&
            typeof navigator.mediaDevices.enumerateDevices === "function") {
            return navigator.mediaDevices.enumerateDevices();
        }
        else {
            return new Promise(function (resolve, reject) {
                try {
                    window.MediaStreamTrack.getSources(function (devices) {
                        resolve(devices
                            .filter(function (device) {
                            return device.kind.toLowerCase() === "video" || device.kind.toLowerCase() === "videoinput";
                        })
                            .map(function (device) {
                            return {
                                deviceId: device.deviceId != null ? device.deviceId : "",
                                groupId: device.groupId,
                                kind: "videoinput",
                                label: device.label,
                                toJSON: /* istanbul ignore next */ function () {
                                    return this;
                                }
                            };
                        }));
                    });
                }
                catch (error) {
                    var browserCompatibility = {
                        fullSupport: false,
                        scannerSupport: true,
                        missingFeatures: [browserCompatibility_1.BrowserCompatibility.Feature.MEDIA_DEVICES]
                    };
                    return reject(new unsupportedBrowserError_1.UnsupportedBrowserError(browserCompatibility));
                }
            });
        }
    }
})(CameraAccess = exports.CameraAccess || (exports.CameraAccess = {}));
//# sourceMappingURL=cameraAccess.js.map