import { CONTACT } from '../data/content'

const SOCIAL = [
  { label: 'GitHub', href: CONTACT.githubPersonal },
  { label: 'Forge', href: CONTACT.githubForge },
  { label: 'OpenClaw', href: CONTACT.githubOpenClaw },
  { label: 'Skool', href: CONTACT.skool },
  { label: 'YouTube', href: CONTACT.youtube },
  { label: 'X / Twitter', href: CONTACT.twitter },
  { label: 'TikTok', href: CONTACT.tiktok },
  { label: 'Instagram', href: CONTACT.instagram },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/80 pb-10 pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href="#top" className="inline-flex items-center gap-2 font-display text-2xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-ember">
              <path
                d="M4 16c0-2 1-3.5 2.5-4.5C8 10.5 9 10 9 7c0-2 1-3 3-3s3 1 3 3c0 3 1 3.5 2.5 4.5C19 12.5 20 14 20 16a8 8 0 1 1-16 0Z"
                fill="currentColor"
                opacity="0.22"
              />
              <path
                d="M4 16c0-2 1-3.5 2.5-4.5C8 10.5 9 10 9 7c0-2 1-3 3-3s3 1 3 3c0 3 1 3.5 2.5 4.5C19 12.5 20 14 20 16a8 8 0 1 1-16 0Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span>
              <em className="font-light italic">Carlos</em>{' '}
              <span className="font-semibold">Domínguez</span>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Software con IA forjado con método. Next.js, Claude Code, n8n, GHL y mucho café.
          </p>
          <p className="mt-6 font-mono text-xs text-dim">
            🇲🇽 Cancún, México · Sirviendo LATAM & España
          </p>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-dim">
            Navegación
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { label: 'Servicios', href: '#servicios' },
              { label: 'Portafolio', href: '#portafolio' },
              { label: 'Proceso', href: '#proceso' },
              { label: 'WhatsApp', href: CONTACT.whatsappUrl },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-muted transition-colors hover:text-foreground"
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-dim">Canales</div>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-4 border-t border-border/60 px-6 pt-6 text-xs text-dim md:flex-row md:items-center md:justify-between">
        <p>© 2026 Carlos Domínguez · Forjado con Forge · Desplegado en Vercel</p>
        <p className="font-mono">
          El código mediocre se genera. <span className="text-ember">El gran software se forja.</span>
        </p>
      </div>
    </footer>
  )
}
