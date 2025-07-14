import Script from 'next/script';

interface StructuredDataProps {
  type: 'website' | 'software' | 'article' | 'organization';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    const baseUrl = 'https://seo-tools-portfolio.vercel.app';
    
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'SEO Tools Pro',
          url: baseUrl,
          description: 'Professional SEO tools and services to increase your business online visibility. Free SEO audit, keyword research, and comprehensive SEO solutions.',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/tools?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
          publisher: {
            '@type': 'Organization',
            name: 'SEO Tools Pro',
            url: baseUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`,
              width: 512,
              height: 512,
            },
          },
        };
      
      case 'software':
        return {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'SEO Tools Pro',
          description: 'Professional SEO tools suite including audit, keyword research, meta tags generator, and page speed analyzer.',
          url: baseUrl,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '29.99',
            priceCurrency: 'USD',
            category: 'SEO Tools',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '2500',
            bestRating: '5',
            worstRating: '1',
          },
          author: {
            '@type': 'Organization',
            name: 'SEO Tools Pro',
          },
        };
      
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SEO Tools Pro',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'Professional SEO tools and services to help businesses improve their search engine rankings and online visibility.',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'support@seotoolspro.com',
            availableLanguage: 'English',
          },
          sameAs: [
            'https://twitter.com/seotoolspro',
            'https://linkedin.com/company/seotoolspro',
            'https://facebook.com/seotoolspro',
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'US',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            postalCode: '94105',
          },
        };
      
      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.title || 'SEO Tools and Services',
          description: data?.description || 'Professional SEO tools to boost your business online visibility',
          image: data?.image || `${baseUrl}/og-image.jpg`,
          author: {
            '@type': 'Organization',
            name: 'SEO Tools Pro',
          },
          publisher: {
            '@type': 'Organization',
            name: 'SEO Tools Pro',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`,
            },
          },
          datePublished: data?.datePublished || new Date().toISOString(),
          dateModified: data?.dateModified || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data?.url || baseUrl,
          },
        };
      
      default:
        return null;
    }
  };

  const structuredData = generateStructuredData();
  
  if (!structuredData) return null;

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

// Specific structured data components for different pages
export function WebsiteStructuredData() {
  return <StructuredData type="website" />;
}

export function SoftwareStructuredData() {
  return <StructuredData type="software" />;
}

export function OrganizationStructuredData() {
  return <StructuredData type="organization" />;
}

export function ArticleStructuredData(data: {
  title: string;
  description: string;
  image?: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return <StructuredData type="article" data={data} />;
}

// Combined structured data for homepage
export function HomepageStructuredData() {
  return (
    <>
      <WebsiteStructuredData />
      <SoftwareStructuredData />
      <OrganizationStructuredData />
    </>
  );
} 