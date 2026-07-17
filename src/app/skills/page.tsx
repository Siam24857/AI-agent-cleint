"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { BarChart3, Plus, Target, Trash2, ArrowRight } from "lucide-react";

export default function SkillsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [skills, setSkills] = React.useState<string[]>([]);
  const [input, setInput] = React.useState("");
  const [target, setTarget] = React.useState("");
  const [commonRoles, setCommonRoles] = React.useState<string[]>([
    "Frontend Engineer", "Data Scientist", "Backend Developer", "UX Designer", "DevOps Engineer",
  ]);

  React.useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const addSkill = () => {
    const v = input.trim();
    if (v && !skills.includes(v)) setSkills((s) => [...s, v]);
    setInput("");
  };

  const removeSkill = (s: string) => setSkills((cur) => cur.filter((x) => x !== s));

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="h-7 w-7 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Skill Assessment</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Track your current skills and target role, then generate a personalized roadmap to close
          the gaps.
        </p>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Your Skills</label>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="Add a skill and press Enter"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={addSkill}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {skills.map((s) => (
              <span
                key={s}
                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {s}
                <button onClick={() => removeSkill(s)} className="text-indigo-400 hover:text-red-500">
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          {commonRoles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Popular targets:</p>
              <div className="flex flex-wrap gap-2">
                {commonRoles.map((r) => (
                  <button
                    key={r}
                    onClick={() => setTarget(r)}
                    className="border border-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-50"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Link
            href={target ? `/roadmap` : "/roadmap"}
            className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700"
          >
            <Target className="h-5 w-5" /> Generate Roadmap to Close Gaps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
