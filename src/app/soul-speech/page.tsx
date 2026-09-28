import type { Metadata } from 'next';
import ProgramsHub from '@/components/ProgramsHub';
import { ACADEMY } from '@/lib/academies';
export const metadata: Metadata = { title: ACADEMY.soulSpeech };
export default function Page() { return <ProgramsHub cat="soulspeech" title={ACADEMY.soulSpeech} />; }
