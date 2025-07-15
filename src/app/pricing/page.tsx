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

        {/* Enhanced FAQ Section */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our SEO tools and services. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What happens after I purchase a tool?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  After completing your purchase, you'll get instant access to your purchased tools 
                  in your dashboard. You can start using them immediately with no restrictions or 
                  setup required.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Are there any usage limits or monthly caps?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  No, once you purchase a tool, you have unlimited access to use it as much as you need. 
                  There are no monthly limits, daily restrictions, or hidden usage fees. Use our tools 
                  for as many websites as you want.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I upgrade from individual tools to packages?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Absolutely! Contact our support team and we'll apply the full credit from your 
                  individual tool purchases toward any package upgrade. You'll only pay the difference 
                  and get immediate access to all package tools.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Do you offer refunds or guarantees?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes! We offer a 30-day money-back guarantee if you're not satisfied with your purchase. 
                  No questions asked. Contact our support team for a full refund within 30 days of purchase.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Are the tools suitable for beginners?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Definitely! Our tools are designed to be user-friendly for beginners while still 
                  providing advanced features for SEO professionals. Each tool includes helpful 
                  tooltips, explanations, and actionable recommendations.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How accurate are the SEO audit results?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our SEO audit tool uses industry-standard algorithms and real-time data to provide 
                  highly accurate results. We regularly update our analysis criteria to match the 
                  latest Google ranking factors and SEO best practices.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Do I need technical knowledge to use these tools?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Not at all! Our tools are designed for everyone from complete beginners to SEO experts. 
                  Each tool provides clear, actionable recommendations in plain English. No coding or 
                  technical expertise required.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I use these tools for client websites?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes! Our tools are perfect for agencies and freelancers. You can analyze unlimited 
                  client websites, generate professional reports, and even white-label the results 
                  for your clients (with Pro packages).
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How often is the keyword data updated?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our keyword research tool pulls from live databases that are updated daily. 
                  Search volume, competition, and trend data are refreshed continuously to 
                  ensure you're getting the most current information available.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What kind of support do you provide?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer comprehensive support including email assistance, detailed documentation, 
                  video tutorials, and live chat during business hours. Our average response time 
                  is under 2 hours for all support requests.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our friendly support team is here to help. Get in touch and we'll respond within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@seotools.pro" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <a 
                href="#" 
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
