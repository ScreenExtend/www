import React, {
  createContext,
  useState,
  useContext,
  Suspense,
  lazy,
} from "react";

import { SHOTS } from "@/lib/screenshots.ts";

const ImageViewer = lazy(() => import("react-simple-image-viewer"));

const LIGHTBOX_SRCS = SHOTS.map((s) => s.webp);

interface ImageContextType {
  currentImage: number;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentImage, setCurrentImage] = useState<number>(-1);

  return (
    <ImageContext.Provider value={{ currentImage, setCurrentImage }}>
      {children}
      <div style={{ zIndex: 99999 }}>
        {currentImage > -1 && (
          <Suspense fallback={null}>
            <ImageViewer
              src={LIGHTBOX_SRCS}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={() => setCurrentImage(-1)}
              backgroundStyle={{ zIndex: 9999 }}
            />
          </Suspense>
        )}
      </div>
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
