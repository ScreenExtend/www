import { Link } from "react-router-dom";

import Reveal from "@/components/Reveal.tsx";
import logo from "@/assets/logo/screenextend.svg";

const LEGAL_LINKS: { label: string; to: string }[] = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Acceptable Use", to: "/acceptable-use" },
  { label: "Cookies", to: "/cookies" },
];

const LINK_CLASS =
  "link link-hover transition-colors duration-200 hover:text-primary";

export default function Footer() {
  return (
    <footer>
      <Reveal className="mt-10 border-t border-base-content/20 px-8 py-6 text-center text-sm text-base-content lg:px-40">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 font-mono text-base font-bold tracking-tight transition-colors duration-200 hover:text-primary"
        >
          <img src={logo} className="h-6 w-6" alt="" />
          ScreenExtend
        </Link>
        <nav className="mb-5 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={LINK_CLASS}>
              {link.label}
            </Link>
          ))}
          <a href="/#contact" className={LINK_CLASS}>
            Contact
          </a>
        </nav>
        © 2026 Sarvesh Madullapalli. All rights reserved.
      </Reveal>
    </footer>
  );
}
