// components/ui/Logo.tsx
import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => (
  <div className="flex items-center">
    <div className="relative h-14 w-64">
      <Image
        src="/logo.webp"
        alt="Indo Charcoal Supply"
        fill
        sizes="16rem" // w-64 = 16rem = 256px
        priority
        style={{ objectFit: 'contain' }}
      />
    </div>
  </div>
);

export default Logo;
