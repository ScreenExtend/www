import { useEffect, useRef } from "react";

import { Airplay, Moon, Sun } from "lucide-react";

import { useTheme } from "react-daisyui";

export default function ThemeToggler() {
  const { setTheme } = useTheme();
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => setTheme("system"), []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        ref.current.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current) ref.current.open = false;
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const pick = (t: string) => {
    setTheme(t);
    if (ref.current) ref.current.open = false;
  };

  const ITEM =
    "flex w-full items-center gap-3 rounded-btn px-3 py-2 text-sm transition-colors hover:bg-base-200";

  return (
    <div className="fixed bottom-5 end-5 z-10">
      <details ref={ref} className="dropdown dropdown-end dropdown-top">
        <summary className="btn list-none border-base-content/10 bg-base-100/70 shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-primary/20 [&::-webkit-details-marker]:hidden">
          Theme
          <svg
            aria-hidden="true"
            className="inline-block h-2 w-2 rotate-180 fill-current opacity-60"
            height="12px"
            viewBox="0 0 2048 2048"
            width="12px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </summary>
        <ul className="dropdown-content menu mt-2 w-52 rounded-box border border-base-content/10 bg-base-100 p-2 shadow-lg">
          <li>
            <button type="button" className={ITEM} onClick={() => pick("system")}>
              <Airplay className="h-5 w-5" aria-hidden="true" />
              System
            </button>
          </li>
          <li>
            <button type="button" className={ITEM} onClick={() => pick("light")}>
              <Sun className="h-5 w-5" aria-hidden="true" />
              Light
            </button>
          </li>
          <li>
            <button type="button" className={ITEM} onClick={() => pick("dark")}>
              <Moon className="h-5 w-5" aria-hidden="true" />
              Dark
            </button>
          </li>
        </ul>
      </details>
    </div>
  );
}
