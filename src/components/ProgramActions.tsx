'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { programsData } from '@/lib/content';

/* 시안 goApplication / goContact / history.back / 상담 예약(관심 프로그램 미리 선택) */
export function ApplyButton({ title, cta }: { title: string; cta: string }) {
  const router = useRouter();
  // 규칙(9/8): 상단 메뉴 「문의」·플로팅 「상담 문의」 외의 상담·신청 버튼은 모두 결제 페이지로. 가격 미확정은 결제 페이지가 안내한다.
  void programsData; void cta;
  const go = () => { sessionStorage.setItem('h2a_pay_prog', title); router.push('/payment'); };
  return <button className="btn btn-primary btn-full" style={{ marginTop: '2rem' }} onClick={go}>프로그램 신청</button>;
}

export function ContactProgramButton({ title }: { title: string }) {
  const router = useRouter();
  return <button className="btn btn-primary" onClick={() => { sessionStorage.setItem('h2a_pay_prog', title); router.push('/payment'); }}>이 프로그램 신청하기 →</button>;
}

export function BackButton() {
  const router = useRouter();
  return <button onClick={() => router.back()} className="btn btn-thin">← 이전 화면으로 돌아가기</button>;
}

export function InquiryLink({ program, href = '/contact', className, children }: { program: string; href?: string; className?: string; children: React.ReactNode }) {
  return <Link href={href} className={className} onClick={() => sessionStorage.setItem(href.startsWith('/payment') ? 'h2a_pay_prog' : 'h2a_inq_prog', program)}>{children}</Link>;
}
