import { business } from '../data/business.js';

const abs = (path) =>
  path?.startsWith('http') ? path : `${business.url}${path || ''}`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    name: business.name,
    legalName: business.legalName,
    slogan: business.slogan,
    description: business.description,
    url: business.url,
    logo: abs(business.logo),
    image: abs(business.ogImage),
    telephone: business.phoneHref.replace('tel:', ''),
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    areaServed: business.areaServed.map((name) => ({ '@type': 'City', name })),
    ...(business.social.length
      ? { sameAs: business.social.map((s) => s.url) }
      : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: business.name,
    url: business.url,
    publisher: { '@type': 'Organization', name: business.name },
  };
}

// crumbs: [{ name, path }]
export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.shortTitle,
    name: service.shortTitle,
    description: service.metaDescription || service.blurb,
    provider: { '@type': 'LocalBusiness', name: business.name, url: business.url },
    areaServed: business.areaServed.map((name) => ({ '@type': 'City', name })),
    url: `${business.url}${service.href}`,
  };
}

export function blogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: abs(`/images/${post.image}`),
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: { '@type': 'Organization', name: post.author || business.name },
    publisher: {
      '@type': 'Organization',
      name: business.name,
      logo: { '@type': 'ImageObject', url: abs(business.logo) },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${business.url}/blog/${post.slug}`,
    },
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
