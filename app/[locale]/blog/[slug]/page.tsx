// app/[locale]/blog/[slug]/page.tsx
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `blog.${slug}` });
  const baseUrl = 'https://www.indocharcoalsupply.com';

  return {
    // ✅ FIX: Add metadataBase here
    metadataBase: new URL(baseUrl),

    title: t('meta.title'),
    description: t('meta.description'),

    // ✅ IMPROVEMENT: Add unique Open Graph data for each blog post
    openGraph: {
      type: 'article',
      title: t('meta.title'),
      description: t('meta.description'),
      url: `${baseUrl}/${locale}/blog/${slug}`,
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`, // You can create unique images per blog post later
          width: 1200,
          height: 630,
          alt: t('meta.title'),
        }
      ]
    },

    // ✅ IMPROVEMENT: Add alternate language links for each blog post
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        'x-default': `${baseUrl}/en/blog/${slug}`,
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`])
        ),
      },
    },
  };
}

// ... (The rest of your BlogPostPage component stays the same)
// List of valid blog slugs
const VALID_SLUGS = [
  'choose-best-charcoal-for-shisha',
  'benefits-of-coconut-charcoal-for-bbq',
  'sustainable-production-process'
];

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  const tPost = await getTranslations({ locale, namespace: `blog.${slug}` });
  const tBlog = await getTranslations({ locale, namespace: 'blog' });

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-white">
        <article className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">{tPost('title')}</h1>
          <p className="text-lg text-gray-600 mb-8">{tPost('excerpt')}</p>

          <div
            className="prose lg:prose-xl max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: tPost.raw('content') }}
          />

          <Link href="/#blog" className="inline-block mt-12 bg-brand-orange text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity duration-300">
            {tBlog('backToBlog')}
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}