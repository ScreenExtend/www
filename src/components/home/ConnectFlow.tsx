// Example code (digits from the previous site's demo). Six separate cells echo the
// Session OTP row in src/assets/app/feature-3.png; the lime last cell is a site
// accent marking the digit just typed, not something the app draws.
const EXAMPLE_CODE = ["3", "7", "7", "6", "2", "0"];

const STEPS = [
  {
    t: "Open ScreenExtend on your computer",
    d: "It shows a QR code for your Wi-Fi, and one that works over the internet.",
  },
  {
    t: "Scan it with the other device",
    d: "Point the camera at it, or type the link. It opens in the browser.",
  },
  {
    t: "Type the 6-digit code",
    d: "Your computer now treats the other device as a second monitor, sized to fit it.",
  },
  {
    t: "Drag a window across",
    d: "Use it like any extra monitor. Move windows over and they show up on the other screen.",
  },
];

export default function ConnectFlow() {
  return (
    <section id="how" className="py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">How pairing works</h2>
        <p className="mt-3 text-lg text-muted">Scan a code, type six digits, drag a window across.</p>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          {/* The code at display size: the moment the pairing happens. */}
          <figure className="lg:col-span-7">
            <div className="flex max-w-[26rem] gap-[2%]" aria-hidden="true">
              {EXAMPLE_CODE.map((d, i) => (
                <span
                  key={i}
                  className={`tabular flex aspect-[3/4] flex-1 items-center justify-center rounded-[0.6rem] font-mono text-[clamp(1.4rem,3vw,2.25rem)] font-semibold leading-none ${
                    i === EXAMPLE_CODE.length - 1
                      ? "bg-lime text-[#0f1419]"
                      : "border border-line bg-surface text-ink"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
            <figcaption className="mt-4 text-sm text-muted">
              <span className="sr-only">Digits shown: 3 7 7 6 2 0. </span>
              Example code. Each session has its own.
            </figcaption>

          </figure>

          <ol className="lg:col-span-5 lg:pl-6">
            {STEPS.map((s, i) => (
              <li
                key={s.t}
                className="grid grid-cols-[2rem_1fr] gap-x-4 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-[2.25rem_1fr]"
              >
                <span
                  aria-hidden="true"
                  className="text-2xl font-semibold leading-tight text-logo-blue"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold leading-snug">{s.t}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
