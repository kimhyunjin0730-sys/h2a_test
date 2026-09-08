import type { Metadata } from 'next';
import ContactForms from '@/components/ContactForms';
export const metadata: Metadata = { title: '기업교육 제안 요청' };
export default function Page() { return <ContactForms isBusiness />; }
