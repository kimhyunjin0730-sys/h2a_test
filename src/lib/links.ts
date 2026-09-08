/* 시안의 해시 라우트(#about, #soul-speech/program …)를 실제 경로로 바꾼다. */
import type { Program } from './content';

export function toPath(hash: string): string {
  if (!hash) return '/';
  if (/^https?:|^mailto:|^tel:/.test(hash)) return hash;
  const h = hash.replace(/^#/, '');
  if (!h || h === 'home') return '/';
  const detail = h.match(/^(reviews|notices|insights)\/detail\/(.+)$/);
  if (detail) return `/${detail[1]}/${detail[2]}`;
  const fixed: Record<string, string> = {
    'payment-complete': '/payment/complete',
    'payment-lookup': '/payment/lookup',
    'application-complete': '/application/complete',
    'contact-complete': '/contact/complete',
  };
  return fixed[h] ?? `/${h}`;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
/** assets/… 상대 경로를 절대 경로로(basePath 포함). 외부 URL 은 그대로. */
export const asset = (p: string) => (/^(https?:)?\/\//.test(p) ? p : `${BASE}/${p.replace(/^\//, '')}`);

export const programPath = (p: Program) =>
  p.category === 'soulspeech' ? `/soul-speech/${p.slug}` : p.category === 'experience' ? `/appearance/experience/${p.slug}` : `/appearance/${p.slug}`;

export const categoryHubPath = (category: string) =>
  category === 'experience' ? '/appearance/private-programs' : category === 'soulspeech' ? '/soul-speech' : `/${category}`;

export const ADDRESS = '서울특별시 강남구 봉은사로 317, 2층 2040호(논현동, 아모제논현빌딩)';
export const MAP_URL = 'https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%EC%8B%9C+%EA%B0%95%EB%82%A8%EA%B5%AC+%EB%B4%89%EC%9D%80%EC%82%AC%EB%A1%9C+317';
export const MAP_EMBED = 'https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%EC%8B%9C+%EA%B0%95%EB%82%A8%EA%B5%AC+%EB%B4%89%EC%9D%80%EC%82%AC%EB%A1%9C+317&z=17&output=embed&hl=ko';
