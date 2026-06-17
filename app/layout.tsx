import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import { Be_Vietnam_Pro, Noto_Serif, Noto_Serif_TC } from 'next/font/google';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { GoogleAnalyticsRouteTracker } from '@/components/analytics/GoogleAnalyticsRouteTracker';
import { ProgressProvider } from '@/components/providers/ProgressProvider';
import { PreferencesEffect } from '@/components/providers/PreferencesEffect';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AppShell } from '@/components/layout/AppShell';
import { SITE, STORAGE_KEY } from '@/lib/constants';
import '@/styles/globals.css';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-han-nom',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.title}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'Phật Quang Quyền',
    'PQQ',
    'lý thuyết võ đạo',
    'ôn lý thuyết võ đạo',
    'võ thuật Phật giáo',
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.description,
    type: 'website',
    locale: 'vi_VN',
    siteName: SITE.name,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: { url: '/logo.png', type: 'image/png' },
    apple: { url: '/logo.png', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`theme-light ${beVietnam.variable} ${notoSerif.variable} ${notoSerifTC.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-bg-primary font-body text-text-primary antialiased"
        suppressHydrationWarning
      >
        <Script
          id="color-scheme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(!r)return;var d=JSON.parse(r);var s=d.preferences&&d.preferences.colorScheme==='dark'?'dark':'light';document.documentElement.classList.toggle('theme-light',s==='light');}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <GoogleAnalytics />
          <ProgressProvider>
            <PreferencesEffect />
            <Suspense fallback={null}>
              <GoogleAnalyticsRouteTracker />
            </Suspense>
            <AppShell>{children}</AppShell>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
