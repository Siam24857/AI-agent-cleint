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
  { icon: FileText, title: "Resume Analyzer", desc: "Check ATS score & get fixes", href: "/resume/analyze", color: "bg-[#ffea00]" },
  { icon: TrendingUp, title: "Recommendations", desc: "AI-matched jobs for you", href: "/recommendations", color: "bg-[#ffea00]" },
  { icon: MessageCircle, title: "Career Chat", desc: "Talk to your AI mentor", href: "/chat", color: "bg-[#ffea00]" },
  { icon: Briefcase, title: "Interview Prep", desc: "Practice & get feedback", href: "/interview", color: "bg-[#ffea00]" },
  { icon: BookOpen, title: "Learning Roadmap", desc: "Plan your skill growth", href: "/roadmap", color: "bg-[#ffea00]" },
  { icon: BarChart3, title: "Skill Assessment", desc: "Find your gaps", href: "/skills", color: "bg-[#ffea00]" },
];

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-6 w-6 text-[#ffea00]" />
          <h1 className="text-3xl font-bold text-white">
            Welcome, {user?.fullname?.split(" ")[0] || "there"}
          </h1>
        </div>
        <p className="text-[#aaaaaa] mb-8">Your AI career toolkit, all in one place.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="bg-[#2d2d2d] rounded-xl shadow p-6 hover:shadow-lg transition flex flex-col"
              >
                <div className={`${t.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-[#1a1a1a]" />
                </div>
                <h3 className="text-lg font-semibold text-white">{t.title}</h3>
                <p className="text-[#888888] text-sm mb-4">{t.desc}</p>
                <span className="mt-auto inline-flex items-center text-[#ffea00] font-medium text-sm">
                  Open <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 bg-[#2d2d2d] rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/jobs" className="bg-[#ffea00] text-[#1a1a1a] px-5 py-2.5 rounded-md font-medium hover:bg-[#ffd700]">
              Browse Jobs
            </Link>
            <Link href="/resume/analyze" className="border border-[#ffea00] text-[#ffea00] px-5 py-2.5 rounded-md font-medium hover:bg-[#ffea00]/10">
              Analyze Resume
            </Link>
            <Link href="/recommendations" className="border border-[#ffea00] text-[#ffea00] px-5 py-2.5 rounded-md font-medium hover:bg-[#ffea00]/10">
              Get Recommendations
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
