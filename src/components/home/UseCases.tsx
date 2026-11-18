import Mini, { type MiniScreen } from "@/components/home/Mini.tsx";

// What the extra screen is for, each drawn as a tiny arrangement panel saying
// what goes on which screen. Product facts behind them: browser-only client,
// several devices at once, offline hosted network (see FaqSimple.tsx).
const USES: { t: string; d: string; s: MiniScreen[]; link?: string }[] = [
  {
    t: "Chat and email on the side",
    d: "Keep Slack, Discord or your inbox on the tablet and give your work the whole main screen.",
    s: [
      { n: 1, label: "Your work" },
      { n: 2, label: "Slack" },
    ],
  },
  {
    t: "Meetings off your main screen",
    d: "Put the call on the tablet and keep taking notes and working on your computer. Or flip it.",
    s: [
      { n: 1, label: "Notes" },
      { n: 2, label: "The call" },
    ],
  },
  {
    t: "Docs while you work",
    d: "A recipe, a spec or a how-to stays in view instead of hiding behind a tab.",
    s: [
      { n: 1, label: "Editor" },
      { n: 2, label: "The spec" },
    ],
  },
  {
    t: "Two screens anywhere",
    d: "Your laptop and the tablet already in your bag make a two-screen setup. You don't need a cable.",
    s: [
      { n: 1, label: "Laptop" },
      { n: 2, label: "Tablet" },
    ],
  },
  {
    t: "No router needed",
    d: "ScreenExtend can start its own Wi-Fi network, so the tablet connects straight to your computer.",
    s: [
      { n: 1, label: "Laptop" },
      { n: 2, label: "Tablet" },
    ],
    link: "its own Wi-Fi",
  },
  {
    t: "More than one extra screen",
    d: "Connect a phone and a tablet at the same time. Each one is its own display.",
    s: [
      { n: 1, label: "Main" },
      { n: 2, label: "Tablet" },
      { n: 3, label: "Phone" },
    ],
  },
];

export default function UseCases() {
  return (
    <section id="uses" className="py-16 lg:py-20">
      <div className="container">
        <h2 className="display-lg">What you can use it for</h2>
        <p className="mt-3 text-lg text-muted">
          Drag any window onto it, the same way you would with a plugged-in monitor.
        </p>

        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {USES.map((u) => (
            <li key={u.t}>
              <Mini screens={u.s} link={u.link} />
              <h3 className="mt-5 text-lg font-semibold">{u.t}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{u.d}</p>
            </li>
          ))}
        </ul>

        {/* Source: docs/RESULTS.md in the app repo, real-content 1080p capture to
            encode with NVENC: 8.39 ms median, 9.44 ms p90. Not glass-to-glass. */}
        <p className="mt-14 text-muted">
          <span className="font-semibold text-ink">Low delay.</span> Your
          computer captures and encodes each frame in about 8 ms.*
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          *Median on real 1080p content, with 9 in 10 frames under 10 ms. Measured on
          Windows 11 (25H2) with an NVIDIA RTX 3080 Ti Laptop GPU.
        </p>
      </div>
    </section>
  );
}
