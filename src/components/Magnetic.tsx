import { useRef } from "react";
import { reduceMotion } from "../lib/lenis";

/** Wraps a single button/link so it gently pulls toward the cursor. */
export default function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const target = () => wrap.current?.firstElementChild as HTMLElement | null | undefined;
  const move = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || reduceMotion()) return;
    const t = target();
    if (!t || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    t.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
  };
  const leave = () => { const t = target(); if (t) t.style.transform = ""; };
  return <span ref={wrap} className="inline-block" onPointerMove={move} onPointerLeave={leave}>{children}</span>;
}
