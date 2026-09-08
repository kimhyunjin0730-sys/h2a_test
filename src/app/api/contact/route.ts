import { NextResponse } from 'next/server';
import { fields, sendMail } from '@/lib/mail';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ ok: false, error: '잘못된 요청' }, { status: 400 });
  const { kind, ...rest } = body as Record<string, string>;
  const required = kind === 'business' ? ['company', 'manager', 'phone', 'email', 'message'] : ['name', 'phone', 'email', 'message'];
  const missing = required.filter((k) => !String(rest[k] || '').trim());
  if (missing.length) return NextResponse.json({ ok: false, error: `필수 항목 누락: ${missing.join(', ')}` }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(rest.email)) return NextResponse.json({ ok: false, error: '이메일 형식이 올바르지 않습니다.' }, { status: 400 });
  const subject = kind === 'business' ? `[H2A 기업교육 제안 요청] ${rest.company}` : `[H2A 상담 문의] ${rest.name}${rest.program ? ' · ' + rest.program : ''}`;
  const result = await sendMail({ subject, text: fields({ 접수시각: new Date().toISOString(), 구분: kind === 'business' ? '기업 교육' : '개인 프로그램', ...rest }), replyTo: rest.email });
  return NextResponse.json({ ok: true, ...result });
}
