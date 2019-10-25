"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var customError_1 = require("./customError");
/**
 * @hidden
 */
var UnsupportedBrowserError = /** @class */ (function (_super) {
    tslib_1.__extends(UnsupportedBrowserError, _super);
    // istanbul ignore next
    function UnsupportedBrowserError(browserCompatibility) {
        return _super.call(this, {
            name: "UnsupportedBrowserError",
            message: "This OS / Browser has one or more missing features preventing it from working correctly",
            data: browserCompatibility
        }) || this;
    }
    return UnsupportedBrowserError;
}(customError_1.CustomError));
exports.UnsupportedBrowserError = UnsupportedBrowserError;
//# sourceMappingURL=unsupportedBrowserError.js.map