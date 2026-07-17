"use client";

export const dynamic = "force-dynamic";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Briefcase, MapPin, Search } from "lucide-react";
import { jobService } from "@/services/api";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  experience: "entry" | "mid" | "senior" | "executive";
  salary: string;
  remote: boolean;
  category: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  postedBy: { fullname: string };
}

const CATEGORIES = ["Engineering", "Data", "Design", "Product", "Content", "Security", "Marketing"];
const TYPES = ["full-time", "part-time", "contract", "internship"];
const EXPERIENCES = ["entry", "mid", "senior", "executive"];
const SORTS = [
  { value: "latest", label: "Latest" },
  { value: "salary", label: "Salary" },
  { value: "title", label: "Title" },
];

function gradientForLetter(letter: string): string {
  const options = [
    "bg-gradient-to-br from-indigo-500 to-indigo-700",
    "bg-gradient-to-br from-slate-500 to-slate-700",
    "bg-gradient-to-br from-purple-500 to-indigo-600",
    "bg-gradient-to-br from-blue-500 to-indigo-600",
  ];
  const idx = letter.charCodeAt(0) % options.length;
  return options[idx];
}

function typeLabel(type: string): string {
  return type
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function JobCard({ job }: { job: Job }) {
  const initial = (job.company || "?").charAt(0).toUpperCase();
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full">
      <div className="flex items-start gap-3">
        <div
          className={`w-12 h-12 rounded-full ${gradientForLetter(initial)} flex items-center justify-center text-white font-bold text-lg shrink-0`}
        >
          {initial}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
          <p className="text-sm text-gray-600 truncate">{job.company}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-indigo-600" />
          <span className="truncate">{job.location}</span>
          {job.remote && (
            <span className="ml-auto text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full px-2 py-0.5">
              Remote
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-700 bg-slate-100 rounded-full px-2 py-0.5">
            {typeLabel(job.type)}
          </span>
          <span className="font-semibold text-gray-900">{job.salary}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.skills.slice(0, 3).map((skill, i) => (
          <span key={i} className="text-xs text-indigo-700 bg-indigo-50 rounded-full px-2 py-0.5">
            {skill}
          </span>
        ))}
      </div>

      <Link
        href={`/jobs/${job._id}`}
        className="mt-auto pt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        View Details &rarr;
      </Link>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="mt-3 flex gap-2">
        <div className="h-5 bg-gray-200 rounded-full w-16" />
        <div className="h-5 bg-gray-200 rounded-full w-12" />
      </div>
      <div className="mt-6 h-4 bg-gray-200 rounded w-24" />
    </div>
  );
}

function JobsExplorePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const [category, setCategory] = React.useState(searchParams.get("category") || "");
  const [location, setLocation] = React.useState(searchParams.get("location") || "");
  const [type, setType] = React.useState(searchParams.get("type") || "");
  const [experience, setExperience] = React.useState(searchParams.get("experience") || "");
  const [sort, setSort] = React.useState(searchParams.get("sort") || "latest");
  const [page, setPage] = React.useState(Number(searchParams.get("page")) || 1);

  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [total, setTotal] = React.useState(0);
  const [pages, setPages] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  const buildParams = React.useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (experience) params.set("experience", experience);
    if (sort) params.set("sort", sort);
    params.set("page", String(page));
    return params;
  }, [search, category, location, type, experience, sort, page]);

  // Keep URL query params in sync.
  React.useEffect(() => {
    const params = buildParams();
    router.replace(`/jobs?${params.toString()}`, { scroll: false });
  }, [buildParams, router]);

  // Debounced fetch on filter/page change.
  React.useEffect(() => {
    const handler = setTimeout(() => {
      const run = async () => {
        setLoading(true);
        try {
          const res = await jobService.list({
            search,
            category,
            location,
            type,
            experience,
            sort,
            page,
            limit: 20,
          });
          setJobs(res.data || []);
          setTotal(res.total || 0);
          setPages(res.pages || 1);
        } catch (err) {
          setJobs([]);
          setTotal(0);
          setPages(1);
        } finally {
          setLoading(false);
        }
      };
      run();
    }, 300);
    return () => clearTimeout(handler);
  }, [search, category, location, type, experience, sort, page]);

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-indigo-600" /> Explore Jobs
          </h1>
          <p className="mt-2 text-gray-600">
            Browse {total} open roles across engineering, data, design, product and more.
          </p>
        </header>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-6 mb-8 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by job title or company..."
              className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setPage(1);
              }}
              placeholder="Location"
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
              className="rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Types</option>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {typeLabel(t)}
                </option>
              ))}
            </select>

            <select
              value={experience}
              onChange={(e) => {
                setExperience(e.target.value);
                setPage(1);
              }}
              className="rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Levels</option>
              {EXPERIENCES.map((x) => (
                <option key={x} value={x}>
                  {x.charAt(0).toUpperCase() + x.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No jobs match your filters. Try widening your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && pages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 disabled:opacity-40 hover:bg-gray-50"
            >
              Prev
            </button>
            {Array.from({ length: pages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded-md border ${
                    p === page
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages}
              className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 disabled:opacity-40 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function JobsExplorePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" />}>
      <JobsExplorePageInner />
    </React.Suspense>
  );
}
