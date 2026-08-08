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
`ImageProvider` + daisyUI `<Theme>`, renders the persistent `Navbar`/`Footer`/`AuroraBackground`,
and defines routes: `/` (the `Home` composite) plus one route per entry in `LEGAL_PAGES`.

### Two generations of the homepage
- **Current** homepage sections live in `src/components/home/` (`HeroLanding`, `ConnectFlow`, `FeatureScroll`, `Highlights`, `FaqSimple`) and are composed by `Home` in `App.tsx`.
- **Old** flat homepage components (`Hero`, `Features`, `FAQ` at the `src/components/` root) are the previous single-scroll design, kept in `OldHome`. That route is currently commented out — don't assume those components are live.
- `Download`, `Contact`, `Footer`, `Navbar` are shared across both.

### Cinematic vs. static (important design constraint)
Scroll-driven "cinematic" sections must degrade cleanly to a plain stacked layout on
mobile/short/reduced-motion viewports. The pattern: a section's default export picks a variant
with **`useCinematic()`** (`src/hooks/useScroll.ts`) — e.g. `FeatureScroll` returns
`<FeatureScrollCinematic />` or `<FeatureScrollStatic />`. `useCinematic()` is true only on a
desktop-class viewport (`min-width:1024px`, fine pointer, hover) with reduced-motion off.
When changing these sections, keep both variants working and make fixes hold at **any** screen
size rather than patching the current breakpoint — the static variant is the bulletproof fallback.

### Scroll animation
No animation library. `src/lib/anim.ts` has pure math helpers (`clamp`, `range`, `lerp`, `mix`,
`easeInOut`, `pulse`) that map a 0..1 scroll progress to transforms/opacity. Progress comes from
hooks in `src/hooks/useScroll.ts`: `usePinProgress` (progress across a tall pinned/sticky section),
`useTrackProgress`, plus `useMediaQuery`/`useReducedMotion`. `useInView` (`src/hooks/useInView.ts`)
powers the `Reveal` reveal-on-scroll wrapper.

### SEO / meta
`src/lib/seo.ts` imperatively mutates `document.head` meta/OG/canonical tags. `Home` calls
`applyHomeMeta()` in a `useEffect`; `LegalPage` applies each page's own meta. There's no
server rendering, so this is how per-route metadata is set.

### Legal pages
`src/legal/content.ts` holds the legal copy as Markdown strings plus a `KNOWN` constants block
(support emails, effective date, min age) interpolated into that copy. `LEGAL_PAGES` drives both
the routes in `App.tsx` and rendering by `LegalPage` (via `react-markdown` + `remark-gfm`).

### Other cross-cutting pieces
- **Theming**: `react-daisyui` `useTheme()` + `<Theme>`; `ThemeToggler` is a floating toggle.
- **Image lightbox**: `ImageContext` provides one global `react-simple-image-viewer`; call `setCurrentImage(i)` from any screenshot to open it.

## Build & deploy specifics

- `vite.config.ts` defines the `@` alias and a `spaFallback` plugin that copies `dist/index.html` → `dist/404.html` after build so deep links work on GitHub Pages. `server.allowedHosts` contains an ngrok host for tunneling.
- `.env` sets `GENERATE_SOURCEMAP=false`.
- Push to `main` → `.github/workflows/workflow.yml` builds and publishes `dist/` to GitHub Pages.
