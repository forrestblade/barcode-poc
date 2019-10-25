import { UAParser } from "ua-parser-js";
export { UAParser };
import { BrowserCompatibility } from "./browserCompatibility";
export declare namespace BrowserHelper {
    /**
     * @hidden
     */
    interface Browser {
        name?: string;
        version?: string;
    }
    /**
     * @hidden
     */
    interface CPU {
        architecture?: string;
    }
    /**
     * @hidden
     */
    interface Device {
        model?: string;
        vendor?: string;
        type?: string;
    }
    /**
     * @hidden
     */
    interface Engine {
        name?: string;
        version?: string;
    }
    /**
     * @hidden
     */
    interface OS {
        name?: string;
        version?: string;
    }
    /**
     * @hidden
     */
    const userAgentInfo: {
        getBrowser(): Browser;
        getOS(): OS;
        getEngine(): Engine;
        getDevice(): Device;
        getCPU(): CPU;
        getUA(): string;
        setUA(uastring: string): void;
    };
    /**
     * @hidden
     */
    const canvas: HTMLCanvasElement;
    /**
     * @returns The built [[BrowserCompatibility]] object representing the current OS/Browser's support for features.
     */
    function checkBrowserCompatibility(): BrowserCompatibility;
    /**
     * @hidden
     *
     * Get a device id for the current browser, when available it's retrieved from a cookie,
     * when not it's randomly generated and stored in a cookie to be retrieved by later calls.
     *
     * @returns The device id for the current browser.
     */
    function getDeviceId(): string;
    /**
     * @hidden
     *
     * Check if a given object is a valid HTMLElement
     *
     * @param object The object to check.
     * @returns Whether the given object is a valid HTMLElement.
     */
    function isValidHTMLElement(object: any): boolean;
}
