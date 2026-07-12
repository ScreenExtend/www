import { useEffect, useState } from "react";

import { Button, Drawer, Menu, Navbar as ReactNavbar } from "react-daisyui";
import { Menu as MenuIcon, Github } from "lucide-react";

import logo from "@/assets/logo/screenextend.svg";

const NAV_LINK =
  "relative transition-colors duration-200 hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full";

export default function Navbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [progress, setProgress] = useState(0);

  const closeDrawer = () => setDrawerOpened(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        setAtTop(scrolled < 30);
        setProgress(height > 0 ? (scrolled / height) * 100 : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      id="navbar-wrapper"
      className={`sticky top-0 z-20 border-b bg-base-100/80 backdrop-blur-md transition-colors duration-300 lg:bg-base-100/70 ${atTop ? "border-transparent" : "border-base-content/10"}`}
    >
      {/* Scroll progress indicator */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-primary via-info to-purple-500"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <div className="container">
        <ReactNavbar className="px-0">
          <ReactNavbar.Start className="gap-2">
            <div className="flex-none lg:hidden">
              <Drawer
                open={drawerOpened}
                onClickOverlay={() => setDrawerOpened(!drawerOpened)}
                side={
                  <Menu className="min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content">
                    <Menu.Item className="font-medium">
                      <a
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold"
                        onClick={closeDrawer}
                      >
                        <img src={logo} className="h-6 w-6" alt="" />
                        ScreenExtend
                      </a>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <a href="/#home" onClick={closeDrawer}>
                        Home
                      </a>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <a href="/#features" onClick={closeDrawer}>
                        Features
                      </a>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <a href="/#faq" onClick={closeDrawer}>
                        FAQ
                      </a>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <a href="/#contact" onClick={closeDrawer}>
                        Contact
                      </a>
                    </Menu.Item>
                    <div className="my-1 border-t border-base-content/10" />
                    <Menu.Item className="font-medium">
                      <a
                        href="https://github.com/ScreenExtend/ScreenExtend"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeDrawer}
                      >
                        <Github size={18} />
                        Github
                      </a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button
                  shape="square"
                  color="ghost"
                  onClick={() => setDrawerOpened(true)}
                >
                  <MenuIcon className="inline-block text-xl" />
                </Button>
              </Drawer>
            </div>
            <a
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tighter transition-transform duration-200 hover:scale-105"
            >
              <img src={logo} className="h-7 w-7" alt="ScreenExtend logo" />
              ScreenExtend
            </a>
          </ReactNavbar.Start>
          <ReactNavbar.Center className="hidden lg:flex">
            <Menu horizontal size="sm" className="gap-2 px-1">
              <Menu.Item className="font-medium">
                <a href="/#home" className={NAV_LINK}>
                  Home
                </a>
              </Menu.Item>
              <Menu.Item className="font-medium">
                <a href="/#features" className={NAV_LINK}>
                  Features
                </a>
              </Menu.Item>
              <Menu.Item className="font-medium">
                <a href="/#faq" className={NAV_LINK}>
                  FAQ
                </a>
              </Menu.Item>
              <Menu.Item className="font-medium">
                <a href="/#contact" className={NAV_LINK}>
                  Contact
                </a>
              </Menu.Item>
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
              className="sheen border-none bg-gradient-to-r from-[#1b77ff] to-[#4d9bff] text-primary-content shadow-md shadow-primary/30 transition-shadow duration-200 hover:shadow-lg hover:shadow-primary/40"
              onClick={() => (window.location.href = "/#download")}
            >
              Download
            </Button>
          </ReactNavbar.End>
        </ReactNavbar>
      </div>
    </div>
  );
}
