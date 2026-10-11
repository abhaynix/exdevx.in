import React from 'react';
import { siteData } from '../data/site';

export const Contact: React.FC = () => {
  return (
    <div className="w-full">
      {/* Section Label */}
      <h2
        id="contact-heading"
        className="text-[12px] font-sans font-medium uppercase tracking-[0.08em] text-[var(--muted)] mb-8 sm:mb-12 m-0"
      >
        {siteData.contact.heading}
      </h2>

      {/* Contact Details */}
      <div className="border-t border-[var(--line)] pt-12 sm:pt-16 space-y-8 sm:space-y-10">
        <div>
          <span className="block text-[12px] font-sans font-medium uppercase tracking-[0.08em] text-[var(--muted)] mb-3">
            Direct Line
          </span>
          <a
            href={siteData.contact.emailMailto}
            className="font-serif font-medium text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-[var(--text)] hover:text-[var(--primary)] transition-colors underline underline-offset-8 decoration-1"
          >
            {siteData.contact.email}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--line)] text-[15px] sm:text-[17px] text-[var(--muted)]">
          <div>
            WhatsApp:{' '}
            <a
              href={siteData.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text)] hover:text-[var(--primary)] transition-colors font-medium underline underline-offset-4"
            >
              {siteData.contact.whatsappLabel}
            </a>
          </div>

          <div>
            Location: <span className="text-[var(--text)]">{siteData.contact.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;