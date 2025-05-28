'use client'
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import Hero from "./components/Hero";
import FeatureSec from "./components/featureSec";
import CTASection from "./components/CTAsection";

export default function Home() {
   // ✅ Closing the function properly

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      {/*Hero section*/}

      <Hero />

      {/* Features Section */}

     <FeatureSec/>

      {/* CTA Section */}
      <CTASection/>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>&copy; 2025 PrepPal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
