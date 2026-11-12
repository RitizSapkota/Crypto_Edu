import Link from "next/link";
import { checkoutUrl, waitlistUrl } from "@/lib/access";

/** The one place that decides where "become a member" goes. */
export function MemberButton({ label = "Become a member" }: { label?: string }) {
  if (checkoutUrl) {
    return <a className="btn btn-primary" href={checkoutUrl}>{label}</a>;
  }
  if (waitlistUrl) {
    return <a className="btn btn-primary" href={waitlistUrl} target="_blank" rel="noopener">Join the waitlist</a>;
  }
  return <Link className="btn btn-primary" href="/pricing">Membership opens soon</Link>;
}
