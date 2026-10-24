import { useRef } from "react";
import { reduceMotion } from "../lib/lenis";

const glyphs = "abcdefghijklmnopqrstuvwxyz{}<>/=_01";

export default function Scramble({ text, className }: { text: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const run = () => {
    if (reduceMotion() || !el.current) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 450);
      const fixed = Math.floor(p * text.length);
      el.current!.textContent = text.split("").map((c, i) => (i < fixed || c === " " || /[^a-zA-Z0-9]/.test(c) ? c : glyphs[Math.floor(Math.random() * glyphs.length)])).join("");
      if (p < 1) raf.current = requestAnimationFrame(step); else el.current!.textContent = text;
    };
    raf.current = requestAnimationFrame(step);
  };
  return <span className={className} onPointerEnter={run} onFocus={run}><span ref={el} aria-hidden="true">{text}</span><span className="sr-only">{text}</span></span>;
}
