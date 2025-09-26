import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import { getMessages } from 'next-intl/server';

// Perbarui tipe Props
type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const messages = await getMessages({ locale });
  const postData = messages.blog[slug];

  if (!postData) return { title: 'Not Found' };

  const baseUrl = 'https://www.indocharcoalsupply.com';

  return {
    metadataBase: new URL(baseUrl),
    title: postData.meta.title,
    description: postData.meta.description,
    openGraph: {
      type: 'article',
      title: postData.meta.title,
      description: postData.meta.description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      images: [
        {
          url: `${baseUrl}${postData.image}`,
          width: 1200,
          height: 630,
          alt: postData.meta.title,
        }
      ]
    },
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

const VALID_SLUGS = [
  'global-market-trends-2025',
  'guide-international-shipping-indonesian-charcoal',
  'indonesian-advantage-worlds-best-coconut-charcoal',
  'complete-guide-to-high-quality-shisha-charcoal' // Slug baru
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
          {/* Judul dan Metadata */}
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-2">{tPost('title')}</h1>
          <div className="flex items-center text-gray-500 mb-8">
            <span className="font-medium text-brand-orange">{tPost('category')}</span>
            <span className="mx-2">•</span>
            <span>{tPost('date')}</span>
          </div>

          {/* Gambar Utama */}
          <div className="relative w-full h-auto mb-8">
            <Image
              src={tPost('image')}
              alt={tPost('title')}
              width={1200}
              height={630}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
              priority
            />
          </div>

          {/* Konten Artikel */}
          <div
            className="prose lg:prose-xl max-w-none text-gray-700 text-justify"
            dangerouslySetInnerHTML={{ __html: tPost.raw('content') }}
          />

          {/* Tombol Kembali */}
          <Link href="/blog" className="inline-block mt-12 bg-brand-orange text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity duration-300">
            {tBlog('backToBlog') || 'Back to Blog'}
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}