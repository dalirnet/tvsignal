# tvSignal

TradingView idea & signal parser

### Installation

```bash
npm i tvsignal
```

### Usage

-   Ideas

```typescript
import { Ideas } from "tvsignal"

const ideas = await Ideas.get(/* Filter object */)

/**

ideas = [
    {
        title: string
        symbol: string
        side: "SHORT" | "LONG"
        link: string
        image: string
        caption: string
        author: string | {
            id: number
            username: string
            avatar: string
            isPro: boolean
            charts: number
            followers: number
            reputation: number
        }
    }
]

*/
```

-   Signal

```typescript
import { Chart } from "tvsignal"

const signal = await Chart.signal(/* Chart link */)

/**
 
# When chart includes a signal
signal = {
    symbol: string
    base: string
    quote: string
    exchange: string
    entryPrice: number
    target: number
    stoploss: number
    side: "SHORT" | "LONG"
    timeframe: string
    expireAt: Date
}

# When chart not includes any signal
signal = null

*/
```

-   User

```typescript
import { User } from "tvsignal"

const user = await User.info(/* Username */)

/**
 
# When the user is found
user = {
    id: number
    username: string
    avatar: string
    isPro: boolean
    charts: number
    followers: number
    reputation: number
}
 
# When the user is not found
user = null

*/
```
