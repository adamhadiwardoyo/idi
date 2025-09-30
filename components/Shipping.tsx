"use client";

import React, { ReactNode, ReactElement } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

/* --- Types --- */
interface InfoCardProps {
  icon: ReactElement;
  title: string;
  children: ReactNode;
}

// The 'ShippingContainerImageProps' interface was removed as it was unused.

/* --- Reusable Components --- */
const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children }) => (
  <div
    data-aos="fade-up"
    data-aos-once="true"
    className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-shrink-0 grid h-12 w-12 place-content-center rounded-full bg-brand-orange/10 text-brand-orange">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
        {title}
      </h3>
    </div>
    <div className="text-gray-600 space-y-4 leading-relaxed">{children}</div>
  </div>
);

/* --- Icons --- */
const IconShipping = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 3C1.34315 3 0 4.34315 0 6V15C0 16.3121 0.842366 17.4275 2.01581 17.8348C2.18436 19.6108 3.67994 21 5.5 21C7.26324 21 8.72194 19.6961 8.96456 18H15.0354C15.2781 19.6961 16.7368 21 18.5 21C20.3201 21 21.8156 19.6108 21.9842 17.8348C23.1576 17.4275 24 16.3121 24 15V10.7515C24 10.0248 23.7362 9.32283 23.2577 8.77596L20.8502 6.02449C20.2805 5.37344 19.4576 5 18.5925 5H16.8293C16.4175 3.83481 15.3062 3 14 3H3ZM4 17.4361V17.5639C4.03348 18.3634 4.69224 19.0013 5.5 19.0013C6.30776 19.0013 6.96652 18.3634 7 17.5639V17.4361C6.96652 16.6366 6.30776 15.9987 5.5 15.9987C4.69224 15.9987 4.03348 16.6366 4 17.4361ZM5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H15.3368C15.8985 14.8175 17.1038 14 18.5 14C19.8245 14 20.9771 14.7357 21.5716 15.8207C21.8306 15.64 22 15.3398 22 15V11H17C15.8954 11 15 10.1046 15 9V6C15 5.44772 14.5523 5 14 5H3C2.44772 5 2 5.44772 2 6V15C2 15.3398 2.16945 15.64 2.42845 15.8207C3.02292 14.7357 4.17555 14 5.5 14ZM17 7V8C17 8.55229 17.4477 9 18 9H20.7962L19.345 7.34149C19.1552 7.12448 18.8808 7 18.5925 7H17ZM17 17.4361V17.5639C17.0335 18.3634 17.6922 19.0013 18.5 19.0013C19.3078 19.0013 19.9665 18.3634 20 17.5639V17.4361C19.9665 16.6366 19.3078 15.9987 18.5 15.9987C17.6922 15.9987 17.0335 16.6366 17 17.4361Z"
    />
  </svg>
);

const IconGuide = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 1 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const ShippingContainerImage: React.FC<{ alt: string }> = ({ alt }) => (
  <div
    data-aos="fade-right"
    data-aos-once="true"
    className="w-full flex items-center justify-center"
  >
    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-3xl overflow-hidden">
      <Image
        src="/kontainer.png"
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
        priority
      />
    </div>
  </div>
);

/* --- Main Section --- */
const Shipping = () => {
  const t = useTranslations("shipping");

  return (
    <section id="shipping" className="bg-gray-50 py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ShippingContainerImage alt={t("containerAlt")} />
          <div className="flex flex-col gap-8">
            <InfoCard icon={<IconShipping />} title={t("aboutTitle")}>
              <p>{t("aboutParagraph1")}</p>
              <p>{t("aboutParagraph2")}</p>
            </InfoCard>
            <InfoCard icon={<IconGuide />} title={t("guideTitle")}>
              <p>{t("guideParagraph")}</p>
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;