import { AxiosRequestConfig, Method } from "axios"
import { UserInfoResponseTypes, UserTypes } from "./Types"
import { Request } from "./Request"

/**
 * The class prepares user.
 *
 * @class
 * @name User
 * @kind class
 * @extends Request
 * @exports
 */
export class User extends Request {
    /**
     * Handling constructor of `request` class.
     *
     * @constructor
     * @name User
     * @param {UserTypes["username"]} username
     * @param {AxiosRequestConfig} config?
     */
    constructor(username: UserTypes["username"], config: AxiosRequestConfig = {}) {
        /**
         * Defining the url of the request.
         *
         * @constant
         * @name url
         * @kind variable
         * @memberof User.constructor
         * @type {string}
         */
        const url: string = `https://www.tradingview.com/u/${username}/info/`

        /**
         * Defining the method of the request.
         *
         * @constant
         * @name method
         * @kind variable
         * @memberof User.constructor
         * @type {Method}
         */
        const method: Method = "POST"

        /**
         * Defining the config of the request.
         *
         * @constant
         * @name requestConfig
         * @kind variable
         * @memberof User.constructor
         * @type {AxiosRequestConfig<any>}
         */
        const requestConfig: AxiosRequestConfig = {
            ...config,
            responseType: "json",
            headers: {
                referer: "https://www.tradingview.com/ideas/?sort=recent&video=no",
            },
            /**
             * Customize validate status.
             *
             * @property
             * @name validateStatus
             * @kind method
             * @memberof User.constructor.requestConfig
             * @type {(status: number) => boolean}
             */
            validateStatus(status): boolean {
                return status === 200
            },
        }

        super(url, method, requestConfig)
    }

    /**
     * A static method that returns user info.
     *
     * @async
     * @method
     * @name info
     * @kind method
     * @memberof User
     * @static
     * @param {UserTypes["username"]} username
     * @returns {Promise<UserTypes>}
     */
    static async info(username: UserTypes["username"]): Promise<UserTypes> {
        /**
         * Creating a new instance of the class.
         *
         * @constant
         * @name request
         * @kind variable
         * @memberof User.info
         * @instance
         * @type {User}
         */
        const request: User = new this(username)

        try {
            /**
             * Destructuring the data property from the response object.
             *
             * @constant
             * @name data
             * @kind variable
             * @memberof User.info
             * @type {UserInfoResponseTypes}
             */
            const { data }: { data: UserInfoResponseTypes } = await request.call()

            return {
                id: data.id,
                username: data.username,
                avatar: data.big_picture_url,
                isPro: data.is_pro,
                charts: data.charts_count,
                followers: data.followers_count,
                reputation: data.reputation,
            }
        } catch ({ message }) {
            console.error(message)

            return null
        }
    }
}
