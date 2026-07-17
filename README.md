# ScreenExtend — Website

The marketing homepage for [**ScreenExtend**](https://screenextend.app), a free, cross-platform
desktop-extension app that turns any device with a browser into a second monitor. Screen video is
streamed directly between machines over WebRTC.

This repository contains **only the website** (landing page + legal pages), not the desktop
application itself. It's a single-page React app built with Vite and deployed to GitHub Pages.

## Features

- **Landing page** — hero, feature highlights, download cards (Windows / Mac / Linux), FAQ, and
  a contact section.
- **Legal pages** — Privacy Policy, Terms of Service, Acceptable Use, and Cookies,
  rendered from Markdown via `react-markdown`.
- **Light/dark theming** with a floating theme toggle (`react-daisyui`).
- **Interactive UI** — 3D tilt hero image (`card3d`), in-page image viewer, and scroll-based
  animation pausing via intersection observers.
- **SPA routing** with `react-router-dom`; a `404.html` fallback is generated at build time so
  deep links work on GitHub Pages.

## Tech Stack

- [Vite](https://vitejs.dev/) — build tooling and dev server
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/) / `react-daisyui`
- [React Router](https://reactrouter.com/)
- [lucide-react](https://lucide.dev/) icons, `react-markdown` + `remark-gfm`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (the project ships a `pnpm-lock.yaml`)

### Install & run

```bash
pnpm install
pnpm dev
```

### Scripts

| Command         | Description                                          |
| --------------- | ---------------------------------------------------- |
| `pnpm dev`      | Start the local dev server                            |
| `pnpm build`    | Type-check (`tsc`) and build for production to `dist/`|
| `pnpm preview`  | Preview the production build locally                  |
| `pnpm lint`     | Run ESLint over `ts`/`tsx` files                      |

## Routes

- `/` — home (Hero, Features, Download, FAQ, Contact)
- `/privacy`, `/terms`, `/acceptable-use`, `/cookies` — legal pages

## Deployment

Pushes to `main` are built and deployed automatically to GitHub Pages via the GitHub Actions
workflow in [`.github/workflows/workflow.yml`](.github/workflows/workflow.yml). The build runs
`pnpm run build` and publishes the `dist/` directory.

## License

See [`LICENSE`](LICENSE).

## Contact

Questions or unsupported-OS build requests: **support@screenextend.app**
