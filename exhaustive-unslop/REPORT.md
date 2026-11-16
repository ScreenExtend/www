# Exhaustive unslop: report

Branch `exhaustive-unslop`, based on `3cad501`. Nothing has been pushed or merged.

**Owner directive:** "cut the device animations on scroll, it's too laggy, simple and static." Every scroll-driven animation is gone. The page is now a plain stacked layout, and the only motion left is 150ms colour feedback on hover and focus.

## What changed
| Area | Before | After |
|---|---|---|
| Hero | Slogan "Turn any screen into your screen", cursor tilt, two parallax tracks, a drawn fake phone, radial glow, three dot chips | Plain headline saying what it does, a real Add Device screenshot, "Download for Windows or Mac", requirements line under the button |
| How it works | 360vh scroll-pinned animated stage, re-rendered every scroll frame | Four static numbered steps. The six-cell session code (example digits, one lime cell) is the single accent |
| Features | 320vh pinned screenshot cross-fade with stacked uppercase eyebrows | Two plain screenshot + text rows. The duplicate Add Device row was removed (the hero shows it; its text moved into step 1 and step 4) |
| Under the hood | Six icon cards with glass blur | "Technical details" two-column definition list (same facts, plus the FAQ's 200% / 500 Hz limits) |
| Download | Icon-in-circle cards, faded Linux card with fake buttons, `<a><button>` nesting | Three aligned columns, file-type buttons, honest "not available yet" states. Mac notice no longer says "beta" (commit `2cdc0e4`) |
| FAQ / Contact | Centred, boxed, blurred cards | Left heading with a hairline list, and a contact definition list |
| Global | Aurora blob background, reveal-on-scroll everywhere, nav progress bar, floating Theme pill and back-to-top covering content | None of these. The theme switch lives in the navbar (inside the menu below 640px). Adds a skip link, focus rings and 44px targets |
| Lightbox | `react-simple-image-viewer` (keyboard-inaccessible) | Native `<dialog>`: focus moves in, arrow keys step, Escape restores focus |
| Bug fixes found on the way | React #418 hydration error on every legal page (pre-existing); cookie table widened or clipped the page on phones | Non-prerendered routes render fresh. The table scrolls inside its own region |

## Numbers
**Lighthouse** (production build, median of 3 runs; perf / a11y / best-practices / SEO):

| Route | Before | After |
|---|---|---|
| `/` mobile | 96 / 96 / 100 / 100 | 96 / **100** / 100 / 100 |
| `/` desktop | 100 / 96 / 100 / 100 | 100 / **100** / 100 / 100 |
| `/privacy` mobile | 91 / 96 / 96 / 100 | **93** / **100** / **100** / 100 |
| `/privacy` desktop | 99 / 96 / 96 / 100 | **100** / **100** / **100** / 100 |

The prerendered homepage HTML went from 68.7 KB to about 35 KB. Four runtime dependencies were removed and none added.

**Scanners** (`scans/before` → `scans/final`):

| Scanner | Before | After |
|---|---|---|
| devibe src | 13 (score 26) | 0 |
| unslop-text, rendered copy | 13 (score 39) | 0 |
| design-slop-cop `/` | 4 patterns (score 29) | 1 (`faq_accordion`, kept on purpose, see exceptions) |
| impeccable `/` | 8 | 0 |
| impeccable legal pages | 7–17 each | 0 |
| impeccable src | 2 | 0 |

**axe** (WCAG 2.0–2.2 A/AA, 5 routes × light/dark × 1440/390): 0 violations.

## Screenshots
- `before/` and `after/`: full-page shots per route at 1920/1440/1024/768/430/390/360/320, in light and dark.
- `before/frames/` and `after/frames/`: viewport-by-viewport scroll captures of `/`.
  - Full-page captures of the old site are blank below the fold. Reveal-on-scroll and the pinned sections never render in a static capture, so the frames are the honest comparison.
- `after/shots.json`: 80 shots, 0 with horizontal overflow or console errors.

## Adversarial rounds
| Round | Desktop judge | Mobile judge | Prosecutor | Others |
|---|---|---|---|---|
| 1 | Preferred after, 85% (X=before, Y=after) | Preferred after, 85% (X=after) | Medium: repeated section layout, duplicate hero screenshot, zigzag. Rest minor | Copy: PC vs Mac, "directly" vs TURN, NVIDIA, 6-digit, em dash in JSON-LD. Craft: 320 wordmark clip, scrollspy at bottom, dark band, unequal columns. A11y: drawer focus, lightbox. Regression: lime-cell comment overclaimed |
| 2 | Preferred after, 85% (X=after) | Preferred after, 85% (X=before, Y=after) | "Obvious tells gone; minor/taste." Real defects: scrollspy over Download, Terms says Windows-only | Copy: minor. Craft: cookie column, spec row offset. Regression and axe clean; leftover minors |

Every substantiated finding was reproduced and fixed in commits `99cf18c`, `67bb30d` and `8e72d6e`. All exit criteria hold after round 2, so no further rounds were run.

## Dismissed findings (with reason)
- **Unverifiable owner claims (500 Hz, "None is stored", unlimited devices, "low latency", HDR):** these are facts, not wording. They are kept and listed as TODOs below.
- **Every section shares one left-title layout (taste):** varied where it helped. Technical details and Download are full width, and features alternate. The rest is kept as a consistent grid.
- **Mono spec keys, the lime accent, the "Example code" caption:** deliberate brief choices. The caption stops readers mistaking the example for a real code.
- **"Enlarge screenshot:" trailing colon:** screen readers hear it followed by the image alt. Not a defect.
- **"Themes swapped in screenshots" (round-2 Craft):** checked by pixel. Backgrounds are correct.
- **Screenshots are hard to read on phones:** they are real screenshots and open in the lightbox. A cropped detail would need new assets.
- **Platform logos differ in colour:** these are brand marks shown in their own colours, which is conventional.
- **Two "Download" items in the nav:** fixed in round 1 by removing the nav text link.

## Banned-pattern exceptions
- **`faq_accordion`:** the FAQ is real content mirrored in FAQPage JSON-LD. It is restyled as a plain hairline list.
- **Numbered steps 1–4:** pairing is a real sequence.
- **Monospace text:** used only for product vocabulary (filenames, spec keys, codes) and the wordmark.

## Skipped or partial checks
- **`pnpm lint`:** cannot run. The repo has no ESLint config at baseline or now. TODO: add `.eslintrc.cjs`.
- **Separate passes:** phase-6 passes were not committed one per pass. The static rewrite touched every line of each section, so spacing, colour, type and layout landed in one commit (`24b15ba`), followed by a details commit.
- **References:** fetched as text only, so visual claims come from alt text. Ghostty's page came back truncated.
- **OG image:** not regenerated. `og-image.png` is a real app screenshot, which is honest and still on-brand.
- **Favicon set:** unchanged. The logo is unchanged.
- **Font subsetting:** not done. The 700 weights are no longer referenced; the files are still in `public/fonts` and can be deleted.
- **Legal pages on first paint:** without JavaScript they still show the homepage HTML, because only `/` is prerendered (pre-existing). Prerendering them would need `LegalPage` out of `lazy()`. TODO.
- **CI:** none added. `.github/workflows/workflow.yml` only deploys. `pnpm unslop:scan` was added to package.json.

## Files
- **Rewritten:** `App.tsx`, `Navbar.tsx`, `Download.tsx`, `Contact.tsx`, `Footer.tsx`, `ImageContext.tsx`, `home/*`, `index.css`, `tailwind.config.js`
- **Edited:** `main.tsx`, `LegalPage.tsx`, `seo.ts`, `screenshots.ts`, `legal/content.ts` (title separator only), `index.html`, `public/llms*.txt`, `README.md`, `CLAUDE.md`, `package.json`
- **New:** `home/ShotButton.tsx`
- **Deleted:** `AuroraBackground`, `Reveal`, `ScrollToTop`, `ThemeToggler`, old `Hero`/`Features`/`FAQ`, `hooks/useScroll.ts`, `hooks/useInView.ts`, `lib/anim.ts`, `lib/qr.ts`, and 4 unused tech-logo SVGs
- **Dependencies removed:** `@researchgate/react-intersection-observer`, `react-github-btn`, `react-svg`, `react-simple-image-viewer`. None added.

## TODO for the owner (facts only you can supply)
1. **Terms §1** says the Host is "a Windows computer", but the site offers a Mac build. Update the legal text.
2. **Legal text conflicts:**
   - "your own devices" (Terms §5, AUP §5) vs "a separate party (often another user)" (Privacy §9).
   - "our TURN server" vs "public STUN/TURN infrastructure" (Terms §8).
   - AUP template leftovers: "accounts (where accounts exist)", "automated registration".
3. **Is the Mac build notarized yet?** The download notice still says it isn't.
4. **`public/llms.txt` and `llms-full.txt`** list separate Intel and Apple Silicon DMGs; the site links one universal DMG. Which is right?
5. **Claims to back with evidence or soften:**
   - 500 Hz per device
   - "low latency" (give a measured number)
   - unlimited devices
   - FAQ "None is stored": the privacy policy describes a salted IP hash and logs
   - "Is my data secure? Yes."
6. **Not stated anywhere:** the minimum browser for the second device, and whether touch input works. Both were questions from the first-time-visitor review.
7. **Real proof, if you have it:** a photo of a tablet running as a monitor, a measured latency number. Nothing like this was invented.

## Follow-up 1 (2026-11-15): colour and fewer words

**Request:** "add a splash of color in some places along with less text heavy and more visuals". The standing rule is to refuse anything that would read as AI-made; nothing in this request needed refusing.

Every new colour comes from the logo palette (mint `#d6f1ed`, blue `#316cff` / `#2456d6`, lime `#dcff4a`), and every new visual is a real crop or a flat diagram.

| Where | Change |
|---|---|
| Hero | Flat mint and lime blocks stacked behind the screenshot, offset the way the logo stacks its three screens. No blur, no gradient. The lead is cut to two short sentences. |
| How pairing works | Each step has a picture:<br>1. Real crop of the Anywhere (Internet) QR tile (`feature-1.png`).<br>2. The join-link format on mint.<br>3. The code cells.<br>4. A flat SVG diagram on blue of a window crossing to the tablet.<br>Text is one line per step. Visible step numerals were dropped (see below). |
| Inside the host app | Readable crops of the Edit Device controls (`feature-2.png`) on mint and of Settings (`feature-3.png`) on lime. Clicking one opens the full screenshot. Captions are shortened. The Settings crop stops above the hosted-network name field, which shows a personal handle. |
| Technical details | One full-bleed band in `#2456d6`: lime mono labels (5.5:1), `#dfe8ff` text (5.1:1), white heading (6.2:1). Each line is shorter. A "Networks" row keeps the "Anywhere (Internet) across networks" fact. |

**Gate results:**
- **Shots:** 16 shots of `/` at all widths in light and dark; 0 overflow and 0 console errors.
- **Scan regression:** `scan.sh followup-1` first flagged a new `numbered_steps` pattern (four equal tiles, each numbered). I removed the visible numerals; the `<ol>` and the pictures carry the order. The rescan matches `final`: only `faq_accordion`.
- **Lighthouse:** desktop 100/100/100/100, mobile 96/100/100/100, the same as `final`.
- **Banned list, checked by hand:** clean. The tablet drawing is a labelled flat diagram, not a device render.

**New assets:** `src/assets/app/crop-qr.webp`, `crop-edit.webp` and `crop-settings.webp` (14–25 KB each), cropped from the real screenshots.
