import { CONTACT } from '../data/content'
import { Embers } from './embers'

export function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 -z-10">
        <Embers density={1} />
      </div>
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background via-[#140b02]/60 to-background" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[2fr_1fr] md:items-end md:gap-12">
        {/* Dominant CTA — clients */}
        <div className="relative isolate overflow-hidden rounded-3xl border border-ember/40 bg-gradient-to-br from-[#1a0f03] via-[#150a00]/90 to-background p-10 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-16 h-80 w-80 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.35), transparent 65%)' }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember-bright">
            §  ¿Listo para empezar?
          </span>
          <h2 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            ¿Tienes una idea que lleva meses{' '}
            <span className="italic font-light text-muted">en tu cabeza?</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
            La saco en semanas. Con Blueprint, no con promesas. La primera llamada es gratis y
            sales con un diagnóstico — sin compromiso.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-base"
            >
              Escríbeme por WhatsApp
              <span aria-hidden>→</span>
            </a>
            <span className="font-mono text-xs text-dim">
              +52 220 567 1807 · 24–48 h de respuesta
            </span>
          </div>
        </div>

        {/* Secondary — builders */}
        <aside className="flex flex-col justify-end rounded-2xl border border-border bg-surface/40 p-8 md:p-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
            ¿Prefieres construir tú?
          </span>
          <h3 className="mt-4 font-display text-2xl italic font-light leading-tight md:text-3xl">
            Llévate Forge. El mismo framework que uso con cada cliente.
          </h3>
          <div className="mt-6">
            <a
              href={CONTACT.githubForge}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-ember-bright"
            >
              Ver en GitHub
              <span aria-hidden>↗</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}
