# /forja build — Interactive Landing Builder

> *Entrevista → section selector → hero video → scaffold adaptado → copy populado → check de build. 30-60 min end-to-end.*

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

## Step 1 · Entrevista — Bloque 1: Tipo + Identidad

Empieza con esto. **No preguntes los dos bloques juntos** — esperá a que responda el Bloque 1 antes de preguntar el Bloque 2.

```
Para construir tu landing necesito entenderte primero.

¿Qué tipo de landing es?
  A. Personal brand / consultor / freelance
  B. SaaS o producto digital
  C. Agencia o estudio creativo
  D. Producto físico / ecommerce
  E. Curso o comunidad
  F. Clínica o servicio local
  G. Otro — describílo brevemente

Y mientras respondés eso:

1. ¿Cómo te llamás / cómo se llama tu marca?
2. En una oración, ¿qué hacés? (30-40 palabras máx — sé específico)
3. ¿Para quién? (audiencia concreta: "founders de SaaS en LATAM" > "empresas")
```

---

## Step 2 · Entrevista — Bloque 2: Oferta + Estilo

```
Gracias. Ahora lo que ofrecés:

4. Listá 2-4 servicios, productos o features principales (1 línea cada uno)
5. ¿Cuál es el CTA primario?
   WhatsApp · Calendly · formulario · compra directa · demo/trial · suscripción
6. Vibe visual: artesano · bold · minimal · energético — o describílo
```

---

## Step 3 · Section Selector — proponer estructura

Basado en el tipo de landing y las respuestas, **propone la selección de secciones** antes de construir nada. Usa esta tabla como guía (no es obligatoria — usá criterio):

| Tipo de landing | Secciones recomendadas |
|----------------|------------------------|
| Personal brand / consultor | Hero · ScrollStops · About · Services · Portfolio · Process · CtaFinal · Footer |
| SaaS / producto digital | Hero · ScrollStops · Services (features) · Process · LeadMagnet · CtaFinal · Footer |
| Agencia / estudio | Hero · ScrollStops · Services · Portfolio · About · Process · CtaFinal · Footer |
| Producto físico | Hero · ScrollStops · Services (catálogo/ventajas) · About · CtaFinal · Footer |
| Curso / comunidad | Hero · ScrollStops · About · Communities · LeadMagnet · CtaFinal · Footer |
| Clínica / servicio local | Hero · ScrollStops · Services · Process · About · CtaFinal · Footer |

**Formato del output:**

```
Propuesta para [Nombre/Marca]:

Hero:
  H1 (opción 1): [Fraunces italic/bold, acento ember]
  H1 (opción 2): [variante]
  H1 (opción 3): [variante más arriesgada]
  Subcopy: [una línea]
  CTA: [según lo que eligió, texto en primera persona]
  Video hero: [si MUAPI_API_KEY → prompt Seedance adaptado al vibe]

Secciones (en orden):
  1. Hero
  2. ScrollStops — [tema: qué problema/solución/método]
  3. [siguiente sección] — [qué contenido va aquí]
  ...
  N. CtaFinal — [CTA dominante + secundario]
  N+1. Footer

Secciones que NO incluyo (y por qué):
  - Portfolio: no mencionaste proyectos que mostrar
  - Communities: no hay comunidad que comunicar
  [etc.]

¿Avanzamos con esta estructura o ajustamos algo?
```

**Esperá respuesta del usuario.** Si dice "dale", ejecutá Steps 4-7. Si quiere ajustes, iterá este step.

---

## Step 4 · Hero video con Seedance (opcional)

Si el usuario tiene `MUAPI_API_KEY` y dijo sí al video:

1. Pedir imagen de referencia (path local o URL https://)
2. **Si no tiene imagen, ofrecer auto-generarla:**
   - Si tiene `OPENROUTER_API_KEY` en `.env.local`:
     ```bash
     python .claude/skills/forja-landing/scripts/generate_reference_image.py \
       --vibe [artesano|minimal|bold|tech|premium] \
       --subject "[descripción del subject según tipo de landing]" \
       --output public/hero/reference.jpg
     ```
   - Si no tiene OpenRouter key: sugerir Pixa MCP, Unsplash, o continuar sin video
3. Ejecutar el script:

```bash
python .claude/skills/forja-landing/scripts/generate_hero.py \
  --image "[path o url]" \
  --prompt "[prompt adaptado al vibe y tipo de landing]" \
  --aspect-ratio "16:9" \
  --duration 5 \
  --quality basic \
  --output-dir "public/hero"
```

### Templates de prompt Seedance por vibe y tipo

- **Artesano / consultor / agencia:** `Dark workshop at night, [elemento central del negocio], glowing embers drifting upward, slow cinematic camera drift, seamless loop, moody amber lighting, 4K cinematic`
- **Minimal / SaaS / producto digital:** `Slow drift over [tu producto o interfaz], soft diffused light, minimal composition, seamless loop, cool desaturated palette, cinematic documentary style`
- **Bold / curso / comunidad:** `[Tu imagen de marca] with warm amber bursts, dynamic energy particles drifting, seamless loop, high contrast dark background, cinematic editorial`
- **Premium / clínica / servicio local:** `Elegant [espacio o producto] with soft warm light, gentle camera drift, clean composition, seamless loop, warm gold tones, cinematic luxury`
- **Energético / producto físico:** `[Producto] in motion, vibrant amber accents, fast particles drifting, dynamic cinematic motion, seamless loop, high contrast`

**Mientras Seedance genera** (puede tardar 10-15 min), pasá al Step 5 — no bloquees el flujo.

---

## Step 5 · Scaffold de componentes

Si `src/features/landing/` no existe (o el usuario pidió re-build):

1. Copia **solo las secciones seleccionadas en Step 3** de `.claude/skills/forja-landing/templates/features/landing/` a `src/features/landing/`
2. Siempre incluye: `Hero`, `Embers` (Canvas), `Navbar` (scroll-to-pill), `CtaFinal`, `Footer`
3. Incluye condicionalmente: `About`, `Services`, `Portfolio`, `Process`, `LeadMagnet`, `Communities`
4. Copia `templates/app/globals.css` a `src/app/globals.css` (backup en `.forja-backup`)
5. Copia `templates/app/layout.tsx`, `page.tsx`, `sitemap.ts`, `robots.ts`, `api/lead/route.ts` (con backup)
6. Mezcla `templates/tailwind.additions.ts` en `tailwind.config.ts`
7. Añade la sección relevante del `templates/CLAUDE.additions.md` al `CLAUDE.md` del proyecto

**Output al usuario:**
```
✓ [N] componentes instalados: [lista de secciones]
✓ globals.css + layout.tsx actualizados (backups en *.forja-backup)
✓ Tailwind config extendido
✓ CLAUDE.md actualizado con reglas anti-AI-slop
```

---

## Step 6 · Copy populado en `content.ts`

Toma las respuestas de la entrevista y **escribe copy real, no placeholders**. Adapta los campos según las secciones incluidas.

### Reglas de copy (anti-AI-slop)

- **NO:** "Bienvenido a", "Solución integral", "En el mundo actual", "Potenciamos tu"
- **NO:** "Empower your business with AI", "Transform your [X]", "Unlock your potential"
- **NO:** Emojis en H2/H3 (solo en UI icons si acaso)
- **SÍ:** Lenguaje del target, datos específicos, dolor real
- **Tono:** café con un amigo, no brochure corporativa
- **Botones:** primera persona ("Quiero empezar", no "Get Started")
- **Máx 3 líneas por párrafo**
- **Hero H1:** mezcla italic/bold en Fraunces — verbo en italic, sustantivo/promesa en bold, acento en ember gradient

### Ejemplo de H1 estructura

```tsx
<h1>
  <span className="italic font-light text-muted">Forjo</span>
  <span className="font-semibold"> software con IA.</span>
  <span className="italic font-light">
    Automatizo <span className="ember-text not-italic font-semibold">lo que te roba horas.</span>
  </span>
</h1>
```

### Campos de `content.ts` según secciones incluidas

**Siempre:**
- `CONTACT` — WhatsApp (con código de país), email, redes
- `PROOF_METRICS` — 3 métricas concretas del negocio (nada de ∞ o "v1.0")
- `SCROLL_STOPS` — problema / solución / método en voz del target

**Si incluye Services:**
- `SERVICES` — 1 poster card (principal) + 2-4 cards secundarias

**Si incluye Portfolio:**
- `PORTFOLIO_FEATURED` — 3-4 proyectos con spans bento (8/4/7/5)
- `PORTFOLIO_REST` — 3-6 proyectos secundarios como lista editorial

**Si incluye Process:**
- `PROCESS_STEPS` — 3 pasos con duración estimada (días/semanas/sesiones)

**Si incluye About:**
- `ABOUT` — saludo + 2 párrafos + firma o tagline
- `MANIFESTO` — 5 líneas en primera persona (optativo)

**Si incluye LeadMagnet:**
- `LEAD_MAGNET` — título del recurso, promesa, email placeholder

**Si incluye Communities:**
- `COMMUNITY` — nombre, propuesta de valor, CTA de acceso

---

## Step 7 · Build check + preview

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
Landing construida.

✓ TypeScript: PASS
✓ Build: PASS
✓ Dev server: http://localhost:3000

Secciones: [lista de lo que se construyó]

Próximos pasos:
  /forja critique  → review anti-AI-slop
  /forja audit     → performance + a11y + SEO
  /forja deploy    → Vercel + custom domain

Si el hero video aún está generando con Seedance, se descargará automáticamente
a public/hero/ — hacé refresh del browser cuando termine.
```

---

## Reglas de oro durante `/forja build`

1. **No pidas confirmación para cada sub-paso.** Solo al final del Step 3 (estructura).
2. **Copy primero, código después.** Nunca generes componentes con copy placeholder.
3. **Sé honesto si no tenés info.** "Necesito tu número de WhatsApp con código de país. Pegalo."
4. **Sugiere defaults inteligentes.** Si el usuario dice "no sé qué CTA" → recomienda WhatsApp con texto pre-lleno.
5. **Elegí las secciones con criterio.** No incluyas Portfolio si no hay proyectos. No incluyas Communities si no hay comunidad. Una landing concisa > una landing rellena.
6. **Si el usuario se aburre, acelerá.** Entrevista en 5 min, no en 30.
7. **Pausa si hay señal de ambigüedad real.** Mejor pausar 1 vez que ejecutar mal 5.
