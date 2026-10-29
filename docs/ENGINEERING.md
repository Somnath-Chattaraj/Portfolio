# Source audit and implementation notes

## Repository audit and component hierarchy

The repository originally used Next.js 14, Tailwind, React Three Fiber models, particles, audio, and separate presentation pages. The first pass removed that presentation and obsolete assets. This pass keeps Next.js App Router, React 19, CSS modules, self-hosted Inter, and a single semantic page, then adds small interactive areas for theme control, the topology canvas, video preview, and thumbnail hover. No animation framework was added to the portfolio.

```text
src/app/layout.js                 metadata + ThemeProvider
src/app/page.js                   Header → Hero → Projects → Experience → About → Footer
src/app/globals.css               light/dark tokens, reset, focus, reduced motion
src/components/ThemeProvider.jsx  next-themes before-paint theme bootstrap
src/components/ThemeToggle.jsx    persisted binary toggle, initial system preference
src/components/TopologyCanvas.jsx lazy Three.js surface and lifecycle cleanup
src/components/VideoDemo.jsx      opt-in iframe in native dialog
src/components/HoverThumbnail.jsx textured-plane hover, image fallback
src/components/Projects.jsx       server-rendered project content and disclosures
src/components/Portfolio.module.css
src/data/portfolio.js             source-derived project records and evidence links
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

`next-themes` applies a class to `<html>` before hydration. `defaultTheme="system"` follows the OS until an explicit choice is persisted as `sc-theme`; the toggle then switches light/dark. The root suppresses the expected theme-class hydration mismatch. Icons are controlled by the root class, avoiding a mounted-only placeholder. With JavaScript disabled, the CSS light palette remains usable. Theme colors come from CSS variables, including panel, text, border, and canvas colors. Transitions are 180ms and are disabled by reduced-motion preference.

## WebGL design and lifecycle

The illustration is a deterministic 22 × 16 subdivided mathematical surface rendered as line segments. Three.js is dynamically imported after IntersectionObserver reports visibility. It uses no textures, lights, postprocessing, particles, or continuous idle rotation.

Pointer and scroll update small rotation targets; time-based exponential damping settles them. The frame scheduler is limited to approximately 60 updates/second and stops after settling, while offscreen, while the document is hidden, or when paused/reduced motion is active. Device pixel ratio is capped at 2. ResizeObserver adjusts camera aspect and output size. A theme-class MutationObserver changes material and clear colors. A static SVG remains available if WebGL is unavailable. Narrow layouts hide the optional aside, so its Three.js chunk does not initialize there.

Unmount cancels the animation frame, disconnects observers, removes pointer/scroll/visibility/media-query/context listeners, disposes geometry/material/renderer, clears the scene, releases the WebGL context, and removes the canvas. Context loss switches to the fallback until restoration. No 60fps guarantee is claimed on arbitrary hardware.

## What remains the same

Resume, experience, education, and achievements use the previous resume integration. The supplied PDF is bundled at `public/resume.pdf`; the CTA requests a direct download. Contact links use `somnathchattaraj5@gmail.com`. Legacy page routes still redirect to sections.

## Thumbnail hover rendering

All five project captures use HoverThumbnail. The real Next/Image remains the accessible baseline. Only a mouse hover imports Three.js and loads the already selected responsive image as an sRGB texture onto a plane. Pointer coordinates produce a maximum roughly 3–4 degree tilt and a 3.5% inset, with exponential damping and an approximately 60Hz update cap. Rendering stops when settled. Leaving eases back to the flat image and disposes the texture, geometry, material, renderer, and context. Offscreen/hidden-document states release it immediately. Resize and intersection observers, media-query listeners, pointer listeners, and pending async work are cleaned up on unmount. Touch/coarse interaction and reduced-motion preference retain the static image. AutoFlow retains a separate accessible walkthrough button below its thumbnail.
