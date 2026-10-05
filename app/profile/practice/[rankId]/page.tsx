import type { Metadata } from 'next';
import { ClientReplace } from '@/components/navigation/ClientReplace';
import { listPracticeCatalog } from '@/lib/exam-bank';

interface Props {
  params: Promise<{ rankId: string }>;
}

export function generateStaticParams() {
  return listPracticeCatalog().map((entry) => ({ rankId: entry.rankId }));
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'Ôn luyện',
};

export default async function PracticeRankRedirectPage({ params }: Props) {
  const { rankId } = await params;
  return <ClientReplace href={`/exam/practice/${rankId}`} />;
}
