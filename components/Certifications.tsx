// components/Certifications.tsx
"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Certifications = () => {
  const t = useTranslations('certifications');

  return (
    <section id="certifications" className="bg-gray-50 pt-12 sm:pt-16 pb-24 sm:pb-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-md text-gray-600">
            {t('description')}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
            <Image
              src="/blurROA.webp"
              alt="Reach of Charcoal Analysis"
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;