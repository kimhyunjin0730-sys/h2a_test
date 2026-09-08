import { PageTitle, SampleLabel } from '@/components/bits';

export default function LegalPage({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="page-view active">
      <PageTitle eng="Policy" kor={title} />
      <div className="container section-wrap" style={{ maxWidth: 900, paddingTop: 0 }}>
        <SampleLabel show txt="화면 검수용 초안 · 법률 및 운영정책 검토 전 사용 금지" />
        <div className="legal-content" style={{ marginTop: '2rem' }}>{items.map((item) => <div key={item}><h3 className="eng-title">{item}</h3><p>(화면 검수용 샘플 텍스트)</p></div>)}</div>
      </div>
    </div>
  );
}
