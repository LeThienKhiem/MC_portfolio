// Simple authentication utilities
// In production, use Supabase Auth or a proper authentication service

const AUTH_STORAGE_KEY = "admin_auth_token";
const AUTH_EXPIRY_KEY = "admin_auth_expiry";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function setAuthToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
    const expiry = Date.now() + SESSION_DURATION;
    localStorage.setItem(AUTH_EXPIRY_KEY, expiry.toString());
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    
    if (!token || !expiry) return null;
    
    // Check if session expired
    if (Date.now() > parseInt(expiry)) {
      clearAuth();
      return null;
    }
    
    return token;
  }
  return null;
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_EXPIRY_KEY);
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

export function validateCredentials(username: string, password: string): boolean {
  // Get credentials from environment variables or use defaults
  const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
  const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
  
  return username === validUsername && password === validPassword;
}


