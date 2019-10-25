"use strict";
/* tslint:disable:no-implicit-dependencies */
/**
 * Barcode tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = tslib_1.__importDefault(require("ava"));
var __1 = require("..");
ava_1.default("createFromWASMResult", function (t) {
    var wasmResult = {
        symbology: __1.Barcode.Symbology.QR,
        location: [[0, 0], [1, 0], [1, 1], [0, 1]],
        compositeFlag: __1.Barcode.CompositeFlag.NONE,
        isGs1DataCarrier: false,
        encodingArray: []
    };
    wasmResult.rawData = new Uint8Array([]);
    t.deepEqual(__1.Barcode.createFromWASMResult(wasmResult), tslib_1.__assign({}, wasmResult, { location: {
            topLeft: { x: 0, y: 0 },
            topRight: { x: 1, y: 0 },
            bottomRight: { x: 1, y: 1 },
            bottomLeft: { x: 0, y: 1 }
        }, data: "" }));
    wasmResult.rawData = new Uint8Array([97, 98, 99, 100]);
    t.deepEqual(__1.Barcode.createFromWASMResult(wasmResult), tslib_1.__assign({}, wasmResult, { location: {
            topLeft: { x: 0, y: 0 },
            topRight: { x: 1, y: 0 },
            bottomRight: { x: 1, y: 1 },
            bottomLeft: { x: 0, y: 1 }
        }, data: "abcd" }));
    wasmResult.rawData = new Uint8Array([195, 164, 195, 182, 194, 181, 195, 159]);
    t.deepEqual(__1.Barcode.createFromWASMResult(wasmResult), tslib_1.__assign({}, wasmResult, { location: {
            topLeft: { x: 0, y: 0 },
            topRight: { x: 1, y: 0 },
            bottomRight: { x: 1, y: 1 },
            bottomLeft: { x: 0, y: 1 }
        }, data: "äöµß" }));
    wasmResult.rawData = new Uint8Array([253, 254, 255]);
    t.deepEqual(__1.Barcode.createFromWASMResult(wasmResult), tslib_1.__assign({}, wasmResult, { location: {
            topLeft: { x: 0, y: 0 },
            topRight: { x: 1, y: 0 },
            bottomRight: { x: 1, y: 1 },
            bottomLeft: { x: 0, y: 1 }
        }, data: "" }));
});
ava_1.default("Symbology.toHumanizedName", function (t) {
    Object.values(__1.Barcode.Symbology)
        .filter(function (s) {
        return typeof s === "string";
    })
        .forEach(function (symbology) {
        t.truthy(__1.Barcode.Symbology.toHumanizedName(symbology));
        t.notDeepEqual(__1.Barcode.Symbology.toHumanizedName(symbology), "Unknown");
    });
    t.deepEqual(__1.Barcode.Symbology.toHumanizedName("i_dont_exist"), "Unknown");
});
ava_1.default("Symbology.toJSONName", function (t) {
    Object.values(__1.Barcode.Symbology)
        .filter(function (s) {
        return typeof s === "string";
    })
        .forEach(function (symbology) {
        t.truthy(__1.Barcode.Symbology.toJSONName(symbology));
        t.notDeepEqual(__1.Barcode.Symbology.toJSONName(symbology), "unknown");
    });
    t.deepEqual(__1.Barcode.Symbology.toJSONName("i_dont_exist"), "unknown");
});
//# sourceMappingURL=barcode.spec.js.map