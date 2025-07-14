'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function TestAuthPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading session...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">NextAuth Test Page</h1>
          
          {session ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Authenticated!</h2>
                <div className="text-sm text-green-700 space-y-1">
                  <p><strong>User ID:</strong> {(session.user as any)?.id}</p>
                  <p><strong>Email:</strong> {session.user?.email}</p>
                  <p><strong>Name:</strong> {session.user?.name}</p>
                </div>
              </div>
              
              <button
                onClick={() => signOut()}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-yellow-800 mb-2">🔒 Not Authenticated</h2>
                <p className="text-sm text-yellow-700">Please sign in to test NextAuth.</p>
              </div>
              
              <button
                onClick={() => signIn('credentials')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In with Credentials
              </button>
              
              <div className="text-center">
                <a href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
                  Or go to login page
                </a>
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Debug Info:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded text-gray-600 overflow-auto">
              {JSON.stringify({ status, session }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 