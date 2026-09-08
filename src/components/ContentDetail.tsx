import Link from 'next/link';
import { SampleLabel } from '@/components/bits';
import type { ContentItem } from '@/lib/content';
import { asset } from '@/lib/links';

export default function ContentDetail({ item, listPath }: { item: ContentItem; listPath: string }) {
  return (
    <div className="page-view active">
      <div className="hero-section pb-0 border-b"><div className="container pb-xl">
        <div className="breadcrumb"><Link href={listPath}>목록</Link> &gt; 상세</div>
        <SampleLabel show={item.isSample} txt={item.sampleLabel} />
        <h1 className="page-title eng-title" style={{ marginTop: '1rem', fontSize: 'clamp(2rem,4vw,3rem)' }}>{item.title}</h1>
        <p className="body-large">{item.date} {item.author ? `| ${item.author} (${item.role})` : ''}</p>
      </div></div>
      <div className="container section-wrap" style={{ maxWidth: 800 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {item.image ? <div className="img-wrap relative mb-xl"><img src={asset(item.image)} alt={item.title} style={{ height: 450 }} loading="lazy" /></div> : null}
        <div className="body-large" style={{ color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: item.body || item.excerpt || '' }} />
        <div className="divider"></div>
        <Link href={listPath} className="btn btn-outline">목록으로 돌아가기</Link>
      </div>
    </div>
  );
}
