"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export default function LoginPage() {
  const { login, demoLogin, isLoading, error, clearError } = useAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [localError, setLocalError] = React.useState("");

  React.useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setLocalError(err?.message || "Login failed");
    }
  };

  const handleDemo = async () => {
    setLocalError("");
    try {
      await demoLogin();
      router.push("/");
    } catch (err: any) {
      setLocalError(err?.message || "Demo login failed");
    }
  };

  const handleGoogle = () => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    window.location.href = `${base}/auth/google`;
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="w-full max-w-md bg-[#2d2d2d] rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Welcome Back</h1>
        {(error || localError) && (
          <p className="mb-4 text-sm text-red-400 bg-[#333333] rounded p-2">{error || localError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#aaaaaa]">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#444444] px-3 py-2 bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#ffea00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#aaaaaa]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#444444] px-3 py-2 bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#ffea00]"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ffea00] text-[#1a1a1a] py-2 rounded-md font-semibold hover:bg-[#ffd700] disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={handleDemo}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            Demo Login (auto-fill)
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 border border-[#444444] text-[#aaaaaa] py-2 rounded-md font-semibold hover:bg-[#333333] disabled:opacity-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
            </svg>
            Continue with Google
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-[#888888]">
          <p>
            <Link href="/forgot-password" className="text-[#ffea00] hover:underline">
              Forgot password?
            </Link>
          </p>
          <p className="mt-2">
            No account?{" "}
            <Link href="/register" className="text-[#ffea00] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
