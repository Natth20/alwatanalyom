import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { BottomNav } from "@/components/BottomNav";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";

export const metadata: Metadata = {
  title: "الوطن اليوم — المكان الرئيسي لجميع الأخبار بمصادرها الأصلية",
  description: "منصة إخبارية ذكية متكاملة تجمع الأخبار من مصادرها الأصلية المعتمدة، وتدمج التغطيات في قصص متكاملة مع سياق تحريري وتحقق موضوعي.",
  metadataBase: new URL("https://alwatantoday.net"),
  alternates: {
    canonical: "/",
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
    "logo": "https://alwatantoday.net/logo.svg",
    "sameAs": [
      "https://twitter.com/alwatantoday",
      "https://t.me/alwatantoday",
      "https://facebook.com/alwatantoday"
    ],
    "publishingPrinciples": "https://alwatantoday.net/editorial-policy",
    "correctionsPolicy": "https://alwatantoday.net/corrections",
    "diversityPolicy": "https://alwatantoday.net/sources-policy",
    "ethicsPolicy": "https://alwatantoday.net/editorial-policy"
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
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

