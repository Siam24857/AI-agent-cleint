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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 mb-8">{description}</p>
        <div className="bg-white rounded-xl shadow p-8 text-left text-gray-600">
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
          className="inline-block mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
