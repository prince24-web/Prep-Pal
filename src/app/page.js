'use client'
import React, { useCallback } from "react";
import {
  BookOpen,
  FileText,
  Brain,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Hero from "./components/Hero";

export default function Home() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("/upload");
  }, [router]); // ✅ Closing the function properly

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      {/*Hero section*/}
      <Hero />

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
