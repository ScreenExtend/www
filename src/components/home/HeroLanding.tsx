import ShotButton from "@/components/home/ShotButton.tsx";
import SendToComputer from "@/components/home/SendToComputer.tsx";
import GitHubCorner from "@/components/home/GitHubCorner.tsx";

// The logo, taken literally: three rounded screens stacked down and to the right
// (mint at the back, blue in the middle, front screen last). Here the front screen
// is the real Add Device screenshot. Offsets follow the logo's step
// (src/assets/logo/screenextend.svg), scaled down so the shot stays large.
function StackedShot() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="stack-plate absolute bottom-[6%] left-[-4%] right-[4%] top-[-6%] rounded-[1.25rem] bg-logo-mint [--settle-x:4%] [--settle-y:6%]"
      />
      <div
        aria-hidden="true"
        className="stack-plate absolute bottom-[3%] left-[-2%] right-[2%] top-[-3%] rounded-[1.25rem] bg-logo-blue [--settle-x:2%] [--settle-y:3%]"
      />
      <div className="relative rounded-[1.25rem] bg-[#060b14] p-2 sm:p-3">
        <ShotButton
          index={0}
          priority
          alt="The ScreenExtend Add Device screen: one QR code and join URL for an Anywhere (Internet) session and one for the Wifi-Home network."
          sizes="(min-width: 1280px) 64rem, 100vw"
        />
      </div>
    </div>
  );
}

export default function HeroLanding() {
  return (
    <section id="home" className="relative overflow-x-clip bg-tint pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
      <GitHubCorner />
      <div className="container text-center">
        <h1 className="mx-auto max-w-[22ch] text-[clamp(2.25rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
          Use your tablet or phone as a second monitor.
        </h1>
        <p className="mx-auto mt-6 max-w-[36ch] text-lg leading-relaxed text-muted sm:text-xl">
          Or a spare laptop. ScreenExtend runs on your computer, and the other device just opens it in the browser. Nothing to install there.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a href="#download" className="btn-solid min-h-12 w-full px-6 text-base active:scale-[0.97] sm:w-auto">
            Download for Windows or Mac
          </a>
          <a href="#how" className="u-link inline-flex min-h-11 items-center">
            How pairing works
          </a>
        </div>

        <SendToComputer />

        <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
          <li>Free</li>
          <li>
            <span className="tabular text-ink">2.5k+</span> downloads
          </li>
          <li>For Windows 10 (2020) or newer, and macOS Catalina or newer</li>
        </ul>
      </div>

      <div className="container mt-16 sm:mt-20">
        <div className="mx-auto max-w-5xl pl-[4%] pt-[6%]">
          <StackedShot />
        </div>
      </div>
    </section>
  );
}
