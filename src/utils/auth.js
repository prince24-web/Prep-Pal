// auth.js
import { supabase } from './supabaseClient.js';
import { saveUserData } from './saveData.js';

// Sign Up with Email/Password
export async function signUp(email, password, fullName) {
  try {
    // 1. Create user account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) throw error;

    // 2. Save additional user data to your database
    if (data.user) {
      await saveUserData({
        user_id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        auth_provider: 'email'
      });
    }

    return { success: true, data };
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

// Sign In with Email/Password
export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

// Sign In with Google
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
}

// Sign Out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

// Listen to Auth Changes
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}