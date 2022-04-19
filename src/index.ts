import { Ideas } from "./lib/Ideas"

//
;(async () => {
    const ideas = await Ideas.get({ side: "LONG" })

    console.log(ideas)
})()
