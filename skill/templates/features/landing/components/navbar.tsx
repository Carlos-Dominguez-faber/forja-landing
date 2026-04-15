'use client'

import { useEffect, useState } from 'react'
import { CONTACT } from '../data/content'

const LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Guía gratis', href: '#guia' },
  { label: 'Imperio Digital', href: '#imperio' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <nav
        className={`mt-4 flex items-center gap-6 transition-all duration-500 ${
          scrolled
            ? 'w-[min(860px,calc(100%-2rem))] rounded-full border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-xl'
            : 'w-[min(1200px,calc(100%-2rem))] rounded-2xl border border-transparent px-6 py-3'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 font-display text-lg tracking-tight">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-ember"
          >
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

        <ul className="ml-auto hidden items-center gap-6 text-sm text-muted md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary text-sm"
        >
          Hablemos
          <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  )
}
