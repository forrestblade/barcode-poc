"use strict";
/* tslint:disable:no-implicit-dependencies */
/**
 * BrowserHelper tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
Object.defineProperty(navigator, "platform", {
    value: "iPhone",
    writable: true
});
var ava_1 = tslib_1.__importDefault(require("ava"));
var __1 = require("..");
// tslint:disable-next-line:max-func-body-length
ava_1.default("checkBrowserCompatibility", function (t) {
    window.Blob = null;
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["mediaDevices", "webWorkers", "webAssembly", "blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    navigator.mediaDevices = {
        getUserMedia: function () {
            return;
        }
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["webWorkers", "webAssembly", "blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.Worker = function () {
        return;
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["webAssembly", "blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.WebAssembly = {};
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.Blob = function () {
        return;
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.URL = {
        createObjectURL: function () {
            return;
        }
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: ["offscreenCanvas", "webgl"],
        scannerSupport: true
    });
    window.OffscreenCanvas = function () {
        return;
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: ["webgl"],
        scannerSupport: true
    });
    window.WebGLRenderingContext = true;
    __1.BrowserHelper.canvas = {
        getContext: function () {
            return null;
        }
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: ["webgl"],
        scannerSupport: true
    });
    __1.BrowserHelper.canvas = {
        getContext: function () {
            return true;
        }
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
    __1.BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) " +
        "AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D60 Safari/604.1");
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["webAssemblyErrorFree"],
        scannerSupport: false
    });
    __1.BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) " +
        "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1");
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
    navigator.mediaDevices = undefined;
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["mediaDevices"],
        scannerSupport: true
    });
});
ava_1.default("getDeviceId", function (t) {
    var currentDeviceId = __1.BrowserHelper.getDeviceId();
    t.regex(currentDeviceId, /[0-9a-f]{40}/);
    t.deepEqual(__1.BrowserHelper.getDeviceId(), currentDeviceId);
});
//# sourceMappingURL=browserHelper.spec.js.map