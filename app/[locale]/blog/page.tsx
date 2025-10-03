import { getTranslations, getLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { API_BASE_URL } from '@/lib/api';
import { format } from 'date-fns';

// --- Interfaces ---
interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  date: string;
  category: string;
  language: string;
  is_active: boolean;
}

interface BlogCardProps extends Omit<Post, 'id' | 'language' | 'is_active'> {
  readMoreText: string;
}

// --- API Fetching Function with Debugging ---
async function getPosts(locale: string): Promise<Post[]> {
  console.log(`\n[getPosts] Fetching all posts for locale: "${locale}"`);
  try {
    // Disable cache to ensure we get fresh data every time during debugging
    const response = await fetch(`${API_BASE_URL}/posts`, { cache: 'no-store' });

    if (!response.ok) {
      console.error(`[getPosts] API fetch failed with status: ${response.status}`);
      return [];
    }

    const posts: Post[] = await response.json();
    console.log(`[getPosts] Successfully fetched ${posts.length} total posts.`);

    const filteredPosts = posts
      .filter(post => post.language === locale && post.is_active)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(`[getPosts] Found ${filteredPosts.length} active posts for locale "${locale}".`);
    return filteredPosts;

  } catch (error) {
    console.error("[getPosts] 💥 CRASH: An error occurred during fetch.", error);
    return [];
  }
}

// --- Components ---
const BlogCard = ({ slug, title, excerpt, image_url, date, category, readMoreText }: BlogCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group h-full">
    <div className="relative w-full h-48 overflow-hidden">
      <Image
        src={image_url}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="mb-2">
        <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">{category}</span>
        <span className="text-gray-500 text-sm mx-2">•</span>
        <span className="text-gray-500 text-sm">{format(new Date(date), 'MMMM d, yyyy')}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow group-hover:text-brand-orange transition-colors">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>
      <p className="text-gray-600 mb-6">{excerpt}</p>
      <div className="mt-auto">
        <Link href={`/blog/${slug}`} className="font-semibold text-brand-orange uppercase text-sm tracking-wider hover:underline">
          {readMoreText} &rarr;
        </Link>
      </div>
    </div>
  </div>
);

// --- Metadata Generation ---
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'blog' });
  const baseUrl = 'https://www.indocharcoalsupply.com';
  const pageUrl = `${baseUrl}/${locale}/blog`;

  return {
    title: t('title'),
    description: 'Explore our latest articles, insights, and guides on the charcoal industry.',
    alternates: {
      canonical: pageUrl,
      languages: {
        'x-default': `${baseUrl}/en/blog`,
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}/blog`])
        ),
      },
    },
  };
}

// --- Page Component ---
export default async function BlogIndexPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = await getPosts(locale);

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-brand-orange sm:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our latest articles, insights, and guides on the charcoal industry.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  image_url={post.image_url}
                  date={post.date}
                  category={post.category}
                  readMoreText={t('readMore')}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No articles found for this language yet. Please check back later.</p>
            </div>
          )}

          <div className="text-center mt-20">
            <Link
              href="/"
              className="inline-block bg-brand-orange text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}