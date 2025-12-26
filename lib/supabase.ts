import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

