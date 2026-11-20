import { Check, X } from "lucide-react";

// Competitor comparison (research: career-agent/reports/ScreenExtend competitor
// landscape.md, cells re-verified in exhaustive-unslop/rerun/compare-verified.md
// and compare-verified-2.md). Cells are a check or an X; anything that needs
// explaining gets a short note under the icon. X means not offered or not
// documented by the maker. Re-check before changing
// the date.
type Cell = [boolean, string?];

const COLS = ["ScreenExtend", "Apple Sidecar", "Spacedesk", "Duet Display", "Deskreen"] as const;


const ROWS: { q: string; v: [Cell, Cell, Cell, Cell, Cell] }[] = [
  { q: "Cross-platform support", v: [[true, "Linux coming soon"], [false], [true, "Mac in beta"], [true], [true]] },
  { q: "Any device with a browser", v: [[true], [false], [true], [false], [true]] },
  { q: "No extra hardware", v: [[true], [true], [true], [true], [false, "Dummy plug required"]] },
  { q: "Offline support", v: [[true], [true], [true], [true], [false]] },
  { q: "Several screens at once", v: [[true], [false], [true], [true], [false]] },
  { q: "Customizability", v: [[true], [false], [true], [true], [false]] },
  { q: "Remote control", v: [[true], [true], [true], [true], [false]] },
  { q: "Audio", v: [[true], [false], [true], [false], [false]] },
  { q: "HDR", v: [[false, "Coming soon"], [false], [false], [false], [false]] },
  { q: "Free", v: [[true], [true], [true, "Personal use only"], [false], [true, "1 device"]] },
  { q: "Open source", v: [[true], [false], [false], [false], [true]] },
];

function Mark({ yes, note, ours }: { yes: boolean; note?: string; ours?: boolean }) {
  return (
    <span className="flex flex-col items-center gap-1 text-center">
      {yes ? (
        <Check size={18} strokeWidth={ours ? 3 : 2.25} className={ours ? "text-link" : "text-ink"} aria-hidden="true" />
      ) : (
        <X size={18} strokeWidth={2.25} className="text-muted" aria-hidden="true" />
      )}
      <span className="sr-only">{yes ? "Yes" : "No"}</span>
      {note && <span className="text-xs leading-tight text-muted">{note}</span>}
    </span>
  );
}

export default function Compare() {
  return (
    <section id="compare" className="bg-surface py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <h2 className="display-lg lg:col-span-6">Comparison</h2>
        </div>

        <p className="small-print mt-10 md:hidden" aria-hidden="true">
          The table scrolls sideways for Spacedesk, Duet Display and Deskreen. &rarr;
        </p>
        <div className="relative mt-3 overflow-x-auto md:mt-12" tabIndex={0} role="region" aria-label="Comparison table (scrolls sideways)">
          {/* ruled like a printed table: heavy top and bottom rules, hairlines between */}
          <table className="w-full min-w-[44rem] border-collapse border-y-2 border-ink">
            <caption className="sr-only">ScreenExtend compared with other second-screen apps</caption>
            <thead>
              <tr className="border-b-[1.5px] border-ink text-[0.9375rem]">
                <th scope="col" className="sticky left-0 z-10 bg-surface py-3 pr-4 text-left font-medium">
                  <span className="sr-only">Feature</span>
                </th>
                {COLS.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`wide w-[15%] px-2 py-3 text-center ${i === 0 ? "border-x-[1.5px] border-ink bg-[var(--se-accent)] font-extrabold text-[#14161a]" : "font-semibold text-muted"}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.q} className="border-b border-line last:border-b-0">
                  <th scope="row" className="sticky left-0 z-10 bg-surface py-3 pr-4 text-left font-medium max-md:w-32">{r.q}</th>
                  {r.v.map(([yes, note], i) => (
                    <td key={i} className={`px-2 py-3 text-center align-middle ${i === 0 ? "border-x-[1.5px] border-ink" : ""}`}>
                      <Mark yes={yes} note={note} ours={i === 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="small-print mt-6">
          Checked November 2026 against each maker's own pages. Sidecar is a trademark of Apple Inc.;
          other names belong to their owners. ScreenExtend isn't affiliated with any of them.
        </p>
      </div>
    </section>
  );
}
