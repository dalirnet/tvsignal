import { Ideas } from "./lib/Ideas"
import { Chart } from "./lib/Chart"

//
;(async () => {
    const ideas = await Ideas.get()
    console.log(ideas)

    // const link = "/chart/GBPCAD/YRV02Xet-GBPCAD-long-position/"
    // // const link = "/chart/NZDUSD/EqxAQKjD-NZD-USD-DOWNTREND-NEW-SWING-OPPORTUNITY-SHORT-SETUP/"
    // // const link = "/chart/PHOENIXLTD/GxWWQEfI-Fibonacci-previous-support-and-resistance/"

    // const signal = await Chart.signal(link)
    // console.log(signal)
})()
