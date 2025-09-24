// app/sitemap.ts
import { MetadataRoute } from 'next';

const locales = ['en', 'de', 'ar', 'nl', 'zh', 'fr', 'ja'] as const;
const baseUrl = 'https://www.indocharcoalsupply.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
  }));
}
