import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
export default function CTASection(){
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push("/upload");
        }, [router]);
    return(
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
    )
}