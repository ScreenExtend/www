import { Button, Card, useTheme } from "react-daisyui";

import windowsLogo from "@/assets/logo/windows.svg";
import macLogo from "@/assets/logo/mac.svg";
import macLogoLight from "@/assets/logo/mac-light.svg";
import linuxLogo from "@/assets/logo/linux.svg";

export default function Download() {
  const { theme } = useTheme();
  
  return (
    <section className="py-8 lg:py-20" id="download">
      <div className="container">
        <div className="text-center">
          <h2 className="text-4xl font-semibold">Download ScreenExtend</h2>
          <p className="mt-2 text-lg sm:text-center">
            Supports Windows, Mac, and Linux
          </p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="transition-all hover:shadow cursor-not-allowed opacity-50">
            <Card.Body className="p-6 gap-0 pointer-events-none select-none">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
                    <img alt="Windows Logo" className="h-8 w-8" src={windowsLogo} />
                  </div>
                  <h3 className="text-xl font-semibold">Windows (coming soon)</h3>
                </div>
              </div>
              <div>
                <p className="mt-4 text-sm">Minimum Version:</p>
                <ul className="list-inside list-disc text-sm">
                  <li>Windows Client 20H1 (May 2020)</li>
                  <li>Windows Server 20H2 (October 2020)</li>
                </ul>
                <div className="flex flex-row mt-5">
                  <Button className="grow basis-0">
                    32-bit EXE
                  </Button>
                  <div className="grow-0 w-3"></div>
                  <Button className="grow basis-0">
                    64-bit EXE
                  </Button>
                  {/* <div className="grow-0 w-3"></div>
                  <Button className="grow basis-0">
                    ARM EXE
                  </Button> */}
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card className="transition-all hover:shadow cursor-not-allowed opacity-50">
            <Card.Body className="p-6 gap-0 pointer-events-none select-none">
              <div className="flex items-center justify-between gap-2 p-0">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
                    <img alt="Mac Logo" className="h-9 w-9" src={theme == "light" ? macLogo : theme == "dark" ? macLogoLight : (getComputedStyle(document.querySelector(":root")!).getPropertyValue("color-scheme") != "light" ? macLogoLight : macLogo)} />
                  </div>
                  <h3 className="text-xl font-semibold">Mac (coming soon)</h3>
                </div>
              </div>
              <div>
                <p className="mt-4 text-sm">Minimum Version:</p>
                <ul className="list-inside list-disc text-sm">
                  <li>MacOS Catalina 10.15+ (October 2019)</li>
                </ul>
                <div className="flex flex-row mt-5">
                  <Button className="grow basis-0">
                    Intel DMG
                  </Button>
                  <div className="grow-0 w-3"></div>
                  <Button className="grow basis-0">
                    Apple Silicon DMG
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card className="transition-all hover:shadow cursor-not-allowed opacity-50">
            <Card.Body className="p-6 gap-0 pointer-events-none select-none">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
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
        </div>
        <p className="mt-4 text-center">
        Running on an unsupported operating system? Contact us at <a href="mailto:support@screenextend.app" style={{ textDecoration: "underline" }}>support@screenextend.app</a> with your device information for a custom build.
        </p>
      </div>
    </section>
  );
}
