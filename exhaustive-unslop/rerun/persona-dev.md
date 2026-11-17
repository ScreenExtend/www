# Persona walkthrough: Dev (19, iPhone, dark mode)

Dev is a college student who tapped through from a short video that said "turn your phone into a second monitor". He's mildly technical, impatient, and skims. He's on an iPhone (390x844, dark).

Run: http://localhost:5181/ with Playwright: 390x844, DPR 3, isMobile, hasTouch, colorScheme dark. The page is 8961 CSS px tall. Captures were taken with instant scrolling, 779 px apart, so that 65 px is overlapped under the sticky header. That gives 12 viewports plus an open FAQ and the open mobile menu. Screenshots are in `exhaustive-unslop/rerun/persona/dev/` (`vp-00` to `vp-11`, `faq-open.png`, `menu-open.png`).

Capture note: the page uses smooth scrolling. My first pass used `window.scrollTo(y)` and screenshotted in the middle of the animation. In those shots the sticky header looked as if it floated about 100 px below the top, over a blank band. That was an artefact of the capture, not a bug: the header measures `top:0`. Every shot was retaken with `behavior:'instant'`, and the notes below use those.

---

## Viewport by viewport

### vp-00: hero (0–844)
- **Notices first:** "Use your tablet as a second monitor." It is huge, white and centred. Then the full-width blue "Download for Windows or Mac" button.
- **Understands:** it's a second-monitor thing, and the second line says phones work: "Or your phone, or a spare laptop. All it needs is a web browser."
- **Feels:** a small "huh?" first. The video said *phone* and the headline says *tablet*, so his own device is demoted to an "or". The subline rescues it. "Free" and "2.5k+ downloads" read as honest and not hypey, and that helps. "Windows 20H1+ and macOS 10.15+" means nothing to him. "Source on GitHub" makes it feel legit, the way an open-source project does.
- **Colour/brightness:** calm. A near-black ground and one blue button. The hero screenshot at the bottom has mint and blue offset frames that peek in, plus two bright white QR codes. The QRs are the brightest thing on the screen.
- **Size:** the H1 at 36px is fine. The subline at 18px in muted grey wraps in a centred block, which is fine.
- **Tap targets:** "Source on GitHub" is 110x18 px, which is too short to hit reliably. The header "Download" button and the hamburger (44x44) are fine.
- **Big risk:** the hero screenshot shows two real-looking QR codes. On a phone, Dev's instinct is "scan this?", but he can't scan his own screen, and nothing says "this is what your *computer* will show".

### vp-01: "What you can do with it" (779–1623)
- **Notices first:** the H2 "What you can do with it", then a stack of bold mini-headings.
- **Understands:** use cases. "Keep Slack, Discord or your inbox on the tablet" lands well, because Discord is his world. "Docs while you work" works for coursework.
- **Feels:** OK, but it's all text. Six text-only items in a row and no picture of a phone acting as a monitor. He's skimming headings only by now. It says "tablet" again, and he's thinking "what about my phone?".
- **Colour:** a flat dark ground, no jolts.
- **Text:** the 18px lead paragraph runs to 3 lines. Each item is short, but the list as a whole (6 items about 135 px apart) reads as a long list.
- **Tap targets:** none.

### vp-02: rest of the uses, "Download free", start of "How pairing works" (1558–2402)
- **Notices first:** "Download free" (blue) beside "Windows and Mac", then the big "How pairing works".
- **Understands:** "No Wi-Fi needed" and "More than one extra screen" make sense to him. "Nothing to install on the other device" is the line he actually needed. It is the first clear statement that the phone needs no app, and it sits about 2,100 px down.
- **Feels:** "Download free" makes him ask "download *what*, onto *this*?" A second download CTA on a phone, with no hint to do it on the computer, is the moment of friction. The row of digit boxes "3 7 7 6 2 0" with a lime last box looks like an input. He might try to tap it.
- **Colour:** the lime "0" box is the first strong accent on the page. It's punchy but OK.
- **Tap targets:** "Download free" is fine.

### vp-03: pairing steps (2337–3181)
- **Notices first:** the cropped QR card on mint, and the big blue step numbers 1–4.
- **Understands:** step 1, "Open ScreenExtend on your computer", is the first time the page plainly says *the computer* runs the app. Step 2, "Scan it with the other device … nothing gets installed", tells him the phone's job.
- **Feels:** relief. This is the "oh, so I put it on my laptop and scan with my phone" moment. But it's the fourth viewport, and an impatient Dev may never get here.
- **Text:** the caption column next to the QR crop is very narrow at 390 px. "The real Add Device screen. Every network your computer can reach gets its own code, so a phone on the same Wi-Fi joins locally." wraps to 6 ragged lines and reads cramped. A monospace `session.screenextend.app/?id=…` line floats above it with no label.
- **Tap targets:** none needed.

### vp-04: "Every screen gets its own settings" (3116–3960)
- **Notices first:** the Edit Device screenshot, a large panel with sliders and a red "Remove Device" button, framed by a thick blue slab.
- **Understands:** there are settings. "Refresh Rate 120 Hz" catches his eye ("can it game?").
- **Feels:** neutral to bored. This is configuration detail for someone who already owns it. The red "Remove Device" button is visually loud and alarming out of context.
- **Colour:** the saturated blue slab plus the red button is the first real jump in brightness after the calm text sections.
- **Text:** fine. "Click a screenshot to see it full size" says *click* on a touch device.

### vp-05: Edit Device and Settings captions, start of "Under the hood" (3895–4739)
- **Notices first:** the lime-framed Settings screenshot. The lime slab is the brightest block on the page.
- **Understands:** session OTP, an internet toggle, a hosted network. The text inside the screenshot is about 7 px, unreadable on a phone.
- **Feels:** "this is getting long." The Settings caption is a 4-line sentence listing four features ("Regenerate the session code, start an offline hosted network …, set a disconnect timeout and read the debug logs."). That's a wall for him.
- **Colour:** the lime slab against near-black is jarring next to the blue slab one screen earlier. Then the background shifts to a slightly lighter grey band for "Under the hood". That shift is subtle but noticeable as a seam.

### vp-06 to vp-07: "Under the hood" (4674–6297)
- **Notices first:** a long list of bold labels: Encoding, Streaming, The other device, Networks, Encryption, Per device, Limits, Discovery.
- **Understands:** some of it. "NVENC on NVIDIA" registers vaguely as "uses my GPU". "500 Hz" sounds cool.
- **Feels:** **this is where he bounces** (see below). It's about 1,300 px of spec text with no image, and the heading itself says "For the curious". He isn't curious. He wants to know if it works and how to start.
- **Text:** each item is short, but nine in a row with identical styling makes a wall. "Per device" repeats the settings section he just scrolled past.
- **Colour:** the lighter grey band is mild.

### vp-07 to vp-08: Download (about 5900–6900)
- **Notices first:** "Download ScreenExtend", then the Windows logo and a full-width "Download .exe (64-bit)".
- **Understands:** Windows and macOS only. "2.5k+ downloads so far".
- **Feels:** confused about *where* to tap. On an iPhone, "Download .exe" would just dump an installer into Files, or fail. Nothing says "do this on your PC" or offers to send the link to his computer. "Requires Windows Client 20H1 (May 2020) / Windows Server 20H2" is noise to him. "ARM build: not available yet", the Linux block ("Will require Ubuntu 20.04 … Coming soon") and the "Using another operating system?" and ".msi … .pkg … enterprise installs" paragraphs are all irrelevant to a student. "Coming soon as .deb…" is indented about 4 px further than everything else, a small misalignment.
- **Tap targets:** inline `support@screenextend.app` is 187x19 and the "GitHub releases page" link is 144x19. Both are too short.

### vp-09: Questions (7011–7855)
- **Notices first:** six FAQ rows with "+" icons. They're easy to scan.
- **Understands:** "What resolution and refresh rate can it do? Can it game?" is exactly his question.
- **Feels:** this is the best mobile section on the page. The rows are big, tappable and calm. Opening "How do I use ScreenExtend?" gives the clearest instructions anywhere on the page: "Run it on your computer, scan a QR code … on any other device". It's buried at 7,200 px.
- **Tap targets:** the rows are fine. The inline support email in "Not covered here?" is 199x20, too short.

### vp-10 to vp-11: Contact and footer (7790–8961)
- **Notices first:** four email addresses (general, abuse, security, legal), a "Service operator" line with a person's name, a Policies list, then the footer.
- **Feels:** a little odd. It's a lot of legal and abuse plumbing for a free app. Seeing a named individual as operator tells him "solo dev", and that cuts both ways. The Policies links appear twice: once in Contact, once in the footer.
- **Tap targets:** the `security.txt` link is 80x20. The policy links in the Contact section are well spaced.

### Mobile menu
Uses / How it works / Settings / Under the hood / FAQ / GitHub, plus a theme toggle. It's clean. There's no "Download" inside the drawer, though the header button stays visible behind it.

---

## Is it clear he must download on his PC, not his phone?
**Only partly, and only late.** The hero button says "Download for Windows or Mac". That implies a computer, but it never says "on your computer". The first explicit statement is step 1, "Open ScreenExtend on your computer", at about 2,680 px, in the 4th viewport. Nothing tells a phone visitor **what to do right now on the phone**. There is no "Open this page on your computer", no "Send me the link", no copy-link and no "Remind me". Every Download button on mobile jumps to `#download`, and that section offers a `.exe` and a `.dmg` to an iPhone.

## Is the CTA clear?
It's clear as a button: blue, full width, above the fold. Its *job* is wrong for this visitor. On a phone the useful CTA is "get this onto your computer", but the page offers four Download buttons that all lead to installers he can't run.

## Bounce moment
**About 4,700 px, entering "Under the hood".** By then he has passed two big settings screenshots and hits "For the curious" spec text. If he didn't absorb step 1 in the pairing section, he leaves still unsure what to do. The earlier risk point is in the hero: he sees "tablet" plus two QR codes he can't use, taps "Download for Windows or Mac", lands on `.exe`/`.dmg` and leaves with the thought "not for my phone".

---

## Top 10 fixes (ranked)
1. **Add a phone-aware line under the hero CTA**, e.g. "On your phone? Install it on your computer, then open the link it shows here." Show it only on small or touch screens if the owner prefers.
2. **Give mobile visitors a real action:** a "Copy link" or "Send to my computer" (share sheet or `mailto:` to self) next to the Download button, instead of `.exe`/`.dmg`.
3. **Lead with "phone" or neutral wording in the H1** to match the traffic source ("Use your phone or tablet as a second monitor"), or say "any device" in the H1 and keep the subline.
4. **Put the 3-step "computer runs the app, phone scans the code" summary right under the hero**, one line each, instead of 2,600 px down. The FAQ answer "Run it on your computer, scan a QR code…" is already the right copy.
5. **Label the hero screenshot**, e.g. "What your computer shows. Scan it with your phone." That stops the "can I scan this?" confusion.
6. **Cut or collapse "Under the hood" on mobile**: put the 9 spec items behind a single disclosure, or keep only Encoding, Encryption and Limits. Drop "Per device", which repeats the settings section.
7. **Trim the Download section for consumers**: move Windows Server, ARM, enterprise .msi/.pkg and the "another OS" email into a "More options" disclosure, and shorten Linux to one line.
8. **Calm the settings screenshots on mobile**: the lime and blue slabs plus the red "Remove Device" are the page's biggest brightness jumps, and the screenshot text is unreadable at 390 px. Use a tighter crop of one control, or a thinner frame.
9. **Fix small tap targets**: "Source on GitHub" (18 px tall), the inline emails (19–20 px), "GitHub releases page" and `security.txt`. Add vertical padding or make them block links with a 44 px minimum hit area.
10. **Fix the narrow two-column pairing caption at 390 px** (stack the caption under the QR crop), change "Click a screenshot" to "Tap", align the "Coming soon" Linux line, and remove the duplicate Policies list in Contact.

## Scores (Dev's view)
- **Clarity: 5/10.** The product is clear, but what *he* should do on a phone isn't, and the PC-only install is stated late.
- **Trust: 7/10.** The real screenshots, open source, "Free", the download count and the plain tone all help. Heavy legal/abuse plumbing and a lone named operator read as "small project", which is fine.
- **Calm: 7/10.** A flat dark ground, no motion and restrained type. Docked for the lime and blue slabs plus the red button mid-page, and the long spec stretch.
