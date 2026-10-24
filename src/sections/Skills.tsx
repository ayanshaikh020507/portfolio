import { useRef, useState } from "react";
import { skillGroups } from "../data/content";
import Scramble from "../components/Scramble";

export default function Skills() {
  const [sel, setSel] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const g = skillGroups[sel];
  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (sel + d + skillGroups.length) % skillGroups.length;
    setSel(n); tabs.current[n]?.focus();
  };
  return (
    <section id="skills" className="py-28 md:py-36 bg-(--color-ink) text-(--color-canvas) rounded-[2rem] md:rounded-[3.5rem]">
      <div className="wrap">
        <p className="mono text-(--color-accent) rv">02 — Toolbox</p>
        <h2 className="h2 mt-4 max-w-3xl rv">What I work with.</h2>
        <p className="mt-5 max-w-xl opacity-70 rv">Technologies from my coursework and personal projects. Pick a group to see what's in it.</p>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mt-14">
          <div role="tablist" aria-label="Skill groups" aria-orientation="vertical" onKeyDown={onKey} className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-2">
            {skillGroups.map((s, i) => (
              <button key={s.id} ref={(el) => { tabs.current[i] = el; }} role="tab" id={`tab-${s.id}`} aria-selected={sel === i} aria-controls="skill-panel" tabIndex={sel === i ? 0 : -1} onClick={() => setSel(i)}
                className={`text-left rounded-2xl px-5 py-4 md:py-5 border transition-all active:scale-[.98] ${sel === i ? "bg-(--color-accent) border-(--color-accent) text-white md:translate-x-3" : "border-white/20 hover:border-white/60"}`}>
                <span className="mono opacity-70">0{i + 1} · {s.items.length} items</span>
                <span className="block font-display font-extrabold text-2xl md:text-4xl tracking-tight">{s.title}</span>
              </button>
            ))}
          </div>
          <div id="skill-panel" role="tabpanel" aria-labelledby={`tab-${g.id}`} className="md:col-span-7 min-h-[22rem]" key={g.id}>
            <p className="mono opacity-60">{g.note}</p>
            <ul className="mt-4">
              {g.items.map((it, i) => (
                <li key={it} className="border-b border-white/15 py-4 md:py-5 flex items-baseline gap-4 group" style={{ animation: "slide .6s cubic-bezier(.2,.7,.2,1) both", animationDelay: `${i * 70}ms` }}>
                  <span className="mono opacity-50">{String(i + 1).padStart(2, "0")}</span>
                  <Scramble text={it} className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight transition-transform group-hover:translate-x-3 group-hover:text-(--color-accent)" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style>{`@keyframes slide{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}} @media (prefers-reduced-motion:reduce){#skill-panel li{animation:none!important}}`}</style>
    </section>
  );
}
