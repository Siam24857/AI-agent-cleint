"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ChevronDown, Send } from "lucide-react";

const faqs = [
  {
    q: "Is AI Career Mentor free to use?",
    a: "Yes — core features including the resume analyzer, recommendation engine, and chat assistant are free to start. We may introduce premium plans for advanced roadmaps and unlimited assessments in the future.",
  },
  {
    q: "How does the AI give career advice?",
    a: "Our assistant is powered by Google's Gemini models, trained on career and labour-market patterns. It analyzes your profile, goals, and the skills employers ask for, then returns transparent, personalised guidance you can act on.",
  },
  {
    q: "Is my resume and personal data safe?",
    a: "We treat your data as private. Resumes are used only to generate your feedback and are never sold. You can request deletion of your account and associated data at any time from your profile settings.",
  },
  {
    q: "Can I use this if I am changing careers?",
    a: "Absolutely. Many users are career switchers. The learning roadmap and skill assessment are specifically designed to identify transferable strengths and bridge gaps toward a new field.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
              Contact
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Get in touch with our team
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Questions, feedback, or partnership ideas? We would love to hear
              from you. Our support team typically replies within one business
              day.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
            {submitted ? (
              <div className="mt-6 rounded-xl bg-indigo-50 p-6">
                <p className="text-lg font-semibold text-indigo-700">
                  Thank you, {form.name || "friend"}!
                </p>
                <p className="mt-2 text-slate-600">
                  Your message has been received. We will get back to you at{" "}
                  <span className="font-medium">{form.email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send message
                </button>
              </form>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Contact details</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Email</p>
                  <a
                    href="mailto:hello@aicareermentor.com"
                    className="text-slate-600 hover:text-indigo-600"
                  >
                    hello@aicareermentor.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Phone</p>
                  <a
                    href="tel:+918000000000"
                    className="text-slate-600 hover:text-indigo-600"
                  >
                    +91 80000 00000
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Office</p>
                  <p className="text-slate-600">Bengaluru, Karnataka, India</p>
                </div>
              </div>
            </div>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-3">
              {faqs.map((faq, i) => (
                <div key={faq.q} className="bg-white rounded-xl shadow p-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="font-medium text-slate-900">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-none text-indigo-600 transition ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="mt-3 text-sm text-slate-600">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
