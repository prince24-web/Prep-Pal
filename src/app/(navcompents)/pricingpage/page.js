
"use client"
import React, { useState, useCallback } from 'react';
import { Check, Star, ArrowRight, BookOpen, Brain, FileText, Zap, Shield, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();
    const handleClick = useCallback(() => {
       router.push("/upload");
      console.log("Navigate to upload page");
    }, [router]);

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out our AI study tools",
      price: { monthly: 0, annual: 0 },
      popular: false,
      features: [
        "10 credits per month",
        "30 pages summarization per month",
        "20 flashcards per month",
        "2 sets quiz questions per month",
        "Standard processing speed"
      ],
      limitations: [
        "Watermarked exports",
        "Basic support only"
      ],
      cta: "Get Started Free",
      ctaStyle: "border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
    },
    {
      name: "Starter",
      description: "For serious students and professionals",
      price: { monthly: 3.99, annual: 2.99 },
      popular: true,
      features: [
        "Unlimited PDF uploads",
        "AI-powered smart summaries",
        "1300 pages of pdf",
        "140 sets of 10-flashcards",
        "120 quizzes",
        "Priority processing",
        "Advanced quiz types",
        "Export to Anki",
        "Study analytics",
        "Email support"
      ],
      limitations: [],
      cta: "Start 7-Day Trial",
      ctaStyle: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
    },
    {
      name: "Pro",
      description: "For study groups and educational institutions",
      price: { monthly: 5.99, annual: 4.49 },
      popular: false,
      features: [
        "Unlimited pages, flashcard, and quizzes",
        "Adaptive Quiz Mode",
        "Multi-language summaries & quiz",
        "Detailed progress tracking",
        "Advanced analytics",
        "Priority live chat support",
      ],
      limitations: [],
      cta: "Start Team Trial",
      ctaStyle: "border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
    }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Summaries",
      description: "Our advanced AI reads your PDFs and creates concise, intelligent summaries that capture key concepts.",
      color: "blue"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Smart Flashcards",
      description: "Automatically generate flashcards from your study materials with spaced repetition algorithms.",
      color: "purple"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Interactive Quizzes",
      description: "Test your knowledge with auto-generated quizzes tailored to your learning materials.",
      color: "pink"
    }
  ];

  const faqs = [
    {
      question: "How many PDFs can I upload?",
      answer: "Free users get 3 PDFs per month, while Pro and Teams users have unlimited uploads."
    },
    {
      question: "What file formats do you support?",
      answer: "We currently support PDF files up to 50MB. We're working on adding support for Word docs and PowerPoint."
    },
    {
      question: "Can I export my flashcards?",
      answer: "Yes! Pro users can export flashcards to popular apps like Anki, Quizlet, and as CSV files."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and never store your documents longer than necessary for processing."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes! Students get 50% off any paid plan. Just verify your student status with your .edu email."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
    

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-200 rounded-full opacity-25"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-powered tools that
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              elevate your learning
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your PDFs into interactive study materials with our intelligent summarization, 
            flashcard generation, and quiz creation tools.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Save 25%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 text-sm font-medium">
                  <Star className="inline w-4 h-4 mr-1" />
                  Most Popular
                </div>
              )}
              
              <div className={`px-8 py-10 ${plan.popular ? 'pt-16' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-8">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-600 ml-2 text-lg">
                      /month
                    </span>
                  )}
                  {isAnnual && plan.price.monthly > 0 && (
                    <div className="text-sm text-gray-500 mt-2">
                      Billed annually (${(plan.price.annual * 12).toFixed(2)}/year)
                    </div>
                  )}
                </div>

                <button
                  className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 mb-8 ${plan.ctaStyle} transform hover:scale-105 shadow-lg`}
                >
                  {plan.cta}
                  <ArrowRight className="inline w-4 h-4 ml-2" />
                </button>

                <div className="space-y-4">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Supercharge Your Study Sessions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered tools transform how you learn from PDFs, making studying more efficient and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${
                  feature.color === 'blue' ? 'from-blue-100 to-blue-200' :
                  feature.color === 'purple' ? 'from-purple-100 to-purple-200' :
                  'from-pink-100 to-pink-200'
                } mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`${
                    feature.color === 'blue' ? 'text-blue-600' :
                    feature.color === 'purple' ? 'text-purple-600' :
                    'text-pink-600'
                  }`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-blue-100">PDFs Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-blue-100">Flashcards Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of students who have revolutionized their study habits with our AI-powered tools. 
            Start your free trial today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={handleClick}className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Free Trial
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default PricingPage;