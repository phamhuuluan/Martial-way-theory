import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PracticeSession } from '@/components/exam/PracticeSession';
import { getExamLevelName } from '@/lib/exam-config';
import { getExamBank, listPracticeCatalog } from '@/lib/exam-bank';

interface Props {
  params: Promise<{ rankId: string }>;
}

export function generateStaticParams() {
  return listPracticeCatalog().map((entry) => ({ rankId: entry.rankId }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rankId } = await params;
  return { title: `Ôn luyện ${getExamLevelName(rankId)}` };
}

export default async function PracticeRankPage({ params }: Props) {
  const { rankId } = await params;
  const bank = getExamBank(rankId, 'practice');

  if (!bank || bank.questions.length === 0) {
    notFound();
  }

  return (
    <PracticeSession
      rankId={rankId}
      fullName={getExamLevelName(rankId)}
      beltId={bank.beltId}
      questions={bank.questions}
    />
  );
}
