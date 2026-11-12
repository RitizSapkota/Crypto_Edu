import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases, getCase, isFreeCase } from "@/lib/cases";
import { hasMemberAccess } from "@/lib/access";
import { Paywall } from "@/components/Paywall";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  return c ? { title: `${c.date}: ${c.name}` } : {};
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const open = isFreeCase(c.id) || hasMemberAccess();
  const shots = open ? c.shots : c.shots.slice(0, 1);
  return (
    <div className="wrap stack" style={{ gap: 26, paddingBlock: "40px 72px" }}>
      <div className="stack" style={{ gap: 10 }}>
        <Link href="/cases" className="label" style={{ textDecoration: "none" }}>← Case library</Link>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>{c.date}: {c.name}</h1>
        <div className="actions" style={{ gap: 8 }}>
          {c.dirs.map((d) => <span key={d} className={`tag ${d}`}>{d}</span>)}
          <span className="num muted" style={{ fontSize: 14 }}>{c.range} · {c.tf}</span>
        </div>
      </div>
      {shots.map(([src, cap]) => (
        <figure key={src}>
          <a className="shot" href={src} target="_blank" rel="noopener" aria-label={`Open full size: ${cap}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={cap} loading="lazy" />
          </a>
          <figcaption>{cap} Opens full size.</figcaption>
        </figure>
      ))}
      {open ? (
        <>
          <div className="read-grid">
            {c.read.map(([k, v]) => (
              <div key={k}>
                <span className="label">{k}</span>
                <p>{v}</p>
              </div>
            ))}
          </div>
          <div className="callout">
            <span className="label">Lesson</span>
            <p>{c.lesson}</p>
          </div>
        </>
      ) : (
        <Paywall what="case" />
      )}
    </div>
  );
}
