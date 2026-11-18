// From the "Hardware encoder support" matrix in the app's README
// (github.com/ScreenExtend/ScreenExtend#platform-support), reworded for people
// who know their graphics card brand, not the encoding API. Linux is left out
// because there is no Linux download yet.
type Status = "yes" | "experimental" | "no" | "na";

const ROWS: { gpu: string; api: string; win: Status; mac: Status }[] = [
  { gpu: "NVIDIA", api: "NVENC", win: "yes", mac: "na" },
  { gpu: "Intel", api: "Quick Sync / VideoToolbox", win: "yes", mac: "yes" },
  { gpu: "Apple silicon", api: "VideoToolbox", win: "na", mac: "yes" },
  { gpu: "AMD", api: "AMF", win: "experimental", mac: "na" },
  { gpu: "Qualcomm", api: "Media Foundation", win: "no", mac: "na" },
  { gpu: "Any other", api: "Software encoding on the CPU", win: "yes", mac: "yes" },
];

const LABEL: Record<Status, string> = {
  yes: "Supported",
  experimental: "Experimental",
  no: "Not yet",
  na: "",
};

const TONE: Record<Status, string> = {
  yes: "font-semibold text-ink",
  experimental: "text-ink",
  no: "text-muted",
  na: "",
};

function Cell({ s }: { s: Status }) {
  if (s === "na") {
    return (
      <td className="px-4 py-3 text-muted">
        <span className="text-sm" aria-label="Not applicable">n/a</span>
      </td>
    );
  }
  return (
    <td className="px-4 py-3">
      <span className={TONE[s]}>{LABEL[s]}</span>
    </td>
  );
}

export default function GpuSupport() {
  return (
    <section id="gpu" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="display-lg">Which graphics chips it uses</h2>
          <p className="lede mt-3">
            ScreenExtend hands the video encoding to your graphics chip when it can, which keeps the
            second screen smooth. When it can't, the processor does the work instead.
          </p>
        </div>

        <div className="relative overflow-x-auto lg:col-span-7" tabIndex={0} role="region" aria-label="Graphics support table (scrolls sideways)">
          <table className="w-full min-w-[30rem] border-collapse border-y-2 border-ink text-left">
            <caption className="sr-only">Graphics card support by computer</caption>
            <thead>
              <tr className="wide border-b-[1.5px] border-ink text-[0.9375rem]">
                <th scope="col" className="px-4 py-3 pl-0 font-bold">Graphics</th>
                <th scope="col" className="px-4 py-3 font-bold">Windows PC</th>
                <th scope="col" className="px-4 py-3 font-bold">Mac</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.gpu} className="border-b border-line last:border-b-0">
                  <th scope="row" className="py-3 pl-0 pr-4 font-normal">
                    <span className="font-semibold">{r.gpu}</span>
                    <span className="small-print block">{r.api}</span>
                  </th>
                  <Cell s={r.win} />
                  <Cell s={r.mac} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
