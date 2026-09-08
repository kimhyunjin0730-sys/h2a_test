'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { galleryData } from '@/lib/content';
import { asset } from '@/lib/links';

/* 시안 ui.js 의 갤러리 모달: 열기/닫기, 좌우 이동, ESC, 포커스 복귀, 배경 스크롤 잠금. */
export default function GalleryModal() {
  const [index, setIndex] = useState<number | null>(null);
  const returnTo = useRef<Element | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIndex(null);
    document.body.style.overflow = '';
    const el = returnTo.current as HTMLElement | null;
    if (el && el.isConnected) el.focus();
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const i = Number((e as CustomEvent).detail);
      if (!galleryData[i]) return;
      if (index === null) returnTo.current = document.activeElement;
      setIndex(i);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtn.current?.focus(), 0);
    };
    window.addEventListener('h2a:gallery', onOpen);
    return () => window.removeEventListener('h2a:gallery', onOpen);
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const nav = (dir: number) => setIndex((i) => (i === null ? i : (i + dir + galleryData.length) % galleryData.length));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') { e.preventDefault(); nav(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); nav(1); }
      if (e.key === 'Tab') {
        const scope = document.getElementById('galleryModal'); if (!scope) return;
        const f = [...scope.querySelectorAll<HTMLElement>('a,button,input,select,textarea')].filter((el) => el.getClientRects().length);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, close]);

  const item = index === null ? null : galleryData[index];
  const nav = (dir: number) => setIndex((i) => (i === null ? i : (i + dir + galleryData.length) % galleryData.length));
  return (
    <div className={`modal${item ? ' active' : ' hidden'}`} id="galleryModal" role="dialog" aria-modal="true" aria-label="이미지 갤러리">
      <button className="modal-close" id="closeModalBtn" aria-label="닫기" ref={closeBtn} onClick={close}>&times;</button>
      <div className="modal-controls">
        <button className="modal-btn" id="prevModalBtn" aria-label="이전 이미지" onClick={() => nav(-1)}>❮</button>
        <button className="modal-btn" id="nextModalBtn" aria-label="다음 이미지" onClick={() => nav(1)}>❯</button>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img id="modalImg" src={item ? asset(item.image || '') : ''} alt={item ? item.title : 'Gallery Image'} />
      <div className="modal-caption">
        <span className={`sample-label${item?.isSample ? '' : ' hidden'}`} id="modalSample">{item?.sampleLabel || ''}</span>
        <br /><span id="modalCaption">{item?.title || ''}</span>
      </div>
    </div>
  );
}
