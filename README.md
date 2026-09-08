# h2a-next — H² Associates Ltd. 홈페이지 (Next.js)

시안(`h2a/src`)을 그대로 React(Next.js App Router)로 옮긴 사이트. 결제는 포트원 V2 브라우저 SDK + 서버 검증 API.

## 실행
```
npm install
cp .env.example .env.local   # 값 채우기
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## 구조
- `src/app/*` 경로별 페이지 (시안 해시 라우트 → 실제 경로: `#soul-speech/program` → `/soul-speech/program`)
- `src/components/*` 헤더·푸터·히어로 슬라이더·영상·갤러리 모달·폼·결제
- `src/content/*.json` 시안 `data.js` 에서 추출한 콘텐츠 (프로그램·디렉터·공지·약관 …). 헤드리스 워드프레스로 바꿀 때 `src/lib/content.ts` 만 갈아끼운다.
- `src/styles/main.css` 시안 CSS 그대로 (`url(assets/…)` → `/assets/…`)
- `public/assets/*` 시안이 참조하는 이미지만 복사
- `src/app/api/contact` 문의 메일 · `api/apply` 신청 메일(신청번호) · `api/payments/complete` 포트원 결제 검증 · `api/payments/webhook` 포트원 웹훅

## Vercel 배포
1. GitHub 저장소로 push → Vercel "Import Project" (Framework: Next.js, 기본값 그대로)
2. Environment Variables 에 `.env.example` 항목 입력. `PORTONE_API_SECRET`·`PORTONE_WEBHOOK_SECRET`·SMTP 는 Production/Preview 모두.
3. 포트원 콘솔 > 결제알림(Webhook) 관리 → `https://<vercel 도메인>/api/payments/webhook` (결제모듈 V2)
4. 도메인: Vercel 프로젝트에 `h2a.co.kr` 추가 → 가비아 DNS 에 A/CNAME 레코드 (Vercel 이 알려주는 값)
5. 환경별 채널: Preview 배포엔 테스트 채널 키, Production 엔 실연동 채널 키(계약 뒤)

## 결제 흐름
`/payment` 에서 프로그램·수단 선택 → `PortOne.requestPayment` → 성공 시 `/api/payments/complete` 로 paymentId 전송 → 서버가 `PORTONE_API_SECRET` 으로 결제 상태·금액 확인 → `/payment/complete` → `/application` 신청서(결제 ID 첨부) → 메일.
모바일은 결제창이 페이지를 떠났다가 `?portone=return` 으로 돌아오며 같은 검증을 거친다.
