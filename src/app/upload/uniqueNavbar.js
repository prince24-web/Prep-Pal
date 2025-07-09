'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Brain, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const PrepPalNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  // Fetch user info from Levi's backend
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data?.data?.user;
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/feature' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricingpage' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center animate-pulse">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PrepPal</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              Dashboard
            </button>

            {user && (
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="text-sm">{user?.email}</span>
              </div>
            )}

            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            ) : (
              <button className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Dashboard
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              <div className="pt-4 pb-2 space-y-2">
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => {
                    router.push('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </button>

                {user && (
                  <div className="flex items-center space-x-2 px-3 py-2 text-gray-700">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                )}

                {user ? (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <button
                    className="w-full bg-blue-600 text-white text-base font-medium px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PrepPalNavbar;
