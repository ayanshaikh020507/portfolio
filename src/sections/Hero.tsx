import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowDownRight, Github, Mail } from "lucide-react";
import { floaters, profile } from "../data/content";
import { scrollToId } from "../lib/lenis";

const spots = [
  { l: "6%", t: "8%", z: 26 }, { l: "62%", t: "4%", z: -18 }, { l: "74%", t: "30%", z: 34 }, { l: "4%", t: "46%", z: -26 },
  { l: "70%", t: "62%", z: 20 }, { l: "10%", t: "80%", z: 30 }, { l: "42%", t: "86%", z: -20 }, { l: "78%", t: "88%", z: 14 },
];

export default function Hero() {
  const field = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const r = field.current!.getBoundingClientRect();
    field.current!.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5).toFixed(3)));
    field.current!.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5).toFixed(3)));
  };
  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollToId(id); };

  return (
    <section id="top" className="relative pt-28 md:pt-32 pb-16 overflow-hidden dots">
      <div className="wrap">
        <div className="flex justify-between mono text-(--color-mute) rv">
          <span>Portfolio / {new Date().getFullYear()}</span>
          <span>{profile.location}</span>
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
              <a href="#projects" onClick={go("projects")} className="btn btn-primary">Explore projects <ArrowDownRight size={18} /></a>
              <a href="#contact" onClick={go("contact")} className="btn btn-ghost"><Mail size={18} /> Get in touch</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost"><Github size={18} /> GitHub</a>
            </div>
          </div>

          <div ref={field} onPointerMove={onMove} className="lg:col-span-6 relative h-[360px] md:h-[420px]" style={{ "--px": 0, "--py": 0 } as React.CSSProperties}>
            <div className="absolute inset-0 grid place-items-center" style={{ transform: "translate3d(calc(var(--px)*-10px),calc(var(--py)*-10px),0)", transition: "transform .3s ease-out" }}>
              <div className="w-[min(88%,380px)] rounded-2xl bg-(--color-ink) text-(--color-canvas) shadow-[8px_8px_0_var(--color-accent)] rotate-[-2deg]">
                <div className="flex gap-1.5 px-4 py-3 border-b border-white/15 items-center">
                  <i className="w-2.5 h-2.5 rounded-full bg-(--color-accent)" /><i className="w-2.5 h-2.5 rounded-full bg-white/30" /><i className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="mono ml-2 opacity-60">ayan.ts</span>
                </div>
                <pre className="font-mono text-[13px] leading-6 p-5 overflow-hidden whitespace-pre-wrap" aria-label="Summary card">
{`const ayan = {
  role: "Full Stack Developer",
  studying: "BCA",
  location: "Surat, India",
  stack: ["MERN", "PHP/MySQL"],
  openTo: "internships",
};`}
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
