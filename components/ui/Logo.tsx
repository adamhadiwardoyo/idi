// components/ui/Logo.tsx
import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => (
  <a href="#" className="flex items-center">
    <div className="relative h-14 w-64">
      <Image
        src="/logo.webp"
        alt="Indo Charcoal Supply"
        fill
        sizes="16rem" // Corresponds to the w-64 class (16rem * 16px/rem = 256px)
        priority
        style={{ objectFit: 'contain' }}
      />
    </div>
  </a>
);

export default Logo;