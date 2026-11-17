// The owner's planned features (2026-11-17), in plain words. Nothing here is
// promised a date; it's what's being worked toward.
const NEXT = [
  {
    t: "HDR",
    d: "Brighter, richer colour on screens that support it.",
  },
  {
    t: "Apps for the other device",
    d: "Optional apps that connect over a cable or Bluetooth, for when there's no Wi-Fi to share.",
  },
  {
    t: "Its microphone and camera",
    d: "Use the other device's mic and camera from your computer, so a laptop you extend onto works like part of your setup.",
  },
  {
    t: "More systems",
    d: "Linux, FreeBSD and older Macs, back to macOS 10.13.",
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">What's coming</h2>
        <p className="mt-3 text-lg text-muted">
          ScreenExtend is still young. These are the next things being built.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEXT.map((n, i) => (
            <li key={n.t} className={`rounded-panel p-6 ${i % 2 ? "bg-tile-mint" : "bg-tile-blue"}`}>
              <h3 className="text-lg font-semibold">{n.t}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{n.d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Follow along or suggest something on{" "}
          <a
            href="https://github.com/ScreenExtend/ScreenExtend"
            target="_blank"
            rel="noopener noreferrer"
            className="u-link"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
