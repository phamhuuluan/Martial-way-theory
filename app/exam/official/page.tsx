import type { Metadata } from 'next';
import { ExamSection } from '@/components/exam/ExamSection';
import { PracticeRankPicker } from '@/components/exam/PracticeRankPicker';
import { listOfficialCatalog } from '@/lib/exam-bank';

export const metadata: Metadata = {
  title: 'Thi lý thuyết võ đạo',
  description: 'Thi lý thuyết võ đạo có thời gian làm bài',
};

export default function ExamOfficialPage() {
  return (
    <ExamSection tab="official">
      <PracticeRankPicker
        catalog={listOfficialCatalog()}
        hrefBase="/exam/official"
        showDuration
        clearExitRedirect
      />
    </ExamSection>
  );
}
