import Link from 'next/link';
import HeroTheatre from '@/components/HeroTheatre';
import FeaturedVideo from '@/components/FeaturedVideo';
import GalleryButton from '@/components/GalleryButton';
import { SampleLabel } from '@/components/bits';
import { expertsData, galleryData, noticesData, programsData } from '@/lib/content';
import { asset, programPath } from '@/lib/links';

/* 시안 views.home 을 그대로 옮긴 홈. */
export default function HomePage() {
  const featured = [programsData[0], programsData[1], programsData.find((p) => p.category === 'soulspeech')].filter(Boolean) as typeof programsData;
  const nam = expertsData.nam;
  const field = galleryData.map((g, index) => ({ g, index })).filter(({ g }) => !g.isSample).slice(0, 3);
  return (
    <div className="page-view active home-live">
      <HeroTheatre />
      <section className="home-programs container section-wrap" id="featured-programs" tabIndex={-1}>
        <div className="section-heading"><div><span className="kicker">H2A 프로그램</span><h2>지금 나에게 필요한<br />프로그램을 만나보세요.</h2></div><Link href="/programs" className="text-link">전체 프로그램 <span aria-hidden="true">↗</span></Link></div>
        <div className="program-filter" role="group" aria-label="프로그램 분야 필터"><button data-program-filter="all" aria-pressed="true">전체</button><button data-program-filter="presence" aria-pressed="false">외면소통</button><button data-program-filter="speech" aria-pressed="false">소울스피치</button></div>
        <div className="program-editorial-grid">
          {featured.map((p, i) => (
            <Link key={p.id} href={programPath(p)} className="program-editorial-card" data-program-category={p.category === 'soulspeech' ? 'speech' : 'presence'}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="program-card-image"><img src={asset(p.image)} alt={p.title} loading="lazy" /><SampleLabel show={p.isSample} txt={p.sampleLabel} /><span className="program-number">0{i + 1}</span></div>
              <div className="program-card-meta"><span>{p.category === 'soulspeech' ? 'SOUL SPEECH' : 'APPEARANCE'}</span><span aria-hidden="true">↗</span></div>
              <h3>{p.title}</h3><p>{p.subtitle}</p>
              <div className="program-card-footer"><span>자세히 보기</span><span aria-hidden="true">→</span></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="academy-explorer section-wrap" id="find-academy" tabIndex={-1}>
        <div className="container">
          <div className="live-section-heading" data-reveal><span className="kicker">나에게 필요한 변화는?</span><h2>고민은 다르니까,<br /><strong>시작도 나에게 맞게.</strong></h2><p>관심 있는 분야를 선택하고 프로그램을 살펴보세요.</p></div>
          <div className="academy-tabs" role="tablist" aria-label="아카데미 선택">
            <button id="academy-tab-presence" role="tab" aria-selected="true" aria-controls="academy-panel-presence" data-academy-tab="presence">이미지·태도</button>
            <button id="academy-tab-speech" role="tab" aria-selected="false" aria-controls="academy-panel-speech" data-academy-tab="speech" tabIndex={-1}>목소리·스피치</button>
            <button id="academy-tab-business" role="tab" aria-selected="false" aria-controls="academy-panel-business" data-academy-tab="business" tabIndex={-1}>기업·조직교육</button>
          </div>
          <div className="academy-panel panel-presence" id="academy-panel-presence" role="tabpanel" aria-labelledby="academy-tab-presence" data-academy-panel="presence" tabIndex={0}>
            <div className="explorer-copy"><span className="panel-label">외면소통 ACADEMY</span><h3>실력에 어울리는<br />첫인상과 태도.</h3><p>어떻게 보이고, 행동하고, 기억되는지.<br />나의 전문성과 역할에 맞는 이미지를 설계합니다.</p><div className="topic-tags"><span>리더 프레즌스</span><span>비즈니스 매너</span><span>이미지 전략</span></div><Link className="btn btn-primary" href="/appearance">프로그램 자세히 보기 <span aria-hidden="true">→</span></Link><Link className="explorer-director" href="/leaders">황정선 디렉터 소개 <span aria-hidden="true">↗</span></Link></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="explorer-visual"><div className="explorer-portrait"><img src="/assets/directors/hwang.jpg" alt="이미지 전략가 황정선" width={280} height={350} loading="lazy" /></div><div className="explorer-caption"><strong>말하기 전부터 전해지는<br />나의 이미지와 태도</strong><span>황정선 · 이미지공작소 대표</span></div></div>
          </div>
          <div className="academy-panel panel-speech" id="academy-panel-speech" role="tabpanel" aria-labelledby="academy-tab-speech" data-academy-panel="speech" tabIndex={0} hidden>
            <div className="explorer-copy"><span className="panel-label">Soul Speech ACADEMY</span><h3>말하는 기술보다,<br />나를 전하는 힘.</h3><p>목소리와 언어, 생각과 감정을 연결합니다.<br />나의 이야기를 진정성 있게 전하는 법을 배웁니다.</p><div className="topic-tags"><span>소울 보이스</span><span>언어 설계</span><span>12주 마스터 과정</span></div><Link className="btn btn-primary" href="/soul-speech">프로그램 자세히 보기 <span aria-hidden="true">→</span></Link><a className="explorer-director" href={nam.videoUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-red-dark)', fontWeight: 600 }}>{nam.videoLabel} <span aria-hidden="true">↗</span></a><Link className="explorer-director" href="/leaders">남복희 디렉터 소개 <span aria-hidden="true">↗</span></Link></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="explorer-visual"><div className="explorer-portrait"><img src="/assets/soul-speech/director.jpg" alt="소울스피치랩 대표 남복희" width={280} height={350} loading="lazy" /></div><div className="explorer-caption"><strong>“말은 기술보다<br />먼저 존재입니다.”</strong><span>남복희 · 소울스피치랩 대표</span></div></div>
          </div>
          <div className="academy-panel panel-business" id="academy-panel-business" role="tabpanel" aria-labelledby="academy-tab-business" data-academy-panel="business" tabIndex={0} hidden>
            <div className="explorer-copy"><span className="panel-label">H2A 기업교육</span><h3>우리 조직의 과제에<br />맞춘 교육.</h3><p>대상과 목표, 현장의 상황을 먼저 이해합니다.<br />진단부터 실습과 피드백까지 함께 설계합니다.</p><div className="topic-tags"><span>임원 리더십</span><span>조직 소통</span><span>맞춤 워크숍</span></div><Link className="btn btn-primary" href="/business/proposal">기업교육 제안 요청 <span aria-hidden="true">→</span></Link><Link className="explorer-director" href="/business">기업교육 살펴보기 <span aria-hidden="true">↗</span></Link></div>
            <div className="business-visual"><span>우리 조직에 필요한 변화</span><div><b>진단</b><i aria-hidden="true">→</i><b>설계</b><i aria-hidden="true">→</i><b>실습</b></div><p>강의 · 워크숍 · 시뮬레이션 · 1:1 코칭</p></div>
          </div>
        </div>
      </section>
      <FeaturedVideo />
      <FeaturedVideo director="nam" />
      <section className="business-banner"><div className="container" data-reveal><div><span>기업교육 담당자라면</span><h2>우리 조직에 맞는 교육,<br />함께 설계할 수 있습니다.</h2><p>교육 대상과 목표를 알려주세요. 필요한 과정부터 함께 찾겠습니다.</p></div><Link className="btn btn-paper" href="/business/proposal">맞춤 교육 문의하기 <span aria-hidden="true">→</span></Link></div></section>
      <section className="home-gallery section-wrap"><div className="container">
        <div className="section-heading"><div><span className="kicker">H2A 교육 현장</span><h2>함께 배우고,<br />직접 경험하는 변화.</h2></div><Link href="/gallery" className="text-link">교육 현장 더 보기 <span aria-hidden="true">↗</span></Link></div>
        <div className="field-grid">
          {field.map(({ g, index }, i) => (
            <GalleryButton key={g.id} index={index} className="field-card" ariaLabel={`${g.title} 사진 크게 보기`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="field-image"><img src={asset(g.image || '')} alt={g.title} loading="lazy" /><span className="round-arrow" aria-hidden="true">↗</span></div>
              <div className="field-caption"><span>0{i + 1} / SOUL SPEECH</span><h3>{g.title}</h3></div>
            </GalleryButton>
          ))}
        </div>
      </div></section>
      <section className="home-news container section-wrap">
        <div><span className="kicker">새로운 소식</span><h2>H2A 소식</h2><Link href="/notices" className="text-link">공지사항 전체보기 <span aria-hidden="true">↗</span></Link></div>
        <div className="editorial-news-list">
          {noticesData.slice(0, 3).map((n) => (
            <Link key={n.id} href={`/notices/${n.id}`} className="editorial-news-row"><div><span className="news-category">{n.category}</span><SampleLabel show={n.isSample} txt={n.sampleLabel} /></div><h3>{n.title}</h3><div><time>{n.date}</time><span aria-hidden="true">↗</span></div></Link>
          ))}
        </div>
      </section>
      <section className="live-closing">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="live-contact-image" aria-hidden="true"><img src="/assets/soul-speech/lecture-2.jpg" alt="" loading="lazy" /></div>
        <div className="container" data-reveal><span className="kicker">변화의 시작, H2A</span><h2>어디서 시작할지 고민이라면,<br />먼저 이야기 나눠보세요.</h2><p>프로그램 선택부터 기업 맞춤 교육까지 안내해드립니다.</p><Link href="/contact" className="btn btn-primary">상담 문의하기 <span aria-hidden="true">→</span></Link></div>
      </section>
    </div>
  );
}
