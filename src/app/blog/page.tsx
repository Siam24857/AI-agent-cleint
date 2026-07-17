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

const bannerImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPd70QYAh1oXMGHmrgYtOTB_aK6Bn07HP2kwwXXyRzg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_fxwoklaOaV-GzZkN2oRoZg_YBoIGeX-SpZcOTxECyGSsvw7LW_OA6iw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGwrJknmlqENc8SwSLAa6CZ5Qno7M2ZCYhLNDr7r39qQSU01hzOHNWXc6&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv0NaS56QCs9gJAoKROsuMljeXulQWZXAy5ZfTGjtBI8X9Tpz3k0YXgE8&s=10",
];

const fakeImages = [
  "https://placehold.co/600x240/1a1a1a/ffea00?text=Career+Tip",
  "https://placehold.co/600x240/1e3a5f/ffea00?text=Finance+Guide",
  "https://placehold.co/600x240/2d2d2d/ffea00?text=Resume+Guide",
  "https://placehold.co/600x240/81c784/ffea00?text=Wellness+Tips",
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
  const [currentBanner, setCurrentBanner] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-[#000000]">
      <section className="relative h-80 sm:h-96 md:h-[28rem] overflow-hidden">
        {bannerImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Blog banner"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/50 to-[#000000]/80" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full text-center">
          <span className="inline-block rounded-full bg-[#ffea00]/20 px-4 py-1 text-sm font-medium text-[#ffea00]">
            Blog
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffea00]">
            Career insights, guides, and AI tips
          </h1>
          <p className="mt-4 text-lg text-[#cccccc]">
            Practical advice to help you write better resumes, ace interviews,
            and plan a career you love — written by our mentor team.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-xl shadow p-6">
                <div className="h-40 w-full animate-pulse rounded-lg bg-[#333333]" />
                <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-[#333333]" />
                <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-[#333333]" />
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-[#333333]" />
                <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-[#333333]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-[#1a1a1a] p-8 text-center">
            <p className="text-[#cccccc]">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl bg-[#1a1a1a] p-8 text-center">
            <p className="text-lg font-medium text-[#ffea00]">
              No articles yet
            </p>
            <p className="mt-2 text-[#999999]">
              We are working on our first posts. Check back soon for career
              guides and AI tips.
            </p>
            <Link
              href="/features"
              className="mt-4 inline-flex items-center rounded-lg bg-[#ffea00] px-6 py-3 text-sm font-semibold text-[#000000] shadow hover:bg-[#ffea00]"
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
                className="group bg-[#1a1a1a] rounded-xl shadow p-6 transition hover:shadow-md hover:-translate-y-0.5"
              >
                <img
                  src={fakeImages[i % fakeImages.length]}
                  alt={post.title}
                  className="h-40 w-full rounded-lg object-cover"
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-block rounded-full bg-[#ffea00]/20 px-3 py-1 text-xs font-medium text-[#ffea00]">
                    {post.category}
                  </span>
                  <span className="flex items-center text-xs text-[#999999]">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[#ffea00] group-hover:text-[#ffea00]">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[#cccccc]">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-[#ffea00]">
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
