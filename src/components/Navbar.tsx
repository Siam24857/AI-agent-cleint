"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth-provider";
import {
  Menu,
  X,
  Sparkles,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  FileText,
  TrendingUp,
  MessageCircle,
  Briefcase,
  BookOpen,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const featureLinks = [
  { href: "/resume/analyze", label: "Resume Analyzer", desc: "ATS scores & fixes", icon: FileText },
  { href: "/recommendations", label: "Recommendations", desc: "AI-matched jobs", icon: TrendingUp },
  { href: "/chat", label: "Career Chat", desc: "Talk to your AI mentor", icon: MessageCircle },
  { href: "/interview", label: "Interview Prep", desc: "Practice & feedback", icon: Briefcase },
  { href: "/roadmap", label: "Learning Roadmap", desc: "Personalized plans", icon: BookOpen },
  { href: "/skills", label: "Skill Assessment", desc: "Find your gaps", icon: BarChart3 },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setFeaturesOpen(false);
    setUserOpen(false);
  }, [pathname]);

  const initial = (user?.fullname || "U").charAt(0).toUpperCase();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-gray-200/70 shadow-[0_4px_24px_-12px_rgba(79,70,229,0.25)]"
          : "bg-white/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 text-white shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-400 opacity-0 blur transition-opacity group-hover:opacity-60" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-gray-900">
            AI<span className="text-indigo-600">Career</span>
            <span className="text-violet-500">Mentor</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {publicLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(pathname, l.href)
                  ? "text-indigo-700"
                  : "text-gray-600 hover:text-indigo-700"
              }`}
            >
              {l.label}
              {isActive(pathname, l.href) && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
              )}
            </Link>
          ))}

          {/* Features mega-menu */}
          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith("/resume") ||
                pathname.startsWith("/recommend") ||
                pathname.startsWith("/chat") ||
                pathname.startsWith("/interview") ||
                pathname.startsWith("/roadmap") ||
                pathname.startsWith("/skills")
                  ? "text-indigo-700"
                  : "text-gray-600 hover:text-indigo-700"
              }`}
            >
              Features
              <ChevronDown className={`h-4 w-4 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
            </button>

            <div
              className={`absolute left-1/2 top-full z-50 mt-2 w-[34rem] -translate-x-1/2 transition-all duration-200 ${
                featuresOpen
                  ? "visible opacity-100 translate-y-0"
                  : "invisible opacity-0 -translate-y-1"
              }`}
            >
              <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl shadow-indigo-500/10">
                <div className="grid grid-cols-2 gap-1">
                  {featureLinks.map((f) => {
                    const Icon = f.icon;
                    return (
                      <Link
                        key={f.href}
                        href={f.href}
                        className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-indigo-50"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover/item:bg-indigo-600 group-hover/item:text-white">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-gray-900">{f.label}</span>
                          <span className="block text-xs text-gray-500">{f.desc}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/features"
                  className="mt-1 flex items-center justify-center gap-1 rounded-xl bg-gray-50 py-2.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                >
                  View all features <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop auth */}
        <div className="hidden lg:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="relative" onMouseEnter={() => setUserOpen(true)} onMouseLeave={() => setUserOpen(false)}>
              <button className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-2.5 hover:border-indigo-300 transition-colors">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                  {initial}
                </span>
                <span className="text-sm font-medium text-gray-700 max-w-[8rem] truncate">
                  {user?.fullname?.split(" ")[0] || "Account"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              <div
                className={`absolute right-0 top-full z-50 mt-2 w-52 transition-all duration-200 ${
                  userOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
                }`}
              >
                <div className="rounded-xl border border-gray-100 bg-white p-1.5 shadow-2xl shadow-indigo-500/10">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="group relative inline-flex items-center gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-transform hover:scale-[1.03]"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden grid h-10 w-10 place-items-center rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4 space-y-1">
            {publicLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(pathname, l.href)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              AI Features
            </p>
            {featureLinks.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.href}
                  href={f.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                >
                  <Icon className="h-4 w-4 text-indigo-600" />
                  {f.label}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 mt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="flex items-center justify-center gap-1 rounded-lg bg-red-50 py-2.5 text-sm font-medium text-red-600"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-lg border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
