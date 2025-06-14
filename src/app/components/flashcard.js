import React, { useState } from 'react';
import { BookOpen, Download, Brain, ChevronLeft, ChevronRight } from 'lucide-react';

const ModernFlashcards = ({ results = null }) => {
  // Default sample data if no results provided
  const defaultResults = {
    flashcards: {
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
    }
  };

  const flashcardData = results?.flashcards || defaultResults.flashcards;

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const currentCard = flashcardData.cards[currentCardIndex];

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentCardIndex < flashcardData.cards.length - 1) {
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
    
    const threshold = 100;
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
    const offset = e.touches[0].clientX - dragStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <BookOpen className="w-6 h-6 text-purple-600 mr-3" />
          <h3 className="text-xl font-semibold text-gray-900">Flashcards</h3>
        </div>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
          {currentCardIndex + 1} / {flashcardData.count || flashcardData.cards.length}
        </span>
      </div>

      {/* Card Stack Container */}
      <div className="relative h-80 mb-8 flex items-center justify-center overflow-hidden">
        {/* Background Cards */}
        {flashcardData.cards.map((_, index) => {
          if (Math.abs(index - currentCardIndex) > 2) return null;
          
          const offset = index - currentCardIndex;
          const isActive = offset === 0;
          
          return (
            <div
              key={index}
              className={`absolute w-full max-w-md perspective-1000 transition-all duration-300 ${
                isActive ? 'z-20' : 'z-10'
              }`}
              style={{
                transform: `translateX(${offset * 20 + (isActive ? dragOffset : 0)}px) scale(${
                  isActive ? 1 : 0.95 - Math.abs(offset) * 0.05
                })`,
                opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.3,
              }}
            >
              <div
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 transition-all duration-300 cursor-pointer select-none ${
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
                <div className="p-8 space-y-6 min-h-[280px] flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto animate-pulse mb-6">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    
                    {!isFlipped || !isActive ? (
                      <>
                        <h4 className="text-xl font-bold text-gray-900 mb-6 leading-tight">
                          {flashcardData.cards[index]?.front}
                        </h4>
                        {isActive && (
                          <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full inline-block">
                            Click to reveal answer
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-purple-600 bg-purple-100 px-4 py-2 rounded-full inline-block mb-4">
                          Answer
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {flashcardData.cards[index]?.back}
                        </p>
                        <div className="text-xs text-gray-400 mt-4">
                          Click to see question again
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

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevCard}
          disabled={currentCardIndex === 0}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
            currentCardIndex === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-105'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="text-sm text-gray-500">
          Swipe left/right or use buttons to navigate
        </div>

        <button
          onClick={nextCard}
          disabled={currentCardIndex === flashcardData.cards.length - 1}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
            currentCardIndex === flashcardData.cards.length - 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-105'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {flashcardData.cards.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                index === currentCardIndex
                  ? 'bg-purple-600'
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

      {/* Export Button */}
      <div className="flex justify-center">
        <button
          onClick={() => exportFlashcardsToAnki(flashcardData)}
          className="flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors hover:scale-105 bg-purple-50 hover:bg-purple-100 px-6 py-3 rounded-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Export to Anki
        </button>
      </div>
    </div>
  );
};

export default ModernFlashcards;