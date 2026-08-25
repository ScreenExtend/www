import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, Menu, Navbar as ReactNavbar } from "react-daisyui";
import { Menu as MenuIcon, Github, X } from "lucide-react";

import logo from "@/assets/logo/screenextend.svg";

const NAV_LINK =
  "relative transition-colors duration-200 hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "how", label: "How it Works" },
  { id: "features", label: "Features" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const closeDrawer = () => setDrawerOpened(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) {
          const ratio = height > 0 ? scrolled / height : 0;
          progressRef.current.style.transform = `scaleX(${ratio})`;
        }
        setAtTop(scrolled < 30);

        let current: string | null = null;
        for (const { id } of NAV_ITEMS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 80) current = id;
        }
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

  const linkClass = (id: string) =>
    `${NAV_LINK} ${activeId === id ? "text-primary after:scale-x-100" : ""}`;

  useEffect(() => setDrawerOpened(false), [pathname]);
  useEffect(() => {
    if (!drawerOpened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpened(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpened]);

  return (
    <>
    <div
      id="navbar-wrapper"
      className={`sticky top-0 z-20 border-b bg-base-100/80 backdrop-blur-md transition-colors duration-300 lg:bg-base-100/70 ${atTop ? "border-transparent" : "border-base-content/10"}`}
    >
      <div
        ref={progressRef}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
      <div className="container">
        <ReactNavbar className="px-0">
          <ReactNavbar.Start className="gap-2">
            <div className="flex-none lg:hidden">
              <Button
                shape="square"
                color="ghost"
                aria-label="Open menu"
                aria-expanded={drawerOpened}
                aria-controls="mobile-nav"
                onClick={() => setDrawerOpened(true)}
              >
                <MenuIcon className="inline-block text-xl" aria-hidden="true" />
              </Button>
            </div>
            <a
              href="/"
              className="flex items-center gap-2 font-mono text-xl font-bold tracking-tight transition-transform duration-200 hover:scale-105"
            >
              <img src={logo} className="h-7 w-7" alt="ScreenExtend logo" />
              ScreenExtend
            </a>
          </ReactNavbar.Start>
          <ReactNavbar.Center className="hidden lg:flex">
            <Menu horizontal size="sm" className="gap-2 px-1">
              {NAV_ITEMS.map(({ id, label }) => (
                <Menu.Item key={id} className="font-medium">
                  <a
                    href={`/#${id}`}
                    className={linkClass(id)}
                    aria-current={activeId === id ? "true" : undefined}
                  >
                    {label}
                  </a>
                </Menu.Item>
              ))}
            </Menu>
          </ReactNavbar.Center>
          <ReactNavbar.End className="gap-3">
            <Button
              size="sm"
              color="ghost"
              className="hidden sm:inline-flex"
              onClick={() =>
                window.open("https://github.com/ScreenExtend/ScreenExtend", "_blank")
              }
            >
              <Github size={22} />
              Github
            </Button>
            <Button
              size="sm"
              color="primary"
              className="shadow-sm transition-colors duration-200 hover:!bg-[#5b8bff]"
              onClick={() => (window.location.href = "/#download")}
            >
              Download
            </Button>
          </ReactNavbar.End>
        </ReactNavbar>
      </div>
    </div>

      {drawerOpened && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden="true"
            onClick={closeDrawer}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 left-0 flex w-80 max-w-[82%] flex-col gap-2 bg-base-100 p-4 text-base-content shadow-xl"
          >
            <div className="mb-1 flex items-center justify-between">
              <a
                href="/"
                className="flex items-center gap-2 font-mono text-xl font-bold"
                onClick={closeDrawer}
              >
                <img src={logo} className="h-6 w-6" alt="" />
                ScreenExtend
              </a>
              <Button
                shape="square"
                color="ghost"
                size="sm"
                aria-label="Close menu"
                onClick={closeDrawer}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`/#${id}`}
                className={`rounded-btn px-3 py-2 font-medium transition-colors hover:bg-base-200 ${activeId === id ? "text-primary" : ""}`}
                aria-current={activeId === id ? "true" : undefined}
                onClick={closeDrawer}
              >
                {label}
              </a>
            ))}
            <div className="my-1 border-t border-base-content/10" />
            <a
              href="https://github.com/ScreenExtend/ScreenExtend"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-btn px-3 py-2 font-medium transition-colors hover:bg-base-200"
              onClick={closeDrawer}
            >
              <Github size={18} aria-hidden="true" />
              Github
            </a>
          </div>
        </div>
      )}
    </>
  );
}
