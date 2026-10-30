import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { business } from '../data/business.js';

/**
 * Per-page SEO: title, description, canonical, Open Graph, Twitter cards,
 * keywords, and optional JSON-LD structured data.
 */
export default function Seo({
  title,
  description = business.shortDescription,
  keywords,
  image = business.ogImage,
  type = 'website',
  jsonLd,
  noindex = false,
}) {
  const { pathname } = useLocation();
  const canonical = `${business.url}${pathname === '/' ? '' : pathname}`;
  const fullTitle = title
    ? `${title} | ${business.name}`
    : `Home Care in Austin & San Antonio, TX | ${business.name}`;
  const absoluteImage = image?.startsWith('http')
    ? image
    : `${business.url}${image}`;

  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
