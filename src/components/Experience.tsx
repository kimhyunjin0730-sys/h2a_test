'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/* 시안 experience.js 를 그대로 옮긴 것: 스크롤 헤더 상태, 맨 위로 버튼, 히어로 inset, 리빌, 아카데미 탭,
   프로그램 필터, 커리큘럼 접기, FAQ 검색, 폼 라벨 id, 스크롤 목차. 경로가 바뀔 때마다 다시 붙인다. */
export default function Experience() {
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const theatre = document.querySelector<HTMLElement>('.hero-theatre');
    const hero = theatre?.querySelector<HTMLElement>('.live-hero');
    const header = document.querySelector<HTMLElement>('header');
    const contactImage = document.querySelector<HTMLElement>('.live-contact-image');
    const back = document.querySelector<HTMLElement>('[data-back-top]');
    const sectionLinks = [...document.querySelectorAll<HTMLElement>('.detail-section-nav [data-scroll-to]')];
    function updateScroll() {
      frame = 0;
      header?.classList.toggle('is-scrolled', scrollY > 30);
      back?.classList.toggle('visible', scrollY > 500);
      let currentSection = sectionLinks[0];
      sectionLinks.forEach((button) => {
        const target = document.getElementById(button.dataset.scrollTo || '');
        if (target && target.getBoundingClientRect().top <= (header?.offsetHeight || 0) + 100) currentSection = button;
      });
      sectionLinks.forEach((button) => { if (button === currentSection) button.setAttribute('aria-current', 'location'); else button.removeAttribute('aria-current'); });
      if (contactImage) {
        const rect = contactImage.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
        contactImage.style.setProperty('--contact-scale', reduced.matches ? '1' : String(1.12 - progress * 0.12));
      }
      if (theatre && hero) {
        const sticky = theatre.querySelector<HTMLElement>('.hero-sticky');
        const distance = Math.max(1, theatre.offsetHeight - (sticky?.offsetHeight || 0));
        const progress = Math.max(0, Math.min(1, ((header?.getBoundingClientRect().height || 0) - theatre.getBoundingClientRect().top) / distance));
        hero.style.setProperty('--hero-inset', reduced.matches || innerWidth <= 760 ? '0px' : `${40 * (1 - progress)}px`);
        hero.style.setProperty('--wordmark-shift', reduced.matches ? '0px' : `${-progress * 70}px`);
      }
    }
    const requestScroll = () => { if (!frame) frame = requestAnimationFrame(updateScroll); };
    window.addEventListener('scroll', requestScroll, { passive: true, signal });
    window.addEventListener('resize', requestScroll, { passive: true, signal });
    reduced.addEventListener('change', requestScroll, { signal });
    back?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced.matches ? 'instant' : 'smooth' }), { signal });
    const revealItems = [...document.querySelectorAll<HTMLElement>('[data-reveal],.home-programs .section-heading,.program-editorial-card,.home-gallery .section-heading,.field-card,.home-news,.home-live .live-section-heading')];
    if ('IntersectionObserver' in window && !reduced.matches) {
      observer = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.remove('reveal-pending'); target.classList.add('reveal-visible'); observer?.unobserve(target);
      }), { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
      revealItems.forEach((el, index) => {
        if (el.matches('.program-editorial-card,.field-card')) el.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
        if (el.getBoundingClientRect().top >= innerHeight) el.classList.add('reveal-pending');
        observer?.observe(el);
      });
    }
    const tabs = [...document.querySelectorAll<HTMLElement>('[data-academy-tab]')];
    const panels = [...document.querySelectorAll<HTMLElement>('[data-academy-panel]')];
    function selectTab(tab: HTMLElement, moveFocus = false) {
      tabs.forEach((item) => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
      panels.forEach((panel) => { const active = panel.dataset.academyPanel === tab.dataset.academyTab; panel.hidden = !active; panel.classList.toggle('is-entering', active); });
      if (moveFocus) tab.focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab), { signal });
      tab.addEventListener('keydown', (event) => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault(); selectTab(tabs[next], true);
      }, { signal });
    });
    const filters = [...document.querySelectorAll<HTMLElement>('[data-program-filter]')];
    filters.forEach((button) => button.addEventListener('click', () => {
      filters.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
      document.querySelectorAll<HTMLElement>('[data-program-category]').forEach((card) => {
        card.hidden = button.dataset.programFilter !== 'all' && card.dataset.programCategory !== button.dataset.programFilter;
        if (!card.hidden) { card.classList.remove('reveal-pending'); card.classList.add('reveal-visible'); observer?.unobserve(card); }
      });
    }, { signal }));
    document.querySelectorAll<HTMLElement>('.program-detail .curriculum-list > li').forEach((item, index) => {
      if (item.querySelector(':scope > details')) return;
      const heading = item.firstElementChild; if (!heading) return;
      const details = document.createElement('details'); details.className = 'curriculum-step'; details.open = index === 0;
      if (item.dataset.stage) details.dataset.stage = item.dataset.stage;
      const summary = document.createElement('summary'); summary.append(heading);
      const body = document.createElement('div'); body.className = 'step-body';
      while (item.firstChild) body.append(item.firstChild);
      details.append(summary, body); item.append(details);
    });
    document.querySelectorAll<HTMLElement>('[data-fold-title]').forEach((section) => {
      if (section.querySelector(':scope > details')) return;
      const details = document.createElement('details'); details.className = 'prose-disclosure';
      const summary = document.createElement('summary'); summary.textContent = section.dataset.foldTitle || '';
      const body = document.createElement('div'); body.className = 'disclosure-body';
      while (section.firstChild) body.append(section.firstChild);
      details.append(summary, body); section.append(details);
      section.style.marginTop = '24px'; section.style.paddingTop = '0'; section.style.borderTop = '0';
    });
    document.querySelectorAll<HTMLElement>('[data-list-filter]').forEach((button) => button.addEventListener('click', () => {
      const list = button.closest('.program-list'); if (!list) return;
      list.querySelectorAll<HTMLElement>('[data-list-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      list.querySelectorAll<HTMLElement>('[data-list-category]').forEach((card) => { card.hidden = button.dataset.listFilter !== 'all' && button.dataset.listFilter !== card.dataset.listCategory; });
    }, { signal }));
    document.querySelectorAll<HTMLInputElement>('[data-faq-search]').forEach((input) => {
      const container = input.closest('.container'); if (!container) return;
      const empty = document.createElement('p'); empty.className = 'filter-empty'; empty.hidden = true; empty.setAttribute('role', 'status'); empty.textContent = '일치하는 질문이 없습니다. 다른 검색어로 찾아보세요.';
      container.append(empty);
      input.addEventListener('input', () => {
        const query = input.value.trim().toLocaleLowerCase(); let count = 0;
        container.querySelectorAll<HTMLElement>('.acc-item').forEach((item) => { item.hidden = !item.textContent!.toLocaleLowerCase().includes(query); if (!item.hidden) count++; });
        empty.hidden = count > 0;
      }, { signal });
      signal.addEventListener('abort', () => empty.remove(), { once: true });
    });
    document.querySelectorAll<HTMLElement>('.form-group').forEach((group, index) => {
      const label = group.querySelector('label'); const input = group.querySelector<HTMLElement>('input:not([type="checkbox"]),select,textarea');
      if (label && input && !label.htmlFor) { if (!input.id) input.id = 'h2a-field-' + index; label.htmlFor = input.id; }
    });
    const onDocClick = (event: MouseEvent) => {
      const t = event.target as Element;
      const button = t.closest<HTMLElement>('[data-scroll-to]');
      if (button) {
        const target = document.getElementById(button.dataset.scrollTo || '');
        if (target) { target.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth' }); target.focus({ preventScroll: true }); }
      }
      if (t.closest('.skip-link')) { event.preventDefault(); document.getElementById('app-container')?.focus(); }
    };
    document.addEventListener('click', onDocClick, { signal });
    updateScroll();
    return () => { controller.abort(); observer?.disconnect(); cancelAnimationFrame(frame); revealItems.forEach((el) => el.classList.remove('reveal-pending')); };
  }, [pathname]);
  return null;
}
