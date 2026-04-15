# /forja polish — Apply Critique Fixes Automatically

> *Toma el output de `/forja critique` y aplica los fixes de prioridad crítica/alta. Con confirmación por chunk, no por archivo.*

## Contexto

Este route se activa cuando el usuario escribe `/forja polish` después de haber corrido `/forja critique`. Tu rol es aplicar los fixes con criterio, no como autómata.

**Reglas de aplicación:**
- **Críticos**: aplicar sin preguntar (el usuario ya aprobó con `/forja polish`)
- **Altos**: aplicar con confirmación por grupo lógico (no por archivo)
- **Menores**: preguntar si los incluye antes de tocarlos
- **Después de cada grupo**: mostrar qué se cambió, no un diff completo

---

## Pre-flight

1. ¿Existe un reporte reciente de `/forja critique`? Buscar en contexto de la conversación O en `docs/critique-report.md` si el usuario lo guardó.

2. Si no hay reporte, **STOP**: decir *"Corré `/forja critique` primero para saber qué pulir."*

3. Leer el reporte. Identificar:
   - Lista de críticos
   - Lista de altos
   - Lista de menores

4. Mostrar al usuario un plan:

```
Plan de polish basado en el reporte de critique:

Críticos (aplico sin confirmación):
  1. [fix]
  2. [fix]

Altos (aplico en grupos, confirmo por grupo):
  Grupo A — Typography: 2 fixes
  Grupo B — Spacing: 1 fix
  Grupo C — CTA: 1 fix

Menores (pregunto antes de aplicar):
  - [fix]
  - [fix]

¿Vamos? (sí / solo críticos / solo críticos+altos / listo, pausa)
```

---

## Categorías de fixes (agrupación inteligente)

### Typography fixes
- Cambios de font weight / italic / size
- Ajustes de line-height, tracking
- H1/H2/H3 reestructuración
- **Suelen tocar:** hero.tsx, cualquier componente con texto grande

### Layout fixes
- Grid / flex ajustes
- Spacing (pt/pb/mt/mb)
- Asimetría en bento
- **Suelen tocar:** services.tsx, portfolio.tsx

### Color fixes
- Paleta ember consistency
- Contrast WCAG
- Remoción de gradient slop
- **Suelen tocar:** globals.css, tailwind.config.ts

### CTA fixes
- Jerarquía CTA dominante vs secundario
- Copy de botones (primera persona)
- Hover/focus states
- **Suelen tocar:** hero.tsx, cta-final.tsx, lead-magnet.tsx

### Content fixes
- Copy anti-AI-slop
- Microcopy de formularios/errors
- CTAs más específicos
- **Suelen tocar:** data/content.ts (solo ese archivo idealmente)

---

## Flujo de aplicación por grupo

Para cada grupo confirmado:

1. Hacer los cambios en los archivos del grupo
2. Ejecutar typecheck local:
   ```bash
   npx tsc --noEmit 2>&1 | tail -5
   ```
3. Si falla: mostrar errores, **STOP**, pedir guía al usuario
4. Si pasa: mostrar resumen breve:
   ```
   ✓ Grupo A aplicado (2 fixes en 1 archivo)
     - hero.tsx: H1 mezcla italic en "Forjo"
     - hero.tsx: CTA copy a primera persona
   ```
5. Pasar al siguiente grupo

---

## Después de todos los grupos

1. Build check:
   ```bash
   npm run build 2>&1 | tail -5
   ```

2. Si el dev server está corriendo, tomar screenshot post-fix (con Playwright MCP si disponible) para confirmar visualmente.

3. Output final:

```
🔨 Polish completo.

Aplicados:
  ✓ 3 críticos
  ✓ 5 altos (3 grupos)
  ⊘ Menores skippeados (podés pedirlos después)

Build: PASS
TypeScript: PASS

Próximos pasos:
  /forja audit    → verificar que la performance/a11y/SEO mejoró post-fixes
  /forja deploy   → ship si todo está verde
```

---

## Casos especiales

### Si el fix requiere decisión de criterio (no mecánica)

Ejemplo: "El CTA sidebar de Forge compite con el CTA principal. Considerá removerlo o reducirlo."

**Tu acción:** presentar 2 opciones concretas + tu recomendación, esperar respuesta:

```
Issue: CTA sidebar de Forge compite con el principal.

Opciones:
  A) Remover el sidebar completamente (recomendado — simplifica jerarquía)
  B) Reducirlo a 1 párrafo + 1 link (más sutil pero preserva el mention)

Mi recomendación: A. Forge ya aparece en portfolio + services. La mención extra debilita el primary.

¿A o B?
```

### Si el fix podría romper algo

Ejemplo: "Cambiar paleta requiere refactor de tailwind.config + múltiples componentes"

**Tu acción:** hacer backup automático antes:

```bash
cp tailwind.config.ts tailwind.config.ts.forja-backup-$(date +%s)
cp src/app/globals.css src/app/globals.css.forja-backup-$(date +%s)
```

Aplicar cambio. Si typecheck falla, revertir desde backup:

```bash
mv tailwind.config.ts.forja-backup-XXX tailwind.config.ts
```

---

## Reglas de oro

1. **Nunca aplicar todos los fixes en 1 commit gigante.** Agrupa por categoría, commit por grupo.
2. **Siempre typecheck después de cada grupo.** Si falla, rollback y preguntá al humano.
3. **Respetar el diff original al máximo.** No refactorices código no mencionado en el reporte.
4. **Commits en español con prefix `polish(categoria):`.**
5. **Nunca hacer cambios en `package.json` / dependencies** durante polish — eso es otro comando.
