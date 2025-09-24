// NEXT INTERNATIONAL
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation'
import GoogleAnalytics from '@/components/Analytics';
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.js

export const metadata = {

  title: {
    default: ' Indo Charcoal Supply Premium | Indonesian Charcoal Exporter ',
    template: '%s | Indo Charcoal Supply', 
  },

  description: 'Leading manufacturer and exporter of 100% natural coconut charcoal briquettes from Indonesia. We provide high-quality, sustainable charcoal for shisha, hookah, and BBQ to clients worldwide. Contact us for wholesale and OEM orders.',

  keywords: ['coconut charcoal exporter', 'Indonesian charcoal supplier', 'wholesale shisha charcoal', 'OEM charcoal briquettes', 'BBQ charcoal bulk', 'global charcoal shipping'],
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
        
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <GoogleAnalytics />
          {children}
          <ContactBubble />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
