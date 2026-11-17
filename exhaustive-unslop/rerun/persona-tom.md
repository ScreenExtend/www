# Persona walkthrough: Tom (55, Mac in light mode, privacy-conscious, skeptical)

- Site: http://localhost:5181/, Playwright Chromium, 1280x800, `colorScheme: 'light'`
- Screenshots: `exhaustive-unslop/rerun/persona/tom/` (`vp-00`..`vp-08`, `faq-open-1..2`, `theme-click-1..3`, plus `page-text.txt`, `faq-text.txt`)
- Page height 6548px, so 9 viewports. FAQ: 6 `<details>` items, all opened.
- Capture note: the page uses `scroll-behavior: smooth`. My first pass captured mid-scroll frames that showed a fake ~100px gap above the sticky header. I re-shot with instant scrolling. That gap is a capture artifact and not a real bug. (`theme-click-1.png` is also a mid-scroll frame and can be ignored.)

Tom's goal is to make the old MacBook in his drawer a second screen for his iMac. He reads every word and looks for reasons to close the tab.

---

## Theme: a light-mode Mac user lands on a dark site

- **Measured:** with the OS set to light, the page loads with `data-theme="dark"` and a body background of `rgb(11,13,16)`. `localStorage` is empty, so this is the site's own default and not a remembered choice. **The site ignores his system setting on first visit.**
- **How it feels:** "Every other site I use follows my Mac. This one is black. Is it a gaming thing? A crypto thing?" To Tom, dark-by-default plus a lime accent reads as "developer tool for young people" and not "utility for me". It doesn't scare him, but it is the first small sign that the site wasn't made for him.
- **Is the toggle findable?** Somewhat. It is an unlabeled 18px moon icon between "GitHub" and "Download", in muted grey. Tom sees a moon and guesses "night mode", so he can probably find it. Its tooltip says only "Theme: Dark".
- **Cycle order:** Dark, then Light, then System, then Dark. One click gets him light, which is good. "System" sits third in the cycle, and the icon never says which option comes next. In System mode the page correctly turns light under his OS setting (`theme-click-2.png`). So the site can respect his setting. It just doesn't do so by default.
- **Light theme itself:** the hero is clean and calm, closer to what Tom expects. The app screenshots stay dark inside the light page, which is fine because they are real UI.

**Verdict:** default to System (`prefers-color-scheme`) and keep the toggle as an override. On the trust axis this is the cheapest fix on the page.

---

## Viewport by viewport

### VP0: hero (`vp-00.png`)
- **Raises trust:**
  - "Use your tablet as a second monitor." is plain and literal, with no hype words.
  - "Or your phone, or a spare laptop. All it needs is a web browser." This is exactly his case, though "spare laptop" is the third item listed.
  - "Source on GitHub" is a big plus for a skeptic. He can, in principle, look.
  - "Free" is stated flatly, with no "free trial" tricks.
  - The OS minimums "Windows 20H1+ and macOS 10.15+" are concrete.
- **Lowers trust:**
  - **"2.5k+ downloads"**: "Says who? Downloads of what, counted how? Is that 2,500 people or 2,500 clicks?" It sits highlighted in bold white, the only bold item in the strip, which makes it look like a sales number. For a free tool from one person it is a modest figure. Showing it this loudly invites scrutiny and doesn't add reassurance.
  - "Free" with no reason given. A skeptic's first question about free software is "how does he pay for the servers, and what's he selling?" Nothing here answers it.
- **Jarring visuals:** the stacked mint/blue/black "logo-stack" frame behind the app screenshot is fine. The dark app screenshot inside a dark page blends in a little.
- **Doubts:** "Download for Windows or Mac" is the main button, and it is the very first thing he is asked to do. He would rather learn what gets installed before being asked to install it.

### VP1: app screenshot and the start of the uses section (`vp-01.png`)
- **Raises trust:** it is clearly a real app UI: "What network is your device connected to?", "Wifi-Home", "Session ID", "Session OTP". Real, slightly unpolished UI looks more honest than a render.
- **Lowers trust / doubts:**
  - The "Anywhere (Internet)" QR points to `https://session.screenextend.app/...`. "So my screen goes through *his* server?" Nothing nearby explains what that server sees.
  - The local QR link is **`http://172.16.11.76:8080/...`**, plain **http**, not https. Tom knows the padlock rule, so this directly contradicts the later "Encryption: HTTPS and WebRTC" and the FAQ's "the stream is encrypted". He notices it.
  - The screenshot shows a full private IP and a Session ID and OTP. That is harmless, but he wonders whether it is a real session.

### VP2: "What you can do with it" (`vp-02.png`, `vp-03.png`)
- **Raises trust:** the uses are concrete and modest: "Keep Slack, Discord or your inbox on the tablet". "Calls and notes: The meeting on the spare laptop" is the one line that speaks to him directly.
- **Neutral:** "No Wi-Fi needed: ScreenExtend can start its own network". Tom's reaction: "It creates a Wi-Fi network on my Mac? What permissions does that need?" That is a new worry, not reassurance.
- **Doubts:** "No cable, no extra hardware" is fine.
- "Download free" appears again. This second download push comes before he has seen how it works.

### VP3: "How pairing works" (`vp-03.png`, `vp-04.png`)
- **Raises trust:**
  - "Nothing to install on the other device." This matters to him: his old laptop stays clean.
  - The four numbered steps are clear and calm.
  - "The real Add Device screen." He appreciates the honesty.
  - The six-digit code feels like a security measure.
- **Lowers trust:**
  - The example code "3 7 7 6 2 0" doesn't match the "Session OTP: 878222" in the hero screenshot. He might notice, and it is minor.
  - The lime "0" box looks like a highlighted or wrong digit. It is unclear why one digit is coloured.
- **Doubts:** "It streams over WebRTC". He doesn't know the term. Nothing tells him whether a local connection stays local.

### VP4: "Every screen gets its own settings" (`vp-04.png`, `vp-05.png`)
- **Jarring:** the Settings screenshot on the right **runs off the right edge of the 1280px viewport**, with its toggles cut at x=1280 and its lime base bar bleeding out. It looks like a layout bug, and to Tom a bug means "sloppy", which means "might be sloppy with my security too".
- **Raises trust:** "Public Internet Sessions: Allow devices to join over the internet via the 'Anywhere (Internet)' option using session.screenextend.app." It is a visible toggle, so he can switch off the internet path. **This is the most reassuring privacy fact on the page, and it is buried inside a cropped screenshot at 9px text.** The caption below doesn't mention it.
- A red "Remove Device" button: he can kick devices out. That is good.
- "read the debug logs": "Logs of what? Where are they stored?"

### VP5: "Under the hood" (`vp-05.png`, `vp-06.png`)
- **Raises trust:** "For the curious" acknowledges the existence of people like him. Concrete hardware names ("NVENC on NVIDIA... VideoToolbox on Mac") make it sound like a real engineer wrote it.
- **Doubts:**
  - "**Encryption**: HTTPS and WebRTC, with a certificate generated at runtime." To him, "certificate generated at runtime" sounds like a self-signed certificate. "Will my old laptop's browser show a 'Your connection is not private' warning? Will I be told to click through it?" Nothing prepares him for this, and it also conflicts with the `http://` link in the screenshot.
  - "**Up to 200% scale and 500 Hz per device.**" 500 Hz over Wi-Fi sounds like nonsense to him. One implausible spec undermines the believable ones next to it.
  - "Watches every network adapter". To a privacy person, "watches" is an unfortunate verb.
- **Missing:** whether local sessions ever touch the internet, and what `session.screenextend.app` relays: video, or only the handshake.

### VP6: Download (`vp-06.png`, `vp-07.png`)
- **Raises trust:**
  - The download buttons point to `github.com/ScreenExtend/ScreenExtend/releases/latest/...`, so the binaries live on GitHub and not on some random CDN. It would help to say so.
  - Exact OS versions with dates.
  - "Linux is not available yet" and "ARM build: not available yet". Admitting gaps feels honest.
- **Lowers trust:**
  - **There is no mention anywhere on the page of unsigned or unnotarized installers.** If the `.dmg` isn't notarized, macOS will say "ScreenExtend can't be opened because Apple cannot check it for malicious software", or, on newer macOS, "...is damaged and can't be opened". Tom will **stop there and delete it**. He will not right-click and choose Open, and he will not touch System Settings > Privacy & Security, because to him that is exactly what malware asks you to do. The page gives him **zero preparation**: no "here's what you'll see", no "why it isn't signed", no checksum, no screenshot of the prompt. **This is the single biggest conversion and trust failure for this persona.**
  - On Windows, the SmartScreen prompt ("Windows protected your PC... Unknown publisher") has the same problem.
  - There are no SHA-256 checksums, version number, release date or file size beside the buttons. Tom wants to know what he is getting, and how recent it is.
  - "2.5k+ downloads so far" appears a second time. The repetition makes it feel like padding.
  - ".msi... and .pkg... for bulk enterprise installs" is irrelevant to him, but harmless.
- **Missing for a Mac user:** permissions. A screen-extender almost certainly needs **Screen Recording** and maybe **Accessibility** (for input) on macOS. When macOS asks "ScreenExtend would like to record this computer's screen", Tom panics: "Record my screen? Send it where?" The page never mentions this.

### VP7: FAQ (`vp-06.png`, `faq-open-1.png`, `faq-open-2.png`)
- **Raises trust:** the answers are short and readable, with no marketing tone.
- **"Is my data secure?"** "Yes. Every session needs a one-time code to join... and the stream is encrypted." Opening with a bare "Yes." is the answer of a salesman, not an engineer. Tom wants: encrypted how, between what, and can the server see the video?
- **"What data does ScreenExtend collect?"** "None is stored. Settings stay on your device; a session only exchanges what's needed to set up the connection, then it's gone."
  - "None is *stored*" is not "none is collected". He notices the substitution right away. The question asks what is collected, and the answer dodges it.
  - "What's needed to set up the connection" is vague. Does it include his IP address? Is the IP logged?
  - The site has a Privacy Policy and a Cookie Policy. "If nothing is collected, why is there a cookie policy?" He would want this answer to link to the Privacy Policy and say plainly: "IP addresses pass through session.screenextend.app during pairing; we do not log them / we keep them for N days."
- **"How many devices can connect at once?"** "As many as you like". Unbounded claims sound like marketing.
- **"Can it game? ... 500 Hz"**: same doubt as before.
- **Missing questions Tom would ask:**
  - "Why is it free?"
  - "Who makes this?"
  - "Why does macOS warn me when I open it?"
  - "What permissions does it need?"
  - "Does my screen go through your server?"
  - "How do I uninstall it completely?"
  - "Is it open source, and under what licence?"

### VP8: Contact and footer (`vp-07.png`, `vp-08.png`)
- **Raises trust, and this is the strongest section for Tom:**
  - Separate addresses for support, privacy, abuse, security (with `security.txt`) and legal (DMCA). That looks like someone who takes this seriously.
  - "This website and the ScreenExtend Service are operated by Sarvesh Madullapalli, United States." A real name and a jurisdiction. Tom is moderately reassured that there is a person accountable.
  - The full set of policy links.
- **Lowers trust:**
  - It names an individual, not a company. Tom's reading: "A one-man project. Good that he's named, but what happens if he stops maintaining it? Is the server going to stay up?"
  - There is no link to a personal page, LinkedIn, GitHub profile or any sign of history: when the project started, how long it has been maintained. His first instinct is "let me Google him", and the page doesn't help.
  - "We reply within 72 hours." The "we" sits oddly beside a named individual. Small, but Tom notices inconsistencies.
  - "**© 2026 Sarvesh Madullapalli. All rights reserved.**" next to "Source on GitHub" makes him ask: "So is it open source or not?" No licence is stated anywhere on the page.
  - The operator identity appears only at the very bottom. Tom made his first trust judgment at the top, where "who makes this" is never answered.

---

## Claims Tom doubts

| Claim | Where | Why he doubts it |
|---|---|---|
| "2.5k+ downloads" | hero and Download | No source; shown in bold twice; reads like social-proof padding |
| "the stream is encrypted" / "HTTPS and WebRTC" | FAQ, Under the hood | The app screenshot shows a `http://172.16.11.76:8080` join link |
| "certificate generated at runtime" | Under the hood | Sounds like self-signed; he expects a browser warning, and nothing explains it |
| "None is stored" | FAQ | Answers "stored" when asked "collected"; there is a relay server and a Cookie Policy |
| "Yes." (is my data secure) | FAQ | A bare yes is a sales answer |
| "500 Hz per device" | Under the hood, FAQ | Implausible over Wi-Fi; makes the other specs look inflated |
| "As many as you like" | FAQ | Unbounded |
| "Source on GitHub" vs "All rights reserved" | hero, footer | Open source or not? Licence not stated |

## Unsigned-installer warnings

- **Would they scare him?** Yes, completely. Tom treats Gatekeeper's "cannot verify the developer / may contain malware" as a hard stop. If he is told to bypass it with no warning in advance, he concludes it is malware.
- **How the page prepares him:** **it doesn't.** "Gatekeeper", "SmartScreen", "unsigned", "notarized", "checksum", "permission" and "Screen Recording" appear nowhere on the page.
- **What would work for Tom:** a short, plain note directly under the download buttons, for example: "macOS will say it can't check this app because it isn't notarized yet (that costs $99/yr and is coming). To open it: ... Here is the SHA-256 so you can check the file matches GitHub." Also an honest line about the **Screen Recording permission** and why it is needed. That kind of honesty would *raise* his trust above where it started.

## Operator identity and contact

- The named operator, US jurisdiction, five role-specific emails, `security.txt` and full policies all genuinely reassure him. He rates this the most trustworthy part of the page.
- What it lacks: it sits at the bottom, there is no "about the maker" or project history, there is no link to his GitHub profile, and the "we"/individual wording is inconsistent.

---

## Top 10 fixes, ranked (for this persona)

1. **Prepare users for the Gatekeeper/SmartScreen warning right under the download buttons.** Say what they will see, why the app isn't signed, and how to open it safely, or sign and notarize it. Without this, Tom deletes the app at first launch.
2. **Default the theme to System (`prefers-color-scheme`)** instead of forcing dark. The site already supports it; only the default is wrong.
3. **Rewrite the "What data does ScreenExtend collect?" FAQ** to answer "collected" honestly: what passes through `session.screenextend.app` (IP? signalling only? never video?), whether anything is logged and for how long. Link to the Privacy Policy.
4. **State plainly that local sessions stay on the local network** and that the internet relay is optional and can be switched off. That toggle exists in the Settings screenshot, so surface it in text.
5. **Resolve the http/HTTPS contradiction.** Explain "certificate generated at runtime" (will the other device's browser show a warning?) or change the screenshot that shows the `http://` local link.
6. **List the OS permissions the app asks for** (macOS Screen Recording and Accessibility, Windows virtual display driver if any) and why.
7. **Add the version, release date, file size and SHA-256 checksums** next to each download, and say the files come from GitHub Releases.
8. **State the licence** (open source? which?) next to "Source on GitHub", and reconcile it with "All rights reserved".
9. **Tone down unverifiable or inflated numbers:** drop the bold on "2.5k+ downloads" (or show it once, with its source), qualify "500 Hz", replace "As many as you like" with a tested number, and change "Yes." to an explanation.
10. **Fix the Settings screenshot overflowing the right edge at 1280px**, and add a short "Who makes this" line near the top: name, link to his GitHub profile, project start date, why it's free.

## Scores (Tom's view)

| Axis | Score | Reason |
|---|---|---|
| Clarity | **7/10** | The headline, steps and uses are plain and easy to follow. It loses points for jargon (WebRTC, NVENC), unexplained "Anywhere (Internet)", the missing permissions and install story, and "spare laptop" being his case but never the focus. |
| Trust | **4/10** | The real screenshots, GitHub source, named operator and role emails help a lot. They are outweighed by: no preparation for installer warnings, the "stored" vs "collected" dodge, the http link next to "encrypted", the bare "Yes.", the bold download count, 500 Hz, no licence, and a dark default that ignores his OS. |
| Calm | **6/10** | Static and quiet, with no pop-ups, timers or animation, which he appreciates. Against that: the dark default under a light OS, the lime and mint accents, and three "Download" pushes before he understands what gets installed. |
