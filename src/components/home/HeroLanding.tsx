import Arrange from "@/components/home/Arrange.tsx";
import SendToComputer from "@/components/home/SendToComputer.tsx";
import GitHubCorner from "@/components/home/GitHubCorner.tsx";

export default function HeroLanding() {
  return (
    <section id="home" className="relative overflow-x-clip pb-16 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
      <GitHubCorner />
      <div className="container grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h1 className="display text-[clamp(2.25rem,4vw,3.25rem)]">
            Use your tablet or phone as a second monitor
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Or a spare laptop. ScreenExtend runs on your computer, and the other device
            just opens it in the browser. Nothing to install there.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a href="#download" className="btn-solid min-h-12 w-full px-6 text-base active:scale-[0.97] sm:w-auto">
              Download for Windows or Mac
            </a>
            <a href="#how" className="u-link inline-flex min-h-11 items-center">
              How pairing works
            </a>
          </div>

          <SendToComputer />

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li>Free</li>
            <li>
              <span className="text-ink">2.5k+</span> downloads
            </li>
            <li>Windows 10 (2020) or newer, macOS Catalina or newer</li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <Arrange />
        </div>
      </div>
    </section>
  );
}
