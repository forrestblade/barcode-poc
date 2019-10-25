/**
 * @hidden
 */
export class CustomError extends Error {
    // istanbul ignore next
    constructor({ name = "", message = "", data } = {}) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.name = name;
        this.data = data;
    }
}
//# sourceMappingURL=customError.js.map