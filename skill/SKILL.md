---
name: forja-landing
description: Construye landing pages cinematicas para cualquier tipo de negocio — personal brand, SaaS, agencia, producto, curso, consultor, clínica — con video hero Seedance, crítica anti-AI-slop y auditoría web. Usar cuando el usuario pide construir una landing page. Adapta secciones, copy y CTAs al tipo de negocio. Anti-AI-slop by default.
---

# forja-landing — El Skill que forja landings

Este skill construye landing pages cinematicas con la misma calidad que `carlosdominguez.com.mx`, adaptadas a cualquier tipo de negocio:

- **Personal brand / consultor** — hero centrado en la persona, about fuerte, servicios, casos
- **SaaS / producto digital** — features bento, proceso, lead magnet, CTA de trial/demo
- **Agencia / estudio** — portafolio de proyectos, servicios, equipo, proceso
- **Producto físico** — catálogo visual, ventajas, social proof, compra directa
- **Curso / comunidad** — propuesta de valor, a quién va, contenido, acceso
- **Clínica / servicio local** — servicios, proceso, confianza, cita/contacto

Lo que **nunca** cambia:
- **Video hero Seedance 2.0** (MUAPI) — loop cinematográfico generado on-demand
- **Tipografía editorial** — Fraunces (display) + Geist (body), mezcla italic/bold
- **Paleta anti-AI-slop** — dark negro profundo + ember amber-red, sin gradientes cliché
- **Bento asimétrico** — cards variadas, poster cards para destacados
- **Crítica integrada** — auto-review contra 10 dimensiones de design quality
- **Auditoría web** — performance, a11y, SEO checks pre-deploy

## Comandos

Usar con `/forja <comando>` desde Claude Code:

| Comando | Que hace |
|---------|----------|
| `/forja build` | Entrevista + selección de secciones + hero video + scaffold adaptado |
| `/forja critique` | Review anti-AI-slop + anti-patterns + sugerencias |
| `/forja polish` | Aplica fixes automáticos del critique |
| `/forja audit` | Performance + a11y + SEO checks estilo Lighthouse |
| `/forja deploy` | Deploy a Vercel + custom domain + OG verification |

## Secciones disponibles

El skill incluye estas secciones. `/forja build` selecciona las correctas según el tipo de landing:

| Sección | Cuándo incluir |
|---------|----------------|
| `Hero` | Siempre |
| `ScrollStops` | Siempre — problema / solución / método |
| `About` | Personal brand, consultor, clínica, agencia |
| `Services` | Cualquiera que venda servicios o features |
| `Portfolio` | Agencia, dev, diseñador, consultor con casos |
| `Process` | Cuando el "cómo trabajamos" es diferenciador |
| `LeadMagnet` | SaaS, curso, consultor — captura de emails |
| `Communities` | Curso, comunidad, membresía |
| `CtaFinal` | Siempre |
| `Footer` | Siempre |

## Principios

1. **Copy primero, código después.** El Blueprint siempre antes de componer.
2. **Anti-AI-slop by default.** No gradient buttons morado-azul, no three-identical-cards, no Inter-on-white.
3. **Typography as identity.** Serif editorial con carácter. Italic como acento.
4. **Scroll rhythm.** Cada sección rompe con la anterior. No cuadrícula monótona.
5. **Ember palette.** Dark background + amber-red acentos solo donde importa.
6. **Adaptar, no imponer.** Las secciones se eligen según el negocio. No todos necesitan Portfolio o Communities.

## Workflow

### `/forja build`

**Step 1 — Tipo de landing + identidad (Bloque 1):**

```
¿Qué tipo de landing estamos construyendo?
  A. Personal brand / consultor / freelance
  B. SaaS o producto digital
  C. Agencia o estudio creativo
  D. Producto físico / ecommerce
  E. Curso o comunidad
  F. Clínica o servicio local
  G. Otro (describílo)

1. ¿Cómo te llamás / cómo se llama tu marca?
2. Una línea de posicionamiento (30-40 palabras):
3. ¿Para quién? (audiencia específica):
```

**Step 2 — Oferta y estilo (Bloque 2):**

```
4. Listá 2-4 servicios, productos o features principales (1 línea cada uno):
5. ¿Cuál es el CTA primario? (WhatsApp / Calendly / compra directa / formulario / demo):
6. Vibe visual: artesano · bold · minimal · energético — o describílo:
```

**Step 3 — Section selector (propuesta antes de construir):**

Basado en el tipo de landing y las respuestas, propone:
- Las secciones recomendadas en orden
- 3 opciones de H1 con estructura italic/bold en Fraunces
- El prompt de Seedance adaptado al vibe

Espera confirmación del usuario antes de ejecutar.

**Step 4 — Hero video con Seedance (opcional):**

Si `MUAPI_API_KEY` está en `.env.local`:
- Ejecuta `scripts/generate_hero.py` con el prompt adaptado al vibe
- Descarga el MP4 a `public/hero/`

Si no hay key: Canvas Embers como fallback cinematográfico.

**Step 5 — Scaffold de componentes:**

Copia solo las secciones seleccionadas de `templates/components/` a `src/features/landing/components/`.

**Step 6 — Copy generation:**

Rellena `src/features/landing/data/content.ts` con copy real basado en la entrevista. Sin placeholders.

**Step 7 — Design system:**

Actualiza `src/app/globals.css` + `tailwind.config.ts` con la paleta ember + Fraunces/Geist.

### `/forja critique`

Lee `routes/critique.md`. Ejecuta review contra 10 dimensiones:

1. AI Slop Detection (crítico)
2. Visual Hierarchy
3. Information Architecture
4. Emotional Resonance
5. Discoverability & Affordance
6. Composition & Balance
7. Typography as Communication
8. Color with Purpose
9. States & Edge Cases
10. Microcopy & Voice

Output: reporte priorizado con issues críticos + altos + menores.

### `/forja audit`

Lee `routes/audit.md`. Ejecuta checks estilo Lighthouse:

- Performance (LCP, CLS, INP estimados)
- Accessibility (contrast, focus, aria, semantic HTML)
- SEO (metadata, sitemap, robots, JSON-LD)
- Best Practices (HTTPS, console clean, no deprecated APIs)

### `/forja deploy`

Lee `routes/deploy.md`. Guía el deploy a Vercel:

- Valida build local
- Hace commit + push si es necesario
- Ejecuta `vercel --prod`
- Configura custom domain si se especifica
- Verifica OG image en producción

## Anti-patterns (NO hacer)

- Gradientes azul→morado en CTAs
- Three identical cards con ícono genérico + título + párrafo
- Inter 400 sobre fondo blanco puro
- "Empower your business with AI" y derivados
- Glassmorphism everywhere
- Dark mode con glowing accents "tech tech tech"
- Metric hero con emojis en lugar de números
- Secciones de Portfolio cuando el negocio no tiene casos que mostrar
- Sección Communities cuando no hay comunidad real

## Referencia

Skill diseñado por Carlos Domínguez. Metodología Forge aplicada a landings.

- Landing demo: https://carlosdominguez.com.mx
- Repo skill: https://github.com/Carlos-Dominguez-faber/forja-landing
