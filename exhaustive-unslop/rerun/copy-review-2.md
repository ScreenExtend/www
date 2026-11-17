# Copy review 2: ScreenExtend homepage

Source: `copy-now.md` (rendered from localhost:5181) checked against `src/components/home/*.tsx`, `src/components/Download.tsx`, `src/components/Navbar.tsx`, `src/lib/seo.ts`. Advice only; no site file was edited.

Overall: the copy is already plain and mostly honest. What's left is a handful of repeated lines, some jargon that leaks from the app's UI into the page, a few AI cadences ("No X, no Y", tidy tricolons, "however you like"), and two FAQ answers that dodge their own question.

---

## Part 1: first-time visitor, section by section

| Section | What I took away | Robotic / salesy / vague | Words I didn't get |
|---|---|---|---|
| Nav | Page has uses, how it works, settings, FAQ. | "Settings" in a site nav reads like *site* settings. "How it works" goes to a section titled "How pairing works". | "Uses" as a nav label feels clipped. |
| Hero | Free app; my tablet/phone becomes a second screen; nothing to install on it. | "just opens it in the browser": opens *what*? A link? The app? | none |
| Hero chips | Free, 2.5k downloads, Win 10+ and Catalina+. | Fine. | "Windows 10 (2020)": which 2020 version? |
| What you can do with it | Six ideas: chat, meetings, docs, travel, offline, multiple screens. | Heading is generic. Intro "use it however you like" is filler. "No cable, no extra hardware." is ad cadence. "No Wi-Fi needed" then the body says it makes its own network, which is... Wi-Fi. | "Docs" (Google Docs?) |
| Latency line | Something takes under 7 ms. | "Fast enough to work on." is a slogan. "add the rest" of what? I still don't know how laggy it feels. | "encodes", "90th percentile", "25H2" |
| How pairing works | Scan QR, type 6 digits, drag a window. Clear. | "Nothing to install" is the 2nd time I've read it. "The real Add Device screen" sounds defensive (as opposed to a fake one?). | "joins locally"; "code" means both QR code and 6-digit code here |
| Steps 1-4 | Clear. | Step 4 repeats "like any extra monitor" (3rd time on the page). | none |
| Every screen gets its own settings | Each device can be set up separately. | "the way it suits you" is filler. Settings card is one long list. | "offline hosted network", "disconnect timeout", "debug logs" |
| Graphics table | Most graphics chips work; AMD is iffy; Qualcomm isn't there yet. | "to keep the second screen smooth" is a soft sell. Heading says "Works with your graphics card" right above a "Not yet" row. Body says "graphics chip", heading says "graphics card". | NVENC, AMF, Media Foundation, Quick Sync, VideoToolbox |
| Download | Free, Win/Mac now, Linux later. | "Linux is not available yet" + "Coming soon" says it twice. 2.5k downloads also said twice on the page. | "Windows Client 20H1", "Windows Server 20H2", "Universal", "ARM", "bulk enterprise installs" |
| Questions | FAQ. | Heading generic. "Is my data secure? Yes." is too quick. Resolution question isn't answered with a resolution. "None is stored" dodges "what do you collect". | "virtual display", "dashboard", "HDR" |

---

## Part 2: line-by-line edits

| file:line | Current | Why it reads as AI / marketing | Rewrite |
|---|---|---|---|
| src/lib/seo.ts:6 (meta description) | Turn any phone, tablet, or spare laptop into a wireless second monitor for your PC or Mac. ScreenExtend streams your screen over WebRTC; free, with no client install. | "Turn any X into Y" is the stock SaaS opener. Semicolon bolts two fragments on. "client install" is dev-speak in a search snippet. | Use a phone, tablet or spare laptop as a wireless second monitor for your PC or Mac. It's free, streams over WebRTC, and the other device only needs a browser. |
| src/components/Navbar.tsx:10 | Uses | Clipped label, unclear out of context. | Use cases |
| src/components/Navbar.tsx:11 | How it works | Doesn't match the section it links to ("How pairing works"). | Pairing |
| src/components/Navbar.tsx:12 | Settings | Reads like settings for the website. | Per-device settings (or "In the app") |
| src/components/home/HeroLanding.tsx:41 | Or a spare laptop. ScreenExtend runs on your computer, and the other device just opens it in the browser. Nothing to install there. | "opens it": "it" has no clear referent. "Nothing to install there" is fine but then repeats 3 more times on the page. | A spare laptop works too. ScreenExtend runs on your computer. The other device just opens a link in its browser, nothing to install. |
| src/components/home/HeroLanding.tsx:60 | For Windows 10 (2020) or newer, and macOS Catalina or newer | Fine in tone, but "(2020)" is vague and doesn't match the Download section's "20H1 (May 2020)". | Windows 10 (May 2020 update) or newer, macOS Catalina or newer |
| src/components/home/UseCases.tsx:43 | What you can do with it | Generic heading, could sit on any product page. | What goes on the second screen |
| src/components/home/UseCases.tsx:45-46 | The other device works like any extra monitor. Drag windows onto it and use it however you like. | "use it however you like" is empty filler. "works like any extra monitor" is said again in pairing step 4 and the FAQ. | Windows treat it like a normal monitor, so you can drag anything onto it. A few things people put there: |
| src/components/home/UseCases.tsx:18 | Docs while you work | "Docs" reads as Google Docs; the card is about reference material. | Reference next to your work |
| src/components/home/UseCases.tsx:19 | A recipe, a spec or a how-to stays in view instead of hiding behind a tab. | Neat rule-of-three list. A recipe is an odd pick for a PC second screen. Keep facts; trim the triplet. | Keep a spec or a how-to open where you can see it, not buried in a tab. |
| src/components/home/UseCases.tsx:24 | Your laptop and the tablet in your bag make a dual-monitor setup. No cable, no extra hardware. | "No X, no Y." is a textbook ad cadence. | Your laptop plus the tablet already in your bag is a dual-monitor setup. You don't need a cable or anything else. |
| src/components/home/UseCases.tsx:28 | No Wi-Fi needed | Overclaims. The body says the app starts its own network, which the FAQ says is a Wi-Fi network you join. A skeptic catches this. | No router needed |
| src/components/home/UseCases.tsx:29 | ScreenExtend can start its own network, so the tablet connects straight to your computer. | Fine. Small tweak so it agrees with the new title. | ScreenExtend can make its own Wi-Fi network, so the tablet connects straight to your computer. |
| src/components/home/UseCases.tsx:61-63 | **Fast enough to work on.** Your computer captures, encodes and sends each frame in under 7 ms.* Your Wi-Fi and the other device add the rest. | Bold slogan + tricolon of verbs + vague "the rest". A non-technical reader doesn't learn how laggy it feels. | **How fast is it?** Your computer's part takes under 7 ms per frame.* The rest of the delay depends on your Wi-Fi and the other device. |
| src/components/home/UseCases.tsx (footnote) | *90th percentile. ScreenExtend 0.6.3 on Windows 11 (25H2) with an NVIDIA RTX 3080 Ti Laptop GPU. | "90th percentile" is jargon for most visitors. | *9 out of 10 frames, measured with ScreenExtend 0.6.3 on Windows 11 (25H2) and an NVIDIA RTX 3080 Ti laptop GPU. |
| src/components/home/ConnectFlow.tsx:32 | Scan a code, type six digits, drag a window across. Nothing to install on the other device. | Tidy three-beat tricolon plus the 3rd "nothing to install". The tricolon is OK here since it maps to real steps; cut the repeat. | Scan a code on the other device, type six digits, and drag a window over. |
| src/components/home/ConnectFlow.tsx:69-71 | **The real Add Device screen.** Every network your computer can reach gets its own code, so a phone on the same Wi-Fi joins locally. | "The real..." is defensive, as if answering an accusation of fakery. "code" collides with the 6-digit code above. "joins locally" is jargon. | This is the Add Device screen in the app. You get one QR code per network your computer is on, so a phone on the same Wi-Fi connects directly. |
| src/components/home/ConnectFlow.tsx:11 | It shows a QR code for your Wi-Fi, and one that works over the internet. | Fine. Optional: drop the comma. | It shows one QR code for your Wi-Fi and another that works over the internet. |
| src/components/home/ConnectFlow.tsx:19 | Your computer now treats the other device as a second monitor, sized to fit it. | Fine. Slightly stiff "sized to fit it". | That's it. Your computer now sees a second monitor, sized to match the device. |
| src/components/home/ConnectFlow.tsx:23 | Use it like any extra monitor. Move windows over and they show up on the other screen. | 3rd "like any extra monitor" on the page. | Whatever you drag onto it shows up on the tablet. |
| src/components/home/FeatureScroll.tsx:59 | Every screen gets its own settings | OK; a little slogan-shaped. | Settings for each screen |
| src/components/home/FeatureScroll.tsx:60 | Set each device up the way it suits you. Click a screenshot to see it full size. | "the way it suits you" is filler. | Your phone and tablet don't have to share settings. Click a screenshot to see it full size. |
| src/components/home/FeatureScroll.tsx:75-76 | Scale, orientation, refresh rate and video quality, per device. Changing one leaves the others alone, and you remove a device here. | Fragment then a clause tacked onto an unrelated clause ("and you remove a device here"). | Scale, orientation, refresh rate and video quality for one device. Changing it doesn't touch the others. You also remove devices from here. |
| src/components/home/FeatureScroll.tsx:91-93 | Regenerate the session code, start an offline hosted network so devices connect without a router, set a disconnect timeout and read the debug logs. | One long four-item list in app-UI vocabulary. | Make a new session code, or start your own network so devices can connect without a router. There's also a disconnect timer and the debug logs, if something goes wrong. |
| src/components/home/GpuSupport.tsx:52 | Works with your graphics card | Overpromises right above a "Not yet" row. | Which graphics chips it uses |
| src/components/home/GpuSupport.tsx:54-55 | ScreenExtend uses your computer's graphics chip to keep the second screen smooth. If it isn't supported, it falls back to the processor. | "to keep the second screen smooth" is a soft sell; "graphics chip" vs heading "graphics card". | ScreenExtend hands the video work to your graphics chip, which keeps the extra screen smooth. If your chip isn't supported, the processor does it instead. |
| src/components/home/GpuSupport.tsx:6-13 (api column) | NVENC / Quick Sync / VideoToolbox / AMF / Media Foundation | Meaningless to a non-technical reader, but useful to the curious. Not a voice problem. | Keep, but render smaller/muted (already muted) or move under "Full support details". No wording change. |
| src/components/home/GpuSupport.tsx:83 | Experimental: built, but not yet tested as thoroughly as the others. | Good, honest. Minor tightening only. | Experimental means it's built but hasn't been tested as much as the others yet. |
| src/components/Download.tsx:94 | Download ScreenExtend | Functional, fine. Keep. | (keep) |
| src/components/Download.tsx:96 | Free for Windows and macOS. Linux is not available yet. | Linux "not available yet" is said again two lines later ("Coming soon"). | Free for Windows and Mac. Linux is on the way. |
| src/components/Download.tsx:100-103 | 2.5k+ downloads so far | Same proof point as the hero; twice reads as pushing. | Cut here, or keep only here and drop from the hero. |
| src/components/Download.tsx:112-113 | Windows Client 20H1 (May 2020) / Windows Server 20H2 (October 2020) | Microsoft build-codename jargon; "Client" is not how people refer to Windows. | Windows 10, May 2020 update or newer / Windows Server, October 2020 (20H2) or newer |
| src/components/Download.tsx:125 | ARM build: not available yet. | Label-colon style; fine but terse. | No ARM version yet. |
| src/components/Download.tsx:140 | Download .dmg (Universal) | "Universal" means nothing to most Mac users. | Download .dmg (Intel and Apple silicon) |
| src/components/Download.tsx:147 | Will require | Stiff. | Will need |
| src/components/Download.tsx:151 | Coming soon as .deb, .rpm and AppImage. | "Coming soon" is stock phrasing. | Planned as .deb, .rpm and AppImage. |
| src/components/Download.tsx:223-227 | Using another operating system? Email support@screenextend.app with your device details and ask for a custom build. | Fine, slightly formal. | On something else? Email support@screenextend.app with your device details and I'll see about a custom build. *(only if "I'll see about" matches what the owner actually offers; otherwise keep "ask for a custom build")* |
| src/components/Download.tsx:230-234 | .msi (Windows) and .pkg (Mac) packages for bulk enterprise installs are on the GitHub releases page. | "bulk enterprise installs" is brochure language. | Installing on a lot of machines at work? The .msi (Windows) and .pkg (Mac) packages are on the GitHub releases page. |
| src/components/Download.tsx:177-179 (Windows notice) | This is how Windows treats any unsigned app. It doesn't mean the app is unsafe, and the warnings will stop once the builds are signed. | Reads human. Keep. | (keep) |
| src/components/home/FaqSimple.tsx:40 | Questions | Generic heading. | Before you install |
| src/components/home/FaqSimple.tsx:10-11 | How do I use ScreenExtend? / Run it on your computer, scan a QR code (or open the URL) on any other device, and enter the 6-digit session code. That device becomes an extended monitor. | Repeats the pairing section almost word for word. | Cut the question, or shorten: "Same as the pairing steps above: open the app, scan the QR code, type the 6-digit code." |
| src/components/home/FaqSimple.tsx:15 | Yes. Every session needs a one-time code to join, which you can regenerate anytime to lock out unknown devices, and the stream is encrypted. | A flat "Yes." to a security question is salesy. One long sentence chains three facts with "which" and "and". | Nobody can join without the 6-digit code, and you can make a new one anytime to lock out devices you don't recognise. The stream is encrypted, too. |
| src/components/home/FaqSimple.tsx:18 | What resolution and refresh rate can it do? Can it game? | "Can it game?" is awkward. And the answer gives scale, not resolution. | How sharp and how fast can it go? Can I game on it? *(and if a max resolution exists, add it to the answer; don't invent one)* |
| src/components/home/FaqSimple.tsx:19 | Each device goes up to 200% scale and 500 Hz. Gaming works if your network keeps up; heavy high-refresh video needs a strong connection. HDR is coming in a future release. | Semicolon pair is tidy-AI. "heavy high-refresh video" is vague. | Up to 200% scale and 500 Hz per device. Gaming works if your network keeps up, and fast-moving, high-refresh stuff needs a strong connection. HDR is planned. |
| src/components/home/FaqSimple.tsx:23 | As many as you like; each one gets its own virtual display. Performance drops as you add more. | Fine. Semicolon again. | As many as you want. Each gets its own display, but things slow down the more you add. |
| src/components/home/FaqSimple.tsx:27 | In Settings, start the hosted network with a name and password. Join that Wi-Fi on the other device and open the URL on the dashboard, no router needed. | "dashboard" is never defined elsewhere (page calls it the Add Device screen). Comma splice tag. | In Settings, turn on the hosted network and give it a name and password. Join that Wi-Fi on the other device, then open the link shown on the Add Device screen. No router involved. |
| src/components/home/FaqSimple.tsx:31 | None is stored. Settings stay on your device; a session only exchanges what's needed to set up the connection, then it's gone. | Answers "collect" with "stored" (a skeptic notices the swap). "your device" is ambiguous here, since the page calls the tablet "the other device". "then it's gone" is vague. | Nothing is kept. Your settings stay on your computer, and a session only swaps what it needs to connect. That's thrown away when the session ends. *(confirm "on your computer" and "when the session ends" with the owner before shipping)* |
| src/components/home/FeatureScroll.tsx:87 (alt) | Settings screen showing the Session OTP cells, the Public Internet Sessions toggle and the Create Hosted Network switch. | "OTP cells" is dev-speak read aloud by screen readers. | Settings screen showing the 6-digit session code, the Public Internet Sessions toggle and the Create Hosted Network switch. |

### Not flagged (reads human already)
Hero headline; "How pairing works" heading; step titles 1-4; "Example code. Each session has its own."; "Chat and email on the side" and its body; "Meetings off your main screen" body ("Or flip it." is a nice human beat); "More than one extra screen"; Windows/Mac unsigned-build notices; "Not covered here? Email ...".

### Repeats to resolve (pick one home for each)
- "Nothing to install": hero, pairing intro, FAQ 1 (keep hero + FAQ).
- "like any extra monitor": use-cases intro, step 4, FAQ 2 (keep one).
- "2.5k+ downloads": hero chips and Download (keep one).
- Linux "not yet" / "coming soon": Download intro and Linux column (keep column).

Note: `Highlights.tsx` ("Under the hood") isn't rendered on the current page, so it wasn't reviewed.
