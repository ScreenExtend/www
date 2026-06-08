import { useEffect, useState } from "react";

import { Button, Drawer, Menu, Navbar as ReactNavbar } from "react-daisyui";
import { Menu as MenuIcon, Github } from "lucide-react";

export default function Navbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => setAtTop(window.scrollY < 30));
    setAtTop(window.scrollY < 30);
  }, []);

  return (
    <div
      id="navbar-wrapper"
      className={`sticky top-0 z-10 border-b bg-base-100 lg:bg-opacity-95 lg:backdrop-blur-sm ${atTop ? "border-transparent" : "border-base-content/10"}`}
    >
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
                      <a href="#" className="text-xl font-bold">
                        ScreenExtend
                      </a>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <a href="#home">Home</a>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <a href="#features">Features</a>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <a href="#faq">FAQ</a>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <a href="#contact">Contact</a>
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
            <a href="#" className="text-xl font-bold tracking-tighter">
              ScreenExtend
            </a>
          </ReactNavbar.Start>
          <ReactNavbar.Center className="hidden lg:flex">
            <Menu horizontal size="sm" className="gap-2 px-1">
              <Menu.Item className="font-medium">
                <a href="#home">Home</a>
              </Menu.Item>
              <Menu.Item className="font-medium">
                <a href="#features">Features</a>
              </Menu.Item>
              <Menu.Item className="font-medium">
                <a href="#faq">FAQ</a>
              </Menu.Item>
              <Menu.Item className="font-medium">
                <a href="#contact">Contact</a>
              </Menu.Item>
            </Menu>
          </ReactNavbar.Center>
          <ReactNavbar.End className="gap-3">
            <Button size="sm" color="ghost" onClick={() => window.open("https://github.com/ScreenExtend/ScreenExtend", "_blank")}>
              <Github size={22} />
              Github
            </Button>
            <Button size="sm" color="primary" onClick={() => window.location.href = "#download"}>
              Download
            </Button>
          </ReactNavbar.End>
        </ReactNavbar>
      </div>
    </div>
  );
}