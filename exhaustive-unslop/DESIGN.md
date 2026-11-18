# The leaflet in the box

Branch `exp/leaflet`.

## The idea
The page is the printed leaflet and packaging of a well-made gadget, except the gadget is a free download. It's paper and ink with one spot colour (the logo blue) and the logo's mint and lime used like extra spot inks. The joke that gives it a voice is the packing list: what's in the box is nothing, because it's a download.

## Type
**Archivo** (Omnibus-Type, OFL), self-hosted as one variable woff2 with weight and width axes (`public/fonts/archivo-wdth.woff2`, preloaded in `index.html`). It's a sturdy 19th-century-style grotesk, and the width axis gives the system three voices from one family: headings set wide and heavy like a box front (118%/114%), step numbers and the code digits set condensed like manual figures (66%), and small print set at 90%. Hierarchy comes from width, weight and the spot colour as well as size. Tracking is never tighter than -0.012em. Schibsted Grotesk is removed.

## Colour
| Token | Light (paper) | Dark (ink stock) |
|---|---|---|
| paper | #f2f1ec | #121418 |
| surface | #e7e5dd | #1b1e24 |
| sheet (inside drawings, chosen card) | #fbfaf7 | #1f2329 |
| ink | #15171b (15.9:1) | #eceae3 (15.3:1) |
| muted | #55595f (6.2:1) | #a2a6ad (7.6:1) |
| link | #2152cc (5.9:1) | #8fb0ff (8.6:1) |
| line | #c9c6bb | #30343c |

- **Spot blue** `#2557e0` (white on it is 6.0:1; `spot-soft` #d9e4ff on it is 4.7:1). It fills the "What's in the box" band, buttons, the ScreenExtend column in the table and the chosen download card's edge.
- **Mint** `#d6f1ed` (dark mode: `#16302f`) is the ground of the download band. Muted text on it is 5.9:1 (light) or 5.7:1 (dark).
- **Lime** `#dcff4a` is for small things only: the "Free" sticker, the last code digit, the ticked box, the mug, "Experimental" and the text selection.
- There are no gradients, glows or opacity tints.

## Layout system
- A 12-column container. Major sections are split by a 1.5px ink rule, like the folds of a leaflet; inside a section, hairlines are used only in tables and the spec strip.
- Two full-bleed spot bands: blue (the box) and mint (download). Everything else sits on paper.
- Real print details, each used once:
  - registration marks on the hero figure and in the footer;
  - crop marks around the live app;
  - dashed fold lines between the three setup panels;
  - perforated (dashed) edges on the download coupons.
- The spec strip under the hero is the side panel of the box (price, downloads, requirements).
- Tables are ruled like printed tables: a heavy rule at the top and bottom and hairlines between rows.
- Radii are nearly square (2/3/4/6px).

## Motion
- **Entrance:** one entrance in the hero drawing. The window is dragged from the laptop until it sits across both screens, over 1.7s, once. That resting position is the final frame, so with `prefers-reduced-motion` the window is simply drawn there and nothing moves.
- **Feedback:** buttons press down 1px and change colour (150ms), and the FAQ plus rotates.
- The live demo's gate ring is unchanged.

## Voice
Deadpan instruction-manual wit, with true facts only. The rules:
- Use specific, observed situations, not categories.
- Make the joke once, then be useful.
- No hype words, no rhetorical openers, no em dashes, sentence case.
- Admit the weak spots plainly ("The rows where we come up short stay in").

Five lines from the page:
1. "A second monitor you already own"
2. "What's in the box. Nothing. It's a download."
3. "A stand. Not included. A mug works."
4. "There is no step 3. Okay, there is. Drag a window across, the same way you would onto a plugged-in monitor."
5. "The small print. In normal-sized type."

The FAQ answers say the same facts as before (and are synced into the FAQPage JSON-LD). The meta title and description are rewritten.

## Where the video goes
`src/components/home/HeroVideo.tsx`, in the right half of the hero:
- `VIDEO_SRC` (and optional `VIDEO_POSTER`) are empty strings.
- While they're empty, the slot shows the hand-drawn `DeskDrawing` (a laptop and a tablet on a stand, with a window across both). Its caption says "Drawn, not filmed", so it never passes as footage.
- When a file is set, it renders a muted, looping, inline `<video>`. Under reduced motion it doesn't autoplay and shows its controls instead.

## Drawings
All of them are hand-built SVGs in `src/components/home/drawings.tsx`, with strokes in page ink:
- `DeskDrawing` (hero, and again in step 3);
- `EmptyBox` (the open, empty box with a lime "Free" sticker);
- `PhoneMug` (a phone propped against a mug, captioned "A phone against a mug counts as a monitor stand.");
- `RegMark` and `CropMarks`.

## Page order
1. Hero, with the spec strip
2. What's in the box (blue band)
3. Setup, all of it (the only numbered sequence)
4. The live app (crop marks)
5. What goes on the other screen (run-in paragraphs and the 8 ms note, set in big condensed figures with the footnote)
6. Compared with the others
7. Each device gets its own settings (two live panels)
8. Which graphics chips it uses
9. Download (mint band, coupons, a solid outline on your own OS)
10. The small print (FAQ)
11. Footer ("Keep this leaflet for future reference. Or bookmark it, which is the same thing.")

## What I cut
- The arrangement-panel hero (`Arrange.tsx`) and the mini arrangements (`Mini.tsx`), replaced by line drawings of the real moment.
- The GitHub corner (`GitHubCorner.tsx`); GitHub stays in the nav and footer.
- The 3-up use-case card grid, replaced by run-in paragraphs.
- The blue plate behind the demo, replaced by crop marks.
- The rounded "Hover to try the app" pill, now a square spot-blue label.
- Schibsted Grotesk.
- A forty-tabs laptop drawing, which was too small to read.
