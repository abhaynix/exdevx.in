import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schema?: object | object[];
}

export const SEO: React.FC<SEOProps> = ({
  title = 'ExDevX | High-Performance Web, Mobile & AI Agency',
  description = 'ExDevX is a Maharashtra-based engineering agency building high-performance web applications, cross-platform mobile apps, autonomous workflows, and AI integrations.',
  canonical,
  ogType = 'website',
  ogImage = 'https://ik.imagekit.io/exdev/file.jpg',
  schema,
}) => {
  const fullTitle = title.includes('ExDevX') ? title : `${title} | ExDevX`;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://exdevx.in');

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="ExDevX" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
