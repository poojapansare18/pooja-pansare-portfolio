import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const target = process.env.WHATSAPP_DESTINATION_URL;
  if (!target) return NextResponse.redirect(new URL('/#contact', request.url));
  return NextResponse.redirect(target);
}
