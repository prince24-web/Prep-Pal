'use client'

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brain, Eye, EyeOff, Loader2 } from 'lucide-react';
import axios from 'axios';

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/upload';

  const [isMounted, setIsMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    passwordMismatch: false,
    termsRequired: false,
    emptyFields: {},
    auth: ''
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/getMe`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data) {
          router.push(redirectTo);
        } else {
          localStorage.removeItem('accessToken');
          setLoading(false);
        }
      } catch (error) {
        console.log('Invalid or expired token');
        localStorage.removeItem('accessToken');
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, redirectTo]);

  useEffect(() => {
    setIsMounted(true);
    setErrors({
      passwordMismatch: false,
      termsRequired: false,
      emptyFields: {},
      auth: ''
    });
  }, [isLogin]);

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setAgreeToTerms(checked);
      if (checked) {
        setErrors(prev => ({ ...prev, termsRequired: false }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));

      if (name === 'password' || name === 'confirmPassword') {
        setErrors(prev => ({ ...prev, passwordMismatch: false, auth: '' }));
      }

      if (value.trim()) {
        setErrors(prev => ({
          ...prev,
          emptyFields: { ...prev.emptyFields, [name]: false },
          auth: ''
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let hasErrors = false;
    const newErrors = {
      passwordMismatch: false,
      termsRequired: false,
      emptyFields: {},
      auth: ''
    };

    const requiredFields = isLogin ? ['email', 'password'] : ['name', 'email', 'password', 'confirmPassword'];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors.emptyFields[field] = true;
        hasErrors = true;
      }
    });

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.passwordMismatch = true;
      hasErrors = true;
    }

    if (!isLogin && !agreeToTerms) {
      newErrors.termsRequired = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

      if (isLogin) {
        const res = await axios.post(`${apiBaseUrl}/login`, {
          email: formData.email,
          password: formData.password
        });

        const { session } = res.data;
        localStorage.setItem('accessToken', session.access_token);

        router.push(redirectTo);

      } else {
        await axios.post(`${apiBaseUrl}/register`, {
          email: formData.email,
          password: formData.password,
          username: formData.name
        });

        alert('Account created successfully! Please check your email.');
        setIsLogin(true);
        setFormData({
          email: formData.email,
          password: '',
          confirmPassword: '',
          name: ''
        });
      }

    } catch (error) {
      console.error('Auth error:', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong.';
      setErrors(prev => ({ ...prev, auth: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* StudyAI Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">StudyAI</span>
          </div>
          <p className="text-gray-600">Transform your PDFs into study materials</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-slate-600">
              {isLogin
                ? 'Sign in to continue your learning journey'
                : 'Join thousands of students already using StudyAI'}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Auth Error Message */}
            {errors.auth && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{errors.auth}</p>
              </div>
            )}

            {/* Name Field - Only for Sign Up */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    errors.emptyFields.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
                {errors.emptyFields.name && (
                  <p className="mt-2 text-sm text-red-600">
                    Full name is required
                  </p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  errors.emptyFields.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-300 focus:ring-blue-500'
                }`}
                placeholder="Enter your email"
                required
              />
              {errors.emptyFields.email && (
                <p className="mt-2 text-sm text-red-600">
                  Email address is required
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    errors.passwordMismatch || errors.emptyFields.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.emptyFields.password && (
                <p className="mt-2 text-sm text-red-600">
                  Password is required
                </p>
              )}
            </div>

            {/* Confirm Password Field - Only for Sign Up */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                      errors.passwordMismatch || errors.emptyFields.confirmPassword
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.emptyFields.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    Please confirm your password
                  </p>
                )}
                {errors.passwordMismatch && !errors.emptyFields.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    Passwords do not match
                  </p>
                )}
              </div>
            )}

            {/* Forgot Password Link - Only for Sign In */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    // You can implement password reset functionality here
                    alert('Password reset functionality will be implemented soon!');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Terms and Conditions - Only for Sign Up */}
            {!isLogin && (
              <div>
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    required={!isLogin}
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => alert('Terms of Service will be shown here')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => alert('Privacy Policy will be shown here')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>
                {errors.termsRequired && (
                  <p className="mt-2 text-sm text-red-600">
                    Please agree to the terms and conditions
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading fallback component
const LoginFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
    <div className="flex items-center space-x-2">
      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      <span className="text-gray-600">Loading...</span>
    </div>
  </div>
);

// Main component with Suspense wrapper
const LoginPage = () => {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;