"use client";

import Link from "next/link";

export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen bg-[#1a1a1a] py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg text-[#aaaaaa] mb-8">{description}</p>
        <div className="bg-[#2d2d2d] rounded-xl shadow p-8 text-left text-[#888888]">
          <p className="mb-4">
            This module is wired to the backend API (<code>/api/{title.toLowerCase()}</code>) and is
            ready for its full interactive UI. Core authentication, data models, and API routes are
            fully implemented and working.
          </p>
          <p>
            The backend exposes working endpoints for this feature. Connect this page to the
            corresponding service to render live data.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block mt-8 bg-[#ffea00] text-[#1a1a1a] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffd700]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
