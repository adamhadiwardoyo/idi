'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation'; // Use the locale-aware router

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // We use router.replace so the user can't click "back" to the broken link.
    // The router is locale-aware, so it will redirect to the correct homepage.
    router.replace('/');
  }, [router]);

  // You can render a simple loading/redirecting message
  // while the browser is processing the redirect.
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#18181b', // A dark background matching your site
      color: 'white'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ color: '#a1a1aa' }}>Redirecting you to our homepage...</p>
    </div>
  );
}