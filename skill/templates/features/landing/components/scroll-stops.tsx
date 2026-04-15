import { SCROLL_STOPS } from '../data/content'

export function ScrollStops() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-20 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
            <span className="italic font-light text-foreground/85">El problema no es la IA.</span>{' '}
            <span className="text-foreground">Es construir sin pensar.</span>
          </h2>
          <p className="text-sm text-dim md:max-w-xs">
            El vibe coding es rápido la primera semana. A la cuarta, te cobra intereses.
          </p>
        </div>

        <ol className="relative space-y-12 md:space-y-0">
          {SCROLL_STOPS.map((s, i) => (
            <li
              key={s.tag}
              className="group relative grid gap-6 border-t border-border/60 pt-10 md:grid-cols-[120px_160px_1fr] md:gap-10 md:pt-14"
            >
              <div className="font-mono text-sm text-ember">
                <span className="mr-2 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.tag}
              </div>
              <div className="font-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
                {s.title}
              </div>
              <p className="text-base text-foreground/85 md:text-lg md:leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
