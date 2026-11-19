import QrInline from "@/components/home/app-demo/QrInline.tsx";
import { EdgeDrawing } from "@/components/home/drawings.tsx";

// The only real sequence on the page, so the only numbers. The code is an
// example (each session has its own); six cells echo the Session OTP row in the app.
const EXAMPLE_CODE = ["3", "7", "7", "6", "2", "0"];

function Step({ n, t, children, figure, note }: { n: number; t: string; children: React.ReactNode; figure: React.ReactNode; note?: string }) {
  return (
    <li className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 md:flex md:flex-col">
      <div className="col-start-2 row-start-2 mt-5 flex min-w-0 items-center md:order-3 md:mt-8 md:min-h-[16rem]">
        {figure}
      </div>
      {note && <p className="small-print col-start-2 row-start-3 mt-2 md:order-4">{note}</p>}
      <span
        className="condensed row-span-2 text-[4rem] font-extrabold leading-[0.8] text-link md:text-[5.5rem]"
        aria-hidden="true"
      >
        {n}
      </span>
      <div className="col-start-2 row-start-1 md:mt-4">
        <h3 className="wide text-xl font-bold leading-tight">
          <span className="sr-only">Step {n}. </span>
          {t}
        </h3>
        <div className="mt-2 max-w-[36ch] leading-relaxed text-muted">{children}</div>
      </div>
    </li>
  );
}

export default function ConnectFlow() {
  return (
    <section id="how" className="py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">Setup</h2>

        <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-14">
          <Step
            n={1}
            t="Scanning the code"
            figure={<QrInline className="w-full max-w-[20rem]" />}
          >
            Open a link in the client's browser.
          </Step>

          <Step
            n={2}
            t="Entering the code"
            figure={
              <>
                <div className="flex w-full max-w-xs gap-[4%]" aria-hidden="true">
                  {EXAMPLE_CODE.map((d, i) => (
                    <span
                      key={i}
                      className="condensed tabular flex aspect-[3/4] flex-1 items-center justify-center rounded-cell border-[1.5px] border-ink bg-sheet text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-none text-ink"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <span className="sr-only">Example code: 3 7 7 6 2 0</span>
              </>
            }
          >
            Enter the 6-digit security code to connect the device.
          </Step>

          <Step n={3} t="Moving a window across" figure={<EdgeDrawing className="h-32 w-auto max-w-full md:h-full" />}>
            Drag a window like a plugged-in monitor.
          </Step>
        </ol>
      </div>
    </section>
  );
}
