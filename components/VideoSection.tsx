'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PlayCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

// Definisikan tipe untuk props komponen
interface VideoSectionProps {
  thumbnailSrc: string;
  youtubeId?: string;       // Gunakan ini untuk video YouTube
  localVideoSrc?: string;   // Gunakan ini untuk video dari folder public
  title: string;
  subtitle: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ thumbnailSrc, youtubeId, localVideoSrc, title, subtitle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk membuka modal
  const openModal = () => setIsModalOpen(true);
  // Fungsi untuk menutup modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section id="video-section" className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto px-6 text-center">
          {/* Judul dan Subjudul Seksi */}
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {subtitle}
          </p>

          {/* Wrapper untuk Thumbnail dan Tombol Play */}
          <div
            onClick={openModal}
            className="relative mt-16 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
            data-aos="fade-up"
          >
            <div className="aspect-video">
              <Image
                src={thumbnailSrc}
                alt="Video Thumbnail"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
            {/* Tombol Play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircleIcon className="w-24 h-24 text-white/80 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* Modal untuk memutar video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={closeModal}>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-[120]"
            aria-label="Close video"
          >
            <XMarkIcon className="w-10 h-10" />
          </button>
          
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl" 
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat video di-klik
          >
            {youtubeId ? (
              // Player untuk YouTube
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            ) : localVideoSrc ? (
              // Player untuk video lokal
              <video
                width="100%"
                height="100%"
                controls
                autoPlay
                className="rounded-lg"
              >
                <source src={localVideoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoSection;