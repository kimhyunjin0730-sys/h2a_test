import type { Metadata } from 'next';
import { PageTitle, SampleLabel } from '@/components/bits';
import { imgUrls } from '@/lib/content';
import { asset } from '@/lib/links';

export const metadata: Metadata = { title: '회사 소개' };

const DOMAINS = [
  ['Executive Presence', ['Appearance', 'Attitude', 'Body Language', 'Manner', 'Social Appeal', 'Leadership Presence']],
  ['Executive Communication', ['Speech', 'Voice', 'Presentation', 'Public Speaking', 'Interview', 'Media Communication', 'Leadership Communication']],
  ['Personal & Professional Branding', ['Executive Branding', 'CEO Branding', 'Professional Positioning', 'Brand Narrative', 'Content Strategy', 'Thought Leadership']],
  ['Brand & Business Development', ['Program Development', 'Content Development', 'Corporate Business', 'Strategic Partnership', 'Premium Experience', 'Brand Expansion']],
] as const;
const STEPS = ['EXPERTISE — 전문성과 경험의 발견', 'CONTENT — 지식과 철학의 콘텐츠화', 'PROGRAM — 교육·강연·컨설팅 상품화', 'BRAND — 차별화된 전문 브랜드 구축', 'BUSINESS — 기업·VIP·파트너십·콘텐츠 사업 확장', 'INFLUENCE — 지속 가능한 영향력'];
const pStyle = { marginBottom: '1.1rem', color: 'var(--ink)', fontWeight: 400, fontSize: '1.02rem', lineHeight: 1.85 } as const;

export default function AboutPage() {
  const img = asset(imgUrls.aboutMeeting);
  return (
    <div className="page-view active">
      <PageTitle eng="About" kor="회사 소개" />
      <div className="container section-wrap grid-2 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="img-wrap relative"><SampleLabel show txt="화면 검수용 샘플" /><img src={img} srcSet={`${img.replace(/\.jpg$/, '-800.jpg')} 800w, ${img} 1400w`} sizes="(max-width: 760px) 100vw, 50vw" alt="회의실에서 대화하는 두 전문가" loading="lazy" /></div>
        <div>
          <h3 className="section-title">전문성을 영향력으로.</h3>
          <p className="body-large" style={{ marginBottom: '2rem' }}>H2A는 리더와 전문가의 전문성과 경험을 발견하고, 그들이 어떻게 보이고, 말하고, 관계 맺고, 기억될지를 통합적으로 설계하는 Executive Presence &amp; Communication Company입니다.<br /><br />전문성을 콘텐츠로, 콘텐츠를 프로그램으로, 프로그램을 브랜드와 비즈니스로 발전시킵니다.<br /><br />Expertise → Presence → Influence</p>
          <h4 className="eng-title" style={{ fontSize: '1.2rem', margin: '2rem 0 1rem', color: 'var(--brand-red-dark)' }}>WHAT WE BELIEVE</h4>
          <p className="body-large">GREAT EXPERTISE DESERVES TO BE SEEN, HEARD AND REMEMBERED.<br /><br />전문성이 있어도 그 가치가 저절로 전달되는 것은 아닙니다. H2A가 설계하는 것은 단순한 이미지나 화법이 아니라 사람이 신뢰받고, 기억되고, 선택받는 방식입니다.</p>
        </div>
      </div>
      <div className="container section-wrap" style={{ paddingTop: 0 }}>
        <details className="prose-disclosure"><summary>대표이사 인사말 · 한석용</summary>
          <div className="mt-xl" style={{ maxWidth: 900 }}><div>
            <h3 className="section-title mb-md" style={{ fontSize: 'clamp(1.45rem, 2.3vw, 2rem)', lineHeight: 1.5, fontWeight: 500, color: 'var(--ink)' }}>전문성은 그 자체로도 가치가 있지만,<br />사람들에게 제대로 전달되고 기억될 때 비로소 영향력이 됩니다.</h3>
            <p className="body-large" style={pStyle}>H2A는 한 사람 안에 축적된 지식과 경험, 고유한 철학을 발견하고 이를 콘텐츠와 프로그램, 브랜드와 비즈니스로 연결하기 위해 설립되었습니다. 우리는 단순히 잘 보이고 잘 말하는 기술을 가르치는 데 그치지 않습니다. 한 사람의 전문성이 그에 걸맞은 존재감으로 드러나고, 신뢰와 관계, 지속 가능한 영향력으로 확장되도록 돕고자 합니다.</p>
            <p className="body-large" style={pStyle}>이러한 철학을 바탕으로 H2A는 황정선 박사의 ‘외면소통 ACADEMY’와 남복희 박사의 ‘Soul Speech ACADEMY’를 선보입니다.</p>
            <p className="body-large" style={pStyle}>외면소통 ACADEMY는 Appearance·Attitude·Appeal을 통해 사람의 전문성과 품격이 어떻게 보이고, 행동으로 드러나며, 어떤 감정으로 기억되는지를 설계합니다. Soul Speech ACADEMY는 목소리와 언어, 생각과 감정을 연결하여 자신의 메시지를 진정성 있게 전달하고 사람의 마음을 움직이는 힘을 길러줍니다.</p>
            <p className="body-large" style={pStyle}>보이는 태도와 들리는 언어가 하나의 방향으로 정렬될 때, 전문성은 설명하지 않아도 느껴지는 존재감이 되고 존재감은 사람과 조직을 움직이는 영향력이 됩니다.</p>
            <p className="body-large" style={pStyle}>H2A는 앞으로도 현장 경험과 독자적인 철학을 지닌 전문가들과 함께 차별화된 교육 콘텐츠를 개발하고, 개인과 조직의 성장을 이끄는 프로그램으로 발전시켜 나가겠습니다.</p>
            <p className="body-large" style={{ ...pStyle, marginBottom: '2rem' }}>당신이 가진 전문성이 더 넓은 세상에서 발견되고, 신뢰받고, 기억될 수 있도록 H2A가 든든한 파트너가 되겠습니다.</p>
            <div style={{ marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '2rem' }}><p style={{ color: 'var(--text-sub)', marginBottom: '0.4rem' }}>에이치스퀘어 어쏘시에이츠 주식회사</p><h4 style={{ fontSize: '1.35rem', fontWeight: 700 }}>대표이사 한석용</h4></div>
          </div></div>
        </details>
      </div>
      <div className="container section-wrap" style={{ paddingTop: 0 }}>
        <h3 className="section-title eng-title">4대 전문영역</h3>
        <div className="grid-2" style={{ marginTop: '2rem' }}>
          {DOMAINS.map(([title, items]) => (
            <div className="card-basic" key={title}><h4 className="eng-title" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--brand-red-dark)' }}>{title}</h4><ul style={{ color: 'var(--text-sub)', lineHeight: 1.8, listStyle: 'disc', paddingLeft: 20 }}>{items.map((x) => <li key={x}>{x}</li>)}</ul></div>
          ))}
        </div>
      </div>
      <div className="container section-wrap" style={{ paddingTop: 0 }}>
        <h3 className="section-title eng-title">EXPERTISE TO INFLUENCE</h3>
        <p className="body-large" style={{ marginBottom: '2rem' }}>H2A는 전문성과 경험을 발견하는 데서 출발해 콘텐츠, 프로그램, 브랜드와 비즈니스로 연결합니다. 아래 과정은 별도 서비스명이 아니라 H2A가 프로젝트를 바라보는 통합적인 접근 방식입니다.</p>
        <div className="grid-3" style={{ marginTop: '2rem' }}>
          {STEPS.map((v, i) => <div key={v} style={{ border: '1px solid var(--line)', padding: '2rem', background: 'var(--surface)' }}><span className="eng-title" style={{ fontSize: '2rem', color: 'var(--line)' }}>0{i + 1}</span><p style={{ fontWeight: 700, marginTop: '1rem' }}>{v}</p></div>)}
        </div>
      </div>
    </div>
  );
}
