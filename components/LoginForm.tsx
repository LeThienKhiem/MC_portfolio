"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, LogIn } from "lucide-react";
import { validateCredentials, setAuthToken } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      if (validateCredentials(formData.username, formData.password)) {
        // Generate a simple token (in production, use JWT or session token from server)
        const token = btoa(`${formData.username}:${Date.now()}`);
        setAuthToken(token);
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid username or password");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F2E9E4" }}>
      <div className="w-full max-w-md">
        <div
          className="bg-white rounded-lg shadow-lg p-8"
          style={{ border: "1px solid #BFBCBA" }}
        >
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#403F3D", fontFamily: "var(--font-playfair), serif" }}
            >
              Admin Login
            </h1>
            <p style={{ color: "#737272" }}>Enter your credentials to access the dashboard</p>
          </div>

          {error && (
            <div
              className="mb-6 p-4 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: "#F2E9E4", border: "1px solid #BFBCBA" }}
            >
              <AlertCircle className="w-5 h-5" style={{ color: "#737272" }} />
              <p className="text-sm" style={{ color: "#0D0D0D" }}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2"
                style={{ color: "#0D0D0D" }}
              >
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#737272" }}
                />
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{
                    borderColor: "#BFBCBA",
                    backgroundColor: "#FFFFFF",
                    color: "#0D0D0D",
                  }}
                  placeholder="Enter your username"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: "#0D0D0D" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#737272" }}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{
                    borderColor: "#BFBCBA",
                    backgroundColor: "#FFFFFF",
                    color: "#0D0D0D",
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#403F3D",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#2D2C2A";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#403F3D";
                }
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


