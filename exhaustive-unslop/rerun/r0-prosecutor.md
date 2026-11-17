# R0 Slop Prosecutor: ScreenExtend homepage

Evidence: `exhaustive-unslop/rerun/before/home-{1440-light,1440-dark,390-light,390-dark,1920-light}.png` and the live page at http://localhost:5181/ (computed styles measured with `getComputedStyle` at 1440px). No source code was read.

Verdict: this is not first-wave AI slop. There are no purple gradients, glows, emoji icons or three-card heroes. It is the **second-wave "tasteful default"**: IBM Plex Sans with Plex Mono labels, hairline rules, a centred 1152px column, 36px section titles, the same section skeleton repeated seven times, and a page that only looks like ScreenExtend because the screenshots say so. Ranked from most damning to least.

---

## Tier 1: damning

### 1. Safe IBM Plex everywhere, with Plex Mono as the "technical" signal
- Live: the page loads only `IBM Plex Sans 400/500/600` and `IBM Plex Mono 500/600`. h1, h2, body, buttons and nav all use `"IBM Plex Sans", system-ui`. The spec labels use `"IBM Plex Mono", 14px/500`.
- The wordmark "ScreenExtend" in the navbar and footer is set in mono (`home-1920-light.png`, top left). It is the default "dev tool" move.
- Plex is now the house font of AI-built "serious developer" landing pages, much as Inter was before it. Nothing about the typeface belongs to this product.

### 2. Monospace labels in the Technical details band
- `home-1440-light.png`, blue band at y~2230–2540: lime mono keys "Encoding", "Client", "Encryption", "Limits", "Streaming", "Networks", "Per device", "Discovery", each beside a sans value and separated by hairline rules.
- This is the textbook mono-label spec sheet: key/value rows in a two-column `dl` with 1px dividers. Linear-, Vercel- and Resend-style sites all do it, and models reproduce it on request for anything "technical".
- The mono is repeated in "session.screenextend.app/?id=…" (How pairing works, card 2), the "main screen / tablet" diagram labels (card 4) and the 6-digit code cells (card 3).

### 3. Every section is built the same way
- Live: all seven `<section>`s are 560–821px tall, and every h2 is exactly **36px** ("How pairing works", "Inside the host app", "Technical details", "Download ScreenExtend", "Questions", "Contact").
- Every section uses the same skeleton: left-aligned 36px h2, roughly 48px gap, a grid of equal columns, hairline above or below, then roughly 120px of padding. The grids are 4-up (pairing), 2-up (host app), 2×4 (specs), 3-up (download), 1/3 + 2/3 (FAQ) and 1/3 + 2/3 (contact).
- FAQ and Contact (`home-1440-light.png` y~3400–4450) are literally the same layout: a title and one-line subtitle in the left third, and hairline-separated rows in the right two-thirds. That is a sign of a component reused for convenience, not designed per section.
- On mobile (`home-390-*.png`) everything collapses into one long stack of identical image-then-title-then-grey-paragraph units, and the sections become indistinguishable.

### 4. Hairline minimalism as the entire design language
- 1px `line`-coloured rules separate the nav, hero, pairing, host app, download, FAQ and contact sections, and every spec row, download column top, FAQ row, contact row and the footer.
- `home-1440-light.png`: count the full-bleed grey hairlines between sections at y~357, 690, 1828, 2140 and 2515 (display coords). The page is held together with dividers instead of composition.
- The Download columns (Windows / macOS / Linux) each sit under a hairline with a small logo, a bold label and grey "Requires" text. This is the stock "pricing tiers without prices" layout.

### 5. A page that could belong to any product
- Remove the screenshots and the copy and you have the generic SaaS/dev-tool order: hero (h1 + sub + primary button + text link + fine print | product shot on the right), "How it works" in 4 numbered-style steps, "Features" in 2 cards, a spec band, Download, FAQ accordion, Contact, footer.
- The nav reads "How it works · Features · FAQ · Contact · GitHub · ☀ · [Download]", the most common landing-page nav there is.
- Nothing in the layout says "second monitor". There is no wide-screen proportion, no two-screen composition beyond a 4th-card doodle, and no sense of a display being extended.

---

## Tier 2: strong

### 6. Small display type and no visual mass
- Live h1: **52px / 600 / -1.3px tracking** at 1440. That is 3.6% of the viewport width. At 1920 (`home-1920-light.png`) the h1 sits in a column under 450px wide and the rest of the screen is empty.
- The h1 wraps onto 3 lines in a narrow left column ("Use a tablet, phone / or spare laptop as / a second monitor."). It is a polite size that never dominates.
- The h2s are 36px, so the jump from hero to section titles is only 1.44×. The hierarchy is flat and nothing on the page is big.
- Body copy, card descriptions and download notes are all grey (`muted`) 14–16px, so most of the page reads as fine print.

### 7. Everything on white (or everything on near-black)
- Live: 6 of the 7 sections have `background-color: rgba(0,0,0,0)`, meaning they inherit the page paper. Only `#specs` has a fill (`rgb(36,86,214)`).
- `home-1440-light.png`: from y=0 to ~2050 and ~2650 to the end, the page is white with grey text and blue links. The colour sits *inside* image tiles (mint, lime, blue), not in the page structure.
- `home-1440-dark.png` is the same page with `#111` paper. The dark theme is an inversion, not a design.

### 8. The one "bold" section is a token gesture
- The blue Technical details band is the only full-bleed colour and the only place lime type appears. It reads as "add one coloured band so it isn't all white", which is exactly what a model does when told to "add some colour from the brand".
- The band contains the most monotonous content on the page (8 key/value rows), so the boldest colour is spent on the least interesting material.

### 9. Offset stacked colour slabs behind the hero screenshot
- `home-1920-light.png`: the app screenshot has a lime slab offset +20px/+20px behind it and a mint slab offset +40px/+40px behind that.
- The "offset shadow cards behind a product shot" motif is a stock neo-brutalist/Dribbble trick. It stands in for a real composition and is the only decorative device on the page.

### 10. Image tiles in tinted boxes (soft card grid)
- How pairing works: 4 equal tiles (dark QR, mint URL field, grey OTP, blue diagram), each 150px tall with a title and 2–3 lines of grey copy underneath.
- Inside the host app: 2 large mint and lime tiles with a small dark screenshot floating centred in each, and a title and grey paragraph below.
- These are feature cards with the border removed: picture box, bold title, muted description, repeated N times. The tinted tile backgrounds work like the soft pastel feature-card fills of 2024 templates.
- In "Session settings" (lime tile) the screenshot is so small that its text is illegible at 1440 (`home-1440-light.png` y~1530–1750). The tile is colour, not information.

### 11. The fourth "diagram" is clip art
- How pairing works, card 4: outline monitor, outline tablet and a lime rectangle labelled "main screen" / "tablet" in mono. It is a flat icon illustration of the kind generators produce for "drag window across screens", and the only non-screenshot visual on the page.

---

## Tier 3: copy tells

### 12. Template section titles
- "How pairing works", "Inside the host app", "Technical details", "Download ScreenExtend", "Questions", "Contact". Each one is a label for the section's job, not a claim about the product, so the page says nothing in its headings.
- The nav still says "How it works / Features", which do not match the h2s ("How pairing works / Inside the host app"). These are generic slots renamed late.

### 13. Hero copy formula
- "Use a tablet, phone or spare laptop as a second monitor." / "Runs on your Windows PC or Mac. The second device only needs a web browser." / [Download for Windows or Mac] [How pairing works] / "Free. Windows 20H1 or later, macOS Catalina 10.15 or later."
- This is the h1 + one-line sub + primary CTA + secondary text link + reassurance microcopy pattern, applied verbatim. There is no voice, no opinion and nothing a competitor (Spacedesk, Duet, Splashtop Wired XDisplay) could not also say.

### 14. Spec-band filler phrasing
- "WebRTC, for low latency." "Any device with a modern browser. No app to install." "Scale, orientation, refresh rate and quality, set separately." These are fragment-style spec bullets. "No app to install" appears twice (Client row and pairing card 2: "with nothing to install").
- "Performance drops as you add devices." is the most honest line on the page, and it is buried in a mono-label row.

### 15. FAQ is the stock six
- "How do I use ScreenExtend?", "Is my data secure?", "What resolution and refresh rate can it do? Can it game?", "How many devices can connect at once?", "How does offline mode work?", "What data does ScreenExtend collect?". The set is generated by category (usage / security / performance / limits / feature / privacy), and "Is my data secure?" and "What data does ScreenExtend collect?" are the same question twice.

### 16. Contact block is a legal table, not a contact section
- Five hairline rows of role → email ("General support", "Privacy and data requests", "Abuse and content reports", "Security vulnerabilities", "Legal and copyright (DMCA)"), then "Service operator" and "Policies". This is compliance boilerplate shown at section scale on the marketing page. "We reply within 72 hours." is the only human sentence.

---

## Tier 4: structural / motion / minor

### 17. Motion: none, which reads as unfinished, not deliberate
- Live: `document.getAnimations().length === 0`, and 36 elements carry only colour transitions. The static page is not the problem in itself. The problem is that nothing else compensates: no scale, no contrast, no composition. Static plus small plus hairlines adds up to a wireframe.

### 18. 1920 shows the centred-container default
- `home-1920-light.png`: content is locked to a ~1152px centred column with ~384px of empty margin on each side. Nothing bleeds to the edges except the blue band and the hairlines. It is the `max-w-6xl mx-auto px-*` look.

### 19. Mobile is a single undifferentiated scroll
- `home-390-light.png` / `home-390-dark.png`: 7794px tall. The pairing cards, host-app tiles, spec rows, download blocks, FAQ and contact all become the same full-width stack. Without the blue band you could not tell where one section ends.
- The hero screenshot on mobile is about 115px tall, so the QR codes are postage stamps, and the one visual that carries the product shrinks to nothing.

### 20. Generic chrome
- The navbar has logo, 4 text links, a GitHub icon link, a sun icon theme toggle and a solid blue "Download" pill. The footer is one row of logo · 7 grey links · "© 2026 … All rights reserved." Both are interchangeable with any Tailwind UI or daisyUI starter.
- The primary blue (`#2456d6` / `#316cff`-ish solid buttons) is standard "SaaS blue". Two shades of near-identical blue (buttons vs spec band) are used without a reason for the difference.

### 21. Dark mode is a palette swap
- `home-1440-dark.png` matches the light screenshot pixel for pixel in layout. The mint and lime tiles stay bright pastel on `#111`, so they glare (Scan card, Inside the host app tiles), which shows the colours were picked for white and not re-tuned.

---

## Blandness checklist (as requested)

| Tell | Present? | Evidence |
|---|---|---|
| No visual mass | Yes | Nothing exceeds 52px type; largest block is a dark screenshot ~610px wide; the page is mostly grey text on paper |
| Small display type | Yes | h1 52px at 1440 and 1920; h2 36px uniformly; hero/section ratio 1.44 |
| Everything on white | Yes | 6/7 sections transparent on paper; colour only inside tiles and one band |
| Sections built the same way | Yes | Identical 36px h2 + grid + hairline pattern ×7; FAQ and Contact share a layout |
| Nothing memorable | Yes | The only distinctive elements are the offset lime/mint slabs and the blue band, both stock moves |
| Could belong to any product | Yes | Hero/How it works/Features/Specs/Download/FAQ/Contact order and nav are generic |
| Hairline minimalism | Yes | Section dividers, spec rows, download column rules, FAQ rows, contact rows, footer |
| Monospace labels | Yes | Lime Plex Mono keys in spec band, mono wordmark, mono diagram labels |
| Safe IBM Plex everywhere | Yes | Only Plex Sans + Plex Mono loaded |
