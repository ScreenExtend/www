// Competitor comparison (research: career-agent/reports/ScreenExtend competitor
// landscape.md). All of these are wireless, so that isn't a row. Values are kept
// short and literal. The best value in each row is bold, whoever has it.
// Re-check before changing the date.
const COLS = ["ScreenExtend", "Apple Sidecar", "Spacedesk", "Duet Display", "Deskreen"] as const;

// best: the values that count as the best answer in that row; those cells are
// bolded, whichever product has them (like a benchmark table).
const ROWS: { q: string; v: [string, string, string, string, string]; best: string[] }[] = [
  {
    q: "Your computer",
    v: ["Windows or Mac", "Mac", "Windows", "Windows or Mac", "Windows, Mac or Linux"],
    best: ["Windows, Mac or Linux"],
  },
  {
    q: "The second screen",
    v: ["Any device with a browser", "iPad", "Android, iPhone, iPad, Windows or a browser", "iPad, iPhone or Android", "Any device with a browser"],
    best: ["Any device with a browser"],
  },
  { q: "Install on the second screen", v: ["Nothing", "Nothing", "App, or use a browser", "App", "Nothing"], best: ["Nothing"] },
  { q: "Extra hardware", v: ["None", "None", "None", "None", "HDMI dummy plug"], best: ["None"] },
  { q: "Works over a cable", v: ["No", "Yes", "Yes", "Yes", "No"], best: ["Yes"] },
  { q: "Price", v: ["Free", "Free", "Free for personal use", "$3.99 to $7.99 a month", "Free"], best: ["Free"] },
  { q: "Open source", v: ["Yes", "No", "No", "No", "Yes"], best: ["Yes"] },
];

export default function Compare() {
  return (
    <section id="compare" className="bg-tint py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">How it compares</h2>
        <p className="mt-3 text-lg text-muted">
          If you've used Apple's Sidecar, it's the same idea, for any device with a
          browser and a Windows PC or a Mac.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">ScreenExtend compared with other second-screen apps</caption>
            <thead>
              <tr className="border-b border-line text-sm">
                <th scope="col" className="py-3 pr-4 font-medium">
                  <span className="sr-only">Question</span>
                </th>
                {COLS.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`px-3 py-3 ${i === 0 ? "font-semibold text-ink" : "font-medium text-muted"}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.q} className="border-b border-line align-top">
                  <th scope="row" className="py-3.5 pr-4 font-medium">{r.q}</th>
                  {r.v.map((cell, i) => (
                    <td
                      key={i}
                      className={`px-3 py-3.5 ${r.best.includes(cell) ? "font-semibold text-ink" : "text-muted"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <p className="mt-8 text-lg">
          Try ScreenExtend when you want an extra screen from a device you already own,
          on Windows or a Mac, for free.
        </p>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Checked November 2026 against each maker's own pages. Sidecar is a trademark of
          Apple Inc.; other product names belong to their
          owners. ScreenExtend isn't affiliated with any of them.
        </p>
      </div>
    </section>
  );
}
