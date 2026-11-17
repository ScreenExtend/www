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
  { q: "Any device with a browser", v: [[true], [false], [false], [false], [true]] },
  { q: "No extra hardware", v: [[true], [true], [true], [true], [false, "Dummy plug required"]] },
  { q: "Several screens at once", v: [[true], [false], [true], [true], [false]] },
  { q: "Remote control", v: [[true], [true], [true], [true], [false]] },
  { q: "Audio", v: [[true], [false], [true], [false], [false]] },
  { q: "HDR", v: [[false, "Coming soon"], [false], [false], [false], [false]] },
  { q: "Free", v: [[true], [true], [false], [false], [true]] },
  { q: "Open source", v: [[true], [false], [false], [false], [true]] },
];

function Mark({ yes, note }: { yes: boolean; note?: string }) {
  return (
    <span className="flex flex-col items-center gap-0.5 text-center">
      {yes ? (
        <Check size={18} strokeWidth={2.5} className="text-[#4f86ff]" aria-hidden="true" />
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
    <section id="compare" className="bg-tint py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">How it compares</h2>
        <p className="mt-3 text-lg text-muted">
          Like Apple's Sidecar, for any device with a browser and a Windows PC or Mac.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse">
            <caption className="sr-only">ScreenExtend compared with other second-screen apps</caption>
            <thead>
              <tr className="border-b border-line text-sm">
                <th scope="col" className="py-3 pr-4 text-left font-medium">
                  <span className="sr-only">Feature</span>
                </th>
                {COLS.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`w-[15%] px-2 py-3 text-center ${i === 0 ? "rounded-t-panel bg-tile-blue font-semibold text-ink" : "font-medium text-muted"}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.q} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 text-left font-medium">{r.q}</th>
                  {r.v.map(([yes, note], i) => (
                    <td key={i} className={`px-2 py-3 text-center align-middle ${i === 0 ? "bg-tile-blue" : ""}`}>
                      <Mark yes={yes} note={note} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          Checked November 2026 against each maker's own pages. Sidecar is a trademark
          of Apple Inc.; other names belong to their owners. ScreenExtend isn't
          affiliated with any of them.
        </p>
      </div>
    </section>
  );
}
