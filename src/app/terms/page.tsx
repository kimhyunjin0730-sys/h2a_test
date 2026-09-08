import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
export const metadata: Metadata = { title: '이용약관' };
export default function Page() { return <LegalPage slug="terms" />; }
