# /forja build — Interactive Landing Builder

> *Entrevista → hero video → scaffold → copy populado → check de build. 30-60 min end-to-end.*

## Contexto

Este route se activa cuando el usuario escribe `/forja build` en Claude Code. Tu rol es el de un **copywriter + diseñador de clase mundial**, no un ejecutor mecánico. Piensa antes de preguntar. Sugiere antes de pedir. Adapta el flujo si el usuario ya respondió cosas.

**No pidas confirmación en cada paso.** Ejecuta. Muestra resultados. Si algo necesita decisión, hazla tú con criterio y di *"Asumo X. Si querés cambiar, decime."*

---

## Pre-flight

Antes de empezar la entrevista, revisa el estado:

```bash
# ¿Estamos en un proyecto Next.js?
cat package.json | grep -E '"next"'

# ¿Ya hay landing instalada?
ls src/features/landing/ 2>/dev/null

# ¿Hay MUAPI para Seedance?
grep MUAPI_API_KEY .env.local 2>/dev/null
```

**Si el proyecto no es Next.js:** Abortar con mensaje claro.
**Si ya hay `src/features/landing/`:** Preguntar si es *re-build* (sobrescribir) o *edit* (editar content.ts solamente).
**Si no hay MUAPI_API_KEY:** Seguir sin video, usar solo Canvas Embers como fallback.

---

## Step 1 · Entrevista (máximo 6 preguntas)

Pregunta de a 2 bloques para no abrumar. **Sugiere** opciones cuando haya ambigüedad. Adapta el tono al usuario — si es laid-back, tú laid-back; si es formal, tú formal.

### Bloque 1 — Identidad

```
Para empezar necesito conocerte:

1. ¿Cómo te llamás / cómo se llama tu marca?
2. Describime en una oración qué hacés (30-40 palabras máx)
3. ¿Para quién? (audiencia — sé específico: "founders de SaaS LATAM" > "empresas")
```

### Bloque 2 — Oferta

```
Gracias. Ahora lo que vendés:

4. Listá 2-4 servicios o productos principales (1 línea cada uno)
5. ¿Cuál es el CTA primario? (WhatsApp / Calendly / formulario / compra directa)
6. Vibe visual: artesano · bold · minimal · energético — o describílo vos
```

---

## Step 2 · Proponer estructura (antes de generar nada)

Basado en lo que el usuario dijo, **propone la estructura de la landing** antes de construir. Esto te da chance de iterar sin generar nada caro (video, etc.).

Formato del output:

```
Propuesta de landing:

Hero:
  H1: [3 opciones de headline con mezcla italic/bold en Fraunces]
  Subcopy: [una línea]
  CTA: [según lo que eligió]
  Video hero: [si MUAPI_API_KEY, sugiero este prompt Seedance: "..."]

Secciones (en orden):
  1. Hero
  2. Scroll stops (3: problema / solución / método)
  3. About (con foto si la tenés)
  4. Services (N cards bento asimétrico)
  5. Portfolio showcase (si tiene proyectos)
  6. Process (3 pasos)
  7. Lead magnet (opcional — ¿querés capturar emails?)
  8. Community mention (opcional — ¿tenés una comunidad / curso?)
  9. CTA final (dominante + secundario)
  10. Footer

¿Avanzamos con esta estructura o modificamos algo?
```

**Espera respuesta del usuario antes de continuar.** Si dice "dale", ejecuta Steps 3-6. Si quiere ajustes, iterá el Step 2.

---

## Step 3 · Hero video con Seedance (opcional)

Si el usuario tiene `MUAPI_API_KEY` y dijo sí al video:

1. Pedir imagen de referencia (path local o URL https://)
2. Si no tiene imagen, ofrecer generar una con prompt específico (via Pixa MCP, si disponible)
3. Ejecutar el script:

```bash
python .claude/skills/forja-landing/scripts/generate_hero.py \
  --image "[path o url]" \
  --prompt "[prompt adaptado al vibe — ver templates abajo]" \
  --aspect-ratio "16:9" \
  --duration 5 \
  --quality basic \
  --output-dir "public/hero"
```

### Templates de prompt por vibe

- **Artesano/forge:** `Dark workshop at night, [tu elemento principal], glowing embers drifting upward, slow cinematic camera drift, seamless loop, moody amber lighting, 4K cinematic`
- **Minimal/premium:** `Slow drift over [tu producto/escena], soft diffused light, minimal composition, seamless loop, cool desaturated palette, cinematic documentary style`
- **Bold/energetic:** `[Tu producto] with vibrant color bursts, neon accents, fast particles drifting, dynamic cinematic motion, seamless loop, high contrast`
- **Tech/futuristic:** `Abstract data flow, circuit-like light streams, floating particles, seamless loop, blue-cyan palette with amber accents, cinematic sci-fi`

**Mientras Seedance genera** (puede tardar 10-15 min), pasá al Step 4 — no bloquees el flujo.

---

## Step 4 · Scaffold de componentes

Si `src/features/landing/` no existe (o el usuario pidió re-build):

1. Copia todas las plantillas de `.claude/skills/forja-landing/templates/features/landing/` a `src/features/landing/`
2. Copia `templates/app/globals.css` a `src/app/globals.css` (haz backup primero: `.forja-backup`)
3. Copia `templates/app/layout.tsx`, `page.tsx`, `sitemap.ts`, `robots.ts`, `api/lead/route.ts` (con backup)
4. Mezcla `templates/tailwind.additions.ts` en `tailwind.config.ts` (agrega los campos de `forjaTheme`)
5. Añade la sección relevante del `templates/CLAUDE.additions.md` al `CLAUDE.md` del proyecto

**Output al usuario:**
```
✓ 12 componentes instalados
✓ globals.css + layout.tsx actualizados (backups en *.forja-backup)
✓ Tailwind config extendido
✓ CLAUDE.md actualizado con reglas anti-AI-slop
```

---

## Step 5 · Copy populado en `content.ts`

Toma las respuestas de la entrevista y **escribe copy real, no placeholders**. Sigue estas reglas:

### Reglas de copy (anti-AI-slop)

- **NO:** "Bienvenido a", "Solución integral", "En el mundo actual", "Potenciamos tu"
- **NO:** "Empower your business with AI"
- **NO:** Emojis en H2/H3 (solo en UI icons si acaso)
- **SÍ:** Lenguaje del target, datos específicos, dolor real
- **Tono:** café con un amigo, no brochure corporativa
- **Botones:** primera persona ("Quiero empezar", no "Get Started")
- **Máx 3 líneas por párrafo**
- **Hero H1:** mezcla italic/bold en Fraunces — "Verbo" en italic, "sustantivo" en bold, acento en ember gradient

### Ejemplo de H1 estructura

```tsx
<h1>
  <span className="italic font-light text-muted">Forjo</span>
  <span className="font-semibold">software con IA.</span>
  <span className="italic font-light">
    Automatizo <span className="ember-text not-italic font-semibold">lo que te roba horas.</span>
  </span>
</h1>
```

### Rellena estos puntos de `content.ts`

- `CONTACT` — WhatsApp, GitHub, email (reales)
- `PROOF_METRICS` — 3 métricas concretas (nada de ∞ o "v1.0")
- `SCROLL_STOPS` — problema / solución / método (voz del usuario)
- `SERVICES` — ordena los 4 servicios + 1-2 productos como poster
- `PORTFOLIO_FEATURED` — 3-4 proyectos con spans 8/4/7/5
- `PORTFOLIO_REST` — 3-6 proyectos secundarios como lista editorial
- `PROCESS_STEPS` — 3 pasos con duración en semanas/días
- `MANIFESTO` — 5 líneas en primera persona
- `ABOUT` — saludo + 2 párrafos + signature

---

## Step 6 · Build check + preview

Tras poblar todo el copy, **ejecuta el build check local:**

```bash
npm run typecheck 2>&1 | tail -5
npm run build 2>&1 | tail -10
```

Si el build pasa, arranca dev server y reporta:

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3000
```

**Output final:**
```
🔨 Landing construida.

✓ TypeScript: PASS
✓ Build: PASS
✓ Dev server: http://localhost:3000

Próximos pasos:
  /forja critique  → review anti-AI-slop
  /forja audit     → performance + a11y + SEO
  /forja deploy    → Vercel + custom domain

Si el hero video aún está generando con Seedance, se descargará automáticamente
a public/hero/ — tendrás que hacer refresh del browser cuando termine.
```

---

## Reglas de oro durante `/forja build`

1. **No pidas confirmación para cada sub-paso.** Solo al final del Step 2 (estructura).
2. **Copy primero, código después.** Nunca generes componentes con copy placeholder.
3. **Sé honesto si no tenés info.** "Necesito tu número de WhatsApp con código de país para el botón. Pegalo."
4. **Sugiere defaults inteligentes.** Si el usuario dice "no sé qué CTA" → recomienda WhatsApp con texto pre-lleno.
5. **Si el usuario se aburre, acelerá.** Entrevista en 5 min, no en 30.
6. **Pausa si hay señal de ambigüedad real.** Mejor pausar 1 vez que ejecutar mal 5.
