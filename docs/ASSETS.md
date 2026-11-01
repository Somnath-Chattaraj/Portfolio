# Project captures and refresh workflow

The portfolio already includes all six thumbnail assets. They are genuine screenshots, not generated mockups. Browser chrome is drawn by the portfolio component around the unmodified screen image.

| Asset | Source | Capture state |
| --- | --- | --- |
| `public/projects/chess.png` | Chess repository `docs/preview.png` | Repository preview, 1280 × 1062; JPEG source converted to PNG |
| `public/projects/ecox.png` | https://ecox.wedevs.xyz/login | Live authentication screen, 1280 × 800 |
| `public/projects/ai_sre.png` | Locally built AI_SRE `web/`, `/dashboard` | 1440 × 950, API disconnected, no seeded telemetry |
| `public/projects/echo.png` | User-supplied PNG | Original image, 2814 × 1608 |
| `public/projects/autoflow.png` | User-supplied PNG | Original image, 2472 × 1456 |
| `public/projects/campus-chatter.png` | Locally built Campus Chatter `/homepage` | 1440 × 950, public landing page |

The original five captures date to 29 October 2026. The Chess repository preview was added on 1 November 2026. See `source-revisions.json` for inspected repository commits. The AI_SRE dashboard's own default “Connected”/“AI Active” labels are upstream UI text and are not verified service health; the portfolio caption explicitly identifies the capture as disconnected. No synthetic traces or performance charts were added.

## Build and capture AI_SRE yourself

In a separate folder, clone the project, select the revision from `source-revisions.json`, then run:

```sh
git clone https://github.com/Somnath-Chattaraj/AI_SRE.git
cd AI_SRE
git checkout <AI_SRE revision from docs/source-revisions.json>
cd web
npm install
npm run build
npm start
```

Open http://localhost:3001/dashboard. The existing `start` script uses port 3001. At the inspected revision, `output: standalone` makes Next.js print a warning about `next start`; it still served successfully for this capture. For standalone deployment use the generated standalone server and copy its public/static assets per Next.js documentation. The source also sets `typescript.ignoreBuildErrors: true`; a successful upstream build does not verify its TypeScript correctness. These settings were not changed in the project being showcased.

For a screenshot, open browser developer tools, set a 1440 × 950 desktop viewport, and use the browser's **Capture screenshot** command. Save the actual PNG as the portfolio's `public/projects/ai_sre.png`. Keep the current caption unless you connect an actual backend. For a backend-connected capture, use AI_SRE's documented environment configuration for MongoDB, Redis, Prometheus/Blackbox, Chroma Cloud, and its LLM provider. Set `NEXT_PUBLIC_API_URL` before building the web app. Do not use the portfolio on port 3000 as the AI_SRE API.

A dashboard-only capture requires no database, signing key, or GitHub token. Running the full auto-remediation pipeline can create branches/PRs when configured; that pipeline was not executed for this portfolio task.

## Refresh EcoX

Open https://ecox.wedevs.xyz/login at 1280 × 800 and use the browser's Capture screenshot command. Save as `public/projects/ecox.png`. The existing capture is the public authentication screen. A dashboard screenshot requires an authorized signed-in session; no account was created and no credentials were entered for this capture.

Update imageWidth/imageHeight and capture labels in `src/data/portfolio.js` if your screenshot dimensions or state change. Avoid embedding account identifiers or private operational data in screenshots.

## Validate assets and rebuild

From the portfolio directory:

```sh
npm run assets:check
npm run lint
npm run build
npm run dev
```

`assets:check` validates all six PNG signatures, checks desktop capture dimensions, and prints SHA-256 hashes. Next/Image serves optimized versions at responsive sizes. The original PNGs remain available at the requested paths.

## AutoFlow video

The video card loads no YouTube frame until clicked. It opens a native modal dialog using the privacy-enhanced `youtube-nocookie.com` embed for `30KZ1txxvWY`. Escape, the close button, and backdrop click dismiss the dialog; dismissal removes the iframe and restores trigger focus. The source YouTube link remains available if embedding is blocked by browser/network policy or the video owner.

## Build and refresh Campus Chatter

The local capture uses the repository's actual Header landing component at `/homepage`. The original clone needed compatibility fixes: pin Tailwind 3.4.18 for its Tailwind 3/PostCSS configuration, remove an accidental TypeScript generic in a `.jsx` useRef call, and skip Firebase initialization when optional public Firebase configuration is absent. A three-second timeout lets the existing user lookup finish in a signed-out state when the backend is unavailable. These changes affect only the research checkout used to build the capture. The reproducible patch is included at `docs/campus-capture.patch`. No fake API data or authentication credentials were supplied.

```sh
git clone https://github.com/Somnath-Chattaraj/Campus-Chatter.git
cd Campus-Chatter
git checkout <Campus-Chatter revision from source-revisions.json>
git apply /absolute/path/to/Portfolio/docs/campus-capture.patch
cd frontend
npm install
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Open http://127.0.0.1:4173/homepage and capture a 1440 × 950 screenshot as `public/projects/campus-chatter.png`. The public page renders without the backend; signed-in feeds and authentication require the project's normal service configuration. Keep the supplied Echo/AutoFlow images as provided unless replacing them with new approved captures.

## Hover effect

Thumbnails use server-rendered Next/Image and a small CSS scale on fine-pointer hover. Touch and reduced-motion preferences retain the static image. No WebGL context or duplicate texture is allocated. The video dialog remains a separate button under AutoFlow’s image.

## Google logo

`public/brands/google-g.png` is the unmodified full-color G downloaded from Google’s official [Partner Marketing Hub](https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/). It replaces the text placeholder beside the Google internship. The mark remains full-color on a white tile in both themes.
