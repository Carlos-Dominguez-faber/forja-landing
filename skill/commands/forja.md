# /forja — Dispatcher

Comando principal del skill forja-landing. Enruta al route correcto.

## Uso

```
/forja build     → construye la landing de cero (entrevista → scaffold)
/forja critique  → review anti-AI-slop (10 dimensiones)
/forja polish    → aplica fixes de un /forja critique anterior
/forja audit     → performance + a11y + SEO (estilo Lighthouse)
/forja deploy    → ship a Vercel + custom domain
```

**Flujo típico (end-to-end):**

```
/forja build → /forja critique → /forja polish → /forja audit → /forja deploy
    ↓              ↓                  ↓              ↓              ↓
  30 min        5 min              5 min          5 min         3 min

= landing producida y shipeada en <1h desde 0
```

## Cómo funciona

1. Parse los args del usuario (`build`, `critique`, etc.)
2. Lee el route correspondiente:
   - `build` → `.claude/skills/forja-landing/routes/build.md`
   - `critique` → `.claude/skills/forja-landing/routes/critique.md`
   - `polish` → `.claude/skills/forja-landing/routes/polish.md`
   - `audit` → `.claude/skills/forja-landing/routes/audit.md`
   - `deploy` → `.claude/skills/forja-landing/routes/deploy.md`
3. Ejecuta las instrucciones del route
4. Reporta output final

## Si el usuario no especifica

Mostrar las opciones:

```
🔨 forja-landing

Elegí el comando:
  build     — construí una landing nueva (30-60 min)
  critique  — review anti-AI-slop (10 min)
  polish    — aplicar fixes de critique (5 min)
  audit     — performance + a11y + SEO (5 min)
  deploy    — ship a Vercel (3 min)

Ejemplo: /forja build
```

## Reglas

- No ejecutar múltiples routes sin pedir.
- Si el usuario dice `/forja` sin args, listar opciones.
- Si el route no existe, avisar: `Comando desconocido. Opciones: build, critique, audit, deploy.`
