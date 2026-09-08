import type { Metadata } from 'next';
import { PageTitle } from '@/components/bits';
import { ADDRESS } from '@/lib/links';

export const metadata: Metadata = { title: '사업자정보' };

export default function CompanyPage() {
  const rows: [string, React.ReactNode][] = [
    ['영문 상호', <>H&sup2; Associates Ltd.</>], ['대표이사', '한석용'], ['사업자등록번호', '303-88-03622'], ['법인등록번호', '110111-0951022'],
    ['업태', '교육서비스업 / 도매 및 소매업 / 정보통신업'], ['종목', '교육서비스업 / 안경 및 잡화 / 전자상거래 / 소프트웨어 개발 및 공급업'],
    ['통신판매업 신고', '준비 중 (신고 완료 후 게재)'], ['주소', ADDRESS],
    ['대표 연락처', <a key="tel" href="tel:01090056009">010-9005-6009</a>], ['이메일', <a key="mail" href="mailto:biz.h2a@gmail.com">biz.h2a@gmail.com</a>],
  ];
  return (
    <div className="page-view active">
      <PageTitle eng="Company Info" kor="사업자정보" />
      <div className="container section-wrap" style={{ maxWidth: 800 }}>
        <div style={{ border: '1px solid var(--line)', background: 'var(--surface)', padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.8rem' }}>에이치스퀘어 어쏘시에이츠 주식회사</h3>
          {rows.map(([k, v]) => <div className="info-row" key={k}><span>{k}</span><span className="val">{v}</span></div>)}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}><a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=3038803622" target="_blank" rel="noopener noreferrer" className="btn btn-outline">공정거래위원회 사업자정보 확인</a></div>
        </div>
        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-sub)' }}>통신판매업 신고 완료 후 신고번호를 이 페이지와 하단 정보에 게재합니다.</p>
      </div>
    </div>
  );
}
