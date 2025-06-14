import React, { useState } from 'react';
import { BookOpen, Download, Brain, ChevronLeft, ChevronRight } from 'lucide-react';

const ModernFlashcards = ({ flashcardData = null, isLoading = false }) => {
  // ✅ MOVE ALL HOOKS TO THE TOP - BEFORE ANY CONDITIONAL LOGIC
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Default sample data if no flashcardData provided
  const defaultData = {
    count: 6,
    cards: [
      {
        front: "What is supervised learning?",
        back: "A type of machine learning where algorithms learn from labeled training data to make predictions or decisions on new, unseen data."
      },
      {
        front: "What is the difference between classification and regression?",
        back: "Classification predicts discrete categories or classes, while regression predicts continuous numerical values."
      },
      {
        front: "What is overfitting?",
        back: "When a model learns the training data too well, including noise and outliers, leading to poor performance on new data."
      },
      {
        front: "What is cross-validation?",
        back: "A technique to evaluate model performance by splitting data into multiple folds and training/testing on different combinations."
      },
      {
        front: "What is feature engineering?",
        back: "The process of selecting, modifying, or creating new features from raw data to improve model performance."
      },
      {
        front: "What is the bias-variance tradeoff?",
        back: "The balance between a model's ability to minimize bias (underfitting) and variance (overfitting) to achieve optimal performance."
      }
    ]
  };

  const currentFlashcardData = flashcardData || defaultData;

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg mx-2 sm:mx-0">
        <div className="flex items-center justify-center h-64 sm:h-80">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto animate-spin">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 px-4">Generating flashcards...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show message if no flashcards available
  if (!currentFlashcardData.cards || currentFlashcardData.cards.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg mx-2 sm:mx-0">
        <div className="flex items-center justify-center h-64 sm:h-80">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 px-4">No flashcards available. Upload a document to generate flashcards.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = currentFlashcardData.cards[currentCardIndex];

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentCardIndex < currentFlashcardData.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 50; // Reduced threshold for mobile
    if (dragOffset > threshold) {
      prevCard();
    } else if (dragOffset < -threshold) {
      nextCard();
    }
    
    setDragStart(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !dragStart) return;
    e.preventDefault(); // Prevent scrolling while swiping
    const offset = e.touches[0].clientX - dragStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    
    const threshold = 50; // Reduced threshold for mobile
    if (dragOffset > threshold) {
      prevCard();
    } else if (dragOffset < -threshold) {
      nextCard();
    }
    
    setDragStart(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  const exportFlashcardsToAnki = (flashcards) => {
    console.log('Exporting flashcards to Anki:', flashcards);
    alert('Export functionality would be implemented here!');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in mx-2 sm:mx-0" style={{ animationDelay: '0.2s' }}>
      {/* Header - Mobile Optimized */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
        <div className="flex items-center">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mr-2 sm:mr-3" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Flashcards</h3>
        </div>
        <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium animate-pulse">
          {currentCardIndex + 1} / {currentFlashcardData.count || currentFlashcardData.cards.length}
        </span>
      </div>

      {/* Card Stack Container - Mobile Optimized */}
      <div className="relative h-72 sm:h-80 lg:h-96 mb-4 sm:mb-6 lg:mb-8 flex items-center justify-center overflow-hidden px-2 sm:px-0">
        {/* Background Cards */}
        {currentFlashcardData.cards.map((_, index) => {
          if (Math.abs(index - currentCardIndex) > 2) return null;
          
          const offset = index - currentCardIndex;
          const isActive = offset === 0;
          
          return (
            <div
              key={index}
              className={`absolute w-full max-w-sm sm:max-w-md perspective-1000 transition-all duration-300 ${
                isActive ? 'z-20' : 'z-10'
              }`}
              style={{
                transform: `translateX(${offset * 15 + (isActive ? dragOffset : 0)}px) scale(${
                  isActive ? 1 : 0.95 - Math.abs(offset) * 0.05
                })`,
                opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.3,
              }}
            >
              <div
                className={`bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-blue-100 transition-all duration-300 cursor-pointer select-none ${
                  isActive ? 'hover:shadow-2xl' : ''
                } ${isDragging && isActive ? 'cursor-grabbing' : 'cursor-grab'}`}
                onClick={isActive ? handleCardFlip : undefined}
                onMouseDown={isActive ? handleMouseDown : undefined}
                onMouseMove={isActive ? handleMouseMove : undefined}
                onMouseUp={isActive ? handleMouseUp : undefined}
                onMouseLeave={isActive ? handleMouseUp : undefined}
                onTouchStart={isActive ? handleTouchStart : undefined}
                onTouchMove={isActive ? handleTouchMove : undefined}
                onTouchEnd={isActive ? handleTouchEnd : undefined}
              >
                <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 min-h-[260px] sm:min-h-[280px] lg:min-h-[320px] flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto animate-pulse mb-4 sm:mb-6">
                      <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    
                    {!isFlipped || !isActive ? (
                      <>
                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
                          {currentFlashcardData.cards[index]?.front}
                        </h4>
                        {isActive && (
                          <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 sm:px-4 py-2 rounded-full inline-block">
                            Tap to reveal answer
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="text-xs sm:text-sm text-purple-600 bg-purple-100 px-3 sm:px-4 py-2 rounded-full inline-block mb-3 sm:mb-4">
                          Answer
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed px-2">
                          {currentFlashcardData.cards[index]?.back}
                        </p>
                        <div className="text-xs text-gray-400 mt-3 sm:mt-4">
                          Tap to see question again
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls - Mobile Optimized */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-0">
        <button
          onClick={prevCard}
          disabled={currentCardIndex === 0}
          className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all touch-manipulation ${
            currentCardIndex === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <div className="text-xs sm:text-sm text-gray-500 text-center px-2 hidden sm:block">
          Swipe left/right or use buttons
        </div>
        <div className="text-xs text-gray-500 text-center px-2 sm:hidden">
          Swipe or tap buttons
        </div>

        <button
          onClick={nextCard}
          disabled={currentCardIndex === currentFlashcardData.cards.length - 1}
          className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all touch-manipulation ${
            currentCardIndex === currentFlashcardData.cards.length - 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 active:scale-95'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Progress Indicator - Mobile Optimized */}
      <div className="flex justify-center mb-4 sm:mb-6 px-2">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto max-w-full">
          {currentFlashcardData.cards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer touch-manipulation flex-shrink-0 ${
                index === currentCardIndex
                  ? 'bg-purple-600 scale-125'
                  : index < currentCardIndex
                  ? 'bg-green-400'
                  : 'bg-gray-300'
              }`}
              onClick={() => {
                setCurrentCardIndex(index);
                setIsFlipped(false);
              }}
            />
          ))}
        </div>
      </div>

      {/* Export Button - Mobile Optimized */}
      <div className="flex justify-center">
        <button
          onClick={() => exportFlashcardsToAnki(currentFlashcardData)}
          className="flex items-center text-purple-600 hover:text-purple-700 active:text-purple-800 font-medium transition-all bg-purple-50 hover:bg-purple-100 active:bg-purple-200 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base touch-manipulation active:scale-95"
        >
          <Download className="w-4 h-4 mr-2" />
          Export to Anki
        </button>
      </div>

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .perspective-1000 {
            perspective: 800px;
          }
        }
        
        .touch-manipulation {
          touch-action: manipulation;
        }
        
        /* Prevent text selection on mobile */
        .select-none {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
        
        /* Improve touch targets */
        @media (max-width: 640px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Smooth scrolling for progress indicators */
        .overflow-x-auto {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ModernFlashcards;