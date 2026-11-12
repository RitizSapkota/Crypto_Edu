import Link from "next/link";
import { MemberButton } from "./MemberButton";

export function Paywall({ what = "lesson" }: { what?: string }) {
  return (
    <aside className="paywall" aria-label="Members only">
      <span className="label">Members only</span>
      <h3>The rest of this {what} is for members</h3>
      <p className="muted">
        Members get all seventeen lessons, the full case library with annotated charts and the playbook.
      </p>
      <div className="actions">
        <MemberButton />
        <Link className="btn btn-ghost" href="/learn">See the free lessons</Link>
      </div>
    </aside>
  );
}
