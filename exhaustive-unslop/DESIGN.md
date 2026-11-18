# The leaflet in the box

Branch `exp/leaflet`. Second pass, after two adversarial critiques.

## The idea
The page is the printed instruction leaflet of a well-made gadget, except the gadget is a free download. It is printed in two inks, page ink and one spot blue, on uncoated white stock (or, in dark mode, the brown-black board inside the carton). Its figures are lettered technical line drawings with a key, the way a manual explains parts, and the one joke is the packing list: what's in the box is nothing you can hold.

## Type
**Archivo** (Omnibus-Type, OFL), self-hosted as one variable woff2 with weight and width axes (`public/fonts/archivo-wdth.woff2`, preloaded in `index.html`). One line: a sturdy grotesk whose width axis gives three voices from one family. The h1 runs wide and heavy like a box front (118%), section heads one step narrower (106%) so the wide voice belongs to the cover, step numbers, the "1×" quantities, the code digits and the 8 ms figure run condensed (66%) like manual figures, and small print sits at 90%. IBM Plex Mono stays only for real code values (the `xattr` command, `.msi`/`.pkg`).

## Colour
| Token | Light (uncoated white) | Dark (carton board) |
|---|---|---|
| paper | #eeefec | #16140f |
| surface | #e2e4e0 | #211e18 |
| sheet (inside drawn screens, chosen card) | #fbfbfa | #221f19 |
| ink | #14161a (15.7:1) | #ede8dc (15.1:1) |
| muted | #50555b (6.5:1) | #a9a295 (7.3:1) |
| link | #2557e0 = the spot (5.2:1) | #93b1ff (8.7:1) |
| line | #bfc3bf | #3a352c |

- **Two blues, named:** `spot` #2557e0 (white on it 6.0:1) and the dark-mode `link` #93b1ff. The tile-blue column tint, spot-soft, screen-blue and the pale pill blues are gone. (The app-demo replica keeps the app's own colours; it is a copy of the app.)
- **Lime** #dcff4a appears twice: the "Free" sticker on the box and the rule beside "You'll also need". Mint is no longer used.
- No gradients, glows, opacity tints or shadows on the page.

## Layout system
- 12-column container. Major sections are split by a 1.5px ink rule (the folds). No borders around figures, steps or callouts; containers only where they are a real object (download cards, the app's own window, tables).
- **One print device: lettered callouts with a key.** The hero drawing has A, B, C leader lines, and the key sits beside it in HTML (readable at 390px). Registration marks, crop marks and dashed fold lines between steps are all removed.
- One full-bleed band: the spot-blue "What's in the box". Download is back on paper.
- Tables are ruled like printed tables (heavy top and bottom, hairlines). Compare marks ScreenExtend by a ruled column and blue checks, not a filled "featured" column. On phones the feature names stick to the left while the table scrolls, with a "scrolls sideways" note above.
- Uses is an "If / Then" table, the troubleshooting page at the back of a manual, instead of a 2×3 paragraph grid. On phones it stacks.
- Radii nearly square (2/3/4/6px).

## Motion
- One entrance: in the hero drawing the window is dragged from the laptop until it sits across both screens (1.7s, once). That resting position is the final frame, so under `prefers-reduced-motion` it is simply drawn there.
- Feedback only otherwise: buttons press 1px and change colour (150ms); the FAQ plus rotates.
- The video (once set) never autoplays from the prerendered markup: playback starts after mount, and only without reduced motion, which then gets controls instead.

## Voice
Deadpan instruction manual, true facts only. The rules:
- Make the box joke once. Everything else is a plain, specific statement.
- Observed situations, not categories ("A 13-inch laptop with forty tabs").
- Instructions name the device and the place ("Type it on the tablet, in the page you just opened").
- No hype words, no rhetorical openers, no em dashes (zero on the page), sentence case, no "X. Not Y." deflations.
- Admit the weak spots plainly.

Five lines from the page:
1. "A second monitor you already own"
2. "Nothing you can hold. It's a download, and this is everything in it."
3. "You'll also need something with a web browser to be the second screen. That part you already own."
4. "Your computer shows a 6-digit code. Type it on the tablet, in the page you just opened."
5. "The rows where we come up short stay in."

FAQ answers are unchanged in fact (the FAQPage JSON-LD in `index.html` matches).

## Where the video goes
`src/components/home/HeroVideo.tsx`, under the hero headline, full container width:
- `VIDEO_SRC` and `VIDEO_POSTER` are empty strings.
- While empty, the slot shows `DeskDrawing` (laptop, tablet on a stand, a window across both) with its lettered key. It is plainly a line drawing and makes no claim to be footage; there is no apologetic caption.
- When set, it renders a muted, looping, inline `<video>` with a one-line caption.

## Drawings (`src/components/home/drawings.tsx`)
Two inks only: page-ink strokes and hatching, plus the spot blue (the dragged window's title bar, one chat bubble). Hatching stands in for shade and pictures; no flat colour fills.
- `DeskDrawing`: hero, with callouts A, B, C.
- `EdgeDrawing`: step 3 only, a close-up of the gap between the two screens with a window over it.
- `EmptyBox`: white on the blue band, inside hatched, front flap now swung forward (wider at the bottom).
- `PhoneMug`: beside Uses on desktop, captioned "A mug counts as a monitor stand."

## Page order
1. Hero: headline, lede, CTA, one line of small print (free, 2.5k+ downloads, requirements), then the drawing and key. On phones and tablets (iPad included), a "Reading this on a phone or tablet?" note with a send-link button.
2. What's in the box (blue band, packing list with 1× quantities)
3. Setup, all of it (the only numbered sequence)
4. The live app
5. What goes on the other screen (If / Then table, the 8 ms note)
6. Compared with the others
7. Each device gets its own settings (two live panels)
8. Which graphics chips it uses (plain text status, no chips)
9. Download (paper, solid cards, heavy blue edge on your own OS)
10. The small print (FAQ)
11. Footer

## Fixes from the critiques
- iPad detection: `src/lib/device.ts` treats a "Macintosh" UA with touch points as a tablet. Download no longer marks macOS as "Your computer" on an iPad, and the send-to-computer note shows on any touch device, not only below 640px.
- Demo gate label follows `(hover: hover) and (pointer: fine)`: "Rest the pointer here to try it" or "Tap to try the app". It sits in the app's empty header strip, off the QR code. The scrim is lighter (20%).
- Settings panel is cut at a card boundary (404px) with a note that it scrolls; Edit Device is as tall as its content.
- `systemDark` defaults to false, so the prerendered page shows the right Apple logo on a light OS.
- Windows requirement reads "Windows 10 version 2004 (May 2020) or newer" in both the hero and the card.
- Spacedesk: "Any device with a browser" is now a check with "HTML5 viewer", "Free" a check with "Personal use only"; Deskreen "Free" notes "1 device" (all from `rerun/compare-verified.md`).
- Step 2 and 3 copy rewritten as instructions; "There is no step 3" is gone.
- Cut jokes: "A stand. Not included. A mug works.", "not one of them came with packaging", "In normal-sized type.", "Read the setup (it's short)", "Drawn, not filmed", the "Or bookmark it" footer line. The negation packing list is now a list of what you actually get. "Slack, Discord, the inbox." is gone.
- The spec strip under the hero is gone, folded into one small-print line by the CTA.
- Stale `.demo-pill` and Download comments fixed.

## Rejected critique
- "Remove the full-bleed blue band" (both critics): the owner waived the no-band rule for these experiments, and the box band is the one place the identity is loud. Kept one band only; the mint/teal download band is removed.
- "Replace the hero drawing with a real app crop": the hero slot is reserved for the owner's video of the real moment, and real app imagery is two scrolls away (step 1 crop, the live demo). The drawing was reworked away from flat spot-illustration into a lettered two-ink figure instead.
- "Archivo wide is a trend": kept, because the second critic singled out the width system as the identity. Toned to wide only on the h1; section heads run at 106%.
- "Drop the ink rules between sections": kept as the leaflet's folds; borders inside sections were removed instead.

## What I cut
- The arrangement-panel hero (`Arrange.tsx`) and mini arrangements (`Mini.tsx`), the GitHub corner, the 3-up use-case cards (first pass).
- Registration marks, crop marks, dashed fold lines between steps, the hero figure frame, the grey step panels, the 8 ms grey box, the spec strip, GPU status chips, the filled compare column, the mint download band, dashed coupon edges, mint as a colour, flat colour fills in the drawings.
- Schibsted Grotesk.

## Lint
`pnpm lint` cannot run: the repo has no ESLint config (never has, per git history). `pnpm build` (strict tsc) passes.
