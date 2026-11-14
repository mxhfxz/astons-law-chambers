// Cal.com → astonslaw.com booking webhook.
// Configured in Cal.com as subscriber https://astonslaw.com/api/webhooks/cal
// with secret matching env ASTONS_WEBHOOK_SECRET.
//
// Source of truth for booking created / cancelled / rescheduled when the
// client embed misses (new-tab href, ad blockers, modal quirks).
// Emits Vercel Analytics custom events only — no PII in properties.

import { track } from '@vercel/analytics/server'
import {
  analyticsEventForTrigger,
  sanitizeCalPayload,
  verifyCalSignature,
} from '@/lib/cal-webhook'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.ASTONS_WEBHOOK_SECRET
  const rawBody = await request.text()
  const signature = request.headers.get('x-cal-signature-256')

  if (!verifyCalSignature(rawBody, signature, secret)) {
    return new Response('invalid signature', { status: 401 })
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(rawBody) as unknown
  } catch {
    return new Response('invalid json', { status: 400 })
  }

  const safe = sanitizeCalPayload(parsed)
  if (!safe) {
    // Signed ping / unexpected shape — acknowledge so Cal UI can succeed.
    return new Response('ok', { status: 200 })
  }

  const eventName = analyticsEventForTrigger(safe.triggerEvent)
  if (!eventName) {
    return new Response('ok', { status: 200 })
  }

  try {
    await track(eventName, {
      cta_type: 'book',
      placement: 'cal_webhook',
      page_type: 'webhook',
      page_path: '/api/webhooks/cal',
      source: 'cal_webhook',
      trigger: safe.triggerEvent,
      // uid is a Cal booking id, not an email — safe for dedupe in dashboards.
      ...(safe.uid ? { booking_uid: safe.uid.slice(0, 64) } : {}),
    })
  } catch {
    // Analytics must not fail the webhook — Cal retries on non-2xx.
  }

  return new Response('ok', { status: 200 })
}

/** Cal.com Ping test sometimes uses GET — respond so the UI is not empty. */
export async function GET(): Promise<Response> {
  return new Response('cal webhook ready', { status: 200 })
}
