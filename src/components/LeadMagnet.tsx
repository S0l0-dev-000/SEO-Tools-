'use client';

import { useState } from 'react';
import { CheckCircleIcon, DocumentArrowDownIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface LeadMagnetProps {
  source?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function LeadMagnet({ 
  source = 'homepage', 
  title = 'Get Your Free SEO Checklist', 
  description = 'Download our comprehensive 47-point SEO checklist used by 10,000+ businesses to improve their search rankings.',
  className = ''
}: LeadMagnetProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          name, 
          source, 
          leadMagnet: 'seo_checklist' 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to subscribe');
        return;
      }

      setSubmitted(true);
      
      // Trigger download after successful signup
      setTimeout(() => {
        downloadChecklist();
      }, 1000);
      
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadChecklist = () => {
    // Generate and download the SEO checklist
    const checklist = generateSEOChecklist();
    const blob = new Blob([checklist], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-checklist-47-points.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateSEOChecklist = () => {
    return `
🚀 THE ULTIMATE SEO CHECKLIST - 47 POINTS
=========================================

✅ TECHNICAL SEO (Foundation)
1. ✓ Ensure your website loads under 3 seconds
2. ✓ Make your site mobile-responsive
3. ✓ Install SSL certificate (HTTPS)
4. ✓ Create and submit XML sitemap
5. ✓ Set up Google Search Console
6. ✓ Install Google Analytics
7. ✓ Fix broken links (404 errors)
8. ✓ Optimize images (compress, add alt text)
9. ✓ Create robots.txt file
10. ✓ Implement structured data (schema markup)

✅ ON-PAGE SEO (Content Optimization)
11. ✓ Optimize title tags (50-60 characters)
12. ✓ Write compelling meta descriptions (150-160 chars)
13. ✓ Use header tags properly (H1, H2, H3)
14. ✓ Include target keywords naturally
15. ✓ Optimize URL structure (short, descriptive)
16. ✓ Add internal links between pages
17. ✓ Create unique content for each page
18. ✓ Use alt text for all images
19. ✓ Optimize page loading speed
20. ✓ Add breadcrumb navigation

✅ KEYWORD RESEARCH & STRATEGY
21. ✓ Research primary keywords for each page
22. ✓ Find long-tail keyword opportunities
23. ✓ Analyze competitor keywords
24. ✓ Create keyword-focused content
25. ✓ Use keywords in headings and subheadings
26. ✓ Include LSI (related) keywords
27. ✓ Target local keywords (if applicable)

✅ CONTENT MARKETING
28. ✓ Create valuable, original content
29. ✓ Publish content regularly
30. ✓ Write longer, comprehensive articles
31. ✓ Update old content regularly
32. ✓ Create content clusters around topics
33. ✓ Add FAQ sections to pages
34. ✓ Use bullet points and numbered lists

✅ OFF-PAGE SEO (Link Building)
35. ✓ Build high-quality backlinks
36. ✓ Guest post on relevant websites
37. ✓ Create shareable content
38. ✓ Get listed in online directories
39. ✓ Build relationships with influencers
40. ✓ Monitor and disavow toxic links

✅ LOCAL SEO (If Applicable)
41. ✓ Set up Google My Business
42. ✓ Get consistent NAP citations
43. ✓ Collect customer reviews
44. ✓ Create location-specific pages
45. ✓ Join local business directories

✅ MONITORING & ANALYTICS
46. ✓ Track keyword rankings
47. ✓ Monitor organic traffic growth

=============================================
🎯 BONUS TIPS:
- Focus on user experience first
- Create content that answers questions
- Be patient - SEO takes 3-6 months to show results
- Stay updated with Google algorithm changes

Downloaded from SEO Tools Pro - https://your-domain.com
Get more advanced SEO tools at: https://your-domain.com/tools
`;
  };

  if (submitted) {
    return (
      <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 ${className}`}>
        <div className="text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Success! Check Your Email</h3>
          <p className="text-gray-600 mb-6">
            Your SEO checklist is downloading now. We've also sent you exclusive SEO tips and tool updates.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={downloadChecklist}
              className="inline-flex items-center px-4 py-2 text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
            >
              <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
              Download Again
            </button>
            <a
              href="/tools"
              className="inline-flex items-center px-4 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <SparklesIcon className="w-4 h-4 mr-2" />
              Explore Tools
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 ${className}`}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <DocumentArrowDownIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
          <div className="flex items-center text-green-600">
            <CheckCircleIcon className="w-4 h-4 mr-1" />
            47 Action Items
          </div>
          <div className="flex items-center text-green-600">
            <CheckCircleIcon className="w-4 h-4 mr-1" />
            Instant Download
          </div>
          <div className="flex items-center text-green-600">
            <CheckCircleIcon className="w-4 h-4 mr-1" />
            No Spam, Ever
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Downloading...' : 'Get Free SEO Checklist'}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          By downloading, you agree to receive our weekly SEO tips. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
} 