import { useEffect } from "react";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Request from "./sections/Request";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useReveals } from "./hooks";
import { initScroll, gsap, ScrollTrigger, reduceMotion } from "./lib/lenis";

export default function App() {
  useReveals();
  useEffect(() => {
    const stop = initScroll();
    let ctx: gsap.Context | undefined;
    if (!reduceMotion()) {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          gsap.fromTo(el, { y: 0 }, { y: () => -parseFloat(el.dataset.speed!) * 600, ease: "none", immediateRender: false,
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    if (location.hash) setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView(), 100);
    return () => { clearTimeout(t); ctx?.revert(); stop(); };
  }, []);
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-(--color-ink) focus:text-white focus:px-4 focus:py-2 focus:rounded-full">Skip to content</a>
      <Loader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Request />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
