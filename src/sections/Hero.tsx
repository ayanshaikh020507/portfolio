import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDownRight, Github, Mail } from "lucide-react";
import { floaters, profile } from "../data/content";
import { scrollToId, reduceMotion } from "../lib/lenis";
import Magnetic from "../components/Magnetic";

const spots = [
  { l: "6%", t: "8%", z: 26 }, { l: "62%", t: "4%", z: -18 }, { l: "74%", t: "30%", z: 34 }, { l: "4%", t: "46%", z: -26 },
  { l: "70%", t: "62%", z: 20 }, { l: "10%", t: "80%", z: 30 }, { l: "42%", t: "86%", z: -20 }, { l: "78%", t: "88%", z: 14 },
    { l: "30%", t: "0%", z: -14 }, { l: "0%", t: "24%", z: 22 }, { l: "56%", t: "76%", z: -22 }, { l: "24%", t: "62%", z: 16 },
];

const code = `const ayan = {
  role: "Full Stack Developer",
  studying: "BCA",
  location: "Surat, India",
  stack: ["MERN", "PHP/MySQL"],
  openTo: "internships",
};`;

/** true once the intro loader has lifted (or if it never ran) */
function useLoaderDone() {
  const html = document.documentElement;
  const [done, setDone] = useState(() => !html.classList.contains("loading"));
  useEffect(() => {
    if (done) return;
    const mo = new MutationObserver(() => {
      if (!html.classList.contains("loading")) { setDone(true); mo.disconnect(); }
    });
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, [done, html]);
  return done;
}

/** types `text` out character by character once `go` is true */
function useTyped(text: string, go: boolean) {
  const [n, setN] = useState(() => (reduceMotion() ? text.length : 0));
  useEffect(() => {
    if (!go || reduceMotion()) return;
    let i = 0;
    let id = 0;
    const t = setTimeout(() => {
      id = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(id);
      }, 16);
    }, 350);
    return () => { clearTimeout(t); clearInterval(id); };
  }, [go, text]);
  return n;
}

function useISTClock() {
  const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date());
  const [t, setT] = useState("");
  useEffect(() => {
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 20000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Hero() {
  const time = useISTClock();
  const typed = useTyped(code, useLoaderDone());
  const sec = useRef<HTMLElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const onSpot = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || reduceMotion() || !sec.current) return;
    const r = sec.current.getBoundingClientRect();
    sec.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    sec.current.style.setProperty("--my", `${e.clientY - r.top}px`);
    sec.current.style.setProperty("--so", "1");
  };
  const offSpot = () => sec.current?.style.setProperty("--so", "0");
  const resetTilt = () => { field.current?.style.setProperty("--px", "0"); field.current?.style.setProperty("--py", "0"); };
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || reduceMotion()) return;
    const r = field.current!.getBoundingClientRect();
    field.current!.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5).toFixed(3)));
    field.current!.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5).toFixed(3)));
  };
  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollToId(id); };

  return (
    <section ref={sec} onPointerMove={onSpot} onPointerLeave={offSpot} id="top" className="relative pt-28 md:pt-32 pb-16 overflow-hidden dots">
      <div className="spot-glow" aria-hidden="true" />
      <div className="spot" aria-hidden="true" />
      <div className="wrap relative z-10">
        <div className="flex justify-between mono text-(--color-mute) rv">
          <span>Portfolio / {new Date().getFullYear()}</span>
          <span>{profile.location}{time && ` · ${time} IST`}</span>
        </div>

        <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.88] mt-8 text-[clamp(3.4rem,13vw,12rem)]">
          <span className="sr-only">{profile.name} — {profile.role}</span>
          <span aria-hidden="true">
            <span className="mask"><span style={{ "--d": "100ms" } as React.CSSProperties}>Mohammad</span></span>
            <span className="mask"><span style={{ "--d": "220ms" } as React.CSSProperties}>Ayan <span className="text-(--color-accent)">Shaikh</span></span></span>
          </span>
        </h1>

        <div className="grid lg:grid-cols-12 gap-10 mt-12 items-start">
          <div className="lg:col-span-6">
            <p className="mono text-(--color-accent) rv" style={{ "--d": "400ms" } as React.CSSProperties}>{profile.role}</p>
            <p className="text-xl md:text-2xl leading-snug mt-4 max-w-xl rv" style={{ "--d": "480ms" } as React.CSSProperties}>{profile.intro}</p>
            <div className="flex flex-wrap gap-3 mt-8 rv" style={{ "--d": "560ms" } as React.CSSProperties}>
              <Magnetic><a href="#projects" onClick={go("projects")} className="btn btn-primary">Explore projects <ArrowDownRight size={18} /></a></Magnetic>
              <Magnetic><a href="#contact" onClick={go("contact")} className="btn btn-ghost"><Mail size={18} /> Get in touch</a></Magnetic>
              <Magnetic><a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost"><Github size={18} /> GitHub</a></Magnetic>
            </div>
          </div>

          <div ref={field} onPointerMove={onMove} onPointerLeave={resetTilt} className="lg:col-span-6 relative h-[360px] md:h-[420px]" style={{ "--px": 0, "--py": 0 } as React.CSSProperties}>
            <div className="absolute inset-0 grid place-items-center" style={{ transform: "translate3d(calc(var(--px)*-10px),calc(var(--py)*-10px),0)", transition: "transform .3s ease-out" }}>
              <div className="w-[min(88%,380px)] rounded-2xl bg-(--color-ink) text-(--color-canvas) shadow-[8px_8px_0_var(--color-accent)] rotate-[-2deg]" style={{ transform: "perspective(900px) rotateY(calc(var(--px)*16deg)) rotateX(calc(var(--py)*-16deg))", transition: "transform .25s ease-out" }}>
                <div className="flex gap-1.5 px-4 py-3 border-b border-white/15 items-center">
                  <i className="w-2.5 h-2.5 rounded-full bg-(--color-accent)" /><i className="w-2.5 h-2.5 rounded-full bg-white/30" /><i className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="mono ml-2 opacity-60">ayan.ts</span>
                </div>
                <pre className="font-mono text-[13px] leading-6 p-5 overflow-hidden whitespace-pre-wrap grid" aria-label="Summary card">
                  <span className="sr-only">{code}</span>
                  <span aria-hidden="true" className="invisible [grid-area:1/1]">{code}</span>
                  <span aria-hidden="true" className="[grid-area:1/1]">{code.slice(0, typed)}{typed < code.length && <i className="caret" />}</span>
                </pre>
              </div>
            </div>
            {floaters.map((f, i) => (
              <div key={f} className="absolute" style={{ left: spots[i].l, top: spots[i].t, transform: `translate3d(calc(var(--px)*${spots[i].z}px),calc(var(--py)*${spots[i].z}px),0)`, transition: "transform .25s ease-out" }}>
                <motion.div className="chip" drag dragConstraints={field} dragElastic={0.25} dragTransition={{ bounceStiffness: 220, bounceDamping: 18 }} whileDrag={{ scale: 1.08, rotate: 3 }} whileHover={{ y: -3 }}
                  animate={{ y: [0, -6, 0] }} transition={{ y: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" } }}>
                  {f}
                </motion.div>
              </div>
            ))}
            <p className="mono absolute -bottom-1 right-0 text-(--color-mute) text-[10px]">drag the tags</p>
          </div>
        </div>

        <a href="#about" onClick={go("about")} className="mono inline-flex items-center gap-3 mt-14 text-(--color-mute) hover:text-(--color-ink)">
          <span className="relative w-px h-10 bg-(--color-ink)/20 overflow-hidden"><i className="absolute inset-x-0 h-4 bg-(--color-accent) animate-[drop_1.8s_ease-in-out_infinite]" /></span>Scroll
        </a>
      </div>
      <style>{`@keyframes drop{0%{top:-16px}100%{top:40px}} @media (prefers-reduced-motion:reduce){.animate-\\[drop_1\\.8s_ease-in-out_infinite\\]{animation:none}}`}</style>
    </section>
  );
}
