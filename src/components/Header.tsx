'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/* 시안 index.html 헤더 + ui.js 메가메뉴/모바일 메뉴 로직. 클래스명은 시안과 동일(CSS 그대로 사용). */
const MENUS: { id: string; label: React.ReactNode; links: { href: string; label: React.ReactNode }[] }[] = [
  { id: 'mega-about', label: 'H2A 소개', links: [{ href: '/about', label: '회사 소개' }, { href: '/leaders', label: '프로그램 디렉터' }] },
  { id: 'mega-programs', label: '프로그램', links: [{ href: '/appearance', label: '외면소통 ACADEMY' }, { href: '/soul-speech', label: 'Soul Speech ACADEMY' }] },
  { id: 'mega-business', label: '기업교육', links: [{ href: '/business', label: '기업교육 소개' }, { href: '/business/solution', label: <>H<sup>2</sup>A</> }, { href: '/business/quantum', label: 'Quantum 품격' }, { href: '/business/proposal', label: '기업교육 제안 요청' }] },
  { id: 'mega-news', label: '소식', links: [{ href: '/gallery', label: '교육 현장' }, { href: '/notices', label: '공지사항' }] },
  { id: 'mega-contact', label: '문의', links: [{ href: '/contact', label: '문의하기' }, { href: '/faq', label: 'FAQ' }] },
];

export default function Header() {
  const pathname = usePathname();
  const [mega, setMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // 경로가 바뀌면 메뉴를 닫는다 (시안 router() 의 closeAllMegas/closeMobileMenu).
  // eslint-disable-next-line react-hooks/set-state-in-effect -- 경로가 바뀌면 열린 메뉴를 닫는다(시안 router() 동작)
  useEffect(() => { setMega(null); setMobileOpen(false); document.body.style.overflow = ''; }, [pathname]);
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; }, [mobileOpen]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMega(null); if (mobileOpen) { setMobileOpen(false); hamburgerRef.current?.focus(); } } };
    const onClick = (e: MouseEvent) => { const t = e.target as Element; if (!t.closest('header') && !t.closest('#mobileNav')) setMega(null); };
    document.addEventListener('keydown', onKey); document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [mobileOpen]);

  return (
    <header ref={headerRef} onMouseLeave={() => setMega(null)}>
      <div className="container header-inner">
        <Link href="/" className="logo-link"><span className="h2a-logo">H<sup>2</sup> Associates Ltd.</span></Link>
        <nav className="pc-nav" role="navigation" aria-label="메인 메뉴">
          {MENUS.map((m) => (
            <button key={m.id} className={`pc-nav-btn${mega === m.id ? ' active' : ''}`} aria-expanded={mega === m.id} data-target={m.id}
              onMouseEnter={() => setMega(m.id)} onFocus={() => setMega(m.id)}>{m.label}</button>
          ))}
        </nav>
        <Link href="/payment" className="btn btn-primary header-cta">프로그램 상담</Link>
        <button className="hamburger" id="hamburgerBtn" ref={hamburgerRef} aria-label={mobileOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'} aria-expanded={mobileOpen} aria-controls="mobileNav"
          onClick={(e) => { e.stopPropagation(); setMobileOpen((o) => !o); }}><span className="menu-lines" aria-hidden="true"></span></button>
      </div>
      {MENUS.map((m) => (
        <div key={m.id} className={`mega-menu${mega === m.id ? ' active' : ''}`} id={m.id}>
          <div className="mega-grid-compact">
            <div className="mega-links" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
              <ul>{m.links.map((l) => <li key={l.href}><Link href={l.href} className="mega-link" onClick={() => setMega(null)}>{l.label}</Link></li>)}</ul>
            </div>
          </div>
        </div>
      ))}
      <nav className={`mobile-nav${mobileOpen ? ' active' : ''}`} id="mobileNav" role="navigation" aria-label="모바일 메뉴">
        {MENUS.map((m) => (
          <div className="m-nav-item" key={m.id}>
            <button className="m-nav-header acc-btn" aria-expanded={openAcc === m.id} onClick={() => setOpenAcc((o) => (o === m.id ? null : m.id))}>
              {m.label} <span className="icon">{openAcc === m.id ? '-' : '+'}</span>
            </button>
            <div className={`m-nav-body acc-content${openAcc === m.id ? ' active' : ''}`}>
              {m.links.map((l) => <Link key={l.href} href={l.href} className="m-link" onClick={() => setMobileOpen(false)}>{l.label}</Link>)}
            </div>
          </div>
        ))}
        <div className="m-nav-item m-nav-cta"><Link href="/payment" className="btn btn-primary" onClick={() => setMobileOpen(false)}>프로그램 상담</Link></div>
      </nav>
    </header>
  );
}
