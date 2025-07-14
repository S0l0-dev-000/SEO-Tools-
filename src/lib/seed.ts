import { db } from './db';

export async function seedDatabase() {
  try {
    // Clear existing data
    await db.tool.deleteMany();
    
    // Individual tools with reasonable pricing
    const individualTools = [
      {
        name: 'SEO Audit Tool',
        slug: 'seo-audit',
        description: 'Comprehensive SEO analysis of your website with actionable recommendations',
        price: 29.99,
        features: JSON.stringify([
          'Complete SEO scoring',
          'Meta tags analysis',
          'Page speed insights',
          'Mobile optimization check',
          'Keywords analysis',
          'Technical SEO issues',
          'Detailed recommendations'
        ]),
        category: 'individual'
      },
      {
        name: 'Keyword Research Tool',
        slug: 'keyword-research',
        description: 'Find profitable keywords and analyze competition for your niche',
        price: 39.99,
        features: JSON.stringify([
          'Search volume data',
          'Keyword difficulty scoring',
          'Related keywords suggestions',
          'Competitive analysis',
          'Long-tail keyword discovery',
          'SERP analysis',
          'Export functionality'
        ]),
        category: 'individual'
      },
      {
        name: 'Meta Tags Generator',
        slug: 'meta-tags-generator',
        description: 'Generate optimized meta tags for better search engine visibility',
        price: 19.99,
        features: JSON.stringify([
          'Title tag optimization',
          'Meta description generator',
          'Open Graph tags',
          'Twitter Card tags',
          'Schema markup',
          'Character count validation',
          'SEO best practices'
        ]),
        category: 'individual'
      },
      {
        name: 'Page Speed Analyzer',
        slug: 'page-speed-analyzer',
        description: 'Analyze and optimize your website loading speed for better SEO',
        price: 24.99,
        features: JSON.stringify([
          'Core Web Vitals analysis',
          'Mobile & desktop testing',
          'Performance scoring',
          'Optimization suggestions',
          'Resource analysis',
          'Load time breakdown',
          'Monitoring alerts'
        ]),
        category: 'individual'
      },
      {
        name: 'Schema Markup Generator',
        slug: 'schema-markup-generator',
        description: 'Create structured data markup for better search results',
        price: 34.99,
        features: JSON.stringify([
          'Multiple schema types',
          'JSON-LD format',
          'Validation testing',
          'Rich snippets preview',
          'Local business schema',
          'Product schema',
          'Article schema'
        ]),
        category: 'individual'
      },
      {
        name: 'Robots.txt Generator',
        slug: 'robots-txt-generator',
        description: 'Generate and validate robots.txt files for proper crawling',
        price: 14.99,
        features: JSON.stringify([
          'Custom robots.txt creation',
          'Syntax validation',
          'Crawl directive setup',
          'Sitemap integration',
          'User-agent specific rules',
          'Testing & validation',
          'Best practices guide'
        ]),
        category: 'individual'
      }
    ];

    // Package deals
    const packages = [
      {
        name: 'SEO Starter Pack',
        slug: 'seo-starter-pack',
        description: 'Essential tools for SEO beginners - Save 40%',
        price: 49.99,
        features: JSON.stringify([
          'SEO Audit Tool',
          'Meta Tags Generator',
          'Robots.txt Generator',
          'Email support',
          'Getting started guide',
          'Save $19.97 vs individual'
        ]),
        category: 'package'
      },
      {
        name: 'SEO Professional Suite',
        slug: 'seo-professional-suite',
        description: 'Complete SEO toolkit for professionals - Save 50%',
        price: 99.99,
        features: JSON.stringify([
          'All 6 SEO tools included',
          'Priority support',
          'Advanced features',
          'Custom reports',
          'API access',
          'Save $89.95 vs individual'
        ]),
        category: 'package'
      },
      {
        name: 'SEO Agency Plan',
        slug: 'seo-agency-plan',
        description: 'White-label solution for agencies - Save 60%',
        price: 199.99,
        features: JSON.stringify([
          'All tools with white-label',
          'Unlimited client accounts',
          'Custom branding',
          'Priority support',
          'Dedicated account manager',
          'Bulk processing',
          'API access & webhooks'
        ]),
        category: 'package'
      }
    ];

    // Create all tools
    const allTools = [...individualTools, ...packages];
    
    for (const tool of allTools) {
      await db.tool.create({
        data: tool
      });
    }

    console.log('Database seeded successfully!');
    console.log(`Created ${allTools.length} tools`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
} 