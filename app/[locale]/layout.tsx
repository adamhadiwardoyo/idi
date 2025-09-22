// NEXT INTERNATIONAL
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation'

// DEFAULT CONFIGURATION
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// COMPONENTS
import ContactBubble from "@/components/ContactBubble";

// app/[locale]/layout.tsx atau komponen Swiper kamu
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Script from "next/script";
import Analytics from "@/components/Analytics"; // kita bikin komponen client

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Indo Charcoal Supply",
  description: "production and export of high-quality briquettes",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WXH6D3K8XH"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WXH6D3K8XH');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          {children}
          <ContactBubble />
        </NextIntlClientProvider>

        {/* Track navigasi antar route */}
        <Analytics />
      </body>
    </html>
  );
}
