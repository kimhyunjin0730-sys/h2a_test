import type { Metadata } from 'next';
import ProgramsHub from '@/components/ProgramsHub';
export const metadata: Metadata = { title: 'HWANG JUNGSUN Academy' };
export default function Page() { return <ProgramsHub cat="appearance" title="HWANG JUNGSUN Academy" />; }
