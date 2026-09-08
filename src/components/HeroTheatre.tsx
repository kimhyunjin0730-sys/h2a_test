'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { asset } from '@/lib/links';

/* 시안 views.home 의 히어로 3장 + core.js initHeroSlider (자동 재생·일시정지·키보드·터치). */
const SLIDES = [
  { label: 'H² ASSOCIATES', title: ['전문성을', '영향력으로.'], desc: <>보이는 태도와 들리는 언어가 만나는 곳.<br />당신의 전문성이 제대로 전해지도록, H2A가 함께합니다.</>, link: '/programs', linkText: '프로그램 살펴보기', src: asset('assets/soul-speech/lecture-1.jpg'), srcSet: `${asset('assets/soul-speech/lecture-1.jpg')} 1400w`, pos: '60% center', alt: '남복희 디렉터가 수강생들과 함께하는 실제 강의 현장', source: '남복희 디렉터 제공 · 교육 현장' },
  { label: '외면소통 ACADEMY', title: ['말하기 전부터,', '신뢰가 시작됩니다.'], desc: <>이미지와 태도, 매너와 관계.<br />나의 전문성에 어울리는 존재감을 설계합니다.</>, link: '/appearance', linkText: '외면소통 프로그램', src: asset('assets/stock/photo-1617761141732-d481912af1a9.jpg'), srcSet: `${asset('assets/stock/photo-1617761141732-d481912af1a9-800.jpg')} 800w, ${asset('assets/stock/photo-1617761141732-d481912af1a9.jpg')} 1600w`, pos: undefined, alt: '유리 외벽의 현대식 건물', source: 'Photo: Unsplash · Parrish Freeman' },
  { label: 'Soul Speech ACADEMY', title: ['목소리에 나를 담고,', '마음에 닿는 말로.'], desc: <>말하는 기술을 넘어, 존재로 말하는 힘.<br />나만의 목소리와 진정성 있는 언어를 발견합니다.</>, link: '/soul-speech', linkText: '소울스피치 프로그램', src: asset('assets/soul-speech/lecture-hero.jpg'), srcSet: `${asset('assets/soul-speech/lecture-hero-800.jpg')} 800w, ${asset('assets/soul-speech/lecture-hero.jpg')} 1600w`, pos: undefined, alt: '남복희 디렉터의 Soul Speech 실제 강의 현장', source: 'Soul Speech 실제 강의 현장' },
];

export default function HeroTheatre() {
  const wrapRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current; if (!wrap) return;
    const slides = [...wrap.querySelectorAll<HTMLElement>('.hero-slide')];
    const dots = [...wrap.querySelectorAll<HTMLElement>('.slider-dot')];
    const toggle = wrap.querySelector<HTMLElement>('.slider-toggle');
    const controller = new AbortController(); const signal = controller.signal;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let userPaused = reduced.matches, focus = false, explicitPlay = false, remaining = 7000, started = 0, current = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    function pauseTimer() { if (timer) { remaining = Math.max(0, remaining - (performance.now() - started)); clearTimeout(timer); timer = null; } }
    function schedule() {
      pauseTimer();
      // 마우스를 올려도 계속 넘어간다. 일시정지 버튼·키보드 포커스·탭 숨김·모션 줄이기만 멈춘다.
      const paused = userPaused || (!explicitPlay && focus) || document.hidden;
      wrap!.classList.toggle('is-paused', paused);
      if (toggle) { toggle.textContent = userPaused ? '▶' : 'Ⅱ'; toggle.setAttribute('aria-pressed', String(userPaused)); toggle.setAttribute('aria-label', userPaused ? '슬라이드 자동 재생 시작' : '슬라이드 자동 재생 정지'); }
      if (!paused && slides.length > 1) { started = performance.now(); timer = setTimeout(() => show(current + 1), remaining); }
    }
    function show(index: number) {
      pauseTimer(); remaining = 7000;
      const next = (index + slides.length) % slides.length;
      if (slides.some((slide, i) => i !== next && slide.contains(document.activeElement))) toggle?.focus();
      slides.forEach((slide, i) => { slide.classList.toggle('active', i === next); (slide as HTMLElement & { inert: boolean }).inert = i !== next; slide.setAttribute('aria-hidden', String(i !== next)); });
      dots.forEach((dot, i) => { dot.classList.remove('active'); dot.setAttribute('aria-pressed', String(i === next)); });
      void wrap!.offsetWidth;
      dots[next]?.classList.add('active');
      const counter = wrap!.querySelector('.hero-counter'); if (counter) counter.textContent = String(next + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      current = next; schedule();
    }
    const on = <K extends keyof HTMLElementEventMap>(el: EventTarget | null, type: string, handler: (e: HTMLElementEventMap[K] | Event) => void, options: AddEventListenerOptions = {}) => el?.addEventListener(type, handler as EventListener, { ...options, signal });
    on(wrap.querySelector('.slider-arrow.prev'), 'click', () => show(current - 1));
    on(wrap.querySelector('.slider-arrow.next'), 'click', () => show(current + 1));
    dots.forEach((dot, i) => on(dot, 'click', () => show(i)));
    on(toggle, 'click', () => { userPaused = !userPaused; explicitPlay = !userPaused; schedule(); });
    on(wrap, 'focusin', () => { focus = true; explicitPlay = false; schedule(); });
    on(wrap, 'focusout', (event) => { if (!wrap.contains((event as FocusEvent).relatedTarget as Node)) { focus = false; schedule(); } });
    on(document, 'visibilitychange', schedule);
    on(reduced, 'change', () => { userPaused = reduced.matches; schedule(); });
    on(wrap, 'keydown', (event) => { const e = event as KeyboardEvent; if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); } });
    let start: { x: number; y: number } | null = null;
    on(wrap, 'touchstart', (event) => { const e = event as TouchEvent; if (e.touches.length === 1) start = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
    on(wrap, 'touchend', (event) => { const e = event as TouchEvent; if (!start) return; const t = e.changedTouches[0], dx = t.clientX - start.x, dy = t.clientY - start.y; if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1)); start = null; }, { passive: true });
    show(0);
    return () => { controller.abort(); if (timer) clearTimeout(timer); };
  }, []);

  return (
    <section className="hero-theatre" aria-label="H2A 아카데미">
      <div className="hero-sticky">
        <section className="live-hero hero-slider-wrap" aria-label="H2A 소개 슬라이드" aria-roledescription="캐러셀" ref={wrapRef}>
          {SLIDES.map((s, i) => {
            const H = i === 0 ? 'h1' : 'h2';
            return (
              <div key={s.label} className={`hero-slide theatre-slide${i === 0 ? ' active' : ''}`} aria-hidden={i !== 0} {...(i !== 0 ? { inert: true } : {})}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="theatre-background" src={s.src} srcSet={s.srcSet} sizes="100vw" style={s.pos ? { objectPosition: s.pos } : undefined} alt={s.alt} fetchPriority={i === 0 ? 'high' : 'low'} />
                <div className="theatre-shade"></div>
                <div className="container theatre-copy">
                  <span className="theatre-label">{s.label}</span>
                  <H><span>{s.title[0]}</span><span>{s.title[1]}</span></H>
                  <p>{s.desc}</p>
                  <Link href={s.link} className="theatre-link">{s.linkText} <span aria-hidden="true">↗</span></Link>
                </div>
                <span className="hero-photo-source">{s.source}</span>
              </div>
            );
          })}
          <div className="theatre-wordmark" aria-hidden="true">H²A ACADEMY</div>
          <div className="campaign-controls container">
            <div className="campaign-pagination">
              <span className="hero-counter" aria-live="off">01 / 03</span>
              <div className="slider-dots">
                {SLIDES.map((s, i) => <button key={s.label} className={`slider-dot${i === 0 ? ' active' : ''}`} aria-label={`${i + 1}번 슬라이드`} aria-pressed={i === 0}><span></span></button>)}
              </div>
              <button className="slider-toggle" aria-label="슬라이드 자동 재생 정지" aria-pressed={false}>Ⅱ</button>
              <button className="slider-arrow prev" aria-label="이전 슬라이드">←</button>
              <button className="slider-arrow next" aria-label="다음 슬라이드">→</button>
            </div>
            <button className="hero-scroll" data-scroll-to="featured-programs">스크롤하여 둘러보기 <span aria-hidden="true">↓</span></button>
          </div>
        </section>
      </div>
    </section>
  );
}
