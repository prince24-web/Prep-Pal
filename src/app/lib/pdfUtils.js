// lib/pdfUtils.js
export function preprocessText(text) {
  // Clean and normalize the extracted text
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
    .replace(/[^\w\s\n\.,;:!?()-]/g, '') // Remove special characters except basic punctuation
    .trim();
}

export function chunkText(text, maxChunkSize = 8000) {
  // Split text into manageable chunks for AI processing
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const chunks = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence + '. ';
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export function validatePDFContent(text) {
  // Validate if extracted text is meaningful
  if (!text || text.trim().length < 100) {
    throw new Error('PDF content is too short or empty. Please ensure the PDF contains readable text.');
  }

  // Check if text contains mostly readable characters
  const readableChars = text.replace(/[^\w\s]/g, '').length;
  const totalChars = text.length;
  const readableRatio = readableChars / totalChars;

  if (readableRatio < 0.5) {
    throw new Error('PDF appears to contain mostly non-text content. Please ensure the PDF contains readable text.');
  }

  return true;
}

export function estimateProcessingTime(text, options) {
  const textLength = text.length;
  const baseTime = 30; // 30 seconds base
  const timePerOption = {
    summary: 60,
    flashcards: 90,
    quiz: 120
  };

  let totalTime = baseTime;
  options.forEach(option => {
    totalTime += timePerOption[option] || 60;
  });

  // Adjust for text length
  if (textLength > 5000) {
    totalTime *= 1.5;
  }
  if (textLength > 10000) {
    totalTime *= 2;
  }

  return Math.ceil(totalTime / 60); // Return in minutes
}