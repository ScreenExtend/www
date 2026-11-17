# Competitor comparison, verified 2026-11-17

Every cell was checked against the vendor's own page (rendered in a browser where the page is JS-only). "Not listed" means the vendor's docs don't mention the feature. Treat it as "no" on the site, but don't write "doesn't support X" as if the vendor said so.

ScreenExtend, for reference: Windows + Mac host, any browser client, nothing to install on the client, no extra hardware, no cable support, free, AGPL, no account.

## Main table

| Row | Apple Sidecar | Spacedesk | Duet Display | Deskreen | Luna Display (Astropad) | SuperDisplay (extra) |
|---|---|---|---|---|---|---|
| **Windows host** | No, Mac only ([src](https://support.apple.com/en-us/102597)) | Yes, Win 10/11 ([src](https://www.spacedesk.net/download/)) | Yes, Windows 10+ ([src](https://www.duetdisplay.com/duet-extend-to-a-second-display)) | Yes ([src](https://deskreen.com/)) | Yes, Win 10 64-bit 1809+ ([src](https://astropad.com/product/lunadisplay/)) | Yes, Win 10 1703+ 64-bit ([src](https://superdisplay.app/help/)) |
| **Mac host** | Yes, macOS 10.15+, 2016+ Macs ([src](https://support.apple.com/en-us/102597)) | Partial: beta 1.0.07, macOS 14.4+ ([src](https://www.spacedesk.net/download/)) | Yes, macOS 10.13+ ([src](https://www.duetdisplay.com/duet-extend-to-a-second-display)) | Yes ([src](https://deskreen.com/)) | Yes, 2011+, macOS 10.13+ ([src](https://astropad.com/product/lunadisplay/)) | No, none planned ([src](https://superdisplay.app/help/)) |
| **Linux host** (added) | No ([src](https://support.apple.com/en-us/102597)) | No, Windows/Mac only ([src](https://manual.spacedesk.net/PrimaryMachinePlatforms.html)) | No, Mac/Windows only ([src](https://www.duetdisplay.com/duet-extend-to-a-second-display)) | Yes, ARM/Raspberry Pi too ([src](https://deskreen.com/)) | No, listed as unsupported ([src](https://support.astropad.com/en/articles/11835376-will-luna-display-work-for-my-setup)) | No, none planned ([src](https://superdisplay.app/help/)) |
| **The second screen** | iPad only (iPadOS 13+, iPad 6th gen+ / Air 3+ / mini 5+ / any Pro) ([src](https://support.apple.com/en-us/102597)) | Android, iOS, Amazon Fire, Windows, HTML5 browser ([src](https://www.spacedesk.net/)) | iPad, iPhone, Android, Mac, PC ([src](https://www.duetdisplay.com/#pricing)) | Any device with a web browser (Smart TVs need Chrome/Firefox) ([src](https://deskreen.com/faq/)) | iPad (iOS 13.1+) or Mac (10.13+). From a Windows host: iPad or Mac only ([src](https://support.astropad.com/en/articles/11835481-connection-modes-in-luna-display-for-windows)) | Android phones/tablets, Chromebooks ([src](https://superdisplay.app/help/)) |
| **Install on the second screen** | Nothing, built into iPadOS ([src](https://support.apple.com/en-us/102597)) | Viewer app, or HTML5 browser viewer ([src](https://www.spacedesk.net/)) | App ([src](https://account.duetdisplay.com/portal/download)) | Nothing, browser only ([src](https://deskreen.com/faq/)) | App (free Luna app on both ends) ([src](https://astropad.com/product/lunadisplay/)) | App ([src](https://play.google.com/store/apps/details?id=com.kelocube.mirrorclient)) |
| **Extra hardware needed** | None ([src](https://support.apple.com/en-us/102597)) | None; its driver adds the display ([src](https://www.spacedesk.net/download/)) | None, "not requiring dongles" ([src](https://www.duetdisplay.com/)) | **Yes for extended mode:** Virtual Display Adapter (dummy plug), or a DIY software virtual display. Not needed for mirroring ([src](https://deskreen.com/faq/)) | Yes, Luna dongle (USB-C or HDMI) on the host ([src](https://astropad.com/product/lunadisplay/)) | None, Windows driver only ([src](https://superdisplay.app/)) |
| **Works over a cable** | Yes, USB ([src](https://support.apple.com/en-us/102597)) | Yes, USB + LAN cable ([src](https://manual.spacedesk.net/AndroidUSBCableConnection.html)) | Yes, USB (all plans) ([src](https://www.duetdisplay.com/#pricing)) | Partial: USB tethering workaround only ([src](https://deskreen.com/faq/)) | Yes, USB / Thunderbolt / Ethernet ([src](https://astropad.com/product/lunadisplay/)) | Yes, USB is primary; Wi-Fi is fallback ([src](https://superdisplay.app/help/)) |
| **Bluetooth connection** (added) | No: Wi-Fi; BT must be on ([src](https://support.apple.com/en-us/102597)) | No: USB, Wi-Fi, LAN only ([src](https://www.spacedesk.net/)) | No, not listed ([src](https://www.duetdisplay.com/#pricing)) | No: Wi-Fi/LAN only ([src](https://deskreen.com/faq/)) | No: Wi-Fi, USB, Ethernet ([src](https://astropad.com/product/lunadisplay/)) | No: USB, Wi-Fi only ([src](https://superdisplay.app/help/)) |
| **HDR on extended screen** (added) | No, not listed ([src](https://support.apple.com/en-us/102597)) | No, officially unsupported ([src](https://manual.spacedesk.net/Windows1110KnownIssuesandUnsuppo.html)) | No, not listed ([src](https://www.duetdisplay.com/#pricing)) | No, not listed ([src](https://deskreen.com/download/compare/)) | No, not listed ([src](https://astropad.com/product/lunadisplay/)) | No, not listed ([src](https://superdisplay.app/)) |
| **Use device's mic/camera** (added) | No, not listed ([src](https://support.apple.com/en-us/102597)) | No, webcam "Available Soon" ([src](https://www.spacedesk.net/)) | No, not listed ([src](https://www.duetdisplay.com/#pricing)) | No, one-way screen share ([src](https://deskreen.com/faq/)) | No, not listed ([src](https://astropad.com/product/lunadisplay/)) | No, not listed ([src](https://superdisplay.app/)) |
| **Price** | Free with macOS ([src](https://support.apple.com/en-us/102597)) | Free for private use (licence expires; update driver). Commercial licence by in-app purchase ([src](https://www.spacedesk.net/licensing/)) | No free plan, 7-day trial. Starter $2.99/mo billed yearly (**wired only**). **Air $3.99/mo billed yearly (~$47.88/yr) = cheapest wireless.** Pro $5.99/mo. Lifetime: Air $199 (on sale at $139). App Store: Air $5.99/mo or $49.99/yr ([src](https://www.duetdisplay.com/#pricing), [App Store](https://apps.apple.com/us/app/duet-display/id935754064)) | Community free (**1 connected device**). Pro $24.99/yr (5 devices). Teams $139.99/yr ([src](https://deskreen.com/download/compare/), [prices](https://deskreen.com/download)) | $89.99 one-time for the dongle ([src](https://astropad.com/product/lunadisplay/)) | Paid in-app unlock, 3-day free trial. Price not on official pages ([src](https://superdisplay.app/)) |
| **Open source** | No ([src](https://support.apple.com/en-us/102597)) | No, proprietary (datronicsoft) ([src](https://www.spacedesk.net/licensing/)) | No ([src](https://apps.apple.com/us/app/duet-display/id935754064)) | Partial: Community is AGPL-3.0; Pro/Teams are proprietary ([src](https://deskreen.com/download/compare/), [repo](https://github.com/pavlobu/deskreen)) | No ([src](https://astropad.com/product/lunadisplay/)) | No ([src](https://superdisplay.app/)) |
| **Account needed** | Yes, the same Apple Account on both devices, with 2FA ([src](https://support.apple.com/en-us/102597)) | No, none mentioned ([src](https://www.spacedesk.net/licensing/)) | Yes, "sign in with this account on each" ([src](https://account.duetdisplay.com/portal/download)) | Community: no. Pro/Teams: yes ("active devices per account") ([src](https://deskreen.com/download/compare/)) | No, none mentioned ([src](https://astropad.com/product/lunadisplay/)) | Google account for the purchase ([src](https://superdisplay.app/help/)) |

## Deskreen extended-mode detail (row 4)

- Official FAQ, "Is having a Virtual Display Adapter absolutely necessary?": *"No... screen mirroring and sharing single application window ... are working without any need for Virtual Display Adapter. The Virtual Display Plug is needed only if you want to extend your computer desktop to have a full secondary screen experience."* (https://deskreen.com/faq/). The homepage says the same: *"To have a true extended desktop experience Deskreen should be used with Virtual Display Adapter"* (https://deskreen.com/).
- FAQ, "Can I create a virtual display without a Virtual Display Adapter?": *"Yes. But you need to be ready and have free time to tinker with your operating system."* The FAQ links to discussion #86 (https://github.com/pavlobu/deskreen/discussions/86), where users report:
  - **Windows:** a dummy plug, or a third-party virtual display driver (usbmmidd, IDD-based drivers). The old Win+P trick no longer works on newer Windows 10 builds.
  - **macOS:** a dummy plug, or a third-party app such as BetterDisplay or FluffyDisplay.
  - **Linux (X11):** no hardware. `xrandr` virtual outputs (e.g. `VIRTUAL1`) work, sometimes without root, but Intel's VirtualHeads only works on Intel GPUs.
- FAQ: *"We plan to stop relying on Virtual Display Adapters in future releases."* No built-in virtual display driver exists as of today.
- Fair wording for the site: "Deskreen: extended mode needs a dummy display plug or a third-party virtual display driver."

## Spacedesk (rows 1 and 4)

- The site now lists "Driver available for: Windows 11/10, Mac OS" (https://www.spacedesk.net/). The download page shows **macOS 14.4+, "dmg BETA Version: 1.0.07"** (https://www.spacedesk.net/download/). The Play Store listing says "supports Windows and Apple MacOS (BETA)" (https://play.google.com/store/apps/details?id=ph.spacedesk.beta). So Mac support exists but is a beta: write it as "Partial" or "Mac (beta)", not "No".
- The Windows driver creates the virtual monitor itself. No extra hardware is needed.
- It has 10M+ Android downloads (Play Store), so it is clearly more widely used than Luna Display.

## Corrections likely needed on the site

1. **Duet price:** the cheapest Duet plan (Starter) is **wired only**. The cheapest wireless extended display is **Duet Air at $3.99/mo billed annually** on duetdisplay.com, or $49.99/yr / $5.99/mo on the App Store. Don't say "from $2.99" unless the cell says it's wired only.
2. **Deskreen is no longer simply "free":** the free Community edition is limited to **1 connected device**, and Pro is $24.99/yr. The homepage still says "connect as many devices as you want" but the comparison page says Community = 1.
3. **Deskreen works over a cable:** only through a USB-tethering workaround the vendor itself discourages. "No" or "Partial" both hold; "Partial" is more accurate.
4. **Sidecar needs an account:** the same Apple Account on both devices, with two-factor authentication.
5. **Luna from a Windows host** extends only to an iPad or a Mac, not to another PC.
6. **Sidecar and Bluetooth:** Sidecar needs Bluetooth turned on for wireless use, but Apple doesn't describe it as a Bluetooth display connection. "No Bluetooth connection" is fair.

## Uncertain / not verifiable from primary sources

- **HDR and mic/camera "No" for Sidecar, Duet, Deskreen, Luna and SuperDisplay:** these mean "not listed in official docs". Only Spacedesk explicitly says HDR is unsupported, and only Spacedesk mentions a webcam feature ("Available Soon").
- **Spacedesk HTML5 viewer:** listed on the homepage, but the old `viewer.spacedesk.net` host returned an expired TLS certificate, and the manual's Viewer Platforms page no longer lists HTML5. It may be deprecated, so write "app (browser viewer listed)" with care.
- **Spacedesk commercial price:** not published. It's only shown as an in-app purchase in each store.
- **Spacedesk account:** no account is mentioned anywhere. The free licence has an expiry date shown in the Driver Console.
- **Luna Display account:** no account requirement is mentioned on the product or support pages. "No" is an inference.
- **Luna price:** $89.99 is shown on the product page. Check that the USB-C and HDMI models are both that price if the cell says so.
- **SuperDisplay price:** shown only inside the Play Store purchase flow, so it isn't verified here.
- **Duet Mac host minimum:** the extend page says macOS 11+ for Apple Silicon and 10.13–10.15 for older Intel; the App Store text still says 10.9+. Use the website's figure.
- **Duet Mac/PC as client:** "connecting to another Mac or PC" needs Air or above; Starter excludes it.

## Extra options considered

- **SuperDisplay** (column above): Android to Windows, 1M+ Play downloads, 4.5★ from 21.5K reviews (https://play.google.com/store/apps/details?id=com.kelocube.mirrorclient). Its install base is larger than Luna's as far as public numbers show, and it's a common pick for Android tablets.
- **Windows "Projecting to this PC" (Wireless Display):** built into Windows 11 22H2+. It receives on another Windows PC or a Miracast TV/projector, but not on iPad/Android/browser, and Microsoft doesn't clearly document extend mode for it (https://support.microsoft.com/en-us/windows/screen-mirroring-and-projecting-to-your-pc-or-wireless-display-5af9f371-c704-1c7f-8f0d-fa607551d09c). It's not a like-for-like column, so I left it out.
