export interface SchemaOrgOrganization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate: string;
  founder: {
    '@type': 'Person';
    name: string;
    sameAs: string[];
  };
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs: string[];
}

export function getOrganizationSchema(): SchemaOrgOrganization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ExDevX',
    url: 'https://exdevx.in',
    logo: 'https://ik.imagekit.io/exdev/file.jpg',
    description: 'ExDevX builds web applications, mobile apps, automation systems and AI integrations in Maharashtra, India.',
    foundingDate: '2022',
    founder: {
      '@type': 'Person',
      name: 'Abhay Jadhav',
      sameAs: [
        'https://github.com/AbhiDevepl',
        'https://www.linkedin.com/in/abhay-jadhav-56a623309/'
      ]
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'India'
    },
    sameAs: [
      'https://github.com/AbhiDevepl',
      'https://www.linkedin.com/in/abhay-jadhav-56a623309/',
      'https://www.instagram.com/dev.abhayyy/'
    ]
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://exdevx.in',
    name: 'ExDevX',
    description: 'Web, Mobile, Automation & AI Development',
    publisher: {
      '@type': 'Organization',
      name: 'ExDevX'
    }
  };
}
