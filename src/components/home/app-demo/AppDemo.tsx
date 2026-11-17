import { useEffect, useRef, useState } from "react";
import { Moon, MonitorSmartphone, PanelLeftClose, PanelLeftOpen, Settings as Gear, UserRoundPlus } from "lucide-react";

import "@/components/home/app-demo/app-demo.css";
import AddDevice from "@/components/home/app-demo/AddDevice.tsx";
import EditDevice from "@/components/home/app-demo/EditDevice.tsx";
import Settings from "@/components/home/app-demo/Settings.tsx";
import Avatar from "@/components/home/app-demo/Avatar.tsx";
import { DemoBtn } from "@/components/home/app-demo/ui.tsx";
import { OTP, SESSION_ID, bc } from "@/components/home/app-demo/shared.ts";

const PAGES = [
  { id: "add", label: "Add Device", Icon: UserRoundPlus, Page: AddDevice },
  { id: "edit", label: "Edit Device", Icon: MonitorSmartphone, Page: EditDevice },
  { id: "settings", label: "Settings", Icon: Gear, Page: Settings },
] as const;

type PageId = (typeof PAGES)[number]["id"];

/**
 * A clickable, non-functional copy of the ScreenExtend desktop window (dark theme).
 * All state is local; nothing connects, saves or leaves the page.
 */
export default function AppDemo({ className = "" }: { className?: string }) {
  const [page, setPage] = useState<PageId>("add");
  const [sidebar, setSidebar] = useState(true);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo(0, 0);
  }, [page]);

  return (
    <div role="region" aria-label="Interactive demo of the ScreenExtend app" className={`sed-root ${className}`}>
      <div className="sed-win">
        <div className={`sed-side${sidebar ? "" : " is-collapsed"}`}>
          <p className="sed-brand">ScreenExtend</p>
          <nav className="sed-nav" aria-label="App pages">
            {PAGES.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-current={page === id ? "page" : undefined}
                className={`${bc(page === id ? "secondary" : "ghost")} sed-navbtn`}
                onClick={() => setPage(id)}
              >
                <Icon aria-hidden="true" />
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="sed-main">
          <div className="sed-head">
            <button
              type="button"
              className="sed-plain"
              aria-label={sidebar ? "Hide sidebar" : "Show sidebar"}
              aria-expanded={sidebar}
              onClick={() => setSidebar(!sidebar)}
            >
              {sidebar ? <PanelLeftClose size={24} aria-hidden="true" /> : <PanelLeftOpen size={24} aria-hidden="true" />}
            </button>
            <DemoBtn className="sed-plain sed-avatar" wrap="down end" aria-label="Profile menu">
              <Avatar />
            </DemoBtn>
          </div>
          <div ref={scroller} className="sed-scroll">
            {PAGES.map(({ id, Page }) => (
              <div key={id} hidden={page !== id}>
                <Page />
              </div>
            ))}
          </div>
          <div className="sed-foot">
            <div className="mx-1 flex min-w-0 flex-col text-xs sm:mx-2 sm:text-sm">
              <p>Session ID: {SESSION_ID}</p>
              <p>Session OTP: {OTP}</p>
            </div>
            <div className="flex-1" />
            <DemoBtn className={bc("outline", "icon")} wrap="end" aria-label="Toggle theme">
              <Moon className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
            </DemoBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
