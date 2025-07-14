import { notFound } from 'next/navigation';
import { ToolAccessWrapper } from '@/components/ToolAccessWrapper';
import SEOAuditTool from '@/components/SEOAuditTool';
import KeywordResearchTool from '@/components/KeywordResearchTool';
import MetaTagsGenerator from '@/components/MetaTagsGenerator';
import PageSpeedAnalyzer from '@/components/PageSpeedAnalyzer';
import { db } from '@/lib/db';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const resolvedParams = await params;
  const tool = await db.tool.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!tool) {
    notFound();
  }

  const renderTool = () => {
    switch (resolvedParams.slug) {
      case 'seo-audit':
        return <SEOAuditTool />;
      case 'keyword-research':
        return <KeywordResearchTool />;
      case 'meta-tags-generator':
        return <MetaTagsGenerator />;
      case 'page-speed-analyzer':
        return <PageSpeedAnalyzer />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tool Coming Soon
            </h2>
            <p className="text-gray-600">
              This tool is currently under development and will be available soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">SEO Tools Pro</h1>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="/tools" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Tools</a>
                <a href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Sign In</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Tool Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
          <p className="text-gray-600">{tool.description}</p>
        </div>

        <ToolAccessWrapper toolSlug={resolvedParams.slug} toolName={tool.name}>
          {renderTool()}
        </ToolAccessWrapper>
      </div>
    </div>
  );
} 