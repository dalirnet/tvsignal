import { Ideas, IdeaTypes, UserTypes } from "../src/index"

describe("Ideas test suite", () => {
    let ideas: IdeaTypes[] = []

    beforeAll(async () => {
        ideas = await Ideas.get()
    })

    test("Is array of IdeaTypes", async () => {
        expect(Array.isArray(ideas)).toEqual(true)
    })

    test("IdeaTypes is valid", async () => {
        expect(ideas.length).toBeTruthy()
        expect(ideas[0]?.title?.length).toBeTruthy()
        expect(ideas[0]?.symbol?.length).toBeTruthy()
        expect(ideas[0]?.side).toMatch(/^(LONG|SHORT)$/)
        expect(ideas[0]?.link?.length).toBeTruthy()
        expect(ideas[0]?.image?.length).toBeTruthy()
        expect(ideas[0]?.caption?.length).toBeTruthy()
    })

    test("IdeaTypes.author is valid", async () => {
        const author = (ideas[0]?.author ?? {}) as UserTypes

        expect(author?.id).toBeTruthy()
        expect(author?.username?.length).toBeTruthy()
        expect(author?.avatar?.length).toBeTruthy()
        expect(typeof author?.isPro).toEqual("boolean")
        expect(typeof author?.charts).toEqual("number")
        expect(typeof author?.followers).toEqual("number")
        expect(typeof author?.reputation).toEqual("number")
    })
})
