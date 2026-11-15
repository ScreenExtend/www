import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { useTheme } from "react-daisyui";
import { Menu as MenuIcon, Github, Moon, Sun, SunMoon, X } from "lucide-react";

import logo from "@/assets/logo/screenextend.svg";

const NAV_ITEMS = [
  { id: "how", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const THEMES = [
  { id: "system", label: "System", Icon: SunMoon },
  { id: "light", label: "Light", Icon: Sun },
  { id: "dark", label: "Dark", Icon: Moon },
] as const;

function ThemeSwitch({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const index = Math.max(
    0,
    THEMES.findIndex((t) => t.id === theme),
  );
  const current = THEMES[index];
  const next = THEMES[(index + 1) % THEMES.length];

  const apply = (id: string) => {
    setTheme(id);
    // keep the page background (overscroll area) in step with the theme
    if (id === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", id);
  };

  return (
    <button
      type="button"
      onClick={() => apply(next.id)}
      aria-label={`Theme: ${current.label}. Switch to ${next.label}.`}
      title={`Theme: ${current.label}`}
      className={`h-11 w-11 items-center justify-center rounded-control text-muted transition-colors duration-150 hover:text-ink ${className || "inline-flex"}`}
    >
      <current.Icon size={18} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}

export default function Navbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { pathname } = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const closeDrawer = () => setDrawerOpened(false);

  // Move focus into the drawer when it opens and back to the menu button when it closes.
  useEffect(() => {
    if (drawerOpened) {
      drawer.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else if (wasOpen.current) {
      menuButton.current?.focus();
    }
    wasOpen.current = drawerOpened;
  }, [drawerOpened]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null);
      return;
    }
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current: string | null = null;
        for (const { id } of NAV_ITEMS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 96) current = id;
        }
        // the last section can be too short to reach the top; use it once the page bottoms out
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom && current) current = NAV_ITEMS[NAV_ITEMS.length - 1].id;
        setActiveId(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => setDrawerOpened(false), [pathname]);
  useEffect(() => {
    if (!drawerOpened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpened(false);
      if (e.key !== "Tab" || !drawer.current) return;
      // keep Tab inside the open drawer
      const items = drawer.current.querySelectorAll<HTMLElement>("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpened]);

  const linkClass = (id: string) =>
    `inline-flex min-h-11 items-center px-3 text-[0.9375rem] transition-colors duration-150 hover:text-ink ${
      activeId === id ? "text-ink underline decoration-2 underline-offset-[6px]" : "text-muted"
    }`;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="container flex h-16 items-center gap-2">
          <button
            ref={menuButton}
            type="button"
            className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-control lg:hidden"
            aria-label="Open menu"
            aria-expanded={drawerOpened}
            aria-controls="mobile-nav"
            onClick={() => setDrawerOpened(true)}
          >
            <MenuIcon size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <a
            href="/"
            className="flex min-h-11 shrink-0 items-center gap-2 font-mono text-[0.9375rem] font-semibold tracking-tight sm:text-lg"
          >
            <img src={logo} width={26} height={23} className="h-[23px] w-[26px]" alt="" />
            ScreenExtend
          </a>

          <nav aria-label="Main" className="ml-8 hidden lg:block">
            <ul className="flex items-center">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    className={linkClass(id)}
                    aria-current={activeId === id ? "true" : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <a
              href="https://github.com/ScreenExtend/ScreenExtend"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center gap-2 px-3 text-[0.9375rem] text-muted transition-colors duration-150 hover:text-ink sm:inline-flex"
            >
              <Github size={18} strokeWidth={1.75} aria-hidden="true" />
              GitHub
            </a>
            <ThemeSwitch className="hidden sm:inline-flex" />
            <a href="/#download" className="btn-solid shrink-0 px-3 text-[0.9375rem] sm:px-4">
              Download
            </a>
          </div>
        </div>
      </header>

      {drawerOpened && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden="true"
            onClick={closeDrawer}
          />
          <div
            id="mobile-nav"
            ref={drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col bg-paper p-4 text-ink"
          >
            <div className="mb-2 flex items-center justify-between">
              <a
                href="/"
                className="flex items-center gap-2 font-mono text-lg font-semibold"
                onClick={closeDrawer}
              >
                <img src={logo} width={24} height={21} className="h-[21px] w-6" alt="" />
                ScreenExtend
              </a>
              <ThemeSwitch className="ml-auto inline-flex" />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-control"
                aria-label="Close menu"
                onClick={closeDrawer}
              >
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile">
              {NAV_ITEMS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`/#${id}`}
                  className={`flex min-h-12 items-center border-b border-line px-1 text-lg ${activeId === id ? "font-medium" : ""}`}
                  aria-current={activeId === id ? "true" : undefined}
                  onClick={closeDrawer}
                >
                  {label}
                </a>
              ))}
              <a
                href="https://github.com/ScreenExtend/ScreenExtend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-2 px-1 text-lg"
                onClick={closeDrawer}
              >
                <Github size={18} strokeWidth={1.75} aria-hidden="true" />
                GitHub
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
