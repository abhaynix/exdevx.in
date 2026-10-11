import React from 'react';
import { siteData } from '../data/site';

export const ServiceList: React.FC = () => {
  return (
    <div className="w-full">
      {/* Section Label */}
      <h2
        id="services-heading"
        className="text-[12px] font-sans font-medium uppercase tracking-[0.08em] text-[var(--muted)] mb-8 sm:mb-12 m-0"
      >
        Services
      </h2>

      {/* Plain 4-row list with 1px dividers */}
      <div className="border-t border-[var(--line)]">
        {siteData.services.map((service) => (
          <div
            key={service.number}
            className="py-8 sm:py-12 border-b border-[var(--line)] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
          >
            {/* Number */}
            <div className="md:col-span-2 text-[12px] font-sans font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
              {service.number}
            </div>

            {/* Service Name */}
            <div className="md:col-span-4 font-serif text-xl sm:text-2xl font-medium text-[var(--text)]">
              {service.name}
            </div>

            {/* One Sentence Description */}
            <div className="md:col-span-6 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--muted)]">
              {service.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
