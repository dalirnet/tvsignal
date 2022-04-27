import { AxiosRequestConfig } from "axios";
import { RawConfig } from "muninn/src/config/types";
import { IdeaFilterTypes, IdeaTypes } from "./Types";
import { Request } from "./Request";
/**
 * The class prepares ideas.
 *
 * @class
 * @name Ideas
 * @kind class
 * @extends Request
 * @exports
 */
export declare class Ideas extends Request {
    /**
     * Handling constructor of `request` class.
     *
     * @constructor
     * @name Ideas
     * @param {AxiosRequestConfig} config?
     */
    constructor(config?: AxiosRequestConfig);
    /**
     * Defining muninn schema.
     *
     * @property
     * @name schema
     * @kind property
     * @memberof Ideas
     * @static
     * @type {RawConfig}
     */
    static schema: RawConfig;
    /**
     * A static method that returns ideas.
     *
     * @async
     * @method
     * @name get
     * @kind method
     * @memberof Ideas
     * @static
     * @param {IdeaFilterTypes} filter?
     * @param {AxiosRequestConfig} config?
     * @returns {Promise<IdeaTypes[]>}
     */
    static get(filter?: IdeaFilterTypes, config?: AxiosRequestConfig): Promise<IdeaTypes[]>;
}
