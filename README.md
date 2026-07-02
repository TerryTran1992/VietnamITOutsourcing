# VietnamITOutsourcing 🇻🇳

An independent **directory & rankings platform** for IT outsourcing / software
development companies in Vietnam. Built for global clients who want to research,
compare and shortlist a Vietnamese software partner with confidence.

Inspired by B2B directories like Clutch, GoodFirms and DesignRush — but with a
fully **transparent, open ranking formula** (the *VITO Score*) instead of a
pay-to-rank model.

> ⚠️ **Demo product.** Company profiles combine publicly reported facts with
> illustrative demo data (ratings, review counts, sub-scores, pricing bands).
> Not a substitute for your own due diligence.

## ✨ Features

- **Home** — hero, live top-5 leaderboard, featured ranking, value props.
- **Directory** — search + filter by service, location, team size and rating;
  sort by VITO Score, rating, reviews, size or newest. Filters sync to the URL
  (shareable links).
- **Company profile** — overview, key facts, client-rating breakdown, VITO Score
  breakdown, reviews, tech stack, certifications, awards and similar companies.
- **Compare** — pick up to 4 companies and compare every metric side by side.
- **Methodology** — the full, transparent VITO Score formula and data sources.
- Fully responsive, no external runtime dependencies (fast Vercel deploys).

## 🏆 The VITO Score

A single 0–100 score per company, blending six weighted components:

| Component | Weight |
|---|---|
| Client rating | 32% |
| Quality / schedule / cost / communication | 26% |
| Client retention | 16% |
| Certifications & awards | 12% |
| Verified review volume (log-scaled) | 8% |
| Delivery scale / talent (log-scaled) | 6% |

Headcount and review volume are **log-scaled** so highly-rated specialists aren't
buried by sheer enterprise size. See `src/utils/scoring.js`.

## 🧱 Tech stack

- **React 18** + **React Router 6**
- **Vite 5** build tooling
- Hand-written design system in `src/index.css` (no UI framework / CDN)

## 🚀 Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## ☁️ Deploy to Vercel

This repo is Vercel-ready.

**Option A — Dashboard**
1. Push to GitHub (already configured for `TerryTran1992/VietnamITOutsourcing`).
2. In Vercel → **New Project** → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.
   (Auto-detected — just click **Deploy**.)

**Option B — CLI**
```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

`vercel.json` includes an SPA rewrite so client-side routes (e.g.
`/company/saigon-technology`) resolve correctly on refresh/direct-link.

## 📁 Project structure

```
src/
├── data/
│   ├── companies.js     # company dataset (mock, grounded in public info)
│   └── reviews.js       # illustrative client reviews
├── utils/scoring.js     # VITO Score formula + ranking
├── components/          # Navbar, Footer, CompanyCard, Logo, StarRating
├── pages/               # Home, Directory, CompanyDetail, Compare, Methodology
├── App.jsx              # routes
├── main.jsx
└── index.css            # design system
```

## 🔧 Editing the data

All companies live in `src/data/companies.js`. Add an entry (id, slug, scores,
etc.) and it automatically appears in the directory, gets a VITO Score, and is
rankable/comparable. Reviews go in `src/data/reviews.js` keyed by `slug`.
