// components/ProtectedRoute.js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Add a timeout to catch network issues
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Network timeout')), 10000)
        );

        const authPromise = supabase.auth.getSession();
        
        const { data: { session }, error } = await Promise.race([
          authPromise,
          timeoutPromise
        ]);

        if (error) {
          console.error('Auth error:', error);
          setHasError(true);
          setAuthenticated(false);
          router.push('/login?redirectTo=/upload');
          return;
        }

        if (!session) {
          // No session, redirect to login
          setAuthenticated(false);
          router.push('/login?redirectTo=/upload');
          return;
        }

        // User is authenticated
        setAuthenticated(true);
        setHasError(false);
      } catch (error) {
        console.error('Error checking auth:', error);
        setHasError(true);
        setAuthenticated(false);
        router.push('/login?redirectTo=/upload');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setAuthenticated(false);
          setHasError(false);
          router.push('/login?redirectTo=/upload');
        } else if (event === 'SIGNED_IN' && session) {
          setAuthenticated(true);
          setHasError(false);
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase.auth]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin">
              <div className="w-full h-full bg-white rounded-full m-1"></div>
            </div>
          </div>
          <p className="text-lg text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Show error state for network/connection issues
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">
            Unable to verify authentication. Please check your internet connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Only render children if authenticated (and no errors)
  return authenticated ? children : null;
};

export default ProtectedRoute;