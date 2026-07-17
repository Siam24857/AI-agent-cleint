"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { blogService } from "@/services/api";
import { Calendar, ArrowRight } from "lucide-react";

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
};

const gradients = [
  "from-indigo-400 to-indigo-600",
  "from-blue-400 to-indigo-500",
  "from-slate-400 to-indigo-500",
  "from-indigo-500 to-purple-500",
  "from-blue-500 to-indigo-600",
  "from-indigo-300 to-blue-500",
];

function formatDate(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await blogService.list();
        if (!active) return;
        if (res?.success && Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]);
        }
      } catch (err: any) {
        if (!active) return;
        setError(err?.message || "Failed to load blog posts.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
              Blog
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Career insights, guides, and AI tips
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Practical advice to help you write better resumes, ace interviews,
              and plan a career you love — written by our mentor team.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6">
                <div className="h-40 w-full animate-pulse rounded-lg bg-slate-200" />
                <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-indigo-50 p-8 text-center">
            <p className="text-slate-700">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl bg-indigo-50 p-8 text-center">
            <p className="text-lg font-medium text-slate-900">
              No articles yet
            </p>
            <p className="mt-2 text-slate-600">
              We are working on our first posts. Check back soon for career
              guides and AI tips.
            </p>
            <Link
              href="/features"
              className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700"
            >
              Explore features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow p-6 transition hover:shadow-md hover:-translate-y-0.5"
              >
                <div
                  className={`h-40 w-full rounded-lg bg-gradient-to-br ${
                    gradients[i % gradients.length]
                  }`}
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {post.category}
                  </span>
                  <span className="flex items-center text-xs text-slate-500">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-indigo-700">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600">
                  Read article
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
