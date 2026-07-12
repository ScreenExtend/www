import { Route, Routes } from "react-router-dom";

import Navbar from "@/components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Features from "@/components/Features.tsx";
import Download from "@/components/Download.tsx";
import FAQ from "@/components/FAQ.tsx";
import Contact from "@/components/Contact.tsx";
import Footer from "@/components/Footer.tsx";
import LegalPage from "@/components/LegalPage.tsx";
import ThemeToggler from "@/components/ThemeToggler.tsx";
import ScrollToTop from "@/components/ScrollToTop.tsx";
import ScrollToHash from "@/components/ScrollToHash.tsx";
import AuroraBackground from "@/components/AuroraBackground.tsx";
import { ImageProvider } from "@/components/ImageContext.tsx";
import { LEGAL_PAGES } from "@/legal/content.ts";

import { Theme, useTheme } from "react-daisyui";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Download />
      <FAQ />
      <Contact />
    </>
  );
}

export default function App() {
  const { theme } = useTheme();

  return (
    <ImageProvider>
      <Theme dataTheme={theme} className="relative min-h-screen overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {LEGAL_PAGES.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={<LegalPage page={page} />}
              />
            ))}
          </Routes>
          <Footer />
        </div>
        <ScrollToHash />
        <ScrollToTop />
        <ThemeToggler />
      </Theme>
    </ImageProvider>
  );
}
