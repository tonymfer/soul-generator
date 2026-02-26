import type { Metadata } from "next";
import { Press_Start_2P, Silkscreen } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ABTI - Agent Behavior Type Indicator",
    template: "%s | ABTI",
  },
  description:
    "나만의 AI 에이전트 소울을 만들어보세요. MBTI처럼 성격 분석으로 세상에 하나뿐인 AI 페르소나를 생성합니다.",
  keywords: [
    "ABTI",
    "AI",
    "personality",
    "agent",
    "MBTI",
    "pixel",
    "소울",
    "에이전트",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "ABTI",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pressStart2P.variable} ${silkscreen.variable} min-h-screen bg-bg-primary text-text-primary font-pixel antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
