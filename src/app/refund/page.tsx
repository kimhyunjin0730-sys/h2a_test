import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
export const metadata: Metadata = { title: '취소·환불정책' };
export default function Page() { return <LegalPage slug="refund" />; }
