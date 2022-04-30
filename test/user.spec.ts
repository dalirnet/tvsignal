import { User } from "../src/index"

describe("User test suite", () => {
    test("UserTypes is valid", async () => {
        const user = await User.info("dalirnet")

        expect(user?.id).toBeTruthy()
        expect(user?.username?.length).toBeTruthy()
        expect(user?.avatar?.length).toBeTruthy()
        expect(typeof user?.isPro).toEqual("boolean")
        expect(typeof user?.charts).toEqual("number")
        expect(typeof user?.followers).toEqual("number")
        expect(typeof user?.reputation).toEqual("number")
    })
})
