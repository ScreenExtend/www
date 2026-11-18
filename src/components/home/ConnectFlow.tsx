import qrCrop from "@/assets/app/crop-qr.webp";
import { DeskDrawing } from "@/components/home/drawings.tsx";

// The only real sequence on the page, so the only numbers. Panels are split by
// dashed fold lines, as if the leaflet folds here. The code is an example (each
// session has its own); six cells echo the Session OTP row in the app.
const EXAMPLE_CODE = ["3", "7", "7", "6", "2", "0"];

function Step({ n, t, children, figure }: { n: number; t: string; children: React.ReactNode; figure: React.ReactNode }) {
  return (
    <li className="flex flex-col border-dashed border-line pt-8 first:pt-0 max-md:[&:not(:first-child)]:border-t md:px-8 md:pt-0 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l">
      <div className="flex h-60 items-center justify-center overflow-hidden rounded-panel bg-surface p-6 lg:h-64">
        {figure}
      </div>
      <span className="condensed mt-6 text-[4.5rem] font-extrabold leading-[0.8] text-link" aria-hidden="true">
        {n}
      </span>
      <h3 className="wide mt-4 text-xl font-bold leading-tight">
        <span className="sr-only">Step {n}. </span>
        {t}
      </h3>
      <div className="mt-3 max-w-[36ch] leading-relaxed text-muted">{children}</div>
    </li>
  );
}

export default function ConnectFlow() {
  return (
    <section id="how" className="py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">Setup, all of it</h2>
        <p className="lede mt-3">About a minute, the first time.</p>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          <Step
            n={1}
            t="Open ScreenExtend on your computer"
            figure={
              <img
                src={qrCrop}
                alt="The QR code panel in the ScreenExtend app"
                className="h-full max-h-full w-auto rounded-cell object-contain"
                loading="lazy"
              />
            }
          >
            It shows a QR code. Point the tablet's camera at it, or type the link into its browser.
          </Step>

          <Step
            n={2}
            t="Type the 6 digits"
            figure={
              <>
                <div className="flex w-full gap-[3%]" aria-hidden="true">
                  {EXAMPLE_CODE.map((d, i) => (
                    <span
                      key={i}
                      className={`condensed tabular flex aspect-[3/4] flex-1 items-center justify-center rounded-cell border-[1.5px] border-ink text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-none ${
                        i === EXAMPLE_CODE.length - 1 ? "bg-lime text-[#15171b]" : "bg-sheet text-ink"
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <span className="sr-only">Example code: 3 7 7 6 2 0</span>
              </>
            }
          >
            Your computer now treats the tablet as a second monitor, sized to fit it.
          </Step>

          <Step n={3} t="There is no step 3" figure={<DeskDrawing animate={false} className="w-full" />}>
            Okay, there is. Drag a window across, the same way you would onto a plugged‑in monitor.
          </Step>
        </ol>
      </div>
    </section>
  );
}
