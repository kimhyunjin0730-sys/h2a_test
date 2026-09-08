import { NextResponse } from 'next/server';
import * as PortOne from '@portone/server-sdk';
import { fields, sendMail } from '@/lib/mail';

/* 결제창이 성공을 돌려준 뒤 브라우저가 호출한다. 포트원 서버 API 로 결제 상태·금액을 다시 확인한다.
   PORTONE_API_SECRET 이 없으면(초기 테스트) 검증을 건너뛰고 그 사실을 응답에 적는다. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { paymentId?: string; amount?: number; program?: string; method?: string } | null;
  const paymentId = body?.paymentId?.trim();
  if (!paymentId || !/^[A-Za-z0-9_-]{1,64}$/.test(paymentId)) return NextResponse.json({ ok: false, error: 'paymentId 가 없습니다.' }, { status: 400 });

  const secret = process.env.PORTONE_API_SECRET;
  if (!secret) return NextResponse.json({ ok: true, verified: false, note: 'PORTONE_API_SECRET 미설정 — 서버 검증 생략(테스트)' });

  try {
    const client = PortOne.PortOneClient({ secret });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payment: any = await client.payment.getPayment({ paymentId });
    const status: string = payment?.status ?? 'UNKNOWN';
    const total: number = Number(payment?.amount?.total ?? NaN);
    const currency: string = payment?.currency ?? '';
    const expected = Number(body?.amount ?? NaN);
    const paid = status === 'PAID' || status === 'VIRTUAL_ACCOUNT_ISSUED';
    const amountOk = !Number.isFinite(expected) || total === expected;
    const ok = paid && amountOk;
    if (ok && status === 'PAID') {
      await sendMail({ subject: `[H2A 결제 완료] ${body?.program ?? payment?.orderName ?? ''} · ${total.toLocaleString('ko-KR')}원`, text: fields({ paymentId, 상태: status, 금액: total, 통화: currency, 프로그램: body?.program ?? '', 결제수단: body?.method ?? '', 주문명: payment?.orderName ?? '', 승인시각: payment?.paidAt ?? '' }) });
    }
    return NextResponse.json({ ok, verified: true, status, amount: total, currency, amountOk, orderName: payment?.orderName ?? '' }, { status: ok ? 200 : 409 });
  } catch (e) {
    return NextResponse.json({ ok: false, verified: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
