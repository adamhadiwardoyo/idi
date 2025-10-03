'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/api';

// Define types for the data you are fetching
interface Settings {
  company_profile_url: string;
  catalog_url: string;
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  is_active: number;
}

interface GalleryImage {
  id: number;
  url: string;
}

// Define the shape of your context data
interface DataContextProps {
  settings: Settings | null;
  testimonials: Testimonial[];
  gallery: GalleryImage[];
  isLoading: boolean;
}

// Create the context with a default value
const DataContext = createContext<DataContextProps | undefined>(undefined);

// Create the provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only once when the app loads
    const fetchAllData = async () => {
      try {
        // Fetch all data in parallel for performance
        const [settingsRes, testimonialsRes, galleryRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/settings`),
          axios.get(`${API_BASE_URL}/testimonials`),
          axios.get(`${API_BASE_URL}/gallery`)
        ]);

        setSettings(settingsRes.data);
        setTestimonials(testimonialsRes.data.filter((t: Testimonial) => t.is_active === 1));
        setGallery(galleryRes.data);

      } catch (error) {
        console.error("Failed to fetch global data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []); // Empty dependency array ensures this runs only once

  const value = { settings, testimonials, gallery, isLoading };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};