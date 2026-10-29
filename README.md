# Somnath Chattaraj — Editorial engineering portfolio

Next.js 16 / React 19 portfolio with light and dark themes, a restrained Three.js wireframe, source-derived project descriptions, real project screenshots, and an accessible video preview.

## Run

Node.js 20.9+ is required; Node.js 22 LTS or newer is recommended.

```sh
npm ci
npm run assets:check
npm run dev
```

Open http://localhost:3000. Production: `npm run build`, then `npm start`.

## Maintain

- `src/data/portfolio.js`: identity, resume URL, projects, links, technologies, and evidence.
- `src/components/Experience.jsx` / `About.jsx`: experience, education, achievements.
- `src/components/ThemeProvider.jsx` / `ThemeToggle.jsx`: theme persistence and controller.
- `src/components/TopologyCanvas.jsx`: geometry, input damping, theme colors, lifecycle.
- `src/components/VideoDemo.jsx`: native modal with opt-in YouTube playback.
- `src/components/HoverThumbnail.jsx`: subtle textured-plane Three.js hover effect for all five thumbnails.
- `src/app/globals.css`: light/dark design tokens and accessibility primitives.
- `src/components/Portfolio.module.css`: component layouts, responsive rules, media frames.
- `src/app/layout.js`, `opengraph-image.js`, `icon.svg`: SEO and social identity.
- `profile.site`: canonical production domain; robots and sitemap derive from it.

Read `docs/ENGINEERING.md` for the architecture, component hierarchy, and source audit. Read `docs/ASSETS.md` to rebuild AI_SRE, refresh screenshots, and validate image assets. Source revisions are pinned in `docs/source-revisions.json`.

All five project descriptions are derived from inspected source. EcoX is Prisma/PostgreSQL off-chain; AI_SRE is Prisma/MongoDB. The portfolio distinguishes implemented mechanisms from production guarantees, and configuration values from measured performance. The two additional profile website domains could not be verified reachable during the link check.

The resume CTA downloads the supplied PDF from `public/resume.pdf` as `Somnath-Chattaraj-Resume.pdf`. Replace that file when updating your resume. Contact links use somnathchattaraj5@gmail.com. No certifications were listed, so none were invented.

## Deployment

Use the normal Next.js preset, `npm ci`, and `npm run build` on your existing provider. Set a supported Node.js version. No environment variables or account credentials are needed for the portfolio. Next.js redirects preserve `/about`, `/projects`, and `/contact`. `/resume.pdf` serves the bundled resume directly. This uses a Next.js server deployment, not static export.
