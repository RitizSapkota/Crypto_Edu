import type { Metadata } from "next";
import { Journal } from "@/components/Journal";

export const metadata: Metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <div className="wrap stack" style={{ gap: 26, paddingBottom: 72 }}>
      <header className="page-head">
        <span className="label">Journal</span>
        <h1>Find out what actually works for you</h1>
        <p>
          Log every trade by setup. The journal measures each result in R, the profit divided by what you risked, so a
          $50 win on a $10 risk and a $500 win on a $100 risk count the same.
        </p>
      </header>
      <Journal />
    </div>
  );
}
