import React from 'react';
import Link from 'next/link';
import { Brain, FileText, Zap, Users, Target, Lightbulb, BookOpen, Award, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About PrepPal – Helping Students Learn Smarter with AI',
  description: 'PrepPal was built to help students summarize and retain information more effectively using AI. Learn about our mission and team.',
  openGraph: {
    title: 'About PrepPal',
    description: 'Built for students. Backed by AI. Learn more about our mission.',
    url: ' https://prep-pal-blond.vercel.app/about',
    siteName: 'PrepPal',
    images: [{ url: '/og-about.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      
      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">PrepPal</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We&apos;re revolutionizing how students learn by transforming static PDFs into dynamic, 
            AI-powered study materials that adapt to your learning style and pace.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At PrepPal, we believe that learning should be efficient, engaging, and personalized. 
                Traditional study methods often leave students overwhelmed by dense materials and 
                ineffective memorization techniques.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                That&apos;s why we created an AI-powered platform that instantly transforms your PDFs 
                into comprehensive summaries, interactive quizzes, and smart flashcards—helping 
                you study smarter, not harder.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 transform rotate-3">
                <div className="bg-white rounded-xl p-6 transform -rotate-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">PDF Upload</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-blue-200 rounded w-full"></div>
                    <div className="h-2 bg-blue-300 rounded w-4/5"></div>
                    <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
                    <Zap className="w-4 h-4" />
                    <span>AI Processing...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How PrepPal Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Upload Your PDF</h3>
              <p className="text-gray-600">
                Simply drag and drop your study materials, textbooks, or research papers. 
                Our system accepts any PDF format.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. AI Processing</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes your content, identifying key concepts, 
                important facts, and learning objectives automatically.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Study Materials</h3>
              <p className="text-gray-600">
                Get instant access to AI-generated summaries, interactive quizzes, 
                and flashcards tailored to your content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose PrepPal?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <Zap className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
              <p className="text-blue-100">Generate study materials in seconds, not hours</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <Target className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-bold mb-2">Highly Accurate</h3>
              <p className="text-blue-100">AI-powered precision ensures reliable content</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <Lightbulb className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-bold mb-2">Smart Learning</h3>
              <p className="text-blue-100">Adaptive content that matches your learning style</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <Award className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-bold mb-2">Proven Results</h3>
              <p className="text-blue-100">Students report 40% better retention rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            We envision a world where every student has access to personalized, AI-powered 
            learning tools that make studying more efficient and enjoyable. PrepPal is just 
            the beginning of this educational revolution.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">PDFs Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Study Experience?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who are already studying smarter with PrepPal&apos;s AI-powered tools.
          </p>
          <Link href="/upload">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
              Start Studying for Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
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
            © 2025 PrepPal, All rights reserved. Transforming learning with AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;