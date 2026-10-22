import { Link, useLocation } from 'react-router-dom';
import { Navbar as ChaiNavbar } from '../../../components/navbar';
import { Button } from './Button';
import { siteConfig } from '../../data/site';

export function Navbar() {
  const location = useLocation();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--background)] focus:px-4 focus:py-2 focus:font-semibold focus-ring"
      >
        Skip to main content
      </a>
      <ChaiNavbar
        layout="inline"
        className="site-navbar home-navbar"
        logo={
          <Link to="/" className="site-navbar-brand font-onest text-xl font-semibold tracking-tight" aria-label="ExDevX home">
            ExDev<span className="site-navbar-mark">X</span>
          </Link>
        }
        groups={siteConfig.navItems.map((item) => ({
          label: item.label,
          href: item.href,
          active: location.pathname === item.href
            || (item.href !== '/' && location.pathname.startsWith(`${item.href}/`)),
        }))}
        actions={
          <div className="hidden md:block">
            <Button to="/contact" size="sm" variant="primary" className="site-navbar-cta">
              Let’s talk
            </Button>
          </div>
        }
      />
    </>
  );
}
