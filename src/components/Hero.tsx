import { useEffect, useRef, useState } from "react";

import { Button, useTheme } from "react-daisyui";
import Card3d from "card3d";
import Observer from "@researchgate/react-intersection-observer";

import { useImage } from "@/components/ImageContext.tsx";
import heroImage from "@/assets/app/feature-1.png";
import typescriptLogo from "@/assets/logo/typescript.svg";
import tauriLogo from "@/assets/logo/tauri.svg";
import reactLogo from "@/assets/logo/react.svg";
import rustLogo from "@/assets/logo/rust.svg";

export default function Hero() {
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = useTheme();
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
            <h1 className="text-4xl text-primary font-black tracking-tighter lg:text-6xl lg:leading-none">
              ScreenExtend
            </h1>
            <h2 className="mt-2 text-xl font-black tracking-tighter lg:text-3xl lg:leading-none">
              Extend your screen.
            </h2>
            <h2 className="mt-1 text-xl font-black tracking-tighter lg:text-3xl lg:leading-none">
              Extend your possibilities.
            </h2>
            <h2 className="mt-1 text-xl font-black tracking-tighter lg:text-3xl lg:leading-none">
              Unlock ultimate productivity.
            </h2>
            <p className="mt-8 text-lg">
              A free, cross-platform desktop-extension solution that transforms any device into a second monitor, instantly expanding your workspace.
            </p>
            <div className="mt-10 inline-flex gap-3">
              <Button color="primary" onClick={() => window.location.href = "#download"}>
                Download
              </Button>
              <Button color="ghost" onClick={() => window.location.href = "#features"}>
                Learn More
              </Button>
            </div>
          </div>
          <Observer onChange={(event) => setIsVisible(event.isIntersecting)}>
            <div className="col-span-6 cursor-pointer">
              <div
                className="rounded-2xl bg-gradient-to-r p-3"
                style={{
                  background: "linear-gradient(90deg, #6fcbff 0%, #4076ff 100%)",
                }}
                ref={heroImageRef}
                onClick={() => setCurrentImage(0)}
              >
                <img
                  alt="ScreenExtend Dashboard"
                  id="hero-image"
                  className="rounded-lg"
                  src={heroImage}
                />
              </div>
            </div>
          </Observer>
        </div>
        <h2 className="mt-12 text-center text-3xl font-semibold text-base-content lg:mt-32">
          Built With
        </h2>
        <div className="mt-10 grid grid-cols-2 justify-center gap-8 sm:grid-cols-3 md:grid-cols-5">
          <a
            className="mx-auto cursor-pointer overflow-hidden transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(247,76,0,0.75)]"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            href="https://www.rust-lang.org/"
            target="_blank"
          >
            <img className="h-8" src={rustLogo} alt="Rust Logo" />
            <p style={{ color: "#f74c00", marginLeft: 10, fontSize: "1.25rem" }}>
              <b>Rust</b>
            </p>
          </a>
          <a
            className="mx-auto cursor-pointer overflow-hidden transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(36,200,219,0.75)]"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            href="https://tauri.app/"
            target="_blank"
          >
            <img className="h-8" src={tauriLogo} alt="Tauri Logo" />
            <p style={{ color: "#24c8db", marginLeft: 10, fontSize: "1.25rem" }}>
              <b>Tauri</b>
            </p>
          </a>
          <a
            className="mx-auto cursor-pointer overflow-hidden transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(49,120,198,0.75)]"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            href="https://www.typescriptlang.org/"
            target="_blank"
          >
            <img className="h-8" src={typescriptLogo} alt="Typescript Logo" />
            <p style={{ color: "#3178C6", marginLeft: 10, fontSize: "1.25rem" }}>
              <b>Typescript</b>
            </p>
          </a>
          <a
            className="mx-auto cursor-pointer overflow-hidden transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(97,218,251,0.75)]"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            href="https://react.dev/"
            target="_blank"
          >
            <img className="h-8" src={reactLogo} alt="React Logo" />
            <p style={{ color: "#61dafb", marginLeft: 10, fontSize: "1.25rem" }}>
              <b>React.js</b>
            </p>
          </a>
          <a
            className={`mx-auto cursor-pointer text-${theme == "light" ? "black" : theme == "text-dark" ? "white" : "black dark:text-white"} overflow-hidden transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(100,100,100,1)]`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            href="https://ui.shadcn.com/"
            target="_blank"
          >
            <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none"/>
              <line x1="208" y1="128" x2="128" y2="208" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              <line x1="192" y1="40" x2="40" y2="192" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
            </svg>
            <p style={{ marginLeft: 10, fontSize: "1.25rem" }}>
              <b>shadcn/ui</b>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};
