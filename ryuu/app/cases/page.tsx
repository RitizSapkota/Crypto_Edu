import type { Metadata } from "next";
import Link from "next/link";
import { cases, isFreeCase } from "@/lib/cases";

export const metadata: Metadata = { title: "Case library" };

export default function CasesPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <span className="label">Case library</span>
        <h1>Real moves, read step by step</h1>
        <p>
          Bitcoin, October and November. Each case lists what was visible before the move, the tell while it formed, the
          trigger, and where it ended. Levels are read by eye off the charts, so treat them as approximate.
        </p>
      </header>
      <div className="lesson-list" style={{ marginBottom: 72 }}>
        {cases.map((c) => (
          <Link key={c.id} href={`/cases/${c.id}`} className="case-row">
            <span className="d">{c.date}</span>
            <span className="t" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
              <span style={{ fontWeight: 500 }}>{c.name}</span>
              {c.dirs.map((d) => <span key={d} className={`tag ${d}`}>{d}</span>)}
              {isFreeCase(c.id) && <span className="tag free">Free</span>}
            </span>
            <span className="r">{c.range}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
