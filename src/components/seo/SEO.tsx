import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export default function SEO({ title, description, canonicalUrl, ogImage }: SEOProps) {
  const siteName = "SilverCare India";
  const fullTitle = title.includes("SilverCare") ? title : `${title} | ${siteName}`;
  const defaultImage = "https://silvercareindia.com/wp-content/uploads/2025/12/Doc-treat-1.png";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare India",
    "url": "https://silvercareindia.com/",
    "logo": "https://silvercareindia.com/wp-content/uploads/2025/12/logo.png",
    "description": description,
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Flat No-60, SF Sector-33",
      "addressLocality": "Gurgaon",
      "addressRegion": "Haryana",
      "postalCode": "122001",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 00:00-24:00"
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
