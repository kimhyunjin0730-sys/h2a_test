import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { refundData } from '@/lib/content';
export const metadata: Metadata = { title: '취소·환불정책' };
export default function Page() { return <LegalPage title="취소·환불정책" items={refundData} />; }
