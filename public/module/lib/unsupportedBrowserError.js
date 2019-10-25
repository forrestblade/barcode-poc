import { CustomError } from "./customError";
/**
 * @hidden
 */
export class UnsupportedBrowserError extends CustomError {
    // istanbul ignore next
    constructor(browserCompatibility) {
        super({
            name: "UnsupportedBrowserError",
            message: "This OS / Browser has one or more missing features preventing it from working correctly",
            data: browserCompatibility
        });
    }
}
//# sourceMappingURL=unsupportedBrowserError.js.map