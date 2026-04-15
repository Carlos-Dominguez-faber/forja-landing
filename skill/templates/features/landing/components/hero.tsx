import { CONTACT, PROOF_METRICS } from '../data/content'
import { Embers } from './embers'

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-36 pb-24 md:pt-40 md:pb-32"
    >
      {/* Background video loop — desktop only, respects reduced-motion via CSS */}
      <div className="absolute inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero/forge-poster.jpg"
          aria-hidden="true"
          className="hero-video hidden h-full w-full object-cover opacity-70 md:block"
        >
          <source src="/hero/forge-loop-720.webm" type="video/webm" />
          <source src="/hero/forge-loop.mp4" type="video/mp4" />
        </video>
        {/* Mobile: static poster only */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 md:hidden"
          style={{ backgroundImage: 'url(/hero/forge-poster.jpg)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      {/* Always-on ember particles (fallback + extra life) */}
      <div className="absolute inset-0 -z-10">
        <Embers density={0.7} />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/5 px-3 py-1 text-xs font-medium text-ember-bright backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-ember animate-ember-pulse" />
          Cancún, México · Sirviendo LATAM & España
        </div>

        <h1 className="font-display text-[12vw] leading-[0.92] tracking-[-0.03em] text-foreground sm:text-[88px] md:text-[112px] lg:text-[128px]">
          <span className="block italic font-light text-muted">Forjo</span>
          <span className="block font-semibold">software con IA.</span>
          <span className="block italic font-light">
            Automatizo <span className="ember-text not-italic font-semibold">lo que te roba horas.</span>
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">
          Agentes, SaaS y automatizaciones construidos con método —{' '}
          <span className="text-foreground">no con suerte</span>. Creador de Forge.
          Desarrollador para emprendedores y empresas de LATAM y España.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Reservar llamada de 30 min
            <span aria-hidden>→</span>
          </a>
          <a href="#servicios" className="btn-secondary">
            Ver cómo trabajo
          </a>
        </div>

        {/* Proof metrics */}
        <dl className="mt-20 grid grid-cols-1 gap-y-8 border-t border-border/60 pt-10 md:grid-cols-3 md:gap-x-10">
          {PROOF_METRICS.map((m) => (
            <div key={m.label} className="flex flex-col gap-2">
              <dt className="font-display text-5xl font-medium tracking-[-0.03em] text-foreground md:text-6xl">
                {m.value}
              </dt>
              <dd className="max-w-[26ch] text-sm text-muted md:text-base">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
