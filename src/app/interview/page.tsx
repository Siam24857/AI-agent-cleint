"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { interviewService } from "@/services/api";
import { Loader2, Sparkles, CheckCircle2, RotateCcw, Send } from "lucide-react";

export default function InterviewPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [role, setRole] = React.useState("");
  const [type, setType] = React.useState("technical");
  const [difficulty, setDifficulty] = React.useState("medium");
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [evaluations, setEvaluations] = React.useState<Record<number, any>>({});
  const [evalLoading, setEvalLoading] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await interviewService.questions({ role, type, difficulty, count: 5 });
      setQuestions(res.data || []);
      setAnswers({});
      setEvaluations({});
    } catch (err: any) {
      alert(err?.message || "Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  const evaluate = async (idx: number) => {
    const q = questions[idx];
    const ans = answers[idx];
    if (!ans?.trim()) return;
    setEvalLoading(idx);
    try {
      const res = await interviewService.evaluate({ question: q.question, answer: ans });
      setEvaluations((e) => ({ ...e, [idx]: res.data }));
    } catch (err: any) {
      alert(err?.message || "Evaluation failed");
    } finally {
      setEvalLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-7 w-7 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Interview Prep</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Generate role-specific interview questions and get instant AI feedback on your answers.
        </p>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="technical">Technical</option>
                <option value="behavioral">Behavioral</option>
                <option value="hr">HR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <button
            onClick={generate}
            disabled={loading}
            className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            {loading ? "Generating..." : "Generate Questions"}
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start gap-3">
                <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{q.question}</p>
                  <span className="inline-block mt-1 text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {q.category}
                  </span>
                </div>
              </div>

              <textarea
                value={answers[idx] || ""}
                onChange={(e) => setAnswers((a) => ({ ...a, [idx]: e.target.value }))}
                placeholder="Write your answer..."
                rows={3}
                className="mt-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => evaluate(idx)}
                disabled={evalLoading === idx || !answers[idx]?.trim()}
                className="mt-2 inline-flex items-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
              >
                {evalLoading === idx ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Evaluate Answer
              </button>

              {evaluations[idx] && (
                <div className="mt-4 bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Score: {evaluations[idx].score}/100</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{evaluations[idx].feedback}</p>
                  <p className="text-sm font-medium text-gray-800">Strengths:</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside">
                    {evaluations[idx].strengths?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-gray-800 mt-2">Improvements:</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside">
                    {evaluations[idx].improvements?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-gray-800 mt-2">Model answer:</p>
                  <p className="text-sm text-gray-700">{evaluations[idx].modelAnswer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
