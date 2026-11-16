import type { ReactNode } from "react";

import qrCrop from "@/assets/app/crop-qr.webp";

// Example code (digits from the previous site's demo). Six separate cells echo the
// Session OTP row in src/assets/app/feature-3.png; the lime last cell is a site
// accent marking the digit just typed, not something the app draws.
const EXAMPLE_CODE = ["3", "7", "7", "6", "2", "0"];

const PANEL = "flex aspect-[4/3] items-center justify-center overflow-hidden rounded-panel";

// Step 1: the real Anywhere (Internet) tile, cropped from feature-1.png.
function QrVisual() {
  return (
    <div className={`${PANEL} bg-[#060b14]`}>
      <img
        src={qrCrop}
        width={426}
        height={554}
        loading="lazy"
        decoding="async"
        alt="The Anywhere (Internet) QR code and join link in the ScreenExtend app."
        className="h-[88%] w-auto"
      />
    </div>
  );
}

// Step 2: the join link format shown under each QR code in the app.
function LinkVisual() {
  return (
    <div className={`${PANEL} bg-logo-mint px-5`}>
      <div className="whitespace-nowrap rounded-control border border-[#0f1419]/15 bg-white px-3 py-2.5 font-mono text-xs text-[#0f1419] sm:text-[0.8125rem] lg:text-xs xl:text-[0.8125rem]">
        session.screenextend.app<span className="text-[#4b5560]">/?id=…</span>
      </div>
    </div>
  );
}

// Step 3: the code cells.
function CodeVisual() {
  return (
    <figure className={`${PANEL} flex-col gap-3 border border-line bg-surface`}>
      <div className="flex gap-1.5" aria-hidden="true">
        {EXAMPLE_CODE.map((d, i) => (
          <span
            key={i}
            className={`tabular flex h-12 w-9 items-center justify-center rounded-cell border font-mono text-xl font-medium sm:w-10 ${
              i === EXAMPLE_CODE.length - 1
                ? "border-[#b8d62e] bg-lime text-[#0f1419]"
                : "border-line bg-paper text-ink"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <figcaption className="text-xs text-muted">
        <span className="sr-only">Digits shown: 3 7 7 6 2 0. </span>
        Example code
      </figcaption>
    </figure>
  );
}

// Step 4: a flat diagram, not a device render. Main screen on the left, the
// second device on the right, a window crossing the gap between them.
function DragVisual() {
  return (
    <div className={`${PANEL} bg-[#2456d6]`}>
      <svg
        viewBox="0 0 240 150"
        className="h-[78%] w-auto"
        role="img"
        aria-label="Diagram: a window moving from the main screen onto the second device."
      >
        <rect x="8" y="30" width="140" height="88" rx="6" fill="none" stroke="#ffffff" strokeWidth="2" />
        <rect x="70" y="120" width="16" height="10" fill="#ffffff" />
        <rect x="56" y="130" width="44" height="3" rx="1.5" fill="#ffffff" />
        <rect x="160" y="42" width="72" height="96" rx="8" fill="none" stroke="#ffffff" strokeWidth="2" />
        <rect x="118" y="58" width="72" height="44" rx="4" fill="#dcff4a" />
        <rect x="118" y="58" width="72" height="9" rx="4" fill="#0f1419" fillOpacity="0.2" />
        <text x="78" y="20" textAnchor="middle" fill="#dfe8ff" fontSize="10" fontFamily="IBM Plex Mono, monospace">
          main screen
        </text>
        <text x="196" y="32" textAnchor="middle" fill="#dfe8ff" fontSize="10" fontFamily="IBM Plex Mono, monospace">
          tablet
        </text>
      </svg>
    </div>
  );
}

const STEPS: { t: string; d: string; visual: ReactNode }[] = [
  {
    t: "Open ScreenExtend",
    d: "Your computer shows a QR code and a join link for each network, plus Anywhere (Internet).",
    visual: <QrVisual />,
  },
  {
    t: "Scan it on the other device",
    d: "Use the camera, or type the link. It opens in the browser, with nothing to install.",
    visual: <LinkVisual />,
  },
  {
    t: "Type the 6-digit code",
    d: "Your computer adds a virtual display sized to that screen.",
    visual: <CodeVisual />,
  },
  {
    t: "Drag a window across",
    d: "It streams over WebRTC and fills the other device's screen.",
    visual: <DragVisual />,
  },
];

export default function ConnectFlow() {
  return (
    <section id="how" className="border-t border-line py-16 lg:py-24">
      <div className="container">
        <h2 className="section-title">How pairing works</h2>

        <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.t}>
              {s.visual}
              <h3 className="mt-4 text-lg font-semibold leading-snug">{s.t}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
