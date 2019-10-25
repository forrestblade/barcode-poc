/* tslint:disable:no-implicit-dependencies */
/**
 * ScanSettings tests
 */
import test from "ava";
import { Barcode, ScanSettings, SymbologySettings } from "..";
test("constructor", t => {
    let ss = new ScanSettings();
    t.deepEqual(ss.symbologySettings, new Map());
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({ enabledSymbologies: [Barcode.Symbology.QR] });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({ enabledSymbologies: new Set([Barcode.Symbology.QR]) });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR, codeDuplicateFilter: 10 });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR, maxNumberOfCodesPerFrame: 10 });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10
    });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 }
    });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 0.1, width: 0.5, x: 0.5, y: 0.5 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 },
        gpuAcceleration: false
    });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 0.1, width: 0.5, x: 0.5, y: 0.5 });
    t.deepEqual(ss.gpuAcceleration, false);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 },
        gpuAcceleration: false,
        blurryRecognition: false
    });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 10);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 10);
    t.deepEqual(ss.getSearchArea(), { height: 0.1, width: 0.5, x: 0.5, y: 0.5 });
    t.deepEqual(ss.gpuAcceleration, false);
    t.deepEqual(ss.blurryRecognition, false);
});
test("constructor (strings)", t => {
    let ss = new ScanSettings();
    t.deepEqual(ss.symbologySettings, new Map());
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({ enabledSymbologies: "qr" });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({ enabledSymbologies: ["qr"] });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    ss = new ScanSettings({ enabledSymbologies: new Set(["qr"]) });
    t.deepEqual(ss.symbologySettings, new Map([[Barcode.Symbology.QR, new SymbologySettings({ enabled: true })]]));
    t.deepEqual(ss.codeDuplicateFilter, 0);
    t.deepEqual(ss.maxNumberOfCodesPerFrame, 1);
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.gpuAcceleration, true);
    t.deepEqual(ss.blurryRecognition, true);
    t.throws(() => {
        return new ScanSettings({ enabledSymbologies: "i_dont_exist" });
    }, TypeError, "i_dont_exist");
    t.throws(() => {
        return new ScanSettings({ enabledSymbologies: Array.from(["i_dont_exist"]) });
    }, TypeError, "i_dont_exist");
    t.throws(() => {
        return new ScanSettings({ enabledSymbologies: new Set(["i_dont_exist"]) });
    }, TypeError, "i_dont_exist");
});
test("getSymbologySettings", t => {
    let ss = new ScanSettings();
    t.deepEqual(ss.getSymbologySettings(Barcode.Symbology.QR), new SymbologySettings());
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR });
    t.deepEqual(ss.getSymbologySettings(Barcode.Symbology.QR), new SymbologySettings({ enabled: true }));
    ss = new ScanSettings();
    ss.getSymbologySettings(Barcode.Symbology.QR).setColorInvertedEnabled(true);
    t.deepEqual(ss.getSymbologySettings(Barcode.Symbology.QR), new SymbologySettings({ colorInvertedEnabled: true }));
});
test("getSymbologySettings (strings)", t => {
    let ss = new ScanSettings();
    t.throws(() => {
        ss.getSymbologySettings("i_dont_exist");
    }, TypeError, "i_dont_exist");
    t.deepEqual(ss.getSymbologySettings("qr"), new SymbologySettings());
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR });
    t.deepEqual(ss.getSymbologySettings("qr"), new SymbologySettings({ enabled: true }));
    ss = new ScanSettings();
    ss.getSymbologySettings(Barcode.Symbology.QR).setColorInvertedEnabled(true);
    t.deepEqual(ss.getSymbologySettings("qr"), new SymbologySettings({ colorInvertedEnabled: true }));
});
test("isSymbologyEnabled & enableSymbologies & disableSymbologies", t => {
    let ss = new ScanSettings();
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR });
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    // Set
    ss = new ScanSettings();
    ss.enableSymbologies(new Set([Barcode.Symbology.QR]));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.enableSymbologies(new Set([Barcode.Symbology.CODE128, Barcode.Symbology.EAN13]));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies(new Set([Barcode.Symbology.QR]));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies(new Set([Barcode.Symbology.CODE128, Barcode.Symbology.EAN13]));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    // Array
    ss = new ScanSettings();
    ss.enableSymbologies([Barcode.Symbology.QR]);
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.enableSymbologies([Barcode.Symbology.CODE128, Barcode.Symbology.EAN13]);
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies([Barcode.Symbology.QR]);
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies([Barcode.Symbology.CODE128, Barcode.Symbology.EAN13]);
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    // Single
    ss = new ScanSettings();
    ss.enableSymbologies(Barcode.Symbology.QR);
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.enableSymbologies(Barcode.Symbology.CODE128);
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies(Barcode.Symbology.QR);
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies(Barcode.Symbology.CODE128);
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
});
test("isSymbologyEnabled & enableSymbologies & disableSymbologies (strings)", t => {
    let ss = new ScanSettings();
    t.false(ss.isSymbologyEnabled("qr"));
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR });
    t.true(ss.isSymbologyEnabled("qr"));
    ss = new ScanSettings();
    t.throws(() => {
        ss.enableSymbologies("i_dont_exist");
    }, TypeError, "i_dont_exist");
    t.deepEqual(ss.symbologySettings, new Map());
    t.throws(() => {
        ss.enableSymbologies(Array.from(["i_dont_exist"]));
    }, TypeError, "i_dont_exist");
    t.deepEqual(ss.symbologySettings, new Map());
    t.throws(() => {
        ss.enableSymbologies(new Set(["i_dont_exist"]));
    }, TypeError, "i_dont_exist");
    t.deepEqual(ss.symbologySettings, new Map());
    // Set
    ss = new ScanSettings();
    ss.enableSymbologies(new Set(["qr"]));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.enableSymbologies(new Set(["code128", "ean13"]));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies(new Set(["qr"]));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies(new Set(["code128", "ean13"]));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    // Array
    ss = new ScanSettings();
    ss.enableSymbologies(["qr"]);
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.enableSymbologies(["code128", "ean13"]);
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies(["qr"]);
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies(["code128", "ean13"]);
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.EAN13));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    // Single
    ss = new ScanSettings();
    ss.enableSymbologies("qr");
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.enableSymbologies("code128");
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies("qr");
    t.true(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
    ss.disableSymbologies("code128");
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.CODE128));
    t.false(ss.isSymbologyEnabled(Barcode.Symbology.QR));
});
test("getCodeDuplicateFilter & setCodeDuplicateFilter", t => {
    const ss = new ScanSettings();
    t.deepEqual(ss.getCodeDuplicateFilter(), 0);
    ss.setCodeDuplicateFilter(100);
    t.deepEqual(ss.getCodeDuplicateFilter(), 100);
});
test("getMaxNumberOfCodesPerFrame & setMaxNumberOfCodesPerFrame", t => {
    const ss = new ScanSettings();
    t.deepEqual(ss.getMaxNumberOfCodesPerFrame(), 1);
    ss.setMaxNumberOfCodesPerFrame(10);
    t.deepEqual(ss.getMaxNumberOfCodesPerFrame(), 10);
});
test("getSearchArea & setSearchArea", t => {
    const ss = new ScanSettings();
    t.deepEqual(ss.getSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    ss.setSearchArea({ x: 0.5, y: 0.5, width: 0.5, height: 0.1 });
    t.deepEqual(ss.getSearchArea(), { height: 0.1, width: 0.5, x: 0.5, y: 0.5 });
});
test("isGpuAccelerationEnabled & setGpuAccelerationEnabled", t => {
    const ss = new ScanSettings();
    t.deepEqual(ss.isGpuAccelerationEnabled(), true);
    ss.setGpuAccelerationEnabled(false);
    t.deepEqual(ss.isGpuAccelerationEnabled(), false);
    ss.setGpuAccelerationEnabled(true);
    t.deepEqual(ss.isGpuAccelerationEnabled(), true);
});
test("isBlurryRecognitionEnabled & setBlurryRecognitionEnabled", t => {
    const ss = new ScanSettings();
    t.deepEqual(ss.isBlurryRecognitionEnabled(), true);
    ss.setBlurryRecognitionEnabled(false);
    t.deepEqual(ss.isBlurryRecognitionEnabled(), false);
    ss.setBlurryRecognitionEnabled(true);
    t.deepEqual(ss.isBlurryRecognitionEnabled(), true);
});
// tslint:disable-next-line:max-func-body-length
test("toJSONString", t => {
    let ss = new ScanSettings();
    const baseJSONScanSettings = {
        symbologies: {},
        codeDuplicateFilter: 0,
        maxNumberOfCodesPerFrame: 1,
        searchArea: ss.getSearchArea(),
        gpuAcceleration: true,
        blurryRecognition: true
    };
    t.deepEqual(ss.toJSONString(), JSON.stringify(baseJSONScanSettings));
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        ...baseJSONScanSettings,
        symbologies: { [Barcode.Symbology.QR]: new SymbologySettings({ enabled: true }) }
    }));
    ss = new ScanSettings({ enabledSymbologies: [Barcode.Symbology.QR] });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        ...baseJSONScanSettings,
        symbologies: { [Barcode.Symbology.QR]: new SymbologySettings({ enabled: true }) }
    }));
    ss = new ScanSettings({ enabledSymbologies: new Set([Barcode.Symbology.QR]) });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        ...baseJSONScanSettings,
        symbologies: { [Barcode.Symbology.QR]: new SymbologySettings({ enabled: true }) }
    }));
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR, codeDuplicateFilter: 10 });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        ...baseJSONScanSettings,
        symbologies: { [Barcode.Symbology.QR]: new SymbologySettings({ enabled: true }) },
        codeDuplicateFilter: 10
    }));
    ss = new ScanSettings({ enabledSymbologies: Barcode.Symbology.QR, maxNumberOfCodesPerFrame: 10 });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        ...baseJSONScanSettings,
        symbologies: { [Barcode.Symbology.QR]: new SymbologySettings({ enabled: true }) },
        maxNumberOfCodesPerFrame: 10
    }));
    ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10
    });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        ...baseJSONScanSettings,
        symbologies: { [Barcode.Symbology.QR]: new SymbologySettings({ enabled: true }) },
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10
    }));
    ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        gpuAcceleration: false,
        blurryRecognition: true
    });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        ...baseJSONScanSettings,
        symbologies: { [Barcode.Symbology.QR]: new SymbologySettings({ enabled: true }) },
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        gpuAcceleration: false,
        blurryRecognition: true
    }));
    ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        gpuAcceleration: false,
        blurryRecognition: false
    });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        ...baseJSONScanSettings,
        symbologies: { [Barcode.Symbology.QR]: new SymbologySettings({ enabled: true }) },
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        gpuAcceleration: false,
        blurryRecognition: false
    }));
    ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 },
        gpuAcceleration: false,
        blurryRecognition: false
    });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        symbologies: { [Barcode.Symbology.QR]: new SymbologySettings({ enabled: true }) },
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: ss.getSearchArea(),
        codeLocation1d: {
            area: {
                x: ss.getSearchArea().x,
                y: ss.getSearchArea().y + (ss.getSearchArea().height * 0.75) / 2,
                width: ss.getSearchArea().width,
                height: ss.getSearchArea().height * 0.25
            }
        },
        codeLocation2d: { area: ss.getSearchArea() },
        gpuAcceleration: false,
        blurryRecognition: false
    }));
});
test("getBaseSearchArea & setBaseSearchArea", t => {
    const ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.AZTEC,
        codeDuplicateFilter: 5,
        maxNumberOfCodesPerFrame: 5,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 }
    });
    t.deepEqual(ss.getBaseSearchArea(), { height: 1, width: 1, x: 0, y: 0 });
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        symbologies: { [Barcode.Symbology.AZTEC]: new SymbologySettings({ enabled: true }) },
        codeDuplicateFilter: 5,
        maxNumberOfCodesPerFrame: 5,
        searchArea: ss.getSearchArea(),
        codeLocation1d: {
            area: {
                x: ss.getSearchArea().x,
                y: ss.getSearchArea().y + (ss.getSearchArea().height * 0.75) / 2,
                width: ss.getSearchArea().width,
                height: ss.getSearchArea().height * 0.25
            }
        },
        codeLocation2d: { area: ss.getSearchArea() },
        gpuAcceleration: true,
        blurryRecognition: true
    }));
    ss.setBaseSearchArea({ x: 0.5, y: 0.5, width: 0.5, height: 0.1 });
    const baseSearchArea = ss.getBaseSearchArea();
    const searchArea = ss.getSearchArea();
    t.deepEqual(baseSearchArea, { x: 0.5, y: 0.5, width: 0.5, height: 0.1 });
    const combinedSearchArea = {
        x: baseSearchArea.x + searchArea.x * baseSearchArea.width,
        y: baseSearchArea.y + searchArea.y * baseSearchArea.height,
        width: baseSearchArea.width * searchArea.width,
        height: baseSearchArea.height * searchArea.height
    };
    t.deepEqual(ss.toJSONString(), JSON.stringify({
        symbologies: { [Barcode.Symbology.AZTEC]: new SymbologySettings({ enabled: true }) },
        codeDuplicateFilter: 5,
        maxNumberOfCodesPerFrame: 5,
        searchArea: combinedSearchArea,
        codeLocation1d: {
            area: {
                x: combinedSearchArea.x,
                y: combinedSearchArea.y + (combinedSearchArea.height * 0.75) / 2,
                width: combinedSearchArea.width,
                height: combinedSearchArea.height * 0.25
            }
        },
        codeLocation2d: { area: combinedSearchArea },
        gpuAcceleration: true,
        blurryRecognition: true
    }));
});
//# sourceMappingURL=scanSettings.spec.js.map