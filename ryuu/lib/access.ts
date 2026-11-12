/**
 * Membership access.
 *
 * Stage 1 has no accounts yet. Member content is locked unless
 * RYUU_OPEN_ACCESS=true, which is meant for a private team preview deploy.
 * When accounts and payments land (see docs/ROADMAP.md), replace
 * hasMemberAccess() with a check against the signed-in member.
 */
export function hasMemberAccess(): boolean {
  return process.env.RYUU_OPEN_ACCESS === "true";
}

export const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || "";
export const waitlistUrl = process.env.NEXT_PUBLIC_WAITLIST_URL || "";
