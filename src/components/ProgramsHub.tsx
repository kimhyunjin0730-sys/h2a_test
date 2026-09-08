import Link from 'next/link';
import FeaturedVideo from '@/components/FeaturedVideo';
import { InquiryLink } from '@/components/ProgramActions';
import { Badge, PageTitle, SampleLabel } from '@/components/bits';
import { imgUrls, programsData } from '@/lib/content';
import { asset, programPath } from '@/lib/links';

type Cat = 'all' | 'appearance' | 'experience' | 'soulspeech';
const quote = { background: 'var(--surface-light)', padding: '2.5rem', borderLeft: '3px solid var(--brand-red)' } as const;
const philo = { background: 'var(--surface)', padding: '2.5rem', border: '1px solid var(--line)' } as const;
const num = { fontFamily: 'var(--font-eng)', fontSize: '2.5rem', color: 'var(--line)', fontWeight: 700, display: 'block', marginBottom: '0.5rem', lineHeight: 1 } as const;

const SoulCompare = () => (
  <div className="soul-compare">
    <Link href="/soul-speech/program"><span className="kicker">충분한 시간을 두고 변화하고 싶다면</span><strong>12주 마스터 과정 ↗</strong><p>내면 발굴 → 언어 설계 → 존재 표현<br />SST™ 진단 · Final Speech · 변화 리포트</p></Link>
    <Link href="/soul-speech/short"><span className="kicker">핵심부터 시작하고 싶다면</span><strong>4세션 단기 과정 ↗</strong><p>DISCOVER · VOICE · DESIGN · PRESENCE<br />12주의 정수를 압축한 집중 과정</p></Link>
  </div>
);

/* 시안 views.programsHub */
export default function ProgramsHub({ cat, title }: { cat: Cat; title: string }) {
  const items = cat === 'all' ? programsData : programsData.filter((p) => p.category === cat);
  return (
    <div className="page-view active">
      {cat === 'soulspeech' ? (
        <section className="soul-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(imgUrls.ssLectureHero)} alt="Soul Speech 실제 강의 현장" fetchPriority="high" />
          <div className="container"><span className="kicker">Soul Speech ACADEMY</span><h1>말은 사람의 생각과<br />마음을 세상과 연결합니다.</h1><p>말하는 기술보다 먼저, 나를 전하는 힘.</p><InquiryLink program="12 WEEKS 변화의 12단계" href="/payment" className="btn btn-paper">프로그램 신청 →</InquiryLink></div>
        </section>
      ) : <PageTitle eng={cat.toUpperCase()} kor={title} />}

      {cat === 'appearance' ? <div className="container section-wrap text-center" style={{ paddingBottom: 0 }}><h2 className="section-title">ONE PHILOSOPHY. DIFFERENT EXPERIENCES.</h2><p className="body-large">외면소통은 Appearance, Attitude, Affect 3단계를 통해 완성됩니다.<br />CEO, Professional, Private 목적에 맞는 과정을 선택하세요.</p></div> : null}
      {cat === 'experience' ? <div className="container section-wrap text-center" style={{ paddingBottom: 0 }}><h2 className="section-title">PRIVATE PROGRAMS</h2><p className="body-large">유행이 아니라 역할, 상황, 상대, 장소에 대한 존중을 표현하는 프라이빗 프로그램입니다.</p></div> : null}
      {cat === 'soulspeech' ? (
        <div className="container section-wrap soul-intro" style={{ paddingBottom: 0 }}>
          <SoulCompare />
          <h2 className="section-title mt-xl" style={{ fontSize: '2rem', marginBottom: '2rem' }}>소울스피치가 시작되는 질문</h2>
          <div className="grid-2 mb-xl" style={{ alignItems: 'stretch' }}>
            <blockquote style={quote}><p style={{ color: 'var(--ink)', lineHeight: 1.9, fontSize: '1.05rem' }}>당신의 목소리는 몇 살입니까.<br />외모는 가릴 수 있어도, 목소리는 숨길 수 없습니다.<br />목소리가 늙으면 진짜로 늙어 보입니다.<br />목소리 나이, 당신이 선택할 수 있습니다.</p></blockquote>
            <blockquote style={quote}><p style={{ color: 'var(--ink)', lineHeight: 1.9, fontSize: '1.05rem' }}>말은 청각이 아니라 존재입니다.<br />목소리는 그 존재가 세상에 닿는 방식입니다.</p></blockquote>
          </div>
          <div className="grid-3 text-left mb-xl">
            {[['왜 말하는가', '대부분의 스피치 교육은 어떻게 말할 것인가를 가르칩니다. Soul Speech는 그 이전 질문에서 시작합니다.'], ['존재로 말하다', '기술 이전에 내면을 발굴하고, 목소리를 다듬고, 나다운 언어를 설계합니다.'], ['감사와 사랑으로', '내 말로 내 감정을 먼저 선택하고, 그 에너지가 상대에게 전달될 때 진짜 소통이 시작됩니다.']].map(([h, p]) => (
              <div className="card-basic" key={h}><h3 className="eng-title" style={{ fontSize: '1.5rem', color: 'var(--brand-red-dark)', marginBottom: '1rem' }}>{h}</h3><p style={{ color: 'var(--text-sub)', lineHeight: 1.8 }}>{p}</p></div>
            ))}
          </div>
          <details className="prose-disclosure soul-philosophy"><summary>소울스피치 철학 · WHY, WHAT, HOW</summary><div className="disclosure-body" style={{ background: 'var(--surface-light)', padding: '2rem' }}>
            <h3 className="eng-title section-title" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>SOUL SPEECH PHILOSOPHY</h3>
            <p className="body-large" style={{ marginBottom: '3rem' }}>말하기에는 순서가 있습니다</p>
            <div className="grid-3 text-left">
              <div style={philo}><div style={{ marginBottom: '1.5rem' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red-dark)" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg></div><span style={num}>01</span><h4 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.3rem' }}>WHY 왜 말하는가</h4><p style={{ color: 'var(--brand-red)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Soul Awakening</p><p style={{ color: 'var(--text-sub)', lineHeight: 1.8, fontSize: '0.95rem' }}>말하는 이유를 먼저 찾습니다. 내가 말해야 하는 근본 이유, 상대가 나와 말하는 이유. 그 목적이 선명할 때 말은 기술 이전에 존재가 됩니다.</p></div>
              <div style={philo}><div style={{ marginBottom: '1.5rem' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red-dark)" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></div><span style={num}>02</span><h4 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.3rem' }}>WHAT 무엇을 말하는가</h4><p style={{ color: 'var(--brand-red)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Language Design</p><p style={{ color: 'var(--text-sub)', lineHeight: 1.8, fontSize: '0.95rem' }}>내면의 이야기를 언어로 설계합니다. 감정·신념·경험을 고주파 언어로, 나만의 스토리로 구조화합니다. 무엇을 말하느냐가 당신이 어떤 사람인지를 결정합니다.</p></div>
              <div style={philo}><div style={{ marginBottom: '1.5rem' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red-dark)" strokeWidth="1.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg></div><span style={num}>03</span><h4 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.3rem' }}>HOW 어떻게 말하는가</h4><p style={{ color: 'var(--brand-red)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Authentic Presence</p><p style={{ color: 'var(--text-sub)', lineHeight: 1.8, fontSize: '0.95rem' }}>목소리와 몸, 마음을 표현합니다. 소울 보이스·발성·리듬·공명으로 가장 나다운 방식을 완성합니다. 어떻게 말하느냐가 상대의 기억 속에 당신을 새깁니다.</p></div>
            </div>
          </div></details>
          <div className="text-left mb-xl"><h4 className="font-bold mb-sm" style={{ fontSize: '1.1rem' }}>이런 분께 권해 드립니다</h4><ul style={{ listStyle: 'disc', paddingLeft: 20, color: 'var(--text-sub)', lineHeight: 1.8 }}><li>말하는 기술보다 말하는 이유를 먼저 찾고 싶은 분</li><li>목소리에 자신이 없거나, 더 젊고 따뜻한 목소리로 가꾸고 싶은 분</li><li>자신의 이야기를 진정성 있게 전달하고 싶은 분</li><li>발표·인터뷰·강의에서 흔들리지 않는 나만의 언어를 원하는 분</li><li>말을 통해 나 자신을 성장시키고 싶은 분</li></ul></div>
          <div className="mb-xl"><h4 className="font-bold mb-sm" style={{ fontSize: '1.1rem', textAlign: 'left' }}>CORE ELEMENTS</h4><div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'flex-start' }}>{['Soul', 'Voice', 'Vibration', 'Story', 'Dialogue', 'Awareness', 'Presence', 'SST™ Diagnosis'].map((t) => <span key={t} style={{ background: 'var(--surface-light)', color: 'var(--ink)', padding: '6px 12px', fontSize: '0.85rem', border: '1px solid var(--line)' }}>{t}</span>)}</div></div>
          <div className="quote-box"><h3 className="quote-text">&quot;YOUR VOICE. YOUR MESSAGE. YOUR INFLUENCE.&quot;</h3></div>
        </div>
      ) : null}

      <div className="container section-wrap program-list">
        {cat === 'all' ? <div className="program-list-controls" role="group" aria-label="프로그램 분야"><button data-list-filter="all" aria-pressed="true">전체</button><button data-list-filter="appearance" aria-pressed="false">외면소통</button><button data-list-filter="experience" aria-pressed="false">Private Programs</button><button data-list-filter="soulspeech" aria-pressed="false">소울스피치</button></div> : null}
        {items.map((p) => (
          <div className="list-item" key={p.id} data-list-category={p.category}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="img-wrap relative"><SampleLabel show={p.isSample} txt={p.sampleLabel} /><img src={asset(p.image)} alt={p.title} style={{ height: 250 }} loading="lazy" /></div>
            <div>
              <Badge txt={p.status} />
              <h3 className="eng-title" style={{ fontSize: '1.8rem', margin: '1rem 0' }}>{p.title}</h3>
              <p className="body-large" style={{ fontSize: '0.95rem' }}>{p.subtitle}</p>
              <div className="list-meta"><span>대상</span><span>{p.audience}</span><span>기간</span><span>{p.duration}</span><span>장소</span><span>{p.place}</span><span>가격</span><span>{p.price}</span></div>
              <Link href={programPath(p)} className="btn btn-outline">상세보기</Link>
            </div>
          </div>
        ))}
      </div>

      {cat === 'soulspeech' ? (
        <div className="container section-wrap text-center" style={{ paddingTop: 0 }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}><InquiryLink program="12 WEEKS 변화의 12단계" href="/payment" className="btn btn-outline">프로그램 신청</InquiryLink><Link href="/soul-speech/program" className="btn btn-outline">12주 자세히 보기</Link></div>
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem', color: 'var(--text-sub)', fontSize: '0.9rem' }}><p style={{ marginBottom: '0.5rem' }}>Soul Speech Academy · 소울스피치랩 · 소울스피치 연구소</p><p className="eng-title" style={{ color: 'var(--brand-red-dark)' }}>SOUL SPEECH LAB &nbsp;|&nbsp; 감사와 사랑의 언어로 세상과 연결한다</p></div>
        </div>
      ) : null}

      {cat === 'all' ? (
        <div className="container section-wrap" style={{ paddingTop: 0 }}>
          <h2 className="section-title eng-title">PROGRAM CALENDAR</h2><p className="body-large" style={{ marginBottom: '2rem' }}>분기별 예정 기수 (화면 검수용 운영 예시 · 실제 일정은 확정 후 교체)</p>
          <div className="border-all" style={{ background: 'var(--surface)' }}>
            <div className="cal-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', background: 'var(--surface-light)', textAlign: 'center', fontWeight: 700, padding: '1rem 0', borderBottom: '1px solid var(--line)' }}>{['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => <div key={d}>{d}</div>)}</div>
            <div className="cal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 1, background: 'var(--line)' }}>
              {Array.from({ length: 31 }).map((_, i) => (
                <div className="cal-day" key={i} style={{ background: 'var(--surface)', minHeight: 120, padding: '0.5rem' }}><div className="cal-date" style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{i + 1}</div>
                  {i === 9 ? <div className="cal-event" style={{ fontSize: '0.75rem', padding: 4, marginBottom: 4, background: 'var(--brand-red-soft)', color: 'var(--brand-red-dark)', borderLeft: '2px solid var(--brand-red)' }}>Signature 마감</div> : null}
                  {i === 14 ? <div className="cal-event corp" style={{ fontSize: '0.75rem', padding: 4, marginBottom: 4, background: '#F0F0F0', color: '#555', borderLeft: '2px solid #999' }}>CEO 개강</div> : null}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-sub)' }}><span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, background: 'var(--brand-red-soft)', borderLeft: '2px solid var(--brand-red)', display: 'inline-block' }}></span> 신청마감</span><span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, background: '#F0F0F0', borderLeft: '2px solid #999', display: 'inline-block' }}></span> 개강</span></div>
        </div>
      ) : null}

      {cat === 'appearance' ? <FeaturedVideo /> : cat === 'soulspeech' ? <FeaturedVideo director="nam" /> : null}
    </div>
  );
}
