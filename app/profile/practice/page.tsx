import type { Metadata } from 'next';
import { listPracticeCatalog } from '@/lib/exam-bank';
import { PracticeRankPicker } from '@/components/exam/PracticeRankPicker';

export const metadata: Metadata = {
  title: 'Luyện đề trắc nghiệm',
  description: 'Chọn cấp đai và luyện đề trắc nghiệm lý thuyết, tách khỏi hành trình học',
};

export default function PracticePage() {
  const catalog = listPracticeCatalog();
  return <PracticeRankPicker catalog={catalog} />;
}
