import { NextResponse } from 'next/server'

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL

type LeadPayload = {
  name: string
  email: string
  segment: string
  source?: string
}

export async function POST(request: Request) {
  let body: LeadPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const name = body.name?.trim()
  const email = body.email?.trim().toLowerCase()
  const segment = body.segment?.trim() || 'otro'

  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'invalid_name' }, { status: 400 })
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  if (!GHL_WEBHOOK_URL) {
    console.warn('[lead] GHL_WEBHOOK_URL not configured — lead captured but not forwarded:', {
      name,
      email,
      segment,
    })
    return NextResponse.json({ ok: true, forwarded: false })
  }

  try {
    const res = await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        segment,
        source: body.source ?? 'landing-carlos',
        tags: [`segment:${segment}`, 'lead-magnet:claude-code-para-founders'],
        leadMagnet: 'claude-code-para-founders',
        submittedAt: new Date().toISOString(),
      }),
    })
    if (!res.ok) {
      console.error('[lead] GHL rejected with status', res.status)
      return NextResponse.json({ ok: true, forwarded: false }, { status: 200 })
    }
  } catch (err) {
    console.error('[lead] GHL webhook error', err)
    return NextResponse.json({ ok: true, forwarded: false }, { status: 200 })
  }

  return NextResponse.json({ ok: true, forwarded: true })
}
