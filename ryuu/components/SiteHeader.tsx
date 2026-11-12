"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "./Logo";

const LINKS = [
  { href: "/learn", label: "Learn" },
  { href: "/cases", label: "Cases" },
  { href: "/playbook", label: "Playbook" },
  { href: "/journal", label: "Journal" },
  { href: "/terminal", label: "Terminal" },
];

export function SiteHeader() {
  const path = usePathname() || "/";
  return (
    <header className="site-head">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Ryuu Capital home">
          <LogoMark />
          <span className="brand-word">RYUU<small>CAPITAL</small></span>
        </Link>
        <nav className="nav" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path.startsWith(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <Link href="/pricing" className="cta">Membership</Link>
        </nav>
      </div>
    </header>
  );
}
