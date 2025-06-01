'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
// Import your existing auth functions
import { signUp, signIn, signInWithGoogle } from '@/utils/auth';

export default function AuthForm() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // Fix hydration
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false); // controlled checkbox
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({
    passwordMismatch: false,
    termsRequired: false,
    emptyFields: {},
    auth: '' // For auth-related errors
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  useEffect(() => {
    setIsMounted(true); // fixes hydration issue
  }, []);

  // Clear errors when switching between login/signup
  useEffect(() => {
    setErrors({
      passwordMismatch: false,
      termsRequired: false,
      emptyFields: {},
      auth: ''
    });
  }, [isLogin]);

  if (!isMounted) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setAgreeToTerms(checked);
      if (checked) {
        setErrors(prev => ({ ...prev, termsRequired: false }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));

      // Clear field-specific errors when user starts typing
      if (name === 'password' || name === 'confirmPassword') {
        setErrors(prev => ({ ...prev, passwordMismatch: false, auth: '' }));
      }
      
      // Clear empty field error when user starts typing
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

    // Define required fields based on login/signup mode
    const requiredFields = isLogin 
      ? ['email', 'password']
      : ['name', 'email', 'password', 'confirmPassword'];

    // Check for empty fields
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors.emptyFields[field] = true;
        hasErrors = true;
      }
    });

    // Check password match for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.passwordMismatch = true;
      hasErrors = true;
    }

    // Check terms agreement for signup
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
      let result;
      
      if (isLogin) {
        // Call your signIn function
        console.log('Attempting to sign in...');
        result = await signIn(formData.email, formData.password);
        
      } else {
        // Call your signUp function
        console.log('Attempting to sign up...');
        result = await signUp(formData.email, formData.password, formData.name);
      }

      // Handle successful authentication
      console.log('Authentication successful:', result);
      
      // Redirect to dashboard or desired page
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Handle specific Supabase errors
      let errorMessage = 'An unexpected error occurred';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (error.message?.includes('User already registered')) {
        errorMessage = 'An account with this email already exists';
      } else if (error.message?.includes('Password should be at least')) {
        errorMessage = 'Password must be at least 6 characters long';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and confirm your account';
      } else if (error.message?.includes('Signup requires')) {
        errorMessage = 'Email confirmation is required. Please check your inbox.';
      }
      
      setErrors(prev => ({ ...prev, auth: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrors(prev => ({ ...prev, auth: '' }));
    
    try {
      console.log('Attempting Google sign in...');
      // Call your Google sign in function
      const result = await signInWithGoogle();
      
      console.log('Google sign in initiated:', result);
      
      // Handle successful Google authentication
      // Note: For Google OAuth, the redirect will be handled by Supabase automatically
      // The user will be redirected to the callback URL you configured
      
    } catch (error) {
      console.error('Google sign in error:', error);
      
      let errorMessage = 'Failed to sign in with Google. Please try again.';
      
      // Handle specific Google OAuth errors
      if (error.message?.includes('popup_closed_by_user')) {
        errorMessage = 'Sign in was cancelled. Please try again.';
      } else if (error.message?.includes('access_denied')) {
        errorMessage = 'Access denied. Please allow permissions to continue.';
      }
      
      setErrors(prev => ({ 
        ...prev, 
        auth: errorMessage
      }));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-slate-600">
            {isLogin
              ? 'Sign in to continue your learning journey'
              : 'Join thousands of students already using PrepPal'}
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

        <div className="space-y-4">
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
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </a>
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
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </a>
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
            onClick={handleSubmit}
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
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-slate-300"></div>
          <span className="px-4 text-sm text-slate-500">or</span>
          <div className="flex-1 border-t border-slate-300"></div>
        </div>

        {/* Social Login */}
        <button 
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isLoading}
          className="w-full flex items-center justify-center space-x-3 bg-white border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

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
  );
}