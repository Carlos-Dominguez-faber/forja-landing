/**
 * Content-as-data for the landing page.
 *
 * /forja build fills this with your real copy during the interview.
 * Everything is marked with {{PLACEHOLDER}} so it's easy to spot.
 */

export const CONTACT = {
  whatsappNumber: '{{PHONE_DIGITS}}',
  whatsappUrl:
    'https://wa.me/{{PHONE_DIGITS}}?text=Hola%2C%20vengo%20de%20tu%20landing.',
  github: 'https://github.com/{{GITHUB_HANDLE}}',
  skool: '#',
  youtube: '#',
  twitter: '#',
  tiktok: '#',
  instagram: '#',
  email: '{{EMAIL}}',
} as const

export const PROOF_METRICS = [
  { value: '{{METRIC_1}}', label: '{{METRIC_1_LABEL}}' },
  { value: '{{METRIC_2}}', label: '{{METRIC_2_LABEL}}' },
  { value: '{{METRIC_3}}', label: '{{METRIC_3_LABEL}}' },
]

export const SCROLL_STOPS = [
  {
    tag: 'Diagnóstico',
    title: '{{PROBLEM_TITLE}}',
    body: '{{PROBLEM_BODY}}',
  },
  {
    tag: 'Solución',
    title: '{{SOLUTION_TITLE}}',
    body: '{{SOLUTION_BODY}}',
  },
  {
    tag: 'Método',
    title: '{{METHOD_TITLE}}',
    body: '{{METHOD_BODY}}',
  },
]

export type Service = {
  id: string
  eyebrow: string
  title: string
  promise: string
  bullets: string[]
  cta: { label: string; href: string }
  span: 'sm' | 'md' | 'lg'
  accent?: 'ember' | 'forge' | 'deep'
  variant?: 'default' | 'poster' | 'platforms'
  poster?: { code?: string; caption?: string }
  platforms?: string[]
}

export const SERVICES: Service[] = [
  {
    id: 'service-1',
    eyebrow: 'Servicio · {{EYEBROW_1}}',
    title: '{{SERVICE_1_TITLE}}',
    promise: '{{SERVICE_1_PROMISE}}',
    bullets: ['{{SERVICE_1_BULLET_1}}', '{{SERVICE_1_BULLET_2}}', '{{SERVICE_1_BULLET_3}}'],
    cta: { label: 'Más detalles', href: CONTACT.whatsappUrl },
    span: 'md',
    accent: 'ember',
  },
  {
    id: 'service-2',
    eyebrow: 'Servicio · {{EYEBROW_2}}',
    title: '{{SERVICE_2_TITLE}}',
    promise: '{{SERVICE_2_PROMISE}}',
    bullets: ['{{SERVICE_2_BULLET_1}}', '{{SERVICE_2_BULLET_2}}', '{{SERVICE_2_BULLET_3}}'],
    cta: { label: 'Más detalles', href: CONTACT.whatsappUrl },
    span: 'md',
    accent: 'deep',
  },
  {
    id: 'hero-service',
    eyebrow: 'Flagship · {{FLAGSHIP_EYEBROW}}',
    title: '{{FLAGSHIP_TITLE}}',
    promise: '{{FLAGSHIP_PROMISE}}',
    bullets: ['{{FLAGSHIP_BULLET_1}}', '{{FLAGSHIP_BULLET_2}}', '{{FLAGSHIP_BULLET_3}}'],
    cta: { label: '{{FLAGSHIP_CTA_LABEL}}', href: '{{FLAGSHIP_CTA_HREF}}' },
    span: 'lg',
    accent: 'ember',
    variant: 'poster',
    poster: {
      code: '{{FLAGSHIP_CODE_SNIPPET}}',
      caption: '{{FLAGSHIP_CAPTION}}',
    },
  },
]

export type PortfolioItem = {
  name: string
  summary: string
  stack: string[]
  link?: { label: string; href: string }
  status?: string
  featured?: boolean
  role?: string
}

export const PORTFOLIO_FEATURED: PortfolioItem[] = [
  {
    name: '{{PROJECT_1_NAME}}',
    summary: '{{PROJECT_1_SUMMARY}}',
    stack: ['{{TECH_1}}', '{{TECH_2}}', '{{TECH_3}}'],
    status: '{{PROJECT_1_STATUS}}',
    role: '{{PROJECT_1_ROLE}}',
    featured: true,
  },
  {
    name: '{{PROJECT_2_NAME}}',
    summary: '{{PROJECT_2_SUMMARY}}',
    stack: ['{{TECH_1}}', '{{TECH_2}}'],
    status: '{{PROJECT_2_STATUS}}',
    role: '{{PROJECT_2_ROLE}}',
    featured: true,
  },
  {
    name: '{{PROJECT_3_NAME}}',
    summary: '{{PROJECT_3_SUMMARY}}',
    stack: ['{{TECH_1}}', '{{TECH_2}}'],
    status: '{{PROJECT_3_STATUS}}',
    role: '{{PROJECT_3_ROLE}}',
    featured: true,
  },
]

export const PORTFOLIO_REST: PortfolioItem[] = [
  {
    name: '{{SMALLER_PROJECT_1}}',
    summary: '{{SMALLER_PROJECT_1_SUMMARY}}',
    stack: ['{{TECH}}'],
    status: '{{STATUS}}',
  },
]

export const LEAD_MAGNET = {
  eyebrow: 'Guía gratis',
  title: '{{LEAD_MAGNET_TITLE}}',
  subtitle: '{{LEAD_MAGNET_SUBTITLE}}',
  modules: [
    { n: '01', label: '{{MODULE_1_LABEL}}', body: '{{MODULE_1_BODY}}' },
    { n: '02', label: '{{MODULE_2_LABEL}}', body: '{{MODULE_2_BODY}}' },
    { n: '03', label: '{{MODULE_3_LABEL}}', body: '{{MODULE_3_BODY}}' },
  ],
  formTitle: 'Mándamela por correo',
  segmentOptions: [
    { value: 'founder', label: 'Founder / CEO' },
    { value: 'marketer', label: 'Marketer' },
    { value: 'agency', label: 'Dueño de agencia' },
    { value: 'builder', label: 'Builder / Developer' },
    { value: 'otro', label: 'Otro' },
  ],
  footnote: 'Sin spam · Unsubscribe en un click',
  successTitle: 'Listo. Te mandé la guía.',
  successBody:
    'Revisa tu correo en los próximos minutos. Vas a ver una serie de emails breves las próximas 2 semanas.',
}

export const PROCESS_STEPS = [
  {
    n: '01',
    title: '{{STEP_1_TITLE}}',
    duration: '{{STEP_1_DURATION}}',
    body: '{{STEP_1_BODY}}',
  },
  {
    n: '02',
    title: '{{STEP_2_TITLE}}',
    duration: '{{STEP_2_DURATION}}',
    body: '{{STEP_2_BODY}}',
  },
  {
    n: '03',
    title: '{{STEP_3_TITLE}}',
    duration: '{{STEP_3_DURATION}}',
    body: '{{STEP_3_BODY}}',
  },
]

export const MANIFESTO = [
  '{{MANIFESTO_1}}',
  '{{MANIFESTO_2}}',
  '{{MANIFESTO_3}}',
  '{{MANIFESTO_4}}',
  '{{MANIFESTO_5}}',
]

export const ABOUT = {
  greeting: 'Hola, soy {{YOUR_NAME}}.',
  body: ['{{ABOUT_BODY_1}}', '{{ABOUT_BODY_2}}'],
  signature: '{{CITY}}, {{COUNTRY}} · {{AREA_SERVED}}',
}

export const IMPERIO = {
  eyebrow: 'También enseño',
  title: '{{COMMUNITY_TITLE}}',
  body: '{{COMMUNITY_BODY}}',
  bullets: ['{{COMMUNITY_BULLET_1}}', '{{COMMUNITY_BULLET_2}}', '{{COMMUNITY_BULLET_3}}'],
  cta: { label: 'Únete', href: CONTACT.skool },
  stat: '{{COMMUNITY_STAT}}',
  statLabel: '{{COMMUNITY_STAT_LABEL}}',
}
