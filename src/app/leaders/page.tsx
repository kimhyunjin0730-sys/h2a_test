import type { Metadata } from 'next';
import Link from 'next/link';
import FeaturedVideo from '@/components/FeaturedVideo';
import { ExpertCredentials, ExpertPortrait } from '@/components/ExpertProfile';
import { PageTitle } from '@/components/bits';
import { expertsData } from '@/lib/content';

export const metadata: Metadata = { title: '프로그램 디렉터' };

export default function LeadersPage() {
  return (
    <div className="page-view active">
      <PageTitle eng="Directors" kor="프로그램 디렉터" />
      <div className="container section-wrap">
        <p className="body-large">이미지와 태도, 목소리와 언어.<br />각 분야의 디렉터와 나에게 필요한 변화를 만나보세요.</p>
        <div className="grid-2 mt-xl">
          {Object.values(expertsData).map((e) => (
            <div className="card-basic director-card" key={e.id} style={{ padding: 0, border: 'none', background: 'transparent' }}>
              <ExpertPortrait e={e} sampleTxt="공개 전 당사자 최종 확인 필요" />
              <h4 className="eng-title" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{e.name}</h4>
              <p style={{ fontWeight: 700, color: 'var(--brand-red-dark)', marginBottom: '0.5rem' }}>{e.role}</p>
              <p style={{ color: 'var(--text-sub)', marginBottom: '2rem' }}>{e.externalRole}</p>
              <div className="director-actions">
                <Link className="btn btn-outline" href={e.id === 'hwang-jeong-seon' ? '/appearance' : '/soul-speech'}>담당 프로그램 보기 →</Link>
                {e.videoUrl ? <a className="text-link" href={e.videoUrl} target="_blank" rel="noopener noreferrer">{e.videoLabel} ↗</a> : null}
              </div>
              <ExpertCredentials e={e} />
            </div>
          ))}
        </div>
      </div>
      <FeaturedVideo />
      <FeaturedVideo director="nam" />
    </div>
  );
}
