"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-implicit-dependencies */
/**
 * CameraAccess tests
 */
var ava_1 = tslib_1.__importDefault(require("ava"));
var sinon = tslib_1.__importStar(require("sinon"));
var __1 = require("..");
var getUserMediaStub = sinon.stub();
var getVideoTracksStub = sinon.stub();
var applyConstraintsStub = sinon.stub();
var getCapabilitiesStub = sinon.stub();
var getConstraintsStub = sinon.stub();
var getSettingsStub = sinon.stub();
var stopStub = sinon.stub();
var getSourcesStub = sinon.stub();
var enumerateDevicesStub = sinon.stub();
var stubs = [
    getUserMediaStub,
    getVideoTracksStub,
    applyConstraintsStub,
    getCapabilitiesStub,
    getConstraintsStub,
    getSettingsStub,
    stopStub,
    getSourcesStub,
    enumerateDevicesStub
];
var emptyCamera = {
    deviceId: "1",
    groupId: "1",
    kind: "videoinput",
    label: "",
    toJSON: function () {
        return this;
    }
};
var fakeCamera1 = {
    deviceId: "1",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (back)",
    toJSON: function () {
        return this;
    }
};
var fakeCamera2 = {
    deviceId: "2",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (front)",
    toJSON: function () {
        return this;
    }
};
var fakeCamera3 = {
    deviceId: "3",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (posteriore)",
    toJSON: function () {
        return this;
    }
};
var fakeCamera4 = {
    deviceId: "4",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (unknown)",
    toJSON: function () {
        return this;
    }
};
var fakeCamera5 = {
    deviceId: "5",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (unknown)",
    toJSON: function () {
        return this;
    }
};
var fakeCamera6 = {
    deviceId: "6",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device 5MP",
    toJSON: function () {
        return this;
    }
};
var fakeCamera7 = {
    deviceId: "7",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device 2MP",
    toJSON: function () {
        return this;
    }
};
var illegalFakeCamera1 = {
    deviceId: "10",
    groupId: "1",
    kind: "videoinput"
};
var legacyFakeCamera1 = {
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (back)"
};
var legacyFakeCamera2 = {
    deviceId: "100",
    groupId: "1",
    kind: "video",
    label: "Fake Camera Device (front)"
};
var fakeMicrophone = {
    deviceId: "1000",
    groupId: "1",
    kind: "audioinput",
    label: "Fake Microhpone Device #2",
    toJSON: function () {
        return this;
    }
};
function fakeCompatibleBrowser() {
    navigator.mediaDevices = {
        getUserMedia: getUserMediaStub.resolves({
            getTracks: getVideoTracksStub,
            getVideoTracks: getVideoTracksStub
        })
    };
    getVideoTracksStub.returns([
        {
            applyConstraints: applyConstraintsStub.resolves(),
            getCapabilities: getCapabilitiesStub.returns(123),
            getConstraints: getConstraintsStub.returns(456),
            getSettings: getSettingsStub.returns(789),
            stop: stopStub
        }
    ]);
    window.Worker = function () {
        return;
    };
    window.WebAssembly = {};
    window.Blob = function () {
        return;
    };
    window.URL = {
        createObjectURL: function () {
            return;
        }
    };
}
function resetStubs() {
    stubs.forEach(function (mock) {
        mock.resetHistory();
    });
}
ava_1.default.beforeEach(function () {
    window.MediaStreamTrack = undefined;
    navigator.enumerateDevices = undefined;
});
ava_1.default.serial("getCameras (errors)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var error;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resetStubs();
                return [4 /*yield*/, t.throwsAsync(__1.CameraAccess.getCameras())];
            case 1:
                error = _a.sent();
                t.is(error.name, "UnsupportedBrowserError");
                t.false(getUserMediaStub.called);
                t.false(getSourcesStub.called);
                fakeCompatibleBrowser();
                navigator.mediaDevices.enumerateDevices = enumerateDevicesStub
                    .onFirstCall()
                    .resolves([])
                    .onSecondCall()
                    .rejects(new Error("Test error 1"));
                resetStubs();
                return [4 /*yield*/, t.throwsAsync(__1.CameraAccess.getCameras())];
            case 2:
                error = _a.sent();
                t.is(error.message, "Test error 1");
                t.true(getUserMediaStub.called);
                t.false(getSourcesStub.called);
                enumerateDevicesStub.reset();
                navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([]);
                navigator.mediaDevices.getUserMedia = getUserMediaStub.rejects(new Error("Test error 2"));
                resetStubs();
                return [4 /*yield*/, t.throwsAsync(__1.CameraAccess.getCameras())];
            case 3:
                error = _a.sent();
                t.is(error.message, "Test error 2");
                t.true(getUserMediaStub.called);
                t.false(getSourcesStub.called);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("getCameras (MediaStreamTrack.getSources)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var error, cameras, newCameras;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fakeCompatibleBrowser();
                // Intentionally wrong legacy method
                window.MediaStreamTrack = {
                    getSources: getSourcesStub.callsArgWith(0, null)
                };
                resetStubs();
                return [4 /*yield*/, t.throwsAsync(__1.CameraAccess.getCameras())];
            case 1:
                error = _a.sent();
                t.is(error.name, "UnsupportedBrowserError");
                t.false(getUserMediaStub.called);
                t.true(getSourcesStub.called);
                window.MediaStreamTrack = {
                    getSources: getSourcesStub.callsArgWith(0, [emptyCamera])
                };
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 2:
                cameras = _a.sent();
                t.true(getUserMediaStub.called);
                t.true(getSourcesStub.called);
                t.not(cameras, null);
                t.is(cameras.length, 1);
                window.MediaStreamTrack = {
                    getSources: getSourcesStub.callsArgWith(0, [
                        fakeCamera1,
                        fakeCamera2,
                        legacyFakeCamera1,
                        legacyFakeCamera2,
                        fakeMicrophone
                    ])
                };
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 3:
                cameras = _a.sent();
                t.false(getUserMediaStub.called);
                t.true(getSourcesStub.called);
                t.not(cameras, null);
                t.is(cameras.length, 4);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 4:
                newCameras = _a.sent();
                t.false(getUserMediaStub.called);
                t.true(getSourcesStub.called);
                t.deepEqual(cameras, newCameras);
                t.is(cameras[0].deviceId, fakeCamera1.deviceId);
                t.is(cameras[0].label, fakeCamera1.label);
                t.is(cameras[0].cameraType, __1.Camera.Type.BACK);
                t.is(cameras[0].currentResolution, undefined);
                t.is(cameras[1].deviceId, fakeCamera2.deviceId);
                t.is(cameras[1].label, fakeCamera2.label);
                t.is(cameras[1].cameraType, __1.Camera.Type.FRONT);
                t.is(cameras[1].currentResolution, undefined);
                t.is(cameras[2].deviceId, "");
                t.is(cameras[2].label, legacyFakeCamera1.label);
                t.is(cameras[2].cameraType, __1.Camera.Type.BACK);
                t.is(cameras[2].currentResolution, undefined);
                t.is(cameras[3].deviceId, legacyFakeCamera2.deviceId);
                t.is(cameras[3].label, legacyFakeCamera2.label);
                t.is(cameras[3].cameraType, __1.Camera.Type.FRONT);
                t.is(cameras[3].currentResolution, undefined);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("getCameras (navigator.enumerateDevices & navigator.mediaDevices.enumerateDevices)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, _b, baseObject, cameras, newCameras, e_1_1;
    var e_1, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                fakeCompatibleBrowser();
                window.MediaStreamTrack = {
                    getSources: getSourcesStub
                };
                _d.label = 1;
            case 1:
                _d.trys.push([1, 8, 9, 10]);
                _a = tslib_1.__values([navigator, navigator.mediaDevices]), _b = _a.next();
                _d.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 7];
                baseObject = _b.value;
                baseObject.enumerateDevices = enumerateDevicesStub.resolves([emptyCamera]);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 3:
                cameras = _d.sent();
                t.true(getUserMediaStub.called);
                t.true(enumerateDevicesStub.called);
                t.false(getSourcesStub.called);
                t.not(cameras, null);
                t.is(cameras.length, 1);
                baseObject.enumerateDevices = enumerateDevicesStub.resolves([
                    fakeCamera1,
                    fakeCamera2,
                    illegalFakeCamera1,
                    fakeMicrophone
                ]);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 4:
                cameras = _d.sent();
                t.false(getUserMediaStub.called);
                t.true(enumerateDevicesStub.called);
                t.false(getSourcesStub.called);
                t.not(cameras, null);
                t.is(cameras.length, 3);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 5:
                newCameras = _d.sent();
                t.false(getUserMediaStub.called);
                t.true(enumerateDevicesStub.called);
                t.false(getSourcesStub.called);
                t.deepEqual(cameras, newCameras);
                t.is(cameras[0].deviceId, fakeCamera1.deviceId);
                t.is(cameras[0].label, fakeCamera1.label);
                t.is(cameras[0].cameraType, __1.Camera.Type.BACK);
                t.is(cameras[0].currentResolution, undefined);
                t.is(cameras[1].deviceId, fakeCamera2.deviceId);
                t.is(cameras[1].label, fakeCamera2.label);
                t.is(cameras[1].cameraType, __1.Camera.Type.FRONT);
                t.is(cameras[1].currentResolution, undefined);
                t.is(cameras[2].deviceId, illegalFakeCamera1.deviceId);
                t.is(cameras[2].label, "");
                t.is(cameras[2].cameraType, __1.Camera.Type.FRONT);
                t.is(cameras[2].currentResolution, undefined);
                _d.label = 6;
            case 6:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("getCameras (internationalized label)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cameras;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fakeCompatibleBrowser();
                navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([fakeCamera3]);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 1:
                cameras = _a.sent();
                t.not(cameras, null);
                t.is(cameras.length, 1);
                t.is(cameras[0].deviceId, fakeCamera3.deviceId);
                t.is(cameras[0].label, fakeCamera3.label);
                t.is(cameras[0].cameraType, __1.Camera.Type.BACK);
                t.is(cameras[0].currentResolution, undefined);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("getCameras (no front/back label information)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cameras;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fakeCompatibleBrowser();
                navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([fakeCamera4, fakeCamera5]);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 1:
                cameras = _a.sent();
                t.not(cameras, null);
                t.is(cameras.length, 2);
                t.is(cameras[0].deviceId, fakeCamera4.deviceId);
                t.is(cameras[0].label, fakeCamera4.label);
                t.is(cameras[0].cameraType, __1.Camera.Type.FRONT);
                t.is(cameras[0].currentResolution, undefined);
                t.is(cameras[1].deviceId, fakeCamera5.deviceId);
                t.is(cameras[1].label, fakeCamera5.label);
                t.is(cameras[1].cameraType, __1.Camera.Type.BACK);
                t.is(cameras[1].currentResolution, undefined);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("getCameras (resolution label information)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cameras;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fakeCompatibleBrowser();
                navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([fakeCamera6, fakeCamera7]);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 1:
                cameras = _a.sent();
                t.not(cameras, null);
                t.is(cameras.length, 2);
                t.is(cameras[0].deviceId, fakeCamera6.deviceId);
                t.is(cameras[0].label, fakeCamera6.label);
                t.is(cameras[0].cameraType, __1.Camera.Type.BACK);
                t.is(cameras[0].currentResolution, undefined);
                t.is(cameras[1].deviceId, fakeCamera7.deviceId);
                t.is(cameras[1].label, fakeCamera7.label);
                t.is(cameras[1].cameraType, __1.Camera.Type.FRONT);
                t.is(cameras[1].currentResolution, undefined);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("getCameras (quickly consecutively)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cameras;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fakeCompatibleBrowser();
                navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([fakeCamera1, fakeCamera2]);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 1:
                _a.sent();
                t.is(enumerateDevicesStub.callCount, 2);
                resetStubs();
                __1.CameraAccess.getCameras();
                return [4 /*yield*/, __1.CameraAccess.getCameras()];
            case 2:
                cameras = _a.sent();
                t.is(enumerateDevicesStub.callCount, 2);
                t.not(cameras, null);
                t.is(cameras.length, 2);
                t.is(cameras[0].deviceId, fakeCamera1.deviceId);
                t.is(cameras[0].label, fakeCamera1.label);
                t.is(cameras[0].cameraType, __1.Camera.Type.BACK);
                t.is(cameras[0].currentResolution, undefined);
                t.is(cameras[1].deviceId, fakeCamera2.deviceId);
                t.is(cameras[1].label, fakeCamera2.label);
                t.is(cameras[1].cameraType, __1.Camera.Type.FRONT);
                t.is(cameras[1].currentResolution, undefined);
                return [2 /*return*/];
        }
    });
}); });
// tslint:disable-next-line:max-func-body-length
ava_1.default.serial("accessCameraStream", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var fakeEmptyBackCamera, mediaStream, fakeEmptyFrontCamera, fakeCamera;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fakeCompatibleBrowser();
                fakeEmptyBackCamera = {
                    deviceId: "",
                    label: "",
                    cameraType: __1.Camera.Type.BACK
                };
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(0, fakeEmptyBackCamera)];
            case 1:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        facingMode: {
                            ideal: "environment"
                        },
                        width: {
                            min: 1400,
                            ideal: 1920,
                            max: 1920
                        },
                        height: {
                            min: 900,
                            ideal: 1440,
                            max: 1440
                        }
                    }
                });
                t.not(mediaStream, null);
                fakeEmptyFrontCamera = {
                    deviceId: "",
                    label: "",
                    cameraType: __1.Camera.Type.FRONT
                };
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(0, fakeEmptyFrontCamera)];
            case 2:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        facingMode: {
                            ideal: "user"
                        },
                        width: {
                            min: 1400,
                            ideal: 1920,
                            max: 1920
                        },
                        height: {
                            min: 900,
                            ideal: 1440,
                            max: 1440
                        }
                    }
                });
                t.not(mediaStream, null);
                fakeCamera = {
                    deviceId: fakeCamera1.deviceId,
                    label: fakeCamera1.label,
                    cameraType: __1.Camera.Type.BACK
                };
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(0, fakeCamera)];
            case 3:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 1400,
                            ideal: 1920,
                            max: 1920
                        },
                        height: {
                            min: 900,
                            ideal: 1440,
                            max: 1440
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(1, fakeCamera)];
            case 4:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 1200,
                            ideal: 1920,
                            max: 1920
                        },
                        height: {
                            min: 900,
                            ideal: 1200,
                            max: 1200
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(2, fakeCamera)];
            case 5:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 1080,
                            ideal: 1920,
                            max: 1920
                        },
                        height: {
                            min: 900,
                            ideal: 1080,
                            max: 1080
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(3, fakeCamera)];
            case 6:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 960,
                            ideal: 1280,
                            max: 1440
                        },
                        height: {
                            min: 480,
                            ideal: 960,
                            max: 960
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(4, fakeCamera)];
            case 7:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 720,
                            ideal: 1280,
                            max: 1440
                        },
                        height: {
                            min: 480,
                            ideal: 720,
                            max: 768
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(5, fakeCamera)];
            case 8:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 640,
                            ideal: 960,
                            max: 1440
                        },
                        height: {
                            min: 480,
                            ideal: 720,
                            max: 720
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(6, fakeCamera)];
            case 9:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        }
                    }
                });
                t.not(mediaStream, null);
                return [2 /*return*/];
        }
    });
}); });
// tslint:disable-next-line:max-func-body-length
ava_1.default.serial("accessCameraStream (Safari)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var fakeCamera, mediaStream;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fakeCompatibleBrowser();
                __1.BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) " +
                    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1");
                fakeCamera = {
                    deviceId: fakeCamera1.deviceId,
                    label: fakeCamera1.label,
                    cameraType: __1.Camera.Type.BACK
                };
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(0, fakeCamera)];
            case 1:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 1400,
                            ideal: 1920,
                            max: 1920
                        },
                        height: {
                            min: 900,
                            ideal: 1080,
                            max: 1440
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(1, fakeCamera)];
            case 2:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 1200,
                            ideal: 1600,
                            max: 1920
                        },
                        height: {
                            min: 900,
                            ideal: 1080,
                            max: 1200
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(2, fakeCamera)];
            case 3:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 1080,
                            ideal: 1600,
                            max: 1920
                        },
                        height: {
                            min: 900,
                            ideal: 900,
                            max: 1080
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(3, fakeCamera)];
            case 4:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 960,
                            ideal: 1280,
                            max: 1440
                        },
                        height: {
                            min: 480,
                            ideal: 720,
                            max: 960
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(4, fakeCamera)];
            case 5:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 720,
                            ideal: 1024,
                            max: 1440
                        },
                        height: {
                            min: 480,
                            ideal: 768,
                            max: 768
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(5, fakeCamera)];
            case 6:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        },
                        width: {
                            min: 640,
                            ideal: 800,
                            max: 1440
                        },
                        height: {
                            min: 480,
                            ideal: 600,
                            max: 720
                        }
                    }
                });
                t.not(mediaStream, null);
                resetStubs();
                return [4 /*yield*/, __1.CameraAccess.accessCameraStream(6, fakeCamera)];
            case 7:
                mediaStream = _a.sent();
                t.true(getUserMediaStub.called);
                t.deepEqual(getUserMediaStub.args[0][0], {
                    audio: false,
                    video: {
                        deviceId: {
                            exact: fakeCamera.deviceId
                        }
                    }
                });
                t.not(mediaStream, null);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=cameraAccess.spec.js.map