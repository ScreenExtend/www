import { Link } from "react-router-dom";
import { useTheme } from "react-daisyui";

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
      <div
        className={`mt-20 border-t ${borderColor} px-8 py-6 text-center text-sm lg:px-40 ${textColor}`}
      >
        <nav className="mb-5 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="link link-hover">
              {link.label}
            </Link>
          ))}
        </nav>
        © 2026 Sarvesh Madullapalli. All rights reserved.
      </div>
    </footer>
  );
}
