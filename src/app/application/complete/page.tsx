import type { Metadata } from 'next';
import { Message } from '@/components/bits';
export const metadata: Metadata = { title: '신청 접수 완료' };
export default function Page() { return <Message title="신청이 접수되었습니다" desc="담당자 확인 후 일정과 진행 안내를 보내드립니다. 접수 확인 메일이 발송됩니다." btnTxt="홈으로 돌아가기" href="/" />; }
