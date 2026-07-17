"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { recommendationService } from "@/services/api";
import { Loader2, Sparkles, MapPin, Briefcase, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RecommendationsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [jobs, setJobs] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const res = await recommendationService.get("jobs", 6);
        setJobs(res.data || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-7 w-7 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Job Recommendations</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Personalized matches computed by Gemini based on your skills, experience, and goals.
        </p>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          </div>
        )}
        {error && <p className="text-red-600 bg-red-50 rounded p-3">{error}</p>}

        {!loading && !error && jobs.length === 0 && (
          <p className="text-gray-600">No recommendations yet. Add skills to your profile to improve matches.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: any, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {job.matchScore}% match
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{job.company}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.type}</span>
              </div>
              <p className="text-sm text-indigo-700 mb-4">{job.matchReason}</p>
              <div className="mt-auto flex flex-wrap gap-1 mb-4">
                {(job.fitSkills || []).slice(0, 3).map((s: string, j: number) => (
                  <span key={j} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">
                    {s}
                  </span>
                ))}
              </div>
              <Link
                href={job._id ? `/jobs/${job._id}` : "/jobs"}
                className="inline-flex items-center justify-center gap-1 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700"
              >
                View Job <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 border border-indigo-600 text-indigo-700 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50"
          >
            Browse All Jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
