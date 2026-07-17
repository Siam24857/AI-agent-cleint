import Link from "next/link";
import { Target, Cpu, Users, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";

const stats = [
  { value: "50,000+", label: "Career plans created" },
  { value: "120+", label: "Countries served" },
  { value: "95%", label: "Users report clarity" },
  { value: "4.8/5", label: "Average satisfaction" },
];

const values = [
  {
    icon: Target,
    title: "Outcome-focused",
    description:
      "We measure success by real progress — interviews booked, skills gained, and confident decisions made — not by time spent on the platform.",
  },
  {
    icon: Cpu,
    title: "AI done responsibly",
    description:
      "Our guidance is transparent and grounded in labour-market data. We explain the 'why' behind every recommendation so you stay in control.",
  },
  {
    icon: Users,
    title: "Built for everyone",
    description:
      "From first-time job seekers to seasoned switchers, our tools adapt to your context, background, and ambitions without judgement.",
  },
  {
    icon: HeartHandshake,
    title: "Human at the core",
    description:
      "Technology accelerates the work, but career growth is deeply personal. We design every feature to feel like a supportive mentor, not a machine.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#1a1a1a]">
      <section className="bg-gradient-to-br from-[#2d2d2d] via-[#333333] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-[#ffea00]/20 px-4 py-1 text-sm font-medium text-[#ffea00]">
              About Us
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              We help people build careers they are proud of
            </h1>
            <p className="mt-4 text-lg text-[#aaaaaa]">
              AI Career Mentor is on a mission to make expert career guidance
              affordable and accessible to everyone. We combine the scale of
              artificial intelligence with the warmth of human mentoring so that
              no one has to navigate their career alone.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Our mission
            </h2>
            <p className="mt-4 text-[#aaaaaa]">
              Traditional career counselling is expensive, slow, and often
              unavailable to the people who need it most. We started AI Career
              Mentor to close that gap — giving every ambitious learner a
              personalised, always-available guide to their next role.
            </p>
            <p className="mt-4 text-[#aaaaaa]">
              Whether you are entering the workforce, returning after a break, or
              pivoting into a new field, our platform meets you where you are and
              shows you a credible path forward.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              What we do
            </h2>
            <p className="mt-4 text-[#aaaaaa]">
              We turn scattered advice into a single, actionable plan. Resume
              feedback, role recommendations, interview practice, and learning
              roadmaps all live in one place — so you spend less time wondering
              what to do and more time doing it.
            </p>
            <ul className="mt-4 space-y-2 text-[#aaaaaa]">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-1 h-4 w-4 flex-none text-[#ffea00]" />
                Privacy-first: your data is yours, and we are transparent about how it is used.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-1 h-4 w-4 flex-none text-[#ffea00]" />
                Evidence-based: recommendations reflect real hiring trends, not generic tips.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-1 h-4 w-4 flex-none text-[#ffea00]" />
                Continuous: your plan updates as you learn and the market shifts.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#2d2d2d] via-[#333333] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Our AI approach
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-[#aaaaaa]">
              Every feature is powered by Google's Gemini models, fine-tuned for
              career contexts. Gemini lets us understand nuanced resumes, generate
              realistic interview questions, and hold natural coaching
              conversations — all while keeping responses grounded and useful.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-[#2d2d2d] rounded-xl shadow p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ffea00]/20">
                    <Icon className="h-6 w-6 text-[#ffea00]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#aaaaaa]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-[#ffea00] px-8 py-12 text-center sm:grid-cols-4 shadow-lg">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-[#1a1a1a]">{stat.value}</div>
              <div className="mt-1 text-sm text-[#1a1a1a] font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex items-center rounded-lg bg-[#ffea00] px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow hover:bg-[#ffd700]"
          >
            Join AI Career Mentor
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
