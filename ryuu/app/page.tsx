import Link from "next/link";
import { ProfileSvg } from "@/components/Diagrams";
import { MemberButton } from "@/components/MemberButton";
import { getLessonGroups } from "@/lib/lessons";
import { cases } from "@/lib/cases";
import { Roadmap } from "@/components/Roadmap";

const GROUP_BLURB: Record<string, string> = {
  Profiles: "Read time and volume by price. Value, nodes, gaps and single prints.",
  "Market Profile (Dalton)": "The auction framework: day types, opens, value migration, and a routine adapted to bitcoin's sessions.",
  "Order flow": "Tape states, footprint anomalies, liquidation fades, and the range, impulse, range model.",
  Tools: "Bars that close on range instead of time, and indicators used as evidence, not signals.",
  "Reality check": "What research says about intraday trading, and how to measure your own edge.",
};

export default function Home() {
  const groups = getLessonGroups();
  const lessonCount = groups.reduce((n, g) => n + g.lessons.length, 0);
  const featured = cases.find((c) => c.id === "nov10")!;
  return (
    <>
      <section className="wrap hero">
        <div className="hero-copy">
          <span className="label">Bitcoin order flow education</span>
          <h1>
            Read the auction, <em>not the indicator.</em>
          </h1>
          <p>
            Market profile, volume, delta and liquidations, taught on real bitcoin charts. Price first, indicators as
            evidence, and every claim checked against the data.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/learn">Start the free lessons</Link>
            <Link className="btn btn-ghost" href="/pricing">See membership</Link>
          </div>
        </div>
        <div className="hero-art">
          <div className="diagram" role="img" aria-label="A market profile showing the point of control, value area and tails">
            <ProfileSvg />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="label">The course</span>
            <h2>{lessonCount} lessons in five parts</h2>
            <p className="muted">Each lesson ends with questions that check you can apply it. Three lessons are free.</p>
          </div>
          <div className="grid">
            {groups.map((g) => (
              <div className="card" key={g.group}>
                <span className="label">{g.lessons.length} lessons</span>
                <h3>{g.group}</h3>
                <p className="muted">{GROUP_BLURB[g.group] ?? ""}</p>
                <Link className="more" href={`/learn/${g.lessons[0].slug}`}>Start with {g.lessons[0].title}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack">
          <div className="section-head">
            <span className="label">Case library</span>
            <h2>Real moves, read step by step</h2>
            <p className="muted">
              Each case shows what was visible before the move, the tell while it formed, the trigger, and where it ended.
              Including the ones where the obvious read failed.
            </p>
          </div>
          <Link href={`/cases/${featured.id}`} className="shot" aria-label={`Open case: ${featured.name}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.shots[0][0]} alt={featured.shots[0][1]} width={2000} height={745} loading="lazy" />
          </Link>
          <div className="actions">
            <Link className="btn btn-ghost" href={`/cases/${featured.id}`}>Read the free case: {featured.name}</Link>
            <Link className="btn btn-ghost" href="/cases">All {cases.length} cases</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="label">No promises</span>
            <h2>Most day traders lose. We start there.</h2>
            <p className="muted">
              In a study of everyone who day traded Brazilian index futures for 300 days or more, 97% lost money. This
              course does not sell a system. It teaches how markets auction, shows where each idea is backed by evidence
              and where it is only folklore, and gives you a journal to find out what works for you.
            </p>
          </div>
          <div className="stat-strip">
            <div><span className="label">Lost money</span><span className="v">97%</span><span className="muted">day traders, 300+ days, Brazil</span></div>
            <div><span className="label">Beat minimum wage</span><span className="v">1.1%</span><span className="muted">same study</span></div>
            <div><span className="label">Free lessons</span><span className="v">3</span><span className="muted">no account needed</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="label">In development</span>
            <h2>The Ryuu terminal</h2>
            <p className="muted">A charting terminal built around the same tools the course teaches, released in stages.</p>
          </div>
          <Roadmap />
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ alignItems: "flex-start" }}>
          <h2>Start with the auction</h2>
          <p className="muted" style={{ maxWidth: "60ch" }}>
            The first Market Profile lesson is free. If it changes how you look at a chart, the rest of the course is for you.
          </p>
          <div className="actions">
            <Link className="btn btn-ghost" href="/learn/dalton-auction">Read Dalton 1: the auction</Link>
            <MemberButton />
          </div>
        </div>
      </section>
    </>
  );
}
