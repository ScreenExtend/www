# The leaflet in the box

Branch `exp/leaflet-main` (from `exp/leaflet`). Second pass after two adversarial critiques, then the merge pass below, which brought features over from the runner-up (www-final, served as :4188) redrawn in this leaflet's style.

## The idea
The page is the printed instruction leaflet of a well-made gadget, except the gadget is a free download. It is printed in two inks, page ink and one spot blue, on uncoated white stock (or, in dark mode, the brown-black board inside the carton). Its figures are lettered technical line drawings with a key, the way a manual explains parts, and since the merge pass the hero figure is live: the drawn windows move between the drawn screens.

## Merge pass (features from the runner-up, in leaflet style)
All drawings share one module: `src/components/home/lineart.tsx` (Device, Window, ArtLines, Callout, Hatch, Cursor), with geometry in `lineart-geo.ts`. Each device is drawn in its own units with the desk at y = 260, so any set can stand side by side. Devices: the laptop (lid, bezel, camera dot, base and notch), the tablet in a folio that folds into a hatched stand, a phone on a small stand (hatched back leg and a cradle), and an old laptop (smaller, thick bezel and chin). Windows are a title bar plus line content: doc, page (hatched picture), chat (bubbles, the last in spot), call (three tiles with heads), code (indented lines, one in spot), photo.

1. **Hero copy** is the runner-up's: "Make the tablet in your drawer a second monitor" and its lede, set in the leaflet's wide display cut. The small-print line (free, 2.5k+ downloads, requirements, Mac beta) is gone; the requirements live on the download card.
2. **Hero figure** (`DeskArrange.tsx`): the lettered desk drawing at full container width, with the runner-up's two switches. The devices stay put and the three windows (Notes, Team chat, The call) move. Drag with mouse or touch; over an edge a window shows on both screens and is dashed in between; on drop it snaps into the screen it covers most, scaled to fit, and one dropped on no screen goes back. Keyboard: every window is a tab stop, and the arrow keys, Enter or Space send it to the next or previous screen (left to right on the desk). A visible "Move <window> to the next screen" button acts on the picked window (the one with the spot title bar). Every move is announced in a polite live region. The switches "Add my phone" and "Add the old laptop" keep the runner-up's helper lines and sit in the key as its C and D rows; switching a device off sends its windows back to the computer. Under 600px the phone and old laptop stand on a second desk below, so nothing gets too small to grab.
3. **What's in the box is removed.** Its blue band now holds the window moment (`WindowMoment.tsx`, one line in App.tsx to drop): the runner-up's moment redrawn white on spot. It plays once when half in view, has Play again (hidden under reduced motion, which shows the end frame), the neutral caption, and the runner-up's heading and paragraph. `VIDEO_SRC`/`VIDEO_POSTER` stay empty; when set, a muted inline video with controls replaces the drawing and plays only after mount and without reduced motion.
4. **Setup step 1** shows the app's Expand QR view inline (`app-demo/QrInline.tsx`): the app window under its 75% black scrim with the code on white, two buttons that switch between the Anywhere (Internet) and Wifi-Home codes, the join link, and the note "An example. This code leads nowhere."
5. **What goes on the other screen** is the runner-up's picker, with its six situations and wording. Picking one redraws a line-drawn desk (laptop, tablet and phone as the case needs; the hotel case draws a dashed two-way link labelled "its own Wi-Fi"). Ruled list (2px ink top and bottom, hairlines between), the picked row on sheet with the computer glyph in spot. The mug drawing is gone.
6. **Edit Device panel** is at least as tall as the Settings panel (404px) and grows to fit the whole Edit Device sheet when one is opened, instead of cutting it off.
7. **Numbers**: "How fast it is, and which graphics chips it uses". The 8 ms figure in Archivo condensed (up to 8.5rem, link blue), "to capture and encode a frame", the computer's-half-of-the-trip explanation and the measurement footnote. The GPU table is the runner-up's design: filled spot square Supported, spot outline Experimental, grey outline Not yet, plain n/a; hairline rows, uniform 64px rows. Columns read Windows and Mac; "Apple Silicon".
8. **Download**: one wide card (heavy spot edge) for the visitor's computer, Windows when it can't tell (phones, tablets, Linux, the prerender). Under it, plain lines for the other OS's download, Linux status, the .msi/.pkg packages, and the custom-build email. The unsigned-build notices are unchanged. The download count is gone.
9. **FAQ**: every item has the same 1px hairline top and the list one hairline bottom; answers run the full width; plus when closed, minus when open.
10. **Footer** line is the runner-up's "Free and open source, for the screens you already own."
11. Social proof is TBD: no counts, stars or testimonials anywhere.

Removed as dead code: HeroVideo, InTheBox, DeskDrawing/EmptyBox/PhoneMug (drawings.tsx keeps only the step 3 close-up), Contact, Highlights, ShotButton, Screenshot and `useImage`. The theme helpers moved to `src/lib/theme.ts`, and `.eslintrc.cjs` (the runner-up's) was added so `pnpm lint` runs.

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
- **Lime** #dcff4a is now only the text-selection colour. Mint is not used.
- No gradients, glows, opacity tints or shadows on the page.

## Layout system
- 12-column container. Major sections are split by a 1.5px ink rule (the folds). No borders around figures, steps or callouts; containers only where they are a real object (download cards, the app's own window, tables).
- **One print device: lettered callouts with a key.** The hero drawing has A, B, C leader lines, and the key sits beside it in HTML (readable at 390px). Registration marks, crop marks and dashed fold lines between steps are all removed.
- One full-bleed band: the spot-blue window moment, in the box's old place. Download is back on paper.
- Tables are ruled like printed tables (heavy top and bottom, hairlines). Compare marks ScreenExtend by a ruled column and blue checks, not a filled "featured" column. On phones the feature names stick to the left while the table scrolls, with a "scrolls sideways" note above.
- Uses is a ruled picker: six situations, and a drawn desk for the picked one (under the row on phones).
- Radii nearly square (2/3/4/6px).

## Motion
The CLAUDE.md motion budget is waived for this experiment by the owner. What moves, and why:
- Hero entrance: the chat window is carried from the computer to the tablet (1.1s, once), which shows the windows move. Reduced motion: drawn on the tablet.
- Hero windows glide into place when dropped or sent by keyboard (200ms, transform only). Reduced motion: they jump.
- Window moment: plays once when half in view; Play again repeats it. Reduced motion: end frame, no button.
- The uses desk fades in (180ms), only after a pick.
- Feedback: buttons press 1px and change colour (150ms); switches slide (150ms).
- The video (once set) never autoplays from the prerendered markup.

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
`src/components/home/WindowMoment.tsx`, in the blue band after the hero. `VIDEO_SRC` and `VIDEO_POSTER` are empty strings; while they are, the band shows the drawn moment. The hero is the live drawing and no longer takes a video.

## Drawings
Two inks only: page-ink strokes and hatching, plus the spot blue (the picked or held window's title bar, the last chat bubble, one code line). On the blue band the same drawings print white. Hatching stands in for shade and pictures; no flat colour fills.

## Page order
1. Hero: headline, lede, CTA, then the live desk drawing with its key and switches. On touch devices, a "Reading this on a phone or tablet?" note with a send-link button.
2. The window moment (blue band)
3. Setup, all of it (the only numbered sequence; step 1 shows the live QR view)
4. The live app
5. What goes on the other screen (picker and drawn desk)
6. Compared with the others
7. Each device gets its own settings (two live panels)
8. How fast it is, and which graphics chips it uses (8 ms, GPU table)
9. Download (one card for your computer, the rest as links)
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
`pnpm lint` runs with `.eslintrc.cjs` and passes with zero warnings; `pnpm build` (strict tsc and the SSR prerender) passes.
