"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import {
  Sparkles,
  FileText,
  TrendingUp,
  MessageCircle,
  Briefcase,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Target,
  Users,
} from "lucide-react";
import FeaturesPage from "@/features/FeaturesPage";

const stats = [
  { label: "Active Job Listings", value: "12,000+" },
  { label: "Resumes Analyzed", value: "48,000+" },
  { label: "Interviews Practiced", value: "120,000+" },
  { label: "Career Success Rate", value: "92%" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Frontend Engineer @ NovaTech",
    content:
      "The AI Resume Analyzer pinpointed exactly why I was getting rejected. After fixing the gaps it flagged, I landed 3 interviews in a week.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Data Scientist @ Quanta",
    content:
      "The learning roadmap kept me accountable for 6 months. The weekly structure is better than any paid course I tried.",
    rating: 5,
  },
  {
    name: "Sara Thomas",
    role: "UX Designer @ Lumen",
    content:
      "Interview practice with instant feedback made me actually enjoy preparing. I walked in confident and got the offer.",
    rating: 5,
  },
];

const howItWorks = [
  {
    icon: Target,
    title: "Tell us your goal",
    desc: "Share your skills, experience, and target role. Our AI builds a profile of where you are.",
  },
  {
    icon: Sparkles,
    title: "Get AI guidance",
    desc: "Receive resume analysis, job matches, interview questions, and a personalized learning plan.",
  },
  {
    icon: CheckCircle2,
    title: "Land the role",
    desc: "Track progress, refine with feedback, and apply with confidence to the right opportunities.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
<main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#000000] text-[#ffea00]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ffea00]/20 px-4 py-1.5 text-sm font-medium mb-6">
            <Zap className="h-4 w-4" /> Powered by Gemini AI
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your AI-Powered
            <br /> Career Growth Partner
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Resume analysis, job recommendations, interview prep, and personalized
            learning roadmaps — all in one intelligent platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push(isAuthenticated ? "/recommendations" : "/register")}
              className="bg-[#ffea00] text-[#000000] px-8 py-3 rounded-lg font-semibold hover:bg-[#ffea00] transition flex items-center justify-center gap-2"
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/features"
              className="border-2 border-[#ffea00] px-8 py-3 rounded-lg font-semibold hover:bg-[#ffea00]/10 transition"
            >
              Explore Features
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-xs md:text-sm opacity-80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesPage />

      {/* How it works */}
      <section className="py-20 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#ffea00] mb-4">How It Works</h2>
            <p className="text-lg text-[#cccccc] max-w-2xl mx-auto">
              A simple, guided path from where you are to where you want to be.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center mb-5">
                    <Icon className="h-8 w-8 text-[#ffea00]" />
                  </div>
                  <div className="text-sm font-semibold text-[#ffea00] mb-1">STEP {i + 1}</div>
                  <h3 className="text-xl font-semibold text-[#ffea00] mb-2">{step.title}</h3>
                  <p className="text-[#cccccc]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Tools highlight */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#ffea00] mb-4">
              Intelligent Tools, Real Outcomes
            </h2>
            <p className="text-lg text-[#cccccc] max-w-2xl mx-auto">
              Every feature is powered by reasoning AI, not just text generation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "AI Resume Analyzer", desc: "ATS scores, strengths, and fixes in seconds." },
              { icon: TrendingUp, title: "Recommendation Engine", desc: "Context-aware job and course matches." },
              { icon: MessageCircle, title: "Career Chat Assistant", desc: "Conversational guidance with memory." },
              { icon: Briefcase, title: "Interview Generator", desc: "Role-specific questions with feedback." },
              { icon: BookOpen, title: "Learning Roadmaps", desc: "Personalized weekly plans and milestones." },
              { icon: Users, title: "Skill Gap Analysis", desc: "Know exactly what to learn next." },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="bg-[#1a1a1a] rounded-xl shadow p-6">
                  <Icon className="h-8 w-8 text-[#ffea00] mb-4" />
                  <h3 className="text-lg font-semibold text-[#ffea00] mb-1">{t.title}</h3>
                  <p className="text-[#cccccc] text-sm">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#ffea00] mb-4">
              Loved by Job Seekers
            </h2>
            <p className="text-lg text-[#cccccc]">Real stories from people who leveled up their careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333333]">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#ffea00] fill-[#ffea00]" />
                  ))}
                </div>
                <p className="text-[#cccccc] mb-4">"{t.content}"</p>
                <div className="font-semibold text-[#ffea00]">{t.name}</div>
                <div className="text-sm text-[#999999]">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1a1a1a] text-[#ffea00]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Building Your Dream Career Today
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of professionals using AI to accelerate their careers. Free to start.
          </p>
          <Link
            href={isAuthenticated ? "/recommendations" : "/register"}
            className="inline-flex items-center gap-2 bg-[#ffea00] text-[#000000] px-8 py-3 rounded-lg font-semibold hover:bg-[#ffea00] transition"
          >
            Create Free Account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#ffea00] mb-3">Stay Ahead in Your Career</h2>
          <p className="text-[#cccccc] mb-6">
            Get weekly AI career tips, job market insights, and product updates.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-md border border-[#333333] bg-[#000000] px-4 py-3 text-[#ffea00] focus:outline-none focus:ring-2 focus:ring-[#ffea00]"
            />
            <button
              type="submit"
              className="bg-[#ffea00] text-[#000000] px-6 py-3 rounded-md font-semibold hover:bg-[#ffea00]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
