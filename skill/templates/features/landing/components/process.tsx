import { PROCESS_STEPS, MANIFESTO } from '../data/content'

export function Process() {
  return (
    <section id="proceso" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-20 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ember">
              Cómo trabajo
            </div>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Tres pasos.{' '}
              <span className="italic font-light text-muted">Una sola promesa.</span>
            </h2>
          </div>
          <p className="text-base text-muted md:text-lg">
            Si el Blueprint no te convence, no hay código. Pago del 50% al aprobar el plan,
            50% al entregar.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PROCESS_STEPS.map((step, i) => (
            <article
              key={step.n}
              className="relative flex flex-col rounded-2xl border border-border bg-surface/40 p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-ember">{step.n}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                  {step.duration}
                </span>
              </div>
              <h3 className="mt-8 font-display text-3xl leading-tight tracking-tight md:text-4xl">
                {step.title}
              </h3>
              <p className="mt-4 text-base text-muted">{step.body}</p>

              {i < PROCESS_STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-border to-transparent md:block"
                />
              )}
            </article>
          ))}
        </div>

        {/* Manifiesto strip */}
        <div className="mt-24 rounded-2xl border border-border bg-gradient-to-br from-surface/80 to-background p-8 md:p-12">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-ember" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
              Manifiesto del forjador
            </span>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 md:gap-x-12 md:gap-y-5">
            {MANIFESTO.map((m, i) => (
              <li key={m} className="flex gap-4 text-base text-muted md:text-lg">
                <span className="font-mono text-xs text-dim tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
