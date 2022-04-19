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
    side: "SHORT" | "LONG"
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
