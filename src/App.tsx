import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { applyHomeMeta } from "@/lib/seo.ts";
import Navbar from "@/components/Navbar.tsx";
import Download from "@/components/Download.tsx";
import Footer from "@/components/Footer.tsx";
import ScrollToHash from "@/components/ScrollToHash.tsx";
import { ImageProvider } from "@/components/ImageContext.tsx";
import { LEGAL_PATHS } from "@/legal/known.ts";

const LegalPage = lazy(() => import("@/components/LegalPage.tsx"));

import HeroLanding from "@/components/home/HeroLanding.tsx";
import UseCases from "@/components/home/UseCases.tsx";
import Compare from "@/components/home/Compare.tsx";
import ConnectFlow from "@/components/home/ConnectFlow.tsx";
import FaqSimple from "@/components/home/FaqSimple.tsx";
import GpuSupport from "@/components/home/GpuSupport.tsx";

import { Theme, useTheme } from "react-daisyui";
import { THEME_KEY, applyThemeAttr } from "@/lib/theme.ts";

// Restores a visitor's saved theme after hydration; by default the page follows the OS.
function ThemeInit() {
  const { setTheme } = useTheme();
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch {
      saved = null;
    }
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      applyThemeAttr(saved);
    }
  }, [setTheme]);
  return null;
}

function Home() {
  useEffect(() => {
    applyHomeMeta();
  }, []);

  return (
    <>
      <HeroLanding />
      <ConnectFlow />
      <UseCases />
      <Compare />
      <GpuSupport />
      <Download />
      <FaqSimple />
    </>
  );
}

export default function App() {
  return (
    <ImageProvider>
      <Theme dataTheme="system" className="min-h-screen bg-paper text-ink">
        <ThemeInit />
        <a
          href="#main"
          className="sr-only z-50 rounded-control bg-paper px-3 py-2 focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:inline-flex focus:min-h-11 focus:items-center"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
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
        <ScrollToHash />
      </Theme>
    </ImageProvider>
  );
}
