import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBelts, getLessonsForBelt } from '@/lib/content';
import { getBeltById } from '@/lib/constants';
import { BeltWorldClient } from '@/components/world/BeltWorldClient';

interface Props {
  params: Promise<{ belt: string }>;
}

export async function generateStaticParams() {
  return getAllBelts().map((belt) => ({ belt }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { belt } = await params;
  try {
    const world = getBeltById(belt as Parameters<typeof getBeltById>[0]);
    return {
      title: world.name,
      description: `${world.scene} — ${world.totalLessons} bài học lý thuyết`,
    };
  } catch {
    return { title: 'Cấp đai' };
  }
}

export default async function BeltWorldPage({ params }: Props) {
  const { belt } = await params;

  let world;
  try {
    world = getBeltById(belt as Parameters<typeof getBeltById>[0]);
  } catch {
    notFound();
  }

  const lessons = getLessonsForBelt(world.id);

  return <BeltWorldClient world={world} lessons={lessons} />;
}
