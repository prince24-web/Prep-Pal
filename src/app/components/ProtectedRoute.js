// components/ProtectedRoute.js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          // Redirect to login with return URL
          router.push('/login?redirectTo=/upload');
          return;
        }

        if (!session) {
          // No session, redirect to login
          router.push('/login?redirectTo=/upload');
          return;
        }

        // User is authenticated
        setAuthenticated(true);
      } catch (error) {
        console.error('Error checking auth:', error);
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
          router.push('/login?redirectTo=/upload');
        } else if (event === 'SIGNED_IN' && session) {
          setAuthenticated(true);
        }
      }
    );

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

  // Only render children if authenticated
  return authenticated ? children : null;
};

export default ProtectedRoute;
