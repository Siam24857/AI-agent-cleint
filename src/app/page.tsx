"use client";

import Link from "next/link";
import FeaturesPage from "@/features/FeaturesPage";

export default function HomePage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI Career Mentor
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Your personal AI-powered career guidance platform. Get resume analysis,
            job recommendations, interview prep, and personalized learning roadmaps.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              href="/register"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <FeaturesPage />
    </main>
  );
}
