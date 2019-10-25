/* tslint:disable:no-implicit-dependencies */
/**
 * CustomError tests
 */
import test from "ava";
import { CustomError } from "..";
test("constructor", t => {
    let ce = new CustomError();
    t.deepEqual(ce.name, "");
    t.deepEqual(ce.message, "");
    t.is(ce.data, undefined);
    ce = new CustomError({ name: "test" });
    t.deepEqual(ce.name, "test");
    t.deepEqual(ce.message, "");
    t.is(ce.data, undefined);
    ce = new CustomError({ message: "test" });
    t.deepEqual(ce.name, "");
    t.deepEqual(ce.message, "test");
    t.is(ce.data, undefined);
    ce = new CustomError({ name: "test1", message: "test2" });
    t.deepEqual(ce.name, "test1");
    t.deepEqual(ce.message, "test2");
    t.is(ce.data, undefined);
    ce = new CustomError({ name: "test1", message: "test2", data: "test3" });
    t.deepEqual(ce.name, "test1");
    t.deepEqual(ce.message, "test2");
    t.deepEqual(ce.data, "test3");
});
//# sourceMappingURL=customError.spec.js.map