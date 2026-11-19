import DeskArrange from "@/components/home/DeskArrange.tsx";
import SendToComputer from "@/components/home/SendToComputer.tsx";

// The cover of the leaflet: the line on the box, then the figure with its key.
export default function HeroLanding() {
  return (
    <section id="home" className="bg-hero pb-16 pt-10 sm:pt-14 lg:pb-20 lg:pt-16">
      <div className="container">
        <div>
          <h1 className="display text-[clamp(2.3rem,4.2vw,3.75rem)]">
            Use your tablet as a second monitor
          </h1>
          <div className="mt-5 max-w-2xl">
            <p className="lede">
              Turns any iPad, Android tablet, phone or old laptop into an
              extended monitor through its browser. Wireless, nothing to install on the second device.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a href="#download" className="btn-solid min-h-12 w-full whitespace-nowrap px-6 text-base sm:w-auto">
                Download for Windows or Mac
              </a>
              <a href="#how" className="u-link inline-flex min-h-11 items-center">
                How to set it up
              </a>
            </div>
          </div>
        </div>

        <SendToComputer className="mt-8" />

        <div className="mt-10 lg:mt-14">
          <DeskArrange />
        </div>
      </div>
    </section>
  );
}
