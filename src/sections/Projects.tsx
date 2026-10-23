import { useEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, profile, type Project } from "../data/content";
import { gsap, reduceMotion } from "../lib/lenis";

function EventMock() {
  return (
    <div className="rounded-xl bg-[oklch(0.97_0.01_85)] text-(--color-ink) shadow-2xl overflow-hidden text-[11px]" aria-hidden="true">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/80 border-b border-black/10">
        <i className="w-2 h-2 rounded-full bg-(--color-accent)" /><i className="w-2 h-2 rounded-full bg-black/20" /><i className="w-2 h-2 rounded-full bg-black/20" />
        <span className="ml-2 flex-1 rounded bg-black/5 px-2 py-0.5 font-mono">/events</span>
        <span className="rounded-full bg-(--color-ink) text-white px-2 py-0.5">Logged in</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-2"><div className="flex-1 rounded-lg border border-black/15 bg-white px-3 py-2 text-black/50">Search events…</div><div className="rounded-lg bg-(--color-accent) text-white px-3 py-2 font-bold">+ Create</div></div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg bg-white p-3 border border-black/10" style={{ transform: `translateX(${i * 6}px)` }}>
            <div className="w-10 h-10 rounded-md bg-(--color-paper) grid place-items-center font-mono">{`0${i + 1}`}</div>
            <div className="flex-1 space-y-1.5"><div className="h-2 rounded bg-black/70" style={{ width: `${70 - i * 12}%` }} /><div className="h-1.5 rounded bg-black/15 w-1/2" /></div>
            <span className="font-mono text-black/50">edit · delete</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentMock() {
  return (
    <div className="rounded-xl bg-white text-(--color-ink) shadow-2xl overflow-hidden text-[11px] flex" aria-hidden="true">
      <div className="w-20 bg-[oklch(0.3_0.06_160)] text-white/80 p-3 space-y-3 font-mono">
        <div className="font-bold text-white">Admin</div>
        {["Students", "Search", "Filter", "Logout"].map((s, i) => <div key={s} className={i === 0 ? "text-white" : ""}>{s}</div>)}
      </div>
      <div className="flex-1 p-4 space-y-3">
        <div className="flex gap-2"><div className="flex-1 rounded-md border border-black/15 px-2 py-1.5 text-black/50">Search records…</div><div className="rounded-md border border-black/15 px-2 py-1.5">Filter ▾</div></div>
        <div className="rounded-lg border border-black/10 overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 bg-[oklch(0.94_0.04_150)] px-3 py-2 font-mono"><span>Name</span><span>Course</span><span>Actions</span></div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center px-3 py-2 border-t border-black/10">
              <div className="h-2 rounded bg-black/70" style={{ width: `${80 - i * 10}%` }} /><div className="h-2 rounded bg-black/20 w-2/3" /><span className="font-mono text-black/50">edit · del</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ p, i }: { p: Project; i: number }) {
  const dark = p.theme === "ink";
  const mock = useRef<HTMLDivElement>(null);
  const tilt = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || reduceMotion()) return;
    const r = mock.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    mock.current!.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  };
  const reset = () => { if (mock.current) mock.current.style.transform = "perspective(900px)"; };
  return (
    <article data-card className="origin-top will-change-transform" style={{ perspective: 1200 }} aria-labelledby={`${p.id}-t`}>
      <div className={`rounded-[1.75rem] md:rounded-[2.5rem] p-6 md:p-12 grid lg:grid-cols-12 gap-8 lg:gap-12 border-2 border-(--color-ink) ${dark ? "bg-(--color-ink) text-(--color-canvas)" : "bg-(--color-sage) text-(--color-ink)"}`}>
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center gap-3 mono">
            <span className={`rounded-full px-3 py-1 ${dark ? "bg-(--color-accent) text-white" : "bg-(--color-ink) text-white"}`}>Project 0{i + 1}</span>
            <span className="opacity-70">{p.kind}</span>
          </div>
          <h3 id={`${p.id}-t`} className="font-display font-extrabold tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl mt-5">{p.title}</h3>
          <p className="mt-4 text-lg opacity-85 max-w-lg">{p.overview}</p>
          <ul className="mt-6 space-y-2.5">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3"><span className={`mt-2 w-2 h-2 shrink-0 rounded-full ${dark ? "bg-(--color-accent)" : "bg-(--color-ink)"}`} />{f}</li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2 mt-6" aria-label="Technology stack">
            {p.stack.map((s) => <li key={s} className={`mono rounded-full border px-3 py-1.5 ${dark ? "border-white/40" : "border-black/40"}`}>{s}</li>)}
          </ul>
          <div className="flex flex-wrap gap-3 mt-8 items-center">
            {p.repo && <a className="btn bg-(--color-canvas) text-(--color-ink)" href={p.repo} target="_blank" rel="noreferrer"><Github size={18} /> Source code</a>}
            {p.demo && <a className="btn bg-(--color-accent) text-white border-(--color-accent)" href={p.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={18} /></a>}
            {!p.repo && !p.demo && (
              <a className="btn border-current hover:opacity-80" href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> More on GitHub</a>
            )}
          </div>
          {!p.repo && <p className="mono opacity-60 mt-3 text-[11px] normal-case">Repository link not published yet.</p>}
        </div>
        <div className="lg:col-span-6 grid place-items-center relative min-h-[260px]" onPointerMove={tilt} onPointerLeave={reset}>
          <div className={`absolute inset-4 rounded-3xl ${dark ? "bg-(--color-accent)/90" : "bg-(--color-ink)"} -rotate-3`} aria-hidden="true" />
          <div data-mock className="relative w-full max-w-md">
            <div ref={mock} className="transition-transform duration-200 ease-out" style={{ transform: "perspective(900px)" }}>
              {dark ? <EventMock /> : <StudentMock />}
            </div>
          </div>
          <p className="mono absolute bottom-0 right-2 opacity-60 text-[10px]">Illustrative interface</p>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduceMotion() || window.innerWidth < 768) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((c) => {
        gsap.fromTo(c, { y: 90, scale: 0.92, rotateX: 7 }, { y: 0, scale: 1, rotateX: 0, ease: "none", immediateRender: false,
          scrollTrigger: { trigger: c, start: "top 100%", end: "top 40%", scrub: true } });
        const m = c.querySelector("[data-mock]");
        if (m) gsap.fromTo(m, { yPercent: 8 }, { yPercent: -8, ease: "none", immediateRender: false,
          scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="projects" className="py-28 md:py-40" ref={root}>
      <div className="wrap">
        <p className="mono text-(--color-accent) rv">03 — Selected builds</p>
        <h2 className="h2 mt-4 rv">Things I've built.</h2>
        <p className="mt-5 max-w-xl text-(--color-mute) text-lg rv">Two college mini projects, one on the MERN stack and one on PHP and MySQL.</p>
        <div className="mt-14 space-y-10 md:space-y-16">
          {projects.map((p, i) => <Card key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
