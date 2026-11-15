import ShotButton from "@/components/home/ShotButton.tsx";

export default function HeroLanding() {
  return (
    <section id="home" className="pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
      <div className="container grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6 xl:col-span-5">
          <h1 className="text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
            Use a tablet, phone or spare laptop as a second monitor.
          </h1>
          <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-muted">
            ScreenExtend runs on your Windows PC or Mac and adds a virtual
            display that streams to any device with a web browser. Nothing gets
            installed on the second device.
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

        <div className="lg:col-span-6 xl:col-span-7">
          <ShotButton
            index={0}
            priority
            alt="The ScreenExtend Add Device screen: one QR code and join URL for an Anywhere (Internet) session and one for the Wifi-Home network."
            sizes="(min-width: 1024px) 44rem, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
