import { useState } from "react";
import { Button, Card, useTheme } from "react-daisyui";

import Reveal from "@/components/Reveal.tsx";
import windowsLogo from "@/assets/logo/windows.svg";
import macLogo from "@/assets/logo/mac.svg";
import macLogoLight from "@/assets/logo/mac-light.svg";
import linuxLogo from "@/assets/logo/linux.svg";

const CARD =
  "h-full border border-base-content/10 bg-base-100/70 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30";
const ICON_WRAP =
  "flex h-16 w-16 items-center justify-center rounded-full bg-base-200 transition-colors duration-300 group-hover:bg-primary/10";
const DL_BTN =
  "w-full transition-colors duration-200 hover:border-primary hover:text-primary";

export default function Download() {
  const { theme } = useTheme();
  const [showMacNotice, setShowMacNotice] = useState(false);

  return (
    <section className="py-8 lg:py-20" id="download">
      <div className="container">
        <Reveal className="text-center">
          <h2 className="text-4xl font-semibold">Download ScreenExtend</h2>
          <p className="mt-2 text-lg sm:text-center">
            Supports Windows, Mac, and Linux
          </p>
        </Reveal>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal delay={0} className="h-full">
            <Card className={`group ${CARD}`}>
              <Card.Body className="p-6 gap-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={ICON_WRAP}>
                      <img alt="Windows Logo" className="h-8 w-8" src={windowsLogo} />
                    </div>
                    <h3 className="text-xl font-semibold">Windows</h3>
                  </div>
                </div>
                <div>
                  <p className="mt-4 text-sm">Minimum Version:</p>
                  <ul className="list-inside list-disc text-sm">
                    <li>Windows Client 20H1 (May 2020)</li>
                    <li>Windows Server 20H2 (October 2020)</li>
                  </ul>
                  <div className="flex flex-row mt-5">
                    <a className="grow basis-0" href="https://github.com/ScreenExtend/ScreenExtend/releases/latest/download/ScreenExtend_x64-setup.exe" target="_blank">
                      <Button className={DL_BTN}>
                        64-bit EXE
                      </Button>
                    </a>
                    <div className="grow-0 w-3"></div>
                    <a className="grow basis-0 cursor-not-allowed opacity-50" target="_blank">
                      <Button className="w-full pointer-events-none select-none">
                        ARM EXE
                      </Button>
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <Card className={`group ${CARD}`}>
              <Card.Body className="p-6 gap-0">
                <div className="flex items-center justify-between gap-2 p-0">
                  <div className="flex items-center gap-4">
                    <div className={ICON_WRAP}>
                      <img alt="Mac Logo" className="h-9 w-9" src={theme == "light" ? macLogo : theme == "dark" ? macLogoLight : (getComputedStyle(document.querySelector(":root")!).getPropertyValue("color-scheme") != "light" ? macLogoLight : macLogo)} />
                    </div>
                    <h3 className="text-xl font-semibold">Mac (beta)</h3>
                  </div>
                </div>
                <div>
                  <p className="mt-4 text-sm">Minimum Version:</p>
                  <ul className="list-inside list-disc text-sm">
                    <li>MacOS Catalina 10.15+ (October 2019)</li>
                  </ul>
                  <p className="text-sm text-red-400">WARNING: Use with caution. Builds have not been widely tested.</p>
                  <div className="flex flex-row mt-5">
                    <a className="grow basis-0" href="https://github.com/ScreenExtend/ScreenExtend/releases/latest/download/ScreenExtend_universal.dmg" target="_blank" onClick={() => setShowMacNotice(true)}>
                      <Button className={DL_BTN}>
                        Universal DMG
                      </Button>
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Reveal>
          <Reveal delay={240} className="h-full">
            <Card className={`group ${CARD} cursor-not-allowed opacity-50`}>
              <Card.Body className="p-6 gap-0 pointer-events-none select-none">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={ICON_WRAP}>
                      <img alt="Linux Logo" className="h-12 w-12" src={linuxLogo} />
                    </div>
                    <h3 className="text-xl font-semibold">Linux (coming soon)</h3>
                  </div>
                </div>
                <div>
                  <p className="mt-4 text-sm">Minimum Version:</p>
                  <ul className="list-inside list-disc text-sm">
                    <li>Ubuntu 20.04 (April 2020)</li>
                  </ul>
                  <div className="flex flex-row mt-5">
                    <Button className="grow basis-0">
                      DEB
                    </Button>
                    <div className="grow-0 w-3"></div>
                    <Button className="grow basis-0">
                      RPM
                    </Button>
                    <div className="grow-0 w-3"></div>
                    <Button className="grow basis-0">
                      APPIMAGE
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Reveal>
        </div>
        {showMacNotice && (
          <div className="mt-6 rounded-lg border border-primary/30 bg-base-100/70 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img alt="Mac Logo" className="h-6 w-6" src={theme == "light" ? macLogo : theme == "dark" ? macLogoLight : (getComputedStyle(document.querySelector(":root")!).getPropertyValue("color-scheme") != "light" ? macLogoLight : macLogo)} />
                <h3 className="text-lg font-semibold">Your download is starting...</h3>
              </div>
              <button
                aria-label="Dismiss"
                className="text-base-content/50 transition-colors hover:text-base-content"
                onClick={() => setShowMacNotice(false)}
                type="button"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm text-base-content/80">
              The Mac build is still in beta and isn't notarized by Apple yet, so macOS says it's from an <span className="font-medium">"unidentified developer"</span> and
              doesn't open it. This is normal; to launch the program:
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-base-content/80">
              <li>Open the downloaded <span className="font-medium">.dmg</span> and drag ScreenExtend into your <span className="font-medium">Applications</span> folder.</li>
              <li>In Applications, <span className="font-medium">Control-click</span> (or right-click) ScreenExtend and choose <span className="font-medium">Open</span>.</li>
              <li>Click <span className="font-medium">Open</span> in this second dialog that appears. You only need to do this once.</li>
            </ol>
            <p className="mt-3 text-sm text-base-content/80">
              If it's still blocked, open <span className="font-medium">System Settings {"-->"} Privacy &amp; Security</span>, scroll
              to the note that ScreenExtend was blocked, and click <span className="font-medium">Open Anyway</span>.
            </p>
            <p className="mt-3 text-sm text-base-content/60">
              If macOS says the app is <span className="font-medium">"damaged"</span>, open <span className="font-medium">Terminal</span>, run <code className="rounded bg-base-200 px-1.5 py-0.5">xattr -cr /Applications/ScreenExtend.app</code>, and try again.
            </p>
          </div>
        )}
        <Reveal>
          <p className="mt-4 text-center">
          Running on an unsupported operating system? Contact us at <a href="mailto:support@screenextend.app" style={{ textDecoration: "underline" }}>support@screenextend.app</a> with your device information for a custom build.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
