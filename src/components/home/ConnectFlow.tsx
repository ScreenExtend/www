import qrCrop from "@/assets/app/crop-qr.webp";

// Pairing as three frames, left to right, each with the thing you actually see.
// The code is an example (each session has its own); six cells echo the Session
// OTP row in the app (src/assets/app/feature-3.png).
const EXAMPLE_CODE = ["3", "7", "7", "6", "2", "0"];

function Frame({ n, t, d, children }: { n: number; t: string; d: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-panel bg-surface p-[8%]">
        {children}
      </div>
      <h3 className="mt-5 text-lg font-semibold">
        <span className="mr-2 text-link">{n}</span>
        {t}
      </h3>
      <p className="mt-1.5 leading-relaxed text-muted">{d}</p>
    </li>
  );
}

export default function ConnectFlow() {
  return (
    <section id="how" className="py-16 lg:py-20">
      <div className="container">
        <h2 className="display-lg">How pairing works</h2>
        <p className="mt-3 text-lg text-muted">About a minute, the first time.</p>

        <ol className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
          <Frame
            n={1}
            t="Scan the code"
            d="ScreenExtend shows a QR code on your computer. Point the other device's camera at it, or type the link. It opens in the browser."
          >
            <img
              src={qrCrop}
              alt="The QR code panel in the ScreenExtend app"
              className="h-full w-auto rounded-cell object-contain"
              loading="lazy"
            />
          </Frame>

          <Frame n={2} t="Type the 6 digits" d="Your computer now treats the other device as a second monitor, sized to fit it.">
            <div className="flex w-full gap-[3%]" aria-hidden="true">
              {EXAMPLE_CODE.map((d, i) => (
                <span
                  key={i}
                  className={`tabular flex aspect-[3/4] flex-1 items-center justify-center rounded-shot font-mono text-[clamp(1.1rem,2.2vw,1.75rem)] font-semibold leading-none ${
                    i === EXAMPLE_CODE.length - 1 ? "bg-lime text-[#0f1419]" : "bg-paper text-ink"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
            <span className="sr-only">Example code: 3 7 7 6 2 0</span>
          </Frame>

          <Frame n={3} t="Drag a window across" d="Use it like any extra monitor. Move windows over and they show up on the other screen.">
            <div aria-hidden="true" className="relative flex w-full items-end gap-[3%]">
              <div className="flex aspect-[16/10] w-[64%] flex-col justify-between rounded-[5px] bg-screen-blue p-[3%] text-white">
                <span className="text-sm font-semibold leading-none">1</span>
              </div>
              <div className="flex aspect-[3/4] w-[33%] flex-col justify-between rounded-[5px] bg-logo-mint p-[3%] text-[#0f1419]">
                <span className="text-sm font-semibold leading-none">2</span>
              </div>
              {/* the window, halfway across the gap */}
              <div className="cross-window absolute bottom-[16%] left-[46%] w-[34%] overflow-hidden rounded-[4px] bg-white shadow-[0_6px_16px_-8px_rgb(0_0_0/0.35)]">
                <div className="flex h-2.5 items-center gap-1 bg-[#e6eaef] px-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#9aa4ae]" />
                  <span className="h-1 w-1 rounded-full bg-[#9aa4ae]" />
                </div>
                <div className="aspect-[4/3]" />
              </div>
            </div>
          </Frame>
        </ol>
      </div>
    </section>
  );
}
