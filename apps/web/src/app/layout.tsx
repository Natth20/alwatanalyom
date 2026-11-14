import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { BottomNav } from "@/components/BottomNav";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";
import { OFFICIAL_SOCIAL_LINKS, TRACKING_IDS } from "@awt/shared";

export const viewport: Viewport = {
  themeColor: "#590018",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "الوطن اليوم — منصة إخبارية متكاملة",
  description: "المنصة الإخبارية العربية الشاملة: رصد ميداني موثق، فلسطين أولاً، تحليلات اقتصادية، تغطيات رياضية، ومتابعة دقيقة للأحداث العاجلة بمصادرها الأصلية.",
  metadataBase: new URL("https://alwatantoday.net"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "https://alwatantoday.net",
    siteName: "الوطن اليوم",
    title: "الوطن اليوم — منصة إخبارية متكاملة",
    description: "المكان الرئيسي لجميع الأخبار بمصادرها الأصلية — منصة الأخبار والتحقق والذكاء التحريري.",
    images: [
      {
        url: "https://alwatantoday.net/brand/logo-banner.jpg",
        width: 1200,
        height: 630,
        alt: "شعار منصة الوطن اليوم",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@alwatanalyawm5",
    creator: "@alwatanalyawm5",
    title: "الوطن اليوم — منصة إخبارية متكاملة",
    description: "المكان الرئيسي لجميع الأخبار بمصادرها الأصلية.",
    images: ["https://alwatantoday.net/brand/logo-banner.jpg"],
  },
  verification: {
    google: "google-site-verification-token",
    yandex: "yandex-verification-token",
    other: {
      "msvalidate.01": ["bing-site-verification-token"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "الوطن اليوم",
    "alternateName": "Al-Watan Al-Youm",
    "url": "https://alwatantoday.net",
    "logo": "https://alwatantoday.net/brand/logo-banner.jpg",
    "sameAs": [
      OFFICIAL_SOCIAL_LINKS.facebook,
      OFFICIAL_SOCIAL_LINKS.twitter,
      OFFICIAL_SOCIAL_LINKS.instagram,
      OFFICIAL_SOCIAL_LINKS.telegram,
      OFFICIAL_SOCIAL_LINKS.youtube,
      OFFICIAL_SOCIAL_LINKS.tumblr,
    ],
    "publishingPrinciples": "https://alwatantoday.net/editorial-policy",
    "correctionsPolicy": "https://alwatantoday.net/corrections",
    "diversityPolicy": "https://alwatantoday.net/sources-policy",
    "ethicsPolicy": "https://alwatantoday.net/editorial-policy",
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Google Tag Manager Container */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${TRACKING_IDS.gtm}');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${TRACKING_IDS.gtm}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Header />
        <main className="flex-1 pb-16">{children}</main>
        <Footer />
        <SearchModal />
        <BottomNav />
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
