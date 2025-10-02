"use client";

import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useTranslations } from 'next-intl';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from 'next/dynamic';

// Dynamically import components, disabling SSR for those with carousels
const VisionMission = dynamic(() => import('@/components/VisionMission'));
const OurValues = dynamic(() => import('@/components/OurValues'));
const Products = dynamic(() => import('@/components/Product'), { ssr: false });
const ProductionProcess = dynamic(() => import('@/components/ProdProcess'));
const Packaging = dynamic(() => import('@/components/Packaging'));
const Shipping = dynamic(() => import('@/components/Shipping'));
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const GallerySlider = dynamic(() => import('@/components/GallerySlider'), { ssr: false });
const OurTeam = dynamic(() => import('@/components/OurTeam'));
const Footer = dynamic(() => import('@/components/Footer'));
const BlogSection = dynamic(() => import('@/components/BlogSection'));
const LocationMap = dynamic(() => import('@/components/LocationMap'));
const VideoSection = dynamic(() => import('@/components/VideoSection')); // <-- PERBAIKAN 1: Impor VideoSection

export default function HomePage() {
  const t = useTranslations('videoSection'); 
  
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <main>
      <Navbar />
      <div id="home">
        <Hero />
      </div>

      <div id="product-profile">
        <VisionMission />
      </div>
      <div id="our-values">
        <OurValues />
      </div>
      <div id="product">
        <Products />
      </div>
      <ProductionProcess />
      <Packaging />
      <Shipping />
      <Testimonials />
      <GallerySlider />
      <VideoSection 
        title={t('title')} // <-- PERBAIKAN 2: Gunakan fungsi t
        subtitle={t('subtitle')} // <-- PERBAIKAN 2: Gunakan fungsi t
        thumbnailSrc="/thumbnail.webp" 
        youtubeId="meBd1GHC2yg"
      />
      <OurTeam />
      <div id="blog">
        <BlogSection />
      </div>
      <LocationMap />
      <Footer />
    </main>
  );
}