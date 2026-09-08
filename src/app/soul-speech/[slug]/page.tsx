import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProgramDetail from '@/components/ProgramDetail';
import { findProgram, programsData } from '@/lib/content';
type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return programsData.filter((p) => p.category === 'soulspeech').map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { slug } = await params; const p = findProgram(slug); return { title: p ? p.title : '프로그램' }; }
export default async function Page({ params }: Params) {
  const { slug } = await params; const p = findProgram(slug);
  if (!p) notFound();
  return <ProgramDetail p={p} />;
}
