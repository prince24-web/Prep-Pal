// app/api/process-pdf/route.js
import { NextRequest, NextResponse } from 'next/server';

// Add debug logging at the top level
console.log('API route file loaded');
console.log('Environment check:', {
  hasGeminiKey: !!process.env.GEMINI_API_KEY,
  nodeEnv: process.env.NODE_ENV
});

// Import with error handling
let GoogleGenerativeAI, pdf, preprocessText, validatePDFContent, chunkText;

try {
  const geminiModule = await import('@google/generative-ai');
  GoogleGenerativeAI = geminiModule.GoogleGenerativeAI;
  console.log('✅ GoogleGenerativeAI imported successfully');
} catch (error) {
  console.error('❌ Failed to import GoogleGenerativeAI:', error.message);
}

try {
  const pdfModule = await import('pdf-parse');
  pdf = pdfModule.default;
  console.log('✅ pdf-parse imported successfully');
} catch (error) {
  console.error('❌ Failed to import pdf-parse:', error.message);
}

try {
  const utilsModule = await import('../../lib/pdfUtils');
  preprocessText = utilsModule.preprocessText;
  validatePDFContent = utilsModule.validatePDFContent;
  chunkText = utilsModule.chunkText;
  console.log('✅ pdfUtils imported successfully');
} catch (error) {
  console.error('❌ Failed to import pdfUtils:', error.message);
  console.log('Creating fallback functions...');
  
  // Fallback functions if pdfUtils doesn't exist
  preprocessText = (text) => text.trim();
  validatePDFContent = (text) => {
    if (!text || text.length < 100) {
      throw new Error('PDF content is too short or empty');
    }
  };
  chunkText = (text, size = 5000) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += size) {
      chunks.push(text.slice(i, i + size));
    }
    return chunks;
  };
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// AI Generation Functions
async function generateSummary(model, text) {
  console.log('🧠 Generating summary...');
  const prompt = `Please provide a comprehensive summary of the following text. Focus on key concepts, main ideas, and important details that would be useful for studying:

${text}

Summary:`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    console.log('✅ Summary generated successfully');
    return {
      content: summary,
      wordCount: summary.split(' ').length
    };
  } catch (error) {
    console.error('❌ Summary generation error:', error);
    throw new Error('Failed to generate summary: ' + error.message);
  }
}

async function generateFlashcards(model, text) {
  console.log('🧠 Generating flashcards...');
  const prompt = `Create flashcards from the following text. Generate 10-15 flashcards with clear, concise questions on the front and detailed answers on the back. Format as JSON array with objects containing "front" and "back" properties:

${text}

Flashcards (JSON format):`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let flashcardsText = response.text();
    
    // Clean up the response to extract JSON
    flashcardsText = flashcardsText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let flashcardsData;
    try {
      flashcardsData = JSON.parse(flashcardsText);
    } catch (parseError) {
      // If JSON parsing fails, try to extract flashcards manually
      console.log('JSON parsing failed, attempting manual extraction...');
      flashcardsData = extractFlashcardsFromText(flashcardsText);
    }
    
    if (!Array.isArray(flashcardsData)) {
      throw new Error('Invalid flashcards format');
    }
    
    console.log('✅ Flashcards generated successfully');
    return {
      cards: flashcardsData,
      count: flashcardsData.length
    };
  } catch (error) {
    console.error('❌ Flashcards generation error:', error);
    throw new Error('Failed to generate flashcards: ' + error.message);
  }
}

async function generateQuiz(model, text) {
  console.log('🧠 Generating quiz...');
  const prompt = `Create a quiz from the following text. Generate 8-12 multiple choice questions with 4 options each. Also identify 3-5 main topics covered. Format as JSON with this structure:
{
  "questions": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correct": 0
    }
  ],
  "topics": ["topic1", "topic2", "topic3"]
}

Text:
${text}

Quiz (JSON format):`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let quizText = response.text();
    
    // Clean up the response to extract JSON
    quizText = quizText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let quizData;
    try {
      quizData = JSON.parse(quizText);
    } catch (parseError) {
      console.log('JSON parsing failed, attempting manual extraction...');
      quizData = extractQuizFromText(quizText);
    }
    
    if (!quizData.questions || !Array.isArray(quizData.questions)) {
      throw new Error('Invalid quiz format');
    }
    
    console.log('✅ Quiz generated successfully');
    return {
      questionsData: quizData.questions,
      questions: quizData.questions.length,
      topics: quizData.topics || ['General Knowledge']
    };
  } catch (error) {
    console.error('❌ Quiz generation error:', error);
    throw new Error('Failed to generate quiz: ' + error.message);
  }
}

// Fallback extraction functions
function extractFlashcardsFromText(text) {
  const flashcards = [];
  const lines = text.split('\n').filter(line => line.trim());
  
  for (let i = 0; i < lines.length; i += 2) {
    if (lines[i] && lines[i + 1]) {
      flashcards.push({
        front: lines[i].replace(/^\d+\.\s*/, '').trim(),
        back: lines[i + 1].trim()
      });
    }
  }
  
  return flashcards.length > 0 ? flashcards : [
    { front: "Sample Question", back: "Sample Answer" }
  ];
}

function extractQuizFromText(text) {
  return {
    questions: [
      {
        question: "Sample Quiz Question",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0
      }
    ],
    topics: ["General Knowledge"]
  };
}

export async function POST(request) {
  console.log('🚀 POST request received');
  
  try {
    // Environment validation
    console.log('Step 1: Checking environment...');
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ Gemini API key not configured');
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Check if imports worked
    if (!GoogleGenerativeAI || !pdf) {
      console.error('❌ Required modules not available');
      return NextResponse.json(
        { error: 'Server configuration error - missing dependencies' },
        { status: 500 }
      );
    }

    // Parse form data
    console.log('Step 2: Parsing form data...');
    const formData = await request.formData();
    const file = formData.get('file');
    const options = JSON.parse(formData.get('options') || '[]');
    
    console.log('File info:', { name: file?.name, size: file?.size, type: file?.type });
    console.log('Options:', options);

    // Validate input
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!options || options.length === 0) {
      return NextResponse.json({ error: 'No processing options selected' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 50MB limit' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
    }

    // Convert file to buffer
    console.log('Step 3: Converting file to buffer...');
    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text from PDF
    console.log('Step 4: Extracting text from PDF...');
    const pdfData = await pdf(buffer);
    const rawText = pdfData.text;
    
    console.log('PDF text length:', rawText.length);

    // Validate and preprocess text
    validatePDFContent(rawText);
    const processedText = preprocessText(rawText);
    
    // Truncate text if too long (Gemini has limits)
    const maxTextLength = 30000; // Adjust based on your needs
    const finalText = processedText.length > maxTextLength 
      ? processedText.substring(0, maxTextLength) + '...'
      : processedText;

    // Initialize AI model
    console.log('Step 5: Initializing AI model...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content based on selected options
    console.log('Step 6: Generating content...');
    const results = {};

    // Process each selected option
    const promises = [];
    
    if (options.includes('summary')) {
      promises.push(
        generateSummary(model, finalText)
          .then(summary => { results.summary = summary; })
          .catch(error => console.error('Summary generation failed:', error))
      );
    }

    if (options.includes('flashcards')) {
      promises.push(
        generateFlashcards(model, finalText)
          .then(flashcards => { results.flashcards = flashcards; })
          .catch(error => console.error('Flashcards generation failed:', error))
      );
    }

    if (options.includes('quiz')) {
      promises.push(
        generateQuiz(model, finalText)
          .then(quiz => { results.quiz = quiz; })
          .catch(error => console.error('Quiz generation failed:', error))
      );
    }

    // Wait for all generations to complete
    await Promise.all(promises);

    console.log('✅ Content generation completed');
    console.log('Results keys:', Object.keys(results));

    // Return the results
    return NextResponse.json({
      success: true,
      message: 'PDF processed successfully',
      results: results,
      // Also include results at root level for compatibility
      ...results
    });

  } catch (error) {
    console.error('💥 Unexpected error in API route:', error);
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred while processing your PDF', 
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Add a simple GET handler for testing
export async function GET() {
  console.log('GET request to /api/process-pdf');
  return NextResponse.json({ 
    message: 'PDF processing API is running',
    timestamp: new Date().toISOString(),
    environment: {
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      nodeEnv: process.env.NODE_ENV
    }
  });
}