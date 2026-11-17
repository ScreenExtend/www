# R0: Skeptic and brand strategist read

Inputs: `rerun/before/home-1440-light.png`, `home-390-light.png`, `home-1440-dark.png`, `PRODUCT-TRUTH.md`, plus one owner fact: **2.5k+ downloads**. No source code was read.

---

## Role 1: First-time skeptic (PC, spare tablet, 10 seconds)

### What I understood
- The headline does its job: "Use a tablet, phone or spare laptop as a second monitor." I got it in about two seconds.
- "Runs on your Windows PC or Mac. The second device only needs a web browser." That is the line that matters to me. I don't have to install anything on the tablet.
- It's free. I only learned that from the small grey line under the button ("Free. Windows 20H1 or later..."), not from anything big.
- The hero picture is a dark app window with two QR codes. Once I read the small heading "What network is your device connected to?", I could guess that I scan one with the tablet.

### What I distrust
- **Who makes this?** No company name, no download count and no GitHub stars appear above the fold. The only GitHub mention is a small grey nav link. A free tool that streams my screen and offers an "Anywhere (Internet)" option makes me ask where my pixels go. The answer is in the FAQ ("Is my data secure?"), which is collapsed and four sections down.
- **"Anywhere (Internet)" is the first QR code I see.** For a monitor sitting next to me, the first option shown routes over the internet. Before I read anything, that looks like a relay or cloud service.
- **Latency.** Every product in this category is judged on lag, and the page never addresses it in the hero. "WebRTC, for low latency" is in the blue technical band, which is too far down.
- **No install on the tablet sounds too good.** Browser-only sounds clever, but people usually read "browser streaming" as "blurry and laggy." Nothing on the page counters that: no Hz figure, no "GPU encoded" claim near the top.
- **The Mac requirement line says Catalina 10.15**, and further down macOS still looks like an equal option. That's fine, but the download section and FAQ give me nothing beyond "Coming soon" for Linux. That's honest, and slightly reassuring.

### What felt generic
- The layout: headline on the left, product window on the right with offset coloured slabs behind it, a blue primary button and an underlined secondary link. It's tidy, but it is the standard 2024 SaaS hero.
- The four-step "How pairing works" row of equal tiles, then two equal feature panels, then a technical band, then download, FAQ and contact. Every section has the same left-aligned H2 at the same size, so the page reads like a template filled in.
- In the dark theme, the near-black page with a lime highlight leans toward the "dark + neon" look.
- On mobile (390) the page is a very long single column. Each pairing step becomes a full-width tile, so getting to Download takes a lot of scrolling. The sticky Download button in the header saves it.

### Where I would have left
- **At about 5 seconds, on the hero image.** The two QR codes are tiny and hard to read at 1440. I can't tell what I'm looking at without squinting, and I came for "tablet becomes a monitor," but the picture shows a settings window, not a tablet showing my desktop. If I'm unsure, I go back to the search results and click Spacedesk or Duet, whose names I already know.
- On mobile, I'd drop off somewhere in the four stacked pairing tiles. They take about two screen heights and add little beyond the hero.

### The question left unanswered
- **"Is it actually smooth, and does my screen go through your server?"** The page doesn't say "local Wi-Fi stays local", give an Hz or latency figure, or show any proof that other people use it (2.5k+ downloads exists but isn't shown) near the decision point. The FAQ has parts of the answer, but they're collapsed.

### Skeptic's quick fixes (copy and proof, not a redesign)
1. Put the real proof next to the button: "Free · 2.5k+ downloads · open source on GitHub". All three are true.
2. One hero line about local traffic, for example: "On the same Wi-Fi, the stream never leaves your network." The owner should confirm the exact wording against how the TURN fallback behaves.
3. A spec line under the CTA, taken from the FAQ: "GPU-encoded, up to 500 Hz per device."

---

## Role 2: Brand strategist

### Could this site belong to another product?
**Mostly yes.** If you swap the logo and name, this page would work for:
- **Deskreen**: also browser-based, also pairs by QR code, also free and open source. The hero (app window with QR codes) is close to what Deskreen would show. This is the biggest risk, because Deskreen is the closest competitor and the page doesn't say what's different.
- **Spacedesk**: free, Windows, "use any device as a second monitor". Same headline, same promise.
- **Duet / Splashtop XDisplay**: these need a client app, but the page structure (hero, how it works, features, download, FAQ) is the same.

### What is already unique (and underused)
**Verbal:**
- "The second device only needs a web browser" together with **"Create Hosted Network"**, an offline network the host creates itself with no router needed. None of the four competitors leads with this. It's the clearest ownable claim: works on a train, in a hotel, with no Wi-Fi.
- **Per-device everything**: each device has its own scale, refresh rate (up to 500 Hz) and quality. Competitors treat the second screen as one setting.
- The **6-digit session code** and the literal URL `session.screenextend.app`. Both are concrete and specific to this product.

**Visual:**
- **The logo is three offset screens stacked on each other.** Right now the hero only hints at it (an app window with a lime slab and a mint slab offset behind it), and in the wrong lime. That stack is the strongest visual asset the brand has, and the page treats it as decoration.
- Palette drift seen in the screenshots: the hero slab and the Session-settings panel use a bright yellow-lime (about `#dcff4a`), not logo lime `#a6e15a`, and the Technical details band is a deeper blue (about `#2456d6`), not logo blue `#316cff`. Logo **cyan `#1ccbdd` doesn't appear anywhere.** So the page is close to the brand without actually using it.

---

## Three art directions

Shared rules for all three: logo colours only (`#316cff` blue, `#1ccbdd` cyan, `#a6e15a` lime, `#d6f1ed` mint) plus neutrals; flat fills; no gradients, glows, scroll animation, parallax or 3D; the hero visual is a real app screenshot (`feature-1/2/3.png` or crops). IBM Plex is already self-hosted, so each direction says how to use it differently rather than adding fonts unless noted.

### Direction A: "The Stack"
**World statement:** Every screen you own is a layer. ScreenExtend lays them out the way the logo does: one main screen, extra screens offset behind it, each in its own colour.

**First viewport:**
- Full-bleed **mint `#d6f1ed`** page. Large on the right, the real **Add Device screenshot** (`feature-1.png`) at near 1:1 scale, so the QR codes can be scanned from the monitor. That itself is a demo.
- Behind it, offset down and to the right in exact logo geometry, sit two flat rectangles: **cyan** (first offset) and **lime** (second offset), with **blue** as a thick frame on the screenshot. The hero picture is the logo, built from the real app.
- Left column: the headline in very large type, the CTA and the proof line ("Free · 2.5k+ downloads · Open source").
- Section openers further down reuse the same three-step offset at small size, as bullets and dividers.

**Colour strategy:** Mint covers about 60% of the first viewport. Blue, cyan and lime each cover 5–10%, only as the stacked slabs plus the CTA (blue). Below the fold the page goes neutral white/ink, and the stack returns at each section start. About 25–30% of total page surface is colour.

**Type:** IBM Plex Sans in bold, very large (about 88–112px at desktop) with tight leading, set flush left in 2–3 lines. Plex Mono only for literal product strings (`session.screenextend.app`, `ScreenExtend_x64-setup.exe`, the 6-digit code). The headline gets a hard offset echo: one word ("monitor") sits on a lime block offset by the same distance as the logo layers.

**Why it's ownable:** No competitor can use this hero without using ScreenExtend's logo.

### Direction B: "Signal Card / Session Code"
**World statement:** The whole product happens in one moment: the code appears on your PC and you type it on the tablet. The site is built like a boarding pass for that moment.

**First viewport:**
- Split horizontally. The **top 60% is solid logo blue `#316cff`**, with the real **Settings screenshot** (`feature-3.png`, showing "Session OTP" and "Create Hosted Network") set flat in it and cropped so the OTP row and the hosted-network toggle are large enough to read.
- Across the seam between blue and the neutral lower band runs a **six-cell code strip**, one cell per digit in Plex Mono at display size. Each cell is a flat rectangle offset from the previous one by the logo's step, cycling blue / cyan / lime on mint. The pairing step becomes the brand mark.
- The lower band (white, or graphite in dark mode) holds the headline, the CTA and the proof row. Left-aligned and not centred, to avoid the centred-hero default.

**Colour strategy:** Blue floods about 55–60% of the first viewport. That is the commitment: the brand is blue, at the logo's own value. Cyan and lime appear only in the code cells and as the 4px top rule on each section, about 3–5%. Mint is the background behind each feature screenshot further down. In dark mode the blue field stays blue (it doesn't turn black), so the site is recognisable in both themes. Overall, about 35% of the page is blue across the hero, the Technical band and the download band.

**Type:** IBM Plex Mono is the display face: headline and section heads in Mono SemiBold, in sentence case, never tracked uppercase. Plex Sans for body text. Numbers (6 digits, 500 Hz, 200%, 2.5k+) are set in Mono at headline size as the main visual proof. That shows the product's specs instead of describing them.

**Why it's ownable:** "Type the 6-digit code" with no app, with the code as the logo, belongs to ScreenExtend. Deskreen uses a QR code only, and Duet uses an account login.

### Direction C: "No Router"
**World statement:** ScreenExtend works where nothing else does. It makes its own network. The site looks like a small, well-labelled field kit: plain cards, exact labels and the hosted network as the hero feature.

**First viewport:**
- Neutral **light-grey page (about `#eef0ef`)**. Real screenshots are placed like cards pinned to a board: **Add Device** large, with **Edit Device** (`feature-2.png`) and **Settings** smaller and offset behind it in the exact three-screen stagger of the logo. Each screenshot gets a flat border in one logo colour: blue on Add Device, cyan on Edit Device, lime on Settings. Each card has a mono tag below it ("1 Add Device", "2 Edit Device", "3 Settings") taken from the app's own sidebar.
- A thin flat diagram strip under the cards: `PC` ─ blue line ─ `hosted network` ─ cyan line ─ `tablet`, with a lime box "no router". Labelled rectangles only.
- Headline at left: "Your PC makes the network. Your tablet becomes the screen." CTA plus proof row.

**Colour strategy:** The most restrained of the three. Neutral grey and white make up about 85–90% of the surface. Logo colours appear as **thick borders (6–8px) and small flat labels**, about 10%. Each colour has one job everywhere on the site: blue = the PC / primary action, cyan = connection / network, lime = the extra screen / "it works" state, mint = the background of explanation panels. That consistent mapping is what makes the colour ownable rather than decorative.

**Type:** IBM Plex Sans Condensed (same family, so no new style) for headlines at large size, which gives a technical-label feel without hairline-broadsheet styling. Plex Sans for body. Plex Mono for every literal UI string, copied from the app ("Create Hosted Network", "Device Disconnect Timeout"), so the site uses the product's own words.

**Why it's ownable:** The offline hosted network is a real differentiator that none of the four competitors leads with. The colour-to-meaning mapping comes from the three logo screens.

### Default clusters avoided
- No cream + serif: backgrounds are mint, flat blue or cool grey, and the type is all IBM Plex.
- No near-black + neon: dark mode keeps blue/mint fields and uses logo lime `#a6e15a`, not the current `#dcff4a` yellow-lime.
- No broadsheet hairlines: the dividers are the logo's thick offset blocks or 6px colour borders.
- No purple SaaS: none of the three uses any purple or violet, and there are no gradients anywhere.

### Recommendation
Do **A (The Stack)** for the hero, using **B's** six-cell code strip in the pairing section and **C's** colour-to-meaning rule across the site. Whichever direction is chosen, first fix the palette drift: replace `#dcff4a` with logo lime `#a6e15a`, replace `#2456d6` with `#316cff`, and add cyan `#1ccbdd`, which is currently unused. Also add the proof row (Free · 2.5k+ downloads · Open source) next to the main CTA.
