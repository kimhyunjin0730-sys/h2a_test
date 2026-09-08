'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Message } from '@/components/bits';

type Last = { program?: string; amount?: number; method?: string; paymentId?: string; txId?: string; at?: string; verify?: { verified?: boolean; status?: string; note?: string } };

export default function PaymentComplete() {
  const [last, setLast] = useState<Last | null | undefined>(undefined);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- 마운트 뒤 sessionStorage 의 결제 결과를 읽는다
  useEffect(() => { try { setLast(JSON.parse(sessionStorage.getItem('h2a_portone_last') || 'null')); } catch { setLast(null); } }, []);
  if (last === undefined) return null;
  if (!last) return <Message title="PAYMENT COMPLETE" desc="결제 정보가 없습니다. 결제 페이지에서 다시 진행해주세요." btnTxt="결제 페이지로" href="/payment" />;
  const v = last.verify || {};
  const rows: [string, string][] = [
    ['프로그램', last.program || '-'], ['결제 수단', last.method || '-'], ['금액', (Number(last.amount) || 0).toLocaleString('ko-KR') + '원'],
    ['결제 ID', last.paymentId || '-'], ['거래 ID', last.txId || '-'], ['시각', last.at ? new Date(last.at).toLocaleString('ko-KR') : '-'],
    ['서버 검증', v.verified ? `완료 (${v.status || ''})` : (v.note || '생략')],
  ];
  return (
    <div className="page-view active"><div className="container section-wrap text-center" style={{ paddingTop: 150, maxWidth: 720 }}>
      <h1 className="eng-title message-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>PAYMENT COMPLETE</h1>
      <p className="body-large" style={{ marginBottom: '2rem' }}>결제가 승인되었습니다. 이어서 신청 정보를 입력해주세요.</p>
      <div style={{ textAlign: 'left', border: '1px solid var(--line)', background: 'var(--surface)', padding: '1.5rem', marginBottom: '2.5rem' }}>{rows.map(([k, val]) => <div className="info-row" key={k}><span>{k}</span><span className="val" style={{ wordBreak: 'break-all' }}>{val}</span></div>)}</div>
      <Link href="/application" className="btn btn-primary" style={{ marginRight: 8 }}>신청 정보 입력</Link><Link href="/payment" className="btn btn-outline">결제 페이지로</Link>
    </div></div>
  );
}
