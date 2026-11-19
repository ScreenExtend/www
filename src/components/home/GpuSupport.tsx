// The numbers section: the measured encode time, then the graphics chips it can
// use. The matrix is from "Hardware encoder support" in the app's README
// (github.com/ScreenExtend/ScreenExtend#platform-support), reworded for people
// who know their graphics card brand, not the encoding API. Linux is left out
// because there is no Linux download yet.
type Status = "yes" | "experimental" | "no" | "na";

const ROWS: { gpu: string; api: string; win: Status; mac: Status }[] = [
  { gpu: "NVIDIA", api: "NVENC", win: "yes", mac: "na" },
  { gpu: "Intel", api: "Quick Sync / VideoToolbox", win: "yes", mac: "yes" },
  { gpu: "Apple Silicon", api: "VideoToolbox", win: "na", mac: "yes" },
  { gpu: "AMD", api: "AMF", win: "experimental", mac: "na" },
  { gpu: "Qualcomm", api: "Media Foundation", win: "no", mac: "na" },
  { gpu: "Any other", api: "Software, on the CPU", win: "yes", mac: "yes" },
];

const LABEL: Record<Status, string> = {
  yes: "Supported",
  experimental: "Experimental",
  no: "Not yet",
  na: "n/a",
};

// a small printed square: filled or outlined in the spot ink, or outlined in grey
const MARK: Record<Status, string> = {
  yes: "bg-spot",
  experimental: "border-2 border-spot",
  no: "border-2 border-muted",
  na: "",
};

function Cell({ s }: { s: Status }) {
  return (
    <td className="h-[4.75rem] whitespace-nowrap px-2 sm:h-16 sm:px-4">
      <span className={`inline-flex items-center gap-1.5 text-sm sm:gap-2.5 sm:text-[0.9375rem] ${s === "na" || s === "no" ? "text-muted" : "text-ink"}`}>
        {s !== "na" && <span aria-hidden="true" className={`h-3 w-3 shrink-0 rounded-[2px] ${MARK[s]}`} />}
        {s === "na" ? <span aria-label="Not applicable">n/a</span> : LABEL[s]}
      </span>
    </td>
  );
}

export default function GpuSupport() {
  return (
    <section id="gpu" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg max-w-2xl">Performance and GPU support</h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Source: docs/RESULTS.md in the app repo, real-content 1080p capture to
              encode with NVENC: 8.39 ms median, 9.44 ms p90. Not glass-to-glass. */}
          <div className="min-w-0 lg:col-span-4">
            <p className="condensed tabular text-[clamp(6rem,12vw,8.5rem)] font-extrabold leading-[0.8] text-link">
              8<span className="text-[0.5em]"> ms</span>
            </p>
            <p className="wide mt-5 text-xl font-bold leading-tight">to capture and encode a frame</p>
            <p className="small-print mt-4">
              Median on real 1080p content, with 9 in 10 frames under 10 ms. Measured on Windows 11
              (25H2) with an NVIDIA RTX 3080 Ti Laptop GPU.
            </p>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <h3 className="wide text-xl font-bold">Graphics chips</h3>
            {/* fits at 390px, so no scroll region or tab stop; overflow stays
                only as a guard for very narrow windows */}
            <div className="mt-6 overflow-x-auto">
              {/* ruled like the comparison table: heavy ink rules top and bottom,
                  hairlines between rows, every row the same height */}
              <table className="w-full min-w-[20rem] border-collapse border-y-2 border-ink text-left">
                <caption className="sr-only">Graphics card support by computer</caption>
                <thead>
                  <tr className="border-b-[1.5px] border-ink text-[0.9375rem]">
                    <th scope="col" className="wide px-2 py-3 font-semibold sm:px-4">Graphics</th>
                    <th scope="col" className="wide px-2 py-3 font-semibold sm:px-4">Windows</th>
                    <th scope="col" className="wide px-2 py-3 font-semibold sm:px-4">Mac</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.gpu} className="border-b border-line last:border-b-0">
                      <th scope="row" className="h-[4.75rem] px-2 py-1.5 font-normal sm:h-16 sm:px-4">
                        <span className="whitespace-nowrap font-semibold">{r.gpu}</span>
                        <span className="small-print block leading-snug">{r.api}</span>
                      </th>
                      <Cell s={r.win} />
                      <Cell s={r.mac} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
