import type { Metadata } from 'next';
import ProgramsHub from '@/components/ProgramsHub';
export const metadata: Metadata = { title: 'Soul Speech ACADEMY' };
export default function Page() { return <ProgramsHub cat="soulspeech" title="Soul Speech ACADEMY" />; }
