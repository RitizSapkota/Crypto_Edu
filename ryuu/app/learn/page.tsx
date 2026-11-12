import type { Metadata } from "next";
import Link from "next/link";
import { getLessonGroups } from "@/lib/lessons";

export const metadata: Metadata = { title: "Learn" };

export default function LearnPage() {
  const groups = getLessonGroups();
  let n = 0;
  return (
    <div className="wrap">
      <header className="page-head">
        <span className="label">Course</span>
        <h1>Learn</h1>
        <p>
          Work through the lessons in order the first time. Lessons marked free are open to everyone. The rest are for
          members.
        </p>
      </header>
      <div className="lesson-groups" style={{ paddingBottom: 72 }}>
        {groups.map((g) => (
          <section key={g.group} className="stack" style={{ gap: 12 }}>
            <h2 style={{ fontSize: 20 }}>{g.group}</h2>
            <div className="lesson-list">
              {g.lessons.map((l) => {
                n += 1;
                return (
                  <Link key={l.slug} href={`/learn/${l.slug}`} className="lesson-row">
                    <span className="no">{String(n).padStart(2, "0")}</span>
                    <span className="t">
                      <span>{l.title}</span>
                      <small>{l.summary}</small>
                    </span>
                    <span className={`tag ${l.access}`}>{l.access === "free" ? "Free" : "Member"}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
