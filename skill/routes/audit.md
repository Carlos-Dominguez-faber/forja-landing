# /forja audit — Web Quality Audit (Lighthouse-style)

> *Performance · Accessibility · SEO · Best Practices. Con fixes concretos por prioridad.*

## Contexto

Este route se activa cuando el usuario escribe `/forja audit`. El objetivo es generar un reporte ejecutable — no una lista académica. Cada issue debe tener fix accionable.

---

## Pre-flight

Verificá contra qué URL auditar:

```bash
# ¿Prod URL?
cat .vercel/project.json 2>/dev/null
vercel ls 2>/dev/null | head -3

# ¿Dev server?
lsof -iTCP:3000 -sTCP:LISTEN 2>/dev/null | head -1
```

Preguntar al usuario si no es obvio:
> `¿Contra qué URL audito? Opciones: (A) Dev local localhost:3000, (B) Vercel preview, (C) Dominio de producción.`

---

## Step 1 · Run Lighthouse (si disponible)

```bash
# Desktop run
npx -y lighthouse [URL] \
  --quiet --chrome-flags="--headless=new --no-sandbox" \
  --output=json --output-path=/tmp/lh-desktop.json \
  --only-categories=performance,accessibility,seo,best-practices \
  --preset=desktop

# Mobile run
npx -y lighthouse [URL] \
  --quiet --chrome-flags="--headless=new --no-sandbox" \
  --output=json --output-path=/tmp/lh-mobile.json \
  --only-categories=performance,accessibility,seo,best-practices \
  --form-factor=mobile
```

Parseá scores y métricas clave:

```bash
node -e "
const r = require('/tmp/lh-desktop.json');
const cats = r.categories;
console.log('Desktop:');
for (const k of ['performance','accessibility','seo','best-practices']) {
  console.log('  ' + k.padEnd(20) + Math.round(cats[k].score * 100));
}
const a = r.audits;
console.log('LCP:', a['largest-contentful-paint'].displayValue);
console.log('CLS:', a['cumulative-layout-shift'].displayValue);
console.log('TBT:', a['total-blocking-time'].displayValue);
"
```

**Si Lighthouse no está disponible o falla:** hacé audit manual con los checks abajo.

---

## Step 2 · Manual audit (siempre, como complemento)

### Performance (40%)

Verificá:

- [ ] **Video hero** — ¿tamaño? `ls -lh public/hero/*.mp4`
  - Si > 2MB → fix: `ffmpeg -i original.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -an compressed.mp4`
- [ ] **Poster image** — ¿es realmente JPEG/WebP o PNG mal etiquetado?
  - `file public/hero/forge-poster.jpg` → debe decir "JPEG", no "PNG"
- [ ] **Fonts** — next/font usado? ¿Cuántas familias?
  - `grep "from 'next/font" src/app/layout.tsx`
  - 3 fuentes OK, 5+ = considerar reducir
- [ ] **Images** — ¿todas pasan por next/image?
  - `grep -r '<img' src/ | wc -l` — debe ser 0 (solo logos SVG exceptuando)
- [ ] **Canvas animations** — ¿respetan `prefers-reduced-motion`?
  - `grep "reduce" src/features/landing/components/embers.tsx`
- [ ] **Canvas animations** — ¿pausan off-screen?
  - `grep -E "IntersectionObserver|visibilitychange" src/features/landing/components/embers.tsx`

### Accessibility (30%)

Verificá con Playwright MCP:

```javascript
() => ({
  lang: document.documentElement.lang,
  h1Count: document.querySelectorAll('h1').length,
  imgsNoAlt: [...document.querySelectorAll('img')].filter(i => !i.alt).length,
  linksNoText: [...document.querySelectorAll('a')].filter(a => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
  videoAriaHidden: [...document.querySelectorAll('video')].every(v => v.getAttribute('aria-hidden') === 'true'),
  formsLabels: [...document.querySelectorAll('input')].filter(i => !document.querySelector(`label[for="${i.id}"]`)).length,
})
```

- [ ] `lang` attr en `<html>` = "es" (o idioma correcto)
- [ ] Exactamente 1 `h1`
- [ ] Cero `<img>` sin `alt`
- [ ] Cero `<a>` sin texto ni `aria-label`
- [ ] `<video>` decorativo con `aria-hidden="true"`
- [ ] Inputs con labels asociados (`for` match)
- [ ] Color contrast `text-dim` vs `bg-surface` — mínimo AA (4.5:1 para body, 3:1 para UI ≥18px)
- [ ] Focus-visible presente en todos los buttons/links

### SEO (15%)

- [ ] `<title>` presente y único
- [ ] `<meta name="description">` entre 120-160 chars
- [ ] `<meta property="og:image">` apunta a archivo existente (test: `curl -I [og URL]`)
- [ ] `alternates.canonical` presente
- [ ] `sitemap.xml` accessible (test: `curl -s [URL]/sitemap.xml`)
- [ ] `robots.txt` accessible
- [ ] JSON-LD presente — al menos `Person` + `WebSite`
- [ ] Heading hierarchy sin saltos (h1 → h2 → h3, nunca h1 → h3)

### Best Practices (15%)

- [ ] Cero errores de console en producción
- [ ] HTTPS en production URL
- [ ] Variables de entorno con secrets NO expuestas en cliente (`NEXT_PUBLIC_` solo para lo que debe ser público)
- [ ] No APIs deprecadas en console warnings
- [ ] `package.json` sin vulnerabilidades high/critical: `npm audit`
- [ ] Favicon presente (test: `curl -I [URL]/favicon.ico`)

---

## Step 3 · Reporte

Formato:

```markdown
# Web Audit — [URL]

## Scores

| Categoría | Desktop | Mobile | Target |
|---|---|---|---|
| Performance | XX | XX | ≥90 |
| Accessibility | XX | XX | 100 |
| SEO | XX | XX | 100 |
| Best Practices | XX | XX | ≥95 |

## Core Web Vitals (mobile)

- LCP: Xs (target <2.5s)
- CLS: X (target <0.1)
- INP: Xms (target <200ms)

## Issues Críticos (bloquean deploy/calidad)

### 🔴 1. [Nombre del issue] — [Categoría]
- **Qué:** [descripción con archivo/recurso]
- **Impacto:** [cuál es el efecto real]
- **Fix:** [comando o cambio exacto]

[máx 5 críticos]

## Issues Alta Prioridad

### 🟡 1. ...

## Menores / Nice-to-have

- [lista bullets]

## Resumen Ejecutivo

**Scores esperados post-fix:**
- Desktop: YY
- Mobile: YY

**Prioridad recomendada:**
1. [Fix crítico 1]
2. ...

¿Aplico los fixes ahora? (necesito tu `go`)
```

---

## Step 4 · Fixes (con aprobación)

Presentá el reporte primero. Espera `go` del usuario. Aplicá fixes en orden:

1. Critical → High → Medium → Low
2. Commit en chunks lógicos (asset optimization en 1, a11y en otro, SEO en otro)
3. Re-run audit al final para confirmar mejora

---

## Reglas de oro

1. **Ejecutá Lighthouse si existe.** Datos > opinión.
2. **Si Lighthouse no existe, audit manual es suficiente.** No bloquees por herramientas.
3. **Cada issue con comando/cambio exacto.** Nunca "mejorá la performance".
4. **No fixees sin pedir `go`.** Los fixes pueden romper cosas.
5. **Re-audit post-fixes.** Confirmá el resultado.
