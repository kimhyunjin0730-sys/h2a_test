import { PageTitle } from '@/components/bits';
import { legalDocs, type LegalBodyItem, type LegalSection, type LegalSlug } from '@/lib/content';

/* 약관 3종. 본문 원본은 h2a 저장소 wp-theme/h2a/import/legal.json → tools/sync_legal.py 가 legalDocs.json 을 만든다. */
function Body({ items }: { items: LegalBodyItem[] }) {
  return (
    <>
      {items.map((it, i) => {
        if (typeof it === 'string') return <p key={i}>{it}</p>;
        if (Array.isArray(it)) return <ul key={i}>{it.map((li) => <li key={li}>{li}</li>)}</ul>;
        return (
          <div className="table-wrap" key={i}>
            <table>
              <thead><tr>{it.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{it.table.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const d = legalDocs[slug];
  const sections: LegalSection[] = d.footer ? [...d.sections, d.footer] : d.sections;
  return (
    <div className="page-view active">
      <PageTitle eng="Policy" kor={d.title} />
      <div className="container section-wrap" style={{ maxWidth: 900, paddingTop: 0 }}>
        <div className="legal-content" style={{ marginTop: '2rem' }}>
          {d.draft ? <p className="legal-draft">{d.draftNote || '초안'}</p> : null}
          {sections.map((s) => <section className="legal-section" key={s.h}><h3>{s.h}</h3><Body items={s.body} /></section>)}
        </div>
      </div>
    </div>
  );
}
