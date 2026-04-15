# /forja critique — Anti-AI-Slop Design Review

> *Revisión holística de la landing por 10 dimensiones. Como un design director. Sin piedad.*

## Contexto

Este route se activa cuando el usuario escribe `/forja critique`. Tu rol es el de un **design director dando feedback**, no un ejecutor mecánico. Sé directo, específico, y priorizá despiadadamente.

**Reglas:**
- No digas "considerá explorar…" — da sugerencia concreta
- No digas "algunos elementos" — di qué archivo, qué línea
- Di qué está mal Y por qué importa al usuario final
- Si una dimensión está perfecta, dilo brevemente y pasá adelante

---

## Pre-flight

Asegurate que el dev server esté corriendo o que haya una URL de producción:

```bash
# ¿Dev server?
lsof -iTCP:3000 -sTCP:LISTEN 2>/dev/null | head -1

# Si no, ofrecer arrancarlo
npm run dev &
sleep 3
```

Tomá screenshots con Playwright MCP (si disponible) de:
- Viewport inicial (hero)
- Full page scroll
- Cada sección principal por separado (about, services, portfolio, cta final)

---

## Las 10 dimensiones

### 1. AI Slop Detection (CRÍTICO — empezar aquí)

**El check más importante.** ¿Esto se ve como toda otra interfaz generada por IA 2024-2026?

Buscá estos tells:

- ❌ Gradient buttons azul→morado o "warm AI" (amber→red sin inset)
- ❌ Three identical cards con icon + title + paragraph + CTA
- ❌ Inter 400 sobre fondo blanco puro
- ❌ Dark mode con glowing accents tipo "tech tech tech"
- ❌ Glassmorphism everywhere (solo navbar está OK)
- ❌ Metric hero con "∞" o emojis en lugar de números
- ❌ "Empower your business with AI" o derivados
- ❌ Bento grid con 6 cards de exactamente el mismo tamaño interno
- ❌ Eyebrow mono-caps repetido en cada sección (varía con §, números serif italic, em-dashes)

**El test real:** *"Si le mostraras esto a alguien y dijeras 'lo hizo una IA', ¿te creerían inmediatamente?"*

Si sí → FALLA esta dimensión. Bloquea el merge.
Si no → PASS con comentario de tells menores restantes.

---

### 2. Visual Hierarchy

- ¿El ojo fluye al elemento más importante primero?
- ¿Se identifica el primary action en 2 segundos?
- ¿Size, color y position comunican importancia correctamente?

**Red flags:** CTAs del mismo peso visual, múltiples H1, sidebar que compite con main.

---

### 3. Information Architecture

- ¿La estructura es intuitiva de arriba a abajo?
- ¿Contenido relacionado está agrupado?
- ¿Hay cognitive overload (demasiadas opciones simultáneas)?

**Red flags:** sección "features" sin contexto, testimonials antes de probar el producto, pricing sin haber vendido el valor.

---

### 4. Emotional Resonance

- ¿Qué emoción evoca la interfaz? ¿Es la intencional?
- ¿Matchea la personalidad de la marca declarada?

**Red flags:** marca dice "artesano" pero se ve corporate SaaS; marca dice "bold" pero todo es pastel.

---

### 5. Discoverability & Affordance

- ¿Los elementos interactivos se ven interactivos?
- ¿Los hover/focus states proveen feedback útil?
- ¿Los CTAs se reconocen a 2m de distancia?

**Red flags:** botones sin sombra/borde, focus-visible ausente (a11y fail), links sin underline ni color distintivo.

---

### 6. Composition & Balance

- ¿El layout se siente balanceado?
- ¿El whitespace es intencional, no accidental?
- ¿Hay ritmo entre secciones o todo se siente igual?

**Red flags:** secciones de igual altura 100vh todas, márgenes inconsistentes, alineación accidental.

---

### 7. Typography as Communication

- ¿La type hierarchy señala qué leer primero?
- ¿Body text es cómodo? (line length 45-75ch, line-height 1.5+)
- ¿Hay personalidad en las fuentes o es Inter-everywhere?

**Red flags:** todos los H2 del mismo peso, body en Inter 16px sobre #fff, serifs decorativas innecesarias en UI.

---

### 8. Color with Purpose

- ¿El color comunica, no solo decora?
- ¿Funciona para usuarios daltónicos (>3:1 contrast en UI crítica)?
- ¿La paleta se respeta o aparecen colores random?

**Red flags:** 15 tonos de gris, azul "info" compitiendo con el accent, botón rojo "destructive" y rojo "primary" en la misma page.

---

### 9. States & Edge Cases

- **Empty states:** ¿Guían a acción?
- **Loading states:** ¿Reducen percepción de espera?
- **Error states:** ¿Son útiles y no culposos?
- **Mobile:** ¿Se ve igual de cuidado que desktop?

**Red flags:** forms sin success state, errores genéricos "Something went wrong", mobile navbar que no colapsa.

---

### 10. Microcopy & Voice

- ¿El writing es claro y conciso?
- ¿Labels y buttons son unambiguos?
- ¿La voz es consistente de hero a footer?

**Red flags:** "Click here", "Submit", "Loading…", mezclar tú/usted/vos en la misma página, CTA genérico cuando podría ser específico.

---

## Formato del reporte

```markdown
# Crítica — [Nombre del proyecto]

## Veredicto Anti-Patterns — [PASS/FAIL]

[1 línea de veredicto + los 2-3 tells detectados más importantes]

## Impresión General

[Gut reaction en 2-3 oraciones. Qué funciona, qué no, oportunidad más grande]

## Lo Que Funciona

1. **[Cosa específica]** — por qué funciona
2. **[Cosa específica]** — por qué funciona
3. **[Cosa específica]** — por qué funciona

## Issues Prioritarios

### 🔥 1. [Nombre del issue]
- **Qué:** [descripción clara, con archivo:línea]
- **Por qué importa:** [impacto en usuarios reales]
- **Fix:** [qué hacer, concreto]

### 🔥 2. ... (máx 5 críticos)

## Observaciones Menores

- [Quick note archivo:línea] — sugerencia
- ...

## Preguntas a Considerar

- [Pregunta provocativa que desbloquea mejor solución]
- ...

## Resumen Ejecutivo

| Dimensión | Score | Comentario |
|---|---|---|
| Anti-AI-slop | X/10 | ... |
| Visual Hierarchy | X/10 | ... |
| Emotional Resonance | X/10 | ... |
| Typography | X/10 | ... |
| Craftsmanship | X/10 | ... |

**Siguiente paso:** `/forja polish` para aplicar fixes prioritarios (o pedir cambios específicos en conversación).
```

---

## Reglas de oro durante `/forja critique`

1. **Priorizá despiadadamente.** Máximo 5 críticos. Todo lo demás es menor.
2. **Ni muy amable ni destructivo.** El criticado debe irse con claridad, no herido.
3. **Cada issue con fix concreto.** "Mejora la tipografía" es basura. "Cambia `font-weight: 600` a `400` italic en `.hero-subtitle`" sirve.
4. **No inventes problemas.** Si está bien, dilo: "Sin issues significativos en esta dimensión."
5. **Siempre cerrá con oportunidad más grande.** La persona debe saber qué mover primero.
