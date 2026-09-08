import { NextResponse } from 'next/server';
import * as PortOne from '@portone/server-sdk';
import { fields, sendMail } from '@/lib/mail';

/* 포트원 콘솔 > 결제알림(Webhook) 관리에 등록할 주소: https://<도메인>/api/payments/webhook
   가상계좌 입금·취소처럼 결제창 밖에서 상태가 바뀔 때 포트원이 호출한다. PORTONE_WEBHOOK_SECRET 으로 서명을 확인한다. */
export async function POST(req: Request) {
  const raw = await req.text();
  const secret = process.env.PORTONE_WEBHOOK_SECRET;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: any;
  if (secret) {
    try {
      const headers: Record<string, string> = {};
      req.headers.forEach((v, k) => { headers[k] = v; });
      event = await PortOne.Webhook.verify(secret, raw, headers);
    } catch (e) {
      return NextResponse.json({ ok: false, error: '서명 검증 실패: ' + (e instanceof Error ? e.message : String(e)) }, { status: 400 });
    }
  } else {
    try { event = JSON.parse(raw); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  }
  const type: string = event?.type ?? '';
  const data = event?.data ?? {};
  console.log('[portone:webhook]', type, JSON.stringify(data).slice(0, 300));
  if (/^Transaction\.(Paid|VirtualAccountIssued|Cancelled|PartialCancelled|Failed)$/.test(type)) {
    await sendMail({ subject: `[H2A 결제 알림] ${type}`, text: fields({ type, paymentId: data.paymentId ?? '', transactionId: data.transactionId ?? '', storeId: data.storeId ?? '', 수신시각: new Date().toISOString(), 서명검증: secret ? '완료' : '미설정' }) });
  }
  return NextResponse.json({ ok: true });
}
