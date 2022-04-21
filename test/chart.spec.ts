import { Chart, ChartSignalTypes } from "../src/index"

describe("Chart test suite", () => {
    test("Chart includes a SHORT signal", async () => {
        const signal: ChartSignalTypes = await Chart.signal(
            "https://www.tradingview.com/chart/XAGUSD/EdYHweZM-EXCLUSIVE-SILVER-SHORT/"
        )

        expect(signal?.symbol).toEqual("XAGUSD")
        expect(signal?.base).toEqual("XAG")
        expect(signal?.quote).toEqual("USD")
        expect(signal?.exchange).toEqual("FOREX.com")
        expect(signal?.side).toMatch("SHORT")
        expect(typeof signal?.entryPrice).toEqual("number")
        expect(typeof signal?.target).toEqual("number")
        expect(typeof signal?.stoploss).toEqual("number")
        expect(signal?.timeframe).toEqual("240")
        expect(signal?.expireAt).toBeInstanceOf(Date)
    })

    test("Chart includes a LONG signal", async () => {
        const signal: ChartSignalTypes = await Chart.signal(
            "https://www.tradingview.com/chart/KSMUSDT/Hdu8hcad-KSM-is-in-a-bullish-pattern/"
        )

        expect(signal?.symbol).toEqual("KSMUSDT")
        expect(signal?.base).toEqual("KSM")
        expect(signal?.quote).toEqual("USDT")
        expect(signal?.exchange).toEqual("BINANCE")
        expect(signal?.side).toMatch("LONG")
        expect(typeof signal?.entryPrice).toEqual("number")
        expect(typeof signal?.target).toEqual("number")
        expect(typeof signal?.stoploss).toEqual("number")
        expect(signal?.timeframe).toEqual("1D")
        expect(signal?.expireAt).toBeInstanceOf(Date)
    })

    test("Chart not includes any signal", async () => {
        const signal: ChartSignalTypes = await Chart.signal(
            "https://www.tradingview.com/chart/FILUSDT/oTN3dOnK-FILUSDT-Update/"
        )

        expect(signal).toBeNull()
    })
})
