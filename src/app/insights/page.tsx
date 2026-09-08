import type { Metadata } from 'next';
import CardsHub from '@/components/CardsHub';
import { insightsData } from '@/lib/content';
export const metadata: Metadata = { title: '인사이트' };
export default function Page() { return <CardsHub title="H2A INSIGHTS" items={insightsData} kind="insights" />; }
