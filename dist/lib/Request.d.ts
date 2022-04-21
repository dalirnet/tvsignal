import { Axios, AxiosRequestConfig, AxiosResponse, Method } from "axios";
/**
 * Extending the Axios class.
 *
 * @class
 * @name Request
 * @kind class
 * @extends Axios
 * @exports
 */
export declare class Request extends Axios {
    /**
     * A constructor for the class.
     *
     * @constructor
     * @name Request
     * @param {string} url
     * @param {Method} method
     * @param {AxiosRequestConfig} config?
     */
    constructor(url: string, method: Method, config?: AxiosRequestConfig);
    /**
     * A getter for the `config` property.
     *
     * @method
     * @name (get) config
     * @kind property
     * @memberof Request
     * @returns {AxiosRequestConfig<any>}
     */
    get config(): AxiosRequestConfig;
    /**
     * Calling axios instance.
     *
     * @method
     * @name call
     * @kind method
     * @memberof Request
     * @public
     * @param {AxiosRequestConfig} config?
     * @returns {Promise<AxiosResponse<T>>}
     */
    call<T = any>(config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}
