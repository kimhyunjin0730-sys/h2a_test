'use client';
/* 갤러리 모달 열기. 시안의 openModal(index) 대응. */
export const openGallery = (index: number) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('h2a:gallery', { detail: index }));
};
