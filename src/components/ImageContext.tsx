import React, { createContext, useState, useContext } from "react";

import ImageViewer from "react-simple-image-viewer";

import feature1Image from "@/assets/app/feature-1.png";
import feature2Image from "@/assets/app/feature-2.png";
import feature3Image from "@/assets/app/feature-3.png";

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
          <ImageViewer
            src={[feature1Image, feature2Image, feature3Image]}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={() => setCurrentImage(-1)}
            backgroundStyle={{ zIndex: 9999 }}
          />
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