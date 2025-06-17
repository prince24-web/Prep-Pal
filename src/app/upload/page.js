'use client'
import React, { useState, useRef } from 'react';
import { Upload, FileText, Brain, BookOpen, Zap, X, Check, ArrowRight, Download, LogOut, User, AlertCircle } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';
import QuizResultsSection from '../components/quiz';
import ModernFlashcards from '../components/flashcard';

const PDFUploadPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // NEW: Track upload state
  const [processingStep, setProcessingStep] = useState(0);
  const [results, setResults] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

   // ADD THESE MISSING STATE VARIABLES
  const [flashcardData, setFlashcardData] = useState(null);
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false);
  
  // Get user info on component mount
  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const generationOptions = [
    {
      id: 'summary',
      title: 'Smart Summary',
      description: 'Get concise, AI-powered summaries of key concepts',
      icon: <FileText className="w-6 h-6" />,
      color: 'blue',
      time: '~2 minutes'
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Generate interactive flashcards for active recall',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'purple',
      time: '~3 minutes'
    },
    {
      id: 'quiz',
      title: 'Practice Quiz',
      description: 'Create quizzes to test your understanding',
      icon: <Brain className="w-6 h-6" />,
      color: 'pink',
      time: '~4 minutes'
    }
  ];

  // UPDATED: More detailed processing steps
  const processingSteps = [
    'Uploading PDF to secure storage...',
    'Analyzing PDF structure...',
    'Extracting text content...',
    'Processing with AI...',
    'Generating study materials...',
    'Almost done!'
  ];

  const handleFileSelect = (file) => {
    if (file && file.type === 'application/pdf') {
      // Check file size (limit to 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size exceeds 50MB limit');
        return;
      }
      setUploadedFile(file);
      setResults(null);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const toggleOption = (optionId) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  // UPDATED: New upload function for Supabase Storage
  const uploadToSupabase = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `pdfs/${fileName}`;

    const { data, error } = await supabase.storage
      .from('documents') // Make sure this bucket exists in Supabase
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    return data.path;
  };

  // UPDATED: New handleGenerate function with Supabase Storage flow
  const handleGenerate = async () => {
    if (!uploadedFile || selectedOptions.length === 0) return;

    setIsProcessing(true);
    setIsUploading(true);
    setProcessingStep(0);
    setError(null);
    
    // Set loading states for specific components
    if (selectedOptions.includes('flashcards')) {
      setIsGeneratingFlashcards(true);
    }

    try {
      console.log('🚀 Starting PDF processing with options:', selectedOptions);

      // Simulate processing steps for UI - more frequent updates
      const progressInterval = setInterval(() => {
        setProcessingStep(prev => {
          if (prev < processingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 1500);

      // Step 1: Upload to Supabase Storage
      console.log('📤 Uploading to Supabase Storage...');
      const filePath = await uploadToSupabase(uploadedFile);
      console.log('✅ File uploaded successfully:', filePath);
      
      setIsUploading(false);
      setProcessingStep(1); // Move to next step

      // Step 2: Process via API route with file path
      console.log('🤖 Processing with AI...');
      const response = await fetch('/api/process-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath: filePath,
          fileName: uploadedFile.name,
          options: selectedOptions
        }),
      });

      clearInterval(progressInterval);

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process PDF');
      }

      const data = await response.json();
      
      console.log('📦 Full API Response:', data);
      console.log('📦 Response success:', data?.success);
      
      if (data?.success) {
        // Process the results
        let processedResults = {};
        
        // Handle summary
        if (data.summary) {
          processedResults.summary = {
            content: data.summary
          };
        }
        
        // Handle flashcards
        if (data.flashcards) {
          console.log('🎴 Setting flashcard data:', data.flashcards);
          setFlashcardData(data.flashcards);
          processedResults.flashcards = data.flashcards;
        }
        
        // Handle quiz
        if (data.quiz) {
          processedResults.quiz = data.quiz;
        }
        
        console.log('🎯 Final results being set:', processedResults);
        setResults(processedResults);
        setProcessingStep(processingSteps.length - 1);
        
      } else {
        throw new Error(data?.error || 'Processing failed - success was false');
      }

    } catch (error) {
      console.error('❌ Processing error:', error);
      setError(error.message || 'An error occurred while processing your PDF');
    } finally {
      setIsProcessing(false);
      setIsUploading(false);
      setIsGeneratingFlashcards(false);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setSelectedOptions([]);
    setResults(null);
    setIsProcessing(false);
    setIsUploading(false);
    setProcessingStep(0);
    setError(null);
    setFlashcardData(null);
  };

  const downloadContent = (content, filename, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportFlashcardsToAnki = (flashcards) => {
    const ankiFormat = flashcards.cards.map(card => 
      `${card.front}\t${card.back}`
    ).join('\n');
    downloadContent(ankiFormat, 'flashcards.txt', 'text/plain');
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 bg-blue-300 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '3s' }}></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 opacity-10 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 opacity-15 animate-spin" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-20 h-20 bg-gradient-to-r from-pink-400 to-blue-400 opacity-10 rotate-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated Gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-transparent opacity-10 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-400 to-transparent opacity-10 rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400 to-transparent opacity-10 rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-16 right-1/4 opacity-10 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <div className="absolute bottom-1/4 left-16 opacity-10 animate-bounce" style={{ animationDelay: '1.5s' }}>
          <Brain className="w-10 h-10 text-purple-600" />
        </div>
        <div className="absolute top-1/3 right-16 opacity-10 animate-bounce" style={{ animationDelay: '2.5s' }}>
          <BookOpen className="w-6 h-6 text-pink-600" />
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Transform Your PDFs into 
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Study Materials
              </span>
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Upload your PDF and let our AI create summaries, flashcards, and quizzes
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {!isProcessing && !results && (
            <>
              {/* File Upload Area */}
              <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div
                  className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 backdrop-blur-sm ${
                    isDragOver 
                      ? 'border-blue-500 bg-blue-50/70 scale-105' 
                      : uploadedFile
                      ? 'border-green-500 bg-green-50/70 scale-105'
                      : 'border-gray-300 bg-white/70 hover:border-blue-400 hover:bg-blue-50/70 hover:scale-105'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />

                  {uploadedFile ? (
                    <div className="flex items-center justify-center space-x-4 animate-fade-in">
                      <FileText className="w-12 h-12 text-green-600 animate-bounce" />
                      <div className="text-left">
                        <p className="text-lg font-semibold text-green-800">{uploadedFile.name}</p>
                        <p className="text-sm text-green-600">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={resetUpload}
                        className="ml-4 p-2 text-gray-500 hover:text-red-500 transition-colors hover:scale-110"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Drop your PDF here or click to browse
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Support for PDF files up to 50MB
                      </p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Generation Options */}
              {uploadedFile && (
                <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    What would you like to generate?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {generationOptions.map((option, index) => (
                      <div
                        key={option.id}
                        onClick={() => toggleOption(option.id)}
                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 backdrop-blur-sm animate-fade-in ${
                          selectedOptions.includes(option.id)
                            ? `border-${option.color}-500 bg-${option.color}-50/70 scale-105`
                            : 'border-gray-200 bg-white/70 hover:border-gray-300'
                        }`}
                        style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                      >
                        {selectedOptions.includes(option.id) && (
                          <div className="absolute top-4 right-4 animate-bounce">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        )}
                        <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center transition-all duration-300 ${
                          option.color === 'blue' ? 'bg-blue-100' :
                          option.color === 'purple' ? 'bg-purple-100' :
                          'bg-pink-100'
                        } ${selectedOptions.includes(option.id) ? 'animate-pulse' : ''}`}>
                          <div className={`${
                            option.color === 'blue' ? 'text-blue-600' :
                            option.color === 'purple' ? 'text-purple-600' :
                            'text-pink-600'
                          }`}>
                            {option.icon}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {option.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{option.description}</p>
                        <span className="text-sm text-gray-500">{option.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Generate Button */}
              {uploadedFile && selectedOptions.length > 0 && (
                <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
                  <button
                    onClick={handleGenerate}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl font-medium text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Zap className="inline w-5 h-5 mr-2" />
                    Generate Study Materials
                    <ArrowRight className="inline w-5 h-5 ml-2" />
                  </button>
                  <p className="text-sm text-gray-600 mt-4">
                    Estimated processing time: ~{Math.max(...selectedOptions.map(id => 
                      generationOptions.find(opt => opt.id === id)?.time.match(/\d+/)[0]
                    ))} minutes
                  </p>
                </div>
              )}
            </>
          )}

          {/* Processing State - UPDATED with upload status */}
          {isProcessing && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin">
                  <div className="w-full h-full bg-white rounded-full m-1"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {isUploading ? (
                    <Upload className="w-8 h-8 text-blue-600 animate-bounce" />
                  ) : (
                    <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isUploading ? 'Uploading Your PDF' : 'Processing Your PDF'}
              </h2>
              <p className="text-lg text-gray-600 mb-8 animate-pulse">
                {processingSteps[processingStep]}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 animate-pulse"
                  style={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                {processingStep + 1} of {processingSteps.length} steps completed
              </p>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Study Materials Are Ready!
                </h2>
                <p className="text-lg text-gray-600">
                  Generated from {uploadedFile.name}
                </p>
              </div>

              <div className="grid gap-6">
                {results.summary && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                    <div className="flex items-center mb-4">
                      <FileText className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Smart Summary</h3>
                    </div>
                    <div className="text-gray-700 mb-6 whitespace-pre-wrap">{results.summary.content}</div>
                    <button 
                      onClick={() => downloadContent(results.summary.content, 'summary.txt')}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors hover:scale-105"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Summary
                    </button>
                  </div>
                )}

                {/* Show flashcards when results are available */}
                {selectedOptions.includes('flashcards') && (
                  <ModernFlashcards
                    flashcardData={flashcardData} 
                    isLoading={isGeneratingFlashcards} 
                  />
                )}
            
                {/* Quiz Section */}


                <QuizResultsSection results={results} uploadedFile={uploadedFile} onStartQuiz={() => {}}/>
              </div>

              <div className="text-center pt-8">
                <button
                  onClick={resetUpload}
                  className="bg-gray-100/80 backdrop-blur-sm text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  Upload Another PDF
                </button>
              </div>
            </div>
          )}
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
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
    </ProtectedRoute>
  );
};

export default PDFUploadPage;