import { Link } from "react-router-dom";

import logo from "@/assets/logo/screenextend.svg";

const LEGAL_LINKS: { label: string; to: string }[] = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms of service", to: "/terms" },
  { label: "Acceptable use", to: "/acceptable-use" },
  { label: "Cookies", to: "/cookies" },
];

const LINK = "inline-flex min-h-11 items-center text-muted transition-colors duration-150 hover:text-ink";

// The back panel of the leaflet.
export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-[#13245c] text-white [--se-ink:#ffffff] [--se-muted:#c9d6f7] [--se-link:#ffffff]">
      <div className="container grid gap-8 py-10 text-sm lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <Link to="/" className="wide inline-flex min-h-11 items-center gap-2.5 text-xl font-extrabold">
            <img src={logo} width={26} height={23} className="h-[23px] w-[26px]" alt="" />
            ScreenExtend
          </Link>
          <p className="mt-2 max-w-sm text-[0.9375rem] text-muted">
            Free and open source, for the screens you already own.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 lg:col-span-7 lg:justify-end">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={LINK}>
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/ScreenExtend/ScreenExtend"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            GitHub
          </a>
        </nav>
        <div className="flex items-center justify-between gap-4 border-t border-line pt-6 lg:col-span-12">
          <p className="text-muted">© 2026 Sarvesh Madullapalli. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
