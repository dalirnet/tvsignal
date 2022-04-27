import { AxiosRequestConfig } from "axios";
import { RawConfig } from "muninn/src/config/types";
import { ChartSignalTypes } from "./Types";
import { Request } from "./Request";
/**
 * The class prepares chart.
 *
 * @class
 * @name User
 * @kind class
 * @extends Request
 * @exports
 */
export declare class Chart extends Request {
    /**
     * Handling constructor of `request` class.
     *
     * @constructor
     * @name Chart
     * @param {string} url
     * @param {AxiosRequestConfig} config?
     */
    constructor(url: string, config?: AxiosRequestConfig);
    /**
     * Defining muninn schema.
     *
     * @property
     * @name schema
     * @kind property
     * @memberof Chart
     * @static
     * @type {RawConfig}
     */
    static schema: RawConfig;
    /**
     * A static method that returns chart signal.
     *
     * @async
     * @method
     * @name signal
     * @kind method
     * @memberof Chart
     * @static
     * @param {string} url
     * @param {AxiosRequestConfig} config?
     * @returns {Promise<ChartSignalTypes>}
     */
    static signal(url: string, config?: AxiosRequestConfig): Promise<ChartSignalTypes>;
}
