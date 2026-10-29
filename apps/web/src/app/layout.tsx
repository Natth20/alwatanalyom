import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";

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
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-16">{children}</main>
        <Footer />
        <SearchModal />
      </body>
    </html>
  );
}

