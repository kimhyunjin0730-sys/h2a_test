import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentDetail from '@/components/ContentDetail';
import { reviewsData } from '@/lib/content';
type Params = { params: Promise<{ id: string }> };
export function generateStaticParams() { return reviewsData.map((x) => ({ id: x.id })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { id } = await params; const item = reviewsData.find((x) => x.id === id); return { title: item ? item.title : '프로그램 후기' }; }
export default async function Page({ params }: Params) {
  const { id } = await params; const item = reviewsData.find((x) => x.id === id);
  if (!item) notFound();
  return <ContentDetail item={item} listPath="/reviews" />;
}
