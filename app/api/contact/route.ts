import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rate = new Map<string, { count: number; reset: number }>();

function clientKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  try {
    const key = clientKey(request);
    const now = Date.now();
    const current = rate.get(key);
    if (!current || current.reset < now) rate.set(key, { count: 1, reset: now + 60_000 });
    else if (current.count >= 5) return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
    else current.count += 1;

    const body = await request.json();
    const name = String(body.name || '').trim();
    const replyTo = String(body.replyTo || '').trim();
    const message = String(body.message || '').trim();
    const intent = String(body.intent || 'Other').trim();
    const website = String(body.website || '').trim();

    if (website) return NextResponse.json({ ok: true });
    if (!name || name.length > 80) return NextResponse.json({ error: 'Please enter a valid name.' }, { status: 400 });
    if (!replyTo || replyTo.length > 160) return NextResponse.json({ error: 'Please enter a valid email or LinkedIn identifier.' }, { status: 400 });
    if (!message || message.length > 3000) return NextResponse.json({ error: 'Please enter a message up to 3000 characters.' }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || 'poojapansare1810@gmail.com';
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !from) {
      return NextResponse.json({ error: 'Contact delivery is not configured yet. Please use Email, LinkedIn or WhatsApp.' }, { status: 503 });
    }

    const resend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: emailPattern.test(replyTo) ? replyTo : undefined,
        subject: `[Portfolio] ${intent} — ${name}`,
        text: `New portfolio enquiry\n\nIntent: ${intent}\nName: ${name}\nReply-to: ${replyTo}\n\nMessage:\n${message}`,
      }),
    });

    if (!resend.ok) return NextResponse.json({ error: 'The message service rejected the request. Please use Email or LinkedIn instead.' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to process the message right now.' }, { status: 500 });
  }
}
