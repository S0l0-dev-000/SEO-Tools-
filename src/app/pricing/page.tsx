import { db } from '@/lib/db';
import { PricingCard } from '@/components/PricingCard';
import { Navigation } from '@/components/Navigation';

export default async function PricingPage() {
  const tools = await db.tool.findMany({
    where: { isActive: true },
    orderBy: [
      { category: 'asc' },
      { price: 'asc' },
    ],
  });

  const individualTools = tools.filter(tool => tool.category === 'individual');
  const packages = tools.filter(tool => tool.category === 'package');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="pricing" />
      
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              💰 Transparent Pricing
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">
            Choose Your SEO Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional SEO tools to boost your website's search engine ranking. 
            Choose individual tools or save with our packages.
          </p>
        </div>

        {/* Package Deals */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Package Deals
            </h2>
            <p className="text-lg text-gray-600">
              Save up to 60% with our comprehensive packages
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((tool) => (
              <PricingCard key={tool.id} tool={tool} isPackage={true} />
            ))}
          </div>
        </div>

        {/* Individual Tools */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Individual Tools
            </h2>
            <p className="text-lg text-gray-600">
              Choose specific tools that match your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {individualTools.map((tool) => (
              <PricingCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What happens after I purchase a tool?
              </h3>
              <p className="text-gray-600">
                After completing your purchase, you'll get instant access to your purchased tools 
                in your dashboard. You can start using them immediately with no restrictions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Are there any usage limits?
              </h3>
              <p className="text-gray-600">
                No, once you purchase a tool, you have unlimited access to use it as much as you need. 
                There are no monthly limits or restrictions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I upgrade from individual tools to packages?
              </h3>
              <p className="text-gray-600">
                Yes, contact our support team and we'll apply the credit from your individual 
                tool purchases toward a package upgrade.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee if you're not satisfied with your purchase. 
                Contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 