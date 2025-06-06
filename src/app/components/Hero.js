import React, { useCallback } from "react";
import { ArrowRight, CheckCircle, FileText, Zap, Brain, BookOpen, Target, Sparkles } from "lucide-react";

export default function Hero() {
  const handleClick = useCallback(() => {
    // router.push("/upload"); - Commented out for demo
    console.log("Navigate to upload page");
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 -right-48 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Brand Icons */}
        <div className="absolute top-16 left-1/5 animate-float">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center opacity-20 shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-1/4 animate-float" style={{animationDelay: '1.5s'}}>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center opacity-25">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{animationDelay: '3s'}}>
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center opacity-30">
            <Target className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="absolute top-2/3 left-12 animate-float" style={{animationDelay: '4.5s'}}>
          <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center opacity-25">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full animate-pulse">
            {[...Array(48)].map((_, i) => (
              <div 
                key={i} 
                className="bg-blue-500 rounded-full w-2 h-2 animate-ping"
                style={{
                  animationDelay: `${(i * 0.1) % 5}s`,
                  animationDuration: `${2 + (i % 3)}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Flowing Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 0.1}} />
              <stop offset="50%" style={{stopColor: '#8B5CF6', stopOpacity: 0.15}} />
              <stop offset="100%" style={{stopColor: '#EC4899', stopOpacity: 0.1}} />
            </linearGradient>
          </defs>
          <path 
            d="M0,200 Q300,150 600,200 T1200,200" 
            fill="none" 
            stroke="url(#heroLineGradient)" 
            strokeWidth="3" 
            className="animate-pulse"
          >
            <animate 
              attributeName="d" 
              dur="10s" 
              repeatCount="indefinite" 
              values="M0,200 Q300,150 600,200 T1200,200;M0,180 Q300,130 600,180 T1200,180;M0,200 Q300,150 600,200 T1200,200" 
            />
          </path>
          <path 
            d="M0,400 Q400,350 800,400 T1600,400" 
            fill="none" 
            stroke="url(#heroLineGradient)" 
            strokeWidth="2" 
            className="animate-pulse" 
            style={{animationDelay: '3s'}}
          >
            <animate 
              attributeName="d" 
              dur="12s" 
              repeatCount="indefinite" 
              values="M0,400 Q400,350 800,400 T1600,400;M0,420 Q400,370 800,420 T1600,420;M0,400 Q400,350 800,400 T1600,400" 
            />
          </path>
        </svg>
        
        {/* Sparkle Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="px-6 py-16 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-up">
                AI-powered study tools that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient">
                  elevate your learning
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                Transform your PDFs into summaries, flashcards, and quizzes
                instantly. Study smarter with intelligent AI that understands
                your content.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <button
                onClick={handleClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center gap-2 hover:scale-105 animate-button-glow"
              >
                Start studying for free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:shadow-md transition-all hover:scale-105">
                Watch demo
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
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

          {/* Enhanced Illustration */}
          <div className="relative animate-fade-in-right">
            <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded-full mb-2 animate-skeleton"></div>
                  <div className="h-2 bg-gray-100 rounded-full w-2/3 animate-skeleton" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="h-2 bg-gray-100 rounded-full animate-skeleton"></div>
                <div className="h-2 bg-gray-100 rounded-full w-5/6 animate-skeleton" style={{animationDelay: '0.1s'}}></div>
                <div className="h-2 bg-blue-200 rounded-full w-3/4 animate-skeleton" style={{animationDelay: '0.2s'}}></div>
                <div className="h-2 bg-gray-100 rounded-full w-4/5 animate-skeleton" style={{animationDelay: '0.3s'}}></div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 animate-glow">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-blue-600 animate-pulse" />
                  <span className="font-semibold text-gray-800">
                    AI Generated Summary
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-blue-200 rounded-full animate-skeleton"></div>
                  <div className="h-2 bg-blue-100 rounded-full w-4/5 animate-skeleton" style={{animationDelay: '0.1s'}}></div>
                  <div className="h-2 bg-blue-200 rounded-full w-3/5 animate-skeleton" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl opacity-80 transform rotate-12 animate-float shadow-lg"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-3xl opacity-60 transform -rotate-12 animate-float shadow-lg" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl opacity-70 transform rotate-45 animate-float shadow-lg" style={{animationDelay: '2s'}}></div>
            
            {/* Additional decorative elements */}
            <div className="absolute top-8 left-8 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-50 animate-ping"></div>
            <div className="absolute bottom-16 right-16 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
          75% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in-right {
          from { 
            opacity: 0; 
            transform: translateX(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes skeleton {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg); 
          }
        }
        
        @keyframes button-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.2); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-skeleton {
          animation: skeleton 2s ease-in-out infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 4s ease-in-out infinite;
        }
        
        .animate-button-glow {
          animation: button-glow 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}