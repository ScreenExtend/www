import qrCrop from "@/assets/app/crop-qr.webp";

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
    <section id="how" className="border-t border-line py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">How pairing works</h2>
        <p className="mt-3 max-w-[48ch] text-lg text-muted">Scan a code, type six digits, drag a window across. Nothing to install on the other device.</p>

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

            <div className="mt-10 grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-6 sm:gap-10">
              <div className="rounded-[1rem] bg-logo-mint p-3 sm:p-5">
                <img
                  src={qrCrop}
                  width={426}
                  height={554}
                  loading="lazy"
                  decoding="async"
                  alt="The Anywhere (Internet) QR code and join link in the ScreenExtend app."
                  className="block h-auto w-full rounded-[0.5rem]"
                />
              </div>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                <span className="text-ink">The real Add Device screen.</span> Every
                network your computer can reach gets its own code, so a phone on
                the same Wi-Fi joins locally.
              </p>
            </div>
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
                  <p className="mt-1.5 max-w-[42ch] leading-relaxed text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
