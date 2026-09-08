'use client';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { expertsData, featuredVideoData } from '@/lib/content';

/* 시안 renderFeaturedVideo + media.js: 포스터를 누르면 그 자리에 유튜브(nocookie) 플레이어. 한 번에 하나만 재생. */
export const youTubeId = (value: string) => {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    let id: string | null | undefined;
    if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) id = url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(?:embed|shorts)\/([^/]+)$/.exec(url.pathname)?.[1];
    return /^[A-Za-z0-9_-]{11}$/.test(id || '') ? id! : null;
  } catch { return null; }
};

export default function FeaturedVideo({ director = 'hwang' }: { director?: 'hwang' | 'nam' }) {
  const speech = director === 'nam';
  const nam = expertsData.nam;
  const v = speech
    ? { url: nam.videoUrl || '', title: '남복희의 소울스피치', description: '말은 기술보다 먼저 존재입니다. 목소리와 언어로 진정성 있게 소통하는 남복희 디렉터의 이야기를 영상으로 만나보세요.', poster: `https://i.ytimg.com/vi/${youTubeId(nam.videoUrl || '')}/hqdefault.jpg`, channel: undefined as string | undefined }
    : featuredVideoData;
  const uid = useId();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const onPlay = (e: Event) => { if ((e as CustomEvent).detail !== uid) setPlaying(false); };
    window.addEventListener('h2a:video-play', onPlay);
    return () => window.removeEventListener('h2a:video-play', onPlay);
  }, [uid]);
  const id = youTubeId(v.url);
  const play = () => { if (!id) return; window.dispatchEvent(new CustomEvent('h2a:video-play', { detail: uid })); setPlaying(true); };
  return (
    <section className="container section-wrap video-feature" aria-label={`${speech ? '남복희' : '황정선'} 대표 영상`}>
      <div>
        <div className="video-stage">
          {playing && id ? (
            <iframe className="video-player" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          ) : (
            <button type="button" className="video-poster" data-video-play={v.url} data-video-title={v.title} aria-label={`${v.title} 영상 재생`} onClick={play}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.poster} alt={`${v.title} 대표 영상`} loading="lazy" width={480} height={360} />
              <span className="video-play-icon" aria-hidden="true">▶</span>
            </button>
          )}
        </div>
        <a className="video-original" href={v.url} target="_blank" rel="noopener noreferrer">유튜브에서 영상 보기 ↗</a>
      </div>
      <div className="video-copy">
        <span className="kicker">영상으로 만나는 {speech ? '소울스피치' : '외면소통'}</span>
        <h2>{v.title}</h2>
        <p>{v.description}</p>
        <div className="video-actions">
          <a className="btn btn-outline" href={v.channel || v.url} target="_blank" rel="noopener noreferrer">{v.channel ? '유튜브 채널 보기' : '유튜브에서 영상 보기'} ↗</a>
          <Link className="text-link" href={speech ? '/soul-speech' : '/appearance'}>프로그램 살펴보기 →</Link>
        </div>
      </div>
    </section>
  );
}
