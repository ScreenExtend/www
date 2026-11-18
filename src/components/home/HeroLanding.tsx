import HeroVideo from "@/components/home/HeroVideo.tsx";
import SendToComputer from "@/components/home/SendToComputer.tsx";

// The cover of the leaflet: the line on the box, then the figure with its key.
export default function HeroLanding() {
  return (
    <section id="home" className="pb-16 pt-10 sm:pt-14 lg:pb-20 lg:pt-16">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h1 className="display text-[clamp(2.4rem,4.4vw,4rem)] lg:col-span-7">A second monitor you already own</h1>
          <div className="lg:col-span-5 lg:pt-2">
            <p className="lede">
              That old iPad in the drawer will do. So will your phone, or the laptop you replaced.
              ScreenExtend runs on your computer, and the other device opens a link in its browser.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a href="#download" className="btn-solid min-h-12 w-full whitespace-nowrap px-6 text-base sm:w-auto">
                Download for Windows or Mac
              </a>
              <a href="#how" className="u-link inline-flex min-h-11 items-center">
                How to set it up
              </a>
            </div>
            <p className="small-print mt-4 max-w-md">
              Free, and downloaded 2.5k+ times. Needs Windows 10 version 2004 (May 2020) or newer, or
              macOS Catalina or newer. The Mac version is in beta.
            </p>
          </div>
        </div>

        <SendToComputer className="mt-8" />

        <div className="mt-10 lg:mt-14">
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}
