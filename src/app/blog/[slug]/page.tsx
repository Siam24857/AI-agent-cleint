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
    <main className="bg-[#1a1a1a]">
      <section className="bg-gradient-to-br from-[#2d2d2d] via-[#333333] to-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-[#ffea00] hover:text-[#ffd700]"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Blog
          </Link>

          {loading ? (
            <div className="mt-6 space-y-4">
              <div className="h-4 w-1/4 animate-pulse rounded bg-[#444444]" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-[#444444]" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-[#444444]" />
            </div>
          ) : error ? (
            <p className="mt-6 text-[#aaaaaa]">{error}</p>
          ) : post ? (
            <>
              <span className="mt-6 inline-block rounded-full bg-[#ffea00]/20 px-4 py-1 text-sm font-medium text-[#ffea00]">
                {post.category}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#888888]">
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
              <div key={i} className="h-4 w-full animate-pulse rounded bg-[#444444]" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-[#333333] p-8 text-center">
            <p className="text-[#aaaaaa]">{error}</p>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center rounded-lg bg-[#ffea00] px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow hover:bg-[#ffd700]"
            >
              Back to Blog
            </Link>
          </div>
        ) : post ? (
          <article className="prose prose-slate max-w-none">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className="mb-5 leading-relaxed text-[#cccccc]">
                {para}
              </p>
            ))}

            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-[#444444] pt-6">
                <Tag className="h-4 w-4 text-[#ffea00]" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#ffea00]/20 px-3 py-1 text-xs font-medium text-[#ffea00]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-[#ffea00] hover:text-[#ffd700]"
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
