'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/api';
import { format } from 'date-fns';

// 1. Define the Post interface to match the API response
interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string; // Changed from 'image' to 'image_url'
  date: string;
  category: string;
  language: string;
  is_active: boolean;
}

// 2. Update BlogCardProps to use 'image_url'
interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  date: string;
  category: string;
  readMoreText: string;
}

const BlogCard = ({ slug, title, excerpt, image_url, date, category, readMoreText }: BlogCardProps) => (
  <div
    data-aos="fade-up"
    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group h-full"
  >
    <div className="relative w-full h-48 overflow-hidden">
      <Image
        src={image_url} // Use image_url
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
        {/* 3. Format the date for better readability */}
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

const BlogSection: React.FC = () => {
  const t = useTranslations('blog');
  const locale = useLocale(); // Get the current language
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Fetch posts from the API
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
        const allPosts = response.data;

        // Filter by current language, ensure they are active, and get the latest 3
        const latestPosts = allPosts
          .filter(post => post.language === locale && post.is_active)
          .slice(0, 3);

        setPosts(latestPosts);
      } catch (error) {
        console.error("Failed to fetch latest posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestPosts();
  }, [locale]); // Re-fetch if the language changes

  return (
    <section id="blog" className="bg-gray-50 py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-brand-orange sm:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
        </div>

        {/* 5. Conditionally render based on loading and posts state */}
        {isLoading ? (
          <p className="text-center text-gray-600">Loading latest articles...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post) => (
              <BlogCard
                key={post.id} // Use post.id for the key
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
        )}

        <div className="text-center mt-16">
          <Link href="/blog" className="inline-block bg-brand-orange text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
            {t('viewAllPosts')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;