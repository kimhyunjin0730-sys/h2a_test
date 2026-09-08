import type { Metadata } from 'next';
import ProgramsHub from '@/components/ProgramsHub';
export const metadata: Metadata = { title: 'Private Programs' };
export default function Page() { return <ProgramsHub cat="experience" title="Private Programs" />; }
