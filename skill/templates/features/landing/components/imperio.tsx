import { IMPERIO } from '../data/content'

export function ImperioDigital() {
  return (
    <section id="imperio" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface/80 via-background to-background p-10 md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.18), transparent 65%)' }}
          />

          <div className="relative grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-14">
            {/* Big stat */}
            <div className="flex flex-col">
              <span className="font-display text-7xl font-medium tracking-[-0.03em] text-ember md:text-8xl">
                {IMPERIO.stat}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                {IMPERIO.statLabel}
              </span>
            </div>

            {/* Copy */}
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
                §  {IMPERIO.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl leading-[1.08] tracking-tight md:text-4xl">
                {IMPERIO.title}
              </h2>
              <p className="mt-4 text-base text-muted md:text-lg">{IMPERIO.body}</p>

              <ul className="mt-5 space-y-2 text-sm text-muted md:text-base">
                {IMPERIO.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-ember" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex md:flex-col md:items-end md:gap-4">
              <a
                href={IMPERIO.cta.href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-sm"
              >
                {IMPERIO.cta.label}
                <span aria-hidden>↗</span>
              </a>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-dim md:block">
                Enlace referido
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
