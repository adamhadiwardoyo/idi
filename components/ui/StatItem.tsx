import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="text-center">
      {/* Font untuk angka dibuat sangat responsif */}
      <h3 className="
        font-bold leading-tight
        text-2xl 
        sm:text-3xl 
        lg:text-5xl
      ">
        {value}
      </h3>
      {/* Font untuk label juga responsif */}
      <p className="
        opacity-90 
        text-sm 
        sm:text-base 
        lg:text-lg
      ">
        {label}
      </p>
    </div>
  );
};

export default StatItem;