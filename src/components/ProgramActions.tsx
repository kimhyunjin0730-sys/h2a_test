'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { programsData } from '@/lib/content';

/* 시안 goApplication / goContact / history.back / 상담 예약(관심 프로그램 미리 선택) */
export function ApplyButton({ title, cta }: { title: string; cta: string }) {
  const router = useRouter();
  const go = () => {
    const program = programsData.find((p) => p.title === title);
    if (!program || !program.paymentEnabled) { sessionStorage.setItem('h2a_inq_prog', title); router.push('/contact'); return; }
    sessionStorage.setItem('h2a_pay_prog', title); router.push('/payment');
  };
  return <button className="btn btn-primary btn-full" style={{ marginTop: '2rem' }} onClick={go}>{cta}</button>;
}

export function ContactProgramButton({ title }: { title: string }) {
  const router = useRouter();
  return <button className="btn btn-primary" onClick={() => { sessionStorage.setItem('h2a_inq_prog', title); router.push('/contact'); }}>이 프로그램 상담하기 →</button>;
}

export function BackButton() {
  const router = useRouter();
  return <button onClick={() => router.back()} className="btn btn-thin">← 이전 화면으로 돌아가기</button>;
}

export function InquiryLink({ program, href = '/contact', className, children }: { program: string; href?: string; className?: string; children: React.ReactNode }) {
  return <Link href={href} className={className} onClick={() => sessionStorage.setItem('h2a_inq_prog', program)}>{children}</Link>;
}
