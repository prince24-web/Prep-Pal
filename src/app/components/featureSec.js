import { FileText, BookOpen, Brain } from "lucide-react";

export default function FeatureSec() {
  return (
    <section id="features" className="px-6 py-16 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400/15 to-teal-400/15 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Floating Knowledge Icons */}
        <div className="absolute top-16 right-1/4 text-blue-300/30 animate-bounce delay-500">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 5.26L16 2L15.74 5.29L19 3L17.71 6.16L21 5L18.84 7.79L22 8L18.79 9.21L21 11L17.71 10.84L19 14L15.74 11.71L16 15L13.09 11.74L12 15L10.91 11.74L8 15L8.26 11.71L5 14L6.29 10.84L3 11L5.16 9.21L2 8L5.21 7.79L3 5L6.29 6.16L5 3L8.26 5.29L8 2L10.91 5.26L12 2Z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 text-purple-300/30 animate-bounce delay-1500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
          </svg>
        </div>
        <div className="absolute top-1/3 left-16 text-green-300/30 animate-bounce delay-3000">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/>
          </svg>
        </div>
        
        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1"/>
              <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="line2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.1"/>
              <stop offset="50%" stopColor="rgb(236, 72, 153)" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          <path
            d="M-50,100 Q200,80 400,120 T800,100"
            stroke="url(#line1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M-50,300 Q300,250 600,280 T1200,260"
            stroke="url(#line2)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse delay-1000"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Everything you need to study efficiently
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-200">
            Our AI-powered tools transform your study materials into engaging,
            personalized learning experiences that help you retain information
            better.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm animate-fade-in delay-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-blue-200">
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

          <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm animate-fade-in delay-500">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-purple-200">
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

          <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm animate-fade-in delay-700">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-green-200">
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

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1500 {
          animation-delay: 1.5s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
        
        .delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </section>
  );
}