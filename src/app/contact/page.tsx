import type { Metadata } from 'next';
import ContactForms from '@/components/ContactForms';
export const metadata: Metadata = { title: '문의하기' };
export default function Page() { return <ContactForms isBusiness={false} />; }
