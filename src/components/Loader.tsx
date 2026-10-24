import { useEffect, useState } from "react";

const words = ["Hello.", "નમસ્તે.", "नमस्ते.", "Hola.", "I'm Ayan."];
const STEP = 550;

export default function Loader() {
  const [show, setShow] = useState(() => document.documentElement.classList.contains("loading"));
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  const finish = () => {
    setOut(true);
    document.documentElement.classList.remove("loading");
    setTimeout(() => { setShow(false); sessionStorage.setItem("seen", "1"); }, 900);
  };
  useEffect(() => {
  if (!show) return;
  const timers = words.slice(1).map((_, k) => setTimeout(() => setI(k + 1), STEP * (k + 1)));
  timers.push(setTimeout(finish, STEP * (words.length - 1) + 750));
  return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  if (!show) return null;
  return (
    <div role="presentation" onClick={finish} className="fixed inset-0 z-[90] bg-(--color-ink) text-(--color-canvas) grid place-items-center" style={{ transform: out ? "translateY(-100%)" : "none", transition: "transform .9s cubic-bezier(.76,0,.24,1)", borderRadius: out ? "0 0 50% 50% / 0 0 12vh 12vh" : 0 }}>
      <p key={i} className="font-display font-extrabold text-5xl md:text-8xl tracking-tight" style={{ animation: "wordin .5s cubic-bezier(.2,.7,.2,1) both" }}>
        {words[i]}<span className="text-(--color-accent)">{i === 2 ? "" : ""}</span>
      </p>
      <button onClick={finish} className="mono absolute bottom-8 right-8 opacity-60 hover:opacity-100 px-3 py-2">Skip</button>
      <style>{`@keyframes wordin{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
