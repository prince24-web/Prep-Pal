import React from 'react';
import Link from 'next/link';
import { Brain, FileText, Zap, BookOpen, HelpCircle, Target, Clock, Shield, Smartphone, Globe, Users, BarChart3, Download, RefreshCw, Search, Star, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'How PrepPal Works – AI Summaries, Quizzes & Flashcards',
  description: 'Discover how PrepPal transforms your long PDFs into AI-generated summaries, quizzes, and flashcards in seconds.',
  openGraph: {
    title: 'PrepPal Features',
    description: 'Instantly summarize and study smarter with PrepPal’s AI tools.',
    url: 'https://prep-pal-blond.vercel.app/feature',
    siteName: 'PrepPal',
    images: [{ url: '/og-features.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      
      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Features</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Discover all the AI-powered tools that make PrepPal the ultimate study companion. 
            From instant summaries to adaptive quizzes, we&apos;ve got everything you need to excel.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12">
            
            {/* AI Summaries */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">AI-Generated Summaries</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Transform lengthy PDFs into concise, comprehensive summaries that capture all the key points. 
                  Our AI understands context and hierarchy to create structured, easy-to-review content.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Intelligent content extraction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Hierarchical organization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Customizable length and detail</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-blue-600 font-medium">
                    <Zap className="w-4 h-4" />
                    <span>AI Generated Summary</span>
                  </div>
                  <h3 className="font-bold text-gray-900">Chapter 5: Machine Learning Fundamentals</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="bg-blue-50 p-3 rounded-lg">
                      <strong>Key Concept:</strong> Supervised learning uses labeled data to train models...
                    </p>
                    <p className="bg-indigo-50 p-3 rounded-lg">
                      <strong>Important:</strong> Feature selection significantly impacts model performance...
                    </p>
                    <p className="bg-purple-50 p-3 rounded-lg">
                      <strong>Remember:</strong> Cross-validation prevents overfitting by...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Quizzes */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium">Question 3 of 10</span>
                      <span className="text-sm text-gray-500">Machine Learning Quiz</span>
                    </div>
                    <h3 className="font-bold text-gray-900">What is the primary purpose of cross-validation?</h3>
                    <div className="space-y-2">
                      <div className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        A) To increase training speed
                      </div>
                      <div className="p-3 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer">
                        B) To prevent overfitting
                      </div>
                      <div className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        C) To collect more data
                      </div>
                      <div className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        D) To visualize results
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Correct! Great job!</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Next Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Interactive Quizzes</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Test your knowledge with automatically generated quizzes based on your content. 
                  Get instant feedback and track your progress with detailed analytics.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Multiple question types (MCQ, True/False, Fill-in)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Instant feedback and explanations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Progress tracking and analytics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Flashcards */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Smart Flashcards</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Master key concepts with AI-generated flashcards that adapt to your learning pace. 
                  Focus on what you need to learn most with spaced repetition algorithms.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Spaced repetition algorithm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Difficulty-based prioritization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Visual and text-based cards</span>
                  </div>
                </div>
              </div>
              <div className="perspective-1000">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 transform hover:rotateY-5 transition-transform">
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">What is supervised learning?</h3>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                      Click to reveal answer
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <button className="text-red-500 hover:text-red-600 transition-colors">
                        Hard
                      </button>
                      <button className="text-yellow-500 hover:text-yellow-600 transition-colors">
                        Medium
                      </button>
                      <button className="text-green-500 hover:text-green-600 transition-colors">
                        Easy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">More Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Search</h3>
              <p className="text-gray-600">
                Find specific information across all your documents instantly with AI-powered semantic search.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Analytics</h3>
              <p className="text-gray-600">
                Track your learning progress with detailed analytics and performance insights.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Export Options</h3>
              <p className="text-gray-600">
                Export your summaries, quizzes, and flashcards in multiple formats for offline study.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Auto-Sync</h3>
              <p className="text-gray-600">
                Your study materials sync automatically across all devices for seamless learning.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Storage</h3>
              <p className="text-gray-600">
                Your documents and data are encrypted and stored securely with enterprise-grade security.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile Ready</h3>
              <p className="text-gray-600">
                Study anywhere with our fully responsive design that works perfectly on all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Proven Performance</h2>
          <p className="text-xl text-blue-100 mb-12">See how PrepPal transforms study efficiency</p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">3x</div>
              <div className="text-blue-100">Faster Learning</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2min</div>
              <div className="text-blue-100">Average Processing</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">File Formats</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Experience These Features?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start using PrepPal today and discover how AI can revolutionize your study experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
                Try All Features Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/pricing">
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                View Pricing Plans
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">PrepPal</span>
          </div>
          <p className="text-gray-400">
            © 2025 PrepPal. All rights reserved. Transforming learning with AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;