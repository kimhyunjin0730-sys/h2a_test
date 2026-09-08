'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import { PageTitle } from '@/components/bits';
import { portoneConfig, programsData } from '@/lib/content';
import { showToast } from '@/lib/toast';

/* 시안 views.payment + ui.js processPayment. 결제창은 포트원 V2 브라우저 SDK, 성공 뒤 /api/payments/complete 로 서버 검증. */
type Method = { label: string; payMethod: 'CARD' | 'TRANSFER' | 'VIRTUAL_ACCOUNT' | 'EASY_PAY'; easyPay?: string; channel?: 'eximbay'; icon: React.ReactNode };
const METHODS: Method[] = [
  { label: '신용·체크카드', payMethod: 'CARD', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> },
  { label: '계좌이체', payMethod: 'TRANSFER', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h13" /><path d="M13 6l6 6-6 6" /></svg> },
  { label: '가상계좌(무통장)', payMethod: 'VIRTUAL_ACCOUNT', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="3" width="14" height="18" rx="2" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /></svg> },
  { label: '알리페이 (Alipay)', payMethod: 'EASY_PAY', easyPay: 'ALIPAY', channel: 'eximbay', icon: <span className="pay-brand-dot" style={{ background: '#1677FF' }}></span> },
  { label: '위챗페이 (WeChat Pay)', payMethod: 'EASY_PAY', easyPay: 'WECHAT_PAY', channel: 'eximbay', icon: <span className="pay-brand-dot" style={{ background: '#07C160' }}></span> },
];

type Cfg = { storeId: string; channelKey: string; channelKeyEximbay: string; testAmount: number };
const envCfg = (): Cfg => ({
  storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID || portoneConfig.storeId || '',
  channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY || portoneConfig.channelKey || '',
  channelKeyEximbay: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY_EXIMBAY || portoneConfig.channelKeyEximbay || '',
  testAmount: Number(process.env.NEXT_PUBLIC_PORTONE_TEST_AMOUNT || portoneConfig.testAmount || 1000),
});
const readCfg = (): Cfg => {
  const cfg = envCfg();
  try { const saved = JSON.parse(localStorage.getItem('h2a_portone') || 'null'); if (saved && typeof saved === 'object') Object.assign(cfg, saved); } catch { /* 무시 */ }
  cfg.testAmount = Math.max(100, parseInt(String(cfg.testAmount), 10) || 1000);
  return cfg;
};
const priceOf = (title: string) => { const m = (programsData.find((p) => p.title === title)?.price || '').replace(/[^\d]/g, ''); return m ? Number(m) : 0; };

export default function PaymentPage() {
  const router = useRouter();
  const [cfg, setCfg] = useState<Cfg>(envCfg);
  const [program, setProgram] = useState('');
  const [method, setMethod] = useState<Method | null>(null);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ storeId: '', channelKey: '', channelKeyEximbay: '', testAmount: '1000' });
  const p = useMemo(() => programsData.find((x) => x.title === program), [program]);
  const live = !!(cfg.storeId && cfg.channelKey);
  const isTest = /iamporttest|test/i.test(cfg.channelKey) || true; // 실연동 채널로 바꾸면 안내 문구를 손본다.

  useEffect(() => {
    const c = readCfg(); setCfg(c); setForm({ storeId: c.storeId, channelKey: c.channelKey, channelKeyEximbay: c.channelKeyEximbay, testAmount: String(c.testAmount) });
    setProgram(sessionStorage.getItem('h2a_pay_prog') || '');
    // 모바일: 결제창이 페이지를 떠났다가 ?portone=return 으로 돌아온 경우
    const q = new URLSearchParams(location.search);
    if (q.get('portone') === 'return') {
      history.replaceState(null, '', location.pathname);
      let pending: { paymentId?: string; program?: string; amount?: number; method?: string } | null = null;
      try { pending = JSON.parse(sessionStorage.getItem('h2a_portone_pending') || 'null'); } catch { /* 무시 */ }
      if (q.get('code')) { setError((q.get('message') || q.get('code') || '') + (q.get('pgMessage') ? ` (${q.get('pgMessage')})` : '')); sessionStorage.removeItem('h2a_portone_pending'); }
      else finish({ paymentId: q.get('paymentId') || pending?.paymentId || '', txId: q.get('txId') || '' }, pending);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function finish(res: { paymentId: string; txId: string }, pending: { program?: string; amount?: number; method?: string } | null) {
    let verify: Record<string, unknown> = {};
    try {
      const r = await fetch('/api/payments/complete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paymentId: res.paymentId, amount: pending?.amount, program: pending?.program, method: pending?.method }) });
      verify = await r.json();
      if (!r.ok || !verify.ok) { setError('서버 검증 실패: ' + (verify.error || verify.status || r.status)); sessionStorage.removeItem('h2a_portone_pending'); return; }
    } catch (e) { verify = { ok: false, error: String(e) }; }
    sessionStorage.setItem('h2a_portone_last', JSON.stringify({ program: '', amount: 0, method: '', ...(pending || {}), ...res, verify, at: new Date().toISOString() }));
    sessionStorage.removeItem('h2a_portone_pending');
    sessionStorage.setItem('h2a_apply_prog', pending?.program || '');
    router.push('/payment/complete');
  }

  const pay = async () => {
    if (!program) return showToast('프로그램을 선택해주세요.');
    if (!method) return showToast('결제 수단을 선택해주세요.');
    if (!agree) return showToast('결제 진행 동의에 체크해주세요.');
    setError('');
    if (!live) return showToast('포트원 상점 아이디·채널 키가 설정되지 않았습니다. 아래 테스트 설정 또는 환경변수에 넣어주세요.');
    const isEx = method.channel === 'eximbay';
    if (isEx && !cfg.channelKeyEximbay) return showToast('엑심베이 채널 키가 없습니다. 콘솔에서 엑심베이(신모듈 V2) 채널을 만든 뒤 테스트 설정에 넣어주세요.');
    const realPrice = priceOf(program);
    const amount = isTest ? cfg.testAmount : realPrice;
    const paymentId = 'h2a-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req: any = {
      storeId: cfg.storeId, channelKey: isEx ? cfg.channelKeyEximbay : cfg.channelKey, paymentId,
      orderName: (isTest ? '[테스트] ' : '') + program, totalAmount: amount, currency: 'CURRENCY_KRW', payMethod: method.payMethod,
      redirectUrl: location.origin + location.pathname + '?portone=return',
    };
    if (method.easyPay) req.easyPay = { easyPayProvider: method.easyPay };
    if (method.payMethod === 'VIRTUAL_ACCOUNT') req.virtualAccount = { accountExpiry: { validHours: 24 } };
    if (isEx) { req.customer = { fullName: '테스트 고객', email: 'biz.h2a@gmail.com' }; req.products = [{ id: 'h2a-program', name: req.orderName, amount, quantity: 1, link: location.origin + '/programs' }]; }
    const pending = { paymentId, program, amount, method: method.label };
    sessionStorage.setItem('h2a_portone_pending', JSON.stringify(pending));
    setBusy(true);
    try {
      const res = await PortOne.requestPayment(req);
      if (!res) return;
      if (res.code !== undefined) { showToast('결제 실패: ' + (res.message || res.code)); return; }
      await finish({ paymentId: res.paymentId || paymentId, txId: res.txId || '' }, pending);
    } catch (e) { showToast('결제창을 열지 못했습니다: ' + (e instanceof Error ? e.message : String(e))); } finally { setBusy(false); }
  };

  const saveKeys = () => {
    const s = form.storeId.trim(), c = form.channelKey.trim(), x = form.channelKeyEximbay.trim();
    if (!s || !c) return showToast('상점 아이디와 채널 키를 모두 입력해주세요.');
    if (!/^store-[0-9a-f-]{20,}$/i.test(s)) return showToast('상점 아이디는 store- 로 시작하는 포트원 값입니다. (PG상점아이디(MID)가 아닙니다)');
    if (!/^channel-key-[0-9a-f-]{20,}$/i.test(c) || (x && !/^channel-key-[0-9a-f-]{20,}$/i.test(x))) return showToast('채널 키는 channel-key- 로 시작하는 값입니다.');
    localStorage.setItem('h2a_portone', JSON.stringify({ storeId: s, channelKey: c, channelKeyEximbay: x, testAmount: parseInt(form.testAmount, 10) || 1000 }));
    setCfg(readCfg()); showToast('이 브라우저에 테스트 설정을 저장했습니다.');
  };
  const clearKeys = () => { localStorage.removeItem('h2a_portone'); const c = readCfg(); setCfg(c); setForm({ storeId: c.storeId, channelKey: c.channelKey, channelKeyEximbay: c.channelKeyEximbay, testAmount: String(c.testAmount) }); showToast('브라우저 저장 설정을 지웠습니다.'); };
  const banner = { background: 'var(--brand-red-soft)', color: 'var(--brand-red-dark)', padding: '1rem', marginBottom: '2rem', fontWeight: 700, fontSize: '0.9rem' } as const;

  return (
    <div className="page-view active">
      <PageTitle eng="Payment" kor="결제하기" />
      <div className="container section-wrap" style={{ maxWidth: 800 }}>
        {live ? <div style={banner}>포트원 테스트 채널에 연결돼 있습니다. 결제창은 PG 테스트 환경이라 실제 출금은 없습니다.</div> : <div style={banner}>포트원 설정 전입니다. 상점 아이디·채널 키를 넣으면 실제 결제창이 열립니다.</div>}
        {error ? <div role="alert" style={{ border: '1px solid var(--brand-red)', color: 'var(--brand-red-dark)', padding: '1rem', marginBottom: '2rem', fontSize: '0.9rem' }}>결제가 완료되지 않았습니다: {error}</div> : null}
        <div style={{ border: '1px solid var(--line)', background: 'var(--surface)', padding: '2rem', marginBottom: '2.5rem' }}>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem' }}>주문 정보</h4>
          <div className="list-meta" style={{ margin: 0 }}>
            <span>프로그램</span><span><select id="pay-program" value={program} onChange={(e) => { setProgram(e.target.value); sessionStorage.setItem('h2a_pay_prog', e.target.value); }} style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--line)', fontFamily: 'inherit' }}><option value="">프로그램을 선택하세요</option>{programsData.map((x) => <option key={x.id} value={x.title}>{x.title}</option>)}</select></span>
            <span>일정</span><span>{p ? p.schedule : '-'}</span>
            <span>결제 예정 금액</span><span style={{ fontWeight: 700, color: 'var(--brand-red-dark)' }}>{p ? p.price : '-'}</span>
            {live ? <><span>테스트 결제 금액</span><span style={{ fontWeight: 700 }}>{cfg.testAmount.toLocaleString('ko-KR')}원 <small style={{ fontWeight: 400, color: 'var(--text-sub)' }}>(테스트 채널 · 실제 출금 없음)</small></span></> : null}
          </div>
        </div>
        <h4 style={{ fontSize: '1.05rem', marginBottom: '1.2rem' }}>결제 수단 선택</h4>
        <div className="pay-method-grid">
          {METHODS.map((m) => <button type="button" key={m.label} className={`pay-tile${method?.label === m.label ? ' active' : ''}`} onClick={() => setMethod(m)}>{m.icon}{m.label}</button>)}
        </div>
        <label className="checkbox-label" style={{ marginTop: '2rem', display: 'block' }}><input type="checkbox" id="pay-agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} /> [필수] 유료 서비스 결제 진행 및 결제조건 동의</label>
        <button type="button" id="pay-submit" onClick={pay} className="btn btn-primary btn-full" style={{ marginTop: '1.5rem' }} disabled={busy}>{busy ? '결제창 여는 중…' : '결제하기'}</button>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-sub)' }}>결제하기를 누르면 포트원 결제창이 열립니다. 승인 뒤 서버에서 결제 상태를 다시 확인한 다음 완료 화면으로 넘어갑니다.</p>
        <details style={{ marginTop: '2.5rem', borderTop: '1px dashed var(--line)', paddingTop: '1rem', fontSize: '0.85rem', color: 'var(--text-sub)' }}><summary style={{ cursor: 'pointer' }}>포트원 테스트 설정 (개발용 · 이 브라우저에만 저장)</summary>
          <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
            <label>상점 아이디 <input value={form.storeId} onChange={(e) => setForm({ ...form, storeId: e.target.value })} placeholder="store-…" autoComplete="off" style={{ padding: 8 }} /></label>
            <label>채널 키 <input value={form.channelKey} onChange={(e) => setForm({ ...form, channelKey: e.target.value })} placeholder="channel-key-…" autoComplete="off" style={{ padding: 8 }} /></label>
            <label>엑심베이 채널 키 <small>(해외결제: 알리페이·위챗페이)</small> <input value={form.channelKeyEximbay} onChange={(e) => setForm({ ...form, channelKeyEximbay: e.target.value })} placeholder="channel-key-… (없으면 비워 둠)" autoComplete="off" style={{ padding: 8 }} /></label>
            <label>테스트 금액(원) <input type="number" min={100} step={100} value={form.testAmount} onChange={(e) => setForm({ ...form, testAmount: e.target.value })} style={{ padding: 8 }} /></label>
            <div style={{ display: 'flex', gap: 8 }}><button type="button" className="btn btn-outline" onClick={saveKeys}>저장</button><button type="button" className="btn btn-outline" onClick={clearKeys}>지우기</button></div>
            <p style={{ margin: 0 }}>API Secret 은 넣지 않습니다(서버 환경변수 전용). 콘솔 &gt; 결제 연동 &gt; 연동 정보에서 채널 키와 상점 아이디를 복사하세요.</p>
          </div>
        </details>
      </div>
    </div>
  );
}
