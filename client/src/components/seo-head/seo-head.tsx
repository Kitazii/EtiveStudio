import { Helmet } from 'react-helmet-async';
import { getDomain } from "@/global-function/get-domain";

interface SEOHeadProps {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
    ogType?: string;
    jsonLd?: object;
}

export function SEOHead({ 
  title, 
  description, 
  canonical, 
  ogImage = "/attached_assets/ETIVE_STUDIO_WHITE_1751492571603.webp",
  ogType = "website",
  jsonLd 
}: SEOHeadProps) {
  const domain = getDomain(); //Get the current domain for absolute URLs
  const absoluteCanonical = canonical.startsWith('http') ? canonical : `${domain}${canonical}`;
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${domain}${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#111111" />
      <meta name="color-scheme" content="dark light" />
      <link rel="canonical" href={absoluteCanonical} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={absoluteCanonical} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Etive Studios" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
      
      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}