---
title: "Sessions and kill zones"
group: "Market Profile (Dalton)"
order: 10
summary: "Applying profile to a market that never closes. Session opens as liquidity events."
access: member
lead: "Market Profile was built for markets with an opening bell. Bitcoin does not have one, so the day is split by trading session, and each session gets its own profile, initial balance and single prints."
---

### Session profiles

Split the day into Asia, London and New York profiles, with a CME or pre-close segment if your platform offers it. Each has its own initial balance high and low, POC and value area. As covered earlier, single prints inside a session tend to be more reliable than ones on the full-day profile.

### Kill zones

A kill zone is the window around a major session open. Traders who use them describe them as liquidity events: margin calls, rebalancing and large orders all hit the market in the same window, often near important technical levels.

| Zone | New York time | UTC, US winter time | UTC, US summer time |
| --- | --- | --- | --- |
| **Asia** | 19:00 to 23:00 | 00:00 to 04:00 | 23:00 to 03:00 |
| **London** | 02:00 to 04:00 | 07:00 to 09:00 | 06:00 to 08:00 |
| **New York** | 08:30 to 10:30 | 13:30 to 15:30 | 12:30 to 14:30 |

The usual guidance:

- If you have a level, larger players probably have it too. Expect price to reach it during a kill zone, because that is when there is enough liquidity to fill size.
- Avoid opening positions on the way into a zone. Look for your level to be confirmed on the way out.
- A trend that comes out of a zone often lasts until the next one.

### A more cynical version

The idea is partly true and partly marketing. A more practical version: algorithms come in at the open, do their business and leave. Everyone piles in, there are a few hours of action, then nothing until the next open. What happens between the main zones, unless a big event drives it, is noise that gets filled back before the next session, when price returns to the high-volume area to continue.

### The case library

All three November moves that started with a trigger fired inside the New York window of 13:30 to 15:30 UTC: the Nov 4 squeeze (14:30), the Nov 5 waterfall (14:45) and the Nov 10 flush and rejection (13:30 and 15:00). Three is a tiny sample, but it fits.

> **A contradiction to hold.**
>
> Many of the same traders who say session opens matter also say time is noise, and trade on charts with no time axis (see Charts without time). Both can be true: time does not define the bars, but it does tell you when the liquidity shows up. Know which one you are using for what.

### Weekends

Weekend books are thin and there is little institutional flow. Moves travel further on less volume and leave gaps. The Nov 8 case was a Sunday night: the stacked bids below price vanished and $92M of longs were liquidated in minutes.

A common weekend rule: price tends to gravitate back toward the weekly mean on Monday, so weekend moves away from it tend to be given back. It is untested in public. Count it in your journal.

### Check yourself

<details>
<summary>It is 13:10 UTC in winter and price is drifting toward your level. Enter now or wait?</summary>

By the usual guidance, wait. The New York window opens at 13:30 and is likely to push price through or into your level with real size. Look for the reaction and confirmation as the window plays out.

</details>
