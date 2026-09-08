import type { Metadata } from 'next';
import Accordion from '@/components/Accordion';
import { PageTitle } from '@/components/bits';
import { faqData } from '@/lib/content';

export const metadata: Metadata = { title: '자주 묻는 질문' };

export default function FaqPage() {
  return (
    <div className="page-view active">
      <PageTitle eng="Support" kor="자주 묻는 질문" />
      <div className="container section-wrap" style={{ maxWidth: 800 }}>
        <div className="faq-search"><label htmlFor="faq-query">궁금한 내용을 검색하세요</label><input type="search" id="faq-query" data-faq-search placeholder="프로그램, 일정, 상담 등" /></div>
        <Accordion items={faqData} sample />
      </div>
    </div>
  );
}
