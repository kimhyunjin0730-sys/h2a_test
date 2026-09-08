import type { Metadata } from 'next';
import Link from 'next/link';
import { PageTitle, SampleLabel } from '@/components/bits';

export const metadata: Metadata = { title: 'H²A 기업 맞춤 솔루션' };
const ul = { color: 'var(--text-sub)', lineHeight: 1.8, listStyle: 'disc', paddingLeft: 20 } as const;
const STEPS = [
  ['01 DIAGNOSE', '기업별 요구사항 진단', ['조직의 목표 및 현황 파악', '참여자 역할 및 과제 분석', '현재 커뮤니케이션 상황 점검']],
  ['02 DESIGN', '맞춤형 교육 설계', ['강의·워크숍·실습·코칭 조합', '실제 업무 사례 반영', '대상과 목적에 맞는 커리큘럼 구성']],
  ['03 APPLY', '교육 운영', ['교육 중 실습과 피드백', '현업 적용 과제 수행', '학습 내용을 업무 행동으로 연결']],
  ['04 REVIEW', '결과 분석 및 후속 제안', ['교육 결과 및 성과 분석', '조직 적용도 점검', '지속적인 성장을 위한 후속 과정 제안']],
] as const;

export default function SolutionPage() {
  return (
    <div className="page-view active">
      <PageTitle eng="Solution" kor={<>H<sup>2</sup>A</>} />
      <div className="container section-wrap">
        <SampleLabel show txt="기업 맞춤 솔루션 화면 검수용 샘플 · 제안 범위 확정 후 교체" />
        <h2 className="section-title mt-md">맞춤형 제안 체계</h2>
        <p className="body-large mb-xl">H<sup>2</sup>A는 리더와 조직이 마주한 커뮤니케이션 과제를 진단하고, 목적과 대상에 맞는 교육·컨설팅·코칭을 조합하는 기업 맞춤형 제안 체계입니다.</p>
        <div className="grid-4 text-left mb-xl">
          {STEPS.map(([n, t, items]) => (
            <div className="card-basic" key={n}><span className="eng-title" style={{ fontSize: '1.5rem', color: 'var(--brand-red)', display: 'block', marginBottom: '1rem' }}>{n}</span><strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '1rem' }}>{t}</strong><ul style={ul}>{items.map((x) => <li key={x}>{x}</li>)}</ul></div>
          ))}
        </div>
        <div className="grid-2">
          <div className="card-basic"><h3 className="eng-title" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>제안 가능 영역</h3><ul style={ul}><li>CEO &amp; Executive Communication</li><li>Executive Presence</li><li>Leadership Communication</li><li>Presentation &amp; Public Speaking</li><li>Media &amp; Interview Training</li><li>Personal Branding for Leaders</li><li>Private &amp; VIP Programs</li><li>Customized Executive Programs</li></ul></div>
          <div className="card-basic"><h3 className="eng-title" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>제안 결과물 예시</h3><p className="body-large">과제 정의, 대상별 커리큘럼, 운영 일정, 강의·워크숍 구성, 필요 시 진단과 코칭, 교육 후 적용 방향을 포함한 맞춤 제안서를 제공합니다. 구체적인 결과물은 협의 후 확정합니다.</p><div className="mt-auto pt-lg"><Link href="/business/proposal" className="btn btn-primary btn-full">상담 신청 / 기업교육 제안 요청</Link></div></div>
        </div>
      </div>
    </div>
  );
}
