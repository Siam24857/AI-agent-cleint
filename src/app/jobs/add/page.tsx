"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Check } from "lucide-react";
import { jobService } from "@/services/api";
import { useAuth } from "@/providers/auth-provider";

const CATEGORIES = ["Engineering", "Data", "Design", "Product", "Content", "Security", "Marketing"];
const TYPES = ["full-time", "part-time", "contract", "internship"];
const EXPERIENCES = ["entry", "mid", "senior", "executive"];

function typeLabel(type: string): string {
  return type
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function AddJobPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [form, setForm] = React.useState({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    experience: "entry",
    salary: "",
    category: "Engineering",
    remote: false,
    description: "",
    requirements: "",
    benefits: "",
    skills: "",
    image: "",
  });
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(
    null
  );
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);
    const payload = {
      title: form.title,
      company: form.company,
      location: form.location,
      type: form.type,
      experience: form.experience,
      salary: form.salary,
      category: form.category,
      remote: form.remote,
      description: form.description,
      requirements: form.requirements
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      benefits: form.benefits
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      image: form.image || undefined,
    };
    try {
      await jobService.create(payload);
      setMessage({ type: "success", text: "Job posted successfully!" });
      router.push("/jobs/manage");
    } catch (err: any) {
      const status = err?.message || "";
      if (status.includes("401") || status.includes("403") || status.toLowerCase().includes("admin")) {
        setMessage({ type: "error", text: "Admins only — you don't have permission to post jobs." });
      } else {
        setMessage({ type: "error", text: status || "Failed to post job. Please try again." });
      }
    } finally {
      setSubmitting(false);
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

  const inputClass =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
        <p className="mt-2 text-gray-600">Fill in the details below to publish a role.</p>

        {message && (
          <div
            className={`mt-6 flex items-center gap-2 rounded-lg p-3 text-sm ${
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

        <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-xl shadow p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Job Title *</label>
              <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Company *</label>
              <input required value={form.company} onChange={(e) => update("company", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Location *</label>
              <input required value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Salary *</label>
              <input required value={form.salary} onChange={(e) => update("salary", e.target.value)} placeholder="e.g. $80,000 - $100,000" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select value={form.type} onChange={(e) => update("type", e.target.value)} className={inputClass}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {typeLabel(t)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Experience</label>
              <select value={form.experience} onChange={(e) => update("experience", e.target.value)} className={inputClass}>
                {EXPERIENCES.map((x) => (
                  <option key={x} value={x}>
                    {x.charAt(0).toUpperCase() + x.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Image URL (optional)</label>
              <input value={form.image} onChange={(e) => update("image", e.target.value)} className={inputClass} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={form.remote}
              onChange={(e) => update("remote", e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            Remote eligible
          </label>

          <div>
            <label className={labelClass}>Description *</label>
            <textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Requirements (comma-separated)</label>
            <input value={form.requirements} onChange={(e) => update("requirements", e.target.value)} placeholder="Bachelor's degree, 3+ years React, SQL" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Benefits (comma-separated)</label>
            <input value={form.benefits} onChange={(e) => update("benefits", e.target.value)} placeholder="Health insurance, 401k, Remote work" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Skills (comma-separated)</label>
            <input value={form.skills} onChange={(e) => update("skills", e.target.value)} placeholder="TypeScript, React, Node.js" className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </main>
  );
}
