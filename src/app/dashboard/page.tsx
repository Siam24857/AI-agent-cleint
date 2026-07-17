"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import {
  FileText,
  TrendingUp,
  MessageCircle,
  Briefcase,
  BookOpen,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const tools = [
  { icon: FileText, title: "Resume Analyzer", desc: "Check ATS score & get fixes", href: "/resume/analyze", color: "bg-green-500" },
  { icon: TrendingUp, title: "Recommendations", desc: "AI-matched jobs for you", href: "/recommendations", color: "bg-purple-500" },
  { icon: MessageCircle, title: "Career Chat", desc: "Talk to your AI mentor", href: "/chat", color: "bg-blue-500" },
  { icon: Briefcase, title: "Interview Prep", desc: "Practice & get feedback", href: "/interview", color: "bg-orange-500" },
  { icon: BookOpen, title: "Learning Roadmap", desc: "Plan your skill growth", href: "/roadmap", color: "bg-red-500" },
  { icon: BarChart3, title: "Skill Assessment", desc: "Find your gaps", href: "/skills", color: "bg-teal-500" },
];

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-6 w-6 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.fullname?.split(" ")[0] || "there"}
          </h1>
        </div>
        <p className="text-gray-600 mb-8">Your AI career toolkit, all in one place.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex flex-col"
              >
                <div className={`${t.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{t.desc}</p>
                <span className="mt-auto inline-flex items-center text-indigo-600 font-medium text-sm">
                  Open <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/jobs" className="bg-indigo-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-indigo-700">
              Browse Jobs
            </Link>
            <Link href="/resume/analyze" className="border border-indigo-600 text-indigo-700 px-5 py-2.5 rounded-md font-medium hover:bg-indigo-50">
              Analyze Resume
            </Link>
            <Link href="/recommendations" className="border border-indigo-600 text-indigo-700 px-5 py-2.5 rounded-md font-medium hover:bg-indigo-50">
              Get Recommendations
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
