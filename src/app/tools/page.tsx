import SEOAuditTool from '@/components/SEOAuditTool';
import KeywordResearchTool from '@/components/KeywordResearchTool';
import MetaTagsGenerator from '@/components/MetaTagsGenerator';
import PageSpeedAnalyzer from '@/components/PageSpeedAnalyzer';
import { Navigation } from '@/components/Navigation';
import Link from 'next/link';

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="tools" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Free SEO Tools Suite</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Complete collection of professional SEO tools including site audits, keyword research, meta tags generation, and page speed analysis
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

            {/* Meta Tags Generator */}
            <div id="meta-tags-generator">
              <MetaTagsGenerator />
            </div>

            {/* Page Speed Analyzer */}
            <div id="page-speed-analyzer">
              <PageSpeedAnalyzer />
            </div>

            {/* Coming Soon Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 opacity-75">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Schema Markup Generator</h3>
                <p className="text-gray-600 mb-4">Generate structured data markup for better SERP visibility</p>
                <div className="bg-gray-100 rounded-md p-4 text-center">
                  <p className="text-gray-500 text-sm">Coming Soon</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 opacity-75">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Robots.txt Generator</h3>
                <p className="text-gray-600 mb-4">Create optimized robots.txt files for search engine crawling</p>
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