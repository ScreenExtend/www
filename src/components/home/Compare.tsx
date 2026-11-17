import { Check, X } from "lucide-react";

// Competitor comparison (research: career-agent/reports/ScreenExtend competitor
// landscape.md, cells re-verified in exhaustive-unslop/rerun/compare-verified.md
// and compare-verified-2.md). Cells are a check or an X; anything that needs
// explaining gets a small footnote symbol (*, †, ‡, §) listed under the table.
// X means not offered or not documented by the maker. Re-check before changing
// the date.
type Cell = [boolean, number?];

const COLS = ["ScreenExtend", "Apple Sidecar", "Spacedesk", "Duet Display", "Deskreen"] as const;

const NOTES = [
  "Linux support is coming soon.",
  "The Mac version is in beta.",
  "Needs an HDMI dummy plug to add a real extra screen.",
  "HDR is coming soon.",
];
const MARKS = ["*", "†", "‡", "§", "¶", "#"];

const ROWS: { q: string; v: [Cell, Cell, Cell, Cell, Cell] }[] = [
  { q: "Cross-platform support", v: [[true, 1], [false], [true, 2], [true], [true]] },
  { q: "Any device with a browser", v: [[true], [false], [false], [false], [true]] },
  { q: "No extra hardware", v: [[true], [true], [true], [true], [false, 3]] },
  { q: "Several screens at once", v: [[true], [false], [true], [true], [false]] },
  { q: "Remote control", v: [[true], [true], [true], [true], [false]] },
  { q: "Audio", v: [[true], [false], [true], [false], [false]] },
  { q: "HDR", v: [[true, 4], [false], [false], [false], [false]] },
  { q: "Free", v: [[true], [true], [false], [false], [true]] },
  { q: "Open source", v: [[true], [false], [false], [false], [true]] },
];

function Mark({ yes, note }: { yes: boolean; note?: number }) {
  return (
    <span className="relative inline-flex items-center justify-center">
      {yes ? (
        <Check size={18} strokeWidth={2.5} className="text-[#4f86ff]" aria-hidden="true" />
      ) : (
        <X size={18} strokeWidth={2.25} className="text-muted" aria-hidden="true" />
      )}
      <span className="sr-only">{yes ? "Yes" : "No"}</span>
      {note && (
        <sup className="absolute left-full top-[-1px] ml-0.5 text-[0.6875rem] font-semibold leading-none text-muted">
          <a href={`#cmp-note-${note}`} className="no-underline">
            {MARKS[note - 1]}
          </a>
        </sup>
      )}
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

        <p className="mt-5 flex items-center gap-1.5 text-sm text-muted">
          <X size={16} strokeWidth={2.25} aria-hidden="true" />
          Not offered, or not documented by the maker
        </p>
        <ol className="mt-3 space-y-1 text-sm text-muted">
          {NOTES.map((n, i) => (
            <li key={n} id={`cmp-note-${i + 1}`} className="flex gap-2">
              <span className="w-5 shrink-0 font-medium">{MARKS[i]}</span>
              {n}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Checked November 2026 against each maker's own pages. Sidecar is a trademark
          of Apple Inc.; other names belong to their owners. ScreenExtend isn't
          affiliated with any of them.
        </p>
      </div>
    </section>
  );
}
