// components/SchemaMarkup.tsx
import React from 'react';

const SchemaMarkup = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Indo Charcoal Supply",
    "url": "https://www.indocharcoalsupply.com",
    "logo": "https://www.indocharcoalsupply.com/logo.webp",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-896-8719-9099",
      "contactType": "Sales",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Indonesian"]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61570964318471",
      "https://www.instagram.com/indocharcoalsupply",
      "https://www.linkedin.com/in/adam-billah-144b78342/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;