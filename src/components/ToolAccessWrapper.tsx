'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ToolAccessWrapperProps {
  toolSlug: string;
  toolName: string;
  children: React.ReactNode;
}

export function ToolAccessWrapper({ toolSlug, toolName, children }: ToolAccessWrapperProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAccess();
  }, [toolSlug]);

  const checkAccess = async () => {
    try {
      // Check if user is authenticated
      const authResponse = await fetch('/api/auth/me');
      
      if (!authResponse.ok) {
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      const authData = await authResponse.json();
      setUser(authData.user);

      // Check if user has purchased this tool
      const accessResponse = await fetch(`/api/tools/${toolSlug}/access`);
      
      if (accessResponse.ok) {
        const accessData = await accessResponse.json();
        setHasAccess(accessData.hasAccess);
      } else {
        setHasAccess(false);
      }
    } catch (error) {
      console.error('Error checking access:', error);
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
        <div className="text-yellow-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-yellow-800 mb-2">Authentication Required</h3>
        <p className="text-yellow-700 mb-6">
          You need to sign in to access the {toolName}.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-red-800 mb-2">Purchase Required</h3>
        <p className="text-red-700 mb-6">
          You need to purchase the {toolName} to access this feature.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/pricing"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            View Pricing
          </Link>
          <Link
            href="/dashboard"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
} 