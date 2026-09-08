/* 시안(src/js/data.js)에서 추출한 콘텐츠. tools 로 재추출하면 갱신된다.
   나중에 워드프레스 REST(헤드리스)로 바꿀 때 이 파일의 export 형태만 유지하면 된다. */
import programs from '@/content/programsData.json';
import corp from '@/content/corpPrograms.json';
import experts from '@/content/expertsData.json';
import reviews from '@/content/reviewsData.json';
import gallery from '@/content/galleryData.json';
import notices from '@/content/noticesData.json';
import insights from '@/content/insightsData.json';
import faq from '@/content/faqData.json';
import terms from '@/content/termsData.json';
import privacy from '@/content/privacyData.json';
import refund from '@/content/refundData.json';
import legal from '@/content/legalDocs.json';
import imgs from '@/content/imgUrls.json';
import video from '@/content/featuredVideoData.json';
import portone from '@/content/portoneConfig.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export interface Program {
  id: string; category: 'appearance' | 'experience' | 'soulspeech' | string; slug: string; title: string; subtitle: string;
  slogan?: string; introTitle?: string; intro?: string; recommend?: string[]; composition?: string[];
  isSample: boolean; sampleLabel: string; status: string; audience: string; duration: string; capacity: string;
  schedule: string; place: string; price: string; totalHours: string; vatIncluded: boolean; deadline: string;
  image: string; cta: string; expert: string; paymentEnabled?: boolean;
  curr?: Any[]; outcomes?: string[]; outcomesIntro?: string; outTitle?: string; transformation?: string[];
  beyond?: string[]; beyondDetail?: { n: string; d: string }[]; programFaq?: { q: string; a: string }[];
  included?: string; excluded?: string; refundGuide?: string; closing?: string;
}
export interface Expert {
  id: string; name: string; role: string; externalRole: string; img?: string; photoConfirmed?: boolean;
  edu: string; exp: string[]; books: string[]; topics?: string[]; videoUrl?: string; videoLabel?: string;
  quoteTitle?: string; quote?: string;
  fieldPhotos?: { src: string; label: string }[];
}
export interface ContentItem {
  id: string; title: string; date: string; category?: string; excerpt?: string; body?: string; image?: string;
  isSample?: boolean; sampleLabel?: string; author?: string; role?: string;
}

export const programsData = programs as unknown as Program[];
export const corpPrograms = corp as unknown as Any[];
export const expertsData = experts as unknown as Record<string, Expert>;
export const reviewsData = reviews as unknown as ContentItem[];
export const galleryData = gallery as unknown as ContentItem[];
export const noticesData = notices as unknown as ContentItem[];
export const insightsData = insights as unknown as ContentItem[];
export const faqData = faq as unknown as { q: string; a: string }[];
export const termsData = terms as unknown as string[];
export const privacyData = privacy as unknown as string[];
export const refundData = refund as unknown as string[];
export type LegalBodyItem = string | string[] | { table: { head: string[]; rows: string[][] } };
export interface LegalSection { h: string; body: LegalBodyItem[] }
export interface LegalDoc { slug: string; title: string; draft?: boolean; draftNote?: string; sections: LegalSection[]; footer?: LegalSection }
export type LegalSlug = 'terms' | 'privacy' | 'refund';
export const legalDocs = legal as unknown as Record<LegalSlug, LegalDoc>;
export const imgUrls = imgs as unknown as Record<string, string>;
export const featuredVideoData = video as unknown as { url: string; title: string; description: string; poster: string; channel?: string };
export const portoneConfig = portone as unknown as { storeId: string; channelKey: string; channelKeyEximbay: string; testAmount: number };

export const findProgram = (slug: string) => programsData.find((p) => p.slug === slug);
export const findContent = (id: string) => [...reviewsData, ...noticesData, ...insightsData].find((x) => x.id === id);
