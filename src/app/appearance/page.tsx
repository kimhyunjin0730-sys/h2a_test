import type { Metadata } from 'next';
import ProgramsHub from '@/components/ProgramsHub';
export const metadata: Metadata = { title: '황정선 아카데미' };
export default function Page() { return <ProgramsHub cat="appearance" title="황정선 아카데미" />; }
