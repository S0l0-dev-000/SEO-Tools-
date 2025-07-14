import SEOAuditTool from '@/components/SEOAuditTool';
import KeywordResearchTool from '@/components/KeywordResearchTool';
import Link from 'next/link';

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">SEO Tools Pro</h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link href="/#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                <Link href="/tools" className="text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Tools</Link>
                <Link href="/#contact" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Free SEO Tools</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Professional SEO analysis tools to help you understand and improve your website's search performance
          </p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* SEO Audit Tool */}
            <div id="seo-audit">
              <SEOAuditTool />
            </div>

            {/* Keyword Research Tool */}
            <div id="keyword-research">
              <KeywordResearchTool />
            </div>

            {/* Coming Soon Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 opacity-75">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Rank Tracker</h3>
                <p className="text-gray-600 mb-4">Monitor your keyword rankings across search engines</p>
                <div className="bg-gray-100 rounded-md p-4 text-center">
                  <p className="text-gray-500 text-sm">Coming Soon</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 opacity-75">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Backlink Analyzer</h3>
                <p className="text-gray-600 mb-4">Analyze your backlink profile and competitor links</p>
                <div className="bg-gray-100 rounded-md p-4 text-center">
                  <p className="text-gray-500 text-sm">Coming Soon</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 opacity-75">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Optimizer</h3>
                <p className="text-gray-600 mb-4">Optimize your content for target keywords</p>
                <div className="bg-gray-100 rounded-md p-4 text-center">
                  <p className="text-gray-500 text-sm">Coming Soon</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 rounded-lg text-white p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Want More Advanced Features?</h2>
              <p className="text-blue-100 mb-6">
                Our professional SEO services include comprehensive analysis, custom reporting, and ongoing optimization
              </p>
              <Link
                href="/#contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
              >
                Get Professional SEO Analysis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 SEO Tools Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 