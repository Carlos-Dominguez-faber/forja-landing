import type { Metadata } from 'next'
import { Fraunces, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('{{SITE_URL}}'),
  title: '{{META_TITLE}}',
  description: '{{META_DESCRIPTION}}',
  alternates: { canonical: '/' },
  authors: [{ name: '{{YOUR_NAME}}', url: '{{SITE_URL}}' }],
  creator: '{{YOUR_NAME}}',
  openGraph: {
    title: '{{META_TITLE}}',
    description: '{{META_DESCRIPTION}}',
    url: '{{SITE_URL}}',
    siteName: '{{YOUR_NAME}}',
    locale: 'es_MX',
    type: 'website',
    images: [{ url: '/og/og.jpg', width: 1200, height: 630, alt: '{{META_TITLE}}' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '{{META_TITLE}}',
    description: '{{META_DESCRIPTION}}',
    images: ['/og/og.jpg'],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': '{{SITE_URL}}/#me',
      name: '{{YOUR_NAME}}',
      url: '{{SITE_URL}}',
      image: '{{SITE_URL}}/imgs/me.jpg',
      jobTitle: '{{JOB_TITLE}}',
      description: '{{ABOUT_SHORT}}',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '{{CITY}}',
        addressCountry: '{{COUNTRY_CODE}}',
      },
    },
    {
      '@type': 'WebSite',
      '@id': '{{SITE_URL}}/#site',
      url: '{{SITE_URL}}',
      name: '{{YOUR_NAME}}',
      inLanguage: '{{LANG}}',
      publisher: { '@id': '{{SITE_URL}}/#me' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
