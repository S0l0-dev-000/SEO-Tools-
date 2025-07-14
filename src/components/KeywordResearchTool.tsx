'use client';

import { useState } from 'react';

interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  relatedKeywords: {
    keyword: string;
    searchVolume: number;
    difficulty: number;
  }[];
}

export default function KeywordResearchTool() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KeywordData | null>(null);
  const [error, setError] = useState('');

  const researchKeyword = async (searchKeyword: string): Promise<KeywordData> => {
    // Simulate keyword research with realistic data
    const baseVolume = Math.floor(Math.random() * 50000) + 1000;
    const difficulty = Math.floor(Math.random() * 80) + 20;
    const cpc = Math.random() * 5 + 0.5;

    const relatedKeywords = [
      `${searchKeyword} services`,
      `${searchKeyword} tools`,
      `${searchKeyword} guide`,
      `${searchKeyword} tips`,
      `${searchKeyword} strategies`,
      `${searchKeyword} solutions`,
      `${searchKeyword} benefits`,
      `${searchKeyword} cost`,
      `${searchKeyword} reviews`,
      `${searchKeyword} comparison`
    ].slice(0, 6).map(kw => ({
      keyword: kw,
      searchVolume: Math.floor(Math.random() * 10000) + 100,
      difficulty: Math.floor(Math.random() * 70) + 15
    }));

    return {
      keyword: searchKeyword,
      searchVolume: baseVolume,
      difficulty,
      cpc,
      relatedKeywords
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const keywordData = await researchKeyword(keyword.trim());
      setResult(keywordData);
    } catch (err) {
      setError('An error occurred while researching keywords. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 70) return 'text-red-600';
    if (difficulty >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getDifficultyBg = (difficulty: number) => {
    if (difficulty >= 70) return 'bg-red-100';
    if (difficulty >= 40) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty >= 70) return 'Hard';
    if (difficulty >= 40) return 'Medium';
    return 'Easy';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Keyword Research Tool</h2>
        <p className="text-gray-600">Find profitable keywords for your business</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a keyword (e.g., 'digital marketing')"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {loading ? 'Researching...' : 'Research'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-600 text-sm">{error}</p>
        )}
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Researching keywords...</p>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Main Keyword Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">"{result.keyword}"</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{formatNumber(result.searchVolume)}</div>
                <div className="text-sm text-gray-600">Monthly Searches</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getDifficultyColor(result.difficulty)}`}>
                  {result.difficulty}/100
                </div>
                <div className="text-sm text-gray-600">Difficulty ({getDifficultyLabel(result.difficulty)})</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${result.cpc.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Cost Per Click</div>
              </div>
            </div>
          </div>

          {/* Related Keywords */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Keywords</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">
                      Keyword
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">
                      Search Volume
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">
                      Difficulty
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">
                      Opportunity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.relatedKeywords.map((kw, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-900">
                        {kw.keyword}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-900">
                        {formatNumber(kw.searchVolume)}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyBg(kw.difficulty)} ${getDifficultyColor(kw.difficulty)}`}>
                          {kw.difficulty} - {getDifficultyLabel(kw.difficulty)}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        {kw.difficulty < 30 && kw.searchVolume > 1000 ? (
                          <span className="text-green-600 font-medium">High</span>
                        ) : kw.difficulty < 50 && kw.searchVolume > 500 ? (
                          <span className="text-yellow-600 font-medium">Medium</span>
                        ) : (
                          <span className="text-red-600 font-medium">Low</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Keyword Insights</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>
                  {result.difficulty < 30 
                    ? "This keyword has low competition - great opportunity for ranking!"
                    : result.difficulty < 60 
                      ? "Moderate competition - achievable with good SEO strategy"
                      : "High competition - consider targeting long-tail variations"}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>
                  {result.searchVolume > 10000 
                    ? "High search volume indicates strong user interest"
                    : result.searchVolume > 1000 
                      ? "Good search volume with potential for traffic"
                      : "Consider targeting related high-volume keywords"}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>
                  Focus on long-tail variations and semantic keywords to capture more qualified traffic
                </span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-3">
              Want a comprehensive keyword strategy for your business?
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Get Professional Keyword Research
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 