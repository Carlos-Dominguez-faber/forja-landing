import { SERVICES, type Service } from '../data/content'

const dotClasses: Record<NonNullable<Service['accent']>, string> = {
  ember: 'bg-ember',
  forge: 'bg-forge',
  deep: 'bg-ember-deep',
}

const haloByAccent: Record<NonNullable<Service['accent']>, string> = {
  ember: 'radial-gradient(circle, rgba(245,158,11,0.22), transparent 65%)',
  forge: 'radial-gradient(circle, rgba(249,115,22,0.22), transparent 65%)',
  deep: 'radial-gradient(circle, rgba(239,68,68,0.2), transparent 65%)',
}

function Halo({ accent, className = '' }: { accent: NonNullable<Service['accent']>; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute blur-3xl ${className}`}
      style={{ background: haloByAccent[accent] }}
    />
  )
}

function DefaultCard({ service }: { service: Service }) {
  const accent = service.accent ?? 'ember'
  return (
    <article className="group relative isolate overflow-hidden rounded-2xl border border-border bg-surface/60 p-8 transition-colors hover:border-border-bright md:col-span-3 md:p-10">
      <Halo accent={accent} className="-top-20 -right-16 h-56 w-56" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
          <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[accent]}`} />
          {service.eyebrow}
        </div>
        <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight md:text-3xl">
          {service.title}
        </h3>
        <p className="mt-4 text-base text-muted md:text-lg md:leading-relaxed">{service.promise}</p>
        <ul className="mt-6 space-y-2.5 text-sm text-muted md:text-base">
          {service.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${dotClasses[accent]}`} aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <CardCTA service={service} />
        </div>
      </div>
    </article>
  )
}

function PosterCard({ service }: { service: Service }) {
  const accent = service.accent ?? 'ember'
  return (
    <article className="group relative isolate overflow-hidden rounded-2xl border border-ember/40 bg-gradient-to-br from-[#130b03] via-surface to-background p-10 md:col-span-6 md:p-14">
      <Halo accent={accent} className="-top-24 -left-20 h-80 w-80" />
      <Halo accent={accent} className="-bottom-24 -right-20 h-80 w-80" />
      <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ember-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-bright animate-ember-pulse" />
            {service.eyebrow}
            {service.poster?.caption && (
              <span className="text-dim">· {service.poster.caption}</span>
            )}
          </div>
          <h3 className="mt-6 font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
            {service.title}
          </h3>
          <p className="mt-5 max-w-xl text-base text-muted md:text-lg md:leading-relaxed">
            {service.promise}
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-muted md:grid-cols-3 md:text-[15px]">
            {service.bullets.map((b) => (
              <li key={b} className="flex gap-2 border-l border-border/60 pl-3">
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CardCTA service={service} emphasis="bold" />
          </div>
        </div>

        {service.poster?.code && (
          <div className="rounded-lg border border-border bg-black/40 p-5 font-mono text-[12px] leading-relaxed text-ember-bright md:max-w-xs">
            <div className="mb-3 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ember-deep/60" />
              <span className="h-2 w-2 rounded-full bg-forge/60" />
              <span className="h-2 w-2 rounded-full bg-ember/60" />
            </div>
            <div className="text-muted">$ forge</div>
            <div className="whitespace-pre-wrap break-words text-foreground">
              {service.poster.code}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

function PlatformsCard({ service }: { service: Service }) {
  const accent = service.accent ?? 'forge'
  return (
    <article className="group relative isolate overflow-hidden rounded-2xl border border-border bg-surface/60 p-10 md:col-span-6 md:p-14">
      <Halo accent={accent} className="-top-24 -right-20 h-72 w-72" />
      <div className="relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
            <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[accent]}`} />
            {service.eyebrow}
          </div>
          <h3 className="mt-5 font-display text-3xl leading-tight tracking-tight md:text-5xl">
            {service.title}
          </h3>
          <p className="mt-5 max-w-xl text-base text-muted md:text-lg md:leading-relaxed">
            {service.promise}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted md:text-base">
            {service.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${dotClasses[accent]}`} aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <CardCTA service={service} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 md:grid-cols-4">
          {(service.platforms ?? []).map((p) => (
            <div
              key={p}
              className="flex aspect-square items-center justify-center rounded-lg border border-border bg-black/40 p-2 text-center font-mono text-[10px] text-muted transition-colors hover:border-forge/40 hover:text-foreground"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

function CardCTA({ service, emphasis = 'link' }: { service: Service; emphasis?: 'link' | 'bold' }) {
  const external = service.cta.href.startsWith('http')
  if (emphasis === 'bold') {
    return (
      <a
        href={service.cta.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className="btn-secondary text-sm"
      >
        {service.cta.label}
        <span aria-hidden>{external ? '↗' : '→'}</span>
      </a>
    )
  }
  return (
    <a
      href={service.cta.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="group/cta inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-ember-bright"
    >
      {service.cta.label}
      <span aria-hidden className="inline-block transition-transform group-hover/cta:translate-x-1">
        {external ? '↗' : '→'}
      </span>
    </a>
  )
}

function renderCard(service: Service) {
  if (service.variant === 'poster') return <PosterCard key={service.id} service={service} />
  if (service.variant === 'platforms') return <PlatformsCard key={service.id} service={service} />
  return <DefaultCard key={service.id} service={service} />
}

export function Services() {
  return (
    <section id="servicios" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
          <div>
            <span className="font-display text-6xl italic font-light leading-none text-ember md:text-7xl">
              &mdash;
            </span>
          </div>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Siete formas de trabajar conmigo.{' '}
              <span className="italic font-light text-muted">Una sola filosofía.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
              Cinco servicios y dos productos que uso yo mismo. Mezclo lo que necesites — los
              clientes buenos siempre terminan usando varios al mismo tiempo.
            </p>
          </div>
        </div>

        {/* 6-col grid — default cards span 3, posters span 6 */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:gap-6">
          {SERVICES.map(renderCard)}
        </div>
      </div>
    </section>
  )
}
