'use client';

import { useState } from 'react';

interface MetaTagsData {
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  twitterSite: string;
  twitterCreator: string;
}

export default function MetaTagsGenerator() {
  const [formData, setFormData] = useState<MetaTagsData>({
    title: '',
    description: '',
    keywords: '',
    author: '',
    robots: 'index, follow',
    canonical: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterCreator: ''
  });

  const [generatedTags, setGeneratedTags] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateMetaTags = () => {
    const tags = [];

    // Basic Meta Tags
    if (formData.title) {
      tags.push(`<title>${formData.title}</title>`);
    }
    
    if (formData.description) {
      tags.push(`<meta name="description" content="${formData.description}" />`);
    }
    
    if (formData.keywords) {
      tags.push(`<meta name="keywords" content="${formData.keywords}" />`);
    }
    
    if (formData.author) {
      tags.push(`<meta name="author" content="${formData.author}" />`);
    }

    tags.push(`<meta name="robots" content="${formData.robots}" />`);
    
    if (formData.canonical) {
      tags.push(`<link rel="canonical" href="${formData.canonical}" />`);
    }

    // Open Graph Tags
    const ogTitle = formData.ogTitle || formData.title;
    const ogDescription = formData.ogDescription || formData.description;
    
    if (ogTitle) {
      tags.push(`<meta property="og:title" content="${ogTitle}" />`);
    }
    
    if (ogDescription) {
      tags.push(`<meta property="og:description" content="${ogDescription}" />`);
    }
    
    if (formData.ogImage) {
      tags.push(`<meta property="og:image" content="${formData.ogImage}" />`);
    }
    
    if (formData.ogUrl) {
      tags.push(`<meta property="og:url" content="${formData.ogUrl}" />`);
    }
    
    tags.push(`<meta property="og:type" content="website" />`);

    // Twitter Card Tags
    tags.push(`<meta name="twitter:card" content="${formData.twitterCard}" />`);
    
    if (formData.twitterSite) {
      tags.push(`<meta name="twitter:site" content="${formData.twitterSite}" />`);
    }
    
    if (formData.twitterCreator) {
      tags.push(`<meta name="twitter:creator" content="${formData.twitterCreator}" />`);
    }

    // Additional essential tags
    tags.push(`<meta charset="UTF-8" />`);
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);

    setGeneratedTags(tags.join('\n'));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedTags);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const validateForm = () => {
    if (formData.title.length > 60) {
      return { isValid: false, message: 'Title should be under 60 characters for optimal SEO' };
    }
    if (formData.description.length > 160) {
      return { isValid: false, message: 'Description should be under 160 characters for optimal SEO' };
    }
    return { isValid: true, message: '' };
  };

  const validation = validateForm();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Meta Tags Generator</h2>
        <p className="text-gray-600">Create SEO-optimized meta tags for your website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Information</h3>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Page Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Your awesome page title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/60 characters (optimal: 50-60)
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="A compelling description of your page content"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/160 characters (optimal: 150-160)
            </p>
          </div>

          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="keyword1, keyword2, keyword3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="canonical" className="block text-sm font-medium text-gray-700 mb-1">
              Canonical URL
            </label>
            <input
              type="url"
              id="canonical"
              name="canonical"
              value={formData.canonical}
              onChange={handleInputChange}
              placeholder="https://example.com/page"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="robots" className="block text-sm font-medium text-gray-700 mb-1">
                Robots
              </label>
              <select
                id="robots"
                name="robots"
                value={formData.robots}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="index, follow">Index, Follow</option>
                <option value="noindex, follow">No Index, Follow</option>
                <option value="index, nofollow">Index, No Follow</option>
                <option value="noindex, nofollow">No Index, No Follow</option>
              </select>
            </div>
          </div>

          {/* Social Media Section */}
          <h4 className="text-md font-semibold text-gray-900 mt-6 mb-3">Social Media (Open Graph & Twitter)</h4>
          
          <div>
            <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700 mb-1">
              Social Image URL
            </label>
            <input
              type="url"
              id="ogImage"
              name="ogImage"
              value={formData.ogImage}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="ogUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Page URL
            </label>
            <input
              type="url"
              id="ogUrl"
              name="ogUrl"
              value={formData.ogUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/page"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="twitterSite" className="block text-sm font-medium text-gray-700 mb-1">
                Twitter Site
              </label>
              <input
                type="text"
                id="twitterSite"
                name="twitterSite"
                value={formData.twitterSite}
                onChange={handleInputChange}
                placeholder="@yoursite"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="twitterCreator" className="block text-sm font-medium text-gray-700 mb-1">
                Twitter Creator
              </label>
              <input
                type="text"
                id="twitterCreator"
                name="twitterCreator"
                value={formData.twitterCreator}
                onChange={handleInputChange}
                placeholder="@yourcreator"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={generateMetaTags}
            disabled={!formData.title || !formData.description}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            Generate Meta Tags
          </button>

          {!validation.isValid && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-yellow-800 text-sm">⚠️ {validation.message}</p>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Generated Meta Tags</h3>
            {generatedTags && (
              <button
                onClick={copyToClipboard}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy Tags'}
              </button>
            )}
          </div>

          {generatedTags ? (
            <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-auto max-h-96">
              <pre className="text-sm whitespace-pre-wrap">{generatedTags}</pre>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
              <p className="text-gray-500">Fill in the form and click "Generate Meta Tags" to see your optimized HTML meta tags here.</p>
            </div>
          )}

          {/* SEO Tips */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-semibold text-blue-900 mb-2">SEO Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep titles under 60 characters</li>
              <li>• Meta descriptions should be 150-160 characters</li>
              <li>• Include target keywords naturally</li>
              <li>• Make descriptions compelling and actionable</li>
              <li>• Use unique tags for each page</li>
              <li>• Include social media image (1200x630px)</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-md text-center">
            <h4 className="font-semibold text-gray-900 mb-2">Need Professional SEO Help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Get a comprehensive SEO audit and custom optimization strategy
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
              Get SEO Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 