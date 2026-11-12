# Roadmap

## Stage 1: education site (this repo, live)

Lessons, case library, playbook, journal, membership page. Content gated at build time.

## Stage 1b: accounts and payments

What it takes to sell memberships properly:

- **Auth:** Supabase Auth (email magic link plus Google). Free tier is enough to start.
- **Payments:** Stripe Checkout for the subscription, a Stripe webhook that writes `member_until` to the user's row in
  Supabase.
- **Gating:** member lessons move from build-time locking to a server check. Lesson pages become dynamic for members
  (or the member body is fetched from a protected API route).
- **Journal sync:** store trades in Supabase per user, keep localStorage as the offline fallback, import the existing
  JSON export on first sign-in.
- **Customer portal:** Stripe's hosted portal for cancel and card changes.

Rough size: a week of focused work.

## Stage 2: terminal, profiles and delta

- Live trades from Binance and Bybit websockets (public, no keys).
- Candles plus TPO and volume profile, with POC, value area and single prints marked.
- Delta per bar and CVD.
- Charting: TradingView Lightweight Charts for candles, custom canvas for profiles.

Trades alone are enough, so no backend recorder is needed for live view. History needs stored trades or an API that
serves them.

## Stage 3: footprint

Bid and ask volume at each price inside each bar, imbalances highlighted. Needs aggregated trades per price per bar,
heavy on the browser, so it'll want a web worker.

## Stage 4: heatmap and liquidations

- Order book depth heatmap. This needs a recorder running all day to store snapshots, so it's the first stage that
  needs a real server and database (for example a small VPS writing to TimescaleDB or ClickHouse).
- Liquidation feed from the exchanges' public liquidation streams.

## Open questions

- Which exchanges count as the reference for BTC: Binance perp, Coinbase spot, or both?
- Is the terminal included in membership or a separate tier?
