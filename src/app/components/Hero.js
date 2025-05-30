'use client';

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ArrowRight, CheckCircle, FileText, Zap } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("/upload");
  }, [router]);
    return(
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
        
    )
}