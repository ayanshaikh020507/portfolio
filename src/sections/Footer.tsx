import { ArrowUp } from "lucide-react";
import { nav, profile } from "../data/content";
import { scrollToId } from "../lib/lenis";

export default function Footer() {
  return (
    <footer className="bg-(--color-ink) text-(--color-canvas) border-t border-white/15 pb-10">
      <div className="wrap pt-12 grid md:grid-cols-3 gap-10 items-start">
        <div>
          <p className="font-display font-extrabold text-2xl">{profile.name}</p>
          <p className="opacity-70 mt-1">{profile.role}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((n) => <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollToId(n.id); }} className="hover:text-(--color-accent) py-1">{n.label}</a>)}
        </nav>
        <div className="flex flex-col md:items-end gap-2">
          <a className="hover:text-(--color-accent)" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:text-(--color-accent)" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-(--color-accent)" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
      <div className="wrap mt-10 flex items-center justify-between gap-4 opacity-80">
        <p className="text-sm">© {new Date().getFullYear()} {profile.name}</p>
        <button onClick={() => scrollToId("top")} className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2.5 text-sm hover:bg-white hover:text-(--color-ink) transition-colors active:scale-95">
          Back to top <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
