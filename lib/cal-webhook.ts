// Cal.com webhook verification + safe event mapping.
// Secret: process.env.ASTONS_WEBHOOK_SECRET (must match Cal.com webhook Secret).
// Signature: X-Cal-Signature-256 = hex HMAC-SHA256 of the raw body.
// Never log attendee PII from the payload.

import { createHmac, timingSafeEqual } from 'crypto'

export type CalTrigger =
  | 'BOOKING_CREATED'
  | 'BOOKING_CANCELLED'
  | 'BOOKING_RESCHEDULED'
  | 'BOOKING_CANCELED' // spelling variant some UIs show
  | string

/** Analytics event name for a Cal trigger, or null if we ignore it. */
export function analyticsEventForTrigger(trigger: string): string | null {
  switch (trigger) {
    case 'BOOKING_CREATED':
      return 'booking_completed'
    case 'BOOKING_CANCELLED':
    case 'BOOKING_CANCELED':
      return 'booking_cancelled'
    case 'BOOKING_RESCHEDULED':
      return 'booking_rescheduled'
    default:
      return null
  }
}

export function verifyCalSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string | undefined,
): boolean {
  if (!secret || !signatureHeader) return false
  if (signatureHeader === 'no-secret-provided') return false

  const expected = createHmac('sha256', secret).update(rawBody).digest('hex')
  const a = Buffer.from(signatureHeader)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/** Pull only non-PII fields we need for analytics / dedupe logs. */
export function sanitizeCalPayload(body: unknown): {
  triggerEvent: string
  uid: string
} | null {
  if (!body || typeof body !== 'object') return null
  const root = body as Record<string, unknown>
  const triggerEvent =
    typeof root.triggerEvent === 'string' ? root.triggerEvent : ''
  if (!triggerEvent) return null

  const payload =
    root.payload && typeof root.payload === 'object'
      ? (root.payload as Record<string, unknown>)
      : root

  const uid =
    typeof payload.uid === 'string'
      ? payload.uid
      : typeof payload.bookingId === 'string'
        ? payload.bookingId
        : typeof payload.bookingUid === 'string'
          ? payload.bookingUid
          : ''

  return { triggerEvent, uid }
}
