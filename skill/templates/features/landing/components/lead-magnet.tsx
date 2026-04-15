'use client'

import { useState } from 'react'
import { LEAD_MAGNET } from '../data/content'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function LeadMagnet() {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    setError(null)

    const formData = new FormData(event.currentTarget)
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      segment: String(formData.get('segment') || 'otro'),
      source: 'landing-carlos',
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'unknown_error')
        setState('error')
        return
      }
      setState('success')
    } catch {
      setError('network_error')
      setState('error')
    }
  }

  return (
    <section id="guia" className="relative isolate py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#120a01]/40 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.15fr_1fr] md:gap-20">
          {/* Left — copy + modules */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
              §  {LEAD_MAGNET.eyebrow}
            </span>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
              {LEAD_MAGNET.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted md:text-xl">
              {LEAD_MAGNET.subtitle}
            </p>

            <ul className="mt-10 space-y-5">
              {LEAD_MAGNET.modules.map((m) => (
                <li key={m.n} className="grid gap-2 border-t border-border/60 pt-5 md:grid-cols-[60px_160px_1fr] md:gap-6">
                  <span className="font-display text-lg italic font-light text-ember">
                    {m.n}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground md:pt-1">
                    {m.label}
                  </span>
                  <span className="text-sm text-muted md:text-base">{m.body}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form card */}
          <aside className="relative">
            <div className="sticky top-28 rounded-2xl border border-ember/30 bg-gradient-to-br from-[#1a0f03] via-[#150a00]/90 to-background p-8 md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3), transparent 65%)' }}
              />

              <div className="relative">
                {state === 'success' ? (
                  <SuccessState />
                ) : (
                  <>
                    <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                      {LEAD_MAGNET.formTitle}
                    </h3>
                    <p className="mt-3 text-sm text-muted">
                      Llega a tu correo en los próximos minutos.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <Field
                        name="name"
                        label="Nombre"
                        type="text"
                        required
                        autoComplete="given-name"
                        placeholder="Tu nombre"
                      />
                      <Field
                        name="email"
                        label="Email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="tu@correo.com"
                      />
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="segment"
                          className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim"
                        >
                          ¿Qué haces?
                        </label>
                        <select
                          id="segment"
                          name="segment"
                          required
                          defaultValue=""
                          className="rounded-lg border border-border bg-black/40 px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-ember focus-visible:ring-2 focus-visible:ring-ember/50"
                        >
                          <option value="" disabled>
                            Elige una opción…
                          </option>
                          {LEAD_MAGNET.segmentOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={state === 'loading'}
                        className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {state === 'loading' ? 'Enviando…' : 'Mándamela al correo'}
                        {state !== 'loading' && <span aria-hidden>→</span>}
                      </button>

                      {state === 'error' && (
                        <p className="font-mono text-xs text-ember-deep" role="alert">
                          Algo falló ({error}). Intenta de nuevo o escríbeme por WhatsApp.
                        </p>
                      )}
                    </form>

                    <p className="mt-6 font-mono text-[10px] leading-relaxed text-dim">
                      {LEAD_MAGNET.footnote}
                    </p>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Field({
  name,
  label,
  ...inputProps
}: {
  name: string
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="rounded-lg border border-border bg-black/40 px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-ember focus-visible:ring-2 focus-visible:ring-ember/50"
        {...inputProps}
      />
    </div>
  )
}

function SuccessState() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ember/40 bg-ember/10 text-ember">
          ✓
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
          Confirmado
        </span>
      </div>
      <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight md:text-3xl">
        {LEAD_MAGNET.successTitle}
      </h3>
      <p className="mt-4 text-base text-muted">{LEAD_MAGNET.successBody}</p>
      <p className="mt-6 font-mono text-xs text-dim">
        ¿Ya quieres empezar? Escríbeme por{' '}
        <a
          href="https://wa.me/522205671807"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4 decoration-ember/40 transition-colors hover:text-ember-bright"
        >
          WhatsApp
        </a>
        .
      </p>
    </div>
  )
}
