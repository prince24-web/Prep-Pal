import { supabase } from './supabaseClient';

// Get user summaries
export async function getUserSummaries(userId) {
  const { data, error } = await supabase
    .from("summaries")
    .select("*")
    .eq("user_id", userId);
    
  if (error) {
    console.error("Error fetching summaries:", error.message);
    return [];
  }

  return data;
}

// Get user flashcards
export async function getUserFlashcards(userId) {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching flashcards:", error.message);
    return [];
  }

  return data;
}

// Get user quizzes
export async function getUserQuizzes(userId) {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching quizzes:", error.message);
    return [];
  }

  return data;
}
