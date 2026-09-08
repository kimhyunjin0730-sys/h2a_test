import type { Metadata } from 'next';
import CardsHub from '@/components/CardsHub';
import { noticesData } from '@/lib/content';
export const metadata: Metadata = { title: '공지사항' };
export default function Page() { return <CardsHub title="NOTICE" items={noticesData} kind="notices" />; }
