import { AxiosRequestConfig } from "axios";
import { UserTypes } from "./Types";
import { Request } from "./Request";
/**
 * The class prepares user.
 *
 * @class
 * @name User
 * @kind class
 * @extends Request
 * @exports
 */
export declare class User extends Request {
    /**
     * Handling constructor of `request` class.
     *
     * @constructor
     * @name User
     * @param {UserTypes["username"]} username
     * @param {AxiosRequestConfig} config?
     */
    constructor(username: UserTypes["username"], config?: AxiosRequestConfig);
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
     * @param {AxiosRequestConfig} config?
     * @returns {Promise<UserTypes>}
     */
    static info(username: UserTypes["username"], config?: AxiosRequestConfig): Promise<UserTypes>;
}
