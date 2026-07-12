import { Link } from "react-router-dom";
import { useTheme } from "react-daisyui";

import Reveal from "@/components/Reveal.tsx";
import logo from "@/assets/logo/screenextend.svg";

const LEGAL_LINKS: { label: string; to: string }[] = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Acceptable Use", to: "/acceptable-use" },
  { label: "Cookies", to: "/cookies" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const { theme } = useTheme();

  const textColor =
    theme == "light"
      ? "text-black"
      : theme == "text-dark"
        ? "text-white"
        : "text-black dark:text-white";
  const borderColor =
    theme == "light"
      ? "border-black/20"
      : theme == "text-dark"
        ? "border-white/20"
        : "border-black/20 dark:border-white/20";

  return (
    <footer>
      <Reveal
        className={`mt-10 border-t ${borderColor} px-8 py-6 text-center text-sm lg:px-40 ${textColor}`}
      >
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-base font-bold tracking-tighter transition-colors duration-200 hover:text-primary"
        >
          <img src={logo} className="h-6 w-6" alt="" />
          ScreenExtend
        </Link>
        <nav className="mb-5 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="link link-hover transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        © 2026 Sarvesh Madullapalli. All rights reserved.
      </Reveal>
    </footer>
  );
}
