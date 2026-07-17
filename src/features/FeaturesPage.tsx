import { MessageCircle, Sparkles, TrendingUp, Briefcase, FileText, Map, Users, Code, Trophy, Calendar, BookOpen, Cloud, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    name: 'AI Chat Assistant',
    description: 'Conversational AI with memory, streaming, and contextual awareness for career guidance.',
    icon: MessageCircle,
    color: 'bg-blue-500',
    href: '/chat',
  },
  {
    name: 'AI Resume Analyzer',
    description: 'Upload PDF resumes and get comprehensive analysis with ATS scores and recommendations.',
    icon: FileText,
    color: 'bg-green-500',
    href: '/resume/analyze',
  },
  {
    name: 'Career Recommendation Engine',
    description: 'AI-powered job, course, and project recommendations based on your skills and preferences.',
    icon: TrendingUp,
    color: 'bg-purple-500',
    href: '/recommendations',
  },
  {
    name: 'Interview Generator',
    description: 'Generate customized interview questions for behavioral, technical, and HR assessments.',
    icon: Briefcase,
    color: 'bg-orange-500',
    href: '/interview',
  },
  {
    name: 'Learning Planner',
    description: 'Personalized weekly learning plans with daily tasks, resources, and progress tracking.',
    icon: BookOpen,
    color: 'bg-red-500',
    href: '/roadmap',
  },
  {
    name: 'Skill Assessment',
    description: 'Analyze your current skills and identify gaps for career advancement.',
    icon: BarChart3,
    color: 'bg-teal-500',
    href: '/skills',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">AI-Powered Career Tools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools helps you build the career you want,
            from resume optimization to interview preparation and skill development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}
>                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
