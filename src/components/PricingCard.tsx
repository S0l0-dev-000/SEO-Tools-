'use client';

import { useState } from 'react';

interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  features: string;
  category: string;
}

interface PricingCardProps {
  tool: Tool;
  isPackage?: boolean;
}

export function PricingCard({ tool, isPackage = false }: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const features = JSON.parse(tool.features);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      // Check if user is authenticated
      const response = await fetch('/api/auth/me');
      
      if (!response.ok) {
        // User not authenticated, redirect to login
        window.location.href = '/login';
        return;
      }

      // User is authenticated, proceed with checkout
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toolSlug: tool.slug }),
      });

      const checkoutData = await checkoutResponse.json();

      if (!checkoutResponse.ok) {
        alert(checkoutData.error || 'Failed to create checkout session');
        return;
      }

      // Redirect to Stripe checkout
      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('An error occurred during purchase');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden ${
      isPackage ? 'border-blue-500 transform scale-105' : 'border-gray-200 hover:border-blue-300'
    }`}>
      {/* Popular badge */}
      {isPackage && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 px-4 text-sm font-semibold">
          🏆 MOST POPULAR
        </div>
      )}
      
      {/* Gradient background overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isPackage 
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}></div>
      
      <div className={`relative z-10 p-8 ${isPackage ? 'pt-16' : ''}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            {tool.description}
          </p>
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-2">
              <span className="text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                ${tool.price}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              one-time payment • lifetime access
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            What's included:
          </h4>
          <ul className="space-y-3">
            {features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            isPackage
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            'Get Started Now'
          )}
        </button>

        {/* Guarantee */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            30-day money-back guarantee
          </div>
          <div className="flex items-center justify-center text-sm text-gray-500 mt-1">
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure payment with Stripe
          </div>
        </div>
      </div>
    </div>
  );
} 