'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import {
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiArrowRight,
  HiOutlineChevronRight,
  HiOutlinePrinter,
} from 'react-icons/hi';

// ─── Brand palette (single source of truth) ──────────────────
const BRAND = '#0A367D';
const BRAND_DARK = '#082B66';

// ─── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Policy data ─────────────────────────────────────────────
const LAST_UPDATED = 'May 15, 2024';
const EFFECTIVE_DATE = 'May 15, 2024';

const SECTIONS = [
  {
    id: 'introduction',
    num: '01',
    title: 'Introduction',
    body: [
      'Elizon ("we", "us", "our") is committed to protecting the privacy and security of the personal information you share with us. This Privacy Policy explains how we collect, use, store, share, and protect information when you visit our website, request a quote, contact our team, or purchase our industrial machinery.',
      'By using our website or services, you agree to the practices described in this policy. If you do not agree, please discontinue use of our website and services.',
    ],
  },
  {
    id: 'information-we-collect',
    num: '02',
    title: 'Information We Collect',
    body: [
      'We collect information in three primary ways: information you provide directly, information collected automatically, and information from third-party sources.',
    ],
    subsections: [
      {
        title: 'Information you provide directly',
        list: [
          'Contact details such as your name, company name, email address, phone number, and postal address',
          'Enquiry details submitted through our contact forms, quote requests, or WhatsApp channel',
          'Technical specifications, drawings, or project details you share for machine configuration',
          'Communication history including emails, calls, and meeting notes',
          'Payment and billing information when placing an order',
        ],
      },
      {
        title: 'Information collected automatically',
        list: [
          'Device information including browser type, operating system, and screen size',
          'IP address, approximate geographic location, and time zone',
          'Pages viewed, links clicked, and duration of visits',
          'Referral source and search terms that brought you to our website',
          'Cookies and similar tracking technologies (see Section 06)',
        ],
      },
      {
        title: 'Information from third parties',
        list: [
          'Business directories and B2B platforms where you have listed your company',
          'Trade show and event registration systems',
          'Referral partners and channel distributors',
          'Publicly available sources for company verification',
        ],
      },
    ],
  },
  {
    id: 'how-we-use',
    num: '03',
    title: 'How We Use Your Information',
    body: [
      'We use the information we collect only for legitimate business purposes. We do not sell, rent, or trade your personal information to any third party.',
    ],
    list: [
      'Respond to your enquiries, quote requests, and service tickets',
      'Process orders and coordinate delivery, installation, and after-sales support',
      'Provide technical documentation, training, and warranty coverage',
      'Send transactional communications such as order confirmations and shipping updates',
      'Send marketing communications — only when you have opted in',
      'Improve our website, products, and customer experience',
      'Comply with legal, tax, and regulatory obligations',
      'Detect, prevent, and address fraud, security, or technical issues',
    ],
  },
  {
    id: 'sharing',
    num: '04',
    title: 'How We Share Information',
    body: [
      'We only share your information with parties who help us operate our business, and only to the extent necessary. All such parties are bound by confidentiality and data protection obligations.',
    ],
    list: [
      'Service providers — logistics partners, installation teams, and payment processors',
      'Technology partners — website hosting, email delivery, and CRM systems',
      'Professional advisors — lawyers, auditors, and compliance consultants',
      'Legal authorities — when required by law, court order, or to protect our rights',
      'Business transfers — in the event of a merger, acquisition, or sale of assets',
    ],
  },
  {
    id: 'data-security',
    num: '05',
    title: 'Data Security',
    body: [
      'We implement reasonable administrative, technical, and physical safeguards to protect your information against unauthorised access, alteration, disclosure, or destruction.',
    ],
    list: [
      'Encrypted transmission (HTTPS/TLS) for all data submitted through our website',
      'Role-based access controls limiting who can view customer data',
      'Regular backups and disaster recovery procedures',
      'Continuous monitoring and periodic security audits',
      'Confidentiality agreements with all employees and partners',
    ],
    note: 'While we take security seriously, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we continuously work to protect your data.',
  },
  {
    id: 'cookies',
    num: '06',
    title: 'Cookies & Tracking',
    body: [
      'Our website uses cookies and similar technologies to improve functionality, analyse traffic, and personalise your experience. You can control or disable cookies through your browser settings at any time.',
    ],
    list: [
      'Essential cookies — required for basic website functionality',
      'Analytics cookies — help us understand how visitors use our site',
      'Preference cookies — remember your settings and language',
      'Marketing cookies — used only if you have consented to marketing',
    ],
  },
  {
    id: 'your-rights',
    num: '07',
    title: 'Your Rights',
    body: [
      'Depending on your jurisdiction, you may have certain rights regarding your personal information. We honour these requests regardless of where you are located.',
    ],
    list: [
      'Access — request a copy of the personal information we hold about you',
      'Correction — request corrections to inaccurate or incomplete information',
      'Deletion — request deletion of your information, subject to legal retention requirements',
      'Restriction — request that we limit how we process your information',
      'Portability — request your data in a machine-readable format',
      'Objection — object to processing based on legitimate interest',
      'Withdraw consent — opt out of marketing communications at any time',
    ],
  },
  {
    id: 'data-retention',
    num: '08',
    title: 'Data Retention',
    body: [
      'We retain personal information only for as long as necessary to fulfil the purposes described in this policy, or as required by law. Retention periods vary depending on the type of information and the reason it was collected.',
    ],
    list: [
      'Enquiry data — retained for up to 3 years from last contact',
      'Customer records — retained for the duration of the relationship plus 7 years for tax and warranty purposes',
      'Marketing preferences — retained until you unsubscribe',
      'Website analytics — retained in aggregated form for up to 26 months',
    ],
  },
  {
    id: 'third-party-links',
    num: '09',
    title: 'Third-Party Links',
    body: [
      'Our website may contain links to third-party websites, tools, or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.',
    ],
  },
  {
    id: 'children',
    num: '10',
    title: "Children's Privacy",
    body: [
      'Our website and services are intended for business and professional use. We do not knowingly collect personal information from anyone under 16 years of age. If we become aware that such information has been collected, we will delete it promptly.',
    ],
  },
  {
    id: 'changes',
    num: '11',
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will update the "Last Updated" date at the top of this page and, where appropriate, notify you by email.',
      'We encourage you to review this policy periodically to stay informed about how we protect your information.',
    ],
  },
  {
    id: 'contact',
    num: '12',
    title: 'Contact Us',
    body: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to our data protection team. We aim to respond to all privacy-related enquiries within 5 business days.',
    ],
    contactCard: true,
  },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative bg-[#030712] text-white overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] blur-[140px] rounded-full pointer-events-none"
          style={{ background: `${BRAND}1f` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] blur-[140px] rounded-full pointer-events-none"
          style={{ background: `${BRAND}14` }}
        />

        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 text-xs tracking-[0.22em] uppercase text-gray-400 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <HiOutlineChevronRight className="text-xs" style={{ color: BRAND }} />
            <span className="text-white">Privacy Policy</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-5"
            style={{ color: BRAND }}
          >
            <HiOutlineShieldCheck className="text-base" />
            Legal
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight mb-6"
          >
            Privacy
            <br />
            <span style={{ color: BRAND }}>Policy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-base lg:text-lg text-gray-400 leading-relaxed max-w-2xl"
          >
            This policy explains how Elizon collects, uses, and protects the
            personal information you share with us across our website and
            services.
          </motion.p>
        </div>
      </section>

      {/* ============================================================
          META STRIP — effective date + print
      ============================================================ */}
      <section className="relative bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400">
                Effective
              </span>
              <span className="font-medium text-gray-900">
                {EFFECTIVE_DATE}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400">
                Last updated
              </span>
              <span className="font-medium text-gray-900">
                {LAST_UPDATED}
              </span>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#0A367D] transition-colors"
          >
            <HiOutlinePrinter className="text-base" />
            Print this page
          </button>
        </div>
      </section>

      {/* ============================================================
          CONTENT + TOC
      ============================================================ */}
      <section className="relative bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* ---- MAIN CONTENT ---- */}
            <article className="lg:col-span-8 order-2 lg:order-1">
              {SECTIONS.map((section, index) => (
                <motion.div
                  key={section.id}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  id={section.id}
                  className="scroll-mt-28 mb-14 last:mb-0"
                >
                  {/* Section header */}
                  <div className="flex items-baseline gap-4 mb-6 pb-4 border-b border-gray-100">
                    <span
                      className="shrink-0 text-[11px] font-semibold tracking-[0.25em]"
                      style={{ color: BRAND }}
                    >
                      {section.num}
                    </span>
                    <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-snug tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  {/* Body paragraphs */}
                  {section.body?.map((p, i) => (
                    <p
                      key={i}
                      className="text-[15px] lg:text-base text-gray-600 leading-[1.85] mb-5 last:mb-0"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Simple bullet list */}
                  {section.list && (
                    <ul className="mt-6 space-y-3">
                      {section.list.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[15px] lg:text-base text-gray-600 leading-relaxed"
                        >
                          <span
                            className="shrink-0 w-1.5 h-1.5 rounded-full mt-2.5"
                            style={{ background: BRAND }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Subsections (used in Section 02) */}
                  {section.subsections && (
                    <div className="mt-6 space-y-6">
                      {section.subsections.map((sub, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 rounded-2xl border border-gray-100 p-5 lg:p-6"
                        >
                          <h3 className="text-[15px] font-semibold text-gray-900 mb-4">
                            {sub.title}
                          </h3>
                          <ul className="space-y-3">
                            {sub.list.map((item, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-3 text-[14px] text-gray-600 leading-relaxed"
                              >
                                <span
                                  className="shrink-0 w-1.5 h-1.5 rounded-full mt-2.5"
                                  style={{ background: BRAND }}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Note callout */}
                  {section.note && (
                    <div
                      className="mt-6 flex items-start gap-3 px-5 py-4 rounded-xl border"
                      style={{
                        background: `${BRAND}0d`,
                        borderColor: `${BRAND}33`,
                      }}
                    >
                      <HiOutlineShieldCheck
                        className="text-lg shrink-0 mt-0.5"
                        style={{ color: BRAND }}
                      />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {section.note}
                      </p>
                    </div>
                  )}

                  {/* Contact card (last section) */}
                  {section.contactCard && (
                    <div className="mt-6 grid sm:grid-cols-3 gap-4">
                      <a
                        href="mailto:privacy@elizon.in"
                        className="group flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#0A367D]/30 hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-300"
                      >
                        <span
                          className="w-10 h-10 grid place-items-center rounded-xl transition-all duration-300 group-hover:text-white"
                          style={{ background: `${BRAND}15`, color: BRAND }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = BRAND;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${BRAND}15`;
                          }}
                        >
                          <HiOutlineMail className="text-lg" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-1">
                            Email
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            privacy@elizon.in
                          </p>
                        </div>
                      </a>

                      <a
                        href="tel:+919876543210"
                        className="group flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#0A367D]/30 hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-300"
                      >
                        <span
                          className="w-10 h-10 grid place-items-center rounded-xl transition-all duration-300 group-hover:text-white"
                          style={{ background: `${BRAND}15`, color: BRAND }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = BRAND;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${BRAND}15`;
                          }}
                        >
                          <HiOutlinePhone className="text-lg" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-1">
                            Phone
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            +91 98765 43210
                          </p>
                        </div>
                      </a>

                      <div className="group flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 bg-white">
                        <span
                          className="w-10 h-10 grid place-items-center rounded-xl"
                          style={{ background: `${BRAND}15`, color: BRAND }}
                        >
                          <HiOutlineLocationMarker className="text-lg" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-1">
                            Mail
                          </p>
                          <p className="text-sm font-medium text-gray-900 leading-snug">
                            Elizon Industrial Park
                            <br />
                            Noida — 201301
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Back to top / help strip */}
              <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  Still have questions about our privacy practices?
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300"
                  style={{ color: BRAND }}
                >
                  Contact our team
                  <HiArrowRight className="text-base" />
                </Link>
              </div>
            </article>

            {/* ---- STICKY TOC ---- */}
            <aside className="lg:col-span-4 order-1 lg:order-2">
              <div className="sticky top-24">
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-900 mb-5 pb-3 border-b border-gray-200">
                    On this page
                  </p>
                  <ul className="space-y-1">
                    {SECTIONS.map((section) => {
                      const isActive = activeId === section.id;
                      return (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className={`flex items-start gap-3 py-2 text-sm leading-snug transition-colors duration-200 ${
                              isActive
                                ? 'font-medium'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                            style={isActive ? { color: BRAND } : undefined}
                          >
                            <span
                              className={`shrink-0 text-[10px] tracking-widest mt-1 ${
                                isActive ? '' : 'text-gray-400'
                              }`}
                              style={isActive ? { color: BRAND } : undefined}
                            >
                              {section.num}
                            </span>
                            <span>{section.title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Quick contact block */}
                <div className="relative mt-6 bg-[#030712] text-white rounded-2xl p-6 overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-[200px] h-[200px] blur-[80px] rounded-full pointer-events-none"
                    style={{ background: `${BRAND}30` }}
                  />
                  <div className="relative">
                    <p
                      className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3"
                      style={{ color: BRAND }}
                    >
                      Data request?
                    </p>
                    <h3 className="text-base font-semibold leading-snug mb-3">
                      Exercise your privacy rights
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">
                      Request access, correction, or deletion of your data — we
                      respond within 5 business days.
                    </p>
                    <a
                      href="mailto:privacy@elizon.in"
                      className="group inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300"
                      style={{ color: BRAND }}
                    >
                      Send a request
                      <HiArrowRight className="text-base" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}