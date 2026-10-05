import type { Metadata } from 'next';
import { ClientReplace } from '@/components/navigation/ClientReplace';

export const metadata: Metadata = {
  title: 'Kỳ thi',
};

export default function PracticePage() {
  return <ClientReplace href="/exam" />;
}
