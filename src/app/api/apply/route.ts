import { NextResponse } from 'next/server';
import { fields, sendMail } from '@/lib/mail';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ ok: false, error: '잘못된 요청' }, { status: 400 });
  const rest = body as Record<string, string>;
  const missing = ['program', 'name', 'phone', 'email'].filter((k) => !String(rest[k] || '').trim());
  if (missing.length) return NextResponse.json({ ok: false, error: `필수 항목 누락: ${missing.join(', ')}` }, { status: 400 });
  const applicationNo = 'H2A-APP-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  const result = await sendMail({ subject: `[H2A 프로그램 신청] ${rest.program} · ${rest.name}`, text: fields({ 신청번호: applicationNo, 접수시각: new Date().toISOString(), ...rest }), replyTo: rest.email });
  return NextResponse.json({ ok: true, applicationNo, ...result });
}
