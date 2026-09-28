import type { Metadata } from 'next';
import { PageTitle } from '@/components/bits';
import FeaturedVideo from '@/components/FeaturedVideo';
import { mediaGroups } from '@/lib/media';

export const metadata: Metadata = { title: '미디어' };

/* SNS·영상 채널 모음 (테마 page-media.php). 채널은 src/content/mediaLinks.json. 교육 현장(갤러리)은 「소식」에 그대로 둔다. */
export default function MediaPage() {
  return (
    <div className="page-view active">
      <PageTitle eng="MEDIA" kor="미디어" />
      <div className="container section-wrap">
        <p className="body-large media-intro">H2A 와 디렉터들이 운영하는 채널을 한곳에 모았습니다. 새 영상과 소식은 각 채널에서 먼저 만나보실 수 있습니다.</p>
        {mediaGroups.map(g => (
          <section className="media-group" id={`media-${g.key}`} aria-labelledby={`media-${g.key}-title`} data-reveal key={g.key}>
            <h2 className="section-title eng-title" id={`media-${g.key}-title`}>{g.label}</h2>
            <div className="grid-3 media-links">
              {g.links.map(l => (
                <a className="card-basic media-card" href={l.url} target="_blank" rel="noopener noreferrer" key={l.url}>
                  {l.owner ? <span className="label-sm">{l.owner}</span> : null}
                  <strong className="media-card-title">{l.title || g.label}</strong>
                  {l.desc ? <span className="media-card-desc">{l.desc}</span> : null}
                  <span className="media-card-go">채널 바로가기 ↗</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div id="media-videos">
        <div className="container"><h2 className="section-title eng-title">대표 영상</h2></div>
        <FeaturedVideo director="hwang" />
        <FeaturedVideo director="nam" />
      </div>
    </div>
  );
}
