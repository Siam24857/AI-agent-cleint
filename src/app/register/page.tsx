"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.register(fullname, email, password);
      router.push("/login");
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="w-full max-w-md bg-[#2d2d2d] rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Create Account</h1>
        {error && <p className="mb-4 text-sm text-red-400 bg-[#333333] rounded p-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#aaaaaa]">Full Name</label>
            <input
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#444444] px-3 py-2 bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#ffea00]"
            />
          </div>
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#444444] px-3 py-2 bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#ffea00]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffea00] text-[#1a1a1a] py-2 rounded-md font-semibold hover:bg-[#ffd700] disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#888888]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#ffea00] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
