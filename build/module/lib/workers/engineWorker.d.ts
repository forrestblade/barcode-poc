import { ImageSettings } from "../imageSettings";
import { Parser } from "../parser";
/**
 * @hidden
 */
export declare type Module = {
    HEAPU8: Uint8Array;
    lengthBytesUTF8(str: string): number;
    UTF8ToString(ptr: number): string;
    stringToUTF8(str: string, outPtr: number, maxBytesToWrite: number): void;
    _malloc(size: number): number;
    _free(ptr: number): void;
    _create_context(ptr: number, debug: boolean): void;
    _scanner_settings_new_from_json(ptr: number, blurryDecodingEnabled: boolean, matrixScanEnabled: boolean, highQualitySingleFrameMode: boolean, gpuEnabled: boolean): number;
    _scanner_image_settings_new(width: number, height: number, channels: number): void;
    _scanner_session_clear(): void;
    _can_hide_logo(): number;
    _scanner_scan(ptr: number): number;
    _parser_parse_string(parserType: number, ptr: number, stringDataLength: number, ptr2: number): number;
    canvas(): HTMLCanvasElement;
    instantiateWasm(importObject: any, successCallback: (instance: any) => void): void;
    preRun(): void;
    onRuntimeInitialized(): void;
    callMain(): void;
};
/**
 * @hidden
 */
declare type ScanWorkUnit = {
    requestId: number;
    data: Uint8ClampedArray;
    highQualitySingleFrameMode: boolean;
};
/**
 * @hidden
 */
declare type ParseWorkUnit = {
    requestId: number;
    dataFormat: Parser.DataFormat;
    dataString: string;
    options: string;
};
/**
 * @hidden
 */
export declare type Engine = {
    loadLibrary(deviceId: string, libraryLocation: string, locationPath: string): Promise<void>;
    createContext(newLicenseKey: string): void;
    setSettings(newSettings: string): void;
    setImageSettings(newImageSettings: ImageSettings): void;
    workOnScanQueue(): void;
    workOnParseQueue(): void;
    addScanWorkUnit(scanWorkUnit: ScanWorkUnit): void;
    addParseWorkUnit(parseWorkUnit: ParseWorkUnit): void;
    clearSession(): void;
};
/**
 * @hidden
 * @returns Engine
 */
export declare function engine(): Engine;
/**
 * @hidden
 */
export declare function engineWorkerFunction(): void;
/**
 * @hidden
 */
export declare const engineWorkerBlob: Blob;
export {};
