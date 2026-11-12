import type { Metadata } from "next";
import { hasMemberAccess } from "@/lib/access";
import { Paywall } from "@/components/Paywall";

export const metadata: Metadata = { title: "Playbook" };

export default function PlaybookPage() {
  const open = hasMemberAccess();
  return (
    <div className="wrap stack" style={{ gap: 30, paddingBottom: 72 }}>
      <header className="page-head">
        <span className="label">Playbook</span>
        <h1>Three trades, written down</h1>
        <p>
          The case library comes down to a continuation and a reversal. Each has its own trigger and its own point where
          the read is wrong.
        </p>
      </header>
      <div className="tablebox">
        <table>
          <thead>
            <tr><th>Trade</th><th>What you need to see</th><th>Trigger</th><th>Wrong if</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Continuation short</strong></td><td>Balance at a level, POC lost, open interest still high, thin area below</td><td>The retest of the POC from underneath fails</td><td>Price gets back above the POC</td></tr>
            <tr><td><strong>Continuation long</strong></td><td>Open interest flushed, quiet low, POC reclaimed, thin area above</td><td>The retest of the POC from above holds</td><td>Price loses the POC again</td></tr>
            <tr><td><strong>Reversal</strong></td><td>The biggest liquidation spike in hours, price stops moving despite the aggression, stacked orders nearby</td><td>Reclaim of the swept level</td><td>Price goes beyond the wick</td></tr>
          </tbody>
        </table>
      </div>
      {open ? (
        <>
          <div className="grid">
            <section className="card">
              <h3>Exit</h3>
              <ul className="plain-list">
                <li>A liquidation spike in your favour, into a heavy wall.</li>
                <li>For a rally off a flush, the first target is the shelf the breakdown started from.</li>
              </ul>
            </section>
            <section className="card">
              <h3>Who is driving</h3>
              <ul className="plain-list">
                <li>A move on rising open interest has new money behind it.</li>
                <li>A move on falling open interest is people closing. It runs out.</li>
                <li>Price falling while open interest climbs is new shorts pressing. No bounce trade until they get squeezed.</li>
                <li>Price rising on flat CVD is sellers stepping away, not demand.</li>
              </ul>
            </section>
            <section className="card">
              <h3>Walls</h3>
              <ul className="plain-list">
                <li>A tight range with higher lows under a wall, with the squeeze still ahead, is the version that breaks.</li>
                <li>A loose range after the squeeze has already happened is the version that fails.</li>
                <li>Stacked bids are not support until they are hit and hold. They can vanish.</li>
              </ul>
            </section>
            <section className="card">
              <h3>Liquidation spikes</h3>
              <ul className="plain-list">
                <li>The big liquidation candle is often a scalp, not the low.</li>
                <li>The durable low often comes later, on a quieter lower low after open interest has reset.</li>
                <li>Sometimes it is a straight V. Take the scalp either way.</li>
              </ul>
            </section>
          </div>
          <div className="callout">
            <span className="label">Limits</span>
            <p>
              These rules come from a small set of hand-picked moves. "Lost the POC" fails often inside a range. Log every
              trade of each setup in the journal before you trust it.
            </p>
          </div>
        </>
      ) : (
        <Paywall what="playbook" />
      )}
    </div>
  );
}
