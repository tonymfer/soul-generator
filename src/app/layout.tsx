import type { Metadata } from "next";
import { Press_Start_2P, Silkscreen } from "next/font/google";
import { getLocale } from "@/lib/i18n/get-locale";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { messages } from "@/lib/i18n/messages";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = messages[locale];

  return {
    title: {
      default: "ABTI - Agent Behavior Type Indicator",
      template: "%s | ABTI",
    },
    description: m.meta.description,
    keywords: [
      "ABTI",
      "AI",
      "personality",
      "agent",
      "MBTI",
      "pixel",
      "soul",
    ],
    openGraph: {
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${pressStart2P.variable} ${silkscreen.variable} min-h-screen bg-bg-primary text-text-primary font-pixel antialiased`}
      >
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
