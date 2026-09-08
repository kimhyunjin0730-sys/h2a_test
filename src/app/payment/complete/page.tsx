import type { Metadata } from 'next';
import PaymentComplete from '@/components/PaymentComplete';
export const metadata: Metadata = { title: '결제 완료' };
export default function Page() { return <PaymentComplete />; }
