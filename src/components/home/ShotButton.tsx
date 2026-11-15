import { useImage } from "@/components/ImageContext.tsx";
import Screenshot from "@/components/Screenshot.tsx";

interface ShotButtonProps {
  index: number;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

// A real app screenshot that opens the lightbox when clicked.
export default function ShotButton({ index, alt, priority, sizes }: ShotButtonProps) {
  const { setCurrentImage } = useImage();
  return (
    <button
      type="button"
      onClick={() => setCurrentImage(index)}
      className="block w-full cursor-zoom-in overflow-hidden rounded-shot border border-line bg-[#0d1319] shadow-shot"
      title="Enlarge"
    >
      <span className="sr-only">Enlarge screenshot: </span>
      <Screenshot
        index={index}
        alt={alt}
        priority={priority}
        sizes={sizes}
        className="block aspect-[1369/817] h-auto w-full"
      />
    </button>
  );
}
