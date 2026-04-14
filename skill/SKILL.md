---
name: forja-landing
description: Construye landing pages cinematicas al nivel de carlosdominguez.com.mx con video hero de Seedance 2.0, critica anti-AI-slop automatizada y auditoria web integrada. Usar cuando el usuario pide una landing, sales page, portfolio personal, o dice "construir una landing como la de Carlos". Trae anti-AI-slop by default.
---

# forja-landing — El Skill que forja landings

Este skill construye landing pages cinematicas con la misma metodologia que uso para `carlosdominguez.com.mx`:

- **Hero con video Seedance 2.0** (MUAPI) — loop cinematografico generado on-demand
- **Tipografia editorial** — Fraunces (display) + Geist (body), mezcla italic/bold
- **Paleta anti-AI-slop** — dark negro profundo + ember amber-red, sin gradientes cliche
- **Bento asimetrico** — service cards variadas, poster cards para featured
- **Critica integrada** — auto-review contra 10 dimensiones de design quality
- **Auditoria web** — performance, a11y, SEO checks pre-deploy

## Comandos

Usar con `/forja <comando>` desde Claude Code:

| Comando | Que hace |
|---------|----------|
| `/forja build` | Entrevista + genera hero video + scaffold de componentes |
| `/forja critique` | Review anti-AI-slop + anti-patterns + sugerencias |
| `/forja audit` | Performance + a11y + SEO checks estilo Lighthouse |
| `/forja deploy` | Deploy a Vercel + custom domain + OG verification |

## Principios

1. **Copy primero, codigo despues.** El Blueprint siempre antes de componer.
2. **Anti-AI-slop by default.** No gradient buttons morado-azul, no three-identical-cards, no Inter-on-white.
3. **Typography as identity.** Serif editorial con caracter. Italic como acento.
4. **Scroll rhythm.** Cada seccion rompe con la anterior. No cuadricula monotona.
5. **Ember palette.** Dark background + amber-red acentos solo donde importa.

## Workflow

### `/forja build`

**Step 1 — Entrevista (5 min):**

```
Voy a construir tu landing. Necesito 6 datos:

1. Nombre / marca:
2. Una linea de posicionamiento:
3. 3 servicios principales:
4. Audiencia objetivo:
5. CTA primario (WhatsApp? Calendly? Formulario?):
6. Vibe visual (artesano / bold / minimal / energetico):
```

**Step 2 — Generar hero video (opcional, requiere MUAPI_API_KEY):**

Si `MUAPI_API_KEY` esta en `.env.local`:
- Pregunta si quiere video Seedance en el hero
- Si si: pide imagen de referencia (path local o URL)
- Ejecuta `scripts/generate_hero.py` que llama a MUAPI
- Descarga el MP4 a `public/hero/`

Si no hay key: salta y usa Canvas embers como fallback cinematografico.

**Step 3 — Scaffold de componentes:**

Copia las plantillas de `templates/components/` a `src/features/landing/components/`:
- `Hero`, `Services`, `Portfolio`, `Process`, `CtaFinal`, `Footer`
- `Embers` (Canvas animation)
- `Navbar` (scroll-to-pill)

**Step 4 — Copy generation:**

Basado en la entrevista, rellena `src/features/landing/data/content.ts` con:
- 3 scroll stops (problema / solucion / metodo)
- Service cards (1 lg poster + 3-4 md por default)
- Portfolio featured + rest
- Process steps

**Step 5 — Design system:**

Actualiza `src/app/globals.css` + `tailwind.config.ts` con la paleta ember + Fraunces/Geist fonts.

### `/forja critique`

Lee `routes/critique.md`. Ejecuta review contra 10 dimensiones:

1. AI Slop Detection (critico)
2. Visual Hierarchy
3. Information Architecture
4. Emotional Resonance
5. Discoverability & Affordance
6. Composition & Balance
7. Typography as Communication
8. Color with Purpose
9. States & Edge Cases
10. Microcopy & Voice

Output: reporte priorizado con issues criticos + altos + menores.

### `/forja audit`

Lee `routes/audit.md`. Ejecuta checks estilo Lighthouse:

- Performance (LCP, CLS, INP estimados)
- Accessibility (contrast, focus, aria, semantic HTML)
- SEO (metadata, sitemap, robots, JSON-LD)
- Best Practices (HTTPS, console clean, no deprecated APIs)

Output: reporte con fixes accionables por prioridad.

### `/forja deploy`

Lee `routes/deploy.md`. Guia el deploy a Vercel:

- Valida build local
- Hace commit + push si es necesario
- Ejecuta `vercel --prod`
- Configura custom domain si se especifica
- Verifica OG image en produccion

## Anti-patterns (NO hacer)

- Gradientes azul→morado en CTAs
- Three identical cards con icono generico + titulo + parrafo
- Inter 400 sobre fondo blanco puro
- "Empower your business with AI" y derivados
- Glassmorphism everywhere
- Dark mode con glowing accents "tech tech tech"
- Metric hero con emojis en lugar de numeros

## Referencia

Skill disenado por Carlos Dominguez. Fork de la metodologia Forge aplicada a landings.

- Landing demo: https://carlosdominguez.com.mx
- Forge framework: https://github.com/Carlos-Dominguez-faber/forge
- Repo skill: https://github.com/Carlos-Dominguez-faber/forja-landing
