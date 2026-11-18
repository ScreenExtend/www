import { PhoneMug } from "@/components/home/drawings.tsx";

// What goes on the other screen, set as the "if this, then that" table at the
// back of a manual. Product facts behind the answers: browser-only client,
// several devices at once, the hosted network for no Wi-Fi (see FaqSimple.tsx).
const USES: [string, string][] = [
  ["You keep alt-tabbing back to the call", "Put the call on the tablet and keep your notes in front of you. Or the other way round."],
  ["The team chat is half your attention", "Off to the side, it can wait its turn without sitting on top of your work."],
  ["You're copying from something", "The recipe, the spec or the how-to stays open the whole time instead of hiding behind a tab."],
  ["A 13-inch laptop with forty tabs", "The tablet already in your bag gives it a second screen."],
  ["There's no Wi-Fi", "ScreenExtend can start its own network, and the tablet connects straight to your computer. No router needed."],
  ["One extra screen isn't enough", "Connect a phone and a tablet at the same time. Each one is its own display."],
];

export default function UseCases() {
  return (
    <section id="uses" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display-lg">What goes on the other screen</h2>
          <p className="lede mt-3">Whatever you'd drag onto a plugged-in monitor. Some cases we know about:</p>
          <PhoneMug className="mt-10 hidden w-full max-w-xs lg:block" />
          <p className="small-print mt-2 hidden lg:block">A mug counts as a monitor stand.</p>
        </div>

        <div className="lg:col-span-8">
          <table className="w-full border-collapse border-y-2 border-ink text-left">
            <caption className="sr-only">Situations and what to put on the second screen</caption>
            <thead className="max-sm:sr-only">
              <tr className="border-b-[1.5px] border-ink text-[0.9375rem]">
                <th scope="col" className="wide w-[42%] py-3 pr-6 font-bold">If</th>
                <th scope="col" className="wide py-3 font-bold">Then</th>
              </tr>
            </thead>
            <tbody>
              {USES.map(([t, d]) => (
                <tr key={t} className="border-b border-line last:border-b-0 max-sm:flex max-sm:flex-col max-sm:py-4">
                  <th scope="row" className="wide py-4 pr-6 align-top text-lg font-bold leading-snug max-sm:py-0">
                    {t}
                  </th>
                  <td className="py-4 align-top leading-relaxed text-muted max-sm:pb-0 max-sm:pt-1">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-14 grid items-end gap-x-8 gap-y-4 sm:grid-cols-[auto_1fr]">
            <p className="condensed text-[6.5rem] font-extrabold leading-[0.8] text-link" aria-hidden="true">
              8<span className="text-[0.5em]"> ms</span>
            </p>
            {/* Source: docs/RESULTS.md in the app repo, real-content 1080p capture to
                encode with NVENC: 8.39 ms median, 9.44 ms p90. Not glass-to-glass. */}
            <div className="border-l-[1.5px] border-ink pl-5">
              <p className="text-lg leading-snug">
                <span className="wide font-bold">About the delay.</span> Your computer captures and
                encodes each frame in about <span className="font-bold">8 ms</span>.*
              </p>
              <p className="small-print mt-3">
                *Median on real 1080p content, with 9 in 10 frames under 10 ms. Measured on Windows 11
                (25H2) with an NVIDIA RTX 3080 Ti Laptop GPU.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
