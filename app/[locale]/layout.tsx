// app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import GoogleAnalytics from '@/components/Analytics';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContactBubble from "@/components/ContactBubble";
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

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const baseUrl = 'https://www.indocharcoalsupply.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'x-default': `${baseUrl}/en`,
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    },
    openGraph: {
      type: 'website',
      siteName: t('openGraph.siteTitle'),
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      locale: locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
      url: `${baseUrl}/${locale}`,
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: t('openGraph.title'),
        },
        {
          url: `${baseUrl}/logo.webp`,
          width: 800,
          height: 600,
          alt: 'Indo Charcoal Supply Logo',
        }
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // ✅ Define your schema markup object here
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Indo Charcoal Supply",
    "url": "https://www.indocharcoalsupply.com",
    "logo": "https://www.indocharcoalsupply.com/logo.webp",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-851-5675-1503",
      "contactType": "customer service"
    }
  };

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        {/* ✅ This script tag is the correct way to add JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <NextIntlClientProvider>
          <GoogleAnalytics />
          {children}
          <ContactBubble />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}