import nodemailer from 'nodemailer';

/* SMTP 환경변수가 있으면 메일을 보내고, 없으면 서버 로그만 남긴다(테스트 배포용).
   SMTP_HOST · SMTP_PORT · SMTP_USER · SMTP_PASS · MAIL_FROM · MAIL_TO */
export async function sendMail({ subject, text, replyTo }: { subject: string; text: string; replyTo?: string }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    console.log('[mail:skipped]', subject, '\n', text);
    return { sent: false as const, reason: 'SMTP 미설정' };
  }
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT || 587), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  await transport.sendMail({ from: MAIL_FROM || SMTP_USER, to: MAIL_TO, subject, text, replyTo });
  return { sent: true as const };
}

export const fields = (obj: Record<string, unknown>) => Object.entries(obj).map(([k, v]) => `${k}: ${String(v ?? '')}`).join('\n');
