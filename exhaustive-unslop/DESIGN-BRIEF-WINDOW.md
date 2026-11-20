# Design brief: "Window" version (charles-craft pass on Updated)

Signature move: **one window, two screens.**

## Basics
- Subject: ScreenExtend, a free, open-source desktop app (Windows, Mac) that makes any device with a browser an extended monitor over Wi-Fi.
- Audience: people with a spare tablet, phone or laptop who are not necessarily technical.
- Primary job: understand it in one glance, then download.

## Concept and world
- Concept sentence: "The page is one desk, and a window is always halfway across it." It rules out device renders floating in space, feature-card grids and any visual that does not show two screens.
- World: a desk with a laptop and a tablet side by side, and the moment a window is dragged from one to the other. The bezel gap between the screens is the product's whole idea.
- Character: plain, exact, a little playful.

## Ideas (20, scored 1-5 on Instant / Only them / Surprise / Story / Makeable / Beautiful; the idea with the best lowest score is kept)
| # | Idea (one line) | I | O | S | St | M | B | min |
|---|---|---|---|---|---|---|---|---|
| 1 | Macro: a window straddling the bezel gap between laptop and tablet, clipped by each screen | 5 | 5 | 4 | 4 | 5 | 4 | **4** |
| 2 | The headline itself split across two screens | 4 | 4 | 4 | 3 | 4 | 3 | 3 |
| 3 | Full real screenshot of the QR page in a laptop | 3 | 3 | 1 | 2 | 5 | 3 | 1 |
| 4 | Big "8 ms" number as the hero | 3 | 2 | 2 | 2 | 5 | 3 | 2 |
| 5 | A cursor dragging off the right edge of the page | 4 | 3 | 4 | 3 | 4 | 3 | 3 |
| 6 | Two browsers tiled, one showing the other | 2 | 3 | 3 | 2 | 4 | 2 | 2 |
| 7 | QR code at display size | 3 | 2 | 2 | 2 | 5 | 2 | 2 |
| 8 | Old laptop given a second life (before/after) | 3 | 3 | 3 | 4 | 3 | 3 | 3 |
| 9 | A desk seen from above with devices as rectangles | 4 | 3 | 2 | 3 | 5 | 3 | 2 |
| 10 | A Wi-Fi line drawn between devices | 3 | 2 | 1 | 2 | 5 | 2 | 1 |
| 11 | "Team chat" moved off the main screen, the main screen now clear | 4 | 4 | 3 | 4 | 5 | 3 | 3 |
| 12 | Six-digit code as giant type | 3 | 3 | 3 | 2 | 5 | 3 | 2 |
| 13 | A train table with laptop and phone | 3 | 3 | 3 | 3 | 2 | 3 | 2 |
| 14 | Settings sliders as the visual | 2 | 3 | 2 | 2 | 5 | 3 | 2 |
| 15 | The page width spanning two monitors | 3 | 4 | 4 | 3 | 2 | 3 | 2 |
| 16 | Window title bars as section headers | 3 | 3 | 3 | 2 | 5 | 3 | 2 |
| 17 | Comparison table as the hero | 2 | 2 | 2 | 2 | 5 | 2 | 2 |
| 18 | Pixel grid of a screen being sent | 2 | 2 | 3 | 2 | 4 | 3 | 2 |
| 19 | A drawer of spare devices | 3 | 3 | 3 | 3 | 3 | 3 | 3 |
| 20 | One line of copy set across both screens | 3 | 3 | 3 | 3 | 4 | 3 | 3 |

Kept: **1**. Second step (what it does next): on load the window slides from the laptop until it straddles the gap, which is the product's own behaviour. Caption test (12 words or fewer): "A chat window halfway between a laptop and a tablet, split by the bezel."

## Plan
- Colour (OKLCH, measured):
  - Field (hero, download): spot blue `#2557e0` L 0.514 C 0.215 h 264.5. Brand colour at full strength (loud-field route).
  - Second: paper `#eeefec` L 0.951 C 0.004. Gap to field 0.44.
  - Accent: logo lime `#dcff4a` L 0.944 C 0.200 h 120. 144.5 degrees from the field, 0.43 lighter than it, near the hue's chroma ceiling. It sits on the subject (the window), spills onto the primary button and covers about 15-20% of the first viewport.
  - Ink `#14161a` (devices, text on lime 15.9:1). White on field 5.97:1. No small text on surfaces between L 0.68 and 0.75.
  - Dark theme: field `#1a3a9c` (L 0.394), accent `#c4dc5a` (about 75% of the light accent's chroma), devices `#0d0f12` with a `#3a3f47` rim.
- Type: Archivo only. Display at weight 640, 112% width (calmed). Body at 400. The headline fits one line at 1024px and up.
- Layout: `macro` (not left-headline, not word-behind). Headline and lede are left-aligned over the quiet top of the field, with three real captions at the right. The device pair runs off the left and right edges and crosses the field-to-paper boundary, with at least 60px on each side.
- Alignment: everything left-aligned to the container edge. Nothing is centred except table cells.
- Hero captions (real, from the site): "8 ms to capture and encode a frame", "Windows and Mac", "Free and open source".

## Signature in every section
- Hero: the straddling window.
- Setup: step 3's window crossing the edge, and the real QR page crop at its connected moment.
- Use cases: the window drawn on the second device.
- Comparison: the ScreenExtend column header as a lime title bar.
- GPU: the 8 ms figure in a window with a lime title bar.
- Download: the second blue field, with a lime window-title bar on the card.
- FAQ: the open answer's toggle on lime.

## Rhythm
Hero (blue, display-led), then Setup (paper, 3 columns), Use cases (paper, list left and art right), Comparison (surface ground, full width), GPU (paper, number left and table right), Download (blue field, card), FAQ (paper, title left with list right).

## Motion budget
- One entrance: the window slides 260px into place, 700ms, `cubic-bezier(0.32,0.72,0,1)`, 200ms delay. Reduced motion places it with no movement.
- Feedback: press scale 0.96, under 150ms. Hover colour changes only on `:hover`.
- Theme swaps run with transitions off.
- FAQ opens with the grid rows `0fr` to `1fr` method, and closed answers are `inert`.

## Nearest default and plan review
- The nearest cluster is (d), a dark ground with one acid accent: lime on a dark screen inside the hero. Changes: the ground is the logo's saturated blue, not near-black. The lime lives on one object, not on lines and glows. The rest of the page stays on paper.
- Also checked against "SaaS hero with a laptop render": the devices are drawn flat, cropped by the frame, and show one specific moment, not a dashboard.

## Preservation
All copy, facts, sections, links, the download flow and the FAQ text stay. Only the hero visual (the DeskArrange drawing) is replaced by the macro window, and the setup step-1 replica by the real QR crop.
