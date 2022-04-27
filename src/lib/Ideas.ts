import { AxiosRequestConfig } from "axios"
import { parse } from "muninn"
import { RawConfig } from "muninn/src/config/types"
import { IdeaFilterTypes, IdeaTypes } from "./Types"
import { Request } from "./Request"
import { User } from "./User"

/**
 * The class prepares ideas.
 *
 * @class
 * @name Ideas
 * @kind class
 * @extends Request
 * @exports
 */
export class Ideas extends Request {
    /**
     * Handling constructor of `request` class.
     *
     * @constructor
     * @name Ideas
     * @param {AxiosRequestConfig} config?
     */
    constructor(config: AxiosRequestConfig = {}) {
        super("/ideas/?sort=recent&video=no", "GET", config)
    }

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
    static schema: RawConfig = {
        schema: {
            ideas: {
                selector: "div.tv-widget-idea",
                type: "array",
                schema: {
                    title: "div.tv-widget-idea__title-row a",
                    symbol: "div.tv-widget-idea__symbol-info a",
                    side: {
                        selector: "span.tv-widget-idea__label",
                        custom(side: string) {
                            return side.toUpperCase()
                        },
                    },
                    link: {
                        selector: "div.tv-widget-idea__title-row a",
                        attr: "href",
                    },
                    image: {
                        selector: "img.tv-widget-idea__cover",
                        attr: "data-src",
                    },
                    caption: "p.tv-widget-idea__description-row",
                    author: {
                        selector: "span.tv-card-user-info a",
                        attr: "data-username",
                    },
                },
            },
        },
    }

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
    static async get(filter?: IdeaFilterTypes, config: AxiosRequestConfig = {}): Promise<IdeaTypes[]> {
        /**
         * Creating a new instance of the Ideas class.
         *
         * @constant
         * @name request
         * @kind variable
         * @memberof Ideas.get
         * @instance
         * @type {Ideas}
         */
        const request: Ideas = new this(config)

        try {
            /**
             * Destructuring the data property from the response object.
             *
             * @constant
             * @name data
             * @kind variable
             * @memberof Ideas.get
             * @type {string}
             */
            const { data }: { data: string } = await request.call()

            /**
             * Destructuring the `ideas` property from the `parse` method.
             *
             * @constant
             * @name ideas
             * @kind variable
             * @memberof Ideas.get
             * @type {IdeaTypes[]}
             */
            const { ideas }: { ideas: IdeaTypes[] } = parse(data, this.schema) as { ideas: IdeaTypes[] }

            /**
             * Creating an empty array.
             *
             * @let
             * @name filteredIdeas
             * @kind variable
             * @memberof Ideas.get
             * @type {IdeaTypes[]}
             */
            let filteredIdeas: IdeaTypes[] = []

            /**
             * Filters ideas.
             */
            for (const idea of ideas) {
                /**
                 * Filters null values.
                 */
                if (!idea?.title || !idea?.link || !idea?.symbol || !idea?.side || !idea?.author) {
                    continue
                }

                /**
                 * Filters the idea symbol.
                 */
                if (filter?.symbol?.length && filter.symbol.indexOf(idea.symbol) === -1) {
                    continue
                }

                /**
                 * Filters the type of idea side.
                 */
                if (filter?.side?.length && idea.side !== filter.side) {
                    continue
                }

                /**
                 * Filters author by username.
                 */
                if (filter?.author?.username?.length && filter.author.username.indexOf(idea.author as string) === -1) {
                    continue
                }

                /**
                 * It's getting the user information from the `User` class.
                 *
                 * @constant
                 * @name idea
                 * @type {IdeaTypes}
                 */
                idea.author = await User.info(idea.author as string)

                if (idea.author) {
                    /**
                     * Filters professional author.
                     */
                    if (filter?.author?.isPro && !idea.author.isPro) {
                        continue
                    }

                    /**
                     * Filters the count of author charts.
                     */
                    if (filter?.author?.charts && idea.author.charts < filter.author.charts) {
                        continue
                    }

                    /**
                     * Filters the count of author followers.
                     */
                    if (filter?.author?.followers && idea.author.followers < filter.author.followers) {
                        continue
                    }

                    /**
                     * Filters the count of author reputation.
                     */
                    if (filter?.author?.reputation && idea.author.reputation < filter.author.reputation) {
                        continue
                    }

                    /**
                     * After passing all filters pushing the idea into the filtered ideas.
                     */
                    filteredIdeas.push(idea)
                }
            }

            return filteredIdeas
        } catch ({ message }) {
            console.error(message)

            return []
        }
    }
}
