import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { Toaster } from '@/components/ui/toaster';

export const viewport = 'width=device-width, initial-scale=1';

export const metadata: Metadata = {
  title: 'UI画布尺寸计算器',
  description: '根据屏幕参数计算最佳UI设计画布尺寸和相关参数。支持多种屏幕尺寸和观看距离，为UI设计师提供精确的画布尺寸建议。',
  keywords: ['UI设计', '画布尺寸', '屏幕分辨率', '设计工具', 'PPI计算', 'DPI', '界面设计', '移动端设计', '响应式设计'],
  authors: [{ name: 'Victor_42', url: 'https://victor42.work/' }],
  creator: 'Victor_42',
  publisher: 'Victor_42',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://ui-size.victor42.work/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ui-size.victor42.work/',
    title: 'UI画布尺寸计算器',
    description: '根据屏幕参数计算最佳UI设计画布尺寸和相关参数。支持多种屏幕尺寸和观看距离，为UI设计师提供精确的画布尺寸建议。',
    siteName: 'UI画布尺寸计算器',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI画布尺寸计算器',
    description: '根据屏幕参数计算最佳UI设计画布尺寸和相关参数',
    creator: '@victor42_eth',
  },
  other: {
    'theme-color': '#ffffff',
    'color-scheme': 'light dark',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4ZRLWZBMB0"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4ZRLWZBMB0');
            `,
          }}
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
