'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageTitle } from '@/components/bits';
import { programsData } from '@/lib/content';
import { showToast } from '@/lib/toast';

/* 시안 views.application. 전송은 /api/apply (메일 + 신청번호). */
export default function ApplicationForm() {
  const router = useRouter();
  const [program, setProgram] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 마운트 뒤 브라우저 저장소(sessionStorage/localStorage)에서 값을 읽어 동기화한다
    const p = sessionStorage.getItem('h2a_apply_prog');
    if (p) { const hit = programsData.find((x) => x.title.includes(p) || p.includes(x.title)); if (hit) setProgram(hit.title); sessionStorage.removeItem('h2a_apply_prog'); }
  }, []);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget); const data: Record<string, string> = {};
    fd.forEach((v, k) => { data[k] = String(v); });
    let last: { paymentId?: string } | null = null;
    try { last = JSON.parse(sessionStorage.getItem('h2a_portone_last') || 'null'); } catch { /* 무시 */ }
    if (last?.paymentId) data.paymentId = last.paymentId;
    setBusy(true);
    try {
      const r = await fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const j = await r.json();
      if (!r.ok || !j.ok) { showToast(j.error || '접수에 실패했습니다.'); return; }
      sessionStorage.setItem('h2a_application_no', j.applicationNo || '');
      router.push('/application/complete');
    } catch { showToast('접수에 실패했습니다. 네트워크를 확인해주세요.'); } finally { setBusy(false); }
  };
  const agree = (label: string, href?: string) => (
    <label className="checkbox-label"><input type="checkbox" required /> {label} {href ? <Link href={href} target="_blank" style={{ color: 'var(--brand-red)', textDecoration: 'underline' }}>내용 보기</Link> : null}</label>
  );
  return (
    <div className="page-view active">
      <PageTitle eng="Application" kor="프로그램 신청" />
      <div className="container section-wrap" style={{ maxWidth: 800 }}>
        <form className="form-grid" onSubmit={submit}>
          <div className="form-group"><label htmlFor="apply-program">프로그램 및 기수 선택</label><select id="apply-program" name="program" required value={program} onChange={(e) => setProgram(e.target.value)}><option value="">선택</option>{programsData.map((p) => <option key={p.id} value={p.title}>{p.title} ({p.schedule})</option>)}</select></div>
          <div className="form-group"><label htmlFor="a-name">성명</label><input id="a-name" name="name" type="text" required /></div>
          <div className="form-group"><label htmlFor="a-phone">연락처</label><input id="a-phone" name="phone" type="tel" required pattern="[0-9-]+" placeholder="010-0000-0000" /></div>
          <div className="form-group"><label htmlFor="a-email">이메일</label><input id="a-email" name="email" type="email" required /></div>
          <div className="form-group"><label htmlFor="a-org">소속 및 직함</label><input id="a-org" name="org" type="text" /></div>
          <div className="form-group"><label htmlFor="a-note">참여 목적 및 요청사항</label><textarea id="a-note" name="note" rows={4}></textarea></div>
          <div className="form-group" style={{ marginTop: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.05rem' }}>필수 동의</h4>
            {agree('[필수] 이용약관 동의', '/terms')}{agree('[필수] 개인정보 수집·이용 동의', '/privacy')}{agree('[필수] 취소·환불정책 확인', '/refund')}{agree('[필수] 유료 서비스 및 결제조건 동의')}{agree('[필수] 프로그램 일정·장소·운영조건 동의')}
          </div>
          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '1rem' }} disabled={busy}>{busy ? '접수 중…' : '신청 접수'}</button>
        </form>
      </div>
    </div>
  );
}
