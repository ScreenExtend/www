import { Check, Clock, Minus, X } from "lucide-react";

// Competitor comparison (research: career-agent/reports/ScreenExtend competitor
// landscape.md, cells re-verified in exhaustive-unslop/rerun/compare-verified.md).
// All of these are wireless, so that isn't a row. Check / X / "coming", with a
// note of a few words only where one is needed. Upcoming ScreenExtend features
// are rows marked "Coming". Re-check before changing the date.
type MarkKind = "yes" | "no" | "part" | "soon" | "text";
type Cell = [MarkKind, string?];

const COLS = ["ScreenExtend", "Apple Sidecar", "Spacedesk", "Duet Display", "Deskreen"] as const;

const ROWS: { q: string; v: [Cell, Cell, Cell, Cell, Cell] }[] = [
  { q: "Windows support", v: [["yes"], ["no"], ["yes"], ["yes"], ["yes"]] },
  { q: "Mac support", v: [["yes"], ["yes"], ["part", "Beta"], ["yes"], ["yes"]] },
  { q: "Linux support", v: [["soon"], ["no"], ["no"], ["no"], ["yes"]] },
  { q: "Any device with a browser", v: [["yes"], ["no"], ["no"], ["no"], ["yes"]] },
  { q: "No extra hardware", v: [["yes"], ["yes"], ["yes"], ["yes"], ["no", "Dummy plug required"]] },
  { q: "No account needed", v: [["yes"], ["no"], ["yes"], ["no"], ["yes"]] },
  { q: "Works over a cable", v: [["soon"], ["yes"], ["yes"], ["yes"], ["part", "Workaround"]] },
  { q: "HDR", v: [["soon"], ["no"], ["no"], ["no"], ["no"]] },
  { q: "Use its mic and camera", v: [["soon"], ["no"], ["soon"], ["no"], ["no"]] },
  { q: "Free", v: [["yes"], ["yes"], ["part", "Personal use"], ["no", "From $3.99/mo"], ["part", "Up to 1 device"]] },
  { q: "Open source", v: [["yes"], ["no"], ["no"], ["no"], ["yes"]] },
];

function Mark({ m, note }: { m: MarkKind; note?: string }) {
  if (m === "text") return <span className="block text-center text-sm">{note}</span>;
  const icon =
    m === "yes" ? (
      <Check size={18} strokeWidth={2.5} className="text-[#4f86ff]" aria-hidden="true" />
    ) : m === "no" ? (
      <X size={18} strokeWidth={2.25} className="text-muted" aria-hidden="true" />
    ) : m === "part" ? (
      <Minus size={18} strokeWidth={2.5} className="text-muted" aria-hidden="true" />
    ) : (
      <Clock size={16} strokeWidth={2.25} className="text-muted" aria-hidden="true" />
    );
  const label = m === "yes" ? "Yes" : m === "no" ? "No" : m === "part" ? "Partly" : "Coming soon";
  return (
    <span className="flex flex-col items-center gap-0.5 text-center">
      {icon}
      <span className={m === "soon" ? "text-xs text-muted" : "sr-only"}>{label}</span>
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
                  {r.v.map(([m, note], i) => (
                    <td key={i} className={`px-2 py-3 align-middle ${i === 0 ? "bg-tile-blue" : ""}`}>
                      <Mark m={m} note={note} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          Checked November 2026 against each maker's own pages. Wireless use in every column. Sidecar is a trademark
          of Apple Inc.; other names belong to their owners. ScreenExtend isn't
          affiliated with any of them.
        </p>
      </div>
    </section>
  );
}
