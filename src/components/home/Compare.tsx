// Two-sided comparison (research: career-agent/reports/ScreenExtend competitor
// landscape.md). Sidecar wins the cable and Pencil rows, and the "pick something
// else" list names better tools where they exist. Plain names, no logos, no
// ticks, no speed claims. Re-check the Sidecar and monitor-price lines before
// changing the date below.
const ROWS: { q: string; sidecar: string; us: string }[] = [
  { q: "Your computer", sidecar: "A recent Mac", us: "A Windows PC or a Mac (Catalina or newer)" },
  { q: "The second screen", sidecar: "An iPad", us: "Any tablet, phone or laptop with a web browser" },
  { q: "What you install on it", sidecar: "Nothing, it's built in", us: "Nothing, it opens in the browser" },
  {
    q: "Setting it up",
    sidecar: "Already on your Mac. Both devices need the same Apple Account",
    us: "Install ScreenExtend on your computer, scan a code, type six digits. No account",
  },
  { q: "With a cable", sidecar: "Yes, over USB", us: "Not for iPad. Android phones can use USB tethering" },
  { q: "Apple Pencil", sidecar: "Works across the Mac", us: "Taps and drags like a mouse" },
  { q: "Price", sidecar: "Free", us: "Free and open source" },
];

const ELSE = [
  {
    t: "You only use a Mac and an iPad.",
    d: "Sidecar is already on your Mac and works over a cable too. Use it.",
  },
  {
    t: "You want a cable between a Windows PC and a tablet.",
    d: "Spacedesk (free for personal use) and Duet (paid) both work over USB.",
  },
  {
    t: "You mostly want to play games on the other screen.",
    d: "Moonlight with Sunshine, or Parsec, are built for games and support HDR. ScreenExtend doesn't do HDR.",
  },
  {
    t: "You'll sit at the same desk every day.",
    d: "A basic 24-inch monitor costs about $90. It will look sharper and react faster than any wireless screen, ours included.",
  },
  {
    t: "You want one keyboard for two computers.",
    d: "That's a different job. Universal Control and Deskflow share a keyboard and mouse; they don't add a screen.",
  },
];

export default function Compare() {
  return (
    <section id="compare" className="bg-tint py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">Like Apple's Sidecar, but for any device with a browser</h2>
        <p className="mt-3 text-lg text-muted">
          Sidecar turns an iPad into a second screen for a Mac. ScreenExtend does the
          same job for a Windows PC or a Mac, and the second screen can be an Android
          tablet, an iPad, a phone or an old laptop.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">Apple Sidecar compared with ScreenExtend</caption>
            <thead>
              <tr className="border-b border-line text-sm text-muted">
                <th scope="col" className="w-1/4 py-3 pr-4 font-medium">
                  <span className="sr-only">Question</span>
                </th>
                <th scope="col" className="w-[37.5%] px-4 py-3 font-medium">Sidecar</th>
                <th scope="col" className="w-[37.5%] px-4 py-3 font-semibold text-ink">ScreenExtend</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.q} className="border-b border-line align-top">
                  <th scope="row" className="py-3.5 pr-4 font-medium">{r.q}</th>
                  <td className="px-4 py-3.5 text-muted">{r.sidecar}</td>
                  <td className="bg-tile-blue px-4 py-3.5">{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-14 text-xl font-semibold">Pick something else if…</h3>
        <ul className="mt-5 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {ELSE.map((e) => (
            <li key={e.t}>
              <p className="font-semibold">{e.t}</p>
              <p className="mt-1 leading-relaxed text-muted">{e.d}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-lg">
          Try ScreenExtend when you want an extra screen from a device you already own,
          on Windows or a Mac, for free.
        </p>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Checked November 2026 against each maker's own pages. Sidecar and Universal
          Control are trademarks of Apple Inc. ScreenExtend isn't affiliated with Apple
          or any other product named here.
        </p>
      </div>
    </section>
  );
}
