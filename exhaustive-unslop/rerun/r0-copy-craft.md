# R0: Copy Cynic + Craft Inspector (baseline, before)

Sources read: `src/components/home/*.tsx`, `src/components/Download.tsx`, `src/components/Contact.tsx`,
`index.html` (meta + JSON-LD), `src/lib/seo.ts`. Screenshots: `exhaustive-unslop/rerun/before/home-1440-light.png`,
`home-390-light.png`, `home-1440-dark.png`. The live measurements were taken with `getComputedStyle` /
`getBoundingClientRect` on http://localhost:5181/ at 1440x900 and 390x844 (DPR 1).

---

## Role 1: Copy Cynic

Legend: **FLAT** = generic/flat, **HYPE**, **UNVER** = unverifiable / no evidence on page, **TMPL** = template- or LLM-sounding.

### Meta / head (`index.html`, `src/lib/seo.ts`)

| Line | Tag | Problem |
|---|---|---|
| `<title>` / og / twitter: "ScreenExtend: use any device as a wireless second monitor" | UNVER, TMPL | "Any device" is an overclaim. The page itself says it needs a browser, and Linux is not supported as a host. "Wireless second monitor" is the category keyword every competitor uses. |
| description: "Turn any phone, tablet, or spare laptop into a wireless second monitor for your PC or Mac." | TMPL | "Turn X into Y" is the default SaaS opener. "Any" again. |
| "...streams your screen over WebRTC; free, with no client install." | ok | This is the one specific clause. It should lead. |
| JSON-LD: "with no app to install on the second device" | ok | Concrete. |
| JSON-LD SoftwareApplication has no download count / rating | gap | The owner fact "2.5k+ downloads" is nowhere on the site. |

### Hero (`HeroLanding.tsx`)

| Line | Tag | Problem |
|---|---|---|
| H1 "Use a tablet, phone or spare laptop as a second monitor." | FLAT | It is clear, but it is the category description, not a reason to choose this app. The actual differentiator ("only needs a web browser") sits in the subhead. |
| "Runs on your Windows PC or Mac. The second device only needs a web browser." | ok | Specific. This is the strongest line on the page and it is in muted grey. |
| CTA "Download for Windows or Mac" | ok | |
| Link "How pairing works" | FLAT | The nav calls the same section "How it works". The names disagree. |
| "Free. Windows 20H1 or later, macOS Catalina 10.15 or later." | ok | Good. "20H1" is jargon to non-IT readers; Download says "(May 2020)". |
| No proof line | gap | There is no evidence anyone uses it. "2.5k+ downloads" belongs here or under the Download button. |

### How pairing works (`ConnectFlow.tsx`)

| Line | Tag | Problem |
|---|---|---|
| H2 "How pairing works" | FLAT | Label, not a statement. Fine as a nav label, weak as a headline. |
| Step 1 "Open ScreenExtend" | FLAT | Every app's step 1. Says nothing about which machine. |
| "...a QR code and a join link for each network, plus Anywhere (Internet)." | jargon | "Anywhere (Internet)" is an in-app label used with no explanation. Reads like a UI string pasted into marketing copy. |
| Step 2 "Scan it on the other device" | FLAT | "it" has no clear referent in a standalone heading. |
| "It opens in the browser, with nothing to install." | ok | Repeats the hero (3rd time "nothing to install" appears: hero, step 2, specs "Client", FAQ, meta). |
| Step 3 "Type the 6-digit code" / "Your computer adds a virtual display sized to that screen." | ok | The best step copy: concrete cause and effect. |
| Step 4 "Drag a window across" / "It streams over WebRTC and fills the other device's screen." | jargon | "WebRTC" means nothing at step 4 of a how-to. "It" is ambiguous again (the window? the app?). |
| Visual caption "Example code" | ok | |

### Inside the host app (`FeatureScroll.tsx`)

| Line | Tag | Problem |
|---|---|---|
| H2 "Inside the host app" | FLAT | Flagged by the owner. "Host app" is internal vocabulary; users say "the app on my PC". |
| "Adjust each display" | ok-ish | Imperative feature-card title. |
| "Scale, orientation, refresh rate and video quality, set per device. Changing one leaves the others alone, and you can remove a device here." | TMPL (mild) | "and you can remove a device here" is a filler tail. The second sentence restates "set per device". |
| "Session settings" | FLAT | A settings-page name, not a benefit or fact. |
| "Regenerate the session code, start an offline hosted network, set a disconnect timeout and read the debug logs." | TMPL | A four-item list with "and" reads like a feature dump. "Read the debug logs" is not a reason to download. |

### Technical details (`Highlights.tsx`)

| Line | Tag | Problem |
|---|---|---|
| H2 "Technical details" | FLAT | Flagged by owner. |
| Streaming: "WebRTC, for low latency." | UNVER, HYPE (mild) | "Low latency" with no number. No ms figure appears anywhere on the site. Either give a measured number or drop the claim. |
| Client: "Any device with a modern browser." | UNVER | "Modern" is undefined. Which browsers and versions were tested? (The minimum OS versions are precise, but the client side is vague.) |
| Encoding: "NVENC, Quick Sync or VideoToolbox" | UNVER (partly) | Specific, good. But what happens on a PC with an AMD GPU or no hardware encoder? It is silent. |
| Encryption: "HTTPS and WebRTC, with a certificate generated at runtime." | ok | Specific. Pairs with the FAQ's unconditional "Yes" (below). |
| Limits: "Up to 200% scale and 500 Hz per device." | UNVER | 500 Hz is a striking number with no evidence. No phone or tablet panel runs at 500 Hz, so it reads as a slider maximum presented as a capability. Say "refresh rate slider up to 500 Hz", or state the realistic figure. |
| "Performance drops as you add devices." | UNVER | It is honest but vague: how much, and from what to what? |
| Discovery: "Watches every network adapter and rebuilds join links when they change." | ok | The kind of concrete detail the rest should match. |
| Per device: repeats FeatureScroll card 1 word for word ("Scale, orientation, refresh rate and quality") | repetition | |

### Download (`Download.tsx`)

| Line | Tag | Problem |
|---|---|---|
| H2 "Download ScreenExtend" | FLAT | Acceptable for a download block, but this is where "2.5k+ downloads" earns its place. |
| "Free for Windows and macOS. Linux is not available yet." | ok | |
| Linux "Coming soon as .deb, .rpm and AppImage." / "Will require Ubuntu 20.04" | UNVER | A roadmap promise with no date. "Coming soon" is the most template phrase on the page. |
| "ARM build: not available yet." | ok | Honest. |
| Windows notice: "It doesn't mean the app is unsafe" | UNVER | The site asserts this but cannot back it up. Better: link the GitHub release / source so people can check. |
| "...the warnings will stop once the builds are signed." | UNVER | Roadmap promise. |
| Mac notice: "That doesn't mean the app is unsafe." | UNVER | Same as the Windows notice. |
| "Your download is starting" (both) | ok | |
| ".msi / .pkg packages for bulk enterprise installs" | ok | |

### Questions (`FaqSimple.tsx`, mirrored in JSON-LD)

| Line | Tag | Problem |
|---|---|---|
| H2 "Questions" | FLAT | Flagged by owner. The nav says "FAQ", the heading says "Questions". |
| Q "How do I use ScreenExtend?" | repetition | Answer repeats the 4-step section above. |
| A "Yes. Every session needs a one-time code ... and the stream is encrypted." | UNVER, HYPE | An unconditional "Yes" to "Is my data secure?" is the classic unverifiable claim. "Encrypted" with no mechanism named here (the specs say HTTPS/WebRTC). Lead with the mechanism, not "Yes". |
| A "Gaming works if your network keeps up" | UNVER | Hedge with no number (latency, resolution). |
| A "HDR is coming in a future release." | UNVER | Roadmap promise, no date. |
| A "As many as you like" | HYPE, contradiction | Says "unlimited" and "performance drops" in the same answer. Say "No fixed limit; each adds encoding load on your computer." |
| A "...open the URL on the dashboard, no router needed." | ok | Concrete. Comma splice. |
| A "None is stored. ... a session only exchanges what's needed to set up the connection, then it's gone." | UNVER, TMPL | "What's needed" is vague. "Then it's gone" is a soft, LLM-ish cadence. The Anywhere (Internet) mode goes through `session.screenextend.app`, so say what that server sees and for how long. |
| Sub "Not covered here? Email support@..." | ok | |

### Contact (`Contact.tsx`)

| Line | Tag | Problem |
|---|---|---|
| H2 "Contact" | FLAT | Fine as a label. |
| "We reply within 72 hours." | UNVER | A service-level promise with no backing, and "We" for a one-person operator (the next block names a single individual). Prefer "Usually answered within 3 days" or drop it. |
| "This website and the ScreenExtend Service are operated by..." | TMPL (legalese) | The capitalised "Service" is legal-page voice leaking into the homepage. |
| Five separate mailboxes for one operator | tone | It reads corporate. It is fine for legal, but it is the largest block on the page after Download. |

### Claims with no evidence on the page (consolidated)

1. "low latency": no ms figure.
2. "500 Hz per device": no device runs it, and it reads as a slider max.
3. "Is my data secure? Yes.": unconditional.
4. "the stream is encrypted": mechanism not named in the FAQ.
5. "None is stored": no statement about the Anywhere relay/signalling server.
6. "Gaming works if your network keeps up": no figure.
7. "As many as you like": contradicted by "performance drops".
8. "any device" / "any phone" (meta): needs a browser; untested browsers are not listed.
9. "modern browser": undefined.
10. "doesn't mean the app is unsafe" (x2): asserted, not shown (no link to source or checksums).
11. "We reply within 72 hours": SLA.
12. Roadmap promises: Linux "coming soon", HDR "future release", "warnings will stop once signed".
13. Missing: the one strong, true proof point ("2.5k+ downloads") appears nowhere.

### Proposed headlines and titles (facts from the copy + "2.5k+ downloads" only)

**H1** (pick one):
- A. "Your tablet becomes a second monitor. All it needs is a browser."
- B. "A second monitor from a phone, tablet or laptop you already own. No app on it."
- C. "Scan a QR code on your tablet. Your PC gains a second screen."

**Hero subhead:** "ScreenExtend runs on your Windows PC or Mac and adds a virtual display sized to the other screen. Free. 2.5k+ downloads."

**Hero footnote:** "Windows 10 May 2020 update (20H1) or later, macOS Catalina 10.15 or later."

**Section titles:**

| Now | Proposed | Why |
|---|---|---|
| How pairing works | "Scan, type six digits, drag a window" | It states the whole flow in the title. Keep "How it works" as the nav label in both places. |
| Inside the host app | "Every screen gets its own settings" | This is the fact both cards share: per-device scale, refresh, quality, plus its own session code. |
| Technical details | "GPU encoding, WebRTC, nothing to install on the client" | Three verifiable nouns instead of a label. Alt: "How it streams". |
| Download ScreenExtend | "Download: free for Windows and Mac" + line "2.5k+ downloads so far." | It puts the proof where the decision happens. |
| Questions | "Security, refresh rate and offline use" (or "Before you install") | It names what the FAQ actually covers. Make the nav label match. |
| Contact | "Email support" or "Contact" (keep) | It is a utility block. Drop the "72 hours". |

**Step titles:** "Open ScreenExtend on your computer" / "Scan the QR code on your tablet or phone" /
"Type the 6-digit session code" / "Drag a window onto the new screen".
Step 4 body: "Your computer treats it as another monitor. Video goes over WebRTC." (WebRTC moves to the end.)

**Feature cards:** "Scale, refresh rate and quality per screen" / "One code per session, regenerate any time".
Session body: "Regenerate the 6-digit code to lock out other devices, or start an offline hosted network with no router."

**FAQ "Is my data secure?":** "Joining needs the 6-digit session code, which you can regenerate at any time.
Video goes over HTTPS and WebRTC with a certificate generated at runtime."

**Meta title:** "ScreenExtend: a second monitor in your tablet's browser" (54 chars).
**Meta description:** "Free for Windows and Mac. Scan a QR code on a phone, tablet or laptop, type a 6-digit code, and it becomes an extended display over WebRTC. No app on the second device. 2.5k+ downloads."

---

## Role 2: Craft Inspector

### Measured type scale (1440 / 390, light)

| Element | 1440 | 390 | Notes |
|---|---|---|---|
| h1 | 52px / 56.2 lh, 600, -1.3px tracking, 452px measure, 3 lines | 36px / 38.9 lh, 3 lines | clamp(2.25rem, 4.4vw, 3.25rem) has hit the max at 1440. The ratio h1:h2 is 52:36 = 1.44, small for a hero. |
| hero p | 18px / 29.25, #4b5560 | 18px | ~55ch, good. |
| h2 (all 6) | 36px / 40, -0.9px | 28px | Identical everywhere. |
| h3 steps | 18px 600 | | |
| h3 features / download | 20px 600 | | Two h3 sizes for siblings at the same level (18 vs 20). |
| body p | 16px / 26 | 16px | |
| FAQ summary | 18px 500 | | Larger than the step h3 body copy: FAQ questions (18/500) outweigh the step h3 (18/600) only by weight. |
| spec dt | 14px Plex Mono 500, lime | | |
| nav | 15px | | |
| small print | 14px | | |

The scale is effectively 14 / 15 / 16 / 18 / 20 / 36 / 52. That is seven steps, three of them within 4px (14/15/16) and two near-duplicates (18/20). There is no step between 20 and 36, so card titles look underweight next to section titles.

### Line length

- Hero p: 452px ≈ 55ch. Good.
- Step body (#how): 270px ≈ 36-38ch. That is narrow, which gives 3-4 ragged lines per step at 1440 ("Your computer shows a QR code and / a join link for each network, plus / Anywhere (Internet)."). At 1024 it is narrower still.
- Feature body: max 46ch inside a 560px card. Text stops at ~440px, leaving a ragged ~120px gutter under each card. Fine, but the two captions differ in length (3 lines vs 2).
- Spec dd: 400px ≈ 55ch. Good.
- FAQ answer: max 62ch. Good.

### Alignment and optical spacing

- The left edge is consistent (x=137 at 1440, 16px gutter at 390).
- Hero: the text column is vertically centred on the image stack (`items-center`), so the h1 starts at y=167 while the screenshot starts at y=145. Their tops miss by 22px, which reads as accidental rather than either "top-aligned" or "clearly centred".
- Hero stack: the lime block is offset 20px and the mint 40px down-right of the screenshot. The visible slivers are thin (about 20px of lime, about 20px of mint) and read as a thick drop-shadow border more than as "stacked screens". The screenshot is pushed off the right edge of the container by the pr-10 offset, so its right edge (x=1249) does not line up with the container edge (x=1289). Every other section's content ends at 1289.
- On 390 the shot is 319px wide versus the 343px text column (24px short on the right), so the image does not align with the full-width CTA above it.
- FAQ and Contact: the h2 top and the first row top line up exactly (3407/3407, 3967/3967). Good. But the first FAQ row has a border-top at that y while the h2 has none, so the left column floats.
- Section rhythm: every section uses py-24 (96px) except specs (80px) and the hero top (80px). Section heights at 1440 are 582 / 600 / 821 / 572 / 670 / 560 / 682, all about the same. Nothing gets more room, so nothing reads as more important.
- Download: the Linux "Coming soon" dashed box is exactly button height (44px) and sits in the button row. It reads as a disabled button.

### Contrast (computed)

- Light: ink #0f1419 on #fff ≈ 18.6:1; muted #4b5560 on #fff ≈ 7.6:1; muted on surface #f4f6f8 ≈ 7.0:1. All pass.
- Dark: muted #9aa4ad on #101214 ≈ 7.9:1. Pass.
- Spec band (per code comment, verified): white 6.2:1, #dfe8ff 5.1:1, lime dt 5.5:1 on #2456d6. All pass AA. The lime dt at 14px mono passes, but it is the lowest-contrast text on the page.
- Feature panels: the dark app crop on lime #dcff4a is very high contrast. The lime panel is the loudest surface on the page and it frames the least important screenshot (Settings).
- Dark mode: the hero lime/mint slabs and the two feature panels keep full-saturation light fills on #101214. That makes the brightest objects on a dark page flat colour blocks rather than the product.

### Screenshot quality and scale

| Image | Natural | Rendered @1440 | Scale | Rendered @390 | Legibility |
|---|---|---|---|---|---|
| Hero `feature-1-760.webp` | 703x420 (760w variant; full 1369x817) | 610x364 | 0.45 of full UI | 319x191 (0.23) | The QR codes read. All UI text (sidebar, "Session ID", button labels) is ~5px at 1440 and ~2-3px at 390. **Illegible.** |
| `crop-qr.webp` | 426x554 | 137x178 (fills 45% of panel) | 0.32 | larger (full-width panel) | QR legible, label tiny. |
| `crop-edit.webp` | 383x440 | 296x340 (fills 43% of panel) | 0.77 | 182x209 (0.48) | Readable at desktop. On mobile, slider labels ~5px. |
| `crop-settings.webp` | 1050x496 | 480x227 (46% of panel) | 0.46 | 295x139 (0.28) | **Illegible at both sizes.** At 390 the OTP digits and toggle labels are 2-3px. This is the crop most in need of a tighter crop. |

- At DPR 1 the hero loads the 760w file. It is sharp enough, but at that scale it is a thumbnail of a 1369px UI.
- Every crop sits in a padded panel with p-6/p-10 and fills only 43-46% of its panel's area. More than half of each tinted panel is empty colour.

### How much of the viewport is real product

- 1440x900 first viewport: the hero screenshot is 610x364 = **17.3%** of the viewport. The lime/mint slabs plus whitespace take more visual weight than the UI, and the UI text inside is unreadable.
- 390x844 first viewport: the screenshot is 319x191 at y=536, **18.5%** of the viewport. It is fully above the fold, which is good, but it is a 319px-wide image of a desktop window.
- Whole page at 1440 (4661px tall): product imagery (hero + 3 crops) ≈ 610x364 + 137x178 + 296x340 + 480x227 ≈ 455k px² ≈ **6.8%** of page area. The rest is type, rules and flat colour panels. The pairing diagrams (link chip, code cells, SVG) are drawn rather than captured.

### Radius, border, shadow consistency

| Element | Radius | Border | Shadow |
|---|---|---|---|
| Hero screenshot button | 10 (shot) | 1px line | shadow-shot |
| Hero lime/mint slabs | 10 | none | none |
| Step panels 1, 2, 4 | 8 (panel) | **none** | none |
| Step panel 3 (code) | 8 | **1px line** | none |
| Link chip inside step 2 | 6 | 1px #0f1419/15 | none |
| Code cells | 4 | 1px | none |
| Feature panels | 8 | none | none |
| Feature crops | 6 | none | shadow-shot |
| QR crop in step 1 | **0** (raw img) | none | **none** |
| Buttons | 6 | | |
| Notice | 8 | 1px | |

Issues:
- Step 3 is the only bordered step panel. It needs one because its fill is `surface` (near-white on white), but the row of four then has one odd card.
- Real screenshots are treated three ways: the hero gets border + shadow + 10px, the feature crops get shadow + 6px with no border, and the QR crop gets nothing (square corners, no shadow). The same kind of object should get the same frame.
- The shadow appears only on screenshots, which is consistent with the brief. But a 12px/32px blur shadow on a dark crop over flat lime reads as "floating card", the one depth effect on an otherwise flat page.

### Repetition of section structure

- Six of seven sections open the same way: top hairline, 96px padding, a left-aligned 36px h2, 40px gap, then a grid.
- Hairline-ruled lists appear four times: specs `dl`, download platform tops, FAQ `details`, contact `dl`. The bottom half of the page (Specs → Download → FAQ → Contact) is four consecutive rule-separated tables.
- "Tinted 4:3 panel + h3 + muted paragraph" appears twice in a row (How: 4-up, Features: 2-up). Features reads as a zoomed-in repeat of How rather than a different kind of section.
- FAQ and Contact use the identical 4/8 split with a heading and one muted line on the left. Back to back, they look like one section.
- The spec band is the only break in rhythm (full-bleed blue). It works, but it sits in the middle, so the page has no visual climax at Download, which is the conversion point.

### Top craft fixes (ordered)

1. Make the hero product readable. Crop the hero to the QR + session area at 1:1 or larger, or give it the full 7/12 column with no offset slabs eating 40px, so UI text is at least 10px.
2. Re-crop `crop-settings.webp` tighter (OTP row + one toggle). It is illegible at 480px and at 295px.
3. Unify the screenshot frame: one radius, border and shadow rule for every real screenshot, including the QR crop.
4. Collapse the type scale to 14 / 16 / 18 / 22 / 36 / 56 and use one h3 size.
5. Widen step copy (2-up at lg, or shorter copy) so the four columns are not 38ch ragged.
6. Break the four-rule-list tail: give Download more weight (bigger, the 2.5k+ line, no dashed pseudo-button) and merge or visually separate FAQ and Contact.
7. Align the hero image's right edge to the container and its top to the h1.
8. Rename nav and section titles so they match ("How it works" vs "How pairing works", "Features" vs "Inside the host app", "FAQ" vs "Questions").
