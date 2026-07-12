import type { CSSProperties, ReactNode } from "react";

import { useInView } from "@/hooks/useInView.ts";

type Direction = "up" | "left" | "right" | "scale" | "none";

const DIRECTION_CLASS: Record<Direction, string> = {
  up: "",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  none: "",
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  repeat?: boolean;
  onClick?: () => void;
}

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  style,
  repeat = false,
  onClick,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: !repeat });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`reveal ${DIRECTION_CLASS[direction]} ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
