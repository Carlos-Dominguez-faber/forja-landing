import { PORTFOLIO_FEATURED, PORTFOLIO_REST, type PortfolioItem } from '../data/content'

function FeaturedCard({ item, index }: { item: PortfolioItem; index: number }) {
  const spans = ['md:col-span-8', 'md:col-span-4', 'md:col-span-7', 'md:col-span-5']
  const heights = [
    'min-h-[300px] md:min-h-[380px]',
    'min-h-[300px] md:min-h-[380px]',
    'min-h-[320px] md:min-h-[400px]',
    'min-h-[320px] md:min-h-[400px]',
  ]
  const glyphs = ['01', '02', '03', '04']
  const gradients = [
    'from-ember/20 via-ember/5 to-background',
    'from-forge/20 via-forge/5 to-background',
    'from-ember-deep/20 via-ember-deep/5 to-background',
    'from-ember/15 via-forge/5 to-background',
  ]

  return (
    <article
      className={`group relative isolate flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradients[index % 3]} p-8 transition-colors hover:border-border-bright md:p-10 ${spans[index]} ${heights[index]}`}
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-5xl italic font-light leading-none text-ember/70 md:text-6xl">
          {glyphs[index]}
        </span>
        {item.status && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ember-bright">
            {item.status}
          </span>
        )}
      </div>

      <div>
        <h3 className="mt-6 font-display text-3xl leading-tight tracking-tight md:text-4xl">
          {item.name}
        </h3>
        <p className="mt-4 max-w-xl text-base text-muted md:text-lg">{item.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {item.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-elevated/80 px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          {item.role && (
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
              {item.role}
            </span>
          )}
          {item.link ? (
            <a
              href={item.link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-ember-bright"
            >
              {item.link.label}
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
              Demo privada
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export function Portfolio() {
  return (
    <section id="portafolio" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
              §  He construido
            </span>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Lo que he forjado{' '}
              <span className="italic font-light text-muted">en la fragua.</span>
            </h2>
          </div>
          <p className="text-sm text-dim md:max-w-xs">
            Cuatro destacados, más clientes activos. Cada uno usa Forge o los aprendizajes que
            lo hicieron nacer.
          </p>
        </div>

        {/* Featured showcase */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {PORTFOLIO_FEATURED.map((item, i) => (
            <FeaturedCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* Rest as editorial list */}
        <div className="mt-20">
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="font-display text-2xl italic font-light text-muted md:text-3xl">
              Y también…
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
              Clientes &amp; colaboraciones
            </span>
          </div>
          <ul className="divide-y divide-border/80 border-y border-border/80">
            {PORTFOLIO_REST.map((p) => (
              <li
                key={p.name}
                className="grid gap-3 py-6 md:grid-cols-[220px_1fr_auto] md:items-center md:gap-10"
              >
                <h4 className="font-display text-xl font-medium tracking-tight md:text-2xl">
                  {p.name}
                </h4>
                <div>
                  <p className="text-sm text-muted md:text-base">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-elevated/60 px-2 py-0.5 font-mono text-[10px] text-dim"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 md:justify-end">
                  {p.link ? (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-ember-bright"
                    >
                      {p.link.label}
                      <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                      {p.status}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
