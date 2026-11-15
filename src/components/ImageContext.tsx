import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { SHOTS, SHOT_ALTS } from "@/lib/screenshots.ts";

interface ImageContextType {
  currentImage: number;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

const CONTROL =
  "inline-flex h-11 w-11 items-center justify-center rounded-control bg-black/60 text-white transition-colors duration-150 hover:bg-black/80";

// Screenshot lightbox on a native <dialog>: focus moves into it, Escape closes it,
// the page behind is inert, and focus returns to whatever opened it.
function Lightbox({
  index,
  setIndex,
}: {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  const open = index > -1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const close = () => setIndex(-1);
  const step = (d: number) =>
    setIndex((i) => (i + d + SHOTS.length) % SHOTS.length);

  return (
    <dialog
      ref={ref}
      aria-label="Screenshot"
      onClose={() => {
        setIndex(-1);
        (opener.current as HTMLElement | null)?.focus?.();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="m-0 h-full max-h-none w-full max-w-none bg-[#0b0d0f] p-4 backdrop:bg-black sm:p-10"
    >
      {open && (
        <div
          className="flex h-full flex-col items-center justify-center gap-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex w-full max-w-6xl justify-end">
            <button type="button" className={CONTROL} onClick={close} aria-label="Close" autoFocus>
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <img
            src={SHOTS[index].webp}
            alt={SHOT_ALTS[index]}
            width={1369}
            height={817}
            className="max-h-[80vh] w-auto max-w-full rounded-shot object-contain"
          />
          <div className="flex items-center gap-3 text-sm text-white">
            <button type="button" className={CONTROL} onClick={() => step(-1)} aria-label="Previous screenshot">
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <span className="tabular" aria-live="polite">
              {index + 1} of {SHOTS.length}
            </span>
            <button type="button" className={CONTROL} onClick={() => step(1)} aria-label="Next screenshot">
              <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentImage, setCurrentImage] = useState<number>(-1);

  return (
    <ImageContext.Provider value={{ currentImage, setCurrentImage }}>
      {children}
      <Lightbox index={currentImage} setIndex={setCurrentImage} />
    </ImageContext.Provider>
  );
};

export const useImage = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};
