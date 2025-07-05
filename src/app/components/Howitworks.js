import React from 'react';
import { FileText, Brain, BookOpen, Coins, Clock, Zap, FileImage, CreditCard } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="px-6 py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How PrepPal Works</h2>
        
        {/* Main Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
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

        {/* Credits Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-center mb-2">
              <Coins className="w-8 h-8 text-white mr-3" />
              <h3 className="text-2xl font-bold text-white">How PrepPal Credits Work</h3>
            </div>
            <p className="text-blue-100 text-center">Simple, transparent pricing for AI-powered learning</p>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Credit System Explanation */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Credit System</h4>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold text-blue-600">1 Credit = 2,000 AI Tokens</span>
                    <br />
                    <span className="text-sm text-gray-600">Tokens measure the size of your text for AI processing</span>
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Zap className="w-6 h-6 text-amber-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Fair Usage</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Credits are used based on your PDF size and the type of AI work you choose. 
                    Only pay for what you use!
                  </p>
                </div>
              </div>

              {/* Usage Examples */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-gray-600 mr-2" />
                  Average Credit Usage
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <FileImage className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900"> Summary (per 10 pages)</span>
                    </div>
                    <span className="font-bold text-blue-600">2.9-3.7 credits</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="font-medium text-gray-900">Set of 10 Flashcards</span>
                    </div>
                    <span className="font-bold text-purple-600">2.7-3.6 credits</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Brain className="w-5 h-5 text-pink-600 mr-3" />
                      <span className="font-medium text-gray-900"> 15-Question Quiz</span>
                    </div>
                    <span className="font-bold text-pink-600">3.9-4.0 credits</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-blue-600">💡 Example:</span> 
                    A 20-page textbook chapter would use approximately 6-7 credits for a complete summary, 
                    helping you save hours of reading time!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}