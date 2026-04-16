# forja-landing

> *Claude Code skill que construye landing pages cinemáticas para cualquier tipo de negocio.*

Video hero con Seedance 2.0 · Crítica anti-AI-slop integrada · Auditoría web Lighthouse-style · Secciones adaptadas a tu negocio. Todo desde un comando.

---

## Por qué existe

Las landings generadas por IA se ven iguales. Gradiente azul→morado, tres cards idénticas, Inter sobre fondo blanco, "empower your business with AI".

**forja-landing** trae de serie lo contrario:

- **Tipografía editorial** · Fraunces serif con mezcla italic / bold
- **Paleta ember** · dark negro profundo + amber-red solo donde importa
- **Bento asimétrico** · service cards variadas, poster cards para destacados
- **Video hero Seedance 2.0** · loop cinematográfico generado por IA (opcional)
- **Section selector** · elige qué secciones incluir según tu tipo de landing
- **Crítica automática** · review anti-AI-slop antes de shippear
- **Auditoría integrada** · performance + a11y + SEO pre-deploy

Funciona para cualquier tipo de negocio:

| Tipo | Secciones incluidas |
|------|---------------------|
| Personal brand / consultor | Hero · ScrollStops · About · Services · Portfolio · Process · CTA |
| SaaS / producto digital | Hero · ScrollStops · Features · Process · LeadMagnet · CTA |
| Agencia / estudio | Hero · ScrollStops · Services · Portfolio · About · Process · CTA |
| Producto físico | Hero · ScrollStops · Catálogo · About · CTA |
| Curso / comunidad | Hero · ScrollStops · About · Communities · LeadMagnet · CTA |
| Clínica / servicio local | Hero · ScrollStops · Services · Process · About · CTA |

---

## Instalación

En tu proyecto Next.js (App Router):

```bash
npx forja-landing init
```

Esto instala:

- Skill `.claude/skills/forja-landing/` (SKILL.md + routes + templates)
- Comandos slash `/forja build`, `/forja critique`, `/forja polish`, `/forja audit`, `/forja deploy`
- Templates de componentes (Hero, Services, Portfolio, Process, About, LeadMagnet, Communities, CTA, Footer, Embers, Navbar)

---

## Uso

Abre tu proyecto en [Claude Code](https://claude.ai/code):

```
/forja build
```

Claude te pregunta:
1. **Tipo de landing** (personal brand, SaaS, agencia, producto, curso, clínica, otro)
2. **Identidad** — nombre, posicionamiento, audiencia
3. **Oferta** — servicios/productos, CTA primario, vibe visual

Luego **propone la estructura** (secciones + headline + prompt Seedance) y espera tu OK antes de construir.

Después:

```
/forja critique   # review anti-AI-slop en 10 dimensiones
/forja polish     # aplica los fixes del critique automáticamente
/forja audit      # performance + a11y + SEO
/forja deploy     # Vercel + custom domain
```

---

## Hero video con Seedance 2.0 (opcional)

Si querés el loop cinematográfico del hero:

```bash
# En tu .env.local
MUAPI_API_KEY=tu_key_aqui
```

Conseguí la key en [muapi.ai](https://muapi.ai). Sin la key, el skill usa un fallback de Canvas con partículas de brasas (igual se ve bien).

También podés auto-generar la imagen de referencia para Seedance:

```bash
# En tu .env.local
OPENROUTER_API_KEY=tu_key_aqui
```

---

## Lo que NO hace

- No genera el copy por vos sin input. Das la información, el skill construye la estructura, tipografía y diseño.
- No soporta Pages Router (solo App Router).
- No es un template estático. Es un skill para Claude Code que adapta las secciones a tu negocio.

---

## Stack asumido

- Next.js 15+ (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS 3.x
- Fuentes: Fraunces + Geist (Google Fonts vía `next/font`)

---

## Demo

La landing de Carlos fue construida con este skill: [carlosdominguez.com.mx](https://carlosdominguez.com.mx)

---

## Roadmap

- [x] v0.1 — install.js + SKILL.md base
- [x] v0.2 — Templates de componentes completos
- [x] v0.3 — Routes completos (build, critique, audit, deploy) + script Seedance + dispatcher
- [x] v0.4 — `/forja polish` automático + auto-gen de reference image via OpenRouter
- [x] v0.5 — Section selector + posicionamiento general (cualquier tipo de landing)
- [ ] v0.6 — Plug GHL / Resend para lead-magnet delivery automatizado
- [ ] v1.0 — Launch en Show HN / Product Hunt

---

## Made by

**Carlos Domínguez** — Cancún, México

- [carlosdominguez.com.mx](https://carlosdominguez.com.mx)
- [github.com/Carlos-Dominguez-faber](https://github.com/Carlos-Dominguez-faber)

---

## License

MIT — Úsalo, modifícalo, forkéalo. Si te gusta, una ⭐ ayuda mucho.

---

> *El código mediocre se genera. El gran software se forja.*
