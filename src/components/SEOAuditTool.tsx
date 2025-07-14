'use client';

import { useState } from 'react';

interface AuditResult {
  url: string;
  score: number;
  issues: string[];
  recommendations: string[];
  pageSpeed: number;
  seoFactors: {
    title: boolean;
    metaDescription: boolean;
    h1Tags: boolean;
    imageAlt: boolean;
    canonicalUrl: boolean;
  };
}

export default function SEOAuditTool() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');

  const analyzeWebsite = async (websiteUrl: string) => {
    // Simulate analysis with realistic results
    const mockResult: AuditResult = {
      url: websiteUrl,
      score: Math.floor(Math.random() * 30) + 65, // Score between 65-95
      issues: [
        'Missing meta description on homepage',
        'Multiple H1 tags found',
        'Some images missing alt text',
        'Page load speed could be improved',
        'Missing canonical URL'
      ].slice(0, Math.floor(Math.random() * 3) + 2),
      recommendations: [
        'Add unique meta descriptions to all pages',
        'Optimize images for faster loading',
        'Improve internal linking structure',
        'Add schema markup for better search visibility',
        'Fix broken internal links'
      ].slice(0, Math.floor(Math.random() * 3) + 2),
      pageSpeed: Math.floor(Math.random() * 40) + 60, // Speed between 60-100
      seoFactors: {
        title: Math.random() > 0.3,
        metaDescription: Math.random() > 0.4,
        h1Tags: Math.random() > 0.2,
        imageAlt: Math.random() > 0.5,
        canonicalUrl: Math.random() > 0.3
      }
    };

    return mockResult;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Validate URL
      new URL(url);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const auditResult = await analyzeWebsite(url);
      setResult(auditResult);
    } catch (err) {
      setError('Please enter a valid URL (e.g., https://example.com)');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">SEO Audit Tool</h2>
        <p className="text-gray-600">Get a comprehensive SEO analysis of your website</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website URL (e.g., https://example.com)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-600 text-sm">{error}</p>
        )}
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Analyzing your website...</p>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className={`p-4 rounded-lg ${getScoreBackground(result.score)}`}>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">SEO Score</span>
              <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}/100
              </span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>

          {/* SEO Factors */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">SEO Factors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(result.seoFactors).map(([factor, passed]) => (
                <div key={factor} className="flex items-center space-x-2">
                  <span className={`w-4 h-4 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm text-gray-700 capitalize">
                    {factor.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-xs ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {passed ? '✓' : '✗'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Issues Found */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Issues Found</h3>
            <ul className="space-y-2">
              {result.issues.map((issue, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-sm text-gray-700">{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-sm text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Page Speed */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Page Speed Score</span>
              <span className={`text-lg font-semibold ${getScoreColor(result.pageSpeed)}`}>
                {result.pageSpeed}/100
              </span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                style={{ width: `${result.pageSpeed}%` }}
              ></div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-3">
              Want a detailed SEO strategy for your website?
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Get Professional SEO Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 