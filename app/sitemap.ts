// app/sitemap.ts
import { MetadataRoute } from 'next';

const locales = ['en', 'de', 'ar', 'nl', 'zh', 'fr', 'ja'];
const baseUrl = 'https://www.indocharcoalsupply.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
  }));

  return sitemapEntries;
}