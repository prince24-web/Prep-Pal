'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Menu, X } from 'lucide-react';

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/feature' },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricingpage' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">PrepPal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive(link.href)
                    ? 'text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/update"
              className={`px-6 py-2 border rounded-lg transition-colors ${
                isActive('/update')
                  ? 'text-blue-700 border-blue-700 font-semibold'
                  : 'text-blue-600 border-blue-600 hover:bg-blue-50'
              }`}
            >
              What&apos;s New
            </Link>
            <Link
              href="/login"
              className={`px-6 py-2 rounded-lg text-white transition-all ${
                isActive('/login')
                  ? 'bg-blue-700'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[500px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
          }`}
        >
          <div className="py-4 space-y-4 border-t border-blue-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`block px-2 py-1 transition-colors ${
                  isActive(link.href)
                    ? 'text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Buttons */}
            <Link
              href="/update"
              onClick={closeMenu}
              className={`block w-full text-center px-6 py-3 border rounded-lg transition-colors ${
                isActive('/update')
                  ? 'text-blue-700 border-blue-700 font-semibold'
                  : 'text-blue-600 border-blue-600 hover:bg-blue-50'
              }`}
            >
              What&apos;s New
            </Link>
            <Link
              href="/login"
              onClick={closeMenu}
              className={`block w-full text-center px-6 py-3 text-white rounded-lg transition-all ${
                isActive('/login')
                  ? 'bg-blue-700'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg'
              }`}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
