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
        'https://github.com/abhaynix',
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
      'https://github.com/abhaynix',
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

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function getCaseStudySchema(project: {
  title: string;
  subtitle: string;
  summary: string;
  slug: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${project.title} | Case Study`,
    headline: project.subtitle,
    description: project.summary,
    url: `https://exdevx.in/work/${project.slug}`,
    genre: project.category,
    author: {
      '@type': 'Organization',
      name: 'ExDevX',
      url: 'https://exdevx.in'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ExDevX',
      url: 'https://exdevx.in'
    }
  };
}

export function getServicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Web, Mobile & AI Engineering Services',
    serviceType: 'Software Development',
    provider: {
      '@type': 'Organization',
      name: 'ExDevX',
      url: 'https://exdevx.in'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'India'
    },
    description: 'Custom web platforms, mobile applications, automation workflows, and AI integrations.'
  };
}
