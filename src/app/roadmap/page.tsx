"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { roadmapService } from "@/services/api";
import { Loader2, Sparkles, BookOpen, Target, Calendar, CheckCircle2 } from "lucide-react";

export default function RoadmapPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [targetRole, setTargetRole] = React.useState("");
  const [timeframe, setTimeframe] = React.useState("6 months");
  const [loading, setLoading] = React.useState(false);
  const [roadmap, setRoadmap] = React.useState<any>(null);
  const [saved, setSaved] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  React.useEffect(() => {
    if (isAuthenticated) loadSaved();
  }, [isAuthenticated]);

  const loadSaved = async () => {
    try {
      const res = await roadmapService.list();
      setSaved(res.data || []);
    } catch {
      // ignore
    }
  };

  const generate = async () => {
    if (!targetRole.trim()) return;
    setLoading(true);
    try {
      const res = await roadmapService.generate({ targetRole, timeframe });
      setRoadmap(res.data);
    } catch (err: any) {
      alert(err?.message || "Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  const openSaved = (r: any) => setRoadmap(r);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-7 w-7 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Learning Roadmap</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Get a personalized week-by-week learning plan tailored to your goal and current skills.
        </p>

        {!roadmap && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
                <input
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                </select>
              </div>
            </div>
            <button
              onClick={generate}
              disabled={loading || !targetRole.trim()}
              className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              {loading ? "Generating Plan..." : "Generate My Roadmap"}
            </button>

            {saved.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2">Your saved roadmaps</h3>
                <div className="flex flex-wrap gap-2">
                  {saved.map((r) => (
                    <button
                      key={r._id}
                      onClick={() => openSaved(r)}
                      className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-100"
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {roadmap && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{roadmap.title}</h2>
                  {roadmap.plan?.timeline && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="h-4 w-4" /> {roadmap.plan.timeline}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setRoadmap(null)}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  New Roadmap
                </button>
              </div>
              {roadmap.plan?.gaps?.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-gray-800 flex items-center gap-1">
                    <Target className="h-4 w-4 text-indigo-600" /> Skill gaps to close
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {roadmap.plan.gaps.map((g: string, i: number) => (
                      <span key={i} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {(roadmap.weekPlan || roadmap.plan?.learningPath || []).map((week: any, i: number) => (
              <div key={i} className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                    {week.week || i + 1}
                  </span>
                  <h3 className="font-semibold text-gray-900">{week.title}</h3>
                  {week.estimatedHours && (
                    <span className="text-xs text-gray-500">~{week.estimatedHours}h</span>
                  )}
                </div>
                {week.objectives?.length > 0 && (
                  <ul className="mb-2 space-y-1">
                    {week.objectives.map((o: string, j: number) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /> {o}
                      </li>
                    ))}
                  </ul>
                )}
                {week.tasks?.length > 0 && (
                  <ul className="mb-2 list-disc list-inside text-sm text-gray-700">
                    {week.tasks.map((t: string, j: number) => (
                      <li key={j}>{t}</li>
                    ))}
                  </ul>
                )}
                {week.resources?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-indigo-600" /> Resources
                    </p>
                    <ul className="mt-1 space-y-1">
                      {week.resources.map((r: any, j: number) => (
                        <li key={j}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 hover:underline text-sm"
                          >
                            {r.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
