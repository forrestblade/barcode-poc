/* tslint:disable:no-implicit-dependencies */
/**
 * Index tests
 */
import test from "ava";
import * as ScanditSDK from ".";
// Set inside setupBrowserEnv.js
const baseUrl = "https://example.com/";
test.serial("configure", async (t) => {
    let error = await t.throwsAsync(ScanditSDK.configure(""));
    t.is(error.name, "UnsupportedBrowserError");
    ScanditSDK.BrowserHelper.checkBrowserCompatibility = () => {
        return {
            fullSupport: true,
            scannerSupport: true,
            missingFeatures: []
        };
    };
    error = await t.throwsAsync(ScanditSDK.configure(null));
    t.is(error.name, "NoLicenseKeyError");
    error = await t.throwsAsync(ScanditSDK.configure(""));
    t.is(error.name, "NoLicenseKeyError");
    error = await t.throwsAsync(ScanditSDK.configure(" "));
    t.is(error.name, "NoLicenseKeyError");
    await t.notThrowsAsync(ScanditSDK.configure("license_key"));
    t.is(ScanditSDK.userLicenseKey, "license_key");
    t.is(ScanditSDK.scanditEngineLocation, baseUrl);
    await t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "" }));
    t.is(ScanditSDK.scanditEngineLocation, baseUrl);
    await t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "/" }));
    t.is(ScanditSDK.scanditEngineLocation, baseUrl);
    await t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "test" }));
    t.is(ScanditSDK.scanditEngineLocation, `${baseUrl}test/`);
    await t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "https://example1.com" }));
    t.is(ScanditSDK.scanditEngineLocation, "https://example1.com/");
    await t.notThrowsAsync(ScanditSDK.configure("license_key", { engineLocation: "https://example2.com/" }));
    t.is(ScanditSDK.scanditEngineLocation, "https://example2.com/");
});
//# sourceMappingURL=index.spec.js.map