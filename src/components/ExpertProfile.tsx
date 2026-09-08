import type { Expert } from '@/lib/content';
import { asset } from '@/lib/links';

/* 디렉터 학력·경력·강연 주제·저서 블록 (leaders 페이지와 프로그램 상세 EXPERT 공용) */
export function ExpertCredentials({ e, video }: { e: Expert; video?: boolean }) {
  const h5 = { color: 'var(--ink)', marginBottom: '0.5rem', textTransform: 'none' } as const;
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
      <h5 className="label-sm" style={h5}>학력</h5><p style={{ color: 'var(--text-sub)', marginBottom: '1rem', fontSize: '0.95rem' }}>{e.edu}</p>
      <h5 className="label-sm" style={h5}>주요 경력</h5><ul style={{ color: 'var(--text-sub)', listStyle: 'disc', paddingLeft: 20, lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>{e.exp.map((x) => <li key={x}>{x}</li>)}</ul>
      {e.topics ? <><h5 className="label-sm" style={h5}>강연 주제</h5><ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>{e.topics.map((t) => <li key={t} style={{ background: 'var(--surface-light)', border: '1px solid var(--line)', padding: '3px 10px', fontSize: '0.85rem', color: 'var(--text-sub)' }}>{t}</li>)}</ul></> : null}
      <h5 className="label-sm" style={h5}>저서</h5><ul style={{ color: 'var(--text-sub)', listStyle: 'square', paddingLeft: 20, lineHeight: 1.8, fontSize: '0.95rem' }}>{e.books.map((x) => <li key={x}>{x}</li>)}</ul>
      {video && e.videoUrl ? <a href={e.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-thin" style={{ marginTop: '1.5rem' }}>{e.videoLabel || '강의 영상 보기'} ↗</a> : null}
      {e.fieldPhotos?.length ? <div className="director-field">{e.fieldPhotos.map((p) => (
        // eslint-disable-next-line @next/next/no-img-element
        <figure key={p.src}><img src={asset(p.src)} alt={p.label} loading="lazy" /><figcaption>{p.label}</figcaption></figure>
      ))}</div> : null}
    </div>
  );
}

export function ExpertPortrait({ e, sampleTxt, placeholderHeight }: { e: Expert; sampleTxt: string; placeholderHeight?: number }) {
  return (
    <div className={`img-wrap relative${placeholderHeight ? '' : ' mb-md'}`}>
      {!e.photoConfirmed ? <span className="sample-label">{sampleTxt}</span> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {e.img ? <img src={asset(e.img)} alt={e.name} className="director-portrait" loading="lazy" /> : <span className={`img-placeholder${placeholderHeight ? '' : ' director-portrait'}`} style={placeholderHeight ? { height: placeholderHeight } : undefined} aria-hidden="true"></span>}
    </div>
  );
}
