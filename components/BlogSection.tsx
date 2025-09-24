// components/BlogSection.tsx
'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation'; // Use the next-intl Link

const BlogCard = ({ slug, title, excerpt, readMoreText }: { slug: string; title: string; excerpt: string; readMoreText: string; }) => (
  <div 
    data-aos="fade-up" 
    className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col p-6 border border-gray-100 h-full transition-transform transform hover:-translate-y-2"
  >
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow">{excerpt}</p>
    <Link 
      href={`/blog/${slug}`} 
      className="inline-block bg-brand-orange text-white font-semibold px-6 py-2 rounded-full hover:bg-opacity-90 transition-opacity duration-300 self-start"
    >
      {readMoreText}
    </Link>
  </div>
);

const BlogSection: React.FC = () => {
  const t = useTranslations('blog');
  
  // Define the slugs for your blog posts
  const slugs = [
    'choose-best-charcoal-for-shisha',
    'benefits-of-coconut-charcoal-for-bbq',
    'sustainable-production-process'
  ];

  const posts = slugs.map(slug => ({
    slug: slug,
    title: t(`${slug}.title`),
    excerpt: t(`${slug}.excerpt`),
  }));

  return (
    <section id="blog" className="bg-gray-50 py-24 sm:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-brand-orange sm:text-4xl lg:text-5xl mb-12">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post) => (
            <BlogCard 
              key={post.slug} 
              {...post} 
              readMoreText={t('readMore')} // Pass the translated text
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;