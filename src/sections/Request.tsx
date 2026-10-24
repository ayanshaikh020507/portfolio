import { useEffect, useRef, useState } from "react";
import { requestFlows } from "../data/content";

export default function Request() {
  const [flow, setFlow] = useState(0);
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const steps = requestFlows[flow].steps;

  useEffect(() => {
    setActive(0);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      }),
      { rootMargin: "-42% 0px -42% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [flow]);

  return (
    <section id="request" className="py-28 md:py-36" aria-labelledby="request-title">
      <div className="wrap">
        <p className="mono text-(--color-accent) rv">Under the hood</p>
        <h2 id="request-title" className="h2 mt-4 rv">Follow a request.</h2>
        <p className="mt-5 max-w-md text-(--color-mute) rv">
          Scroll to send a request through each project&rsquo;s stack and see where each part of the work lives.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 rv" role="tablist" aria-label="Choose a project">
          {requestFlows.map((f, i) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={flow === i}
              onClick={() => setFlow(i)}
              className={`rounded-full border px-5 py-2.5 font-medium transition-colors ${
                flow === i
                  ? "bg-(--color-ink) text-(--color-canvas) border-(--color-ink)"
                  : "border-(--color-ink)/60 hover:bg-(--color-ink)/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ol className="relative mt-12 max-w-2xl">
          <div className="absolute left-[27px] top-7 bottom-[8.25rem] w-0.5 bg-(--color-ink)/15" aria-hidden="true" />
          <div
            className="absolute left-[27px] top-7 w-0.5 bg-(--color-accent) transition-[height] duration-500"
            style={{ height: `calc((100% - 10rem) * ${active / (steps.length - 1)})` }}
            aria-hidden="true"
          />
          {steps.map((s, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <li
                key={`${flow}-${s.name}`}
                ref={(el) => { items.current[i] = el; }}
                data-i={i}
                className="relative flex gap-6 min-h-40 pb-10 last:pb-0"
                aria-current={on ? "step" : undefined}
              >
                <span
                  className={`relative z-10 shrink-0 w-14 h-14 rounded-full border-2 grid place-items-center mono transition-all duration-300 ${
                    on
                      ? "bg-(--color-accent) border-(--color-ink) text-white scale-100"
                      : done
                        ? "bg-(--color-canvas) border-(--color-accent) text-(--color-accent)"
                        : "bg-(--color-canvas) border-(--color-ink)/40 text-(--color-mute)"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`pt-1 transition-opacity duration-300 ${on ? "opacity-100" : "opacity-50"}`}>
                  <p className="mono text-(--color-mute)">{s.tag}</p>
                  <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mt-1">{s.name}</h3>
                  <p className="mt-2 max-w-sm">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
