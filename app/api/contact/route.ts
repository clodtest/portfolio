import { NextResponse } from 'next/server'

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  interest?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Placeholder endpoint: validates and acknowledges the submission.
// TODO: wire this to a real destination (email via Resend/SendGrid, a CRM
// webhook, or a database) before launch.
export async function POST(request: Request) {
  let body: ContactPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const errors: Record<string, string> = {}
  if (!body.name || body.name.trim().length < 2) errors.name = 'Name is required'
  if (!body.email || !EMAIL_RE.test(body.email)) errors.email = 'A valid email is required'
  if (!body.message || body.message.trim().length < 10)
    errors.message = 'A message of at least 10 characters is required'

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 })
  }

  console.log('[contact] new inquiry', {
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    interest: body.interest || null,
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}
