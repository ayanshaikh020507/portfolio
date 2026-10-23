import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, profile } from "../data/content";
import { scrollToId } from "../lib/lenis";

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    const hero = document.getElementById("top");
    const hi = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), { rootMargin: "-45% 0px -50% 0px" });
    if (hero) hi.observe(hero);
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); hi.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => scrollToId(id), 30);
  };

  return (
    <>
      <div ref={bar} className="fixed top-0 left-0 right-0 h-[3px] bg-(--color-accent) origin-left z-[60]" style={{ transform: "scaleX(0)" }} aria-hidden="true" />
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="wrap flex items-center justify-between py-4">
          <a href="#top" onClick={go("top")} className="font-display font-extrabold text-xl tracking-tight px-3 py-2 rounded-full bg-(--color-canvas)/80 backdrop-blur" aria-label="Ayan Shaikh, back to top">
            AS<span className="text-(--color-accent)">.</span>
          </a>
          <nav aria-label="Primary" className="hidden md:flex gap-1 p-1 rounded-full bg-(--color-canvas)/80 backdrop-blur border border-(--color-ink)/15">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} aria-current={active === n.id ? "true" : undefined}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-(--color-ink)/10 active:scale-95 ${active === n.id ? "bg-(--color-ink) text-(--color-canvas) hover:bg-(--color-ink)" : ""}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <button ref={btn} className="md:hidden p-3 rounded-full bg-(--color-ink) text-(--color-canvas)" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-40 bg-(--color-canvas) dots pt-24 px-6 md:hidden">
          <ul className="flex flex-col gap-2">
            {nav.map((n, i) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={go(n.id)} className="flex items-baseline gap-4 py-3 border-b border-(--color-ink)/15 font-display font-extrabold text-4xl">
                  <span className="mono text-(--color-mute)">0{i + 1}</span>{n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${profile.email}`} className="btn btn-primary mt-8">Email me</a>
        </div>
      )}
    </>
  );
}
