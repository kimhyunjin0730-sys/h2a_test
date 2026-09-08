import type { Metadata } from 'next';
import CopyAddressButton from '@/components/CopyAddressButton';
import { imgUrls } from '@/lib/content';
import { ADDRESS, MAP_EMBED, MAP_URL, asset } from '@/lib/links';

export const metadata: Metadata = { title: '오시는 길' };

export default function LocationPage() {
  return (
    <div className="page-view active">
      <section className="location-dark-sec" style={{ backgroundImage: `url('${asset(imgUrls.office2)}')` }}>
        <div className="location-dark-overlay"></div>
        <div className="container location-content-wrap">
          <span className="label-sm" style={{ color: '#FFFFFF', opacity: 0.8 }}>LOCATION</span>
          <h1 className="page-title" style={{ color: '#FFFFFF', fontFamily: 'var(--font-kor)', fontWeight: 500 }}>오시는 길</h1>
          <div className="grid-2 items-center" style={{ marginTop: '4rem' }}>
            <div className="location-circle-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(imgUrls.office3)} alt="H2A Office" className="location-circle-img" loading="lazy" />
              <p style={{ color: '#A09C98', fontSize: '0.85rem' }}>화면 검수용 샘플 · 실제 사옥/강의장 사진으로 교체 예정</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>에이치스퀘어 어쏘시에이츠 주식회사 <a href={MAP_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF' }} aria-label="구글 지도에서 열기">↗</a></h3>
              <p style={{ fontSize: '1.15rem', marginBottom: '1rem', fontWeight: 300 }}>{ADDRESS}</p>
              <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', fontWeight: 300, opacity: 0.8 }}>Tel. 010-9005-6009 / E. biz.h2a@gmail.com</p>
              <CopyAddressButton />
            </div>
          </div>
        </div>
      </section>
      <iframe className="location-map-iframe" src={MAP_EMBED} loading="lazy" allowFullScreen title="구글 지도"></iframe>
    </div>
  );
}
