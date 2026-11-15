# Product truth: ScreenExtend website

## What it is
A free desktop app (Windows now, Mac now, Linux coming) that turns any device with a browser (phone, tablet, spare laptop) into an extended monitor for the PC. The host creates a virtual display and streams it over WebRTC. Nothing is installed on the second device.

- **Audience:** people with a PC and a spare device who want more screen space, mostly at a desk and often technical.
- **Primary action:** download the installer (Windows 64-bit EXE, Mac DMG).
- **Secondary:** understand how pairing works (QR code, then a 6-digit code).

## Real proof available
- Three real screenshots of the host app: `src/assets/app/feature-1/2/3.png` (1369×817). They show Add Device, Edit Device and Settings.
- Public source and releases at `github.com/ScreenExtend/ScreenExtend`.
- Free (`offers.price 0` in index.html JSON-LD).
- **Not available:** user counts, latency benchmarks, testimonials, press. None may be invented.

## Real differentiators (from site copy, owner-authored)
- No client app: the second device only needs a browser (`Highlights.tsx:23`).
- GPU encoding: NVENC / Quick Sync / VideoToolbox (`Highlights.tsx:18`).
- Offline hosted network, no router needed (`Highlights.tsx:33`, `FaqSimple.tsx` Q5).
- Per-device scale, orientation, refresh rate and quality (`FeatureScroll.tsx:15`).
- Up to 200% scale and 500 Hz per device (`FaqSimple.tsx` Q3).
- Auto-discovery across network adapters (`Highlights.tsx:43`).

## Product vocabulary (copied from the real app screenshots / site copy)
| Term | Source |
|---|---|
| "Add Device", "Edit Device", "Settings" (sidebar) | `src/assets/app/feature-1.png`, `ConnectFlow.tsx:368-381` |
| "What network is your device connected to?" | `src/assets/app/feature-1.png` |
| "Anywhere (Internet)", "Wifi-Home" tiles | `src/assets/app/feature-1.png` |
| "Session OTP", "Public Internet Sessions", "Create Hosted Network", "Device Disconnect Timeout" | `src/assets/app/feature-3.png` |
| 6-digit session code | `ConnectFlow.tsx:262`, FAQ Q1 |
| `session.screenextend.app`, `turn.screenextend.app` | `src/legal/content.ts:5-6` |
| Installer file names `ScreenExtend_x64-setup.exe`, `ScreenExtend_universal.dmg` | `Download.tsx` |
| `xattr -cr /Applications/ScreenExtend.app` | `Download.tsx` (Mac notice) |

## Brand assets
- Logo `src/assets/logo/screenextend.svg` (blue/cyan/lime stacked screens), favicon set in `public/`.
- Brand colours: logo-blue `#316cff`, logo-cyan `#1ccbdd`, logo-lime `#a6e15a`, logo-mint `#d6f1ed` (`tailwind.config.js`).
- Fonts: IBM Plex Sans + IBM Plex Mono, self-hosted.

## Routes
| Route | Class | In scope |
|---|---|---|
| `/` | Public | yes |
| `/privacy`, `/terms`, `/acceptable-use`, `/cookies` | Public | yes |
| `/.well-known/security.txt` (linked) | Public static, not in repo `public/` | link only |
| none | Needs backend | none |
| none | Side-effecting | none (static site) |

## Known inconsistencies found (not invented, flagged)
- `Download.tsx` Mac notice says "The Mac build is still in beta", but commit `2cdc0e4` promoted Mac out of beta.
- `public/llms-full.txt` lists separate Intel/Apple Silicon DMGs; the site links a single `ScreenExtend_universal.dmg`.
- README mentions `card3d` 3D tilt, which commit `3cad501` removed.
