'use client';
import { useState } from 'react';
import { SampleLabel } from '@/components/bits';

/* 시안 toggleAccordion: 한 번에 하나만 열림 */
export default function Accordion({ items, sample }: { items: { q: string; a: string }[]; sample?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((f, i) => (
        <div className="acc-item" key={f.q}>
          <button className="acc-btn" aria-expanded={open === i} onClick={() => setOpen((o) => (o === i ? null : i))}>Q. {f.q} <span className="icon">▼</span></button>
          <div className="acc-content">{sample ? <><SampleLabel show txt="화면 검수용 샘플" /><br /></> : null}{f.a}</div>
        </div>
      ))}
    </div>
  );
}
