import { PhoneMug } from "@/components/home/drawings.tsx";

// What goes on the other screen, as run-in paragraphs rather than cards. Product
// facts behind them: browser-only client, several devices at once, offline
// hosted network (see FaqSimple.tsx).
const USES: { t: string; d: string }[] = [
  {
    t: "The call you keep alt-tabbing to.",
    d: "Put it on the tablet and keep your notes on the main screen. Or flip it.",
  },
  {
    t: "Slack, Discord, the inbox.",
    d: "Off to the side, where they can wait their turn.",
  },
  {
    t: "The thing you're copying from.",
    d: "A recipe, a spec or a how-to stays open the whole time instead of hiding behind a tab.",
  },
  {
    t: "A 13-inch laptop with forty tabs.",
    d: "It gets a second screen from the tablet already in your bag. No cable involved.",
  },
  {
    t: "Somewhere without Wi-Fi.",
    d: "ScreenExtend can start its own network, so the tablet connects straight to your computer. No router needed.",
  },
  {
    t: "More than one.",
    d: "Connect a phone and a tablet at the same time. Each one is its own display.",
  },
];

export default function UseCases() {
  return (
    <section id="uses" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="display-lg">What goes on the other screen</h2>
          <p className="lede mt-3">Whatever you'd drag onto a plugged‑in monitor. Some suggestions:</p>
          <PhoneMug className="mt-10 w-full max-w-sm" />
          <p className="small-print mt-2">A phone against a mug counts as a monitor stand.</p>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {USES.map((u) => (
              <li key={u.t} className="leading-relaxed">
                <span className="wide block text-lg font-bold leading-snug text-ink">{u.t}</span>
                <span className="mt-1 block text-muted">{u.d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid items-center gap-x-8 gap-y-4 rounded-panel bg-surface p-6 sm:grid-cols-[auto_1fr] sm:p-8">
            <p className="condensed text-[5.5rem] font-extrabold leading-[0.85] text-link" aria-hidden="true">
              8<span className="text-[0.55em]"> ms</span>
            </p>
            {/* Source: docs/RESULTS.md in the app repo, real-content 1080p capture to
                encode with NVENC: 8.39 ms median, 9.44 ms p90. Not glass-to-glass. */}
            <div>
              <p className="text-lg leading-snug">
                <span className="wide font-bold">About the delay.</span> Your computer captures and
                encodes each frame in about <span className="font-bold">8 ms</span>.*
              </p>
              <p className="small-print mt-3">
                *Median on real 1080p content, with 9 in 10 frames under 10 ms. Measured on Windows 11
                (25H2) with an NVIDIA RTX 3080 Ti Laptop GPU.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
