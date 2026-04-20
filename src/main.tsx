import React from "react";
import ReactDOM from "react-dom/client";
import Lenis from "lenis";
import App from "./App.tsx";
import "./index.css";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement | null)?.closest(
      "a[href^='#']"
    ) as HTMLAnchorElement | null;
    if (!link) return;
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: -72 });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
