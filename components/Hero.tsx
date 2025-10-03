// components/Hero.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios'; // Import axios
import StatsBar from './StatsBar';
import { useTranslations } from 'next-intl';
import { DocumentArrowDownIcon, PhoneIcon, DocumentTextIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { API_BASE_URL } from '@/lib/api'; // Import your reusable API base URL

// 1. Define an interface for the settings data
interface Settings {
  company_profile_url: string;
  catalog_url: string;
}

const Hero: React.FC = () => {
  const t = useTranslations('hero');
  const [showOptions, setShowOptions] = useState(false);
  // 2. Add state to store the fetched settings
  const [settings, setSettings] = useState<Settings | null>(null);

  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // 3. Fetch settings data when the component mounts
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/settings`);
        setSettings(response.data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const handleOutsideClick = () => {
      setShowOptions(false);
    };

    if (showOptions) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showOptions]);

  return (
    <div className="relative h-[90vh] w-full">
      <Image
        src="/charcoal-bg.webp"
        alt="Hot charcoal briquettes"
        fill
        priority
        style={{
          objectFit: 'cover',
          zIndex: -1,
        }}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-7xl">
            Indo Charcoal
          </h1>
          <h2 className="text-4xl font-extrabold text-brand-orange sm:text-5xl md:text-7xl">
            Supply
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-white/80">
            {t('paragraph')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative inline-block text-left" onClick={handleMenuClick}>
              <button
                type="button"
                className="bg-brand-orange text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
                onClick={() => setShowOptions(!showOptions)}
                aria-expanded={showOptions}
                aria-haspopup="true"
              >
                <DocumentArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                {t('download-options')}
              </button>

              {showOptions && (
                <div
                  className="origin-bottom-center absolute bottom-full left-1/2 mb-2 w-60 -translate-x-1/2 rounded-lg shadow-xl bg-black/80 ring-1 ring-white/20 focus:outline-none z-10 animate-fade-in"
                  role="menu"
                  aria-orientation="vertical"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    {/* 4. Use the dynamic URLs from state */}
                    <a
                      href={settings?.company_profile_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white flex items-center px-4 py-2 text-sm hover:bg-white/10 transition-colors duration-200"
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <DocumentTextIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                      {t('company-profile')}
                    </a>
                    <a
                      href={settings?.catalog_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white flex items-center px-4 py-2 text-sm hover:bg-white/10 transition-colors duration-200"
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <BookOpenIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                      {t('catalog')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#contact"
              className="border border-white/50 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <PhoneIcon className="h-5 w-5" aria-hidden="true" />
              {t('contact')}
            </a>
          </div>
        </div>
      </div>
      <StatsBar />
    </div>
  );
};

export default Hero;