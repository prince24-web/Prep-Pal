'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, Sparkles, Rocket, Bell, Calendar, Clock, Tag, ArrowRight, Star, Zap, BookOpen, Users, Shield, Smartphone, BarChart3, Gift } from 'lucide-react';

const WhatsNewPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample updates - you can replace this with dynamic data from your CMS/database
  const updates = [
    {
      id: 1,
      type: 'feature',
      title: 'New AI Quiz Generator 2.0',
      description: 'Our enhanced quiz generator now creates more diverse question types including drag-and-drop, matching, and advanced multiple choice with explanations.',
      date: '2025-05-20',
      tag: 'New Feature',
      featured: true,
      image: '/api/placeholder/400/200',
      details: [
        'Advanced question type generation',
        'Instant explanations for wrong answers',
        'Adaptive difficulty based on performance',
        'Support for image-based questions'
      ]
    },
    {
      id: 2,
      type: 'improvement',
      title: 'Faster PDF Processing',
      description: 'We\'ve optimized our AI engine to process PDFs 3x faster while maintaining the same high accuracy for summaries and content extraction.',
      date: '2025-05-18',
      tag: 'Performance',
      featured: false,
      details: [
        'Average processing time reduced to 30 seconds',
        'Support for larger PDF files (up to 100MB)',
        'Improved OCR for scanned documents',
        'Better handling of complex layouts'
      ]
    },
    {
      id: 3,
      type: 'feature',
      title: 'Mobile App Beta Launch',
      description: 'Study on the go with our new mobile app! Available for iOS and Android with full feature parity including offline study mode.',
      date: '2025-05-15',
      tag: 'New Release',
      featured: true,
      details: [
        'Full offline study capabilities',
        'Push notifications for study reminders',
        'Seamless sync with web app',
        'Touch-optimized flashcard interface'
      ]
    },
    {
      id: 4,
      type: 'announcement',
      title: 'PrepPal Pro Plans Now Available',
      description: 'Unlock advanced features with our new Pro subscription including unlimited uploads, priority processing, and collaboration tools.',
      date: '2025-05-12',
      tag: 'Announcement',
      featured: false,
      details: [
        'Unlimited PDF uploads and storage',
        'Priority AI processing queue',
        'Team collaboration features',
        'Advanced analytics dashboard'
      ]
    },
    {
      id: 5,
      type: 'feature',
      title: 'Smart Study Scheduler',
      description: 'New AI-powered study scheduler that creates personalized study plans based on your goals, available time, and learning patterns.',
      date: '2025-05-10',
      tag: 'AI Enhancement',
      featured: false,
      details: [
        'Personalized study timeline creation',
        'Integration with calendar apps',
        'Progress tracking and adjustments',
        'Spaced repetition optimization'
      ]
    },
    {
      id: 6,
      type: 'improvement',
      title: 'Enhanced Security & Privacy',
      description: 'We\'ve implemented end-to-end encryption and enhanced privacy controls to keep your study materials completely secure.',
      date: '2025-05-08',
      tag: 'Security Update',
      featured: false,
      details: [
        'End-to-end encryption for all uploads',
        'Enhanced privacy settings',
        'GDPR compliance improvements',
        'Two-factor authentication support'
      ]
    }
  ];

  const filteredUpdates = selectedFilter === 'all' 
    ? updates 
    : updates.filter(update => update.type === selectedFilter);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'feature': return <Sparkles className="w-4 h-4" />;
      case 'improvement': return <Zap className="w-4 h-4" />;
      case 'announcement': return <Bell className="w-4 h-4" />;
      default: return <Rocket className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'feature': return 'bg-blue-100 text-blue-700';
      case 'improvement': return 'bg-green-100 text-green-700';
      case 'announcement': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">New</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Stay updated with the latest features, improvements, and announcements from PrepPal. 
            We're constantly evolving to make your study experience even better.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
              }`}
            >
              All Updates
            </button>
            <button
              onClick={() => setSelectedFilter('feature')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'feature' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
              }`}
            >
              New Features
            </button>
            <button
              onClick={() => setSelectedFilter('improvement')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'improvement' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
              }`}
            >
              Improvements
            </button>
            <button
              onClick={() => setSelectedFilter('announcement')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'announcement' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
              }`}
            >
              Announcements
            </button>
          </div>
        </div>
      </section>

      {/* Updates Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {filteredUpdates.map((update, index) => (
              <div key={update.id} className={`${
                update.featured 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                  : 'bg-white border border-blue-100'
              } rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}>
                
                {update.featured && (
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white/90">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">Featured Update</span>
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          update.featured 
                            ? 'bg-white/20 text-white' 
                            : getTypeColor(update.type)
                        }`}>
                          {getTypeIcon(update.type)}
                          {update.tag}
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${
                          update.featured ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          {formatDate(update.date)}
                        </div>
                      </div>
                      
                      <h2 className={`text-2xl font-bold mb-4 ${
                        update.featured ? 'text-white' : 'text-gray-900'
                      }`}>
                        {update.title}
                      </h2>
                      
                      <p className={`text-lg leading-relaxed mb-6 ${
                        update.featured ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {update.description}
                      </p>
                      
                      <div className="space-y-2">
                        {update.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <ArrowRight className={`w-4 h-4 ${
                              update.featured ? 'text-white/70' : 'text-blue-600'
                            }`} />
                            <span className={`${
                              update.featured ? 'text-white/90' : 'text-gray-700'
                            }`}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Optional image placeholder */}
                    <div className="lg:w-80">
                      <div className={`w-full h-48 rounded-xl ${
                        update.featured 
                          ? 'bg-white/10 backdrop-blur-sm' 
                          : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                      } flex items-center justify-center`}>
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                          update.featured 
                            ? 'bg-white/20' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                        }`}>
                          {update.type === 'feature' && <Sparkles className="w-8 h-8 text-white" />}
                          {update.type === 'improvement' && <Zap className="w-8 h-8 text-white" />}
                          {update.type === 'announcement' && <Bell className="w-8 h-8 text-white" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay in the Loop</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get notified about new features, updates, and tips to maximize your PrepPal experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Try These New Features?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience the latest improvements and start studying smarter with PrepPal today.
          </p>
          <Link href="/upload">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
              Start Using PrepPal
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
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
  );
};

export default WhatsNewPage;