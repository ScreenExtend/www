// What the extra screen is for, before any of the technical detail.
// Each line is an ordinary second-monitor use; the "how" in each is a product
// fact: browser-only client (Highlights.tsx), several devices at once and offline
// hosted network (FaqSimple.tsx), Windows and Mac hosts (Download.tsx).
const USES = [
  {
    t: "Chat and email",
    d: "Keep Slack, Discord or your inbox on the tablet and give your work the whole main screen.",
  },
  {
    t: "Docs while you work",
    d: "A reference, a spec or the API docs stay in view instead of behind a tab.",
  },
  {
    t: "Calls and notes",
    d: "The meeting on the spare laptop, your notes on the main screen.",
  },
  {
    t: "Two screens on the road",
    d: "Your laptop and the tablet in your bag make a dual-monitor setup. No cable, no extra hardware.",
  },
  {
    t: "No Wi-Fi needed",
    d: "ScreenExtend can start its own network, so the tablet connects straight to your computer.",
  },
  {
    t: "More than one extra screen",
    d: "Connect a phone and a tablet at the same time; each gets its own display.",
  },
];

export default function UseCases() {
  return (
    <section id="uses" className="border-t border-line py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">What you can do with it</h2>
        <p className="mt-3 max-w-[52ch] text-lg text-muted">
          The other device works like any extra monitor. Drag windows onto it and
          use it the way you'd use a second screen.
        </p>

        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {USES.map((u) => (
            <li key={u.t} className="border-t border-line pt-4">
              <h3 className="text-lg font-semibold">{u.t}</h3>
              <p className="mt-1.5 max-w-[40ch] leading-relaxed text-muted">{u.d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#download" className="btn-solid min-h-12 px-6 text-base active:scale-[0.97]">
            Download free
          </a>
          <span className="text-sm text-muted">Windows and Mac</span>
        </div>
      </div>
    </section>
  );
}
