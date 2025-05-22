'use client'
import React from "react";
import {
  BookOpen,
  FileText,
  Brain,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";


export default function LandingPage() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("/upload");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">PrepPal</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            How it works
          </a>
          <Link
            href="/pricingpage"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/signin">
            <button className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Sign in
            </button>
          </Link>
          <Link href="/upload">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              Get started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-powered study tools that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  elevate your learning
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your PDFs into summaries, flashcards, and quizzes
                instantly. Study smarter with intelligent AI that understands
                your content.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                Start studying for free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:shadow-md transition-all">
                Watch demo
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">Free forever plan</span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-2 bg-gray-100 rounded-full w-2/3"></div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="h-2 bg-gray-100 rounded-full"></div>
                <div className="h-2 bg-gray-100 rounded-full w-5/6"></div>
                <div className="h-2 bg-blue-200 rounded-full w-3/4"></div>
                <div className="h-2 bg-gray-100 rounded-full w-4/5"></div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-gray-800">
                    AI Generated Summary
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-blue-200 rounded-full"></div>
                  <div className="h-2 bg-blue-100 rounded-full w-4/5"></div>
                  <div className="h-2 bg-blue-200 rounded-full w-3/5"></div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl opacity-80 transform rotate-12"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-3xl opacity-60 transform -rotate-12"></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl opacity-70 transform rotate-45"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to study efficiently
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered tools transform your study materials into engaging,
              personalized learning experiences that help you retain information
              better.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Smart Summaries
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Extract key insights from any PDF instantly. Our AI identifies
                the most important concepts and creates concise,
                easy-to-understand summaries.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Interactive Flashcards
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically generate flashcards from your study material.
                Perfect for memorization and quick review sessions.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Adaptive Quizzes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Test your knowledge with AI-generated quizzes that adapt to your
                learning progress and focus on areas you need to improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to revolutionize your studying?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already studying smarter, not
            harder, with our AI-powered tools.
          </p>

          <button
            onClick={handleClick}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Get started free today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>&copy; 2025 PrepPal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
