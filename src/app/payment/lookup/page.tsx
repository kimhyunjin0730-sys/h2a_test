import type { Metadata } from 'next';
import { Message } from '@/components/bits';
export const metadata: Metadata = { title: '결제 확인' };
export default function Page() { return <Message title="PAYMENT STATUS" desc="결제·신청 상태 조회는 준비 중입니다. 접수 메일의 신청번호로 문의해주세요." btnTxt="문의하기" href="/contact" />; }
