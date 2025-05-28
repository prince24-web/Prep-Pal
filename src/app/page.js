'use client'
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import Hero from "./components/Hero";
import FeatureSec from "./components/featureSec";

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
     <FeatureSec/>
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
