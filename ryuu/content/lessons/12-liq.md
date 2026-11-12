---
title: "Liquidations and knife catching"
group: "Order flow"
order: 12
summary: "Why liquidations overshoot, how to time the fade from a naked chart, and where it fails."
access: member
lead: "A liquidation is a forced market order. When many fire together they push price further than real buying or selling interest would. When they stop, that pressure disappears and price snaps back. Traders who fade liquidations call it mechanical and highly accurate. This lesson covers how to time it, and where the case library shows it going wrong."
---

### Why the book is empty

A fast move down is market sell orders consuming the bids. The book does not have time to refill behind the move. When the forced selling ends, anyone who buys is lifting offers into a thin book, so a small amount of buying moves price a long way.

### Timing it from a naked chart

1. A large candle in the direction of the move on very high volume. That is the liquidation.
2. Then a relatively large candle the other way on low volume, taking back most of the first one.
3. That combination says the cascade has ended and the book is empty. This is the earliest reasonably safe entry.

It works the same way upside down for short liquidations.

::diagram liquidation-fade

### Targets

The logical take-profit points are the origins of the legs that made up the drop. Take half at the first and half at the next. Only the bold go for the point where the whole move started.

### Speed and size

- Do the round trip quickly. The exception is a very large cascade, where price tends to consolidate and chop afterwards and you have to feel it out.
- Leave room to add. Split a scalp into three clips: at peak liquidation, as momentum decays, and as it turns.
- Keep the capital for this in a separate small account, with the bulk held back. Think of it as bullets and a magazine: lose the bullets, never the magazine.

### Where it fails: the case library

- **Oct 29:** the first $48M flush bounced 1,300 points, then the bounce trapped dip buyers and a second $48M flush followed three hours later.
- **Nov 10:** the 13:30 flush bounced to the POC, failed, and the real low came two legs later.
- **Nov 8:** a straight V. No second leg at all.

So the first liquidation candle is a scalp to the nearest leg origin. The durable low often comes later, on a quieter lower low after open interest has reset. That is why the rule is to do the round quickly.

Volume analysis says the same thing from the other side: strong levels need volume to break, bottoms form slowly and need volume, and V-shaped reversals are rare and come from unusual conditions. So the fade is a scalp on the mechanical bounce. It is not a call that the low is in.

### Why dumps were sharper than pumps

BitMEX's research note on convexity explains this for inverse contracts, which are margined and settled in bitcoin. Profit in bitcoin is:

contracts × (1 ÷ entry price − 1 ÷ exit price)

Take a long of 10,000 contracts from 80,000. A 10% drop to 72,000 loses 0.0139 BTC. A 10% rise to 88,000 makes only 0.0114 BTC. Longs lose bitcoin faster as price falls, and that bitcoin is also their collateral, so they are liquidated sooner. Shorts have the opposite profile.

> **Check what you trade.**
>
> This applies to coin-margined inverse contracts. USDT-margined linear contracts do not have this convexity. Know which one your venue's liquidation feed is dominated by before leaning on the asymmetry.

### Fading the crowd

The other fade is social. When people are loudly euphoric after a sharp move, professionals are taking profit into them, and the move tends to retrace intraday. Some traders treat "it's dead" and "it's mooning" from the crowd as fade signals. That is anecdote, not a measured edge. Positioning data puts a number on it: when a large majority of accounts on a venue is long into an obvious round number, the move is crowded.

### Check yourself

<details>
<summary>A huge red candle on record volume. The next candle is green but small, on high volume. Enter?</summary>

No. The signal is a relatively large candle back on low volume. A small green candle on high volume means sellers are still active and being absorbed at best. The cascade may not be over.

</details>

<details>
<summary>You caught the bounce and price reaches the origin of the last leg down. What does the method say?</summary>

Take profit there, at least half. The bounce is a mechanical reaction, not a trend. Holding it is how the Oct 29 bounce turned into a loss.

</details>
