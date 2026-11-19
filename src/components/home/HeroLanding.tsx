import DeskArrange from "@/components/home/DeskArrange.tsx";
import SendToComputer from "@/components/home/SendToComputer.tsx";

// The cover of the leaflet: the line on the box, then the figure with its key.
export default function HeroLanding() {
  return (
    <section id="home" className="bg-hero pb-16 pt-10 sm:pt-14 lg:pb-20 lg:pt-16">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h1 className="display text-[clamp(2.3rem,4.2vw,3.75rem)] lg:col-span-7">
            Use your tablet as a second monitor
          </h1>
          <div className="lg:col-span-5 lg:pt-2">
            <p className="lede">
              ScreenExtend runs on a Windows PC or Mac. An iPad, Android tablet, phone, old laptop
              or any other device with a browser opens a link and becomes an extended monitor. It
              works wirelessly and needs no install on the other device.
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
