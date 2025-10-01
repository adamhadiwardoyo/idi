"use client";

import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

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
const VideoSection = dynamic(() => import('@/components/VideoSection'));

export default function HomePage() {
  // Initialize AOS when the component mounts on the client side
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      offset: 100, // Start animation 100px before the element is visible
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
        title="Our Production in Action" // Ganti dengan t('videoSection.title') jika sudah diterjemahkan
        subtitle="See how we turn high-quality coconut shells into premium charcoal briquettes, ready for global export." // Ganti dengan t('videoSection.subtitle')
        thumbnailSrc="/thumbnail.webp" 
        youtubeId="meBd1GHC2yg" // <-- Ganti dengan ID video YouTube Anda
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