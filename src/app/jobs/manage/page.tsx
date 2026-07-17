"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Eye, MapPin } from "lucide-react";
import { jobService } from "@/services/api";
import { useAuth } from "@/providers/auth-provider";

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
}

function typeLabel(type: string): string {
  return type
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ManageJobsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  React.useEffect(() => {
    if (!isAuthenticated) return;
    const run = async () => {
      setLoading(true);
      try {
        const res = await jobService.list({ limit: 50 });
        setJobs(res.data || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [isAuthenticated]);

  const handleDelete = (job: Job) => {
    if (window.confirm(`Delete "${job.title}" by ${job.company}?`)) {
      setJobs((list) => list.filter((j) => j._id !== job._id));
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
          <Link href="/login" className="mt-4 inline-block text-indigo-600 font-semibold hover:underline">
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
            <p className="mt-2 text-gray-600">{jobs.length} roles you have posted.</p>
          </div>
          <Link
            href="/jobs/add"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700"
          >
            + Add Job
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6 animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
                <div className="flex gap-2 pt-2">
                  <div className="h-8 bg-gray-200 rounded w-20" />
                  <div className="h-8 bg-gray-200 rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-600 bg-red-50 rounded-lg p-3 text-sm">{error}</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            You haven't posted any jobs yet.
            <div className="mt-4">
              <Link href="/jobs/add" className="text-indigo-600 font-semibold hover:underline">
                Post your first job
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow p-6 flex flex-col">
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-indigo-600" /> {job.location}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-700 bg-slate-100 rounded-full px-2 py-0.5">
                    {typeLabel(job.type)}
                  </span>
                  <span className="font-semibold text-gray-900">{job.salary}</span>
                </div>

                <div className="mt-auto pt-4 flex gap-2">
                  <Link
                    href={`/jobs/${job._id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-md px-3 py-1.5 hover:bg-indigo-50"
                  >
                    <Eye className="w-4 h-4" /> View
                  </Link>
                  <button
                    onClick={() => handleDelete(job)}
                    className="flex items-center gap-1 text-sm font-semibold text-red-600 border border-red-200 rounded-md px-3 py-1.5 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
