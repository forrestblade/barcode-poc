/* tslint:disable:no-implicit-dependencies */
/**
 * BarcodePicker tests
 */
import test from "ava";
import crypto from "crypto";
import fs from "fs";
import { Response } from "node-fetch";
import * as sinon from "sinon";
import { ImageSettings } from "../imageSettings";
import { Parser } from "../parser";
import { ScanSettings } from "../scanSettings";
import { engine } from "./engineWorker";
async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
function setupSpyModuleFunctions(m) {
    m.HEAPU8 = new Uint8Array(1);
    m.HEAPU8.set = (a, p) => {
        p.a = a;
    };
    m.lengthBytesUTF8 = sinon.spy((_) => {
        return 0;
    });
    m.UTF8ToString = sinon.spy((p) => {
        return p.s;
    });
    m.stringToUTF8 = sinon.spy((s, p) => {
        p.s = s;
    });
    m._malloc = sinon.spy((_) => {
        return {};
    });
    m._free = sinon.spy();
    m._create_context = sinon.spy();
    m._scanner_settings_new_from_json = sinon.spy((p) => {
        // Mock invalid config
        if (p.s === JSON.stringify({})) {
            return {
                s: ""
            };
        }
        return {
            s: JSON.stringify({})
        };
    });
    m._scanner_image_settings_new = sinon.spy();
    m._scanner_session_clear = sinon.spy();
    m._can_hide_logo = sinon.spy(() => {
        return 1;
    });
    m._scanner_scan = sinon.spy((imageData) => {
        // Mock error
        if (imageData.a[0] === 255) {
            return {
                s: JSON.stringify({
                    error: {
                        errorCode: 1,
                        errorMessage: "Error."
                    }
                })
            };
        }
        return {
            s: JSON.stringify({ scanResult: [] })
        };
    });
    m._parser_parse_string = sinon.spy((parserType) => {
        // Mock error
        if (parserType === -1) {
            return {
                s: JSON.stringify({
                    error: {
                        errorCode: 1,
                        errorMessage: "Error."
                    }
                })
            };
        }
        return {
            s: JSON.stringify({ result: { x: "y" } })
        };
    });
    m.callMain = sinon.spy();
}
let moduleInstance;
Object.defineProperty(global, "self", {
    writable: true
});
Object.defineProperty(global, "postMessage", {
    writable: true
});
Object.defineProperty(global, "window", {
    writable: true
});
Object.defineProperty(global, "document", {
    writable: true
});
global.self = global;
global.Module = {};
global.crypto = {
    subtle: {
        digest: (_, data) => {
            return Promise.resolve(crypto
                .createHash("sha256")
                .update(new DataView(data))
                .digest());
        }
    }
};
global.fetch = (filePath) => {
    return new Promise((resolve, reject) => {
        filePath = filePath.split("?")[0];
        // tslint:disable-next-line:non-literal-fs-path
        if (!fs.existsSync(filePath)) {
            reject(new Error(`File not found: ${filePath}`));
        }
        try {
            // tslint:disable-next-line:non-literal-fs-path
            resolve(new Response(fs.readFileSync(filePath)));
        }
        catch (error) {
            reject(error);
        }
    });
};
global.importScripts = (filePath) => {
    filePath = filePath.split("?")[0];
    // tslint:disable-next-line:non-literal-fs-path
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
    moduleInstance = global.Module;
    console.log(moduleInstance);
    setupSpyModuleFunctions(moduleInstance);
    return new Promise(resolve => {
        // Retrieve wasmJSVersion variable
        // tslint:disable-next-line:non-literal-fs-path
        const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
        readStream.on("readable", () => {
            let dataString = "";
            let character = readStream.read(1);
            while (character !== ";") {
                dataString += character;
                character = readStream.read(1);
            }
            readStream.destroy();
            const regexMatch = dataString.match(/"(.+)"/);
            if (regexMatch != null) {
                self.wasmJSVersion = regexMatch[1];
            }
            moduleInstance.instantiateWasm({ env: {} }, () => {
                moduleInstance.preRun();
                moduleInstance.onRuntimeInitialized();
                resolve();
            });
        });
    });
};
global.FS = {
    mkdir: sinon.spy(),
    mount: sinon.spy(),
    syncfs: (_, callback) => {
        callback(undefined);
    }
};
global.IDBFS = null;
global.WebAssembly.instantiate = global.WebAssembly.instantiateStreaming = () => {
    return Promise.resolve({
        module: "module",
        instance: "instance"
    });
};
global.OffscreenCanvas = () => {
    return;
};
const postMessageSpy = sinon.spy();
global.postMessage = postMessageSpy;
test.serial("engine load", async (t) => {
    let engineInstance = engine();
    // wrong paths
    const importScriptsSpy = sinon.spy(global, "importScripts");
    const originalSetTimeout = global.setTimeout;
    const setTimeoutStub = sinon.stub(global, "setTimeout").callsFake((...args) => {
        return originalSetTimeout(args[0], args[1] / 100);
    });
    // importScripts fails (js)
    await engineInstance.loadLibrary("fakeDeviceId", "./wrong-path/", "fakePath");
    t.is(importScriptsSpy.callCount, 5);
    // fetch fails (wasm)
    const fetchStub = sinon.stub(global, "fetch").rejects();
    importScriptsSpy.resetHistory();
    engineInstance = engine();
    engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    await wait(8000);
    t.is(importScriptsSpy.callCount, 1);
    t.is(fetchStub.callCount, 5);
    t.false(moduleInstance.callMain.called);
    fetchStub.restore();
    importScriptsSpy.restore();
    setTimeoutStub.restore();
    // instantiateStreaming fails, instantiate fails
    const instantiateStreamingStub = sinon.stub(global.WebAssembly, "instantiateStreaming").rejects();
    const instantiateStub = sinon.stub(global.WebAssembly, "instantiate").rejects();
    engineInstance = engine();
    engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    await wait(2000);
    t.true(instantiateStreamingStub.called);
    t.true(instantiateStub.called);
    t.false(moduleInstance.callMain.called);
    // instantiateStreaming fails, instantiate succeeds
    instantiateStub.restore();
    postMessageSpy.resetHistory();
    engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    t.true(moduleInstance.callMain.called);
    t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
    instantiateStreamingStub.restore();
    // instantiateStreaming doesn't exist, instantiate succeeds
    const instantiateStreamingFunction = global.WebAssembly.instantiateStreaming;
    global.WebAssembly.instantiateStreaming = null;
    postMessageSpy.resetHistory();
    engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    t.true(moduleInstance.callMain.called);
    t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
    global.WebAssembly.instantiateStreaming = instantiateStreamingFunction;
    // instantiateStreaming succeeds
    postMessageSpy.resetHistory();
    engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    t.true(moduleInstance.callMain.called);
    t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
    engineInstance.workOnScanQueue(); // Try to work on queue with non-ready engine
    t.is(postMessageSpy.callCount, 1);
    engineInstance.createContext("");
    t.is(postMessageSpy.callCount, 2);
    engineInstance.setSettings(JSON.stringify({})); // Try to set invalid settings
    engineInstance.workOnScanQueue(); // Try to work on queue with non-ready engine
    t.is(postMessageSpy.callCount, 2);
    engineInstance.clearSession(); // Try to clear non-existent session
    engineInstance.setImageSettings({
        width: 1,
        height: 1,
        format: ImageSettings.Format.RGBA_8U
    });
    engineInstance.setImageSettings({
        width: 1,
        height: 1,
        format: ImageSettings.Format.RGBA_8U
    }); // Set image settings again
    engineInstance.addScanWorkUnit({
        requestId: 0,
        data: new Uint8ClampedArray([0, 0, 0, 0]),
        highQualitySingleFrameMode: true
    }); // Add work unit to allow settings to be set
    engineInstance.setSettings(new ScanSettings().toJSONString());
    engineInstance.clearSession();
});
test.serial("engine load - CDN", async (t) => {
    const originalSetTimeout = global.setTimeout;
    const setTimeoutStub = sinon.stub(global, "setTimeout").callsFake((...args) => {
        return originalSetTimeout(args[0], args[1] / 100);
    });
    let engineInstance = engine();
    const importScriptsSpy = sinon.spy(global, "importScripts");
    await engineInstance.loadLibrary("fakeDeviceId", "https://cdn.jsdelivr.net/npm/scandit-sdk", "fakePath");
    t.is(importScriptsSpy.callCount, 5);
    t.regex(importScriptsSpy.lastCall.args[0], /https:\/\/cdn.jsdelivr.net\/npm\/scandit-sdk@([1-9]+\.[0-9]+\.[0-9]+|%VER%)\/build\/scandit-engine-sdk.min.js/);
    engineInstance = engine();
    // tslint:disable-next-line:no-http-string
    await engineInstance.loadLibrary("fakeDeviceId", "http://cdn.jsdelivr.net/npm/scandit-sdk@0.0.1", "fakePath");
    t.is(importScriptsSpy.callCount, 10);
    t.regex(importScriptsSpy.lastCall.args[0], /https:\/\/cdn.jsdelivr.net\/npm\/scandit-sdk@([1-9]+\.[0-9]+\.[0-9]+|%VER%)\/build\/scandit-engine-sdk.min.js/);
    engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "https://unpkg.com/scandit-sdk@4.0.0", "fakePath");
    t.is(importScriptsSpy.callCount, 15);
    t.regex(importScriptsSpy.lastCall.args[0], /https:\/\/unpkg.com\/scandit-sdk@([1-9]+\.[0-9]+\.[0-9]+|%VER%)\/build\/scandit-engine-sdk.min.js/);
    engineInstance = engine();
    // tslint:disable-next-line:no-http-string
    await engineInstance.loadLibrary("fakeDeviceId", "http://unpkg.com/scandit-sdk@0.0.1", "fakePath");
    t.is(importScriptsSpy.callCount, 20);
    t.regex(importScriptsSpy.lastCall.args[0], /https:\/\/unpkg.com\/scandit-sdk@([1-9]+\.[0-9]+\.[0-9]+|%VER%)\/build\/scandit-engine-sdk.min.js/);
    engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "./wrong-path/", "fakePath");
    t.is(importScriptsSpy.callCount, 25);
    t.regex(importScriptsSpy.lastCall.args[0], /^\.\/wrong-path\//);
    setTimeoutStub.restore();
    importScriptsSpy.restore();
});
test.serial("engine license features", async (t) => {
    postMessageSpy.resetHistory();
    const engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    t.true(moduleInstance.callMain.called);
    t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
    engineInstance.createContext("");
    t.is(postMessageSpy.callCount, 2);
    t.deepEqual(postMessageSpy.getCall(1).lastArg, [
        "license-features",
        {
            hiddenScanditLogoAllowed: true
        }
    ]);
});
test.serial("engine scan", async (t) => {
    function getWorkResult(requestId) {
        return [
            "work-result",
            {
                result: {
                    scanResult: []
                },
                requestId
            }
        ];
    }
    postMessageSpy.resetHistory();
    const engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    t.true(moduleInstance.callMain.called);
    t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
    engineInstance.createContext("");
    t.is(postMessageSpy.callCount, 2);
    engineInstance.addScanWorkUnit({
        requestId: 0,
        data: new Uint8ClampedArray([0, 0, 0, 0]),
        highQualitySingleFrameMode: true
    }); // Try to add work unit with non-ready engine
    t.is(postMessageSpy.callCount, 2);
    engineInstance.setSettings(new ScanSettings().toJSONString());
    engineInstance.setImageSettings({
        width: 1,
        height: 1,
        format: ImageSettings.Format.RGBA_8U
    });
    engineInstance.addScanWorkUnit({
        requestId: 1,
        data: new Uint8ClampedArray([0, 0, 0, 0]),
        highQualitySingleFrameMode: true
    });
    t.is(postMessageSpy.callCount, 4);
    t.deepEqual(postMessageSpy.getCall(2).lastArg, getWorkResult(0));
    t.deepEqual(postMessageSpy.getCall(3).lastArg, getWorkResult(1));
    engineInstance.setImageSettings({
        width: 1,
        height: 1,
        format: ImageSettings.Format.RGB_8U
    }); // Set image settings again
    engineInstance.addScanWorkUnit({
        requestId: 2,
        data: new Uint8ClampedArray([0, 0, 0]),
        highQualitySingleFrameMode: false
    });
    t.is(postMessageSpy.callCount, 5);
    t.deepEqual(postMessageSpy.getCall(4).lastArg, getWorkResult(2));
    engineInstance.setImageSettings({
        width: 1,
        height: 1,
        format: ImageSettings.Format.GRAY_8U
    }); // Set image settings again
    engineInstance.addScanWorkUnit({
        requestId: 3,
        data: new Uint8ClampedArray([0]),
        highQualitySingleFrameMode: false
    });
    t.is(postMessageSpy.callCount, 6);
    t.deepEqual(postMessageSpy.getCall(5).lastArg, getWorkResult(3));
});
test.serial("engine scan error", async (t) => {
    postMessageSpy.resetHistory();
    const engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    t.true(moduleInstance.callMain.called);
    t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
    engineInstance.createContext("");
    t.is(postMessageSpy.callCount, 2);
    engineInstance.setSettings(new ScanSettings().toJSONString());
    engineInstance.setImageSettings({
        width: 1,
        height: 1,
        format: ImageSettings.Format.GRAY_8U
    });
    engineInstance.addScanWorkUnit({
        requestId: 0,
        data: new Uint8ClampedArray([255]),
        highQualitySingleFrameMode: false
    });
    t.is(postMessageSpy.callCount, 3);
    t.deepEqual(postMessageSpy.getCall(2).lastArg, [
        "work-error",
        {
            error: {
                errorCode: 1,
                errorMessage: "Error."
            },
            requestId: 0
        }
    ]);
});
test.serial("engine parse", async (t) => {
    postMessageSpy.resetHistory();
    const engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    t.true(moduleInstance.callMain.called);
    t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
    engineInstance.addParseWorkUnit({
        requestId: 0,
        dataFormat: Parser.DataFormat.DLID,
        dataString: "test",
        options: JSON.stringify({})
    }); // Try to add work unit with non-ready engine
    t.is(postMessageSpy.callCount, 1);
    engineInstance.createContext("");
    t.is(postMessageSpy.callCount, 2);
    engineInstance.addParseWorkUnit({
        requestId: 1,
        dataFormat: Parser.DataFormat.GS1_AI,
        dataString: "test",
        options: JSON.stringify({})
    });
    t.is(postMessageSpy.callCount, 4);
    t.deepEqual(postMessageSpy.getCall(2).lastArg, [
        "parse-string-result",
        {
            result: {
                x: "y"
            },
            requestId: 0
        }
    ]);
    t.deepEqual(postMessageSpy.getCall(3).lastArg, [
        "parse-string-result",
        {
            result: {
                x: "y"
            },
            requestId: 1
        }
    ]);
    engineInstance.addParseWorkUnit({
        requestId: 2,
        dataFormat: Parser.DataFormat.HIBC,
        dataString: "test",
        options: JSON.stringify({})
    });
    engineInstance.addParseWorkUnit({
        requestId: 3,
        dataFormat: Parser.DataFormat.MRTD,
        dataString: "test",
        options: JSON.stringify({})
    });
    engineInstance.addParseWorkUnit({
        requestId: 4,
        dataFormat: Parser.DataFormat.SWISSQR,
        dataString: "test",
        options: JSON.stringify({})
    });
    t.is(postMessageSpy.callCount, 7);
});
test.serial("engine parse error", async (t) => {
    postMessageSpy.resetHistory();
    const engineInstance = engine();
    await engineInstance.loadLibrary("fakeDeviceId", "./build/", "fakePath");
    t.true(moduleInstance.callMain.called);
    t.is(postMessageSpy.calledOnceWithExactly(["status", "ready"]), true);
    engineInstance.createContext("");
    t.is(postMessageSpy.callCount, 2);
    engineInstance.addParseWorkUnit({
        requestId: 0,
        dataFormat: -1,
        dataString: "test",
        options: JSON.stringify({})
    });
    t.is(postMessageSpy.callCount, 3);
    t.deepEqual(postMessageSpy.getCall(2).lastArg, [
        "parse-string-error",
        {
            error: {
                errorCode: 1,
                errorMessage: "Error."
            },
            requestId: 0
        }
    ]);
});
//# sourceMappingURL=engineWorker.spec.js.map