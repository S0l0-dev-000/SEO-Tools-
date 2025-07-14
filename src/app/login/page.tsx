import { LoginForm } from '@/components/LoginForm';
import { Navigation } from '@/components/Navigation';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="login" />
      
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">SEO</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                create a new account
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10 border border-gray-100">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
} 