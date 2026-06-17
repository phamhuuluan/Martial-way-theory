import type { MetadataRoute } from 'next';
import { getAllLessonParams, getAllBelts } from '@/lib/content';
import { SITE } from '@/lib/constants';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const lessonRoutes = getAllLessonParams().flatMap(({ belt, lesson }) => [
    {
      url: `${base}/world/${belt}/${lesson}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${base}/world/${belt}/${lesson}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  const beltRoutes = getAllBelts().map((belt) => ({
    url: `${base}/world/${belt}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/journey`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/documents`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/achievements`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/profile`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...beltRoutes,
    ...lessonRoutes,
  ];
}
