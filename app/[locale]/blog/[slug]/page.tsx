import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import { API_BASE_URL } from '@/lib/api';
import { format } from 'date-fns';

// --- Interface for the Post data ---
interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  date: string;
  category: string;
  language: string;
  is_active: boolean;
  meta_title: string;
  meta_description: string;
}

// --- Type definition for page props (compatible with Next.js 15) ---
type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>
}

// --- API Fetching Function ---
async function getPost(slug: string, locale: string): Promise<Post | null> {
  try {
    // Force a fresh fetch every time to avoid any caching issues
    const response = await fetch(`${API_BASE_URL}/posts`, { cache: 'no-store' });
    if (!response.ok) {
      return null;
    }
    const posts: Post[] = await response.json();
    const post = posts.find(p => p.slug === slug && p.language === locale && p.is_active);
    return post || null;
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
}

// --- Remove generateStaticParams to ensure the page is always dynamic ---
// By removing this function, Next.js will render every blog post on-demand.
// This solves the 404 issue if a post was added after the last build.

// --- Metadata Generation ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const baseUrl = 'https://www.indocharcoalsupply.com';
  return {
    metadataBase: new URL(baseUrl),
    title: post.meta_title,
    description: post.meta_description,
    openGraph: {
      type: 'article',
      title: post.meta_title,
      description: post.meta_description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      images: [{ url: post.image_url, width: 1200, height: 630, alt: post.title }]
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: {
        'x-default': `${baseUrl}/en/blog/${slug}`,
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`])
        ),
      },
    },
  };
}

// --- Page Component ---
export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);

  if (!post) {
    notFound();
  }

  const tBlog = await getTranslations({ locale, namespace: 'blog' });

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-white">
        <article className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-2">{post.title}</h1>
          <div className="flex items-center text-gray-500 mb-8">
            <span className="font-medium text-brand-orange">{post.category}</span>
            <span className="mx-2">•</span>
            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          </div>

          <div className="relative w-full h-auto mb-8">
            <Image
              src={post.image_url}
              alt={post.title}
              width={1200}
              height={630}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
              priority
            />
          </div>

          <div
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Link href="/blog" className="inline-block mt-12 bg-brand-orange text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity duration-300">
            {tBlog('backToHome')}
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}