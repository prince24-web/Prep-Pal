'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Brain, FileText, Zap, BookOpen, HelpCircle, Target, Clock, Shield, Smartphone, Globe, Users, BarChart3, Download, RefreshCw, Search, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { useRouter } from "next/navigation";
const FeaturesPage = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    setMounted(true);
  }, []);

 const handleClick = useCallback(() => {
      router.push("/upload");
     console.log("Navigate to upload page");
   }, [router]);
  // Static positions for particles to prevent hydration mismatch
  const particlePositions = [
    { left: 10, top: 20, delay: 1 },
    { left: 85, top: 15, delay: 2.5 },
    { left: 25, top: 70, delay: 0.5 },
    { left: 90, top: 85, delay: 3 },
    { left: 5, top: 50, delay: 1.8 },
    { left: 70, top: 25, delay: 2.2 },
    { left: 15, top: 90, delay: 0.8 },
    { left: 95, top: 60, delay: 3.5 },
    { left: 45, top: 10, delay: 1.2 },
    { left: 60, top: 95, delay: 2.8 },
    { left: 30, top: 40, delay: 0.3 },
    { left: 80, top: 75, delay: 2 },
    { left: 20, top: 60, delay: 4 },
    { left: 75, top: 35, delay: 1.5 },
    { left: 40, top: 80, delay: 3.2 },
    { left: 65, top: 5, delay: 0.7 },
    { left: 35, top: 55, delay: 2.7 },
    { left: 85, top: 45, delay: 1.3 },
    { left: 55, top: 85, delay: 3.8 },
    { left: 25, top: 30, delay: 0.9 }
  ];

  const additionalFeatures = [
    { 
      icon: Search, 
      title: "Smart Search", 
      desc: "Find specific information across all your documents instantly with AI-powered semantic search.", 
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: BarChart3, 
      title: "Progress Analytics", 
      desc: "Track your learning progress with detailed analytics and performance insights.", 
      gradient: "from-orange-500 to-red-500"
    },
    { 
      icon: Download, 
      title: "Export to Anki", 
      desc: "Easily export your flashcards to Anki for powerful spaced repetition learning.", 
      gradient: "from-cyan-500 to-blue-500"
    },

    { 
      icon: RefreshCw, 
      title: "Auto-Sync", 
      desc: "Your study materials sync automatically across all devices for seamless learning.", 
      gradient: "from-violet-500 to-purple-500"
    },
    { 
      icon: Shield, 
      title: "Secure Storage", 
      desc: "Your documents and data are encrypted and stored securely with enterprise-grade security.", 
      gradient: "from-pink-500 to-rose-500"
    },
    { 
      icon: Smartphone, 
      title: "Mobile Ready", 
      desc: "Study anywhere with our fully responsive design that works perfectly on all devices.", 
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  const performanceStats = [
    { value: "3x", label: "Faster Learning" },
    { value: "95%", label: "Accuracy Rate" },
    { value: "2min", label: "Average Processing" },
    { value: "50+", label: "File Formats" }
  ];

  return (
    <>
      {/* CSS moved to head to prevent hydration issues */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
        
        .animate-bounce-slower {
          animation: bounce-slow 8s ease-in-out infinite;
        }
        
        .animate-delay-1 { animation-delay: 0.3s; }
        .animate-delay-2 { animation-delay: 0.5s; }
        .animate-delay-3 { animation-delay: 0.7s; }
        .animate-delay-4 { animation-delay: 0.9s; }
        .animate-delay-5 { animation-delay: 1.1s; }
        .animate-delay-6 { animation-delay: 1.3s; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Gradient Orbs */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full animate-pulse animate-delay-1"></div>
          
          {/* Floating Icons */}
          <div className="absolute top-20 left-1/4 animate-float">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center opacity-30">
              <Brain className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="absolute top-40 right-1/3 animate-float animate-delay-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center opacity-25">
              <FileText className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="absolute bottom-40 right-20 animate-float animate-delay-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center opacity-20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="absolute top-60 left-20 animate-float animate-delay-4">
            <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center opacity-30">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
          
          {/* Animated Lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 0.1}} />
                <stop offset="100%" style={{stopColor: '#8B5CF6', stopOpacity: 0.1}} />
              </linearGradient>
            </defs>
            <path d="M0,100 Q400,50 800,100 T1600,100" fill="none" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse">
              <animate attributeName="d" dur="8s" repeatCount="indefinite" 
                values="M0,100 Q400,50 800,100 T1600,100;M0,120 Q400,70 800,120 T1600,120;M0,100 Q400,50 800,100 T1600,100" />
            </path>
            <path d="M0,300 Q600,250 1200,300 T2400,300" fill="none" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse animate-delay-1">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" 
                values="M0,300 Q600,250 1200,300 T2400,300;M0,280 Q600,230 1200,280 T2400,280;M0,300 Q600,250 1200,300 T2400,300" />
            </path>
          </svg>
          
          {/* Particle System with static positions */}
          {mounted && (
            <div className="absolute inset-0">
              {particlePositions.map((particle, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-30"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animationDelay: `${particle.delay}s`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content with higher z-index */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="px-6 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Features</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto animate-fade-in animate-delay-1">
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
                <div className="grid md:grid-cols-2 gap-8 items-center animate-slide-in-left">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">AI-Generated Summaries</h2>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      Transform lengthy PDFs into concise, comprehensive summaries that capture all the key points. 
                      Our AI understands context and hierarchy to create structured, easy-to-review content.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 animate-fade-in animate-delay-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Intelligent content extraction</span>
                      </div>
                      <div className="flex items-center gap-3 animate-fade-in animate-delay-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Hierarchical organization</span>
                      </div>
                      <div className="flex items-center gap-3 animate-fade-in animate-delay-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Customizable length and detail</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
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
                <div className="grid md:grid-cols-2 gap-8 items-center animate-slide-in-right">
                  <div className="order-2 md:order-1">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
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
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <HelpCircle className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">Interactive Quizzes</h2>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      Test your knowledge with automatically generated quizzes based on your content. 
                      Get instant feedback and track your progress with detailed analytics.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 animate-fade-in animate-delay-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Multiple question types (MCQ, True/False, Fill-in)</span>
                      </div>
                      <div className="flex items-center gap-3 animate-fade-in animate-delay-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Instant feedback and explanations</span>
                      </div>
                      <div className="flex items-center gap-3 animate-fade-in animate-delay-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Progress tracking and analytics</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart Flashcards */}
                <div className="grid md:grid-cols-2 gap-8 items-center animate-slide-in-left">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">Smart Flashcards</h2>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      Master key concepts with AI-generated flashcards that adapt to your learning pace. 
                      Focus on what you need to learn most with spaced repetition algorithms.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 animate-fade-in animate-delay-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Spaced repetition algorithm</span>
                      </div>
                      <div className="flex items-center gap-3 animate-fade-in animate-delay-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Difficulty-based prioritization</span>
                      </div>
                      <div className="flex items-center gap-3 animate-fade-in animate-delay-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Visual and text-based cards</span>
                      </div>
                    </div>
                  </div>
                  <div className="perspective-1000">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-blue-100 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                      <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                          <Brain className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">What is supervised learning?</h3>
                        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                          Click to reveal answer
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <button className="text-red-500 hover:text-red-600 transition-colors hover:scale-110 transform">
                            Hard
                          </button>
                          <button className="text-yellow-500 hover:text-yellow-600 transition-colors hover:scale-110 transform">
                            Medium
                          </button>
                          <button className="text-green-500 hover:text-green-600 transition-colors hover:scale-110 transform">
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
          <section className="px-6 py-16 bg-white/30 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in">More Powerful Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in animate-delay-${Math.min(index + 1, 6)}`}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Performance Stats */}
          <section className="px-6 py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/90 to-indigo-600/90"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full animate-bounce-slower"></div>
            </div>
            <div className="max-w-6xl mx-auto text-center relative z-10">
              <h2 className="text-4xl font-bold mb-4 animate-fade-in">Proven Performance</h2>
              <p className="text-xl text-blue-100 mb-12 animate-fade-in animate-delay-1">See how PrepPal transforms study efficiency</p>
              
              <div className="grid md:grid-cols-4 gap-8">
                {performanceStats.map((stat, index) => (
                  <div key={index} className={`animate-fade-in hover:scale-110 transition-transform duration-300 animate-delay-${index + 1}`}>
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in">Ready to Experience These Features?</h2>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in animate-delay-1">
                Start using PrepPal today and discover how AI can revolutionize your study experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-2">
                <button onClick={handleClick} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 hover:scale-105">
                  Try All Features Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={()=>{ router.push("/pricingpage"); }} className="px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                  View Pricing Plans
                </button>
              </div>
            </div>
          </section>
 {/* Footer */}
          <footer className="px-6 py-8 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center animate-pulse">
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
      </div>
    </>
  );
};

export default FeaturesPage;