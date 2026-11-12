import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, getLessons, previewBody } from "@/lib/lessons";
import { hasMemberAccess } from "@/lib/access";
import { LessonBody } from "@/components/LessonBody";
import { Paywall } from "@/components/Paywall";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLessons().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = getLesson(slug);
  return l ? { title: l.title, description: l.summary } : {};
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const all = getLessons();
  const i = all.findIndex((l) => l.slug === slug);
  const prev = all[i - 1];
  const next = all[i + 1];
  const open = lesson.access === "free" || hasMemberAccess();

  let group = "";
  return (
    <div className="wrap lesson-layout">
      <article className="stack" style={{ gap: 22, minWidth: 0 }}>
        <div className="stack" style={{ gap: 10 }}>
          <span className="label">
            Lesson {i + 1} of {all.length} · {lesson.group}
            {lesson.access === "free" ? " · Free" : ""}
          </span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>{lesson.title}</h1>
          {lesson.lead && <p className="lead">{lesson.lead}</p>}
        </div>
        {open ? (
          <LessonBody md={lesson.body} />
        ) : (
          <>
            <div className="fade-out">
              <LessonBody md={previewBody(lesson.body)} />
            </div>
            <Paywall />
          </>
        )}
        <nav className="pager" aria-label="Lesson navigation">
          {prev ? <Link href={`/learn/${prev.slug}`}>← {prev.title}</Link> : <span />}
          {next ? <Link href={`/learn/${next.slug}`}>{next.title} →</Link> : <Link href="/learn">All lessons</Link>}
        </nav>
      </article>
      <aside className="lesson-side" aria-label="All lessons">
        {all.map((l) => {
          const showGroup = l.group !== group;
          group = l.group;
          return (
            <div key={l.slug} style={{ display: "contents" }}>
              {showGroup && <span className="label grp">{l.group}</span>}
              <Link href={`/learn/${l.slug}`} aria-current={l.slug === slug ? "page" : undefined}>
                {l.title}
              </Link>
            </div>
          );
        })}
      </aside>
    </div>
  );
}
