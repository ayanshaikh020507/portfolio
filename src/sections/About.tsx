import { profile } from "../data/content";

export default function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="wrap grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="mono text-(--color-accent) rv">01 — About</p>
          <h2 className="h2 mt-4 rv" data-speed="0.06">Learning<br />by building.</h2>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg md:text-xl leading-relaxed">
          <p className="rv">
            I'm Ayan, a Bachelor of Computer Applications student at <strong>C.B. Patel Computer College</strong>, Surat, affiliated with <strong>Veer Narmad South Gujarat University</strong>. I'm drawn to full-stack and web development, where an idea becomes something people can actually use.
          </p>
          <p className="rv" style={{ "--d": "100ms" } as React.CSSProperties}>
            So far I've built academic and personal projects with the MERN stack and with PHP and MySQL, covering authentication, protected pages, REST APIs and database design. I enjoy the full path from schema to screen.
          </p>
          <p className="rv" style={{ "--d": "200ms" } as React.CSSProperties}>
            I'm looking to contribute to real products, learn from working engineers, and keep sharpening my craft. If that sounds useful, <a className="underline decoration-(--color-accent) decoration-2 underline-offset-4 hover:text-(--color-accent)" href={`mailto:${profile.email}`}>let's talk</a>.
          </p>
          <dl className="grid grid-cols-2 gap-px bg-(--color-ink)/20 border border-(--color-ink)/20 rounded-2xl overflow-hidden text-base rv">
            {[["Based in", "Surat, India"], ["Studying", "BCA, since July 2024"], ["Focus", "Full-stack web"], ["Looking for", "Internships & collaboration"]].map(([k, v]) => (
              <div key={k} className="bg-(--color-canvas) p-4"><dt className="mono text-(--color-mute)">{k}</dt><dd className="font-bold mt-1">{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
