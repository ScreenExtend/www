// What the extra screen is for, before any of the technical detail.
// Each "how" is a product fact: browser-only client (Highlights.tsx), several
// devices at once and offline hosted network (FaqSimple.tsx).
// Tints: per-theme tile tokens in the logo blue and mint (tailwind.config.js),
// so the grid has colour in both themes without bright full-bleed fields.
const USES = [
  {
    t: "Chat and email on the side",
    d: "Keep Slack, Discord or your inbox on the tablet and give your work the whole main screen.",
    tint: "bg-tile-blue",
  },
  {
    t: "Meetings off your main screen",
    d: "Put the call on the tablet and keep taking notes and working on your computer. Or flip it.",
    tint: "bg-tile-mint",
  },
  {
    t: "Docs while you work",
    d: "A recipe, a spec or a how-to stays in view instead of hiding behind a tab.",
    tint: "bg-tile-blue",
  },
  {
    t: "Two screens anywhere",
    d: "Your laptop and the tablet already in your bag make a two-screen setup. You don't need a cable.",
    tint: "bg-tile-mint",
  },
  {
    t: "No router needed",
    d: "ScreenExtend can start its own Wi-Fi network, so the tablet connects straight to your computer.",
    tint: "bg-tile-blue",
  },
  {
    t: "More than one extra screen",
    d: "Connect a phone and a tablet at the same time. Each one is its own display.",
    tint: "bg-tile-mint",
  },
];

export default function UseCases() {
  return (
    <section id="uses" className="py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">What you can use it for</h2>
        <p className="mt-3 text-lg text-muted">
          Drag any window onto it, the same way you would with a plugged-in monitor.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {USES.map((u) => (
            <li key={u.t} className={`rounded-panel p-6 ${u.tint}`}>
              <h3 className="text-lg font-semibold">{u.t}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{u.d}</p>
            </li>
          ))}
        </ul>

        {/* Source: docs/RESULTS.md in the app repo, "Windows, the whole host path",
            NVENC ring after, capture -> socket p90 6.29 ms. Not glass-to-glass. */}
        <p className="mt-10 text-muted">
          <span className="font-semibold text-ink">Quick on your end.</span> Your
          computer gets each frame ready and sends it in under 7 ms.* Your Wi-Fi
          and the other device add their own delay on top of that.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          *90th percentile, measured on Windows 11 (25H2) with an NVIDIA RTX 3080 Ti
          Laptop GPU.
        </p>
      </div>
    </section>
  );
}
