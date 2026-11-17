# Design brief, rerun 2 (2026-11-17)

Supersedes the colour, type and layout parts of `../DESIGN-BRIEF.md`. The voice rules, preservation map and product-data sourcing in that brief still apply. The project rules in CLAUDE.md are hard limits: static (no scroll motion, parallax, tilt, reveal or animated backgrounds), no gradients, glows or glass, colour only from the logo, real screenshots and flat diagrams only.

**Why a rerun:** the owner says the current site is "really bland". The scanners are almost clean (one minor flag), so the remaining problem is a lack of character, not slop. The rerun critique agrees:
- the H1 is about 3x body size;
- the product visual takes under half the first viewport;
- every section is a white ground with an H2 on top;
- Deskreen could use the page almost unchanged.

## World
The logo, taken literally: **three rounded screens stacked and offset down-right (mint at the back, blue in the middle, lime in front), applied to a page about adding screens, because the product's whole job is putting one more screen beside the one you have.**

**Ownable device: the stack offset.** The logo's planes are offset by about 20% of their width, down and to the right (`src/assets/logo/screenextend.svg`: rect 319 wide, offset 65 x / 62 y). Every staged screenshot sits on the plates in that geometry and order, so the hero visual *is* the logo.

## Colour (provenance: logo SVG fills)
| Role | Value | Source |
|---|---|---|
| mint ground | `#d6f1ed` | logo back plane |
| blue: action / PC plate | `#316cff`; `#2456d6` where small white text must pass AA | logo middle plane |
| lime: the extra screen / highlight | `#dcff4a` | logo front plane |
| ink | `#0f1419` | existing token |
| paper | `#ffffff` / dark `#101214` | existing token |

PRODUCT-TRUTH.md was wrong to list cyan `#1ccbdd` and lime `#a6e15a`: the SVG holds only the three fills above.

**Colour meaning, used everywhere:** blue = your computer and the actions, lime = the added screen and what changes on it, mint = the ground.

**Strategy: Committed / Drenched.**
- Hero: a full-bleed mint ground (well over 60% of the first viewport) with blue and lime plates behind the screenshot.
- The page then moves down through the stack. The FAQ and contact sections stay paper.
  1. mint hero
  2. paper pairing section with a lime code strip
  3. a full-bleed blue band for the app and specs
  4. a full-bleed lime download band
- Dark mode: the grounds stay brand colours (they are the identity); only paper sections invert.

## Type
- **Display:** IBM Plex Sans Condensed 700, self-hosted (`public/fonts/ibm-plex-sans-condensed-700.woff2`). Reason: Plex is already the brand face, and the condensed cut lets the headline run at extreme size even at 390px.
  - Hero H1: `clamp(3.4rem, 10vw, 9.5rem)`, leading 0.92, tracking -0.02em, which makes it 6x+ body at desktop.
  - Section display titles: `clamp(2.5rem, 6vw, 5.5rem)`.
- **Text:** IBM Plex Sans 400/600, body 17-18px at 1.55.
- **Literal strings only:** IBM Plex Mono, for codes, URLs, file names and spec terms.
- **Weight contrast:** condensed 700 display against 400 text.

## Positive quotas
1. **First-viewport visual:** the real Add Device screenshot staged large (about 55-60% of the hero width at 1440, bleeding past the container on the right) on blue and lime plates in the logo offset.
2. **Brand-colour fields:** the mint hero, the blue band and the lime band.
3. **Adjacent sections differ** in at least two of: ground, span, alignment, scale.
   - The hero has a mint ground, the headline spanning columns 1-7 and the shot bleeding right.
   - The pairing section is paper and display-led, with steps as a real sequence and the big code strip offset across the grid.
   - The app section is a blue band in a split, with screenshot crops at large scale on lime and mint plates and the spec list as a table.
   - The download section is a lime band, text-led, with an oversized "Download" display word and real file names in mono.
   - The FAQ is paper, in two columns, left-aligned.
4. **A content-shaped section:** the spec list as a real table, plus the six-cell session code at display size.

## Hero options (macrostructure differs)
- **A, Mint stack:** full-bleed mint ground, a giant left-aligned H1 over columns 1-7, the screenshot on blue and lime plates bleeding off the right edge.
- **B, Blue field:** the left 5 columns are full-height `#2456d6` with a white condensed H1 and a lime CTA; the right side is paper with the screenshot on mint and lime plates.
- **C, Headline over shot:** a paper ground with a full-width two-line condensed H1 across all 12 columns, and below it the screenshot at near 1:1 on the three plates, with the mint plate running full-bleed under the lower half.

Choose after screenshots at 1440 and 390. Record why.

## Proof row (no middle dots)
Under the CTA, as separate items: "Free", "2.5k+ downloads" (an owner-stated fact, 2026-11), "Source on GitHub" (a link). Plus the requirements line.

## Not this
cream + serif; near-black + neon (dark mode keeps the brand grounds); hairline broadsheet; three equal cards; tracked caps eyebrows; gradients; glows; animation on scroll.
