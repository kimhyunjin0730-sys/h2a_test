import type { Metadata } from 'next';
import ProgramsHub from '@/components/ProgramsHub';
export const metadata: Metadata = { title: '프로그램' };
export default function Page() { return <ProgramsHub cat="all" title="PROGRAMS" />; }
