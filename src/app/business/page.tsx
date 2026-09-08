import type { Metadata } from 'next';
import Link from 'next/link';
import { PageTitle, SampleLabel } from '@/components/bits';

export const metadata: Metadata = { title: '기업교육 소개' };
const ul = { color: 'var(--text-sub)', lineHeight: 1.8, listStyle: 'disc', paddingLeft: 20 } as const;
const h3 = { fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--brand-red-dark)' } as const;

export default function BusinessPage() {
  return (
    <div className="page-view active">
      <PageTitle eng="For Business" kor="기업교육 소개" />
      <div className="container section-wrap">
        <SampleLabel show txt="기업교육 소개 화면 검수용 샘플 · 실제 제안 범위 확정 후 교체" />
        <h2 className="section-title mt-md">조직 내 커뮤니케이션 문제 해결과 임원진의 프레즌스 강화</h2>
        <p className="body-large" style={{ marginBottom: '1.5rem' }}>진단부터 사후 적용까지 맞춤형 교육·컨설팅을 설계합니다.</p>
        <p className="body-large" style={{ marginBottom: '4rem' }}>정형화된 교육과정을 그대로 적용하기보다 조직의 목표, 참여자의 역할, 실제 업무 상황을 먼저 이해합니다. 리더의 태도와 언어, 대외 커뮤니케이션, 발표와 미디어 대응, 개인 및 조직 브랜드의 연결까지 하나의 흐름으로 살펴봅니다.</p>
        <div className="grid-3 mb-xl">
          <div className="card-basic"><h3 className="eng-title" style={h3}>이런 조직에 적합합니다</h3><ul style={ul}><li>임원진의 커뮤니케이션 기준이 필요한 기업</li><li>리더십 메시지와 조직 브랜드의 일관성을 높이려는 기업</li><li>발표·인터뷰·미디어 대응 역량이 필요한 조직</li></ul></div>
          <div className="card-basic"><h3 className="eng-title" style={h3}>다루는 과제</h3><ul style={ul}><li>리더 프레즌스</li><li>발표와 스피치</li><li>인터뷰·미디어 대응</li><li>비언어 커뮤니케이션</li><li>조직 내 관계와 대화</li><li>개인 브랜딩</li></ul></div>
          <div className="card-basic"><h3 className="eng-title" style={h3}>운영 방식</h3><ul style={ul}><li>강의</li><li>워크숍</li><li>진단</li><li>시뮬레이션</li><li>1:1 코칭</li><li>기업별 맞춤 구성</li></ul></div>
        </div>
        <div className="grid-2">
          <div><h3 className="section-title" style={{ fontSize: '1.8rem' }}>제안 진행 절차</h3><ol style={{ color: 'var(--text-sub)', lineHeight: 2, paddingLeft: 20 }}><li>기업교육 문의 접수</li><li>담당자 사전 미팅</li><li>대상·목표·현황 확인</li><li>맞춤 커리큘럼 및 운영안 제안</li><li>일정·예산 협의</li><li>교육 진행 및 피드백</li></ol></div>
          <div><h3 className="section-title" style={{ fontSize: '1.8rem' }}>문의 전 준비정보</h3><ul style={{ ...ul, lineHeight: 2 }}><li>교육 대상 / 예상 인원</li><li>해결하려는 과제</li><li>희망 일정 / 총 교육시간</li><li>희망 장소</li><li>예산 범위 / 내부 승인 일정</li></ul></div>
        </div>
        <div className="text-center" style={{ marginTop: '4rem' }}><Link href="/business/proposal" className="btn btn-primary">기업교육 제안 요청</Link></div>
      </div>
    </div>
  );
}
