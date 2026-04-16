"use client";

import { useEffect, useState } from "react";
import { Flame, X, ChevronUp } from "lucide-react";

const GITHUB_URL = "https://github.com/Carlos-Dominguez-faber/forja-landing";
const SCROLL_THRESHOLD = 700;

export function ForjaBadge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("forja-badge-dismissed")) {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setVisible(true);
        // Auto-expand en desktop
        if (window.matchMedia("(min-width: 768px)").matches) {
          setExpanded(true);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleDismiss() {
    setExiting(true);
    setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem("forja-badge-dismissed", "1");
    }, 250);
  }

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-4 z-40 flex flex-col items-end gap-2 transition-all duration-500 ease-out md:right-6 ${
        visible && !exiting
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      {/* Expanded card — oculto en mobile hasta tap */}
      <div
        className={`transition-all duration-300 ease-out ${
          expanded
            ? "max-h-[360px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 translate-y-2 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="w-[210px] rounded-2xl border border-ember/40 bg-gradient-to-br from-[#1a0f03] via-[#111113] to-background px-5 py-4 shadow-2xl shadow-black/60 backdrop-blur-xl">
          {/* Header row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Flame size={13} className="text-ember" strokeWidth={1.8} />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ember-bright">
                forja-landing
              </span>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Cerrar"
              className="flex h-5 w-5 items-center justify-center rounded-full text-dim transition-colors hover:text-foreground"
            >
              <X size={10} strokeWidth={2} />
            </button>
          </div>

          {/* Copy */}
          <p className="font-display text-sm leading-snug text-foreground">
            ¿Te gusta el estilo?
          </p>
          <p className="mt-1 text-xs text-muted">
            Constrúyelo tú. Gratis, open source.
          </p>

          {/* Command */}
          <div className="mt-3 rounded-lg border border-border bg-black/40 px-2.5 py-2 font-mono text-[10px] text-ember-bright">
            npx forja-landing init
          </div>

          {/* CTA */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-3 w-full justify-center py-2 text-xs"
          >
            Ver en GitHub · ⭐
          </a>
        </div>
      </div>

      {/* Collapsed pill — siempre visible cuando hay badge */}
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? "Cerrar forja-landing" : "Ver forja-landing"}
        className="flex items-center gap-2 rounded-full border border-ember/40 bg-gradient-to-br from-[#1a0f03] via-[#111113] to-background px-3.5 py-2.5 shadow-lg shadow-black/50 backdrop-blur-xl transition-colors hover:border-ember/60"
      >
        <Flame size={14} className="text-ember" strokeWidth={1.8} />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ember-bright">
          forja-landing
        </span>
        <ChevronUp
          size={12}
          className={`text-dim transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
    </div>
  );
}
