"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { MapPin, ArrowLeft, Check, AlertCircle } from "lucide-react";
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
  description: string;
  requirements: string[];
  benefits: string[];
  postedBy: { fullname: string };
}

function typeLabel(type: string): string {
  return type
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [job, setJob] = React.useState<Job | null>(null);
  const [related, setRelated] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(
    null
  );
  const [applying, setApplying] = React.useState(false);

  React.useEffect(() => {
    if (!id) return;
    const run = async () => {
      setLoading(true);
      try {
        const res = await jobService.getById(id as string);
        const data: Job = res.data;
        setJob(data);
        setNotFound(false);
        try {
          const rel = await jobService.list({ category: data.category, limit: 4 });
          setRelated(
            (rel.data || [])
              .filter((j: Job) => j._id !== data._id)
              .slice(0, 3)
          );
        } catch {
          setRelated([]);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    const coverLetter = window.prompt(
      "Tell the employer why you're a great fit (optional):"
    );
    if (coverLetter === null) return; // cancelled
    setApplying(true);
    setMessage(null);
    try {
      await jobService.apply(id as string, { resumeUrl: "", coverLetter });
      setMessage({ type: "success", text: "Your application was submitted successfully!" });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.message || "Failed to submit application. Please try again.",
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !job) {
    return (
      <main className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
          <p className="mt-2 text-gray-600">This role may have been filled or removed.</p>
          <Link
            href="/jobs"
            className="mt-6 inline-block text-indigo-600 font-semibold hover:underline"
          >
            &larr; Back to all jobs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to jobs
        </Link>

        {message && (
          <div
            className={`mb-6 flex items-center gap-2 rounded-lg p-3 text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {message.text}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <p className="mt-1 text-lg text-gray-700">{job.company}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-indigo-600" /> {job.location}
                </span>
                <span className="text-xs font-medium text-slate-700 bg-slate-100 rounded-full px-2 py-0.5">
                  {typeLabel(job.type)}
                </span>
                {job.remote && (
                  <span className="text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full px-2 py-0.5">
                    Remote
                  </span>
                )}
                <span className="font-semibold text-gray-900">{job.salary}</span>
              </div>
            </div>
            <button
              onClick={handleApply}
              disabled={applying}
              className="shrink-0 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {applying ? "Submitting..." : "Apply Now"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {job.description}
              </p>
            </section>

            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h2>
              {job.requirements?.length ? (
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  {job.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No specific requirements listed.</p>
              )}
            </section>

            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h2>
              {job.benefits?.length ? (
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  {job.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No benefits listed.</p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Information</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Salary</dt>
                  <dd className="font-medium text-gray-900">{job.salary}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Location</dt>
                  <dd className="font-medium text-gray-900">{job.location}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Type</dt>
                  <dd className="font-medium text-gray-900">{typeLabel(job.type)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Experience</dt>
                  <dd className="font-medium text-gray-900 capitalize">{job.experience}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Remote</dt>
                  <dd className="font-medium text-gray-900">{job.remote ? "Yes" : "No"}</dd>
                </div>
              </dl>
            </section>

            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills?.map((s, i) => (
                  <span key={i} className="text-xs text-indigo-700 bg-indigo-50 rounded-full px-2 py-1">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>

        {/* Related jobs */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">More {job.category} roles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r._id}
                  href={`/jobs/${r._id}`}
                  className="bg-white rounded-xl shadow p-6 block hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-gray-900">{r.title}</h3>
                  <p className="text-sm text-gray-600">{r.company}</p>
                  <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-indigo-600" /> {r.location}
                  </div>
                  <p className="mt-2 font-semibold text-gray-900">{r.salary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
