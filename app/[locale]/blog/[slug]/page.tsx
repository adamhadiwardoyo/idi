// app/[locale]/blog/[slug]/page.tsx
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// ✅ FIX: The `params` object is a Promise
type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ✅ FIX: Await the params to get locale and slug
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `blog.${slug}` });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

// List of valid blog slugs
const VALID_SLUGS = [
  'choose-best-charcoal-for-shisha',
  'benefits-of-coconut-charcoal-for-bbq',
  'sustainable-production-process'
];

export default async function BlogPostPage({ params }: Props) {
  // ✅ FIX: Await the params to get locale and slug
  const { locale, slug } = await params;

  // Validate slug to prevent errors
  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }
  
  const t = await getTranslations({ locale, namespace: `blog.${slug}` });

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-white">
        <article className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 mb-8">{t('excerpt')}</p>
          
          <div 
            className="prose lg:prose-xl max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: t.raw('content') }}
          />

          <Link href="/#blog" className="inline-block mt-12 bg-brand-orange text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity duration-300">
            Back to Blog
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}