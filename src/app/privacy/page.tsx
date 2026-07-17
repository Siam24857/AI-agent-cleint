import Link from "next/link";

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly, such as your name, email address, and password when you register, as well as the resume, career goals, and responses you share with our tools. We also collect limited usage data — such as the features you use and device information — to improve the platform. We do not intentionally collect sensitive personal data beyond what is necessary to deliver career guidance.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information is used to create and maintain your account, generate AI-powered resume feedback, recommendations, roadmaps, and chat responses, and to communicate with you about your account or product updates. Aggregated, anonymised data may be used to train and evaluate our models and to understand overall platform usage. We never sell your personal data.",
  },
  {
    title: "3. Cookies and Tracking",
    body: "We use essential cookies to keep you signed in and to remember your preferences. We may also use analytics cookies to understand how the site is used. You can disable non-essential cookies in your browser settings; doing so may limit some functionality. We do not use cookies to build advertising profiles about you.",
  },
  {
    title: "4. Data Security",
    body: "We protect your data using industry-standard measures, including encryption in transit and access controls. While no online service can guarantee absolute security, we continuously review our practices and limit access to personal data to authorised personnel who need it to operate the service.",
  },
  {
    title: "5. Your Rights",
    body: "Depending on your jurisdiction, you may have the right to access, correct, export, or delete your personal data. You can review and update your information from your account settings, and you may request account deletion at any time by contacting hello@aicareermentor.com. We will respond to verified requests within the timeframes required by applicable law.",
  },
  {
    title: "6. Contact Us",
    body: "If you have questions about this Privacy Policy or how your data is handled, please reach out to us at hello@aicareermentor.com or write to our office in Bengaluru, India. We are happy to clarify any practice described here.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
            Legal
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="mt-3 text-slate-600">
            Last updated: January 2026. This policy explains what we collect, why
            we collect it, and the choices you have.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-slate-900">
                {section.title}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-indigo-50 p-6">
          <p className="text-slate-700">
            By using AI Career Mentor, you acknowledge that you have read and
            understood this Privacy Policy. Questions?{" "}
            <Link
              href="/contact"
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              Contact our team
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
