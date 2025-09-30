// Import getMessages untuk mengambil semua pesan
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import GoogleAnalytics from '@/components/Analytics';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ContactBubble from '@/components/ContactBubble';
import SchemaMarkup from '@/components/SchemaMarkup';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const baseUrl = 'https://www.indocharcoalsupply.com';
  const canonicalUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': baseUrl,
        ...Object.fromEntries(
          routing.locales.map((l) => [l, l === 'en' ? baseUrl : `${baseUrl}/${l}`])
        ),
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: t('openGraph.siteTitle'),
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: t('openGraph.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      images: [`${baseUrl}/opengraph-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout(
  { children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          {children}
          <ContactBubble />
          <SchemaMarkup />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}