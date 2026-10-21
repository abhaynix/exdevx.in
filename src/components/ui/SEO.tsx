import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schema?: object | object[];
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'ExDevX | Web, Mobile & AI Development',
  description = 'ExDevX builds web applications, mobile apps, automation systems and AI integrations.',
  canonical,
  ogType = 'website',
  ogImage = 'https://ik.imagekit.io/exdev/file.jpg',
  schema,
  noindex = false,
}) => {
  const fullTitle = title.includes('ExDevX') ? title : `${title} | ExDevX`;
  const { pathname } = useLocation();
  const canonicalUrl = canonical || `https://exdevx.in${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="ExDevX" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@exdevx" />

      {/* Structured Data (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
