import type { Metadata } from 'next';
import CardsHub from '@/components/CardsHub';
import { galleryData } from '@/lib/content';
export const metadata: Metadata = { title: '교육 현장' };
export default function Page() { return <CardsHub title="GALLERY" items={galleryData} kind="gallery" />; }
