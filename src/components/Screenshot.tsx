import type { CSSProperties } from "react";

import { SHOTS, SHOT_WIDTH, SHOT_HEIGHT } from "@/lib/screenshots.ts";

interface ScreenshotProps {
  index: number;
  alt: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  priority?: boolean;
  sizes?: string;
}

export default function Screenshot({
  index,
  alt,
  className,
  style,
  onClick,
  priority = false,
  sizes = "(min-width: 1024px) 42rem, 100vw",
}: ScreenshotProps) {
  const shot = SHOTS[index];
  return (
    <picture style={{ display: "contents" }}>
      <source
        type="image/webp"
        srcSet={`${shot.webpSmall} 760w, ${shot.webp} ${SHOT_WIDTH}w`}
        sizes={sizes}
      />
      <img
        src={shot.png}
        alt={alt}
        width={SHOT_WIDTH}
        height={SHOT_HEIGHT}
        onClick={onClick}
        className={className}
        style={style}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
      />
    </picture>
  );
}
