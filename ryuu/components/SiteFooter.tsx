import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-row">
          <span>© {new Date().getFullYear()} Ryuu Capital</span>
          <nav className="foot-links" aria-label="Footer">
            <Link href="/learn">Learn</Link>
            <Link href="/pricing">Membership</Link>
            <Link href="/disclaimer">Risk disclaimer</Link>
          </nav>
        </div>
        <p className="disclaimer">
          Ryuu Capital provides education only. Nothing on this site is financial advice or a recommendation to buy or sell
          any asset. Trading crypto derivatives with leverage carries a high risk of losing all the money you put in. Most
          people who day trade lose money. Read the <Link href="/disclaimer">risk disclaimer</Link>.
        </p>
      </div>
    </footer>
  );
}
