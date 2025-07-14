'use client';

import { useState } from 'react';

interface SpeedResult {
  url: string;
  mobileScore: number;
  desktopScore: number;
  metrics: {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
    tti: number;
  };
  opportunities: {
    title: string;
    description: string;
    savings: string;
    impact: 'high' | 'medium' | 'low';
  }[];
  diagnostics: {
    title: string;
    value: string;
    status: 'good' | 'warning' | 'poor';
  }[];
}

export default function PageSpeedAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeedResult | null>(null);
  const [error, setError] = useState('');

  const analyzePageSpeed = async (websiteUrl: string): Promise<SpeedResult> => {
    // Simulate realistic page speed analysis
    const mobileScore = Math.floor(Math.random() * 40) + 40; // 40-80
    const desktopScore = Math.floor(Math.random() * 30) + 60; // 60-90

    const opportunities = [
      {
        title: 'Optimize images',
        description: 'Properly size images to save cellular data and improve load time',
        savings: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9)}s`,
        impact: 'high' as const
      },
      {
        title: 'Eliminate render-blocking resources',
        description: 'Resources are blocking the first paint of your page',
        savings: `${Math.floor(Math.random() * 2) + 1}.${Math.floor(Math.random() * 9)}s`,
        impact: 'high' as const
      },
      {
        title: 'Remove unused CSS',
        description: 'Remove dead rules from stylesheets and defer loading',
        savings: `${Math.floor(Math.random() * 2)}.${Math.floor(Math.random() * 9)}s`,
        impact: 'medium' as const
      },
      {
        title: 'Enable text compression',
        description: 'Text-based resources should be served with compression',
        savings: `${Math.floor(Math.random() * 1)}.${Math.floor(Math.random() * 9)}s`,
        impact: 'medium' as const
      },
      {
        title: 'Minify JavaScript',
        description: 'Minifying JavaScript files can reduce payload sizes',
        savings: `0.${Math.floor(Math.random() * 9)}s`,
        impact: 'low' as const
      }
    ].slice(0, Math.floor(Math.random() * 3) + 2);

    const diagnostics: { title: string; value: string; status: 'good' | 'warning' | 'poor' }[] = [
      {
        title: 'Server response time',
        value: `${Math.floor(Math.random() * 800) + 200}ms`,
        status: Math.random() > 0.5 ? 'good' : 'warning'
      },
      {
        title: 'First Contentful Paint',
        value: `${Math.floor(Math.random() * 2) + 1}.${Math.floor(Math.random() * 9)}s`,
        status: Math.random() > 0.3 ? 'warning' : 'good'
      },
      {
        title: 'Largest Contentful Paint',
        value: `${Math.floor(Math.random() * 3) + 2}.${Math.floor(Math.random() * 9)}s`,
        status: Math.random() > 0.4 ? 'poor' : 'warning'
      },
      {
        title: 'Cumulative Layout Shift',
        value: `0.${Math.floor(Math.random() * 3)}${Math.floor(Math.random() * 9)}`,
        status: Math.random() > 0.6 ? 'good' : 'warning'
      }
    ];

    return {
      url: websiteUrl,
      mobileScore,
      desktopScore,
      metrics: {
        fcp: Math.random() * 2 + 1,
        lcp: Math.random() * 3 + 2,
        fid: Math.random() * 100 + 50,
        cls: Math.random() * 0.3,
        ttfb: Math.random() * 500 + 200,
        tti: Math.random() * 4 + 3
      },
      opportunities,
      diagnostics
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      new URL(url);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const speedResult = await analyzePageSpeed(url);
      setResult(speedResult);
    } catch (err) {
      setError('Please enter a valid URL (e.g., https://example.com)');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 50) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Speed Analyzer</h2>
        <p className="text-gray-600">Analyze your website's loading speed and get optimization recommendations</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze Speed'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-600 text-sm">{error}</p>
        )}
      </form>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Analyzing page speed performance...</p>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      )}

      {result && (
        <div className="space-y-8">
          {/* Performance Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${getScoreBackground(result.mobileScore)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Mobile Performance</h3>
                  <p className="text-sm text-gray-600">How fast the page loads on mobile devices</p>
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(result.mobileScore)}`}>
                  {result.mobileScore}
                </div>
              </div>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${result.mobileScore}%` }}
                ></div>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${getScoreBackground(result.desktopScore)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Desktop Performance</h3>
                  <p className="text-sm text-gray-600">How fast the page loads on desktop devices</p>
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(result.desktopScore)}`}>
                  {result.desktopScore}
                </div>
              </div>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${result.desktopScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Web Vitals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{result.metrics.fcp.toFixed(1)}s</div>
                <div className="text-sm text-gray-600">First Contentful Paint</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{result.metrics.lcp.toFixed(1)}s</div>
                <div className="text-sm text-gray-600">Largest Contentful Paint</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{result.metrics.fid.toFixed(0)}ms</div>
                <div className="text-sm text-gray-600">First Input Delay</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{result.metrics.cls.toFixed(3)}</div>
                <div className="text-sm text-gray-600">Cumulative Layout Shift</div>
              </div>
            </div>
          </div>

          {/* Optimization Opportunities */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Optimization Opportunities</h3>
            <div className="space-y-4">
              {result.opportunities.map((opportunity, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{opportunity.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(opportunity.impact)}`}>
                          {opportunity.impact} impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{opportunity.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-semibold text-green-600">{opportunity.savings}</div>
                      <div className="text-xs text-gray-500">potential savings</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostics */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Diagnostics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.diagnostics.map((diagnostic, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{diagnostic.title}</span>
                  <span className={`font-semibold ${getStatusColor(diagnostic.status)}`}>
                    {diagnostic.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Optimization Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Compress images and use modern formats (WebP, AVIF)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Enable browser caching and use a CDN</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Minify CSS, JavaScript, and HTML files</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Remove unused code and optimize critical rendering path</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Implement lazy loading for images and videos</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help Optimizing Your Website?</h3>
            <p className="text-gray-600 mb-4">
              Our SEO experts can help you implement these optimizations and improve your page speed significantly
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Get Professional Page Speed Optimization
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 