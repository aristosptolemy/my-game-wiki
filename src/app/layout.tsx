import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/comp/Header/Header";
import Footer from '@/comp/Footer/Footer'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const descriptionText = `
  ExGameWikiは、ゲームの攻略情報、武器や装備の性能、各種検証データなどを掲載するゲーム攻略Wikiです。
`

export const metadata: Metadata = {
  title: "ExGameWiki",
  description: descriptionText,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
