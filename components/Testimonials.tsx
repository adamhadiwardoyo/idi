'use client';

import React from 'react';
import { useData } from './context/DataContext'; // Import the custom hook
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  is_active: number;
}

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);


const TestimonialCard: React.FC<Omit<Testimonial, 'id' | 'is_active'>> = ({ quote, author, location }) => (
  <div className="bg-white/90 p-8 rounded-lg shadow-md flex flex-col h-full text-left border border-gray-200">
    <div className="flex mb-4">
      {[...Array(5)].map((_, index) => (
        <StarIcon key={index} />
      ))}
    </div>
    <p className="text-gray-600 mb-6 flex-grow">&ldquo;{quote}&rdquo;</p>
    <div>
      <p className="font-bold text-gray-900">{author}</p>
      <p className="text-sm text-gray-500">{location}</p>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const t = useTranslations('testimonialsSection');
  // Use the useData hook to get data from the global context
  const { testimonials, isLoading } = useData();

  return (
    <section
      id={t('sectionId')}
      className="relative bg-cover bg-center bg-no-repeat py-24 sm:py-32"
      style={{ backgroundImage: "url('/prod-cover.webp')" }}
    >
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative container mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-12">
          {t('title')}
        </h2>

        {/* Conditional rendering based on loading and data availability */}
        {isLoading ? (
          <p className="text-gray-700">Loading testimonials...</p>
        ) : testimonials.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 40 },
              1024: { slidesPerView: 3, spaceBetween: 50 },
            }}
          >
            {testimonials.map(({ id, quote, author, location }) => (
              <SwiperSlide key={id}>
                <TestimonialCard
                  quote={quote}
                  author={author}
                  location={location}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-700">No testimonials to display.</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;