# Persona walk-through: Maria

**Who:** Maria, 41, office manager. Not technical. Windows work laptop, owns an iPad, system set to dark mode. A coworker told her "you can use your iPad as a second screen". Downloading things makes her a little nervous, and so does anything that looks complicated or "hacker-ish".

**Setup:** http://localhost:5181/, Playwright Chromium, 1440x900, `colorScheme: 'dark'`. I scrolled 820px per step (900px minus the sticky header, so nothing gets skipped) using instant scroll, and took 8 screenshots: `exhaustive-unslop/rerun/persona/maria/00.png` to `07.png`. I did not read the source code.

> Capture note: `html` has `scroll-behavior: smooth`. A first pass that used plain `scrollTo(0, y)` caught the page mid-animation, and those frames showed the sticky header floating 90 to 160px down the screen. That was an artifact of the capture, not something a real user sees. The frames were re-taken with `behavior: 'instant'`.

---

## Viewport 0 (hero), `00.png`

- **Notices first:** the big white headline **"Use your tablet as a second monitor."** It is exactly what her coworker said. Next she notices the blue **"Download for Windows or Mac"** button.
- **Understands:** her iPad (a tablet) can be a second screen, and "All it needs is a web browser." She takes that to mean no app on the iPad. That is a big relief, though the hero never says "iPad" or "nothing to install on the tablet" in plain words.
- **Feels:** *reassured, then a little uneasy.* The headline is plain and calm. The dark page matches her system, so there is no flash. Then the meta row: "Free · 2.5k+ downloads · **Windows 20H1+** and **macOS 10.15+** · **Source on GitHub**". She has no idea whether her laptop is "20H1+". "GitHub" in the top nav and again here reads as a site for programmers. "Free" and "2.5k+ downloads" help her trust it a little. 2.5k is small, but it is something.
- **The screenshot below the fold line:** the first thing she sees of the product is **two large QR codes**, an **"Online"** badge, and **"What network is your device connected to?"**. She thinks: *"Network? I just want my iPad to show my spreadsheet."* The pale-mint and blue offset frames behind the screenshot are the only colour on the page. They are calm, not flashy.
- **Jarring?** No. The background is one even dark colour. The button blue is the brightest thing on screen, which is right.
- **Main action:** obvious. Would she click it? **Not yet.** She wants to know it's safe and that it works with an iPad, so she scrolls.

## Viewport 1 (rest of the screenshot, then "What you can do with it"), `01.png`

- **Notices first:** a wall of **two huge black-and-white QR codes** that fill the top half of the screen, then `http://172.16.11.76:8080/?id=A2B8BN8SHXM` and **"Session ID: A2B8BN8SHXM6 / Session OTP: 878222"**.
- **Understands:** almost nothing in the screenshot. "OTP", an IP address and a port number are exactly the "hacker-ish" look she worries about.
- **Feels:** *intimidated.* This is the most technical-looking moment on the page, and it is the second thing she sees. The section below, "What you can do with it", calms her down again with "The other device works like any extra monitor. Drag windows onto it."
- **"Chat and email: keep Slack, Discord or your inbox on the tablet"** is very relatable for an office manager. *Reassured.* "Docs while you work: a reference, a spec or the **API docs**" has her thinking *"API? Not me."*
- **Jarring?** The QR codes are very high contrast (pure white blocks on a dark page) and are the brightest area on the whole site. That is the only real brightness jolt.

## Viewport 2 ("Uses" second row, then "How pairing works"), `02.png`

- **Notices first:** **"No Wi-Fi needed"** and **"Two screens on the road"**, then the big digit boxes **3 7 7 6 2 0**, where the last digit is a **lime-yellow** tile.
- **Understands:** you can take it on the road, and connect a phone *and* a tablet. "Scan a code, type six digits, drag a window across. Nothing to install on the other device." This is the clearest sentence on the page for her. *Calm, reassured.*
- **Feels:** The lime tile pulls her eye, and she wonders what is special about the "0". Nothing is; it just reads as decoration. The mono text `session.screenextend.app/?id=…` looks a bit techy.
- **Second CTA:** **"Download free" · "Windows and Mac"**. Good placement, right after the benefits. She is now about 50% likely to click.
- **Jarring?** The lime tile is a small, sudden pop of bright colour, but not alarming.

## Viewport 3 (pairing steps 3–4, then "Every screen gets its own settings"), `03.png`

- **Notices first:** the numbered steps. **"3 Type the 6-digit code"** and **"4 Drag a window across"**.
- **Understands:** four steps, which feels doable. But step 4 says "It streams over **WebRTC**". *"What's WebRTC? Do I need to install that too?"* Nothing nearby explains it.
- **Confusion:** the example code on the left is **377620**, while the app screenshot just above showed **OTP 878222**, and the Settings screenshot shows **878222** again. She wonders which code she types. A small inconsistency, but she is reading literally.
- **"Every screen gets its own settings":** she sees "Screen Size 1366x768", "Scale", "Refresh Rate 120 Hz" and "Video Scale". *Bored or intimidated:* "Do I have to set all this up?" Nothing says "the defaults just work".
- **Jarring?** No. The heading sizes are steady.

## Viewport 4 (settings screenshots, then "Under the hood"), `04.png`

- **Notices first:** a **bright red "Remove Device"** button and the **lime-yellow slab** behind the Settings screenshot, which **runs past the right content edge to about x=1422**, almost touching the window edge. It looks slightly broken or off-grid compared with everything else, which ends at x=1296.
- **Understands:** "Higher values encode faster but lower the quality" and "Public Internet Sessions… Create Hosted Network". *Confused.* Seeing "Public sessions enabled" switched **on** makes her worry: *"Public? Can strangers see my screen?"* The "is this safe?" question comes up hard here, and **nothing nearby answers it**. The answer is two sections further down, collapsed inside the FAQ.
- **"Under the hood"** starts on a **slightly lighter grey band**. It is a gentle shift, not jarring, and "For the curious:" signals that she can skip it. Good. But the content is "NVENC on NVIDIA, Quick Sync on Intel, VideoToolbox". *Intimidated, so she skims past.*
- **Jarring?** The lime block plus the red button make this the busiest-coloured viewport.

## Viewport 5 (rest of "Under the hood", then "Download ScreenExtend"), `05.png`

- **Notices first:** **"Download ScreenExtend"** and the two big blue buttons, **"Download .exe (64-bit)"** and **"Download .dmg (Universal)"**.
- **Understands:** Windows is on the left, so that one is hers. **"Encryption: HTTPS and WebRTC, with a certificate generated at runtime"** sits just above, and it is the only security wording in view. She half-understands "encryption" as good. "Certificate generated at runtime" means nothing to her.
- **Feels:** *mildly anxious.*
  - ".exe (64-bit)": is her laptop 64-bit? She doesn't know.
  - "Requires Windows Client 20H1 (May 2020) / Windows Server 20H2 (October 2020)". The date helps ("my laptop is newer than 2020, probably fine"), but "Client" and "Server" add noise.
  - "ARM build: not available yet." She doesn't know whether that applies to her.
  - The Linux column with a penguin and ".deb, .rpm and AppImage" is noise for her.
  - Nothing says what happens after she clicks: whether Windows will show a warning ("Windows protected your PC"), whether her work laptop needs admin rights, or whether she can uninstall it.
- **Main action:** very obvious. **Would she click? Maybe 50/50.** She hesitates because the link is a GitHub download and she has a work laptop. "Should I ask IT?" is not addressed anywhere.

## Viewport 6 (download footnotes, then "Questions"), `06.png`

- **Notices first:** the **"Questions"** heading and the **"Is my data secure?"** row.
- **Understands:** The footnotes above (".msi (Windows) and .pkg (Mac) packages for bulk enterprise installs are on the GitHub releases page") are aimed at IT people. She skips them. The FAQ questions are the questions she has. Opening "Is my data secure?" gives "Yes. Every session needs a one-time code to join… and the stream is encrypted." *Reassured.* And "What data does ScreenExtend collect? None is stored." *Reassured.*
- **But:** there is **no question about iPad, compatibility, or "do I need to install anything on my iPad?"**. "How do I use ScreenExtend?" covers part of it. "What resolution… Can it game?" isn't for her.
- **Jarring?** No. It is calm, with plenty of space. The "+" icons are quiet.

## Viewport 7 (Contact and footer), `07.png`

- **Notices first:** **"Contact — We reply within 72 hours."** and a list of five email addresses.
- **Feels:** *Mixed.* A real person's name ("operated by Sarvesh Madullapalli, United States") and proper policies (Privacy, Terms) **raise trust**: "it's a real, accountable thing". But **"Abuse and content reports"**, **"Security vulnerabilities… security.txt"** and **"Legal and copyright (DMCA)"** make her wonder *"why would a screen app need an abuse address?"* and feel slightly lawyer-ish or hacker-ish. "72 hours" sounds slow next to "support".
- **Main action:** the header "Download" button stays visible the whole time. Good.

---

## Is the main action obvious throughout?

Yes. The sticky header keeps a blue **Download** button in the top-right in every viewport. There is a hero CTA, a mid-page "Download free", and the download section itself. The problem is not finding the button. It is **confidence**. The hero button only jumps her about 4,500px down to `#download`, where she meets ".exe (64-bit)", "20H1" and GitHub. She would click the **hero** button (it is only an anchor, so it feels harmless). She would hesitate at **"Download .exe (64-bit)"**.

## Where her questions come up, and whether they're answered nearby

| Question | Where it arises | Answered nearby? |
|---|---|---|
| "Will it work with my iPad?" | Hero ("Use your tablet…") | **Partly.** The headline says "tablet" and "web browser". "iPad", "Safari" and "iPadOS" never appear anywhere on the page. |
| "Do I install something on the iPad?" | Hero | Answered late: "Nothing to install on the other device" appears in viewport 2. Not in the hero. |
| "Is my laptop 20H1+? 64-bit?" | Hero meta row, Download section | **No.** No plain-language "Windows 10 (2020 or newer) or Windows 11". |
| "What's that QR / OTP / IP address?" | Viewport 1 | Explained a screen later in "How pairing works". |
| "What's WebRTC?" | Step 4, Under the hood | **No.** Never explained in plain words. |
| "Public sessions? Can strangers see my screen?" | Viewport 4 Settings screenshot | **No, not nearby.** The FAQ two screens later says one-time code and encrypted, but it is collapsed. |
| "Is this safe to download on my work laptop?" | Download section | **No.** Nothing about the installer being signed, a SmartScreen warning, admin rights, uninstalling, or "ask your IT". |
| "Who makes this?" | Throughout | Answered in Contact: a named operator, US, policies. Good, but at the very bottom. |

## The exact moment she'd leave

**Viewport 4/5 boundary.** She reads **"Public Internet Sessions — Public sessions enabled"** (toggle on), then hits **"NVENC on NVIDIA, Quick Sync on Intel, VideoToolbox on Mac"**. At that point her thought is "this is for techy people", and she half-closes the tab to "ask my coworker to set it up for me". If she keeps going (about 50% would), the next exit point is **"Download .exe (64-bit)"** on a work laptop with no reassurance about safety or what installing involves. She would not click without asking a colleague first.

---

## Top 10 fixes, ranked

1. **Viewport 5, Download section, Windows column.** Add one plain reassurance line under the button, e.g. "Signed installer · about N MB · uninstall from Settings › Apps · no admin rights needed" (whatever is true), and say plainly whether Windows will show a warning. This is the biggest trust gap, right at the moment of commitment.
2. **Viewport 0, hero meta row.** Replace "Windows 20H1+ and macOS 10.15+" with human terms: "Windows 10 (2020+) or 11 · macOS Catalina or newer". Drop "Source on GitHub" from the hero, or move it next to the download buttons. It reads as "for developers".
3. **Viewport 0, hero subhead.** Name the device people actually have and the key relief: "Works with iPad, Android tablets, phones and laptops. Nothing to install on them, just open the browser." Today "iPad" never appears on the page.
4. **Viewport 1, hero screenshot.** The first product image is two giant QR codes, an IP address and "Session OTP". Crop it to show less, or caption it plainly ("Scan this with your iPad's camera"). Better still, lead with a picture of the *result* (a window on a tablet) rather than the pairing screen. A real photo or screenshot, not a device render.
5. **Viewport 4, "Public Internet Sessions" in the Settings screenshot.** Either crop that row out, or add a one-line caption beside it: "Only devices with your 6-digit code can join; the stream is encrypted." The safety answer must sit where the worry starts.
6. **Viewport 3, step 4 "It streams over WebRTC".** Say "It streams over your Wi-Fi (or the internet), encrypted" and leave WebRTC for "Under the hood".
7. **Viewports 2–4, code inconsistency.** The example code 377620 and the screenshots' OTP 878222 disagree. Use the same six digits everywhere so a literal reader isn't confused.
8. **Viewport 4, Settings screenshot frame.** The lime slab overflows the content column (it ends around x=1422, while everything else ends at 1296). Pull it back inside the grid so it doesn't look broken. It is also the loudest colour block on the page next to a red "Remove Device" button.
9. **Viewport 6, FAQ.** Add "Does it work with my iPad?" and "Is it safe to install on a work computer?" as the first two questions. Consider opening "Is my data secure?" by default. Move "Can it game?" lower.
10. **Viewport 5–6, download fine print and Contact.** Collapse the IT-oriented lines (".msi/.pkg for bulk enterprise installs", "ARM build", Linux package formats) under a small "Other downloads" line. In Contact, lead with "Questions? support@… — a real person replies" and push the abuse, security and DMCA addresses into the policies list. "72 hours" also reads as slow; say "usually within a day" if that's true.

## Scores (Maria's view)

| | Score | Why |
|---|---|---|
| **Clarity** | **6/10** | The headline and the "How pairing works" summary are excellent. Jargon (20H1, OTP, WebRTC, NVENC, .exe 64-bit) and the QR-heavy screenshot pull it down, and "iPad" is never named. |
| **Trust** | **5/10** | Free, a download count, a named operator, privacy policy and FAQ answers all help. But the download goes through GitHub with no installer reassurance, "Public sessions enabled" shows with no explanation, and the security answers are hidden in a collapsed FAQ. |
| **Calm** | **8/10** | One dark ground colour, no motion, steady type scale, flat colour accents. It matches her dark mode with no flash. Lost points: the bright QR wall in viewport 1, and the lime slab plus red button in viewport 4. |
