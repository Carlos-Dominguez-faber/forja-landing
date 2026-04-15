import Image from 'next/image'
import { ABOUT, CONTACT } from '../data/content'

export function About() {
  return (
    <section id="sobre-mi" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[360px_1fr] md:gap-16 md:items-center">
          <div className="relative mx-auto w-full max-w-[360px]">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-gradient-radial from-ember/25 via-ember/5 to-transparent blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.25), transparent 70%)' }}
            />
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src="/imgs/carlos.jpg"
                alt="Carlos Domínguez — retrato"
                fill
                sizes="(min-width: 768px) 360px, 100vw"
                priority={false}
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full border border-ember/40 bg-background/90 backdrop-blur">
              <span className="font-display text-3xl italic text-ember">CD</span>
            </div>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
              §  Sobre mí
            </span>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl">
              {ABOUT.greeting}
            </h2>
            <div className="mt-6 space-y-5 text-base text-muted md:text-lg md:leading-relaxed">
              {ABOUT.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-6 font-mono text-xs tracking-wider text-dim">🇲🇽 {ABOUT.signature}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-sm"
              >
                Escríbeme por WhatsApp
                <span aria-hidden>→</span>
              </a>
              <a href="#portafolio" className="btn-secondary text-sm">
                Ver proyectos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
