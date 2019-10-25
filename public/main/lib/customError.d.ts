/**
 * @hidden
 */
export declare class CustomError extends Error {
    readonly data: any;
    constructor({ name, message, data }?: {
        name?: string;
        message?: string;
        data?: any;
    });
}
