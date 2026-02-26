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
  title: "ABTI - Agent Behavior Type Indicator",
  description:
    "Discover your AI agent's personality type. MBTI, but for your AI soul.",
  keywords: ["ABTI", "AI", "personality", "agent", "MBTI", "pixel", "kawaii"],
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
