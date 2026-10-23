import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis: Lenis | null = null;

export function initScroll() {
  if (reduceMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(id === "top" ? 0 : el, { offset: id === "top" ? 0 : -8, duration: 1.2 });
  else window.scrollTo({ top: id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
}

export { gsap, ScrollTrigger };
