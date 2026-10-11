# Chaudharyaijaz

Official website of **Aijaz Ahmed Chaudhary** — former MNA, Pakistan Tehreek-e-Insaf.
Next.js 16 (App Router, Cache Components) · Tailwind CSS 4 · Motion (Framer Motion).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Structure

```
app/
  layout.tsx            fonts (Montserrat, Inter, Noto Nastaliq Urdu), SEO metadata
  page.tsx              composes every section
  globals.css           PTI design tokens: pti-green-*, pti-red-*, gold-*
  actions.ts            newsletter / volunteer Server Action
  api/revalidate/       webhook to refresh social feeds instantly
components/
  Navbar.tsx            sticky nav, scroll-spy, mobile drawer
  HeroSlider.tsx        3-banner autoplay crossfade, arrows, dots, keyboard
  Biography.tsx · Vision.tsx · Gallery.tsx (lightbox) · Events.tsx · News.tsx
  MediaCenter.tsx       Live Updates wall
  social/               YouTube, Facebook, X, Instagram integrations
lib/
  site.ts               ALL copy & data (bio, vision, events, news, contacts)
  social.ts             cached server fetchers for YouTube + Instagram
public/images/          cropped/optimised photos (originals in assets/)
```

## Live social feeds

| Network   | How it works                                         | Setup                         |
|-----------|------------------------------------------------------|-------------------------------|
| YouTube   | Channel RSS fetched on the server, cached ~5 min      | None — works out of the box   |
| Facebook  | Official Page Plugin, lazy-loaded on scroll           | None                          |
| X         | Official timeline widget, lazy-loaded; follow-card fallback if X blocks it | None   |
| X (pinned)| `react-tweet` server-rendered posts                   | Add IDs in `components/social/PinnedTweets.tsx` |
| Instagram | Instagram Graph API, cached ~5 min                    | Set `INSTAGRAM_ACCESS_TOKEN` (steps in `lib/social.ts`) |

## Environment variables

| Name                     | Purpose                                                       |
|--------------------------|---------------------------------------------------------------|
| `NEWSLETTER_WEBHOOK_URL` | Where sign-ups are POSTed (Zapier/Make → Mailchimp, Sheets…). Sign-ups are refused until set. |
| `INSTAGRAM_ACCESS_TOKEN` | Long-lived Instagram token for the live grid.                 |
| `REVALIDATE_SECRET`      | Secret header for `POST /api/revalidate?tag=youtube`.         |

## Before launch

Search for `TODO(client)` — real event dates, press releases, featured X posts, and
confirmation that the contact numbers/email are current.
