import type { Metadata } from 'next';
import { ExamSection } from '@/components/exam/ExamSection';
import { PracticeRankPicker } from '@/components/exam/PracticeRankPicker';
import { listPracticeCatalog } from '@/lib/exam-bank';

export const metadata: Metadata = {
  title: 'Kỳ thi',
  description: 'Ôn luyện lý thuyết võ đạo, không giới hạn thời gian',
};

export default function ExamPracticePage() {
  return (
    <ExamSection tab="practice">
      <PracticeRankPicker
        catalog={listPracticeCatalog()}
        hrefBase="/exam/practice"
        showQuestionCount={false}
      />
    </ExamSection>
  );
}
