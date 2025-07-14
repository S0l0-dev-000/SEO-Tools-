'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { NextAuthNavigation } from '@/components/NextAuthNavigation';

export default function NextAuthDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push('/login'); // Not logged in
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NextAuthNavigation currentPage="dashboard" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                NextAuth Dashboard
              </h1>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  Welcome, {session.user?.name || session.user?.email}!
                </h2>
                <p className="text-green-700">
                  This dashboard is protected by NextAuth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Session Info</h3>
                  <pre className="text-xs text-blue-700 overflow-auto">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Next Steps</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>✅ NextAuth is working!</li>
                    <li>✅ Session management active</li>
                    <li>✅ Protected routes functional</li>
                    <li>🔄 Update other components</li>
                    <li>🔄 Add more providers (Google, GitHub)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 