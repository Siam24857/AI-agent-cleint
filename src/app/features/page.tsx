import Link from "next/link";
import {
  FileText,
  Sparkles,
  MessageSquare,
  Video,
  Map,
  Gauge,
  ArrowRight,
  Upload,
  Brain,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Resume Analyzer",
    description:
      "Upload your resume and get instant, section-by-section feedback powered by Gemini. We score clarity, skills coverage, and formatting, then suggest concrete edits to beat applicant-tracking systems.",
    href: "/resume/analyze",
  },
  {
    icon: Sparkles,
    title: "Recommendation Engine",
    description:
      "Tell us your goals and we match you with relevant jobs, courses, and hands-on projects drawn from your profile, experience level, and the skills employers are actually asking for.",
    href: "/recommendations",
  },
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description:
      "Stuck on a career decision? Chat with our mentor assistant for tailored advice on salaries, transitions, upskilling, and interview prep — available whenever you are.",
    href: "/chat",
  },
  {
    icon: Video,
    title: "Interview Generator",
    description:
      "Practice with role-specific questions generated for your target job. Get realistic prompts across behavioural and technical rounds, then refine your answers with AI evaluation.",
    href: "/interview",
  },
  {
    icon: Map,
    title: "Learning Roadmap",
    description:
      "Receive a personalised, week-by-week learning path that bridges the gap between where you are and where your dream role lives — with milestones you can actually track.",
    href: "/roadmap",
  },
  {
    icon: Gauge,
    title: "Skill Assessment",
    description:
      "Benchmark your strengths against the market. Our assessments surface the competencies you already have and the ones worth building next, with evidence-based next steps.",
    href: "/skills",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Share your profile",
    description:
      "Upload a resume or answer a few quick questions about your background, goals, and experience.",
  },
  {
    icon: Brain,
    title: "AI analyzes the fit",
    description:
      "Our Gemini-powered models map your skills to roles, gaps, and opportunities in minutes — not weeks.",
  },
  {
    icon: Bot,
    title: "Act on a plan",
    description:
      "Get a clear roadmap, tailored recommendations, and an assistant that helps you execute every step.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
              Platform Features
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Everything you need to grow your career with AI
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              AI Career Mentor combines resume analysis, personalised
              recommendations, and an intelligent assistant into one guided
              experience — built for job seekers, career switchers, and lifelong
              learners.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700"
              >
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Try the assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group bg-white rounded-xl shadow p-6 transition hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {feature.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                  Open feature
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              How it works
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              From first sign-in to a concrete action plan in three simple steps.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="bg-white rounded-xl shadow p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-indigo-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-indigo-600 rounded-2xl px-8 py-12 text-center shadow-lg">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to plan your next career move?
          </h2>
          <p className="mt-3 text-lg text-indigo-100">
            Create a free account and let AI map the fastest path to your goals.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow hover:bg-indigo-50"
          >
            Create your free account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
