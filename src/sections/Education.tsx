import { useEffect, useRef } from "react";
import { education } from "../data/content";
import { gsap, reduceMotion } from "../lib/lenis";

export default function Education() {
  const line = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLOListElement>(null);
  useEffect(() => {
    if (reduceMotion() || !line.current) return;
    const t = gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: "none", immediateRender: false,
      scrollTrigger: { trigger: box.current, start: "top 70%", end: "bottom 70%", scrub: true } });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, []);
  return (
    <section id="education" className="py-28 md:py-36">
      <div className="wrap">
        <p className="mono text-(--color-accent) rv">04 — Education</p>
        <h2 className="h2 mt-4 rv">The path so far.</h2>
        <ol ref={box} className="relative mt-16 ml-4 md:ml-0 md:max-w-4xl md:mx-auto">
          <div className="absolute left-0 md:left-[11.5rem] top-2 bottom-2 w-0.5 bg-(--color-ink)/15" aria-hidden="true" />
          <div ref={line} className="absolute left-0 md:left-[11.5rem] top-2 bottom-2 w-0.5 bg-(--color-accent) origin-top" aria-hidden="true" />
          {education.map((e) => (
            <li key={e.degree} className="relative pl-8 md:pl-0 md:grid md:grid-cols-[11.5rem_1fr] pb-14 last:pb-0 rv">
              <span className={`absolute -left-[7px] md:left-[calc(11.5rem-7px)] top-2 w-4 h-4 rounded-full border-2 border-(--color-ink) ${e.current ? "bg-(--color-accent)" : "bg-(--color-canvas)"}`} aria-hidden="true" />
              <p className="mono text-(--color-mute) md:pt-2 md:pr-8 md:text-right mb-3 md:mb-0">{e.period}</p>
              <div className="md:pl-10 rounded-2xl">
                <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">{e.degree}</h3>
                <p className="mt-2 font-medium">{e.school}</p>
                {e.extra && <p className="text-(--color-mute)">{e.extra}</p>}
                <p className="inline-block mt-4 rounded-full bg-(--color-ink) text-(--color-canvas) px-4 py-1.5 mono">{e.result}</p>
                {e.tags.length > 0 && (
                  <div className="mt-4">
                    <p className="mono text-(--color-mute)">Relevant subjects</p>
                    <ul className="flex flex-wrap gap-2 mt-2">{e.tags.map((t) => <li key={t} className="rounded-full border border-(--color-ink)/40 px-3 py-1 text-sm">{t}</li>)}</ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
