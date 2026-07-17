import Link from "next/link";
import { Sparkles, Mail, MapPin, Phone, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#cccccc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-4">
              <Sparkles className="h-6 w-6 text-[#ffea00]" />
              AI Career Mentor
            </Link>
            <p className="text-sm text-[#888888] max-w-xs">
              Your personal AI-powered career guidance platform. Resume analysis, job
              recommendations, interview prep, and personalized learning roadmaps.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#ffea00]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#ffea00]">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#ffea00]">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-[#ffea00]">Features</Link></li>
              <li><Link href="/jobs" className="hover:text-[#ffea00]">Browse Jobs</Link></li>
              <li><Link href="/recommendations" className="hover:text-[#ffea00]">Recommendations</Link></li>
              <li><Link href="/roadmap" className="hover:text-[#ffea00]">Learning Roadmap</Link></li>
              <li><Link href="/blog" className="hover:text-[#ffea00]">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-[#ffea00]">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#ffea00]">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#ffea00]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#ffea00]">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#ffea00]" /> hello@aicareermentor.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#ffea00]" /> +91 80000 00000
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#ffea00]" /> Bengaluru, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#333333] mt-10 pt-6 text-center text-sm text-[#666666]">
          © {new Date().getFullYear()} AI Career Mentor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
