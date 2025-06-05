'use client'
import React, { useState } from 'react';
import { User, Calendar, Trophy, TrendingUp, FileText, Brain, Zap, Target, Award, Star, Flame, BookOpen, Clock, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    joinDate: "January 2024",
    streak: 12,
    totalSummaries: 45,
    totalQuizzes: 23,
    totalFlashcards: 167,
    studyTime: 89,
    accuracy: 87
  };

  const badges = [
    { id: 1, name: "Quick Learner", description: "Complete 10 quizzes", icon: Brain, earned: true, color: "bg-blue-500" },
    { id: 2, name: "Streak Master", description: "Maintain 7-day streak", icon: Flame, earned: true, color: "bg-orange-500" },
    { id: 3, name: "Summary Pro", description: "Generate 25 summaries", icon: FileText, earned: true, color: "bg-green-500" },
    { id: 4, name: "Flashcard Champion", description: "Create 100 flashcards", icon: Zap, earned: true, color: "bg-purple-500" },
    { id: 5, name: "Perfect Score", description: "Score 100% on a quiz", icon: Target, earned: false, color: "bg-yellow-500" },
    { id: 6, name: "Study Warrior", description: "Study for 100 hours", icon: Award, earned: false, color: "bg-red-500" }
  ];

  const recentActivity = [
    { id: 1, type: "summary", title: "Advanced Mathematics Chapter 5", time: "2 hours ago" },
    { id: 2, type: "quiz", title: "Biology Quiz - Cell Structure", time: "5 hours ago", score: 85 },
    { id: 3, type: "flashcard", title: "Spanish Vocabulary Set 3", time: "1 day ago" },
    { id: 4, type: "summary", title: "World History - Renaissance", time: "2 days ago" }
  ];

  const weeklyData = [
    { day: 'Mon', summaries: 3, quizzes: 2, flashcards: 8 },
    { day: 'Tue', summaries: 5, quizzes: 1, flashcards: 12 },
    { day: 'Wed', summaries: 2, quizzes: 4, flashcards: 6 },
    { day: 'Thu', summaries: 4, quizzes: 3, flashcards: 15 },
    { day: 'Fri', summaries: 6, quizzes: 2, flashcards: 10 },
    { day: 'Sat', summaries: 1, quizzes: 5, flashcards: 8 },
    { day: 'Sun', summaries: 3, quizzes: 1, flashcards: 5 }
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const Badge = ({ badge }) => (
    <div className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
      badge.earned 
        ? 'bg-white border-gray-200 shadow-sm' 
        : 'bg-gray-50 border-gray-100 opacity-60'
    }`}>
      <div className="flex flex-col items-center text-center">
        <div className={`${badge.color} p-3 rounded-full mb-3 ${!badge.earned && 'grayscale'}`}>
          <badge.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
        <p className="text-sm text-gray-600">{badge.description}</p>
        {badge.earned && (
          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
            <Star className="w-4 h-4 text-white fill-current" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">PrepPal Pro Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-orange-700 font-medium">{userData.streak} day streak</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-sm text-gray-500 mt-1">Member since {userData.joinDate}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-green-600 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">Pro Member</span>
              </div>
              <p className="text-sm text-gray-500">Level 12 Learner</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={FileText} 
            title="Total Summaries" 
            value={userData.totalSummaries} 
            subtitle="This month: 12"
            color="bg-blue-500" 
          />
          <StatCard 
            icon={Brain} 
            title="Quizzes Taken" 
            value={userData.totalQuizzes} 
            subtitle={`${userData.accuracy}% avg score`}
            color="bg-green-500" 
          />
          <StatCard 
            icon={Zap} 
            title="Flashcards Created" 
            value={userData.totalFlashcards} 
            subtitle="Across 8 subjects"
            color="bg-purple-500" 
          />
          <StatCard 
            icon={Clock} 
            title="Study Time" 
            value={`${userData.studyTime}h`} 
            subtitle="This month"
            color="bg-orange-500" 
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'badges', label: 'Achievements', icon: Trophy },
                { id: 'activity', label: 'Recent Activity', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
                <div className="grid grid-cols-7 gap-4">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm font-medium text-gray-600 mb-2">{day.day}</p>
                      <div className="space-y-1">
                        <div className="bg-blue-100 rounded px-2 py-1">
                          <span className="text-xs text-blue-700">{day.summaries} summaries</span>
                        </div>
                        <div className="bg-green-100 rounded px-2 py-1">
                          <span className="text-xs text-green-700">{day.quizzes} quizzes</span>
                        </div>
                        <div className="bg-purple-100 rounded px-2 py-1">
                          <span className="text-xs text-purple-700">{day.flashcards} cards</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                  <span className="text-sm text-gray-600">
                    {badges.filter(b => b.earned).length} of {badges.length} earned
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {badges.map((badge) => (
                    <Badge key={badge.id} badge={badge} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'summary' ? 'bg-blue-100' :
                        activity.type === 'quiz' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'summary' && <FileText className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'quiz' && <Brain className="w-5 h-5 text-green-600" />}
                        {activity.type === 'flashcard' && <Zap className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                      {activity.score && (
                        <div className="text-right">
                          <span className="text-lg font-semibold text-green-600">{activity.score}%</span>
                          <p className="text-xs text-gray-500">Score</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;