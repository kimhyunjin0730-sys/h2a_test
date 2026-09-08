import Link from 'next/link';
import Accordion from '@/components/Accordion';
import { ExpertCredentials, ExpertPortrait } from '@/components/ExpertProfile';
import { ApplyButton, BackButton, ContactProgramButton } from '@/components/ProgramActions';
import { Badge, SampleLabel } from '@/components/bits';
import { expertsData, type Program } from '@/lib/content';
import { asset, categoryHubPath } from '@/lib/links';

const currIcons: Record<string, React.ReactNode> = {
  ear: <><path d="M6 8.5a6 6 0 0 1 12 0c0 3-2 4-3 5.5s-1 2.5-1 3.5a2.5 2.5 0 0 1-5 0" /><path d="M9.5 8.5a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-2 3" /></>,
  wave: <><path d="M3 12h2M8 6v12M12 3v18M16 8v8M21 12h-2" /></>,
  diamond: <><path d="M12 2 22 12 12 22 2 12z" /><path d="M7 12h10" /></>,
  star: <><path d="m12 2 3 6.5 7 .9-5 4.9 1.2 7L12 18l-6.2 3.3L7 14.3 2 9.4l7-.9z" /></>,
};
const CurrIcon = ({ k }: { k?: string }) => (k && currIcons[k] ? <span className="curr-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{currIcons[k]}</svg></span> : null);
const ulSub = { listStyle: 'disc', paddingLeft: 20, color: 'var(--text-sub)', lineHeight: 1.8 } as const;
const h3 = { fontSize: '1.8rem', marginBottom: '2rem' } as const;

/* 시안 views.programDetail */
export default function ProgramDetail({ p }: { p: Program }) {
  const expert = expertsData[p.expert] || expertsData.hwang;
  const hasOwnOrder = (t: string) => /(^\s*\d)|session|단계|phase|step|week|wk\b/i.test(t) || ['EXPERIENCE', 'CLASS', 'CUSTOMIZED', 'Core Elements', 'SST'].some((k) => t.includes(k));
  return (
    <div className="page-view active program-detail">
      <section className="hero-section" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <div className="container"><div className="breadcrumb"><Link href="/programs">프로그램</Link> &gt; <Link href={categoryHubPath(p.category)}>{p.category.toUpperCase()}</Link> &gt; {p.title}</div></div>
        <div className="container program-title-block"><div>
          {p.slogan ? <span className="label-sm">{p.slogan}</span> : null}
          <SampleLabel show={p.isSample} txt={p.sampleLabel} /><br />
          <Badge txt={p.status} />
          <h1 className="page-title eng-title" style={{ margin: '0.5rem 0 1rem' }}>{p.title}</h1>
          <p className="body-large">{p.subtitle}</p>
        </div></div>
        <div className="container program-summary-grid">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="img-wrap relative"><img src={asset(p.image)} alt={p.title} loading="eager" /></div>
          <aside><div className="info-panel">
            <h4 className="eng-title" style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--brand-red-dark)' }}>PROGRAM INFO</h4>
            {([['대상', p.audience], ['기간', p.duration], ['총시간', p.totalHours], ['정원', p.capacity]] as const).map(([k, v]) => <div className="info-row" key={k}><span className="label-sm" style={{ margin: 0 }}>{k}</span><span className="val">{v}</span></div>)}
            <div className="info-row"><span className="label-sm" style={{ margin: 0 }}>일정</span><span className="val" style={{ color: 'var(--brand-red-dark)', fontWeight: 700 }}>{p.schedule}</span></div>
            <div className="info-row"><span className="label-sm" style={{ margin: 0 }}>장소</span><span className="val">{p.place}</span></div>
            <div className="info-row"><span className="label-sm" style={{ margin: 0 }}>신청마감</span><span className="val">{p.deadline}</span></div>
            <div className="info-row" style={{ borderTop: '1px solid var(--ink)', marginTop: '1rem', paddingTop: '1.5rem' }}><span className="label-sm" style={{ margin: 0 }}>수강료</span><span className="val" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>{p.price} {/\d/.test(p.price) ? <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>(VAT {p.vatIncluded ? '포함' : '별도'})</span> : null}</span></div>
            <ApplyButton title={p.title} cta={p.cta} />
          </div></aside>
        </div>
      </section>
      <nav className="detail-section-nav container" aria-label="프로그램 상세 목차"><button data-scroll-to="program-intro">프로그램 소개</button><button data-scroll-to="program-curriculum">커리큘럼</button><button data-scroll-to="program-notice">운영 안내</button></nav>
      <section className="container detail-grid"><div>
        <div id="program-intro" tabIndex={-1}>
          {p.introTitle || p.intro || p.recommend ? (
            <div className="mb-xl border-bottom" style={{ paddingBottom: '4rem' }}>
              {p.introTitle ? <h3 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{p.introTitle}</h3> : null}
              {p.intro ? <div className="body-large" style={{ color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: p.intro }} /> : null}
              {p.composition ? <div className="mt-lg mb-lg"><h4 className="font-bold mb-sm" style={{ fontSize: '1.1rem' }}>프로그램 구성</h4><ul style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: 'var(--brand-red-dark)', fontWeight: 500 }}>{p.composition.map((c) => <li key={c} style={{ background: 'var(--brand-red-soft)', padding: '4px 12px' }}>{c}</li>)}</ul></div> : null}
              {p.recommend ? <div className="mt-lg p-lg" style={{ background: 'var(--surface-light)' }}><SampleLabel show={p.isSample} txt="보조 설명 · 화면 검수용 초안" /><h4 className="font-bold mb-sm" style={{ fontSize: '1.1rem' }}>이런 분께 권해 드립니다</h4><ul style={ulSub}>{p.recommend.map((r) => <li key={r}>{r}</li>)}</ul></div> : null}
            </div>
          ) : null}
        </div>
        <h3 id="program-curriculum" tabIndex={-1} className="eng-title section-title" style={h3}>CURRICULUM</h3>
        <ul className="curriculum-list">
          {(p.curr || []).map((c, i) => (
            <li key={c.t} {...(c.stage ? { 'data-stage': c.stage } : {})}>
              <div style={{ marginBottom: '1rem' }}>
                <h4 className="eng-title" style={{ fontSize: '1.2rem', color: 'var(--brand-red-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CurrIcon k={c.icon} />{hasOwnOrder(c.t) ? c.t : `0${i + 1}. ${c.t}`}</h4>
                {c.sub ? <p style={{ fontWeight: 700, marginTop: '0.5rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{c.sub}</p> : null}
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {c.image ? <img className="step-photo" src={asset(c.image)} alt="Soul Speech 실제 강의 현장" loading="lazy" /> : null}
                {c.items ? <><ul style={ulSub}>{c.items.map((it: string) => <li key={it}>{it}</li>)}</ul>{c.result ? <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'var(--surface-light)', borderLeft: '3px solid var(--brand-red)' }}><span style={{ fontWeight: 700, color: 'var(--brand-red-dark)', fontSize: '0.85rem' }}>RESULT</span><p style={{ fontWeight: 600, color: 'var(--ink)', marginTop: '0.3rem' }}>{c.result}</p></div> : null}</> : <p style={{ color: 'var(--text-sub)', lineHeight: 1.8 }}>{c.d}</p>}
              </div>
            </li>
          ))}
        </ul>
        {p.outcomes ? (
          <div data-fold-title="기대 효과와 결과물" style={{ marginTop: '4rem' }}><h3 className="eng-title section-title" style={h3}>OUTCOMES</h3><div style={{ border: '1px solid var(--line)', padding: '3rem', background: 'var(--surface)' }}>
            <h4 className="eng-title" style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--line)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>{p.outTitle || '기대 효과 및 결과물'}</h4>
            {p.outcomesIntro ? <p style={{ marginBottom: '1.5rem', fontWeight: 500, fontSize: '1.05rem' }}>{p.outcomesIntro}</p> : null}
            <ul style={{ ...ulSub, listStyle: 'square' }}>{p.outcomes.map((o) => <li key={o}>{o}</li>)}</ul>
            {p.transformation ? <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--line)' }}><SampleLabel show={p.isSample} txt="보조 설명 · 화면 검수용 초안" /><h4 className="font-bold mb-sm" style={{ fontSize: '1.1rem' }}>과정을 통해 달라지는 것</h4><ul style={ulSub}>{p.transformation.map((t) => <li key={t}>{t}</li>)}</ul></div> : null}
          </div></div>
        ) : null}
        {p.beyondDetail ? <div data-fold-title="수업 이후의 변화" style={{ marginTop: '4rem' }}><h3 className="eng-title section-title" style={h3}>BEYOND THE CLASS</h3><ul style={{ listStyle: 'none', paddingLeft: 0, color: 'var(--text-sub)', lineHeight: 1.8 }}>{p.beyondDetail.map((b) => <li key={b.n} style={{ marginBottom: '1.5rem' }}><strong style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>{b.n}</strong><br />{b.d}</li>)}</ul></div>
          : p.beyond ? <div data-fold-title="수업 이후의 변화" style={{ marginTop: '4rem' }}><h3 className="eng-title section-title" style={h3}>BEYOND THE CLASS</h3><ul style={{ ...ulSub, listStyle: 'square' }}>{p.beyond.map((b) => <li key={b}>{b}</li>)}</ul></div> : null}
        <div style={{ marginTop: '4rem' }}>
          <h3 id="program-notice" tabIndex={-1} className="eng-title section-title" style={h3}>NOTICE</h3>
          <ul style={{ color: 'var(--text-sub)', listStyle: 'disc', paddingLeft: 20, lineHeight: 1.8 }}><li><strong>포함사항:</strong> {p.included || '자료 확인 중'}</li><li><strong>불포함사항:</strong> {p.excluded || '자료 확인 중'}</li><li><strong>취소·환불 안내:</strong> {p.refundGuide || '환불 정책 참조'}</li></ul>
        </div>
        {p.programFaq ? <div style={{ marginTop: '6rem' }}><SampleLabel show={p.isSample} txt="보조 설명 · 화면 검수용 초안" /><h3 className="eng-title section-title" style={h3}>FAQ</h3><Accordion items={p.programFaq} /></div> : null}
        {p.closing ? <div style={{ marginTop: '6rem', padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--surface-light)' }}><h3 className="eng-title" style={{ fontSize: '1.6rem', color: 'var(--brand-red-dark)', fontWeight: 400, fontStyle: 'italic' }}>&quot;{p.closing}&quot;</h3></div> : null}
        {p.expert !== 'all' ? (
          <div data-fold-title="프로그램 디렉터" style={{ marginTop: '6rem', borderTop: '1px solid var(--line)', paddingTop: '4rem' }}>
            <span className="label-sm">Program Director</span><h3 className="section-title eng-title">EXPERT</h3>
            <div className="grid-2" style={{ alignItems: 'center', marginTop: '2rem' }}>
              <ExpertPortrait e={expert} sampleTxt="공개 전 당사자 확인 필요" placeholderHeight={300} />
              <div>
                <h4 className="eng-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{expert.name}</h4>
                <p style={{ fontWeight: 700, color: 'var(--brand-red-dark)', marginBottom: '1rem' }}>{expert.role}</p>
                <p style={{ color: 'var(--text-sub)', marginBottom: '2rem' }}>{expert.externalRole}</p>
                {expert.quoteTitle ? <blockquote style={{ borderLeft: '3px solid var(--brand-red)', padding: '1rem 0 1rem 1.5rem', marginBottom: '2rem' }}><p className="eng-title" style={{ fontSize: '1.2rem', color: 'var(--brand-red-dark)', fontStyle: 'italic', marginBottom: '0.75rem' }}>&quot;{expert.quoteTitle}&quot;</p><p style={{ color: 'var(--text-sub)', lineHeight: 1.8, fontSize: '0.95rem' }}>{expert.quote || ''}</p></blockquote> : null}
                <ExpertCredentials e={expert} video />
              </div>
            </div>
          </div>
        ) : null}
        <div className="program-end-cta"><div><strong>이 과정이 나에게 맞을까요?</strong><p>{p.title} 신청으로 시작하세요.</p></div><ContactProgramButton title={p.title} /></div>
        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: '2rem' }}><BackButton /></div>
      </div></section>
    </div>
  );
}
