---
title: "Charts without time"
group: "Tools"
order: 14
summary: "Range, RangeUS, Renko, tick, volume and delta bars. What each one filters."
access: member
lead: "If you trade levels, time is mostly noise. Charts whose bars close on something other than the clock filter it out. Some traders call these bars rotations."
---

### What closes the bar

| Chart type | A new bar starts when | What it filters |
| --- | --- | --- |
| **Time** | The clock says so. | Nothing. Quiet hours and busy hours get equal space. |
| **Tick** | A set number of trades has printed. | Quiet periods. Busy periods get more bars. |
| **Volume** | A set volume has traded. | Low-participation drift. |
| **Delta** | Net buying or selling reaches a set amount. | Two-sided churn. Bars only form when one side wins. |
| **Range** | Price has travelled a set distance. | Sideways chop inside that distance. |
| **RangeUS (Trend and Reverse)** | Price has travelled the trend distance with the bar, or the smaller reversal distance against it. | Chop, while showing reversals sooner than a plain range bar. |
| **Renko, Point and Figure** | Price moves a fixed brick or box, with a reversal rule. | Everything except directional travel. |

### RangeUS in detail

A favourite among level traders. From the ATAS guide:

- **Tick Trend.** How far price must travel to close a bar in the direction of the previous one.
- **Tick Reversal.** The smaller distance needed to close a bar against the previous one.
- **Open Offset.** Shifts where the first bar starts, which moves every bar boundary on the chart.
- A closed bar can only have a wick against its body. Each bar's high and low line up with the next one's, so levels are clean.
- A bar that takes a long time to close means price is stuck in a narrow range. That is either no pressure or a level being defended.

The guide suggests starting from volatility: set the trend distance to about half the average true range and the reversal to about 75% of the trend distance, then adjust. Some platforms ship presets such as 44-26 and 78-48, where the reversal is nearer 60% of the trend distance.

### What you gain and lose

- **Gain:** ranges collapse into a few bars, so structure and levels are easier to see. Footprint on range bars makes each bar comparable.
- **Lose:** you can no longer see session opens or how long anything took on the chart itself. Keep a time chart open for that.
- **Watch out:** the same market looks different on each bar type. The platform's own example shows ten reversal bars on RangeUS where the 5-minute chart shows one tidy pullback.

> **Edge or lens.**
>
> Their fans call rotations the real noise filter and the real edge. Treat them as a lens. They change what you see, which can help you read levels. Nothing we found shows a bar type is profitable by itself.

### Check yourself

<details>
<summary>On a RangeUS chart one bar has been open for forty minutes. What is the market doing?</summary>

Trading inside a range smaller than both the trend and reversal distances. Either nobody is pushing, or a level is being defended. Check the footprint of that bar to see which.

</details>
