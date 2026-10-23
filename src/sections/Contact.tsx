import { useState } from "react";
import { Github, Globe, Linkedin, MapPin, Phone, Send } from "lucide-react";
import { profile } from "../data/content";

type Errs = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const [errs, setErrs] = useState<Errs>({});
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim(), email = String(f.get("email") || "").trim(), message = String(f.get("message") || "").trim();
    const er: Errs = {};
    if (name.length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) er.email = "Please enter a valid email.";
    if (message.length < 10) er.message = "Please write at least 10 characters.";
    setErrs(er);
    if (Object.keys(er).length) return;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio enquiry from " + name)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const links = [
    { icon: Phone, label: "Phone", v: profile.phone, href: profile.phoneHref },
    { icon: Github, label: "GitHub", v: "ayanshaikh020507", href: profile.github },
    { icon: Linkedin, label: "LinkedIn", v: "ayan-shaikh-27a65943b", href: profile.linkedin },
    { icon: Globe, label: "Website", v: "ayanshaikh.co.in", href: profile.website },
  ];
  const field = "w-full rounded-xl bg-white/10 border border-white/25 px-4 py-3.5 text-base placeholder:text-white/50 focus:border-(--color-accent) outline-none focus-visible:ring-2 ring-(--color-accent)";
  return (
    <section id="contact" className="py-28 md:py-36 bg-(--color-ink) text-(--color-canvas) rounded-t-[2rem] md:rounded-t-[3.5rem]">
      <div className="wrap">
        <p className="mono text-(--color-accent) rv">05 — Contact</p>
        <h2 className="h2 mt-4 max-w-4xl rv">Let's build something useful together.</h2>
        <p className="mt-6 max-w-xl opacity-75 text-lg rv">Recruiters, developers and collaborators: I'm open to internships, web development opportunities and projects.</p>
        <a href={`mailto:${profile.email}`} className="block mt-10 font-display font-extrabold tracking-tight text-[clamp(1.35rem,5.6vw,4.5rem)] break-all hover:text-(--color-accent) transition-colors underline decoration-white/30 underline-offset-8 rv">
          {profile.email}
        </a>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          <ul className="divide-y divide-white/15 border-y border-white/15 self-start">
            {links.map(({ icon: I, label, v, href }) => (
              <li key={label}>
                <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} className="flex items-center gap-4 py-5 group hover:pl-3 transition-all">
                  <I size={22} className="text-(--color-accent)" />
                  <span><span className="mono block opacity-60">{label}</span><span className="text-lg font-medium break-all">{v}</span></span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 py-5"><MapPin size={22} className="text-(--color-accent)" /><span><span className="mono block opacity-60">Location</span><span className="text-lg font-medium">{profile.location}</span></span></li>
          </ul>

          <form onSubmit={submit} noValidate className="space-y-4" aria-label="Email composer">
            {(["name", "email", "message"] as const).map((k) => (
              <div key={k}>
                <label htmlFor={k} className="mono opacity-70">{k === "email" ? "Your email" : k === "name" ? "Your name" : "Message"}</label>
                {k === "message"
                  ? <textarea id={k} name={k} rows={5} className={`${field} mt-1.5`} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `${k}-e` : undefined} placeholder="Tell me about the role or project" />
                  : <input id={k} name={k} type={k === "email" ? "email" : "text"} autoComplete={k} className={`${field} mt-1.5`} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `${k}-e` : undefined} placeholder={k === "email" ? "you@company.com" : "Jane Doe"} />}
                {errs[k] && <p id={`${k}-e`} role="alert" className="text-[oklch(0.78_0.14_35)] text-sm mt-1.5">{errs[k]}</p>}
              </div>
            ))}
            <button className="btn bg-(--color-accent) border-(--color-accent) text-white hover:bg-white hover:text-(--color-ink)" type="submit"><Send size={18} /> Open in my email app</button>
            <p className="text-sm opacity-60" aria-live="polite">
              {sent ? "Your email app should have opened with the message ready to send. If not, write to the address above." : "This opens your email app with the message pre-filled; nothing is stored on this site."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
