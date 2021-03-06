import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"

/**
 * Extending the Axios class.
 *
 * @class
 * @name Request
 * @kind class
 * @extends Axios
 * @exports
 */
export class Request extends axios.Axios {
    /**
     * A constructor for the class.
     *
     * @constructor
     * @name Request
     * @param {string} url
     * @param {Method} method
     * @param {AxiosRequestConfig} config?
     */
    constructor(url: string, method: Method, config: AxiosRequestConfig = {}) {
        /**
         * Creating a new object with the properties of `config` and `url` and `method`
         *
         * @let
         * @name axiosConfig
         * @kind variable
         * @memberof Request.constructor
         * @type {AxiosRequestConfig}
         */
        let axiosConfig: AxiosRequestConfig = { url, method, ...config }

        /**
         * Adding base url.
         */
        axiosConfig.baseURL = config.baseURL ?? "https://www.tradingview.com/"

        /**
         * Adding user agent to headers.
         */
        axiosConfig.headers = {
            "User-Agent": "tvsignal/1.0.1",
            ...config?.headers,
        }

        /**
         * Adding json transformer to headers when response type is json.
         */
        if (config?.responseType === "json") {
            axiosConfig.transformResponse = (data) => {
                try {
                    return JSON.parse(data)
                } catch (error) {
                    return data
                }
            }
        }

        super(axiosConfig)
    }

    /**
     * A getter for the `config` property.
     *
     * @method
     * @name (get) config
     * @kind property
     * @memberof Request
     * @returns {AxiosRequestConfig<any>}
     */
    get config(): AxiosRequestConfig {
        return this.defaults as unknown as AxiosRequestConfig
    }

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
    public call<T = any>(config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request<T>({
            ...config,
            ...this.config,
        })
    }
}
