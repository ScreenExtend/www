// What the extra screen is for, before any of the technical detail.
// Each "how" is a product fact: browser-only client (Highlights.tsx), several
// devices at once and offline hosted network (FaqSimple.tsx).
// Tints: the logo's three colours at low strength, so the grid has some colour
// without bright full-bleed fields.
const USES = [
  {
    t: "Chat and email on the side",
    d: "Keep Slack, Discord or your inbox on the tablet and give your work the whole main screen.",
    tint: "bg-[#316cff]/10",
  },
  {
    t: "Meetings off your main screen",
    d: "Put the call on the tablet and keep taking notes and working on your computer. Or flip it.",
    tint: "bg-[#d6f1ed]/10",
  },
  {
    t: "Docs while you work",
    d: "A recipe, a spec or a how-to stays in view instead of hiding behind a tab.",
    tint: "bg-[#dcff4a]/10",
  },
  {
    t: "Two screens anywhere",
    d: "Your laptop and the tablet in your bag make a dual-monitor setup. No cable, no extra hardware.",
    tint: "bg-[#dcff4a]/10",
  },
  {
    t: "No Wi-Fi needed",
    d: "ScreenExtend can start its own network, so the tablet connects straight to your computer.",
    tint: "bg-[#316cff]/10",
  },
  {
    t: "More than one extra screen",
    d: "Connect a phone and a tablet at the same time. Each one is its own display.",
    tint: "bg-[#d6f1ed]/10",
  },
];

export default function UseCases() {
  return (
    <section id="uses" className="border-t border-line py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">What you can do with it</h2>
        <p className="mt-3 max-w-[52ch] text-lg text-muted">
          The other device works like any extra monitor. Drag windows onto it and
          use it however you like.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {USES.map((u) => (
            <li key={u.t} className={`rounded-panel p-6 ${u.tint}`}>
              <h3 className="text-lg font-semibold">{u.t}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{u.d}</p>
            </li>
          ))}
        </ul>

        {/* Measured, not estimated: docs/RESULTS.md in the app repo (Windows,
            whole host path, capture to socket, p90 6.29 ms). Not glass-to-glass. */}
        <p className="mt-10 max-w-[60ch] text-muted">
          <span className="font-semibold text-ink">Fast enough to work on.</span>{" "}
          Your computer captures, encodes and sends each frame in under 7 ms
          (measured on Windows). Your Wi-Fi and the other device add the rest.
        </p>
      </div>
    </section>
  );
}
