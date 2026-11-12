---
title: "Reading a profile"
group: "Profiles"
order: 1
summary: "Market profile counts time, volume profile counts volume. POC, value area, nodes."
access: free
lead: "A profile is the same price chart you already use, rearranged. Take every candle from a period, remove the time axis, and let the candles fall sideways against the price scale like Tetris bricks. What you get shows where the market spent its time and its volume."
---

### Two profiles, two questions

| Profile | Counts | Answers |
| --- | --- | --- |
| **Market profile (TPO)** | Time. One block for each 30-minute period that traded at a price. | Where was the market present the longest? |
| **Volume profile** | Contracts traded at each price. | Where did people actually commit size? |
| **Delta profile** | Market buys minus market sells at each price. | Who was the aggressor at each price? |

### The parts

- **Point of control (POC).** The price row with the most activity. On a TPO profile it is the longest row of blocks. On a volume profile it is the row with the most volume.
- **Value area.** The band around the POC that holds about 70% of the activity. The 70% comes from the bell curve: one standard deviation each side of the mean holds roughly 68% of a normal distribution.
- **Value area high and low (VAH, VAL).** The edges of that band.
- **High-volume node (HVN).** A fat part of the profile. A lot of business was agreed there.
- **Low-volume node (LVN).** A thin part. Price passed through without much trade.
- **Tails.** Thin single-block stretches at the very top or bottom. They mark rejection of an extreme.

::diagram profile-anatomy

### How the value area is calculated

1. Start at the POC row and count its activity.
2. Add up the two rows directly above, and the two rows directly below.
3. Take whichever pair is larger and add it to the value area.
4. Repeat until the total reaches 70% of the whole profile.

This is the standard exchange method. Charting packages let you change the percentage and base it on TPOs or on volume, so two platforms can show slightly different edges for the same session.

### Why a fat node reacts

A fat node means many positions were opened at that price. When price comes back, those holders are at break-even and have a reason to defend it. If price trades through instead, they are offside and have to get out, which adds fuel in the direction of the break.

That is why a node from real traded volume has a better claim to act as support than a line with no business behind it, such as the daily open.

### Check yourself

<details>
<summary>A session has a tall thin TPO profile but a volume profile with one huge node near the low. What happened?</summary>

Price moved through most of the range quickly (few blocks per row), but a lot of volume traded in one place near the low. Heavy trade in little time at one end usually means a fight there: forced selling met by passive buying, or the reverse.

</details>

<details>
<summary>Why can two platforms disagree on the value area low?</summary>

They may use a different percentage, a different row size, TPOs versus volume, or a different session boundary. Check the settings before you treat the level as exact.

</details>
