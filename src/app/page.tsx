import CalculatorClientPage from '@/components/calculator/calculator-client-page';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'UI画布尺寸计算器 | UI画布大小计算',
    description: '根据屏幕参数计算最佳UI设计画布尺寸和相关参数。轻松确定UI画布大小，支持多种屏幕尺寸和观看距离，为UI设计师提供精确的画布尺寸建议。',
    url: 'https://ui-size.victor42.work/',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Person',
      name: 'Victor_42',
      url: 'https://victor42.work/',
    },
    keywords: 'UI设计,画布尺寸,UI画布大小,画布大小,屏幕分辨率,设计工具,PPI计算,DPI,界面设计',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorClientPage />
    </>
  );
}
