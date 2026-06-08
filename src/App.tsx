import Navbar from "@/components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Features from "@/components/Features.tsx";
import Download from "@/components/Download.tsx";
import FAQ from "@/components/FAQ.tsx";
import Footer from "@/components/Footer.tsx";
import ThemeToggler from "@/components/ThemeToggler.tsx";
import { ImageProvider } from "@/components/ImageContext.tsx";

import { Theme, useTheme } from "react-daisyui";

export default function App() {
  const { theme } = useTheme();

  return (
    <ImageProvider>
      <Theme dataTheme={theme}>
        <Navbar />
        <Hero />
        <Features />
        <Download />
        <FAQ />
        <Footer />
        <ThemeToggler />
      </Theme>
    </ImageProvider>
  );
}