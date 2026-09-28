/* 미디어 — SNS·영상 채널 모음. 워드프레스 테마 inc/media.php 와 같은 규칙: 플랫폼은 주소로 알아보고, 이 순서로 묶는다. */
import links from '@/content/mediaLinks.json';

export type MediaLink = { title: string; owner: string; url: string; desc: string };
export type MediaGroup = { key: string; label: string; links: MediaLink[] };

const PLATFORMS: { key: string; label: string; hosts: string[] }[] = [
  { key: 'youtube', label: 'YouTube', hosts: ['youtube.com', 'youtu.be'] },
  { key: 'instagram', label: 'Instagram', hosts: ['instagram.com'] },
  { key: 'blog', label: '블로그', hosts: ['blog.naver.com', 'brunch.co.kr', 'tistory.com'] },
  { key: 'facebook', label: 'Facebook', hosts: ['facebook.com'] },
  { key: 'etc', label: '기타 채널', hosts: [] },
];

function platformOf(url: string): string {
  let host = '';
  try { host = new URL(url).hostname.toLowerCase(); } catch { return 'etc'; }
  const hit = PLATFORMS.find(p => p.hosts.some(h => host === h || host.endsWith('.' + h)));
  return hit ? hit.key : 'etc';
}

export const mediaGroups: MediaGroup[] = PLATFORMS
  .map(p => ({ key: p.key, label: p.label, links: (links as MediaLink[]).filter(l => l.url && platformOf(l.url) === p.key) }))
  .filter(g => g.links.length > 0);

/** 메뉴 「미디어」 하위 항목 — 채널이 있는 플랫폼마다, 끝에 대표 영상. */
export const mediaNavLinks = [
  ...mediaGroups.map(g => ({ href: `/media#media-${g.key}`, label: g.label })),
  { href: '/media#media-videos', label: '대표 영상' },
];
