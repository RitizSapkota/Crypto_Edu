import type { Metadata } from "next";

export const metadata: Metadata = { title: "Risk disclaimer" };

export default function DisclaimerPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <header className="page-head">
        <span className="label">Legal</span>
        <h1>Risk disclaimer</h1>
      </header>
      <div className="prose">
        <p>
          Ryuu Capital provides educational material about how markets work. Nothing on this site is financial, investment,
          tax or legal advice, and nothing here is a recommendation to buy, sell or hold any asset.
        </p>
        <p>
          Cryptoassets are high risk and largely unregulated. Trading them, and especially trading derivatives with
          leverage, can lose you all the money you put in, and quickly. Research cited in this course found that the large
          majority of people who day trade lose money.
        </p>
        <p>
          The examples and case studies describe past market moves. Past performance is not a reliable indicator of future
          results. Levels and figures in the case studies are read from charts and may be approximate.
        </p>
        <p>Only trade with money you can afford to lose, and consider getting independent advice.</p>
        <blockquote>
          <p>
            <strong>Placeholder.</strong> This page is a starting draft, not legal text. Have it, the terms of service and the
            privacy policy reviewed before Ryuu Capital takes payments from the public.
          </p>
        </blockquote>
      </div>
    </div>
  );
}
