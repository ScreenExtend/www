import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "react-daisyui";
import { X } from "lucide-react";

import windowsLogo from "@/assets/logo/windows.svg";
import macLogo from "@/assets/logo/mac.svg";
import macLogoLight from "@/assets/logo/mac-light.svg";
import linuxLogo from "@/assets/logo/linux.svg";

const RELEASES = "https://github.com/ScreenExtend/ScreenExtend/releases/latest";
const WINDOWS_EXE = `${RELEASES}/download/ScreenExtend_x64-setup.exe`;
const MAC_DMG = `${RELEASES}/download/ScreenExtend_universal.dmg`;

function Platform({
  logo,
  name,
  requires,
  requiresLabel = "Requires",
  yours = false,
  children,
}: {
  yours?: boolean;
  logo: ReactNode;
  name: string;
  requires: string[];
  requiresLabel?: string;
  children: ReactNode;
}) {
  return (
    // a tear-off coupon: perforated edge, or a solid spot-blue edge on your own OS
    <div
      className={`flex flex-col rounded-panel p-5 sm:p-6 ${
        yours ? "border-2 border-spot bg-sheet" : "border-2 border-dashed border-muted"
      }`}
    >
      <h3 className="wide flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-bold">
        {logo}
        {name}
        {yours && <span className="small-print font-semibold text-link">Your computer</span>}
      </h3>
      <p className="mt-4 text-sm font-semibold">{requiresLabel}</p>
      <ul className="mt-1 space-y-0.5 text-sm text-muted md:min-h-[4rem]">
        {requires.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <div className="mt-auto pt-6">{children}</div>
    </div>
  );
}

function Notice({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      role="status"
      className="mt-10 max-w-3xl rounded-panel border-[1.5px] border-ink bg-sheet p-6 text-[0.9375rem] leading-relaxed"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="wide text-lg font-bold">{title}</h3>
        <button
          aria-label="Dismiss"
          className="-mr-2 -mt-2 inline-flex h-11 w-11 items-center justify-center rounded-control text-muted transition-colors hover:text-ink"
          onClick={onClose}
          type="button"
        >
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
      <div className="mt-2 space-y-3 text-muted [&_b]:font-medium [&_b]:text-ink">
        {children}
      </div>
    </div>
  );
}

export default function Download() {
  const [showMacNotice, setShowMacNotice] = useState(false);
  const [showWindowsNotice, setShowWindowsNotice] = useState(false);
  const { theme } = useTheme();
  const [systemDark, setSystemDark] = useState(true);
  // outline the download for the computer the visitor is on (desktop only)
  const [os, setOs] = useState<"win" | "mac" | null>(null);
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Android|iPhone|iPad|Mobile/i.test(ua)) return;
    if (/Windows/i.test(ua)) setOs("win");
    else if (/Macintosh|Mac OS X/i.test(ua)) setOs("mac");
  }, []);
  useEffect(() => {
    setSystemDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);
  // Light Apple logo on dark grounds (dark is the default theme).
  const macSrc =
    theme === "light" ? macLogo : theme === "dark" || systemDark ? macLogoLight : macLogo;

  return (
    // Same ground as the rest of the page, so the theme never switches mid-scroll.
    // printed on the second spot ink (mint), the one band besides the blue one
    <section className="border-t-[1.5px] border-ink bg-tile-mint py-16 lg:py-24" id="download">
      <div className="container">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="display-lg">Download ScreenExtend</h2>
            <p className="lede mt-3">
              Free, for Windows and for Mac (in beta). Linux isn't ready yet.
            </p>
          </div>
          <p className="text-muted lg:col-span-5 lg:text-right">
            <span className="font-bold text-ink">2.5k+</span> downloads so far, and not one of them
            came with packaging.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Platform
            logo={<img alt="" width={24} height={24} className="h-6 w-6" src={windowsLogo} />}
            name="Windows"
            yours={os === "win"}
            requires={[
              "Windows Client 20H1 (May 2020)",
              "Windows Server 20H2 (October 2020)",
              "No ARM build yet",
            ]}
          >
            <a
              className="btn-solid min-h-12 w-full"
              href={WINDOWS_EXE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowWindowsNotice(true)}
            >
              Download .exe (64-bit)
            </a>
          </Platform>

          <Platform
            logo={<img alt="" width={24} height={24} className="h-6 w-6" src={macSrc} />}
            name="macOS"
            yours={os === "mac"}
            requires={["macOS Catalina 10.15 (October 2019)"]}
          >
            <a
              className="btn-solid min-h-12 w-full"
              href={MAC_DMG}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowMacNotice(true)}
            >
              Download .dmg (Universal)
            </a>
          </Platform>

          <Platform
            logo={<img alt="" width={24} height={24} className="h-6 w-6" src={linuxLogo} />}
            name="Linux"
            requiresLabel="Will require"
            requires={["Ubuntu 20.04 (April 2020)"]}
          >
            <p className="flex min-h-12 items-center text-sm text-muted">
              Coming soon as .deb, .rpm and AppImage.
            </p>
          </Platform>
        </div>

        {showWindowsNotice && (
          <Notice title="Your download is starting" onClose={() => setShowWindowsNotice(false)}>
            <p>
              The installer isn't code-signed yet, so when you run it Windows
              SmartScreen may show a blue <b>"Windows protected your PC"</b>{" "}
              box. To run it anyway:
            </p>
            <ol className="list-inside list-decimal space-y-1">
              <li>
                Click <b>More info</b> on that box.
              </li>
              <li>
                Click <b>Run anyway</b> at the bottom.
              </li>
            </ol>
            <p>
              If your browser holds the <b>.exe</b> download, choose{" "}
              <b>Keep</b>. In Edge or Chrome that option is under the <b>⋯</b>{" "}
              menu next to the download.
            </p>
            <p>
              This is how Windows treats any unsigned app. It doesn't mean the
              app is unsafe, and the warnings will stop once the builds are
              signed.
            </p>
          </Notice>
        )}

        {showMacNotice && (
          <Notice title="Your download is starting" onClose={() => setShowMacNotice(false)}>
            <p>
              The Mac build isn't notarized by Apple yet, so macOS warns that
              it's from an <b>"unidentified developer"</b>. That doesn't mean
              the app is unsafe. To open it:
            </p>
            <ol className="list-inside list-decimal space-y-1">
              <li>
                Open the downloaded <b>.dmg</b> and drag ScreenExtend into your{" "}
                <b>Applications</b> folder.
              </li>
              <li>
                In Applications, <b>Control-click</b> (or right-click)
                ScreenExtend and choose <b>Open</b>.
              </li>
              <li>
                Click <b>Open</b> in the second dialog. You only need to do
                this once.
              </li>
            </ol>
            <p>
              If it's still blocked, open{" "}
              <b>System Settings → Privacy &amp; Security</b>, scroll to the
              note that ScreenExtend was blocked, and click <b>Open Anyway</b>.
            </p>
            <p>
              If macOS says the app is <b>"damaged"</b>, open <b>Terminal</b>,
              run{" "}
              <code className="whitespace-nowrap rounded-cell bg-paper px-1.5 py-0.5 font-mono text-sm text-ink">
                xattr -cr /Applications/ScreenExtend.app
              </code>{" "}
              and try again.
            </p>
          </Notice>
        )}

        <div className="mt-10 space-y-2 text-[0.9375rem] text-muted">
          <p>
            Using another operating system? Email{" "}
            <a href="mailto:support@screenextend.app" className="u-link">
              support@screenextend.app
            </a>{" "}
            with your device details and ask for a custom build.
          </p>
          <p>
            <span className="font-mono text-sm">.msi</span> (Windows) and{" "}
            <span className="font-mono text-sm">.pkg</span> (Mac) packages for
            bulk enterprise installs are on the{" "}
            <a href={RELEASES} target="_blank" rel="noopener noreferrer" className="u-link">
              GitHub releases page
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
