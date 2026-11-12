# Ryuu Capital

Bitcoin order flow education: market profile, volume, delta and liquidations, taught on real charts. This repo is the
public education site. The charting terminal comes later (see `docs/ROADMAP.md`).

Built with Next.js 15 (App Router) and TypeScript. Every page is generated at build time, so it's fast and cheap to host.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, must pass before you deploy
```

## Settings

Copy `.env.example` to `.env.local` and fill in what you need.

| Variable | What it does |
| --- | --- |
| `RYUU_OPEN_ACCESS` | `true` unlocks every member lesson and case. Use it for a private team preview, never on the public site. |
| `NEXT_PUBLIC_CHECKOUT_URL` | Where "Become a member" goes, e.g. a Stripe Payment Link. |
| `NEXT_PUBLIC_WAITLIST_URL` | Used when there's no checkout yet, e.g. a Tally or Google form. |

With neither link set, the button says "Membership opens soon".

**Important:** member content is locked at build time, not behind a login. A locked lesson's full text is left out of
the built page, but case chart images in `public/cases/` can still be opened by direct URL, and any deploy built with
`RYUU_OPEN_ACCESS=true` shows everything to everyone. Real accounts are stage 1b in the roadmap. Until then, a
Payment Link just takes the money; you'd have to give members access by hand (for example a separate preview deploy
with open access and a password in front of it on Vercel).

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel, "Add New Project", pick the repo. Defaults are fine.
3. Add the environment variables above under Settings, Environment Variables.
4. Every push to `main` redeploys.

## Where things live

| Path | What |
| --- | --- |
| `content/lessons/*.md` | The 17 lessons. Frontmatter sets title, group, order, `access: free` or `member`. |
| `content/cases.json` | The case library. Images in `public/cases/`. |
| `lib/cases.ts` | `FREE_CASES` decides which cases are free. |
| `components/Diagrams.tsx` | The SVG diagrams. Put `::diagram profile-anatomy` on its own line in a lesson to insert one. |
| `app/` | The pages. |

Adding a lesson: create `content/lessons/18-something.md` with the same frontmatter as the others and rebuild.

## Before launch: checklist

Don't skip this. Selling trading education to the public has real legal exposure.

- [ ] **Chart screenshots.** The case images are Crayon Charts screenshots. Check their terms allow use in paid
      material, or replace them with charts from a source that does (or with our own terminal once it exists).
- [ ] **No third-party course material.** Nothing from Insilico's guides (Crayons, FSVZO, Tsize) or paid content is in
      this repo. Keep it that way. The Dalton lessons are our own summary of *Mind Over Markets*, not copied text.
- [ ] **Facts to verify.** These came from memory and need checking against the papers before launch:
  - Chague, De Losso & Giovannetti, *Day Trading for a Living?* (2019): 97% lost money, 1.1% earned more than minimum
    wage, among people who day traded Brazilian index futures for 300+ days.
  - Barber, Lee, Liu & Odean on Taiwan day traders.
  - Gao et al. on intraday momentum (the last half hour predicted by the first).
- [ ] **UK financial promotion rules.** If you're in the UK, promoting anything that touches cryptoassets falls under
      the FCA's financial promotion regime. Education that doesn't promote a product is usually outside it, but get
      advice from someone qualified before you take payments.
- [ ] **Legal pages.** `/disclaimer` is a placeholder. You also need terms of service, a privacy policy and a refund
      policy before charging anyone.
- [ ] **Prices.** No price is shown anywhere yet. Set it on `/pricing` when you decide.
