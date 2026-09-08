import type { Metadata } from 'next';
import CardsHub from '@/components/CardsHub';
import { reviewsData } from '@/lib/content';
export const metadata: Metadata = { title: '프로그램 후기' };
export default function Page() { return <CardsHub title="PROGRAM REVIEWS" items={reviewsData} kind="reviews" />; }
