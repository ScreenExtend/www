import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Check, ChevronDown, Info } from "lucide-react";

import { qrPath } from "@/components/home/app-demo/shared.ts";

// A control with no action on the website: clicking it says so beside it until focus leaves.
export function DemoBtn({
  wrap = "",
  children,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { wrap?: string }) {
  const [shown, setShown] = useState(false);
  return (
    <span className={`sed-demo ${wrap}`} onMouseLeave={() => setShown(false)}>
      <button type="button" {...p} onClick={() => setShown(true)} onBlur={() => setShown(false)}>
        {children}
      </button>
      <span role="status" className={shown ? "sed-note" : "sr-only"}>
        {shown ? "Demo only" : ""}
      </span>
    </span>
  );
}

export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="sed-switch"
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}

export function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-sm font-medium leading-none">
      <input
        type="checkbox"
        className="sed-check"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {children}
    </label>
  );
}

export function Range({
  value,
  min,
  max,
  step,
  label,
  disabled,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
  disabled?: boolean;
  onChange: (v: number) => void;
}) {
  const p = max > min ? (value - min) / (max - min) : 0;
  return (
    <input
      type="range"
      className="sed-range"
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ "--p": Math.min(1, Math.max(0, p)) } as CSSProperties}
    />
  );
}

export function Select({
  value,
  options,
  label,
  disabled,
  className = "",
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  label: string;
  disabled?: boolean;
  className?: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    list.current?.focus();
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  const show = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };
  const pick = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
    trigger.current?.focus();
  };
  const onListKey = (e: KeyboardEvent) => {
    const last = options.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(last, active + 1),
      ArrowUp: Math.max(0, active - 1),
      Home: 0,
      End: last,
    };
    if (e.key in moves) {
      e.preventDefault();
      setActive(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        ref={trigger}
        type="button"
        className="sed-select"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${options.find((o) => o.value === value)?.label ?? ""}`}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            show();
          }
        }}
      >
        <span className="truncate">{options.find((o) => o.value === value)?.label}</span>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
      </button>
      {open && (
        <ul
          ref={list}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${id}-${active}`}
          className="sed-pop"
          onKeyDown={onListKey}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-${i}`}
              role="option"
              aria-selected={o.value === value}
              className={`sed-opt${i === active ? " is-active" : ""}`}
              onPointerMove={() => setActive(i)}
              onClick={() => pick(i)}
            >
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {o.value === value && <Check className="h-4 w-4" aria-hidden="true" />}
              </span>
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// The app's `hoverLabel` input: the placeholder floats up into the border once there is a value.
export function FloatInput({
  label,
  children,
  ...p
}: InputHTMLAttributes<HTMLInputElement> & { label: string; children?: ReactNode }) {
  const id = useId();
  return (
    <div className="sed-float">
      <input id={id} placeholder=" " className="sed-input" {...p} />
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

// TipLabel in the app: a label followed by an info icon with a tooltip.
export function Tip({ text, children }: { text: string; children?: ReactNode }) {
  return (
    <span className="inline-flex w-fit cursor-help items-center gap-1" title={text}>
      {children}
      <Info className="sed-muted h-3.5 w-3.5 shrink-0" aria-label={text} />
    </span>
  );
}

export function Card({
  title,
  desc,
  aside,
  children,
}: {
  title: ReactNode;
  desc?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="sed-card mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6">
        <div>
          <h4 className="flex items-center text-xl font-semibold leading-none tracking-tight sm:text-2xl">
            {title}
          </h4>
          {desc && <p className="sed-muted mt-2 text-sm">{desc}</p>}
        </div>
        {aside}
      </div>
      {children && <div className="px-4 pb-4 sm:px-6 sm:pb-6">{children}</div>}
    </section>
  );
}

export function QrArt({ seed, label }: { seed: number; label: string }) {
  const d = useMemo(() => qrPath(seed), [seed]);
  return (
    <svg
      viewBox="-1 -1 31 31"
      className="block h-auto w-full rounded-[0.275rem]"
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
    >
      <rect x="-1" y="-1" width="31" height="31" fill="#fff" />
      <path d={d} fill="#000" />
    </svg>
  );
}
