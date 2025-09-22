import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => (
  <a href="#" className="flex items-center">
    {/* This container div sets the size for your logo. Adjust the width and height as needed. */}
    <div className="relative h-14 w-64"> {/* Increased size from h-12 w-56 */}
      <Image
        src="/logo.webp" // The path to your logo image which includes the text
        alt="Indo Charcoal Supply" // Updated alt text for the full logo
        fill
        style={{ objectFit: 'contain' }} // Ensures the logo scales correctly within the container
        priority
      />
    </div>
  </a>
);

export default Logo;