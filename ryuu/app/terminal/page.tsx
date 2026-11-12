import type { Metadata } from "next";
import { Roadmap } from "@/components/Roadmap";

export const metadata: Metadata = { title: "Terminal" };

export default function TerminalPage() {
  return (
    <div className="wrap stack" style={{ gap: 30, paddingBottom: 72 }}>
      <header className="page-head">
        <span className="label">In development</span>
        <h1>The Ryuu terminal</h1>
        <p>
          A charting terminal built around the tools the course teaches: profiles, delta, footprint, the order book and
          liquidations. It ships in stages, and each stage is usable on its own.
        </p>
      </header>
      <Roadmap />
      <div className="prose">
        <h3>Why stages</h3>
        <p>
          The hard part of a terminal is not drawing charts. It is the data: live trades from the exchange, order book
          depth recorded around the clock, and the history to show it later. Profiles and delta only need trades. The
          heatmap needs a recorder running all day, so it comes last.
        </p>
      </div>
    </div>
  );
}
