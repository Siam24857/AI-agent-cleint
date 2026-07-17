"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { blogService } from "@/services/api";
import { Calendar, ArrowLeft, Tag } from "lucide-react";

type Post = {
  title: string;
  content: string;
  category: string;
  publishedAt: string;
  tags: string[];
};

function formatDate(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    (async () => {
      try {
        const res = await blogService.getBySlug(slug);
        if (!active) return;
        if (res?.success && res.data) {
          setPost(res.data);
        } else {
          setError("Article not found.");
        }
      } catch (err: any) {
        if (!active) return;
        setError(err?.message || "Failed to load article.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <main className="bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Blog
          </Link>

          {loading ? (
            <div className="mt-6 space-y-4">
              <div className="h-4 w-1/4 animate-pulse rounded bg-slate-200" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            </div>
          ) : error ? (
            <p className="mt-6 text-slate-700">{error}</p>
          ) : post ? (
            <>
              <span className="mt-6 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                {post.category}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full animate-pulse rounded bg-slate-200" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-indigo-50 p-8 text-center">
            <p className="text-slate-700">{error}</p>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700"
            >
              Back to Blog
            </Link>
          </div>
        ) : post ? (
          <article className="prose prose-slate max-w-none">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className="mb-5 leading-relaxed text-slate-700">
                {para}
              </p>
            ))}

            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
                <Tag className="h-4 w-4 text-indigo-600" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Blog
              </Link>
            </div>
          </article>
        ) : null}
      </section>
    </main>
  );
}
