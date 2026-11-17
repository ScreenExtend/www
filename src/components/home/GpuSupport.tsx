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

const CHIP: Record<Status, string> = {
  yes: "bg-[#316cff]/15 text-ink",
  experimental: "bg-[#d6f1ed]/15 text-ink",
  no: "bg-surface text-muted",
  na: "",
};

function Cell({ s }: { s: Status }) {
  if (s === "na") {
    return (
      <td className="px-4 py-3 text-muted">
        <span className="text-sm">n/a</span>
      </td>
    );
  }
  return (
    <td className="px-4 py-3">
      <span className={`inline-flex rounded-cell px-2 py-0.5 text-sm font-medium ${CHIP[s]}`}>
        {LABEL[s]}
      </span>
    </td>
  );
}

export default function GpuSupport() {
  return (
    <section id="gpu" className="bg-tint py-16 lg:py-24">
      <div className="container grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display-lg">Works with your graphics card</h2>
          <p className="mt-3 max-w-[38ch] text-lg leading-relaxed text-muted">
            ScreenExtend uses your computer's graphics chip to keep the second
            screen smooth. If it isn't supported, it falls back to the processor.
          </p>
        </div>

        <div className="overflow-x-auto lg:col-span-8">
          <table className="w-full min-w-[30rem] border-collapse text-left">
            <caption className="sr-only">Graphics card support by computer</caption>
            <thead>
              <tr className="border-b border-line text-sm text-muted">
                <th scope="col" className="px-4 pb-3 font-medium">Graphics</th>
                <th scope="col" className="px-4 pb-3 font-medium">Windows PC</th>
                <th scope="col" className="px-4 pb-3 font-medium">Mac</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.gpu} className="border-b border-line">
                  <th scope="row" className="px-4 py-3 font-normal">
                    <span className="font-semibold">{r.gpu}</span>
                    <span className="block text-sm text-muted">{r.api}</span>
                  </th>
                  <Cell s={r.win} />
                  <Cell s={r.mac} />
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-muted">
            Experimental: built, but not yet tested as thoroughly as the others.{" "}
            <a
              href="https://github.com/ScreenExtend/ScreenExtend#platform-support"
              target="_blank"
              rel="noopener noreferrer"
              className="u-link"
            >
              Full support details
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
