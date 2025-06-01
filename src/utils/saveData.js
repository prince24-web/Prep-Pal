import { supabase } from "./supabaseClient";

export async function saveSummary(userId, title, content) {
  const { data, error } = await supabase
    .from("summaries")
    .insert({ user_id: userId, title, content });

  if (error) {
    console.error("Error saving summary:", error.message);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function saveFlashcards(userId, title, cards) {
  const { data, error } = await supabase
    .from("flashcards")
    .insert({ user_id: userId, title, cards });

  if (error) {
    console.error("Error saving flashcards:", error.message);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function saveQuiz(userId, title, questions) {
  const { data, error } = await supabase
    .from("quizzes")
    .insert({ user_id: userId, title, questions });

  if (error) {
    console.error("Error saving quiz:", error.message);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function saveUserData(userId, name) {
  return await supabase.from('users').insert([{ id: userId, name }]);
}