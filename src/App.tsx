import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { applyHomeMeta } from "@/lib/seo.ts";
import Navbar from "@/components/Navbar.tsx";
import Download from "@/components/Download.tsx";
import Contact from "@/components/Contact.tsx";
import Footer from "@/components/Footer.tsx";
import ThemeToggler from "@/components/ThemeToggler.tsx";
import ScrollToTop from "@/components/ScrollToTop.tsx";
import ScrollToHash from "@/components/ScrollToHash.tsx";
import AuroraBackground from "@/components/AuroraBackground.tsx";
import { ImageProvider } from "@/components/ImageContext.tsx";
import { LEGAL_PATHS } from "@/legal/known.ts";

const LegalPage = lazy(() => import("@/components/LegalPage.tsx"));

import HeroLanding from "@/components/home/HeroLanding.tsx";
import ConnectFlow from "@/components/home/ConnectFlow.tsx";
import FeatureScroll from "@/components/home/FeatureScroll.tsx";
import Highlights from "@/components/home/Highlights.tsx";
import FaqSimple from "@/components/home/FaqSimple.tsx";

import { Theme } from "react-daisyui";

function Home() {
  useEffect(() => {
    applyHomeMeta();
  }, []);

  return (
    <>
      <HeroLanding />
      <ConnectFlow />
      <FeatureScroll />
      <Highlights />
      <Download />
      <FaqSimple />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <ImageProvider>
      <Theme dataTheme="system" className="relative min-h-screen overflow-x-clip">
        <AuroraBackground />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                {LEGAL_PATHS.map((path) => (
                  <Route
                    key={path}
                    path={path}
                    element={<LegalPage path={path} />}
                  />
                ))}
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <ScrollToHash />
        <ScrollToTop />
        <ThemeToggler />
      </Theme>
    </ImageProvider>
  );
}
