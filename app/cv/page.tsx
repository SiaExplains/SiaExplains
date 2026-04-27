import type { Metadata } from "next";
import { Briefcase, GraduationCap, Code2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum Vitae of Siavash Ghanbari — Principal Software Engineer & Manager based in Berlin.",
};

const experience = [
  {
    role: "Principal Software Engineer | Manager",
    company: "MHP",
    period: "Oct 2023 — Present",
    location: "Berlin, Germany",
    bullets: [
      "Led a cross functional team.",
      "Designed and developed KPI Comparison for Volkswagen Group plants.",
      "Implemented Virtual Meter Concept for Volkswagen energy consumption dashboard.",
      "Elevated code quality through refactoring, introducing strong types, decoupling, and adhering to SOLID.",
      "Automated CI/CD release for staging and production which was manual before.",
      "Designed and Implemented the Automatic Outlier Detection for incoming consumption data.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Trademachines GmbH",
    period: "Aug 2020 — Oct 2023",
    location: "Berlin, Germany",
    bullets: [
      "Developed a new management dashboard for data visualization and insights based on Next.js 13.",
      "Boosted Web Core Vitals metrics by 18%, enhancing user experience with smoother interactions.",
      "Introduced Google Optimize for A/B testing, increasing user engagement by 30% and conversion rates by 20%.",
      "Developed interactive map feature, contributing to an 11% increase in Time-On-Site.",
      "Led migration from legacy PHP7 to ReactJS, improving performance and modernizing UI.",
      "Migrated Google Analytics to GA4, ensuring accurate and comprehensive data analysis.",
      "Introduced a Cookie-Consent Manager to ensure compliance and safeguard user privacy.",
      "Resolved multiple technical SEO issues, boosting SEO rankings and organic traffic by 30%.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "AIMEX5",
    period: "Mar 2019 — Jul 2020",
    location: "Sydney, Australia",
    bullets: [
      "Migrated the e-commerce application from legacy PHP to ReactJS + Node.js from scratch.",
      "Created a ticketing system to facilitate communication between the company and customers.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "SON Corporate Group",
    period: "Apr 2017 — Jan 2020",
    location: "Tehran, Iran",
    bullets: [
      "Played a pivotal role in creating a user-friendly financial data entry application.",
      "Improved a spreadsheet application with a custom language that helps users design financial forms without any programming expertise.",
    ],
  },
  {
    role: "Lead Software Engineer",
    company: "Soniran Ltd",
    period: "Mar 2016 — Mar 2017",
    location: "Tehran, Iran",
    bullets: [
      "Created an E-Wallet and Credit System that leveraged user transactions on debit cards.",
      "Led and managed the front-end and back-end team with expertise, ensuring successful project execution.",
    ],
  },
  {
    role: "Senior Back-End Developer",
    company: "Iranhost Ltd.",
    period: "Sep 2015 — Feb 2016",
    location: "Tehran, Iran",
    bullets: [
      "Enhanced the membership module in Iranhost's website builder, resulting in a 25% increase in Time-On-Site.",
      "Improved the current authorization pipeline with a token-based authorization process, enabling seamless integration of sub-apps.",
    ],
  },
  {
    role: "Senior Backend Developer",
    company: "IT Orbit Ltd.",
    period: "Jun 2015 — Aug 2015",
    location: "Tehran, Iran",
    bullets: [
      "Streamlined processes and integrated advanced technologies, resulting in a 40% reduction in administrative tasks and a 40% increase in operational efficiency for the Iranian Health Organization.",
      "Key role in developing a comprehensive system for seamless data flow across healthcare entities.",
      "Designed highly efficient back-end APIs that retrieved and processed raw data from diverse applications, improving data accessibility and retrieval speed.",
    ],
  },
  {
    role: "Software Developer",
    company: "Saman International Analysts Ltd.",
    period: "May 2012 — May 2015",
    location: "Tehran, Iran",
    bullets: [
      "Redesigned an app based on ISO-8553 for Financial transaction card originated interchange messaging.",
      "Implemented an automatic, manageable, and modular updating system in the core app, resulting in annual savings of $50,000.",
      "Led the implementation of modules including deposit process, withdrawals, and transfers.",
    ],
  },
  {
    role: "CTO and Co-Founder",
    company: "Taazuu Developers Ltd.",
    period: "Jul 2007 — Feb 2012",
    location: "Ghaemshahr, Iran",
    bullets: [
      "Advised a system architecture for a LMS (Learning Management System) for Payame-Noor University of Mazandaran.",
      "Built a multilingual dictionary that supports over 12 languages and can scan text from images using OCR.",
      "Produced over 12 portfolios and small shops using Microsoft ASP Classic.",
      "Implemented a native Windows application for issuing and distributing fuel cards in 14 cities.",
    ],
  },
];

const education = [
  {
    degree: "BS in Software Engineering",
    institution: "Mazandaran University",
    period: "",
    note: "Iran",
  },
  {
    degree: "Associate Degree in Computer Science",
    institution: "Azad University",
    period: "",
    note: "Iran",
  },
];

const skills = {
  "Current Stack": [
    "ReactJS", "Next.js", "Node.js", "TypeScript", "JavaScript",
    "AWS", "AWS Lambda", "AWS EC2/ECS", "AWS CloudFormation", "AWS SQS/SNS/S3",
    "Redshift", "DynamoDB", "AWS Redis", "MongoDB", "PostgreSQL",
    "Elastic Search", "GraphQL", "Redux", "ExpressJS",
    "Serverless & Microservice Architecture", "OOP", "Functional Programming",
    "Design Patterns", "SOLID", "TDD", "Cucumber Gherkin",
    "Jest", "Enzyme", "Jasmine", "Cypress",
    "HTML", "CSS", "SCSS", "Bootstrap", "Material UI", "Atomic Design", "BEM",
    "Docker", "Nginx", "Git", "GitHub", "GitLab", "Travis CI",
    "Webpack", "ESLint", "Terraform", "Algolia", "Stripe", "Python",
  ],
  "Prior Stack": [
    "C#", "ASP.NET Core", "MS-SQL", "Oracle", "Java J2ME",
    "EF & LINQ", "Angular", "RxJS", "jQuery", "COBOL", "IBM z/OS & DB2",
  ],
};

const languages = [
  { lang: "English", level: "Fluent" },
  { lang: "German", level: "A2" },
  { lang: "Persian", level: "Native" },
];

export default function CvPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-gray-200 dark:border-white/5">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Siavash Ghanbari</h1>
        <p className="text-brand-500 dark:text-brand-400 text-lg mb-1">
          Principal Software Engineer | Manager
        </p>
        <p className="text-gray-500 text-sm">
          Berlin, Germany · siaexplains@gmail.com · siaexplains.com
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          Spearheaded the delivery of engineering solutions for web, mobile, and native
          applications, leveraging ReactJS, NodeJS, AWS, and MongoDB, resulting in{" "}
          <strong className="text-gray-900 dark:text-white">+25 successful projects</strong> and{" "}
          <strong className="text-gray-900 dark:text-white">over 17 years</strong> of proven
          success in exceeding client expectations and driving revenue growth.
        </p>
      </div>

      {/* Experience */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          <Briefcase size={14} />
          Experience
        </div>
        <div className="space-y-8">
          {experience.map((job) => (
            <div
              key={`${job.company}-${job.period}`}
              className="border-l-2 border-gray-200 dark:border-white/5 pl-5 hover:border-brand-500/40 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{job.role}</h3>
                  <p className="text-brand-500 dark:text-brand-400 text-sm">{job.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{job.period}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-600">{job.location}</p>
                </div>
              </div>
              <ul className="space-y-1 mt-3">
                {job.bullets.map((b, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                    <span className="text-brand-500 mt-1 shrink-0">›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          <GraduationCap size={14} />
          Education
        </div>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.institution} className="border-l-2 border-gray-200 dark:border-white/5 pl-5">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                  <p className="text-brand-500 dark:text-brand-400 text-sm">{edu.institution}</p>
                </div>
                {edu.period && <p className="text-sm text-gray-500">{edu.period}</p>}
              </div>
              {edu.note && (
                <p className="text-sm text-gray-500 dark:text-gray-600 mt-1 italic">{edu.note}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          <Code2 size={14} />
          Skills
        </div>
        <div className="space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex flex-wrap gap-x-6 gap-y-2">
              <span className="text-sm text-gray-500 dark:text-gray-600 w-32 shrink-0">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          <Globe size={14} />
          Languages
        </div>
        <div className="flex flex-wrap gap-4">
          {languages.map(({ lang, level }) => (
            <div
              key={lang}
              className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white">{lang}</p>
              <p className="text-xs text-gray-500">{level}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
