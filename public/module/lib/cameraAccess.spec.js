/* tslint:disable:no-implicit-dependencies */
/**
 * CameraAccess tests
 */
import test from "ava";
import * as sinon from "sinon";
import { BrowserHelper, Camera, CameraAccess } from "..";
const getUserMediaStub = sinon.stub();
const getVideoTracksStub = sinon.stub();
const applyConstraintsStub = sinon.stub();
const getCapabilitiesStub = sinon.stub();
const getConstraintsStub = sinon.stub();
const getSettingsStub = sinon.stub();
const stopStub = sinon.stub();
const getSourcesStub = sinon.stub();
const enumerateDevicesStub = sinon.stub();
const stubs = [
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
const emptyCamera = {
    deviceId: "1",
    groupId: "1",
    kind: "videoinput",
    label: "",
    toJSON: function () {
        return this;
    }
};
const fakeCamera1 = {
    deviceId: "1",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (back)",
    toJSON: function () {
        return this;
    }
};
const fakeCamera2 = {
    deviceId: "2",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (front)",
    toJSON: function () {
        return this;
    }
};
const fakeCamera3 = {
    deviceId: "3",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (posteriore)",
    toJSON: function () {
        return this;
    }
};
const fakeCamera4 = {
    deviceId: "4",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (unknown)",
    toJSON: function () {
        return this;
    }
};
const fakeCamera5 = {
    deviceId: "5",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (unknown)",
    toJSON: function () {
        return this;
    }
};
const fakeCamera6 = {
    deviceId: "6",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device 5MP",
    toJSON: function () {
        return this;
    }
};
const fakeCamera7 = {
    deviceId: "7",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device 2MP",
    toJSON: function () {
        return this;
    }
};
const illegalFakeCamera1 = {
    deviceId: "10",
    groupId: "1",
    kind: "videoinput"
};
const legacyFakeCamera1 = {
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (back)"
};
const legacyFakeCamera2 = {
    deviceId: "100",
    groupId: "1",
    kind: "video",
    label: "Fake Camera Device (front)"
};
const fakeMicrophone = {
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
    window.Worker = () => {
        return;
    };
    window.WebAssembly = {};
    window.Blob = () => {
        return;
    };
    window.URL = {
        createObjectURL: () => {
            return;
        }
    };
}
function resetStubs() {
    stubs.forEach(mock => {
        mock.resetHistory();
    });
}
test.beforeEach(() => {
    window.MediaStreamTrack = undefined;
    navigator.enumerateDevices = undefined;
});
test.serial("getCameras (errors)", async (t) => {
    resetStubs();
    let error = await t.throwsAsync(CameraAccess.getCameras());
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
    error = await t.throwsAsync(CameraAccess.getCameras());
    t.is(error.message, "Test error 1");
    t.true(getUserMediaStub.called);
    t.false(getSourcesStub.called);
    enumerateDevicesStub.reset();
    navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([]);
    navigator.mediaDevices.getUserMedia = getUserMediaStub.rejects(new Error("Test error 2"));
    resetStubs();
    error = await t.throwsAsync(CameraAccess.getCameras());
    t.is(error.message, "Test error 2");
    t.true(getUserMediaStub.called);
    t.false(getSourcesStub.called);
});
test.serial("getCameras (MediaStreamTrack.getSources)", async (t) => {
    fakeCompatibleBrowser();
    // Intentionally wrong legacy method
    window.MediaStreamTrack = {
        getSources: getSourcesStub.callsArgWith(0, null)
    };
    resetStubs();
    const error = await t.throwsAsync(CameraAccess.getCameras());
    t.is(error.name, "UnsupportedBrowserError");
    t.false(getUserMediaStub.called);
    t.true(getSourcesStub.called);
    window.MediaStreamTrack = {
        getSources: getSourcesStub.callsArgWith(0, [emptyCamera])
    };
    resetStubs();
    let cameras = await CameraAccess.getCameras();
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
    cameras = await CameraAccess.getCameras();
    t.false(getUserMediaStub.called);
    t.true(getSourcesStub.called);
    t.not(cameras, null);
    t.is(cameras.length, 4);
    resetStubs();
    const newCameras = await CameraAccess.getCameras();
    t.false(getUserMediaStub.called);
    t.true(getSourcesStub.called);
    t.deepEqual(cameras, newCameras);
    t.is(cameras[0].deviceId, fakeCamera1.deviceId);
    t.is(cameras[0].label, fakeCamera1.label);
    t.is(cameras[0].cameraType, Camera.Type.BACK);
    t.is(cameras[0].currentResolution, undefined);
    t.is(cameras[1].deviceId, fakeCamera2.deviceId);
    t.is(cameras[1].label, fakeCamera2.label);
    t.is(cameras[1].cameraType, Camera.Type.FRONT);
    t.is(cameras[1].currentResolution, undefined);
    t.is(cameras[2].deviceId, "");
    t.is(cameras[2].label, legacyFakeCamera1.label);
    t.is(cameras[2].cameraType, Camera.Type.BACK);
    t.is(cameras[2].currentResolution, undefined);
    t.is(cameras[3].deviceId, legacyFakeCamera2.deviceId);
    t.is(cameras[3].label, legacyFakeCamera2.label);
    t.is(cameras[3].cameraType, Camera.Type.FRONT);
    t.is(cameras[3].currentResolution, undefined);
});
test.serial("getCameras (navigator.enumerateDevices & navigator.mediaDevices.enumerateDevices)", async (t) => {
    fakeCompatibleBrowser();
    window.MediaStreamTrack = {
        getSources: getSourcesStub
    };
    for (const baseObject of [navigator, navigator.mediaDevices]) {
        baseObject.enumerateDevices = enumerateDevicesStub.resolves([emptyCamera]);
        resetStubs();
        let cameras = await CameraAccess.getCameras();
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
        cameras = await CameraAccess.getCameras();
        t.false(getUserMediaStub.called);
        t.true(enumerateDevicesStub.called);
        t.false(getSourcesStub.called);
        t.not(cameras, null);
        t.is(cameras.length, 3);
        resetStubs();
        const newCameras = await CameraAccess.getCameras();
        t.false(getUserMediaStub.called);
        t.true(enumerateDevicesStub.called);
        t.false(getSourcesStub.called);
        t.deepEqual(cameras, newCameras);
        t.is(cameras[0].deviceId, fakeCamera1.deviceId);
        t.is(cameras[0].label, fakeCamera1.label);
        t.is(cameras[0].cameraType, Camera.Type.BACK);
        t.is(cameras[0].currentResolution, undefined);
        t.is(cameras[1].deviceId, fakeCamera2.deviceId);
        t.is(cameras[1].label, fakeCamera2.label);
        t.is(cameras[1].cameraType, Camera.Type.FRONT);
        t.is(cameras[1].currentResolution, undefined);
        t.is(cameras[2].deviceId, illegalFakeCamera1.deviceId);
        t.is(cameras[2].label, "");
        t.is(cameras[2].cameraType, Camera.Type.FRONT);
        t.is(cameras[2].currentResolution, undefined);
    }
});
test.serial("getCameras (internationalized label)", async (t) => {
    fakeCompatibleBrowser();
    navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([fakeCamera3]);
    resetStubs();
    const cameras = await CameraAccess.getCameras();
    t.not(cameras, null);
    t.is(cameras.length, 1);
    t.is(cameras[0].deviceId, fakeCamera3.deviceId);
    t.is(cameras[0].label, fakeCamera3.label);
    t.is(cameras[0].cameraType, Camera.Type.BACK);
    t.is(cameras[0].currentResolution, undefined);
});
test.serial("getCameras (no front/back label information)", async (t) => {
    fakeCompatibleBrowser();
    navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([fakeCamera4, fakeCamera5]);
    resetStubs();
    const cameras = await CameraAccess.getCameras();
    t.not(cameras, null);
    t.is(cameras.length, 2);
    t.is(cameras[0].deviceId, fakeCamera4.deviceId);
    t.is(cameras[0].label, fakeCamera4.label);
    t.is(cameras[0].cameraType, Camera.Type.FRONT);
    t.is(cameras[0].currentResolution, undefined);
    t.is(cameras[1].deviceId, fakeCamera5.deviceId);
    t.is(cameras[1].label, fakeCamera5.label);
    t.is(cameras[1].cameraType, Camera.Type.BACK);
    t.is(cameras[1].currentResolution, undefined);
});
test.serial("getCameras (resolution label information)", async (t) => {
    fakeCompatibleBrowser();
    navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([fakeCamera6, fakeCamera7]);
    resetStubs();
    const cameras = await CameraAccess.getCameras();
    t.not(cameras, null);
    t.is(cameras.length, 2);
    t.is(cameras[0].deviceId, fakeCamera6.deviceId);
    t.is(cameras[0].label, fakeCamera6.label);
    t.is(cameras[0].cameraType, Camera.Type.BACK);
    t.is(cameras[0].currentResolution, undefined);
    t.is(cameras[1].deviceId, fakeCamera7.deviceId);
    t.is(cameras[1].label, fakeCamera7.label);
    t.is(cameras[1].cameraType, Camera.Type.FRONT);
    t.is(cameras[1].currentResolution, undefined);
});
test.serial("getCameras (quickly consecutively)", async (t) => {
    fakeCompatibleBrowser();
    navigator.mediaDevices.enumerateDevices = enumerateDevicesStub.resolves([fakeCamera1, fakeCamera2]);
    resetStubs();
    await CameraAccess.getCameras();
    t.is(enumerateDevicesStub.callCount, 2);
    resetStubs();
    CameraAccess.getCameras();
    const cameras = await CameraAccess.getCameras();
    t.is(enumerateDevicesStub.callCount, 2);
    t.not(cameras, null);
    t.is(cameras.length, 2);
    t.is(cameras[0].deviceId, fakeCamera1.deviceId);
    t.is(cameras[0].label, fakeCamera1.label);
    t.is(cameras[0].cameraType, Camera.Type.BACK);
    t.is(cameras[0].currentResolution, undefined);
    t.is(cameras[1].deviceId, fakeCamera2.deviceId);
    t.is(cameras[1].label, fakeCamera2.label);
    t.is(cameras[1].cameraType, Camera.Type.FRONT);
    t.is(cameras[1].currentResolution, undefined);
});
// tslint:disable-next-line:max-func-body-length
test.serial("accessCameraStream", async (t) => {
    fakeCompatibleBrowser();
    const fakeEmptyBackCamera = {
        deviceId: "",
        label: "",
        cameraType: Camera.Type.BACK
    };
    resetStubs();
    let mediaStream = await CameraAccess.accessCameraStream(0, fakeEmptyBackCamera);
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
    const fakeEmptyFrontCamera = {
        deviceId: "",
        label: "",
        cameraType: Camera.Type.FRONT
    };
    resetStubs();
    mediaStream = await CameraAccess.accessCameraStream(0, fakeEmptyFrontCamera);
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
    const fakeCamera = {
        deviceId: fakeCamera1.deviceId,
        label: fakeCamera1.label,
        cameraType: Camera.Type.BACK
    };
    resetStubs();
    mediaStream = await CameraAccess.accessCameraStream(0, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(1, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(2, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(3, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(4, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(5, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(6, fakeCamera);
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
});
// tslint:disable-next-line:max-func-body-length
test.serial("accessCameraStream (Safari)", async (t) => {
    fakeCompatibleBrowser();
    BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) " +
        "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1");
    const fakeCamera = {
        deviceId: fakeCamera1.deviceId,
        label: fakeCamera1.label,
        cameraType: Camera.Type.BACK
    };
    resetStubs();
    let mediaStream = await CameraAccess.accessCameraStream(0, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(1, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(2, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(3, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(4, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(5, fakeCamera);
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
    mediaStream = await CameraAccess.accessCameraStream(6, fakeCamera);
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
});
//# sourceMappingURL=cameraAccess.spec.js.map