import { AxiosRequestConfig } from "axios"
import { parse } from "muninn"
import { RawConfig } from "muninn/src/config/types"
import { ChartSignalTypes, ChartSourceDetailTypes, ChartSourceTypes } from "./Types"
import { Request } from "./Request"

/**
 * The class prepares chart.
 *
 * @class
 * @name User
 * @kind class
 * @extends Request
 * @exports
 */
export class Chart extends Request {
    /**
     * Handling constructor of `request` class.
     *
     * @constructor
     * @name Chart
     * @param {string} url
     * @param {AxiosRequestConfig} config?
     */
    constructor(url: string, config: AxiosRequestConfig = {}) {
        super(url, "GET", config)
    }

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
    static schema: RawConfig = {
        schema: {
            sources: {
                selector: "div.tv-chart-view > script",
                html: true,
                custom(content) {
                    try {
                        const { viewChartOptions } = JSON.parse(content)
                        const { panes } = JSON.parse(viewChartOptions.content)

                        return panes[0].sources
                    } catch {
                        return []
                    }
                },
            },
        },
    }

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
    static async signal(url: string, config: AxiosRequestConfig = {}): Promise<ChartSignalTypes> {
        /**
         * Creating a new instance of the class.
         *
         * @constant
         * @name request
         * @kind variable
         * @memberof Chart.signal
         * @instance
         * @type {Chart}
         */
        const request: Chart = new this(url, config)

        try {
            /**
             * Destructuring the data property from the response object.
             *
             * @constant
             * @name data
             * @kind variable
             * @memberof Chart.signal
             * @type {string}
             */
            const { data }: { data: string } = await request.call()

            /**
             * Destructuring the `sources` property from the `parse` function.
             *
             * @constant
             * @name sources
             * @kind variable
             * @memberof Chart.signal
             * @type {ChartSourceDetailTypes[]}
             */
            const { sources }: ChartSourceTypes = (parse(data, this.schema) ?? { sources: [] }) as ChartSourceTypes

            /**
             * Finding the main series of the chart.
             *
             * @constant
             * @name findMainType
             * @kind variable
             * @memberof Chart.signal
             * @type {ChartSourceDetailTypes}
             */
            const findMainType: ChartSourceDetailTypes = sources.find(({ type }) => {
                return type === "MainSeries"
            })

            /**
             * Destructuring the `symbolInfo` property from the `findMainType` variable.
             *
             * @constant
             * @name symbolInfo
             * @kind variable
             * @memberof Chart.signal
             * @type {{ name?: string; exchange?: string; base_currency?: string; currency_code?: string; pricescale?: number; }}
             */
            const symbolInfo: ChartSourceDetailTypes["symbolInfo"] = findMainType?.symbolInfo

            /**
             * Finding the type of the chart.
             *
             * @constant
             * @name findRewardsType
             * @kind variable
             * @memberof Chart.signal
             * @type {ChartSourceDetailTypes}
             */
            const findRewardsType: ChartSourceDetailTypes = sources.reverse().find(({ type }) => {
                return type === "LineToolRiskRewardLong" || type === "LineToolRiskRewardShort"
            })

            /**
             * Destructuring the `state` property from the `findRewardsType` variable.
             *
             * @constant
             * @name state
             * @kind variable
             * @memberof Chart.signal
             * @type {{ interval?: string; stopLevel?: number; profitLevel?: number; }}
             */
            const state: ChartSourceDetailTypes["state"] = findRewardsType?.state

            /**
             * Destructuring the `indexes` property from the `findRewardsType` variable.
             *
             * @constant
             * @name indexes
             * @kind variable
             * @memberof Chart.signal
             * @type {[{ price?: number; }, { time?: string; }]}
             */
            const indexes: ChartSourceDetailTypes["indexes"] = findRewardsType?.indexes

            if (symbolInfo && state && indexes && indexes.length >= 2) {
                /**
                 * Defining the `signal` variable.
                 *
                 * @let
                 * @name signal
                 * @kind variable
                 * @memberof Chart.signal
                 * @type {ChartSignalTypes}
                 */
                let signal: ChartSignalTypes = {
                    symbol: symbolInfo.name,
                    base: symbolInfo.base_currency,
                    quote: symbolInfo.currency_code,
                    exchange: symbolInfo.exchange,
                }

                if (!signal.base) {
                    signal.base = signal.symbol.replace(new RegExp(`${signal.quote}$`, "i"), "")
                }

                if (indexes[0]?.price) {
                    signal.entryPrice = indexes[0].price
                }

                if (signal.entryPrice && state?.stopLevel && state?.profitLevel) {
                    signal.side = findRewardsType.type === "LineToolRiskRewardLong" ? "LONG" : "SHORT"

                    /**
                     * Calculating the target price.
                     *
                     * @constant
                     * @name target
                     * @kind variable
                     * @memberof Chart.signal
                     * @type {number}
                     */
                    const target: number = state.profitLevel / symbolInfo.pricescale

                    /**
                     * Calculating the stoploss price.
                     *
                     * @constant
                     * @name stoploss
                     * @kind variable
                     * @memberof Chart.signal
                     * @type {number}
                     */
                    const stoploss: number = state.stopLevel / symbolInfo.pricescale

                    if (signal.side === "LONG") {
                        signal.target = signal.entryPrice + target
                        signal.stoploss = signal.entryPrice - stoploss
                    } else {
                        signal.target = signal.entryPrice - target
                        signal.stoploss = signal.entryPrice + stoploss
                    }
                }

                if (state?.interval) {
                    signal.timeframe = state.interval
                }

                if (indexes[1]?.time) {
                    signal.expireAt = new Date(indexes[1].time)
                }

                for (const field of ["target", "stoploss", "entryPrice"]) {
                    signal[field] =
                        Math.round((signal[field] + Number.EPSILON) * symbolInfo.pricescale) / symbolInfo.pricescale
                }

                return signal
            }

            return null
        } catch ({ message }) {
            console.error(message)

            return null
        }
    }
}
