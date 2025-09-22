"use client";

import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// Import 'dynamic' from Next.js
import dynamic from 'next/dynamic';

// Dynamically import components that are below the fold
const VisionMission = dynamic(() => import('@/components/VisionMission'));

const OurValues = dynamic(() => import('@/components/OurValues'));
const Products = dynamic(() => import('@/components/Product'));
const ProductionProcess = dynamic(() => import('@/components/ProdProcess'));
const Packaging = dynamic(() => import('@/components/Packaging'));
const Shipping = dynamic(() => import('@/components/Shipping'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const GallerySlider = dynamic(() => import('@/components/GallerySlider'));
const OurTeam = dynamic(() => import('@/components/OurTeam'));
const Footer = dynamic(() => import('@/components/Footer'));
const LocationMap = dynamic(() => import('@/components/LocationMap'));

export default function HomePage() {
  // Inisialisasi AOS saat komponen dimuat di sisi klien
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      offset: 100, // Mulai animasi 100px sebelum elemen terlihat
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
      <OurTeam />
      <LocationMap />
      <Footer />

    </main>
  );
}