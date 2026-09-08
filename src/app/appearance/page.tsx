import type { Metadata } from 'next';
import ProgramsHub from '@/components/ProgramsHub';
export const metadata: Metadata = { title: '외면소통 ACADEMY' };
export default function Page() { return <ProgramsHub cat="appearance" title="외면소통 ACADEMY" />; }
