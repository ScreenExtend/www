import type { ReactNode } from "react";

// Example code (digits from the previous site's demo). Six separate cells echo the
// Session OTP row in src/assets/app/feature-3.png; the lime last cell is a site
// accent marking the digit just typed, not something the app draws.
const EXAMPLE_CODE = ["3", "7", "7", "6", "2", "0"];

function SessionCode() {
  return (
    <figure className="mt-4">
      <div className="flex gap-1.5" aria-hidden="true">
        {EXAMPLE_CODE.map((d, i) => (
          <span
            key={i}
            className={`tabular flex h-12 w-10 items-center justify-center rounded-cell border font-mono text-xl font-medium sm:h-14 sm:w-11 sm:text-2xl ${
              i === EXAMPLE_CODE.length - 1
                ? "border-[#b8d62e] bg-lime text-[#0f1419]"
                : "border-line bg-surface text-ink"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <figcaption className="mt-2 text-sm text-muted">
        <span className="sr-only">Digits shown: 3 7 7 6 2 0. </span>
        Example code. Your computer shows the real one.
      </figcaption>
    </figure>
  );
}

const STEPS: { t: string; d: ReactNode; extra?: ReactNode }[] = [
  {
    t: "Open ScreenExtend on your computer",
    d: "The Add Device screen shows a QR code and a join URL for every network you're on, plus an Anywhere (Internet) option for joining across networks.",
  },
  {
    t: "Scan the code from the other device",
    d: "Point a phone or tablet camera at it, or type the URL on a laptop. The page opens in the browser, with nothing to install.",
  },
  {
    t: "Type the 6-digit session code",
    d: "The code pairs the device. Your computer then creates a virtual display sized to that screen.",
    extra: <SessionCode />,
  },
  {
    t: "Drag a window onto it",
    d: "The display streams over WebRTC and fills the other device's screen. Move a window past the edge of your main screen and it shows up on the other device.",
  },
];

export default function ConnectFlow() {
  return (
    <section id="how" className="border-t border-line py-16 lg:py-24">
      <div className="container grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="section-title">How pairing works</h2>
          <p className="mt-4 max-w-sm text-muted">
            One QR scan and a 6-digit code. After that the other device behaves
            like a monitor plugged into your computer.
          </p>
        </div>

        <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {STEPS.map((s, i) => (
            <li key={s.t} className="grid grid-cols-[2rem_1fr]">
              <span className="tabular font-mono text-lg font-medium leading-snug text-muted">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-snug">{s.t}</h3>
                <p className="mt-2 max-w-[62ch] leading-relaxed text-muted">
                  {s.d}
                </p>
                {s.extra}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
