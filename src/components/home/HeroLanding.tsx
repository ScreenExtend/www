import ShotButton from "@/components/home/ShotButton.tsx";

export default function HeroLanding() {
  return (
    <section id="home" className="pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
      <div className="container grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6 xl:col-span-5">
          <h1 className="text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
            Use a tablet, phone or spare laptop as a second monitor.
          </h1>
          <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-muted">
            Runs on your Windows PC or Mac. The second device only needs a web
            browser.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#download" className="btn-solid w-full sm:w-auto">
              Download for Windows or Mac
            </a>
            <a href="#how" className="u-link inline-flex min-h-11 items-center">
              How pairing works
            </a>
          </div>
          <p className="mt-5 text-sm text-muted">
            Free. Windows 20H1 or later, macOS Catalina 10.15 or later.
          </p>
        </div>

        {/* Flat blocks in the logo's mint and lime, stacked and offset the way the
            logo stacks its three screens. No blur, no gradient. */}
        <div className="relative pb-6 pr-6 sm:pb-10 sm:pr-10 lg:col-span-6 xl:col-span-7">
          <div
            aria-hidden="true"
            className="absolute inset-0 left-6 top-6 rounded-shot bg-logo-mint sm:left-10 sm:top-10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-3 rounded-shot bg-lime sm:inset-5"
          />
          <div className="relative">
            <ShotButton
              index={0}
              priority
              alt="The ScreenExtend Add Device screen: one QR code and join URL for an Anywhere (Internet) session and one for the Wifi-Home network."
              sizes="(min-width: 1024px) 44rem, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
