import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentDetail from '@/components/ContentDetail';
import { insightsData } from '@/lib/content';
type Params = { params: Promise<{ id: string }> };
export function generateStaticParams() { return insightsData.map((x) => ({ id: x.id })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { id } = await params; const item = insightsData.find((x) => x.id === id); return { title: item ? item.title : '인사이트' }; }
export default async function Page({ params }: Params) {
  const { id } = await params; const item = insightsData.find((x) => x.id === id);
  if (!item) notFound();
  return <ContentDetail item={item} listPath="/insights" />;
}
