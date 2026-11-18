import HeroVideo from "@/components/home/HeroVideo.tsx";
import SendToComputer from "@/components/home/SendToComputer.tsx";

// The side of the box: what a careful shopper turns it over to read.
const SPECS: [string, string][] = [
  ["Price", "Free"],
  ["Downloads", "2.5k+ so far"],
  ["Your computer", "Windows 10 (2020) or newer, or macOS Catalina or newer (Mac is in beta)"],
  ["The other device", "Anything with a web browser. Nothing to install on it."],
];

export default function HeroLanding() {
  return (
    <section id="home" className="pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 lg:pt-4">
          <h1 className="display text-[clamp(2.4rem,3.9vw,3.5rem)]">A second monitor you already own</h1>
          <p className="lede mt-6">
            That old iPad in the drawer will do. So will your phone, or the laptop you replaced.
            ScreenExtend runs on your computer, and the other device opens a link in its browser.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <a href="#download" className="btn-solid min-h-12 w-full whitespace-nowrap px-6 text-base sm:w-auto">
              Download for Windows or Mac
            </a>
            <a href="#how" className="u-link inline-flex min-h-11 items-center">
              Read the setup (it's short)
            </a>
          </div>

        </div>

        <div className="lg:col-span-7">
          <HeroVideo />
        </div>

        <SendToComputer />

        <dl className="grid grid-cols-1 border-y-[1.5px] border-ink sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
          {SPECS.map(([k, v]) => (
            <div key={k} className="spec-cell py-4">
              <dt className="small-print font-semibold text-ink">{k}</dt>
              <dd className="mt-1 text-[0.9375rem] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
