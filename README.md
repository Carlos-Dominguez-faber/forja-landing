# forja-landing

> *Claude Code skill que construye landings cinemáticas al nivel de [carlosdominguez.com.mx](https://carlosdominguez.com.mx).*

Video hero con Seedance 2.0 · Crítica anti-AI-slop integrada · Auditoría web Lighthouse-style · Todo desde un comando.

---

## Por qué existe

Las landings generadas por IA se ven iguales. Gradiente azul→morado, tres cards idénticas, Inter sobre fondo blanco, "empower your business with AI".

**forja-landing** trae de serie lo contrario:

- **Tipografía editorial** · Fraunces serif con mezcla italic / bold
- **Paleta ember** · dark negro profundo + amber-red solo donde importa
- **Bento asimétrico** · service cards variadas, poster cards para destacados
- **Video hero Seedance 2.0** · loop cinematográfico generado por IA (opcional)
- **Crítica automática** · review anti-AI-slop antes de shippear
- **Auditoría integrada** · performance + a11y + SEO pre-deploy

---

## Instalación

En tu proyecto Next.js 16+ (App Router):

```bash
npx forja-landing init
```

Esto instala:

- Skill `.claude/skills/forja-landing/` (SKILL.md + routes + templates)
- Comandos slash `/forja build`, `/forja critique`, `/forja audit`, `/forja deploy`
- Templates de componentes (Hero, Services, Portfolio, Process, CTA, Footer, Embers, Navbar)

---

## Uso

Abre tu proyecto en [Claude Code](https://claude.ai/code):

```
/forja build
```

Claude te hace 6 preguntas (marca, posicionamiento, servicios, audiencia, CTA, vibe) y construye la landing completa.

Después:

```
/forja critique   # review anti-AI-slop
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

---

## Lo que NO hace

- No es un generador de contenido por IA. Vos das el copy, el skill se encarga de la estructura, tipografía, diseño, y pulido.
- No es un boilerplate. Es una guía para Claude Code que se adapta a tu proyecto.
- No soporta Pages Router (solo App Router).

---

## Stack asumido

- Next.js 16+ (App Router)
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
- [ ] v0.2 — Templates de componentes completos
- [ ] v0.3 — `/forja build` end-to-end con entrevista guiada
- [ ] v0.4 — `/forja critique` automatizado
- [ ] v0.5 — `/forja audit` con checks reales
- [ ] v0.6 — Modo alternativo: portfolio de dev (en vez de servicios)
- [ ] v1.0 — Publicación en npm + launch en Show HN / Product Hunt

---

## Made by

**Carlos Domínguez** — Cancún, México

- [carlosdominguez.com.mx](https://carlosdominguez.com.mx)
- [github.com/Carlos-Dominguez-faber](https://github.com/Carlos-Dominguez-faber)
- [Forge framework](https://github.com/Carlos-Dominguez-faber/forge)

---

## License

MIT — Úsalo, modifícalo, forkéalo. Si te gusta, una ⭐ ayuda mucho.

---

> *El código mediocre se genera. El gran software se forja.*
