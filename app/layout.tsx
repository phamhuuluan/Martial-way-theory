import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Noto_Serif, Noto_Serif_TC } from 'next/font/google';
import { ProgressProvider } from '@/components/providers/ProgressProvider';
import { PreferencesEffect } from '@/components/providers/PreferencesEffect';
import { AppShell } from '@/components/layout/AppShell';
import { SITE } from '@/lib/constants';
import { THEME_BOOTSTRAP_SCRIPT } from '@/lib/theme';
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${notoSerif.variable} ${notoSerifTC.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-bg-primary font-body text-text-primary antialiased">
        <ProgressProvider>
          <PreferencesEffect />
          <AppShell>{children}</AppShell>
        </ProgressProvider>
      </body>
    </html>
  );
}
