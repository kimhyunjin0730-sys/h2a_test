import type { Metadata } from 'next';
import PaymentPage from '@/components/PaymentPage';
export const metadata: Metadata = { title: '결제하기' };
export default function Page() { return <PaymentPage />; }
