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
Uses
How it works
Settings
Under the hood
FAQ
GitHub
Download
Use your tablet as a second monitor.

Or your phone, or a spare laptop. All it needs is a web browser.

Download for Windows or Mac
How pairing works
Free
2.5k+ downloads
Windows 20H1+ and macOS 10.15+
Source on GitHub
Enlarge screenshot:
What you can do with it

The other device works like any extra monitor. Drag windows onto it and use it the way you'd use a second screen.

Chat and email

Keep Slack, Discord or your inbox on the tablet and give your work the whole main screen.

Docs while you work

A reference, a spec or the API docs stay in view instead of behind a tab.

Calls and notes

The meeting on the spare laptop, your notes on the main screen.

Two screens on the road

Your laptop and the tablet in your bag make a dual-monitor setup. No cable, no extra hardware.

No Wi-Fi needed

ScreenExtend can start its own network, so the tablet connects straight to your computer.

More than one extra screen

Connect a phone and a tablet at the same time; each gets its own display.

Download free
Windows and Mac
How pairing works

Scan a code, type six digits, drag a window across. Nothing to install on the other device.

3
7
7
6
2
0
Digits shown: 3 7 7 6 2 0.
Example session code. You can regenerate it in Settings.
session.screenextend.app/?id=…

The real Add Device screen. Every network your computer can reach gets its own code, so a phone on the same Wi-Fi joins locally.

1
Open ScreenExtend on your computer

It shows a QR code and a join link for each network it can reach, plus Anywhere (Internet).

2
Scan it with the other device

Use the camera, or type the link. It opens in the browser; nothing gets installed.

3
Type the 6-digit code

Your computer adds a virtual display sized to that screen.

4
Drag a window across

It streams over WebRTC and fills the other device's screen.

Every screen gets its own settings

Set each device up the way it suits you. Click a screenshot to see it full size.

Open full screenshot:
Edit Device

Scale, orientation, refresh rate and video quality, per device. Changing one leaves the others alone, and you remove a device here.

Open full screenshot:
Settings

Regenerate the session code, start an offline hosted network so devices connect without a router, set a disconnect timeout and read the debug logs.

Under the hood

For the curious: what happens between your computer and the other screen.

Encoding
Your computer's GPU encodes the extra screen: NVENC on NVIDIA, Quick Sync on Intel, VideoToolbox on Mac.
Streaming
WebRTC carries the picture and your input, for low latency.
The other device
Any device with a modern browser. Nothing to install.
Networks
Local Wi-Fi, the computer's own offline network, or Anywhere (Internet) across networks.
Encryption
HTTPS and WebRTC, with a certificate generated at runtime.
Per device
Scale, orientation, refresh rate and quality, set separately.
Limits
Up to 200% scale and 500 Hz per device. Performance drops as you add devices.
Discovery
Watches every network adapter and rebuilds the join links when they change.
Download ScreenExtend

Free for Windows and macOS. Linux is not available yet.

2.5k+ downloads so far

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

Theme: Dark. Switch to Light.

Enlarge

The ScreenExtend Add Device screen: one QR code and join URL for an Anywhere (Internet) session and one for the Wifi-Home network.

The Anywhere (Internet) QR code and join link in the ScreenExtend app.

See the full screenshot

Edit Device controls: screen size, scale, refresh rate, video scale and video quality sliders, with Remove Device and Save changes buttons.

Settings screen showing the Session OTP cells, the Public Internet Sessions toggle and the Create Hosted Network switch.

Footer

Screenshot viewer

# Route /privacy

## Meta

Privacy Policy | ScreenExtend

description: Privacy Policy for ScreenExtend. Effective date: June 13, 2026.

og:type: website

og:site_name: ScreenExtend

og:title: Privacy Policy | ScreenExtend

og:description: Privacy Policy for ScreenExtend. Effective date: June 13, 2026.

og:image:type: image/png

og:image:width: 1369

og:image:height: 817

og:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.

og:locale: en_US

twitter:card: summary_large_image

twitter:title: Privacy Policy | ScreenExtend

twitter:description: Privacy Policy for ScreenExtend. Effective date: June 13, 2026.

twitter:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.



## Visible text

Skip to content
ScreenExtend
Uses
How it works
Settings
Under the hood
FAQ
GitHub
Download
Privacy Policy

Effective date: June 13, 2026

This Privacy Policy explains what information ScreenExtend (Sarvesh Madullapalli, "we", "us", "our") processes when you use the ScreenExtend Service, why, and your rights. It supplements our Cookie Policy and forms part of our Terms of Service. Capitalized terms have the meanings given in the Terms.

In short: the current version of ScreenExtend is anonymous, hence there is no account. Screen content travels encrypted, peer-to-peer where possible, and we never store it or read it.

1. The se_cid cookie

When you join a session at session.screenextend.app, the relay sets a single strictly-necessary cookie, se_cid, containing a random opaque identifier with a 24-hour lifetime. It lets the relay route your session's signaling to the correct Host. It is not an advertising or tracking identifier. See our Cookie Policy for full details.

2. Salted IP hash and coarse location

To route and protect sessions, the relay computes a salted hash of your IP address and an optional coarse region hint (e.g. country/region) and forwards those to the Host. The relay does not forward your raw IP address to the Host.

3. Connection metadata in signaling

Establishing a WebRTC connection requires exchanging session descriptions (SDP), which contain network candidate information. This signaling passes through the relay in transit to coordinate your connection; SDP bodies are not stored.

4. Device metadata you provide on join

When you join as a Client, your device name, operating system, and screen dimensions are passed to the Host so it can set up the virtual display correctly.

5. The one-time passcode (OTP)

The OTP shown by the Host is entered by the Client and validated by the Host. It passes through the relay in transit and is never logged or stored by the relay.

6. Screen content

The screen content you choose to share is encrypted in transit (WebRTC SRTP) and sent peer-to-peer or, when a direct connection fails, via our TURN server. We do not store it and it is not readable by us.

7. TURN relaying

When a direct peer-to-peer connection cannot be established, media is relayed through turn.screenextend.app. Relayed traffic remains encrypted and is not inspected. TURN nodes may be located in one or more regions; see "International transfers" below.

8. Logs and metrics

We do not operate our own log storage. Our infrastructure provider, Railway (railway.com), automatically captures the console output of our services and retains it for a limited period under its own retention policy, after which it is deleted. This console output may incidentally include operational diagnostics such as active sessions, connect/disconnect events, and error messages. We never intentionally log OTPs, screen content, SDP bodies, or raw client IP addresses.

9. Sharing with Hosts

A Host you connect to is a separate party (often another user). When you join, the Host receives your client identifier, the device metadata in §4, and the salted IP hash / coarse region hint in §2. We do not otherwise sell or share your personal data, except with service providers that operate our infrastructure or where required by law.

10. Your rights and contact

Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data, or to object to or restrict its processing. Because the current version of the Service is anonymous, the data we can tie to an individual is limited. To make a request or ask a question, contact privacy@screenextend.app. You also have the right to lodge a complaint with your local data-protection authority.

11. International transfers

Our relay and TURN nodes may operate in more than one region, which can involve transferring data across borders. Where required, such transfers are made under an appropriate transfer mechanism.

12. Children

The Service is not directed to children under 13 (16 in the EEA/UK). See the eligibility section of our Terms of Service.

13. Changes

We may update this Privacy Policy from time to time and will update the "Effective date" above.

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

Theme: Dark. Switch to Light.

Footer

Screenshot viewer

# Route /terms

## Meta

Terms of Service | ScreenExtend

description: Terms of Service for ScreenExtend. Effective date: June 13, 2026.

og:type: website

og:site_name: ScreenExtend

og:title: Terms of Service | ScreenExtend

og:description: Terms of Service for ScreenExtend. Effective date: June 13, 2026.

og:image:type: image/png

og:image:width: 1369

og:image:height: 817

og:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.

og:locale: en_US

twitter:card: summary_large_image

twitter:title: Terms of Service | ScreenExtend

twitter:description: Terms of Service for ScreenExtend. Effective date: June 13, 2026.

twitter:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.



## Visible text

Skip to content
ScreenExtend
Uses
How it works
Settings
Under the hood
FAQ
GitHub
Download
Terms of Service

Effective date: June 13, 2026

These Terms of Service ("Terms") are a binding agreement between you and Sarvesh Madullapalli ("ScreenExtend", "we", "us", or "our") and govern your access to and use of the ScreenExtend desktop application, the screenextend.app website, the session relay at session.screenextend.app, the TURN service at turn.screenextend.app, and all related software and services (collectively, the "Service"). By downloading, installing, or using the Service, you agree to these Terms. If you do not agree, do not use the Service.

1. The Service

ScreenExtend lets a Windows computer (the "Host") present a virtual additional display to a web browser on another device (the "Client") over a network connection. Video is sent directly between the Host and Client using WebRTC, relayed through our TURN server only when a direct connection cannot be established. Our relay coordinates the connection ("signaling") but does not process, store, or have access to your screen content.

2. Eligibility

You must be at least 13 (16 in the EEA/UK) years old to use the Service. By using the Service you represent that you meet this requirement and that you have the authority to accept these Terms. The Service is intended for use on devices and networks you own or are authorized to use.

3. Accounts

The current version of the Service does not require you to create an account. Sessions are secured by a randomly generated session ID and a one-time passcode ("OTP") that the Host displays. You are responsible for keeping your session ID and OTP confidential; anyone with both can connect to your Host as a Client. We are not able to recover or reset these on your behalf.

4. Acceptable use

Your use of the Service is subject to our Acceptable Use Policy, which is incorporated into these Terms by reference. You are solely responsible for the content displayed, transmitted, or accessed through your use of the Service.

5. Your content

The Service transmits the screen content you choose to share between your own devices. We do not claim ownership of that content. You retain all rights to it, and you are solely responsible for it and for ensuring you have the rights necessary to display and transmit it. We do not monitor or store screen content; it is encrypted in transit by WebRTC (SRTP) and is not readable by us.

6. License

Subject to these Terms, we grant you a personal, non-exclusive, non-transferable, revocable license to download and use the Service for its intended purpose. You may not: copy, modify, reverse engineer, decompile, or create derivative works of the Service except to the extent this restriction is prohibited by law; resell, sublicense, or commercially exploit the Service without our written permission; or remove any proprietary notices.

7. Intellectual property

The Service, including its software, design, logos, and trademarks, is owned by Sarvesh Madullapalli and its licensors and is protected by intellectual-property laws. These Terms grant you no rights to our trademarks or branding.

8. Third-party services and networks

The Service relies on your web browser, your network connection, and public STUN/TURN infrastructure. We are not responsible for third-party software, networks, or services, or for any data charges, bandwidth limits, or interruptions arising from them.

9. Availability; beta

The Service may be modified, suspended, or discontinued at any time, with or without notice. Features may be offered on an early-access or "beta" basis and may be changed or removed. We do not guarantee any particular uptime, latency, or availability of the relay or TURN service.

10. Privacy

Our handling of personal data is described in our Privacy Policy and Cookie Policy, incorporated by reference.

11. Disclaimer of warranties

THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE", WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS, OR THAT ANY CONNECTION WILL SUCCEED. Some jurisdictions do not allow the exclusion of implied warranties, so some of the above may not apply to you.

12. Limitation of liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL SARVESH MADULLAPALLI, ITS OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATING TO YOUR USE OF (OR INABILITY TO USE) THE SERVICE. OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SERVICE IN THE 12 MONTHS BEFORE THE CLAIM, OR (B) USD 50. Some jurisdictions do not allow certain limitations, so some of the above may not apply to you.

13. Indemnification

You agree to indemnify and hold harmless Sarvesh Madullapalli and its affiliates from any claims, damages, liabilities, and expenses (including reasonable legal fees) arising out of your use of the Service, your content, or your violation of these Terms or applicable law.

14. Suspension and termination

We may suspend or terminate your access to the Service, including banning session patterns or host identifiers, at any time if we reasonably believe you have violated these Terms or the Acceptable Use Policy, or to protect the Service or other users. You may stop using the Service at any time. Sections that by their nature should survive termination (including 1, 5–7, 11–16) will survive.

15. Changes to these Terms

We may update these Terms from time to time. We will update the "Effective date" above and, for material changes, provide reasonable notice through the Service or website. Your continued use after changes take effect constitutes acceptance.

16. Governing law and disputes

These Terms are governed by the laws of the State of California, United States (US), without regard to its conflict-of-law rules. You agree to the exclusive jurisdiction of the courts located in Santa Clara County, California, United States for any dispute not subject to a separate arbitration or small-claims process required by law, except where prohibited by your local consumer-protection laws.

17. Contact

Questions about these Terms: legal@screenextend.app. General support: support@screenextend.app. See the Contact section on our homepage.

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

Theme: Dark. Switch to Light.

Footer

Screenshot viewer

# Route /acceptable-use

## Meta

Acceptable Use Policy | ScreenExtend

description: Acceptable Use Policy for ScreenExtend. Effective date: June 13, 2026.

og:type: website

og:site_name: ScreenExtend

og:title: Acceptable Use Policy | ScreenExtend

og:description: Acceptable Use Policy for ScreenExtend. Effective date: June 13, 2026.

og:image:type: image/png

og:image:width: 1369

og:image:height: 817

og:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.

og:locale: en_US

twitter:card: summary_large_image

twitter:title: Acceptable Use Policy | ScreenExtend

twitter:description: Acceptable Use Policy for ScreenExtend. Effective date: June 13, 2026.

twitter:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.



## Visible text

Skip to content
ScreenExtend
Uses
How it works
Settings
Under the hood
FAQ
GitHub
Download
Acceptable Use Policy

Effective date: June 13, 2026

This Acceptable Use Policy ("AUP") governs your use of the ScreenExtend Service and is part of our Terms of Service. It exists to keep the Service safe and lawful for everyone. Capitalized terms have the meanings given in the Terms.

1. Prohibited conduct

You may not use the Service to:

violate any law, regulation, or third-party right;
display, transmit, store, or distribute content that is illegal, infringing, defamatory, obscene, or that constitutes child sexual abuse material (which we report to authorities), harassment, or incitement to violence;
infringe intellectual-property rights or misappropriate trade secrets or confidential information;
transmit malware, or attempt to gain unauthorized access to any system, account, network, Host, or Client;
connect to a Host you are not authorized to use, or attempt to guess, brute-force, or otherwise circumvent session IDs or OTPs;
interfere with, overload, or disrupt the Service, the relay, the TURN server, or the networks connected to them, including through automated registration, denial-of-service, or excessive load;
probe, scan, or test the vulnerability of the Service except under our coordinated vulnerability-disclosure process (see security.txt);
resell, sublicense, or use the relay or TURN service as a general-purpose proxy, tunnel, or media-relay for traffic unrelated to ScreenExtend; or
remove, obscure, or circumvent any security, rate-limiting, or access-control measure.
2. Fair use of the relay and TURN service

The relay carries only small signaling messages; the TURN server relays media and consumes bandwidth. We may apply rate limits and usage limits, and may throttle, suspend, or ban sessions, host identifiers, or IP addresses that place an abusive or disproportionate load on the infrastructure.

3. Enforcement

We may investigate suspected violations and may remove access, ban session patterns or host identifiers, suspend accounts (where accounts exist), and cooperate with law enforcement. We may act without prior notice where necessary to protect the Service or others.

4. Reporting abuse

To report abuse, illegal content, or a security or safety concern involving the Service, email abuse@screenextend.app. Please include enough detail for us to investigate (for example, the nature of the abuse, timestamps, and any session or contact information you have). We aim to acknowledge abuse reports within a reasonable time.

5. Copyright and DMCA takedown

We respect intellectual-property rights. If you believe content transmitted through the Service infringes your copyright, send a notice to our designated agent at legal@screenextend.app containing:

your physical or electronic signature;
identification of the copyrighted work claimed to be infringed;
identification of the allegedly infringing material and information reasonably sufficient to locate it;
your contact information (address, telephone, email);
a statement that you have a good-faith belief the use is not authorized by the copyright owner, its agent, or the law; and
a statement, under penalty of perjury, that the information in the notice is accurate and that you are authorized to act on behalf of the owner.

Designated agent: Sarvesh Madullapalli, legal@screenextend.app.

Because ScreenExtend transmits content directly between a user's own devices and does not store screen content, our ability to remove specific material may be limited to terminating or restricting the relevant session or user. We will respond to valid notices as required by applicable law, and we may forward notices to the relevant user. A user who believes material was removed by mistake may submit a counter-notice to legal@screenextend.app.

6. Consequences

Violating this AUP may result in immediate suspension or termination of access and, where appropriate, referral to law enforcement. You may be liable for damages caused by your violation.

7. Changes

We may update this AUP from time to time and will update the "Effective date" above.

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

Theme: Dark. Switch to Light.

Footer

Screenshot viewer

# Route /cookies

## Meta

Cookie Policy | ScreenExtend

description: Cookie Policy for ScreenExtend. Effective date: June 13, 2026.

og:type: website

og:site_name: ScreenExtend

og:title: Cookie Policy | ScreenExtend

og:description: Cookie Policy for ScreenExtend. Effective date: June 13, 2026.

og:image:type: image/png

og:image:width: 1369

og:image:height: 817

og:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.

og:locale: en_US

twitter:card: summary_large_image

twitter:title: Cookie Policy | ScreenExtend

twitter:description: Cookie Policy for ScreenExtend. Effective date: June 13, 2026.

twitter:image:alt: The ScreenExtend Add Device screen, showing QR codes for adding a device as a second monitor.



## Visible text

Skip to content
ScreenExtend
Uses
How it works
Settings
Under the hood
FAQ
GitHub
Download
Cookie Policy

Effective date: June 13, 2026

This Cookie Policy explains how ScreenExtend uses cookies and similar technologies. It supplements our Privacy Policy.

1. What cookies are

Cookies are small text files placed on your device by a website. They can be "strictly necessary" (required for a service to function) or non-essential (for example, analytics or advertising).

2. Cookies we use

ScreenExtend uses a single strictly-necessary cookie, and only on the session relay (session.screenextend.app) when you join a session, not on this marketing website by default:

Cookie	Set by	Purpose	Type	Duration	Flags
se_cid	session.screenextend.app	Assigns your browser a random, opaque identifier so the relay can route your session's signaling, settings updates, and disconnects to the correct Host. It is not an advertising or tracking identifier and is not an authentication token.	Strictly necessary	24 hours	Secure, HttpOnly, SameSite=Lax

The se_cid cookie contains a random value only. It does not contain your name, email, IP address, or screen content. Because it is HttpOnly, website JavaScript cannot read it.

This website (screenextend.app) does not set analytics or advertising cookies.

3. Consent

The se_cid cookie is strictly necessary to deliver the relay you explicitly request by joining a session, so under the ePrivacy Directive / UK PECR it does not require prior consent. Any non-essential cookies we add in the future will be subject to your consent where required by law.

4. Managing cookies

You can block or delete cookies through your browser settings. If you block the se_cid cookie, the relay can still mint a temporary identifier per request, but session continuity (reconnects, settings changes, clean disconnects) may be degraded.

5. Changes

We may update this Cookie Policy from time to time and will update the "Effective date" above.

6. Contact

Questions about cookies: privacy@screenextend.app.

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

Theme: Dark. Switch to Light.

Table (scrolls sideways)

Footer

Screenshot viewer