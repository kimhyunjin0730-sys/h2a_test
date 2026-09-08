import type { NextConfig } from 'next';

// STATIC_EXPORT=1 이면 GitHub Pages 용 정적 내보내기(API 라우트 제외 사본에서 빌드).
// NEXT_PUBLIC_BASE_PATH 는 하위 경로 배포(/h2a_test/next) 때만.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT ? { output: 'export', trailingSlash: true } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
