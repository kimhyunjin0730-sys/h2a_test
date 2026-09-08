'use client';
import { openGallery } from '@/lib/gallery';

export default function GalleryButton({ index, className, ariaLabel, children }: { index: number; className: string; ariaLabel: string; children: React.ReactNode }) {
  return <button type="button" className={className} aria-label={ariaLabel} onClick={() => openGallery(index)}>{children}</button>;
}
