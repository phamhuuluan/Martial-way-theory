'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { GA_MEASUREMENT_ID, pageview } from '@/lib/gtag';

export function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
