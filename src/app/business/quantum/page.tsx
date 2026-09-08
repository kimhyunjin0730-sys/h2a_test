import type { Metadata } from 'next';
import Link from 'next/link';
import { PageTitle, SampleLabel } from '@/components/bits';
import { corpPrograms } from '@/lib/content';
import { asset } from '@/lib/links';

export const metadata: Metadata = { title: 'Quantum 품격' };

export default function QuantumPage() {
  const p = corpPrograms[0];
  return (
    <div className="page-view active">
      <PageTitle eng="Quantum" kor="Quantum 품격" />
      <div className="container section-wrap grid-2 items-center">
        <div><SampleLabel show={p.isSample} txt={p.sampleLabel} /><h2 className="section-title eng-title mt-md">{p.title}</h2><p className="body-large">{p.subtitle}</p><ul style={{ marginTop: '2rem', color: 'var(--text-sub)', lineHeight: 2, listStyle: 'disc', paddingLeft: 20 }}><li><strong>대상:</strong> {p.audience}</li><li><strong>운영:</strong> {p.duration}</li></ul><Link href="/business/proposal" className="btn btn-primary mt-lg">기업교육 제안 요청</Link></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="img-wrap relative"><img src={asset(p.image)} alt="Quantum" loading="lazy" /></div>
      </div>
      <div className="container section-wrap" style={{ paddingTop: 0 }}><h3 className="section-title eng-title">CURRICULUM</h3><ul className="curriculum-list">{p.curr.map((c: { t: string; d: string }) => <li key={c.t}><h4 className="eng-title" style={{ fontSize: '1.1rem', color: 'var(--brand-red-dark)' }}>{c.t}</h4><p>{c.d}</p></li>)}</ul></div>
    </div>
  );
}
