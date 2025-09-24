// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// ✅ UPDATED CSP: Added 'https://cdn.jsdelivr.net' for flag icons and 'data:' for swiper fonts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.googleapis.com *.gstatic.com; style-src 'self' 'unsafe-inline' *.google.com *.googleapis.com; img-src 'self' data: https://cdn.jsdelivr.net *.google.com *.gstatic.com; font-src 'self' data: *.gstatic.com; connect-src 'self' *.google.com *.googleapis.com;"
  }
];

const nextConfig: NextConfig = {
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