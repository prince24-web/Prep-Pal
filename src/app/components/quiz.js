import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw, Trophy, Target, Clock, Download, Star, Loader2 } from 'lucide-react';

const InteractiveQuiz = ({ quizData, onClose, fileName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // Timer effect - now stops when quiz is completed
  useEffect(() => {
    if (quizCompleted) return; // Don't start timer if quiz is already completed

    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizCompleted]); // Added quizCompleted as dependency

  // Reset question timer when moving to next question
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestion]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerClick = (answerIndex) => {
    if (showFeedback) return; // Prevent clicking after feedback is shown

    const correct = answerIndex === quizData.questionsData[currentQuestion].correct;
    const responseTime = Date.now() - questionStartTime;
    
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowFeedback(true);

    // Store the answer
    const newAnswer = {
      questionIndex: currentQuestion,
      selectedAnswer: answerIndex,
      correct: correct,
      responseTime: responseTime
    };

    setUserAnswers(prev => [...prev, newAnswer]);

    if (correct) {
      setScore(prev => prev + 1);
    }

    // Auto-advance after 2 seconds or wait for user click
    setTimeout(() => {
      if (currentQuestion < quizData.questionsData.length - 1) {
        // Will be handled by Next Question button
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questionsData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setQuizCompleted(false);
    setScore(0);
    setTimeElapsed(0);
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.questionsData.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGrade = () => {
    const percentage = (score / quizData.questionsData.length) * 100;
    if (percentage >= 90) return { grade: 'A+', emoji: '🏆', message: 'Outstanding!' };
    if (percentage >= 80) return { grade: 'A', emoji: '⭐', message: 'Excellent!' };
    if (percentage >= 70) return { grade: 'B', emoji: '👍', message: 'Good job!' };
    if (percentage >= 60) return { grade: 'C', emoji: '📚', message: 'Keep studying!' };
    return { grade: 'F', emoji: '💪', message: 'Try again!' };
  };

  const downloadResults = () => {
    const results = {
      quiz: quizData.topics.join(', '),
      score: `${score}/${quizData.questionsData.length}`,
      percentage: `${((score / quizData.questionsData.length) * 100).toFixed(1)}%`,
      timeElapsed: formatTime(timeElapsed),
      grade: getGrade().grade,
      questions: userAnswers.map((answer, index) => ({
        question: quizData.questionsData[answer.questionIndex].question,
        yourAnswer: quizData.questionsData[answer.questionIndex].options[answer.selectedAnswer],
        correctAnswer: quizData.questionsData[answer.questionIndex].options[quizData.questionsData[answer.questionIndex].correct],
        correct: answer.correct,
        responseTime: `${(answer.responseTime / 1000).toFixed(1)}s`
      }))
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-results-${fileName || 'quiz'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (quizCompleted) {
    const gradeInfo = getGrade();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Results Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center animate-fade-in">
            <div className="text-6xl mb-4 animate-bounce">{gradeInfo.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-xl text-gray-600 mb-6">{gradeInfo.message}</p>
            
            {/* Score Display */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-sm opacity-80">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{quizData.questionsData.length - score}</div>
                  <div className="text-sm opacity-80">Wrong</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{((score / quizData.questionsData.length) * 100).toFixed(0)}%</div>
                  <div className="text-sm opacity-80">Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
                  <div className="text-sm opacity-80">Time</div>
                </div>
              </div>
            </div>

            {/* Grade Badge */}
            <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-3 mb-6">
              <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="font-bold text-xl">Grade: {gradeInfo.grade}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </button>
              <button
                onClick={downloadResults}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Results
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all duration-300"
              >
                Close Quiz
              </button>
            </div>
          </div>

          {/* Question Review */}
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Question Review</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {userAnswers.map((answer, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${answer.correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium text-gray-900">Q{index + 1}</span>
                    <span className={`flex items-center text-sm ${answer.correct ? 'text-green-600' : 'text-red-600'}`}>
                      {answer.correct ? <CheckCircle className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
                      {answer.correct ? 'Correct' : 'Wrong'}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{quizData.questionsData[answer.questionIndex].question}</p>
                  <div className="text-xs text-gray-500">
                    Your answer: {quizData.questionsData[answer.questionIndex].options[answer.selectedAnswer]}
                    {!answer.correct && (
                      <span className="block text-green-600">
                        Correct: {quizData.questionsData[answer.questionIndex].options[quizData.questionsData[answer.questionIndex].correct]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizData.questionsData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questionsData.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Brain className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Practice Quiz</h1>
                <p className="text-sm text-gray-600">{quizData.topics.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeElapsed)}
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                {score}/{currentQuestion + (showFeedback ? 1 : 0)}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Question {currentQuestion + 1} of {quizData.questionsData.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentQ.question}</h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-xl transition-all duration-200 transform hover:scale-[1.02]";
              
              if (showFeedback) {
                if (index === currentQ.correct) {
                  // Correct answer - always green
                  buttonClass += " border-green-500 bg-green-100 text-green-800 animate-pulse";
                } else if (index === selectedAnswer && index !== currentQ.correct) {
                  // Wrong selected answer - red
                  buttonClass += " border-red-500 bg-red-100 text-red-800";
                } else {
                  // Other options - disabled
                  buttonClass += " border-gray-200 bg-gray-50 text-gray-500";
                }
              } else {
                // Before selection
                if (selectedAnswer === index) {
                  buttonClass += " border-blue-500 bg-blue-100 text-blue-800";
                } else {
                  buttonClass += " border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option}</span>
                    {showFeedback && index === currentQ.correct && (
                      <CheckCircle className="w-5 h-5 ml-auto text-green-600" />
                    )}
                    {showFeedback && index === selectedAnswer && index !== currentQ.correct && (
                      <XCircle className="w-5 h-5 ml-auto text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-xl mb-6 animate-fade-in ${isCorrect ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
              <div className="flex items-center">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                )}
                <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct! Great job!' : `Incorrect. The correct answer is: ${currentQ.options[currentQ.correct]}`}
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {showFeedback && (
              <button
                onClick={handleNextQuestion}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                {currentQuestion < quizData.questionsData.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Quiz Info */}
        <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Topics: {quizData.topics.join(', ')}</span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Exit Quiz
            </button>
          </div>
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
  );
};

// UPDATED: Enhanced Quiz Results component with proper API integration
const QuizResultsSection = ({ results, uploadedFile, onStartQuiz, isLoading = false, error = null }) => {
  const [showQuiz, setShowQuiz] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Generating Quiz...</h3>
            <p className="text-gray-600">Please wait while we create your practice quiz.</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Generation Failed</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No results yet
  if (!results) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Quiz Data Available</h3>
            <p className="text-gray-600">Upload a PDF and select &apos;Quiz&apos; to generate practice questions.</p>
          </div>
        </div>
      </div>
    );
  }

  // No quiz in results
  if (!results.quiz) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Not Available</h3>
            <p className="text-gray-600">No quiz was generated. Please ensure &apos;Quiz&apos; option was selected during processing.</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if quiz has the required structure - CRITICAL VALIDATION
  if (!results.quiz.questionsData || !Array.isArray(results.quiz.questionsData) || results.quiz.questionsData.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Invalid Quiz Data</h3>
            <p className="text-gray-600">The quiz data is incomplete. Please try regenerating the quiz.</p>
          </div>
        </div>
      </div>
    );
  }

  // Validate each question has required fields
  const validQuestions = results.quiz.questionsData.filter(q => 
    q.question && 
    Array.isArray(q.options) && 
    q.options.length === 4 && 
    typeof q.correct === 'number' && 
    q.correct >= 0 && 
    q.correct <= 3
  );

  if (validQuestions.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Invalid Question Format</h3>
            <p className="text-gray-600">The quiz questions are not properly formatted. Please regenerate the quiz.</p>
          </div>
        </div>
      </div>
    );
  }

  // Update quiz data with validated questions
  const validatedQuiz = {
    ...results.quiz,
    questionsData: validQuestions
  };

  if (showQuiz) {
    return (
      <InteractiveQuiz 
        quizData={validatedQuiz}
        onClose={() => setShowQuiz(false)}
        fileName={uploadedFile?.name}
      />
    );
  }

  // Safe access to quiz properties with fallbacks
  const topics = results.quiz.topics || ["General Topics"];
  const questionsCount = validQuestions.length;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="w-6 h-6 text-pink-600 mr-3" />
          <h3 className="text-xl font-semibold text-gray-900">Practice Quiz</h3>
        </div>
        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
          {questionsCount} questions
        </span>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-3">Topics covered:</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Preview Questions */}
      <div className="mb-6 max-h-64 overflow-y-auto">
        <h4 className="font-medium text-gray-900 mb-3">Preview Questions:</h4>
        {validQuestions.slice(0, 2).map((q, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900 mb-2">{q.question}</p>
            <div className="space-y-1">
              {q.options.slice(0, 2).map((option, optIndex) => (
                <p key={optIndex} className="text-sm text-gray-600">
                  {String.fromCharCode(65 + optIndex)}) {option}
                </p>
              ))}
              <p className="text-xs text-gray-500">... and 2 more options</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button 
          onClick={() => setShowQuiz(true)}
          className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Star className="inline w-4 h-4 mr-2" />
          Start Interactive Quiz
        </button>
        <button 
          onClick={() => {
            const blob = new Blob([JSON.stringify(validatedQuiz, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `quiz-${uploadedFile?.name || 'questions'}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="flex items-center text-pink-600 hover:text-pink-700 font-medium transition-colors hover:scale-105"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResultsSection;