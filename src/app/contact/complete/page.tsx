import type { Metadata } from 'next';
import { Message } from '@/components/bits';
export const metadata: Metadata = { title: '문의 접수 완료' };
export default function Page() { return <Message title="문의가 접수되었습니다" desc="담당자가 확인 후 남겨주신 연락처로 안내드리겠습니다." btnTxt="홈으로 돌아가기" href="/" />; }
