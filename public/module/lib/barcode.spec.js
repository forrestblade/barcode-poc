/* tslint:disable:no-implicit-dependencies */
/**
 * Barcode tests
 */
import test from "ava";
import { Barcode } from "..";
test("createFromWASMResult", t => {
    const wasmResult = {
        symbology: Barcode.Symbology.QR,
        location: [[0, 0], [1, 0], [1, 1], [0, 1]],
        compositeFlag: Barcode.CompositeFlag.NONE,
        isGs1DataCarrier: false,
        encodingArray: []
    };
    wasmResult.rawData = new Uint8Array([]);
    t.deepEqual(Barcode.createFromWASMResult(wasmResult), {
        ...wasmResult,
        location: {
            topLeft: { x: 0, y: 0 },
            topRight: { x: 1, y: 0 },
            bottomRight: { x: 1, y: 1 },
            bottomLeft: { x: 0, y: 1 }
        },
        data: ""
    });
    wasmResult.rawData = new Uint8Array([97, 98, 99, 100]);
    t.deepEqual(Barcode.createFromWASMResult(wasmResult), {
        ...wasmResult,
        location: {
            topLeft: { x: 0, y: 0 },
            topRight: { x: 1, y: 0 },
            bottomRight: { x: 1, y: 1 },
            bottomLeft: { x: 0, y: 1 }
        },
        data: "abcd"
    });
    wasmResult.rawData = new Uint8Array([195, 164, 195, 182, 194, 181, 195, 159]);
    t.deepEqual(Barcode.createFromWASMResult(wasmResult), {
        ...wasmResult,
        location: {
            topLeft: { x: 0, y: 0 },
            topRight: { x: 1, y: 0 },
            bottomRight: { x: 1, y: 1 },
            bottomLeft: { x: 0, y: 1 }
        },
        data: "äöµß"
    });
    wasmResult.rawData = new Uint8Array([253, 254, 255]);
    t.deepEqual(Barcode.createFromWASMResult(wasmResult), {
        ...wasmResult,
        location: {
            topLeft: { x: 0, y: 0 },
            topRight: { x: 1, y: 0 },
            bottomRight: { x: 1, y: 1 },
            bottomLeft: { x: 0, y: 1 }
        },
        data: ""
    });
});
test("Symbology.toHumanizedName", t => {
    Object.values(Barcode.Symbology)
        .filter(s => {
        return typeof s === "string";
    })
        .forEach(symbology => {
        t.truthy(Barcode.Symbology.toHumanizedName(symbology));
        t.notDeepEqual(Barcode.Symbology.toHumanizedName(symbology), "Unknown");
    });
    t.deepEqual(Barcode.Symbology.toHumanizedName("i_dont_exist"), "Unknown");
});
test("Symbology.toJSONName", t => {
    Object.values(Barcode.Symbology)
        .filter(s => {
        return typeof s === "string";
    })
        .forEach(symbology => {
        t.truthy(Barcode.Symbology.toJSONName(symbology));
        t.notDeepEqual(Barcode.Symbology.toJSONName(symbology), "unknown");
    });
    t.deepEqual(Barcode.Symbology.toJSONName("i_dont_exist"), "unknown");
});
//# sourceMappingURL=barcode.spec.js.map