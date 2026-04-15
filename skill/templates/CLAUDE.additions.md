# Merge these sections into your project's CLAUDE.md

## Landing page — forja-landing

This project uses the `forja-landing` skill for the landing page at `/`.

### Skill commands

- `/forja build` — interactive interview + copy population
- `/forja critique` — anti-AI-slop design review
- `/forja audit` — performance + a11y + SEO pre-deploy checks
- `/forja deploy` — ship to Vercel + verify OG

### File structure

```
src/
├── app/
│   ├── layout.tsx         # fonts + metadata + JSON-LD
│   ├── page.tsx           # composes sections
│   ├── globals.css        # ember palette + utilities
│   ├── sitemap.ts
│   ├── robots.ts
│   └── api/lead/route.ts  # GHL webhook forwarder
└── features/landing/
    ├── components/        # Hero, Services, Portfolio, etc.
    └── data/content.ts    # ALL copy lives here
```

### Rules when editing

- **Copy changes go in `data/content.ts`** — never hardcode strings in components
- **Placeholders use `{{CAPS_SNAKE}}`** — Claude replaces them during `/forja build`
- **Don't edit components unless restructuring** — they are battle-tested
- **Respect the ember palette** — only `ember` / `forge` / `deep` accents in `.tsx`
- **Fraunces for display, Geist for body** — don't mix in other fonts

### Anti-AI-slop rules (hard rules)

- ❌ No gradient buttons purple→blue (use solid ember `#f5a524` with inset shadow)
- ❌ No three identical cards with icon + title + paragraph (use bento asymmetry + poster cards)
- ❌ No Inter 400 on white (we use Fraunces on `#0a0a0b`)
- ❌ No "Empower your business with AI" copy
- ❌ No generic glassmorphism — reserve only for navbar pill
