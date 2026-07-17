import { useEffect, useRef, useState } from "react";

import { Button } from "react-daisyui";
import Card3d from "card3d";
import Observer from "@researchgate/react-intersection-observer";

import { useImage } from "@/components/ImageContext.tsx";
import Reveal from "@/components/Reveal.tsx";
import heroImage from "@/assets/app/feature-1.png";
import typescriptLogo from "@/assets/logo/typescript.svg";
import tauriLogo from "@/assets/logo/tauri.svg";
import reactLogo from "@/assets/logo/react.svg";
import rustLogo from "@/assets/logo/rust.svg";

const LOGO =
  "mx-auto flex cursor-pointer items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110";
// Deliberate per-logo glow on hover, in each brand's own color. unslop-ignore
const GLOW_RUST = "hover:drop-shadow-[0_0_15px_rgba(247,76,0,0.75)]"; // unslop-ignore
const GLOW_TAURI = "hover:drop-shadow-[0_0_15px_rgba(36,200,219,0.75)]"; // unslop-ignore
const GLOW_TS = "hover:drop-shadow-[0_0_15px_rgba(49,120,198,0.75)]"; // unslop-ignore
const GLOW_REACT = "hover:drop-shadow-[0_0_15px_rgba(97,218,251,0.75)]"; // unslop-ignore
const GLOW_SHADCN = "hover:drop-shadow-[0_0_15px_rgba(100,100,100,1)]"; // unslop-ignore
const LABEL = "ml-2.5 font-soft text-xl font-bold";

export default function Hero() {
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { setCurrentImage } = useImage();
  let card: Card3d;

  useEffect(() => {
    if (isVisible) {
      card?.start();
    } else {
      card?.stop();
    }
  }, [isVisible]);

  useEffect(() => {
    if (heroImageRef.current) {
      card = new Card3d(heroImageRef.current, {
        perspective: 1000,
        fullPageListening: false,
      });
    }
  }, [heroImageRef.current]);

  return (
    <section className="py-8 lg:py-20" id="home">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-10">
          <div className="col-span-4">
            <h1 className="animate-fade-up font-mono text-4xl font-bold tracking-tight text-primary lg:text-6xl lg:leading-none">
              ScreenExtend
            </h1>
            <h2 className="mt-2 animate-fade-up text-xl font-bold tracking-tighter lg:text-3xl lg:leading-none">
              Extend your screen.
            </h2>
            <h2 className="mt-1 animate-fade-up text-xl font-bold tracking-tighter lg:text-3xl lg:leading-none">
              Extend your possibilities.
            </h2>
            <h2 className="mt-1 animate-fade-up text-xl font-bold tracking-tighter lg:text-3xl lg:leading-none">
              Unlock ultimate productivity.
            </h2>
            <p className="mt-8 animate-fade-up text-lg">
              A free, cross-platform desktop-extension solution that transforms any device into a second monitor, instantly expanding your workspace.
            </p>
            <div className="mt-10 inline-flex animate-fade-up gap-3">
              <Button
                color="primary"
                className="shadow-sm transition-colors duration-200 hover:!bg-[#5b8bff]"
                onClick={() => (window.location.href = "#download")}
              >
                Download
              </Button>
              <Button
                color="ghost"
                className="transition-colors duration-200 hover:text-primary"
                onClick={() => (window.location.href = "#features")}
              >
                Learn More
              </Button>
            </div>
          </div>
          <Observer onChange={(event) => setIsVisible(event.isIntersecting)}>
            <div className="col-span-6 animate-fade-in cursor-pointer">
              <div className="relative">
                <div
                  className="relative overflow-hidden rounded-xl ring-1 ring-primary/60 shadow-xl shadow-black/30"
                  ref={heroImageRef}
                  onClick={() => setCurrentImage(0)}
                >
                  <img
                    alt="ScreenExtend Dashboard"
                    id="hero-image"
                    className="block w-full"
                    src={heroImage}
                  />
                </div>
              </div>
            </div>
          </Observer>
        </div>
        <Reveal>
          <h2 className="mt-12 text-center text-3xl font-semibold text-base-content lg:mt-32">
            Built With
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 justify-center gap-8 sm:grid-cols-3 md:grid-cols-5">
          <Reveal delay={0}>
            <a
              className={`${LOGO} ${GLOW_RUST}`}
              href="https://www.rust-lang.org/"
              target="_blank"
            >
              <img className="h-8" src={rustLogo} alt="Rust Logo" />
              <p className={LABEL} style={{ color: "#f74c00" }}>
                Rust
              </p>
            </a>
          </Reveal>
          <Reveal delay={90}>
            <a
              className={`${LOGO} ${GLOW_TAURI}`}
              href="https://tauri.app/"
              target="_blank"
            >
              <img className="h-8" src={tauriLogo} alt="Tauri Logo" />
              <p className={LABEL} style={{ color: "#24c8db" }}>
                Tauri
              </p>
            </a>
          </Reveal>
          <Reveal delay={180}>
            <a
              className={`${LOGO} ${GLOW_TS}`}
              href="https://www.typescriptlang.org/"
              target="_blank"
            >
              <img className="h-8" src={typescriptLogo} alt="Typescript Logo" />
              <p className={LABEL} style={{ color: "#3178C6" }}>
                Typescript
              </p>
            </a>
          </Reveal>
          <Reveal delay={270}>
            <a
              className={`${LOGO} ${GLOW_REACT}`}
              href="https://react.dev/"
              target="_blank"
            >
              <img className="h-8" src={reactLogo} alt="React Logo" />
              <p className={LABEL} style={{ color: "#61dafb" }}>
                React.js
              </p>
            </a>
          </Reveal>
          <Reveal delay={360}>
            <a
              className={`${LOGO} text-base-content ${GLOW_SHADCN}`}
              href="https://ui.shadcn.com/"
              target="_blank"
            >
              <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"/>
                <line x1="208" y1="128" x2="128" y2="208" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                <line x1="192" y1="40" x2="40" y2="192" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              </svg>
              <p className={LABEL}>shadcn/ui</p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
