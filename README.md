# ScreenExtend homepage

Code for the [ScreenExtend](https://screenextend.app) website: the landing page and four legal pages. It's built with React and Vite and hosted on GitHub Pages.

ScreenExtend is a free desktop app that turns any device with a browser into a second monitor. It streams screen video directly between machines over WebRTC.

This repo is **only the website**. The desktop app's code is in [ScreenExtend/ScreenExtend](https://github.com/ScreenExtend/ScreenExtend).

## Install

You need [Node.js](https://nodejs.org/) 20 or newer and [pnpm](https://pnpm.io/) 10. Use pnpm, not npm or yarn, since the lockfile is `pnpm-lock.yaml`.

```bash
pnpm install
```

## Quick start

```bash
pnpm dev
```

Vite prints the local URL to open in your browser. The page reloads as you edit files in `src/`.

## Usage

| Command | What it does |
| --- | --- |
| `pnpm dev` | Starts the Vite dev server. |
| `pnpm build` | Type-checks with `tsc`, builds to `dist/`, then prerenders the homepage into `dist/index.html`. |
| `pnpm preview` | Serves the production build from `dist/`. |
| `pnpm lint` | Runs ESLint on the `ts` and `tsx` files. Fails on any warning. |

## Features

- **Landing page**: hero, setup steps, use cases, a comparison with other second-screen apps, GPU support, downloads (Windows and macOS; Linux is coming soon) and an FAQ.
- Legal pages: Privacy Policy, Terms of Service, Acceptable Use Policy and Cookie Policy, rendered from Markdown with `react-markdown` and `remark-gfm`.
- Light and dark themes. The site matches your OS setting until you change it with the switch in the navbar.
- The homepage is prerendered at build time, so its content is in the HTML before any JavaScript runs.
- Client-side routing with `react-router-dom`. The build copies `index.html` to `404.html`, so deep links work on GitHub Pages.

### Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/acceptable-use` | Acceptable Use Policy |
| `/cookies` | Cookie Policy |

### Tech stack

- [Vite](https://vitejs.dev/) for the build and dev server
- [React 18](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with [daisyUI](https://daisyui.com/) and `react-daisyui`
- [React Router](https://reactrouter.com/)
- [lucide-react](https://lucide.dev/) icons, plus `react-markdown` and `remark-gfm`

## Deployment

Every push to `main` triggers the workflow in [`.github/workflows/workflow.yml`](.github/workflows/workflow.yml). It runs `pnpm install` and `pnpm run build`, then publishes `dist/` to GitHub Pages.

## Contributing

Run `pnpm lint` and `pnpm build` before you open a pull request. The workflow builds pull requests but deploys only from `main`. Changes to Markdown files alone do not trigger it.

## Contact

Questions, or need a build for another OS? Email **support@screenextend.app**.

## License

GNU Affero General Public License v3.0. See [LICENSE](LICENSE).
