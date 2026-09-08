'use client';
import { useEffect, useRef, useState } from 'react';

export default function Toast() {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const on = (e: Event) => {
      setMsg(String((e as CustomEvent).detail ?? ''));
      setVisible(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(false), 3000);
    };
    window.addEventListener('h2a:toast', on);
    return () => window.removeEventListener('h2a:toast', on);
  }, []);
  return <div id="toast" className={`toast${visible ? '' : ' hidden'}`} aria-live="polite">{msg}</div>;
}
