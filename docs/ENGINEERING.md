# Source audit and implementation notes

## Repository audit and component hierarchy

The repository originally used Next.js 14, Tailwind, React Three Fiber models, particles, audio, and separate presentation pages. The first pass removed that presentation and obsolete assets. This pass keeps Next.js App Router, React 19, CSS modules, self-hosted Inter, and a single semantic page, then adds small interactive areas for theme control and video preview; the topology illustration and thumbnails render on the server. No animation framework was added to the portfolio.

```text
src/app/layout.js                 metadata + ThemeProvider
src/app/page.js                   Header → Hero → Projects → Experience → About → Footer
src/app/globals.css               light/dark tokens, reset, focus, reduced motion
src/components/ThemeProvider.jsx  next-themes before-paint theme bootstrap
src/components/ThemeToggle.jsx    persisted binary toggle, initial system preference
src/components/TopologyIllustration.jsx server-rendered SVG surface
src/components/VideoDemo.jsx      opt-in iframe in native dialog
src/components/ProjectThumbnail.jsx optimized image with CSS hover
src/components/Projects.jsx       server-rendered project content and disclosures
src/components/Portfolio.module.css
src/data/portfolio.js             source-derived project records and evidence links
public/projects/chess.png         upstream Chess preview, converted to PNG
public/projects/ecox.png          real live login capture
public/projects/ai_sre.png        real local dashboard capture
public/projects/autoflow.png      user-supplied thumbnail
public/projects/echo.png          user-supplied thumbnail
public/projects/campus-chatter.png real local landing capture
public/fonts/                    Inter variable + license
scripts/check-project-assets.mjs  image signature / dimensions / hashes
docs/source-revisions.json        pinned source commits
```

## What the source establishes

Each project includes links to the exact inspected commit. This is code inspection, not a production architecture certification or runtime load test.

- **EcoX / EcoNFT:** ERC721URIStorage and an owner-managed minter list; IPFS metadata via Pinata; Gemini certificate-field extraction; Ethers receipt wait; Prisma **PostgreSQL**, not MongoDB; custom ownership/credit mappings; retirement and reward bookkeeping; Chainlink-compatible auction upkeep. The mint endpoint calls off-chain refresh without awaiting it. Chain and database updates are not atomic, and extraction does not itself establish certificate authenticity.
- **AutoFlow / Zapier:** `primary_backend`, `hooks`, `processor`, and `worker`. Transactional ZapRun/Outbox insertion, ten-row polling every three seconds, Kafka `zap-events`, manually committed stage events, SMTP actions, and Solana **testnet** transfers. The four checked Prisma schemas describe the same relations (one differs only by a leading blank line). There is no shared schema package or automated synchronization step. Publication is not awaited before outbox deletion; worker failure paths commit offsets. Do not claim exactly-once delivery or guaranteed retries. Placeholder parsing walks dotted payload properties; it is not AST parsing.
- **AI_SRE:** MongoDB via Prisma; Redis/BullMQ scheduling at 15s, concurrency 10, three attempts and exponential backoff. Prometheus checks fetch five probe series concurrently. Two-of-three probe failures, HTTP 5xx, or two >3σ and >2s latency samples gate LLM confirmation. A 0.7 confidence threshold and five-minute cooldown gate incident creation. MiniLM embeddings and Chroma Cloud provide deduplicated multi-query retrieval. The patcher applies search/replace edits to a cloned repo, validates target paths, commits a patch branch, records health-check output, and attempts push/PR creation. No isolated sandbox/build/test evaluation was found; the recorded health check does not gate PR creation. Configured concurrency and intervals are not measured throughput.
- **Campus Chatter:** reCAPTCHA checks, academic-domain classification, verification emails, JWT cookies, Redis rate limits, Prisma/PostgreSQL community/post/comment/like relations, cached paginated feeds, and in-memory Fuse search. Academic classification is not an exclusive sign-up gate: non-academic emails can register. Domain classification does not by itself prove mailbox control. Feed TTL is 600s; search TTL is 300s.
- **Echo:** Next.js-generated widget script; prefixed IDs/styles; CORS JSON submissions keyed by project UUID; PostgreSQL persistence; session/owner checks on dashboard reads; TanStack Query paginated HTTP retrieval; Gemini 2.5 Flash sentiment action. No WebSocket/SSE transport, automatic sentiment stream, or general event-analytics SDK was found.

The profile-linked Campus Chatter and Echo domains did not resolve during the CLI link check; they are labeled “Website”, not verified live deployments. EcoX's login was loaded and captured successfully. No live AI_SRE deployment was supplied. AutoFlow links to the explicit walkthrough and repository.

## Theme design

`next-themes` applies a class to `<html>` before hydration. `defaultTheme="system"` follows the OS until an explicit choice is persisted as `sc-theme`; the toggle then switches light/dark. The root suppresses the expected theme-class hydration mismatch. Icons are controlled by the root class, avoiding a mounted-only placeholder. With JavaScript disabled, the CSS light palette remains usable. Theme colors come from CSS variables, including panel, text, border, highlight, and SVG colors. Transitions are 180ms and are disabled by reduced-motion preference.

## Decorative rendering and performance

The hero surface is an inline, server-rendered SVG using the theme mesh color. Thumbnails use Next/Image with intrinsic dimensions, responsive sizes, and native lazy loading. A CSS scale runs only on fine-pointer hover when reduced motion is not requested. Three.js has been removed from the dependency tree. There are no decorative canvases, GPU texture uploads, frame schedulers, pointer/scroll listeners, or observers.

Compared with the same six-project production build before the rendering change, emitted JavaScript chunks fell from 1,338,998 to 593,793 bytes (55.7%), or 369,851 to 183,523 bytes when individually gzipped (50.4%). These are build-artifact totals, including lazy chunks, rather than initial network transfer or a measured frame-rate improvement.

Body text is 17px, project summaries 16px, and supporting text was raised by 2px. Theme-aware backgrounds highlight the introduction and technology tags; project headings and metrics use the accent color. Action groups wrap on narrow screens.

## What remains the same

Resume, experience, education, and achievements use the previous resume integration. The supplied PDF is bundled at `public/resume.pdf`; the CTA requests a direct download. Contact links use `somnathchattaraj5@gmail.com`. Legacy page routes still redirect to sections.

## Chess source audit

Chess is pinned in `source-revisions.json`. Its Node.js server validates rules with chess.js, owns online clocks, and handles authenticated WebSockets, matchmaking, and private invite rooms. PostgreSQL stores accounts, sessions, and snapshots. Moves are persisted before broadcasting, and clocks are checkpointed each second. Startup recovery charges downtime. Process-local coordination requires a single API replica; no horizontal scalability or rated-competition guarantee is claimed. The thumbnail comes from the repository preview rather than a newly verified production deployment.
