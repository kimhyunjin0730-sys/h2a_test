import Link from 'next/link';
import GalleryButton from '@/components/GalleryButton';
import { PageTitle, SampleLabel } from '@/components/bits';
import type { ContentItem } from '@/lib/content';
import { asset } from '@/lib/links';

/* 시안 views.cardsHub: 후기·인사이트(3열 카드), 교육 현장(4열 갤러리), 공지(목록) */
export default function CardsHub({ title, items, kind }: { title: string; items: ContentItem[]; kind: 'reviews' | 'insights' | 'gallery' | 'notices' }) {
  if (kind === 'notices') {
    return (
      <div className="page-view active"><PageTitle eng="News" kor="공지사항" /><div className="container section-wrap"><div className="notice-list">
        {items.map((item) => <Link className="notice-item" key={item.id} href={`/notices/${item.id}`}><time>{item.date}</time><div><SampleLabel show={item.isSample} txt={item.sampleLabel} /><h2>{item.title}</h2></div><span aria-hidden="true">↗</span></Link>)}
      </div></div></div>
    );
  }
  const isGallery = kind === 'gallery';
  return (
    <div className="page-view active">
      <PageTitle eng={title.split(' ')[0]} kor={title} />
      <div className="container section-wrap"><div className={isGallery ? 'grid-4' : 'grid-3'}>
        {items.map((item, idx) => isGallery ? (
          <GalleryButton key={item.id} index={idx} className="card-img-top gallery-button" ariaLabel={`${item.title} 사진 크게 보기`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="img-wrap relative"><SampleLabel show={item.isSample} txt={item.sampleLabel} /><img src={asset(item.image || '')} alt={item.title} style={{ height: 250 }} loading="lazy" /></div>
            <div className="card-body" style={{ padding: '1.5rem' }}><h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.title}</h4><p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', marginTop: '0.5rem' }}>{item.category}</p></div>
          </GalleryButton>
        ) : (
          <Link key={item.id} href={`/${kind}/${item.id}`} className="card-img-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="img-wrap relative"><SampleLabel show={item.isSample} txt={item.sampleLabel} />{item.image ? <img src={asset(item.image)} alt={item.title} style={{ height: 220 }} loading="lazy" /> : null}</div>
            <div className="card-body" style={{ padding: '2rem' }}><h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.4 }}>{item.title}</h4><p style={{ fontSize: '0.95rem', color: 'var(--text-sub)', lineHeight: 1.6 }}>{item.excerpt}</p><span style={{ display: 'block', marginTop: '1.5rem', fontSize: '0.85rem', color: '#A09C98' }}>{item.date}</span></div>
          </Link>
        ))}
      </div></div>
    </div>
  );
}
