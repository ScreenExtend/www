# Design brief: ScreenExtend site

## Basics
- **Subject:** a free desktop app that makes any browser device an extra monitor for a Windows PC or Mac.
- **Audience:** people with a spare tablet, phone or laptop beside their computer, often somewhat technical.
- **Primary job:** get the visitor to download the right installer, after showing that pairing takes a QR scan and six digits.

## Owner constraint (top precedence)
The page is simple and static. There are no scroll-driven animations, no pinned sections, no parallax, no tilt, no reveal-on-scroll and no animated background. The cinematic/static split (`useCinematic`) goes away and the static layout becomes the only layout.

## Vernacular
The product's own materials are:
- the Add Device screen, with one QR per network
- the Session OTP rendered as six boxed digits
- join URLs (`session.screenextend.app`)
- installer filenames (`ScreenExtend_x64-setup.exe`, `ScreenExtend_universal.dmg`)
- spec-sheet terms: NVENC, Quick Sync, VideoToolbox, 500 Hz, 200% scale

**Visual idea:** the six-cell session code, set in Plex Mono. The six separate cells echo the "Session OTP" row in `src/assets/app/feature-3.png`, and the code is shown once in the pairing steps. The lime cell is a site accent; the app does not draw it (corrected after the regression review). This is the single memorable thing.

**Verbal idea:** the second device needs only a browser. Say it plainly: "Nothing to install on the second device. It opens in the browser."

## The single memorable thing
The boxed session-code cells in step 3 of "How pairing works". They are static. Cells use mono digits and 4px radius, and one cell is filled with logo lime `#DCFF4A` to show the cursor position. They are labelled as an example. Everything else stays quiet.

## Palette
| Token | Light | Dark | Role | Contrast (on its own bg) |
|---|---|---|---|---|
| paper | `#ffffff` | `#101214` | page background | n/a |
| surface | `#f4f6f8` | `#171a1d` | panels, code cells, spec rows | n/a |
| ink | `#0f1419` | `#e6eaee` | body and headings | 18.5:1 / 15.5:1 |
| muted | `#4b5560` | `#9aa4ad` | secondary text | 7.6:1 / 7.4:1 |
| line | `#dde2e7` | `#2a3036` | hairlines, borders | decorative |
| blue | `#2b62f0` (button bg) / `#2456d6` (links) | `#2b62f0` / `#7ea2ff` (links) | primary action, links | white on button 5.1:1; link 6.2:1 / 7.6:1 |
| lime | `#dcff4a` | `#dcff4a` | one highlighted OTP cell only | ink on lime 16.3:1 |

Brand `#316cff` stays as the logo colour. The button blue is darkened slightly to `#2b62f0` to pass AA.

## Type
- **Families:** IBM Plex Sans (body and headings) and IBM Plex Mono (codes, URLs, filenames, spec terms). Both are already self-hosted. Plex suits an engineering utility and is not one of the reflex defaults.
- **Scale (1.25):** 14 / 16 / 18 / 22 / 28 / 36 / 48 px. H1 uses `clamp(2.25rem, 4.6vw, 3.25rem)`.
- **Weights:** 400 body, 600 headings, 500 mono. The 700 weights are dropped from `@font-face`.
- **Measure:** paragraphs max 62ch. `text-wrap: balance` on h1–h3, `pretty` on p.
- **Case:** sentence case everywhere. No uppercase tracked eyebrows.

## Scales
- **Radius by tier:** code cells 4px, buttons and inputs 6px, panels 8px, screenshots 10px.
- **Shadow:** a single shadow, only on screenshots: `0 1px 2px rgb(0 0 0 / .06), 0 12px 32px -12px rgb(0 0 0 / .25)`. Nothing else has a shadow.
- **Border:** 1px `line` on panels and screenshots. Spec rows use hairline dividers only.
- **Spacing (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96. Section padding alternates 64 and 96 for rhythm. The hero is tighter at the top.

## Layout
### Desktop (1440)
```
[logo ScreenExtend]   How it works  Features  Download  FAQ  Contact   [GitHub] [theme] [Download]
-------------------------------------------------------------------------------------------------
H1 left (6 cols)                                 | real Add Device screenshot (7 cols, bleeds right)
lead paragraph                                   |
[Download for Windows or Mac]  How pairing works |
Free · Windows 10 20H1+ / macOS 10.15+           |
-------------------------------------------------------------------------------------------------
How pairing works (h2, left)
1 Open ScreenExtend on your computer     | 3 Type the six-digit session code
2 Scan the QR code from the other device |   [3][7][7][6][2][0]  (example)
                                         | 4 Drag a window onto it
-------------------------------------------------------------------------------------------------
Inside the host app: 3 rows, screenshot 7 cols + text 5 cols; text left, then right, then left
-------------------------------------------------------------------------------------------------
Specifications: two-column definition list, mono term | sentence
-------------------------------------------------------------------------------------------------
Download: 3 columns, hairline-separated. OS name, min version, file buttons. Linux marked "Not yet available".
FAQ (left heading + right 8-col list) | Contact (definition list) | Footer
```
### Mobile (390)
```
nav: [≡] logo .......... [Download]
H1 (left-aligned, not centred)
lead
[Download for Windows or Mac] (full width)
How pairing works →
screenshot (full width)
steps 1–4 stacked, OTP cells inside step 3
features: screenshot then text, stacked
spec list: term above sentence
download blocks stacked
FAQ, contact, footer
```
Alignment is left-aligned throughout. Nothing is centred except the footer line.

## Motion budget
- No orchestrated moment.
- Feedback motion only: colour transitions of 150ms on hover and focus, and the FAQ disclosure arrow.
- `prefers-reduced-motion` kills even those.

## Imagery plan
- Real screenshots `feature-1/2/3` at full brightness. They are click-to-enlarge (existing lightbox).
- The drawn phone, monitor and QR mockups are deleted.
- **Example product data:** the OTP digits `377620` come from the existing site demo (`ConnectFlow.tsx:252`) and are labelled "example". The cell styling matches the "Session OTP" row in `src/assets/app/feature-3.png`.

## Voice
**Rules:**
1. Say what the user does, in their order of actions.
2. Name real things: file types, OS versions, menu names from the app.
3. One idea per sentence. No similes and no slogans.

**Before and after:**
1. "Turn any screen into your screen." becomes "Use a tablet, phone or spare laptop as a second monitor."
2. "Drag across, like a cable. … just like a true second monitor." becomes "Drag a window onto it. Move a window past the edge of your screen and it appears on the other device."
3. "Supports Windows, Mac, and Linux" becomes "Free for Windows and macOS. Linux is not available yet."
4. "Still stuck? Email support@…" becomes "Something not covered here? Email support@…"
5. "This is nothing to be concerned about. Simply do the following:" becomes "To run it anyway:"

## Nearest-default check
- **The current site** sits between cluster (g) (dark mode, glows, glass, grey text) and (f) (SaaS card kit: identical rounded cards and icon grid).
- **The new plan** is closest to (e) (broadsheet hairline columns), because the spec list and download columns use hairlines.
- **What changes to avoid (e):**
  - Radii are tiered and not zero.
  - The real screenshots carry the page visually.
  - The brand blue and one lime OTP cell give it product colour rather than an editorial monochrome.
  - There is no serif and no newspaper column grid.
- **Clusters (b), (c), (d) and (h) are avoided:**
  - The page is white or neutral dark, not cream.
  - The type is sans, not serif.
  - The accent is the existing brand blue, not acid on black.

## Preservation map
- **Stays:**
  - every route and the legal copy
  - all download URLs, minimum OS versions, and the Windows/Mac post-download notices (wording tightened, steps identical)
  - enterprise `.msi`/`.pkg` note
  - all FAQ Q&As (JSON-LD kept in sync)
  - contact emails, operator, security.txt link, policies
  - SEO meta, JSON-LD, prerender, theme switching (system/light/dark), image lightbox
  - the nav anchors `#home #how #features #download #faq #contact`
- **Changes:**
  - Hero, how-it-works, features, highlights, download, FAQ and contact are restyled.
  - The theme toggle moves into the navbar, so it no longer floats over content.
  - Copy is tightened and casing fixed.
  - Title and OG title change to sentence case.
- **Removed:**
  - ConnectFlow animated stage
  - FeatureScroll cinematic
  - hero tilt, parallax and fake phone
  - AuroraBackground
  - Reveal and useInView
  - nav progress bar
  - floating back-to-top
  - `useCinematic`, `usePinProgress`, `useTrackProgress`, `lib/anim.ts`, `lib/qr.ts`
  - the dead old-homepage components `Hero`, `Features`, `FAQ` and their logo SVGs
  - unused deps
- **Fixed fact:** the Mac notice no longer says "still in beta" (commit `2cdc0e4`).
- **Owner must supply or decide:** the TODOs listed in REPORT.md.
