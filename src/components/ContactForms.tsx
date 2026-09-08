'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { programsData } from '@/lib/content';
import { ADDRESS, MAP_EMBED, MAP_URL } from '@/lib/links';
import { showToast } from '@/lib/toast';
import { postJson } from '@/lib/api';

/* 시안 views.contactForms + renderFormToggle. 전송은 /api/contact (메일). */
export default function ContactForms({ isBusiness }: { isBusiness: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [program, setProgram] = useState('');
  useEffect(() => {
    const pending = sessionStorage.getItem('h2a_inq_prog');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 마운트 뒤 브라우저 저장소(sessionStorage/localStorage)에서 값을 읽어 동기화한다
    if (pending && !isBusiness) { setProgram(pending); sessionStorage.removeItem('h2a_inq_prog'); }
  }, [isBusiness]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = { kind: isBusiness ? 'business' : 'personal' };
    fd.forEach((v, k) => { data[k] = String(v); });
    setBusy(true);
    try {
      const j = await postJson('/api/contact', data);
      if (!j.ok) { showToast(String(j.error || '전송에 실패했습니다. 잠시 후 다시 시도해주세요.')); return; }
      if (j.preview) showToast('미리보기에서는 실제로 전송되지 않습니다.');
      router.push('/contact/complete');
    } finally { setBusy(false); }
  };

  return (
    <>
      <div className="page-view active">
        <div className="hero-section"><div className="container"><span className="label-sm">Contact</span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0, margin: '1rem auto 2rem', maxWidth: 400 }}>
            <Link href="/contact" id="tab-personal" className={`btn ${!isBusiness ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, borderRadius: 0 }}>개인 프로그램</Link>
            <Link href="/business-contact" id="tab-corporate" className={`btn ${isBusiness ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, borderRadius: 0 }}>기업 교육</Link>
          </div>
        </div></div>
        <div className="container section-wrap grid-2" style={{ alignItems: 'start' }}>
          <div style={{ background: 'var(--surface)', padding: '3rem', border: '1px solid var(--line)' }}>
            <h1 className="section-title" id="contact-dynamic-title">{isBusiness ? <>조직의 언어를<br />바꾸다.</> : <>전문성을<br />영향력으로.</>}</h1>
            <p className="body-large" id="contact-dynamic-desc">{isBusiness ? '임원 프레즌스 강화 및 사내 커뮤니케이션 개선 제안을 요청하세요.' : '프로그램 관련 궁금하신 점이나 심층 상담을 신청하세요.'}</p>
          </div>
          <form className="form-grid" style={{ margin: 0, maxWidth: '100%' }} onSubmit={submit}>
            <p className="form-note">상담 내용을 남겨주시면 프로그램과 운영 일정을 안내해드립니다.</p>
            <div id="contact-dynamic-fields">
              {isBusiness ? (
                <>
                  <div className="form-group"><label htmlFor="c-company">기업명</label><input id="c-company" name="company" type="text" required /></div>
                  <div className="form-group"><label htmlFor="c-manager">담당자명 / 직함</label><input id="c-manager" name="manager" type="text" required /></div>
                  <div className="form-group"><label htmlFor="c-phone">연락처</label><input id="c-phone" name="phone" type="tel" required /></div>
                  <div className="form-group"><label htmlFor="c-email">이메일</label><input id="c-email" name="email" type="email" required /></div>
                  <div className="form-group"><label htmlFor="c-scope">대상 및 인원 / 희망 일정</label><input id="c-scope" name="scope" type="text" /></div>
                  <div className="form-group"><label htmlFor="c-message">교육 목적 및 문의 내용</label><textarea id="c-message" name="message" rows={5} required></textarea></div>
                </>
              ) : (
                <>
                  <div className="form-group"><label htmlFor="c-name">성함</label><input id="c-name" name="name" type="text" required /></div>
                  <div className="form-group"><label htmlFor="c-phone">연락처</label><input id="c-phone" name="phone" type="tel" required pattern="[0-9-]+" placeholder="010-0000-0000" /></div>
                  <div className="form-group"><label htmlFor="c-email">이메일</label><input id="c-email" name="email" type="email" required /></div>
                  <div className="form-group"><label htmlFor="contact-program">관심 프로그램</label><select id="contact-program" name="program" value={program} onChange={(e) => setProgram(e.target.value)}><option value="">선택 안함</option>{programsData.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}</select></div>
                  <div className="form-group"><label htmlFor="c-message">문의 내용</label><textarea id="c-message" name="message" rows={5} required></textarea></div>
                </>
              )}
            </div>
            <div className="form-group"><label className="checkbox-label"><input type="checkbox" name="agree" required /> [필수] 개인정보 수집 및 이용 동의 <Link href="/privacy" target="_blank" rel="noopener">내용 보기</Link></label></div>
            <button type="submit" className="btn btn-primary" id="contact-dynamic-btn" style={{ marginTop: '1rem' }} disabled={busy}>{busy ? '전송 중…' : isBusiness ? '제안 요청하기' : '상담 문의 접수'}</button>
          </form>
        </div>
      </div>
      <div className="container section-wrap" style={{ borderTop: '1px solid var(--line)' }}>
        <span className="label-sm">Location</span>
        <h2 className="section-title eng-title">오시는 길</h2>
        <div className="grid-2 items-center" style={{ marginTop: '2.5rem', gap: '2.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem' }}>에이치스퀘어 어쏘시에이츠 주식회사</h3>
            <p className="body-large" style={{ marginBottom: '0.75rem' }}>{ADDRESS}</p>
            <p style={{ color: 'var(--text-sub)', marginBottom: '2rem' }}>Tel. 010-9005-6009 / E. biz.h2a@gmail.com</p>
            <a href={MAP_URL} className="btn btn-outline" target="_blank" rel="noopener noreferrer">지도에서 열기</a>
          </div>
          <iframe className="location-map-iframe" style={{ height: 320, width: '100%', border: 0 }} src={MAP_EMBED} loading="lazy" allowFullScreen title="구글 지도"></iframe>
        </div>
      </div>
    </>
  );
}
