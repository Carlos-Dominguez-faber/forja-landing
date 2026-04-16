import { Flame } from "lucide-react";
import { CONTACT } from "../data/content";

const SOCIAL = [
  { label: "GitHub", href: CONTACT.githubPersonal },
  { label: "YouTube", href: CONTACT.youtube },
  { label: "X / Twitter", href: CONTACT.twitter },
  { label: "TikTok", href: CONTACT.tiktok },
  { label: "Instagram", href: CONTACT.instagram },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/80 pb-10 pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-display text-2xl"
          >
            <Flame size={22} className="text-ember" strokeWidth={1.6} />
            <span>
              <em className="font-light italic">{"{{YOUR_NAME_FIRST}}"}</em>{" "}
              <span className="font-semibold">{"{{YOUR_NAME_LAST}}"}</span>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-muted">
            {"{{FOOTER_TAGLINE}}"}
          </p>
          <p className="mt-6 font-mono text-xs text-dim">
            {"{{LOCATION_LINE}}"}
          </p>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-dim">
            Navegación
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { label: "Servicios", href: "#servicios" },
              { label: "Portafolio", href: "#portafolio" },
              { label: "Proceso", href: "#proceso" },
              { label: "WhatsApp", href: CONTACT.whatsappUrl },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-muted transition-colors hover:text-foreground"
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-dim">
            Canales
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-4 border-t border-border/60 px-6 pt-6 text-xs text-dim md:flex-row md:items-center md:justify-between">
        <p>
          © {"{{YEAR}}"} {"{{YOUR_NAME}}"} · Construida con{" "}
          <a
            href="https://github.com/Carlos-Dominguez-faber/forja-landing"
            target="_blank"
            rel="noreferrer"
            className="text-ember transition-colors hover:text-ember-bright"
          >
            forja-landing
          </a>{" "}
          · Desplegado en Vercel
        </p>
        <p className="font-mono">
          El código mediocre se genera.{" "}
          <span className="text-ember">El gran software se forja.</span>
        </p>
      </div>
    </footer>
  );
}
