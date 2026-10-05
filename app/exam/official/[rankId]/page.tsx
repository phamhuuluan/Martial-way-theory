import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OfficialExamSession } from '@/components/exam/OfficialExamSession';
import { getExamConfig, getExamLevelName } from '@/lib/exam-config';
import { getExamBank, listOfficialCatalog } from '@/lib/exam-bank';

interface Props {
  params: Promise<{ rankId: string }>;
}

export function generateStaticParams() {
  return listOfficialCatalog().map((entry) => ({ rankId: entry.rankId }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rankId } = await params;
  return { title: `Thi ${getExamLevelName(rankId)}` };
}

export default async function OfficialRankPage({ params }: Props) {
  const { rankId } = await params;
  const config = getExamConfig(rankId);
  const bank = getExamBank(rankId, 'official');

  if (!config || !bank || bank.questions.length === 0) {
    notFound();
  }

  return (
    <OfficialExamSession
      rankId={rankId}
      fullName={getExamLevelName(rankId)}
      beltId={config.beltId}
      durationMinutes={config.durationMinutes}
      questionCount={config.questionCount}
      questions={bank.questions}
    />
  );
}
