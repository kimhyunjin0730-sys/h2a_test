import Link from 'next/link';
import { ADDRESS } from '@/lib/links';

export default function Footer() {
  return (
    <>
      <Link href="/contact" className="floating-contact">상담 문의 <span aria-hidden="true">↗</span></Link>
      <button className="back-to-top" data-back-top aria-label="맨 위로 이동">↑</button>
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo eng-title" style={{ color: 'var(--ink)', marginBottom: '1.5rem' }}><span className="h2a-logo">H<sup>2</sup> Associates Ltd.</span></div>
              <p style={{ marginBottom: '0.5rem', fontWeight: 700 }}>에이치스퀘어 어쏘시에이츠 주식회사</p>
              <p style={{ marginBottom: '0.5rem' }}>대표이사 한석용 | 사업자등록번호 303-88-03622</p>
              <p style={{ marginBottom: '0.5rem' }}>통신판매업 신고: 준비 중 (신고 완료 후 게재) | <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=3038803622" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--text-sub)' }}>사업자정보 확인</a></p>
              <p style={{ marginBottom: '1.5rem' }}>{ADDRESS}</p>
              <p><a href="tel:01090056009">010-9005-6009</a> | <a href="mailto:biz.h2a@gmail.com">biz.h2a@gmail.com</a></p>
              <p style={{ marginTop: '1rem' }}>호스팅 제공자: Vercel Inc. | 개인정보 보호책임자: 한석용 (대표이사)</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 H² Associates Ltd. All Rights Reserved.</p>
            <div className="footer-links">
              <Link href="/terms">이용약관</Link>
              <Link href="/privacy">개인정보처리방침</Link>
              <Link href="/refund">취소·환불정책</Link>
              <Link href="/company">사업자정보</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
