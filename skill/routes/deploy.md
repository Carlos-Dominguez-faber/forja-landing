# /forja deploy — Ship a Vercel

> *Build check local → commit → push → Vercel → custom domain → OG verify. Non-interactive.*

## Pre-flight

```bash
# ¿Git iniciado?
git rev-parse --is-inside-work-tree 2>/dev/null

# ¿Remote configurado?
git remote -v

# ¿Vercel linked?
cat .vercel/project.json 2>/dev/null
```

---

## Step 1 · Build check local

```bash
npm run typecheck 2>&1 | tail -5
npm run build 2>&1 | tail -15
```

Si falla cualquiera: **STOP** y mostrar errores. No proceder.

---

## Step 2 · Git commit + push

1. Analizar `git status` — si hay cambios uncommitted, hacer commit con mensaje descriptivo:

```bash
git add .
git commit -m "feat: ship landing — [breve descripción del estado]"
```

2. Si el repo no tiene remote:
   - Preguntar al usuario el nombre del repo y si privado/público
   - `gh repo create <owner>/<name> --private --source=. --push`

3. Si ya tiene remote: `git push -u origin main`

---

## Step 3 · Vercel deploy

Si el proyecto nunca fue deployado:

```bash
vercel --yes  # preview deploy
```

Si ya fue deployado:

```bash
vercel --prod  # production
```

Capturar la URL del output.

---

## Step 4 · Custom domain (opcional)

Si el usuario indica un dominio:

```bash
# Add to project
vercel domains add [dominio]

# Alias latest deployment
vercel alias set [deployment-url] [dominio]

# Inspect DNS requirements
vercel domains inspect [dominio]
```

Mostrar al usuario los DNS records necesarios (A 76.76.21.21 para apex, CNAME para www).

---

## Step 5 · Env vars (si faltan)

Verificar que las env vars requeridas estén configuradas en Vercel:

```bash
# Listar env vars actuales
vercel env ls

# Si falta alguna crítica:
#   - MUAPI_API_KEY (si hero video con Seedance)
#   - GHL_WEBHOOK_URL (si lead-magnet activo)
#   - RESEND_API_KEY (si email delivery custom)
```

Si falta algo, preguntarlo al usuario y setear:

```bash
vercel env add [VAR_NAME] production
```

Re-deploy tras setear:

```bash
vercel --prod
```

---

## Step 6 · Verificaciones post-deploy

```bash
# URL responde
curl -s -o /dev/null -w "HTTP %{http_code}\n" [URL]

# OG image existe
curl -s -o /dev/null -w "og: HTTP %{http_code}\n" [URL]/og/og.jpg

# Sitemap
curl -s [URL]/sitemap.xml | head -5

# Robots
curl -s [URL]/robots.txt
```

---

## Output final

```
🔨 Deployed.

Production:     [URL]
Custom domain:  [dominio (si configurado)]
Repo:           [GitHub URL]

Verificaciones:
  ✓ Landing responde 200
  ✓ OG image cargando
  ✓ sitemap.xml + robots.txt
  ✓ [otras]

Próximos pasos:
  /forja audit    — auditoría contra producción
  /forja critique — otra pasada de review

¿Querés que suba el DNS a tu dominio? (te muestro los records)
```

---

## Reglas de oro

1. **Non-interactive por defecto.** No preguntar antes de cada paso.
2. **Solo detenerse por:** build failing, git conflicts irresolubles, DNS info needed.
3. **Siempre mostrar URL final** — el usuario no debería buscarla.
4. **Si el deploy falla,** mostrar logs relevantes (`vercel inspect [url] --logs`) antes de preguntar qué hacer.
