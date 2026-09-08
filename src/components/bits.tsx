/* 시안 ui.js 의 작은 렌더 헬퍼들: renderBadge, renderSampleLabel, rTitle */
export const Badge = ({ txt }: { txt: string }) => <span className={`badge ${txt.includes('마감') || txt.includes('임박') ? 'highlight' : ''}`}>{txt}</span>;

export const SampleLabel = ({ show, txt }: { show?: boolean; txt?: string }) => (show ? <span className="sample-label">{txt}</span> : null);

export const PageTitle = ({ eng, kor }: { eng: string; kor: React.ReactNode }) => (
  <div className="hero-section"><div className="container"><span className="label-sm">{eng}</span><h1 className="page-title eng-title">{kor}</h1></div></div>
);

export const Message = ({ title, desc, btnTxt, href, isErr = false }: { title: string; desc: React.ReactNode; btnTxt: string; href: string; isErr?: boolean }) => (
  <div className="page-view active"><div className="container section-wrap text-center" style={{ paddingTop: 150 }}>
    <h1 className="eng-title message-title" style={{ fontSize: '3rem', marginBottom: '1rem', ...(isErr ? { color: 'var(--brand-red)' } : {}) }}>{title}</h1>
    <p className="body-large" style={{ marginBottom: '3rem' }}>{desc}</p>
    <a href={href} className={`btn ${isErr ? 'btn-primary' : 'btn-outline'}`}>{btnTxt}</a>
  </div></div>
);
