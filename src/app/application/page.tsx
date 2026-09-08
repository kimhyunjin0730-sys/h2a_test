import type { Metadata } from 'next';
import ApplicationForm from '@/components/ApplicationForm';
export const metadata: Metadata = { title: '프로그램 신청' };
export default function Page() { return <ApplicationForm />; }
