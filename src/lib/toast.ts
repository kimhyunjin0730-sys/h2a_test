'use client';
/* 시안 showToast 와 같은 동작. 어디서든 showToast('…') 로 호출하면 <Toast/> 가 3초간 보여준다. */
export const showToast = (msg: string) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('h2a:toast', { detail: msg }));
};
