"use strict";
/* tslint:disable:no-implicit-dependencies */
/**
 * SymbologySettings tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = tslib_1.__importDefault(require("ava"));
var __1 = require("..");
function setsEqual(t, firstSet, secondSet) {
    var e_1, _a;
    if (firstSet.size !== secondSet.size) {
        return t.fail("Different set sizes");
    }
    try {
        for (var firstSet_1 = tslib_1.__values(firstSet), firstSet_1_1 = firstSet_1.next(); !firstSet_1_1.done; firstSet_1_1 = firstSet_1.next()) {
            var x = firstSet_1_1.value;
            if (!secondSet.has(x)) {
                return t.fail("Different set contents");
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (firstSet_1_1 && !firstSet_1_1.done && (_a = firstSet_1.return)) _a.call(firstSet_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return t.pass();
}
ava_1.default("constructor", function (t) {
    var ss = new __1.SymbologySettings();
    t.false(ss.enabled);
    t.false(ss.colorInvertedEnabled);
    t.deepEqual(ss.activeSymbolCounts.length, 0);
    t.deepEqual(ss.extensions.size, 0);
    t.deepEqual(ss.checksums.size, 0);
    ss = new __1.SymbologySettings({});
    t.false(ss.enabled);
    t.false(ss.colorInvertedEnabled);
    t.deepEqual(ss.activeSymbolCounts.length, 0);
    t.deepEqual(ss.extensions.size, 0);
    t.deepEqual(ss.checksums.size, 0);
    ss = new __1.SymbologySettings({ enabled: true });
    t.true(ss.enabled);
    ss = new __1.SymbologySettings({ colorInvertedEnabled: true });
    t.true(ss.colorInvertedEnabled);
    ss = new __1.SymbologySettings({
        activeSymbolCounts: [8, 9, 10]
    });
    t.deepEqual(ss.activeSymbolCounts, [8, 9, 10]);
    ss = new __1.SymbologySettings({
        extensions: new Set([__1.SymbologySettings.Extension.FULL_ASCII])
    });
    setsEqual(t, ss.extensions, new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss = new __1.SymbologySettings({
        extensions: [__1.SymbologySettings.Extension.FULL_ASCII]
    });
    setsEqual(t, ss.extensions, new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss = new __1.SymbologySettings({
        checksums: new Set([__1.SymbologySettings.Checksum.MOD_10])
    });
    setsEqual(t, ss.checksums, new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss = new __1.SymbologySettings({
        checksums: [__1.SymbologySettings.Checksum.MOD_10]
    });
    setsEqual(t, ss.checksums, new Set([__1.SymbologySettings.Checksum.MOD_10]));
});
ava_1.default("constructor (strings)", function (t) {
    var ss = new __1.SymbologySettings({
        extensions: new Set(["full_ascii"])
    });
    setsEqual(t, ss.extensions, new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss = new __1.SymbologySettings({
        extensions: ["full_ascii"]
    });
    setsEqual(t, ss.extensions, new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss = new __1.SymbologySettings({
        checksums: new Set(["mod10"])
    });
    setsEqual(t, ss.checksums, new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss = new __1.SymbologySettings({
        checksums: ["mod10"]
    });
    setsEqual(t, ss.checksums, new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss = new __1.SymbologySettings({
        extensions: new Set(["i_dont_exist"]),
        checksums: new Set(["i_dont_exist"])
    });
    t.deepEqual(ss.extensions.size, 0);
    t.deepEqual(ss.checksums.size, 0);
    ss = new __1.SymbologySettings({
        extensions: Array.from(["i_dont_exist"]),
        checksums: Array.from(["i_dont_exist"])
    });
    t.deepEqual(ss.extensions.size, 0);
    t.deepEqual(ss.checksums.size, 0);
});
ava_1.default("isEnabled & setEnabled", function (t) {
    var ss = new __1.SymbologySettings();
    t.false(ss.isEnabled());
    ss.setEnabled(false);
    t.false(ss.isEnabled());
    ss.setEnabled(true);
    t.true(ss.isEnabled());
    ss.setEnabled(true);
    t.true(ss.isEnabled());
    ss.setEnabled(false);
    t.false(ss.isEnabled());
});
ava_1.default("isColorInvertedEnabled & setColorInvertedEnabled", function (t) {
    var ss = new __1.SymbologySettings();
    t.false(ss.isColorInvertedEnabled());
    ss.setColorInvertedEnabled(false);
    t.false(ss.isColorInvertedEnabled());
    ss.setColorInvertedEnabled(true);
    t.true(ss.isColorInvertedEnabled());
    ss.setColorInvertedEnabled(true);
    t.true(ss.isColorInvertedEnabled());
    ss.setColorInvertedEnabled(false);
    t.false(ss.isColorInvertedEnabled());
});
ava_1.default("getActiveSymbolCounts & setActiveSymbolCounts", function (t) {
    var ss = new __1.SymbologySettings();
    t.deepEqual(ss.getActiveSymbolCounts(), []);
    ss.setActiveSymbolCounts([]);
    t.deepEqual(ss.getActiveSymbolCounts(), []);
    ss.setActiveSymbolCounts([1]);
    t.deepEqual(ss.getActiveSymbolCounts(), [1]);
    ss.setActiveSymbolCounts([1, 2, 3]);
    t.deepEqual(ss.getActiveSymbolCounts(), [1, 2, 3]);
});
ava_1.default("setActiveSymbolCountsRange", function (t) {
    var ss = new __1.SymbologySettings();
    ss.setActiveSymbolCountsRange(1, 2);
    t.deepEqual(ss.getActiveSymbolCounts(), [1, 2]);
    ss.setActiveSymbolCountsRange(1, 3);
    t.deepEqual(ss.getActiveSymbolCounts(), [1, 2, 3]);
    ss.setActiveSymbolCountsRange(10, 16);
    t.deepEqual(ss.getActiveSymbolCounts(), [10, 11, 12, 13, 14, 15, 16]);
    ss.setActiveSymbolCountsRange(1, 1);
    t.deepEqual(ss.getActiveSymbolCounts(), [1]);
    ss.setActiveSymbolCountsRange(1, 0);
    t.deepEqual(ss.getActiveSymbolCounts(), []);
});
ava_1.default("getEnabledExtensions & enableExtensions & disableExtensions", function (t) {
    var ss = new __1.SymbologySettings();
    ss.disableExtensions(__1.SymbologySettings.Extension.FULL_ASCII);
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.disableExtensions([__1.SymbologySettings.Extension.FULL_ASCII]);
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.disableExtensions(new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    // Set
    ss.enableExtensions(new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss.enableExtensions(new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss.enableExtensions(new Set([__1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    ss.disableExtensions(new Set([__1.SymbologySettings.Extension.RELAXED_SHARP_QUIET_ZONE_CHECK]));
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    ss.disableExtensions(new Set([__1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss.disableExtensions(new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.enableExtensions(new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    ss.disableExtensions(new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    // Array
    ss.enableExtensions([__1.SymbologySettings.Extension.FULL_ASCII]);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss.enableExtensions([__1.SymbologySettings.Extension.FULL_ASCII]);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss.enableExtensions([__1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    ss.disableExtensions([__1.SymbologySettings.Extension.RELAXED_SHARP_QUIET_ZONE_CHECK]);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    ss.disableExtensions([__1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss.disableExtensions([__1.SymbologySettings.Extension.FULL_ASCII]);
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.enableExtensions([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    ss.disableExtensions([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]);
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    // Single
    ss.enableExtensions(__1.SymbologySettings.Extension.FULL_ASCII);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss.enableExtensions(__1.SymbologySettings.Extension.FULL_ASCII);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss.enableExtensions(__1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    ss.disableExtensions(__1.SymbologySettings.Extension.RELAXED_SHARP_QUIET_ZONE_CHECK);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII, __1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE]));
    ss.disableExtensions(__1.SymbologySettings.Extension.DIRECT_PART_MARKING_MODE);
    setsEqual(t, ss.getEnabledExtensions(), new Set([__1.SymbologySettings.Extension.FULL_ASCII]));
    ss.disableExtensions(__1.SymbologySettings.Extension.FULL_ASCII);
    setsEqual(t, ss.getEnabledExtensions(), new Set());
});
ava_1.default("getEnabledExtensions & enableExtensions & disableExtensions (strings)", function (t) {
    var ss = new __1.SymbologySettings();
    ss.disableExtensions("full_ascii");
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.disableExtensions(["full_ascii"]);
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.disableExtensions(new Set(["full_ascii"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.enableExtensions("i_dont_exist");
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.enableExtensions(Array.from(["i_dont_exist"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.enableExtensions(new Set(["i_dont_exist"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    // Set
    ss.enableExtensions(new Set(["full_ascii"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii"]));
    ss.enableExtensions(new Set(["full_ascii"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii"]));
    ss.enableExtensions(new Set(["direct_part_marking_mode"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii", "direct_part_marking_mode"]));
    ss.disableExtensions(new Set(["relaxed_sharp_quiet_zone_check"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii", "direct_part_marking_mode"]));
    ss.disableExtensions(new Set(["direct_part_marking_mode"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii"]));
    ss.disableExtensions(new Set(["full_ascii"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.enableExtensions(new Set(["full_ascii", "direct_part_marking_mode"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii", "direct_part_marking_mode"]));
    ss.disableExtensions(new Set(["full_ascii", "direct_part_marking_mode"]));
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    // Array
    ss.enableExtensions(["full_ascii"]);
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii"]));
    ss.enableExtensions(["full_ascii"]);
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii"]));
    ss.enableExtensions(["direct_part_marking_mode"]);
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii", "direct_part_marking_mode"]));
    ss.disableExtensions(["relaxed_sharp_quiet_zone_check"]);
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii", "direct_part_marking_mode"]));
    ss.disableExtensions(["direct_part_marking_mode"]);
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii"]));
    ss.disableExtensions(["full_ascii"]);
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    ss.enableExtensions(["full_ascii", "direct_part_marking_mode"]);
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii", "direct_part_marking_mode"]));
    ss.disableExtensions(["full_ascii", "direct_part_marking_mode"]);
    setsEqual(t, ss.getEnabledExtensions(), new Set());
    // Single
    ss.enableExtensions("full_ascii");
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii"]));
    ss.enableExtensions("full_ascii");
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii"]));
    ss.enableExtensions("direct_part_marking_mode");
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii", "direct_part_marking_mode"]));
    ss.disableExtensions("relaxed_sharp_quiet_zone_check");
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii", "direct_part_marking_mode"]));
    ss.disableExtensions("direct_part_marking_mode");
    setsEqual(t, ss.getEnabledExtensions(), new Set(["full_ascii"]));
    ss.disableExtensions("full_ascii");
    setsEqual(t, ss.getEnabledExtensions(), new Set());
});
ava_1.default("getEnabledChecksums & enableChecksums & disableChecksums", function (t) {
    var ss = new __1.SymbologySettings();
    ss.disableChecksums(__1.SymbologySettings.Checksum.MOD_10);
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.disableChecksums([__1.SymbologySettings.Checksum.MOD_10]);
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.disableChecksums(new Set([__1.SymbologySettings.Checksum.MOD_10]));
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    // Set
    ss.enableChecksums(new Set([__1.SymbologySettings.Checksum.MOD_10]));
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss.enableChecksums(new Set([__1.SymbologySettings.Checksum.MOD_10]));
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss.enableChecksums(new Set([__1.SymbologySettings.Checksum.MOD_43]));
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    ss.disableChecksums(new Set([__1.SymbologySettings.Checksum.MOD_16]));
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    ss.disableChecksums(new Set([__1.SymbologySettings.Checksum.MOD_43]));
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss.disableChecksums(new Set([__1.SymbologySettings.Checksum.MOD_10]));
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.enableChecksums(new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    ss.disableChecksums(new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    // Array
    ss.enableChecksums([__1.SymbologySettings.Checksum.MOD_10]);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss.enableChecksums([__1.SymbologySettings.Checksum.MOD_10]);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss.enableChecksums([__1.SymbologySettings.Checksum.MOD_43]);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    ss.disableChecksums([__1.SymbologySettings.Checksum.MOD_16]);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    ss.disableChecksums([__1.SymbologySettings.Checksum.MOD_43]);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss.disableChecksums([__1.SymbologySettings.Checksum.MOD_10]);
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.enableChecksums([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    ss.disableChecksums([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]);
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    // Single
    ss.enableChecksums(__1.SymbologySettings.Checksum.MOD_10);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss.enableChecksums(__1.SymbologySettings.Checksum.MOD_10);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss.enableChecksums(__1.SymbologySettings.Checksum.MOD_43);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    ss.disableChecksums(__1.SymbologySettings.Checksum.MOD_16);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10, __1.SymbologySettings.Checksum.MOD_43]));
    ss.disableChecksums(__1.SymbologySettings.Checksum.MOD_43);
    setsEqual(t, ss.getEnabledChecksums(), new Set([__1.SymbologySettings.Checksum.MOD_10]));
    ss.disableChecksums(__1.SymbologySettings.Checksum.MOD_10);
    setsEqual(t, ss.getEnabledChecksums(), new Set());
});
ava_1.default("getEnabledChecksums & enableChecksums & disableChecksums (strings)", function (t) {
    var ss = new __1.SymbologySettings();
    ss.disableChecksums("mod10");
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.disableChecksums(["mod10"]);
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.disableChecksums(new Set(["mod10"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.enableChecksums("i_dont_exist");
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.enableChecksums(Array.from(["i_dont_exist"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.enableChecksums(new Set(["i_dont_exist"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    // Set
    ss.enableChecksums(new Set(["mod10"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10"]));
    ss.enableChecksums(new Set(["mod10"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10"]));
    ss.enableChecksums(new Set(["mod43"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10", "mod43"]));
    ss.disableChecksums(new Set(["mod16"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10", "mod43"]));
    ss.disableChecksums(new Set(["mod43"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10"]));
    ss.disableChecksums(new Set(["mod10"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.enableChecksums(new Set(["mod10", "mod43"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10", "mod43"]));
    ss.disableChecksums(new Set(["mod10", "mod43"]));
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    // Array
    ss.enableChecksums(["mod10"]);
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10"]));
    ss.enableChecksums(["mod10"]);
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10"]));
    ss.enableChecksums(["mod43"]);
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10", "mod43"]));
    ss.disableChecksums(["mod16"]);
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10", "mod43"]));
    ss.disableChecksums(["mod43"]);
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10"]));
    ss.disableChecksums(["mod10"]);
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    ss.enableChecksums(["mod10", "mod43"]);
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10", "mod43"]));
    ss.disableChecksums(["mod10", "mod43"]);
    setsEqual(t, ss.getEnabledChecksums(), new Set());
    // Single
    ss.enableChecksums("mod10");
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10"]));
    ss.enableChecksums("mod10");
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10"]));
    ss.enableChecksums("mod43");
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10", "mod43"]));
    ss.disableChecksums("mod16");
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10", "mod43"]));
    ss.disableChecksums("mod43");
    setsEqual(t, ss.getEnabledChecksums(), new Set(["mod10"]));
    ss.disableChecksums("mod10");
    setsEqual(t, ss.getEnabledChecksums(), new Set());
});
ava_1.default("toJSON", function (t) {
    var ss = new __1.SymbologySettings();
    t.deepEqual(JSON.stringify(ss), JSON.stringify({
        enabled: false,
        colorInvertedEnabled: false
    }));
    ss = new __1.SymbologySettings({});
    t.deepEqual(JSON.stringify(ss), JSON.stringify({
        enabled: false,
        colorInvertedEnabled: false
    }));
    ss = new __1.SymbologySettings({ enabled: true });
    t.deepEqual(JSON.stringify(ss), JSON.stringify({
        enabled: true,
        colorInvertedEnabled: false
    }));
    ss = new __1.SymbologySettings({ colorInvertedEnabled: true });
    t.deepEqual(JSON.stringify(ss), JSON.stringify({
        enabled: false,
        colorInvertedEnabled: true
    }));
    ss = new __1.SymbologySettings({ enabled: true, colorInvertedEnabled: true });
    t.deepEqual(JSON.stringify(ss), JSON.stringify({
        enabled: true,
        colorInvertedEnabled: true
    }));
    ss = new __1.SymbologySettings({
        enabled: true,
        colorInvertedEnabled: true,
        activeSymbolCounts: [8, 9, 10]
    });
    t.deepEqual(JSON.stringify(ss), JSON.stringify({
        enabled: true,
        colorInvertedEnabled: true,
        activeSymbolCounts: [8, 9, 10]
    }));
    ss = new __1.SymbologySettings({
        enabled: true,
        colorInvertedEnabled: true,
        activeSymbolCounts: [8, 9, 10],
        extensions: new Set([__1.SymbologySettings.Extension.FULL_ASCII])
    });
    t.deepEqual(JSON.stringify(ss), JSON.stringify({
        enabled: true,
        colorInvertedEnabled: true,
        activeSymbolCounts: [8, 9, 10],
        extensions: [__1.SymbologySettings.Extension.FULL_ASCII]
    }));
    ss = new __1.SymbologySettings({
        enabled: true,
        colorInvertedEnabled: true,
        activeSymbolCounts: [8, 9, 10],
        extensions: new Set([__1.SymbologySettings.Extension.FULL_ASCII]),
        checksums: new Set([__1.SymbologySettings.Checksum.MOD_10])
    });
    t.deepEqual(JSON.stringify(ss), JSON.stringify({
        enabled: true,
        colorInvertedEnabled: true,
        activeSymbolCounts: [8, 9, 10],
        extensions: [__1.SymbologySettings.Extension.FULL_ASCII],
        checksums: [__1.SymbologySettings.Checksum.MOD_10]
    }));
    ss = new __1.SymbologySettings();
    ss.enableExtensions([__1.SymbologySettings.Extension.FULL_ASCII]);
    ss.enableChecksums([__1.SymbologySettings.Checksum.MOD_10]);
    t.deepEqual(JSON.stringify(ss), JSON.stringify({
        enabled: false,
        colorInvertedEnabled: false,
        extensions: [__1.SymbologySettings.Extension.FULL_ASCII],
        checksums: [__1.SymbologySettings.Checksum.MOD_10]
    }));
});
//# sourceMappingURL=symbologySettings.spec.js.map