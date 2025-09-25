// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// ✅ UPDATED CSP: Ditambahkan 'images.unsplash.com' untuk mengizinkan gambar dari Unsplash
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.googleapis.com *.gstatic.com; style-src 'self' 'unsafe-inline' *.google.com *.googleapis.com; img-src 'self' data: https://cdn.jsdelivr.net *.google.com *.gstatic.com images.unsplash.com; font-src 'self' data: *.gstatic.com; connect-src 'self' *.google.com *.googleapis.com;"
  }
];

const nextConfig: NextConfig = {
  // ✅ DITAMBAHKAN: Konfigurasi Next.js Image untuk domain eksternal
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);