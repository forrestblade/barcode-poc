/* tslint:disable:no-implicit-dependencies */
/**
 * Parser tests
 */
import test from "ava";
import * as sinon from "sinon";
import { BrowserHelper, configure, Parser, Scanner } from "..";
global.Worker = sinon.stub().returns({
    postMessage: sinon.stub(),
    terminate: sinon.stub()
});
URL.createObjectURL = sinon.stub();
async function prepareBrowserAndLibrary() {
    BrowserHelper.checkBrowserCompatibility = () => {
        return {
            fullSupport: true,
            scannerSupport: true,
            missingFeatures: []
        };
    };
    await configure("license_key");
}
test("constructor", async (t) => {
    await prepareBrowserAndLibrary();
    const s = new Scanner();
    const p = new Parser(s, Parser.DataFormat.DLID);
    t.is(p.scanner, s);
    t.is(p.dataFormat, Parser.DataFormat.DLID);
    t.is(p.options, undefined);
});
test("setOptions", async (t) => {
    await prepareBrowserAndLibrary();
    const s = new Scanner();
    const p = new Parser(s, Parser.DataFormat.DLID);
    t.is(p.options, undefined);
    p.setOptions({});
    t.deepEqual(p.options, {});
    p.setOptions({
        option1: true
    });
    t.deepEqual(p.options, {
        option1: true
    });
});
test("parseString", async (t) => {
    await prepareBrowserAndLibrary();
    const s = new Scanner();
    const p = new Parser(s, Parser.DataFormat.DLID);
    const parseStringSpy = sinon.spy(s, "parseString");
    p.parseString("");
    t.is(parseStringSpy.callCount, 1);
    t.deepEqual(parseStringSpy.getCall(0).args, [Parser.DataFormat.DLID, "", undefined]);
    p.parseString("abcd");
    t.is(parseStringSpy.callCount, 2);
    t.deepEqual(parseStringSpy.getCall(1).args, [Parser.DataFormat.DLID, "abcd", undefined]);
    p.setOptions({
        option1: true
    });
    p.parseString("abcd");
    t.is(parseStringSpy.callCount, 3);
    t.deepEqual(parseStringSpy.getCall(2).args, [
        Parser.DataFormat.DLID,
        "abcd",
        {
            option1: true
        }
    ]);
});
test("parseRawData", async (t) => {
    await prepareBrowserAndLibrary();
    const s = new Scanner();
    const p = new Parser(s, Parser.DataFormat.DLID);
    const parseStringSpy = sinon.spy(s, "parseString");
    p.parseRawData(new Uint8Array([]));
    t.is(parseStringSpy.callCount, 1);
    t.deepEqual(parseStringSpy.getCall(0).args, [Parser.DataFormat.DLID, "", undefined]);
    p.parseRawData(new Uint8Array([97, 98, 99, 100]));
    t.is(parseStringSpy.callCount, 2);
    t.deepEqual(parseStringSpy.getCall(1).args, [Parser.DataFormat.DLID, "abcd", undefined]);
    p.setOptions({
        option1: true
    });
    p.parseRawData(new Uint8Array([97, 98, 99, 100]));
    t.is(parseStringSpy.callCount, 3);
    t.deepEqual(parseStringSpy.getCall(2).args, [
        Parser.DataFormat.DLID,
        "abcd",
        {
            option1: true
        }
    ]);
    p.setOptions();
    p.parseRawData(new Uint8Array([255]));
    t.is(parseStringSpy.callCount, 4);
    t.deepEqual(parseStringSpy.getCall(3).args, [Parser.DataFormat.DLID, "", undefined]);
    p.parseRawData(new Uint8Array([97, 98, 99, 100, 128]));
    t.is(parseStringSpy.callCount, 5);
    t.deepEqual(parseStringSpy.getCall(4).args, [Parser.DataFormat.DLID, "", undefined]);
    p.parseRawData(new Uint8Array([1, 2, 9, 32, 13, 10]));
    t.is(parseStringSpy.callCount, 6);
    t.deepEqual(parseStringSpy.getCall(5).args, [Parser.DataFormat.DLID, "\u{1}\u{2}\t \r\n", undefined]);
});
//# sourceMappingURL=parser.spec.js.map