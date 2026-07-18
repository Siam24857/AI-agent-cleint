"use client";

import * as React from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "https://ai-agent-server-sable.vercel.app/api";
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Don't leak whether the email exists
        setMessage("If that email exists, a reset link has been sent.");
        return;
      }
      setMessage(data?.message || "Password reset link sent to your email.");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="w-full max-w-md bg-[#2d2d2d] rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Reset Password</h1>
        {error && (
          <p className="mb-4 text-sm text-red-400 bg-[#333333] rounded p-2">{error}</p>
        )}
        {message && (
          <p className="mb-4 text-sm text-green-400 bg-[#333333] rounded p-2">{message}</p>
        )}
        <p className="mb-4 text-sm text-[#aaaaaa]">
          Enter your account email and we&apos;ll send you a link to reset your password.
        </p>
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffea00] text-[#1a1a1a] py-2 rounded-md font-semibold hover:bg-[#ffd700] disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#888888]">
          Remember it?{" "}
          <Link href="/login" className="text-[#ffea00] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
