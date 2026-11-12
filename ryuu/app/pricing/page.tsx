import type { Metadata } from "next";
import Link from "next/link";
import { MemberButton } from "@/components/MemberButton";

export const metadata: Metadata = { title: "Membership" };

export default function PricingPage() {
  return (
    <div className="wrap stack" style={{ gap: 30, paddingBottom: 72 }}>
      <header className="page-head">
        <span className="label">Membership</span>
        <h1>Learn free. Join when it clicks.</h1>
        <p>Start with the free lessons. Membership unlocks the full course, the case library and the playbook.</p>
      </header>
      <div className="plans">
        <section className="plan">
          <span className="label">Free</span>
          <div className="price">£0</div>
          <ul>
            <li>Reading a profile</li>
            <li>Dalton 1: the auction</li>
            <li>What holds up: the evidence on intraday trading</li>
            <li>One full case study</li>
            <li>The trade journal</li>
          </ul>
          <Link className="btn btn-ghost" href="/learn">Start learning</Link>
        </section>
        <section className="plan featured">
          <span className="label">Member</span>
          <div className="price">Founding price at launch</div>
          <ul>
            <li>All 17 lessons: profiles, Market Profile, order flow, tools</li>
            <li>The full case library with annotated charts</li>
            <li>The playbook</li>
            <li>New cases as markets move</li>
            <li>Early access to the Ryuu terminal as it ships</li>
          </ul>
          <MemberButton />
        </section>
      </div>
      <p className="muted" style={{ maxWidth: "70ch", fontSize: 14 }}>
        Ryuu Capital is education only. It is not financial advice, and it does not promise profits. Read the{" "}
        <Link href="/disclaimer">risk disclaimer</Link> before you join.
      </p>
    </div>
  );
}
