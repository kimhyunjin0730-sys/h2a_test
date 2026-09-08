import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentDetail from '@/components/ContentDetail';
import { noticesData } from '@/lib/content';
type Params = { params: Promise<{ id: string }> };
export function generateStaticParams() { return noticesData.map((x) => ({ id: x.id })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { id } = await params; const item = noticesData.find((x) => x.id === id); return { title: item ? item.title : '공지사항' }; }
export default async function Page({ params }: Params) {
  const { id } = await params; const item = noticesData.find((x) => x.id === id);
  if (!item) notFound();
  return <ContentDetail item={item} listPath="/notices" />;
}
