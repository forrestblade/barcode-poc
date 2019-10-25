"use strict";
/* tslint:disable:no-implicit-dependencies */
/**
 * CustomError tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = tslib_1.__importDefault(require("ava"));
var __1 = require("..");
ava_1.default("constructor", function (t) {
    var ce = new __1.CustomError();
    t.deepEqual(ce.name, "");
    t.deepEqual(ce.message, "");
    t.is(ce.data, undefined);
    ce = new __1.CustomError({ name: "test" });
    t.deepEqual(ce.name, "test");
    t.deepEqual(ce.message, "");
    t.is(ce.data, undefined);
    ce = new __1.CustomError({ message: "test" });
    t.deepEqual(ce.name, "");
    t.deepEqual(ce.message, "test");
    t.is(ce.data, undefined);
    ce = new __1.CustomError({ name: "test1", message: "test2" });
    t.deepEqual(ce.name, "test1");
    t.deepEqual(ce.message, "test2");
    t.is(ce.data, undefined);
    ce = new __1.CustomError({ name: "test1", message: "test2", data: "test3" });
    t.deepEqual(ce.name, "test1");
    t.deepEqual(ce.message, "test2");
    t.deepEqual(ce.data, "test3");
});
//# sourceMappingURL=customError.spec.js.map