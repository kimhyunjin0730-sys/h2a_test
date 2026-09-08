import type { Metadata, Viewport } from 'next';
import '@/styles/main.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';
import GalleryModal from '@/components/GalleryModal';
import Toast from '@/components/Toast';

export const metadata: Metadata = {
  title: { default: 'H² Associates Ltd. | 전문성을 영향력으로', template: '%s | H² Associates Ltd.' },
  description: 'H² Associates Ltd. — 리더의 존재감과 말을 다루는 커뮤니케이션 아카데미. CEO·전문가를 위한 외면소통, 소울스피치, 기업교육 프로그램과 상담 안내.',
  icons: { icon: '/assets/brand/site-icon-red.png', apple: '/assets/brand/site-icon-red.png' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router 루트 레이아웃이라 모든 페이지에 적용된다 */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" />
      </head>
      <body>
        <a className="skip-link" href="#app-container">본문으로 건너뛰기</a>
        <Header />
        <main id="app-container" tabIndex={-1}>{children}</main>
        <GalleryModal />
        <Toast />
        <Footer />
        <Experience />
      </body>
    </html>
  );
}
