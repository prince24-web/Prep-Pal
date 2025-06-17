// Fixed API route - paste-2.txt replacement
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pdf from 'pdf-parse';
import { 
  preprocessText, 
  chunkText, 
  validatePDFContent, 
  estimateProcessingTime 
} from '../../lib/pdfUtils';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    console.log('🚀 Starting PDF processing...');
    
    // Parse request body
    const { filePath, fileName, options } = await request.json();
    
    if (!filePath || !options || !Array.isArray(options)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: filePath, options' },
        { status: 400 }
      );
    }

    console.log('📋 Processing options:', options);
    console.log('📁 File path:', filePath);

    // Properly await cookies before using
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore 
    });

    // Step 1: Download file from Supabase Storage
    console.log('📥 Downloading file from Supabase Storage...');
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(filePath);

    if (downloadError) {
      console.error('❌ Download error:', downloadError);
      return NextResponse.json(
        { success: false, error: `Failed to download file: ${downloadError.message}` },
        { status: 500 }
      );
    }

    // Step 2: Convert Blob to Buffer for PDF parsing
    console.log('🔄 Converting file to buffer...');
    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Step 3: Extract and clean text from PDF
    console.log('📄 Extracting text from PDF...');
    const pdfData = await pdf(buffer);
    const rawText = pdfData.text;

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'No text could be extracted from the PDF' },
        { status: 400 }
      );
    }

    console.log(`📊 Extracted ${rawText.length} characters from PDF`);
    
    // Step 4: Clean and preprocess the extracted text
    console.log('🧹 Preprocessing PDF text...');
    const preprocessedText = preprocessText(rawText);
    
    // Step 5: Validate PDF content quality
    console.log('✅ Validating PDF content...');
    try {
      validatePDFContent(preprocessedText);
    } catch (validationError) {
      return NextResponse.json(
        { success: false, error: validationError.message },
        { status: 400 }
      );
    }
    
    console.log(`✨ Preprocessed text: ${preprocessedText.length} characters`);
    console.log(`⏱️ Processing document directly (no chunking)`);

    // Step 7: Process with Gemini AI based on selected options
    const results = {};
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Process each selected option with rate limit handling
    for (const option of options) {
      console.log(`🤖 Processing ${option}...`);
      
      try {
        switch (option) {
          case 'summary':
            results.summary = await generateSummaryDirect(model, preprocessedText);
            break;
          case 'flashcards':
            results.flashcards = await generateFlashcardsDirect(model, preprocessedText);
            break;
          case 'quiz':
            results.quiz = await generateQuizDirect(model, preprocessedText);
            break;
          default:
            console.warn(`⚠️ Unknown option: ${option}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${option}:`, error);
        
        // Handle rate limits specifically
        if (error.status === 429) {
          return NextResponse.json({
            success: false,
            error: 'Rate limit exceeded. Please wait 30 seconds and try again.',
            retryAfter: 30
          }, { status: 429 });
        }
        
        // Continue with other options even if one fails
        results[option] = { error: `Failed to generate ${option}: ${error.message}` };
      }
    }

    console.log('✅ Processing completed successfully');
    
    return NextResponse.json({
      success: true,
      ...results,
      fileName,
      processedAt: new Date().toISOString(),
      textLength: preprocessedText.length
    });

  } catch (error) {
    console.error('❌ API Route Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'An unexpected error occurred while processing your PDF' 
      },
      { status: 500 }
    );
  }
}

// Direct summary generation without chunking
async function generateSummaryDirect(model, text) {
  const maxLength = 100000;
  const inputText = text.length > maxLength 
    ? text.substring(0, maxLength) + '...[content truncated for processing]'
    : text;
    
  console.log(`📝 Processing entire document (${inputText.length} characters)`);
  
  const prompt = `
    Please analyze the following document and create a comprehensive, well-structured summary.
    
    Requirements:
    - Create 3-5 main sections with clear headings
    - Include key concepts, definitions, and important details
    - Use bullet points for clarity where appropriate
    - Keep it concise but comprehensive (300-500 words)
    - Focus on the most important information for studying
    
    Document content:
    ${inputText}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Direct flashcard generation without chunking
async function generateFlashcardsDirect(model, text) {
  const maxLength = 80000;
  const inputText = text.length > maxLength 
    ? text.substring(0, maxLength) + '...[content truncated]'
    : text;
    
  console.log(`🎴 Processing entire document for flashcards (${inputText.length} characters)`);
  
  const prompt = `
    Create flashcards from the following document content. 
    
    Requirements:
    - Generate 15-20 flashcards from the entire document
    - Focus on key concepts, definitions, formulas, and important facts
    - Questions should be clear and concise
    - Answers should be comprehensive but not too long
    - Include a mix of definition, concept, and application questions
    
    Return the response in this exact JSON format:
    {
      "cards": [
        {
          "front": "Question or term",
          "back": "Answer or definition",
          "category": "concept/definition/application"
        }
      ]
    }
    
    Document content:
    ${inputText}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text();
  
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      if (data.cards && Array.isArray(data.cards)) {
        const finalCards = data.cards.map((card, index) => ({
          id: index + 1,
          ...card
        }));
        
        return {
          title: `Flashcards (${finalCards.length} cards)`,
          cards: finalCards
        };
      }
    }
    throw new Error('Invalid flashcard format');
  } catch (parseError) {
    console.error(`❌ Failed to parse flashcards:`, parseError);
    return {
      title: "Flashcards",
      cards: [{
        id: 1,     
        front: "Unable to generate flashcards",
        back: "There was an error processing the content for flashcards.",
        category: "error"
      }]
    };
  }
}

// FIXED: Quiz generation that matches the React component's expected format
async function generateQuizDirect(model, text) {
  const maxLength = 80000;
  const inputText = text.length > maxLength 
    ? text.substring(0, maxLength) + '...[content truncated]'
    : text;
    
  console.log(`❓ Processing entire document for quiz (${inputText.length} characters)`);
  
  const prompt = `
    Create a comprehensive quiz from the following document content.
    
    Requirements:
    - Generate 12-15 multiple choice questions
    - Include questions of varying difficulty (easy, medium, hard)
    - Focus on key concepts and important details
    - Each question should have 4 options
    - Identify key topics covered in the document
    
    Return the response in this EXACT JSON format (this is critical for proper integration):
    {
      "topics": ["Topic 1", "Topic 2", "Topic 3"],
      "questionsData": [
        {
          "question": "Question text here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correct": 0,
          "explanation": "Explanation of why this answer is correct"
        }
      ]
    }
    
    IMPORTANT: 
    - "correct" should be the index (0, 1, 2, or 3) of the correct answer
    - "topics" should be an array of main topics/subjects covered
    - "questionsData" should contain all questions
    
    Document content:
    ${inputText}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text();
  
  try {
    // Clean up the response to extract JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      
      // Validate the structure matches what InteractiveQuiz expects
      if (!parsedData.topics || !Array.isArray(parsedData.topics)) {
        parsedData.topics = ["General Topics"];
      }
      
      if (!parsedData.questionsData || !Array.isArray(parsedData.questionsData)) {
        throw new Error('No valid questions data found');
      }
      
      // Validate each question has the required structure
      parsedData.questionsData = parsedData.questionsData.map((q, index) => ({
        question: q.question || `Question ${index + 1}`,
        options: Array.isArray(q.options) && q.options.length === 4 
          ? q.options 
          : ["Option A", "Option B", "Option C", "Option D"],
        correct: typeof q.correct === 'number' && q.correct >= 0 && q.correct <= 3 
          ? q.correct 
          : 0,
        explanation: q.explanation || "No explanation provided"
      }));
      
      console.log(`✅ Generated quiz with ${parsedData.questionsData.length} questions and topics: ${parsedData.topics.join(', ')}`);
      return parsedData;
      
    } else {
      throw new Error('No valid JSON found in response');
    }
  } catch (parseError) {
    console.error('❌ Failed to parse quiz JSON:', parseError);
    console.error('❌ Raw response:', responseText);
    
    // Return a fallback structure that matches InteractiveQuiz expectations
    return {
      topics: ["General Topics"],
      questionsData: [
        {
          question: "Unable to generate quiz questions from the document. Please try again.",
          options: [
            "There was an error processing the content", 
            "Please try uploading the document again", 
            "Contact support if this persists", 
            "Check your internet connection"
          ],
          correct: 1,
          explanation: "There was an error processing the content for quiz questions. Please try again or contact support."
        }
      ]
    };
  }
}