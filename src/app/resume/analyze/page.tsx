"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { resumeService } from "@/services/api";
import {
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Gauge,
} from "lucide-react";

export default function ResumeAnalyzePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<any>(null);

  React.useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === "application/pdf") {
      setFile(f);
      setError("");
    } else {
      setFile(null);
      setError("Please upload a PDF file.");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const res = await resumeService.analyze(file);
      setResult(res.data);
    } catch (err: any) {
      setError(err?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const analysis = result?.analysis;

  const ScoreCircle = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div className="flex flex-col items-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white"
        style={{ background: `conic-gradient(${color} ${value * 3.6}deg, #444444 0deg)` }}
      >
        <div className="w-16 h-16 rounded-full bg-[#ffea00] flex items-center justify-center text-[#1a1a1a]">
          {value}
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-[#aaaaaa]">{label}</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#1a1a1a] py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-2">AI Resume Analyzer</h1>
        <p className="text-[#aaaaaa] mb-8">
          Upload your PDF resume to get an ATS compatibility score, strengths, missing skills, and
          actionable improvements.
        </p>

        {!result && (
          <div className="bg-[#2d2d2d] rounded-xl shadow p-8">
            <div className="border-2 border-dashed border-[#444444] rounded-lg p-10 text-center">
              <Upload className="h-12 w-12 text-[#ffea00] mx-auto mb-4" />
              <p className="text-[#888888] mb-4">
                {file ? file.name : "Drag & drop or choose a PDF resume"}
              </p>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFile}
                className="block mx-auto text-sm"
              />
            </div>
            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="mt-6 w-full bg-[#ffea00] text-[#1a1a1a] py-3 rounded-md font-semibold hover:bg-[#ffd700] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
              {loading ? "Analyzing with AI..." : "Analyze Resume"}
            </button>
          </div>
        )}

        {result && analysis && (
          <div className="space-y-6">
            <div className="bg-[#2d2d2d] rounded-xl shadow p-8">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Analysis Complete</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ScoreCircle value={analysis.score} label="Overall" color="#ffea00" />
                <ScoreCircle value={analysis.atsScore} label="ATS Score" color="#ffea00" />
                <ScoreCircle value={analysis.keywordScore} label="Keywords" color="#ffea00" />
                <ScoreCircle value={analysis.readabilityScore} label="Readability" color="#ffea00" />
              </div>
              {analysis.summary && (
                <p className="mt-6 text-[#cccccc] bg-[#333333] rounded-lg p-4">{analysis.summary}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2d2d2d] rounded-xl shadow p-6">
                <h3 className="flex items-center gap-2 font-semibold text-white mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" /> Strengths
                </h3>
                <ul className="space-y-2">
                  {analysis.strengths?.map((s: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-[#aaaaaa]">
                      <span className="text-green-400">+</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#2d2d2d] rounded-xl shadow p-6">
                <h3 className="flex items-center gap-2 font-semibold text-white mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" /> Weaknesses
                </h3>
                <ul className="space-y-2">
                  {analysis.weaknesses?.map((s: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-[#aaaaaa]">
                      <span className="text-red-400">-</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#2d2d2d] rounded-xl shadow p-6">
              <h3 className="flex items-center gap-2 font-semibold text-white mb-3">
                <Gauge className="h-5 w-5 text-[#ffea00]" /> Missing Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills?.map((s: string, i: number) => (
                  <span key={i} className="bg-[#ffea00]/20 text-[#ffea00] px-3 py-1 rounded-full text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#2d2d2d] rounded-xl shadow p-6">
              <h3 className="flex items-center gap-2 font-semibold text-white mb-3">
                <Lightbulb className="h-5 w-5 text-[#ffd700]" /> Suggestions
              </h3>
              <ul className="space-y-2">
                {analysis.suggestions?.map((s: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-[#cccccc]">
                    <Lightbulb className="h-4 w-4 text-[#ffd700] mt-0.5 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                setResult(null);
                setFile(null);
              }}
              className="w-full bg-[#ffea00] text-[#1a1a1a] py-3 rounded-md font-semibold hover:bg-[#ffd700]"
            >
              Analyze Another Resume
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
