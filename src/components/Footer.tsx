import { Link } from "react-router-dom";

import logo from "@/assets/logo/screenextend.svg";

const LEGAL_LINKS: { label: string; to: string }[] = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Acceptable use", to: "/acceptable-use" },
  { label: "Cookies", to: "/cookies" },
];

const LINK = "inline-flex min-h-11 items-center text-muted transition-colors duration-150 hover:text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container flex flex-col gap-4 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-base font-semibold tracking-tight"
        >
          <img src={logo} width={22} height={20} className="h-5 w-[22px]" alt="" />
          ScreenExtend
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={LINK}>
              {link.label}
            </Link>
          ))}
          <a href="/#contact" className={LINK}>
            Contact
          </a>
          <a
            href="https://github.com/ScreenExtend/ScreenExtend"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            GitHub
          </a>
        </nav>
        <p className="text-muted">© 2026 Sarvesh Madullapalli. All rights reserved.</p>
      </div>
    </footer>
  );
}
