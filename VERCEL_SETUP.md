# Vercel Environment Variables Setup

## Required Environment Variables

To fix the "Supabase not configured" error on Vercel, you need to add these environment variables:

### 1. `NEXT_PUBLIC_SUPABASE_URL`
- **Where to find it:** 
  - Go to your Supabase Dashboard
  - Navigate to **Project Settings** → **API**
  - Copy the **Project URL** (e.g., `https://xxxxx.supabase.co`)

### 2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Where to find it:**
  - Go to your Supabase Dashboard
  - Navigate to **Project Settings** → **API**
  - Under **Project API keys**, copy the **anon/public** key

## Steps to Add in Vercel:

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add each variable:
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Your Supabase project URL
   - **Environment:** Select all (Production, Preview, Development)
4. Add the second variable:
   - **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon key
   - **Environment:** Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your application (go to Deployments → click the three dots → Redeploy)

## Important Notes:

- The `NEXT_PUBLIC_` prefix is required for Next.js to expose these variables to the browser
- After adding environment variables, you **must redeploy** for changes to take effect
- Never commit these keys to git - they should only be in Vercel's environment variables

## Verification:

After redeploying, check your application logs in Vercel to ensure the Supabase client initializes correctly. The "Supabase not configured" error should disappear.


