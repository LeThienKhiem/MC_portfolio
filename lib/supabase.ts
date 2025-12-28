import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client only if environment variables are available
// This prevents build-time errors on Vercel
let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

// Export supabase client (will be null if env vars are missing)
export const supabase = supabaseClient;

// Helper function to get Supabase client with error handling
export function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized. Please check your environment variables.');
  }
  return supabaseClient;
}

export type Booking = {
  id: number;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  booking_date: string;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  is_finished?: boolean;
};

export type Media = {
  id: number;
  url: string;
  type: 'image' | 'video';
  category: string | null;
  caption: string | null;
  created_at: string;
};

export type News = {
  id: number;
  title: string;
  content: string;
  thumbnail_url: string | null;
  created_at: string;
};

