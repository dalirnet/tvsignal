/**
 * Exporting a type called UserTypes.
 *
 * @typedef
 * @name UserTypes
 * @kind variable
 * @exports
 */
export type UserTypes = {
    id: number
    username: string
    isPro: boolean
    avatar: string
    charts: number
    followers: number
    reputation: number
}

/**
 * Exporting a type called ChartSourceTypes.
 *
 * @typedef
 * @name ChartSourceTypes
 * @kind variable
 * @exports
 */
export type ChartSourceTypes = {
    sources: ChartSourceDetailTypes[]
}

/**
 * Exporting a type called ChartSourceDetailTypes.
 *
 * @typedef
 * @name ChartSourceDetailTypes
 * @kind variable
 * @exports
 */
export type ChartSourceDetailTypes = {
    type: "MainSeries" | "LineToolRiskRewardLong" | "LineToolRiskRewardShort"
    symbolInfo?: {
        name?: string
        exchange?: string
        base_currency?: string
        currency_code?: string
        pricescale?: number
    }
    state?: {
        interval?: string
        stopLevel?: number
        profitLevel?: number
    }
    indexes?: [{ price?: number }, { time?: string }]
}

/**
 * Exporting a type called ChartSignalTypes.
 *
 * @typedef
 * @name ChartSignalTypes
 * @kind variable
 * @exports
 */
export type ChartSignalTypes = {
    symbol?: string
    base?: string
    quote?: string
    exchange?: string
    entryPrice?: number
    target?: number
    stoploss?: number
    side?: "SHORT" | "LONG"
    timeframe?: string
    expireAt?: Date
}

/**
 * Exporting a type called IdeaTypes.
 *
 * @typedef
 * @name IdeaTypes
 * @kind variable
 * @exports
 */
export type IdeaTypes = {
    title: string
    symbol: string
    side: ChartSignalTypes["side"]
    link: string
    image: string
    author: string | UserTypes
}

/**
 * Creating a type called UserFilterTypes.
 *
 * @typedef
 * @name UserFilterTypes
 * @kind variable
 * @exports
 */
export type UserFilterTypes = Partial<Pick<UserTypes, "isPro" | "charts" | "followers" | "reputation">>

/**
 * Creating a type called IdeaFilterTypes.
 *
 * @typedef
 * @name IdeaFilterTypes
 * @kind variable
 * @exports
 */
export type IdeaFilterTypes = {
    side?: IdeaTypes["side"]
    symbol?: IdeaTypes["symbol"][]
    author?: UserFilterTypes
}

/**
 * Exporting a type called UserInfoResponseTypes.
 *
 * @typedef
 * @name UserInfoResponseTypes
 * @kind variable
 * @exports
 */
export type UserInfoResponseTypes = {
    id: number
    username: string
    big_picture_url: string
    is_pro: boolean
    followers_count: number
    charts_count: number
    reputation: number
}
