import React from 'react';
import { siteData } from '../data/site';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 sm:py-16 border-t border-[var(--line)] text-[13px] font-sans text-[var(--muted)]">
      <div>
        {siteData.footer.copyright} · {siteData.footer.founder}
      </div>
    </footer>
  );
};

export default Footer;
