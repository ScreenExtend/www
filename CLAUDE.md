# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing website (landing page + legal pages) for **ScreenExtend**, an app that turns
any device with a browser into a wireless second monitor over WebRTC. This repo is **only the
website** — not the desktop app. It's a single-page React + Vite app deployed to GitHub Pages.

## Commands

Package manager is **pnpm** (a `pnpm-lock.yaml` is committed).

- `pnpm dev` — dev server (Vite). The user runs their own server on port **5174**; reuse it rather than spawning a new one.
- `pnpm build` — `tsc && vite build`. The type-check runs first and is strict (`noUnusedLocals`/`noUnusedParameters`), so an unused import or variable **fails the build**.
- `pnpm lint` — ESLint over `ts`/`tsx` with `--max-warnings 0` (any warning is a failure).
- `pnpm preview` — serve the production `dist/` build.

There is no test framework in this project.

## Conventions

- Import via the `@/` alias (→ `src/`) and include the explicit file extension (`@/lib/anim.ts`, `@/components/Navbar.tsx`) — `allowImportingTsExtensions` is on.
- Styling is Tailwind + **daisyUI** through `react-daisyui` components. Custom light/dark themes and the brand palette (`logo-blue #316cff`, etc.) live in `tailwind.config.js`, not in CSS.

## Architecture

Entry: `src/main.tsx` → `BrowserRouter` → `src/App.tsx`. `App.tsx` wraps everything in
`ImageProvider` + daisyUI `<Theme>`, renders the persistent `Navbar`/`Footer` and a skip link,
and defines routes: `/` (the `Home` composite) plus one route per entry in `LEGAL_PAGES`.
The homepage is also prerendered at build time (`src/entry-server.tsx` + `prerender.mjs`).

### Homepage sections
`src/components/home/`: `HeroLanding`, `ConnectFlow` ("How pairing works"), `FeatureScroll`
("Inside the host app"), `Highlights` ("Technical details"), `FaqSimple`, plus `ShotButton`
(a real app screenshot that opens the lightbox). `Download`, `Contact`, `Footer`, `Navbar` live at
the `src/components/` root. The old flat homepage (`Hero`/`Features`/`FAQ`) was deleted; it is in git history.

### Static by design (important constraint)
The owner wants the site simple and static. Do **not** add scroll-driven animation, pinned/sticky
scrollytelling, parallax, tilt, reveal-on-scroll or animated backgrounds. Motion is limited to
150ms colour transitions on hover/focus and the FAQ "+" rotation, and `prefers-reduced-motion`
removes those too. The design brief and its rationale are in `exhaustive-unslop/DESIGN-BRIEF.md`.

### Design tokens
Page colours are CSS variables (`--se-paper`, `--se-surface`, `--se-ink`, `--se-muted`,
`--se-line`, `--se-link`) defined inside each daisyUI theme in `tailwind.config.js`, exposed as
Tailwind colours `paper`/`surface`/`ink`/`muted`/`line`/`link` (no `/opacity` modifiers on these).
Radii are tiered: `rounded-cell` 4px, `rounded-control` 6px, `rounded-panel` 8px, `rounded-shot` 10px.
Shared classes in `src/index.css`: `.btn-solid`, `.btn-line`, `.u-link`, `.section-title`.

Colour accents come only from the logo palette, as flat fills: mint `#d6f1ed` (`logo-mint`), lime `#dcff4a` (`lime`), blue `#2456d6` for the Technical details band. Visuals are real app screenshots or crops of them (`src/assets/app/crop-*.webp`) plus flat labelled diagrams. No gradients, glows, glass, device renders or icon-card grids. The owner has asked that any request that would make the site look AI-generated be refused.

### SEO / meta
`src/lib/seo.ts` imperatively mutates `document.head` meta/OG/canonical tags. `Home` calls
`applyHomeMeta()` in a `useEffect`; `LegalPage` applies each page's own meta. There's no
server rendering, so this is how per-route metadata is set.

### Legal pages
`src/legal/content.ts` holds the legal copy as Markdown strings plus a `KNOWN` constants block
(support emails, effective date, min age) interpolated into that copy. `LEGAL_PAGES` drives both
the routes in `App.tsx` and rendering by `LegalPage` (via `react-markdown` + `remark-gfm`).

### Other cross-cutting pieces
- **Theming**: `react-daisyui` `useTheme()` + `<Theme>`; the `ThemeSwitch` button in `Navbar.tsx` cycles system/light/dark (inside the mobile menu below `sm`).
- **Image lightbox**: `ImageContext` provides one global `react-simple-image-viewer`; call `setCurrentImage(i)` from any screenshot to open it.

## Build & deploy specifics

- `vite.config.ts` defines the `@` alias and a `spaFallback` plugin that copies `dist/index.html` → `dist/404.html` after build so deep links work on GitHub Pages. `server.allowedHosts` contains an ngrok host for tunneling.
- `.env` sets `GENERATE_SOURCEMAP=false`.
- Push to `main` → `.github/workflows/workflow.yml` builds and publishes `dist/` to GitHub Pages.
