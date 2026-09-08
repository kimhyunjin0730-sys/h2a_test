import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { privacyData } from '@/lib/content';
export const metadata: Metadata = { title: '개인정보처리방침' };
export default function Page() { return <LegalPage title="개인정보처리방침" items={privacyData} />; }
