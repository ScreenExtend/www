# Route /

## Meta

ScreenExtend: use any device as a wireless second monitor

description: Turn any phone, tablet, or spare laptop into a wireless second monitor for your PC or Mac. ScreenExtend streams your screen over WebRTC; free, with no client install.

og:type: website

og:site_name: ScreenExtend

og:title: ScreenExtend: use any device as a wireless second monitor

og:description: Turn any phone, tablet, or spare laptop into a wireless second monitor for your PC or Mac. ScreenExtend streams your screen over WebRTC; free, with no client install.

og:image:type: image/png

og:image:width: 1369

og:image:height: 817

og:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.

og:locale: en_US

twitter:card: summary_large_image

twitter:title: ScreenExtend: use any device as a wireless second monitor

twitter:description: Turn any phone, tablet, or spare laptop into a wireless second monitor for your PC or Mac. ScreenExtend streams your screen over WebRTC; free, with no client install.

twitter:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.



## Visible text

Skip to content
ScreenExtend
How it works
Features
FAQ
Contact
GitHub
Download
Use a tablet, phone or spare laptop as a second monitor.

Runs on your Windows PC or Mac. The second device only needs a web browser.

Download for Windows or Mac
How pairing works

Free. Windows 20H1 or later, macOS Catalina 10.15 or later.

Enlarge screenshot:
How pairing works
Open ScreenExtend

Your computer shows a QR code and a join link for each network, plus Anywhere (Internet).

session.screenextend.app/?id=…
Scan it on the other device

Use the camera, or type the link. It opens in the browser, with nothing to install.

3
7
7
6
2
0
Digits shown: 3 7 7 6 2 0.
Example code
Type the 6-digit code

Your computer adds a virtual display sized to that screen.

main screen
tablet
Drag a window across

It streams over WebRTC and fills the other device's screen.

Inside the host app
Open full screenshot:
Adjust each display

Scale, orientation, refresh rate and video quality, set per device. Changing one leaves the others alone, and you can remove a device here.

Open full screenshot:
Session settings

Regenerate the session code, start an offline hosted network, set a disconnect timeout and read the debug logs.

Technical details
Encoding
On the host GPU: NVENC (NVIDIA), Quick Sync (Intel) or VideoToolbox (Mac).
Streaming
WebRTC, for low latency.
Client
Any device with a modern browser. No app to install.
Networks
Local Wi-Fi, the host's own offline network, or Anywhere (Internet) across networks.
Encryption
HTTPS and WebRTC, with a certificate generated at runtime.
Per device
Scale, orientation, refresh rate and quality, set separately.
Limits
Up to 200% scale and 500 Hz per device. Performance drops as you add devices.
Discovery
Watches every network adapter and rebuilds join links when they change.
Download ScreenExtend

Free for Windows and macOS. Linux is not available yet.

Windows

Requires

Windows Client 20H1 (May 2020)
Windows Server 20H2 (October 2020)
Download .exe (64-bit)

ARM build: not available yet.

macOS

Requires

macOS Catalina 10.15 (October 2019)
Download .dmg (Universal)
Linux

Will require

Ubuntu 20.04 (April 2020)

Coming soon as .deb, .rpm and AppImage.

Using another operating system? Email support@screenextend.app with your device details and ask for a custom build.

.msi (Windows) and .pkg (Mac) packages for bulk enterprise installs are on the GitHub releases page.

Questions

Not covered here? Email support@screenextend.app.

How do I use ScreenExtend?

Run it on your computer, scan a QR code (or open the URL) on any other device, and enter the 6-digit session code. That device becomes an extended monitor.

Is my data secure?

Yes. Every session needs a one-time code to join, which you can regenerate anytime to lock out unknown devices, and the stream is encrypted.

What resolution and refresh rate can it do? Can it game?

Each device goes up to 200% scale and 500 Hz. Gaming works if your network keeps up; heavy high-refresh video needs a strong connection. HDR is coming in a future release.

How many devices can connect at once?

As many as you like; each one gets its own virtual display. Performance drops as you add more.

How does offline mode work?

In Settings, start the hosted network with a name and password. Join that Wi-Fi on the other device and open the URL on the dashboard, no router needed.

What data does ScreenExtend collect?

None is stored. Settings stay on your device; a session only exchanges what's needed to set up the connection, then it's gone.

Contact

We reply within 72 hours.

General support
support@screenextend.app
Privacy and data requests
privacy@screenextend.app
Abuse and content reports
abuse@screenextend.app
Security vulnerabilities
security@screenextend.app (see security.txt)
Legal and copyright (DMCA)
legal@screenextend.app
Service operator

This website and the ScreenExtend Service are operated by Sarvesh Madullapalli, United States.

Policies
Privacy Policy
Terms of Service
Acceptable Use Policy
Cookie Policy
ScreenExtend
Privacy
Terms of service
Acceptable use
Cookies
Contact
GitHub

© 2026 Sarvesh Madullapalli. All rights reserved.



## Alt, aria-label, title, placeholder

Open menu

Main

Theme: System. Switch to Light.

Enlarge

The ScreenExtend Add Device screen: one QR code and join URL for an Anywhere (Internet) session and one for the Wifi-Home network.

The Anywhere (Internet) QR code and join link in the ScreenExtend app.

Diagram: a window moving from the main screen onto the second device.

See the full screenshot

Edit Device controls: screen size, scale, refresh rate, video scale and video quality sliders, with Remove Device and Save changes buttons.

Settings screen showing the Session OTP cells, the Public Internet Sessions toggle and the Create Hosted Network switch.

Footer

Screenshot viewer