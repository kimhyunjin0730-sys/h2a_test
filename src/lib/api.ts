'use client';
/* API 호출. 정적 미리보기(GitHub Pages 등, API 라우트 없음)에서는 404/HTML 이 오므로 preview:true 로 돌려준다. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export type ApiResult = Record<string, unknown> & { ok: boolean; preview?: boolean; error?: string };
export async function postJson(path: string, data: unknown): Promise<ApiResult> {
  try {
    const r = await fetch(`${BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const ct = r.headers.get('content-type') || '';
    if (!ct.includes('application/json')) return { ok: true, preview: true, note: '정적 미리보기 — 서버 API 없음' };
    const j = (await r.json()) as ApiResult;
    return { ...j, ok: r.ok && j.ok !== false };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
