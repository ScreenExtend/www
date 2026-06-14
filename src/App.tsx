import { Route, Routes } from "react-router-dom";

import Navbar from "@/components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Features from "@/components/Features.tsx";
import Download from "@/components/Download.tsx";
import FAQ from "@/components/FAQ.tsx";
import Footer from "@/components/Footer.tsx";
import LegalPage from "@/components/LegalPage.tsx";
import ThemeToggler from "@/components/ThemeToggler.tsx";
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
    </>
  );
}

export default function App() {
  const { theme } = useTheme();

  return (
    <ImageProvider>
      <Theme dataTheme={theme}>
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
        <ThemeToggler />
      </Theme>
    </ImageProvider>
  );
}
