# Aljoša Oblak — Personal & Business Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://aljosaoblak.vercel.app)

Professional one-page website for **Aljoša Oblak** — entrepreneur, web & AI developer, and digital pioneer from Premantura, Istria, Croatia.

## About

This site covers three business ventures:

| Venture | Location | Description |
|---|---|---|
| **Cyber Internet & Beyond** | Flanatička 14, Pula | Iconic internet cafe, est. 2000 |
| **Web Development Agency Premantura** | Brig 11, Premantura | Web & AI solutions for Istria |
| **Dunja Apartments** | Brig 11, Premantura | Beachfront holiday apartments |

**Address:** Brig 11, Premantura, 52203 Medulin, Istra, Croatia  
**Phone:** +385 95 518 6313  
**Email:** aljosa@oblak.hr

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4 + custom design tokens
- **Fonts:** Playfair Display · DM Sans · JetBrains Mono
- **Maps:** Google Maps (via Manus proxy)
- **Build:** Vite 7
- **Deploy:** Vercel

## SEO & AIO Strategy

- **Target keywords:** `izrada web stranica Premantura`, `web agencija Istra`, `AI web rješenja Istra`, `Cyber Internet Beyond Pula`, `Dunja Apartments Premantura direktna rezervacija`
- **Structured data:** JSON-LD — Person + 3× LocalBusiness + FAQPage
- **AIO (AI Overview):** FAQ schema, entity-rich content, robots.txt with AI crawler permissions
- **Technical:** sitemap.xml, robots.txt, OG/Twitter meta, hreflang hr/en, geo meta

## Design Philosophy

**Mediterranean Brutalism meets Digital Craft** — Istrian limestone coast aesthetics fused with sharp digital geometry.

- Limestone off-white background (`oklch(0.97 0.012 82)`)
- Adriatic navy text (`oklch(0.18 0.06 245)`)
- Electric cyan accents (`oklch(0.78 0.14 195)`)
- Sunset gold ornaments (`oklch(0.72 0.12 75)`)
- Diagonal clip-path section dividers
- Scroll-reveal animations

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect the GitHub repository to Vercel for automatic deployments on push.

## Branch Strategy

- `main` — production-ready code
- `develop` — integration branch
- `feature/*` — individual features

## License

© 2026 Aljoša Oblak. All rights reserved.
