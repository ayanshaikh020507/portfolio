import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    document.body.classList.add("has-cursor");
    const el = ref.current!;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      el.style.opacity = "1";
      el.classList.toggle("big", !!(e.target as HTMLElement).closest("a,button,.chip,input,textarea,[role=tab]"));
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); document.body.classList.remove("has-cursor"); };
  }, []);
  return <div ref={ref} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />;
}
