# Audit: baseline

Baseline commit: `3cad501` (see `BASELINE_SHA`). Branch `exhaustive-unslop`.

## Owner directive (overrides everything below)
"Cut a bunch of the stupid device animations on scroll; it's too laggy. I just want stuff to be simple and static."

## Baseline numbers
**Lighthouse** (production build via `serve.py`, median of 3 runs, scores are perf / a11y / best-practices / SEO):

| Route | Mobile | Desktop |
|---|---|---|
| `/` | 96 / 96 / 100 / 100 | 100 / 96 / 100 / 100 |
| `/privacy` | 91 / 96 / 96 / 100 | 99 / 96 / 96 / 100 |

**Scanners** (`scans/before/`):
| Scanner | Result |
|---|---|
| devibe src | 13 findings, score 26 |
| unslop-text (rendered copy) | 13 findings, score 39 |
| design-slop-cop `/` | 4 patterns, score 29: gradients, glassmorphism, numbered_steps, faq_accordion |
| impeccable `/` | 8: low-contrast, kicker-above-heading, buried-raster, straggler |
| impeccable legal pages | 7–17 each: low-contrast, line-length, straggler |
| impeccable src | 2: border-accent-on-rounded |

The rendered-copy extract (`copy.md`) is missing the Download, FAQ and Contact text. That text has `opacity:0` until the `Reveal` intersection observer fires. Full-page screenshots of `/` are blank below the fold for the same reason, plus the 360vh and 320vh pinned sections. Crawlers, print and no-JS-after-hydration snapshots see the same blank page.

## Tells found (severity H/M/L)

### Motion and structure
- **H** Scroll-pinned cinematic "How to connect" demo, 360vh tall, re-rendering a full drawn stage on every scroll frame (`src/components/home/ConnectFlow.tsx:636-712`). This is the owner's main complaint. Dead space: frame `before/frames/home-1440-dark-04.png` has 55% of the viewport empty.
- **H** Scroll-pinned screenshot cross-fade, 320vh (`FeatureScroll.tsx:31-125`).
- **H** Hero cursor tilt plus two parallax tracks plus a drawn fake phone with skeleton lines and a "live" pill (`HeroLanding.tsx:18-28, 104-163`).
- **H** Aurora blob background, fixed, with three blurred gradients (`AuroraBackground.tsx`, `index.css:43-75`).
- **M** Fade-and-slide-up `Reveal` on every block, plus staggered delays on cards and FAQ items (`Reveal.tsx`, used in 6 files).
- **M** Navbar scroll-progress bar (`Navbar.tsx:76-80`), animated underline on nav links, and a logo `hover:scale-105`.
- **M** Floating "Theme" pill and back-to-top button cover content on mobile (`ThemeToggler.tsx:38`, `ScrollToTop.tsx`; frames `home-390-light-00`, `home-390-dark-02`).

### Visual
- **H** Uppercase letter-spaced eyebrows above each section: SETUP, THE APP, ARCHITECTURE, plus stacked DASHBOARD and PER-DEVICE CONTROL (`ConnectFlow.tsx:646`, `FeatureScroll.tsx:55,70`, `Highlights.tsx:52`).
- **H** Six-cell icon grid "Under the hood": icon above an uppercase mono title, with a glass backdrop-blur (`Highlights.tsx:58-77`).
- **M** Glass panels (`bg-base-100/50 backdrop-blur-sm`) on FAQ, Download, Contact and the navbar.
- **M** Coloured glows on the drawn QR reticle and scan line (`ConnectFlow.tsx:506,514,562`) and a hero radial bloom (`HeroLanding.tsx:103`).
- **M** Two design systems stitched together: the cinematic top half, then centred generic Download/FAQ/Contact blocks with a decorative bar under "Contact" (`Contact.tsx:45`).
- **M** Download cards repeat an icon-in-circle pattern (`Download.tsx:13`).
- **L** One radius (`0.25rem`) on everything, and the same 1px border on every box.
- **L** White on `#316cff` button text measures 4.45:1, which is below AA for 16px text.

### Copy
- **H** Facts contradict each other:
  - "Works offline" chip next to "over your Wifi network".
  - The Mac notice says "still in beta" after commit `2cdc0e4` took Mac out of beta.
  - "Launch on your PC" leaves out Mac.
- **M** Hero slogan "Turn any screen into your screen." could belong to any competitor. The hero gives no price, although the product is free (JSON-LD `offers.price 0`).
- **M** Similes stacked together: "Drag across, like a cable… just like a true second monitor."
- **M** Spelling and casing: Github→GitHub, Wifi→Wi-Fi, MacOS→macOS, "How it Works" in Title Case, "Frequently Asked Questions" in Title Case, title/OG tags in Title Case.
- **M** Vague CTAs: "Download" and "See how it works".
- **L** Alt text "Windows Logo" etc. Screenshot alts only repeat headings.
- **L** Windows notice: "Simply do the following", "We will have them go away when we get around to signing our builds."

## Adversarial findings (phase 2)

### Slop Prosecutor (blind)
Ranked worst first:
1. Eyebrows.
2. Aurora blobs.
3. Six-card icon grid. The AUTO-DISCOVERY text clips at 1440.
4. Three progress indicators at once: nav bar, nav underline, step bars.
5. Hero formula: one accent word, CTA with arrow plus ghost CTA, three dot chips.
6. Two stitched design systems.
7. Placeholder mockups instead of the product.
8. Pin-and-scrub dead space, and a ghost shadow bleeding under the nav.
9. Triads and stock phrases ("Under the hood", "Still stuck?").
10. Floating chrome over content on mobile.
11. Identical borders and radii.
12. Legal page bold-heavy, low contrast over the aurora.

### First-time Skeptic (blind)
- **Understood:** "phone/tablet as extra monitor, no app on the iPad".
- **Distrusts:**
  - Price is never stated.
  - "Anywhere (Internet)" relays aren't explained.
  - There is no proof.
  - It is unclear whether the runtime certificate triggers browser warnings.
- **Generic:** hero formula, eyebrows, icon grid, blobs, accordion.
- **Would have left:** at "Under the hood" or the pinned blank stage.
- **Unanswered:**
  - What does the browser device need?
  - Is it free?
  - What's the latency?
  - Does touch input work?

### Brand Strategist (blind)
- Mostly interchangeable with Spacedesk, Duet and Deskreen. Only the real app screenshots are unique, and they are shown small and dimmed.
- **Unique visual:** the six boxed session-code cells (the app's own "Session OTP" UI) next to a real QR.
- **Unique verbal:** "the browser is the client".
- The logo lime is `#DCFF4A`, not the `#a6e15a` token.
- **Recommendation:** static hero built from the real Add Device screenshot; differentiators as plain spec lines; drop blobs, mockups and the icon grid.

### Copy Cynic
- **Fact conflicts:**
  - The Terms say the Host is a Windows computer, while the site advertises Mac. Owner TODO.
  - The "Works offline" chip conflicts with the relay and TURN copy.
  - "6-digit session code" vs "OTP" vs "session ID" naming.
  - The legal copy says "your own devices" in one place and calls the Host a "separate party" in another. Owner TODO, legal.
  - "free" appears only in the meta description.
- **Casing:** GitHub, Wi-Fi, Title Case headings and title.
- **Hype:** "true second monitor", the slogan, the chip triad, eyebrows, template step numbers, vague CTAs.
- **aria and alt:** `aria-label="Card"` and `"Navbar"` come from react-daisyui and need checking. Screenshot alts only repeat headings.
- **Legal template leftovers:** "accounts (where accounts exist)", "automated registration". Owner TODO; legal text is not rewritten here.

### Craft Inspector
1. Floating Theme and back-to-top buttons cover copy at 390px (frames -01, -02, -05, -08), and their styles and z-index differ.
2. No `focus-visible` styling anywhere in `src`.
3. Whole-card `opacity-50` on Linux, ARM and the enterprise note gives roughly 2:1 contrast in light mode. Brand-blue links on dark cards measure about 3.8:1.
4. The translucent blurred navbar lets content show through.
5. The hero phone mockup overflows the content edge and touches the viewport at 390px.
6. In the Highlights grid, Reveal transforms misalign cells and clip "change.".
7. Download card button rows are misaligned, button patterns are inconsistent, and the spacer is a hand-made div.
8. Section headers come in four styles and content widths in three.
9. Light and dark text weight looks different, and the Linux card washes out in light mode.
10. Bad heading breaks at 390: "Download / ScreenExtend", "Frequently Asked / Questions". The hero is centred while the sections below are left-aligned.
11. Dead bands below the hero and above Download. The privacy page has a hard aurora edge.
12. Radii and shadows are inconsistent.
13. The "How to reach us" grid has an uneven gap.
14. The mobile header logo is off-centre, and dead space sits under "See how it works".

### Disagreements
- The Prosecutor calls the numbered steps template scaffolding. Pairing *is* a real four-step sequence, so the numbers stay, as plain text with no animation and no card.
- The Skeptic wants latency numbers. None are measured, so this goes on the TODO list rather than being invented.
