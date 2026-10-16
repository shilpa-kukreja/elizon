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

// ─── Elizon brand palette ────────────────────────────────────
const BRAND = '#0A367D';
const FRESH = '#0292FD';
const FRESH_HOVER = '#0273C9';
const FRESH_SOFT = 'rgba(2, 146, 253, 0.10)';
const FRESH_LINE = 'rgba(2, 146, 253, 0.30)';

// ─── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
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
      'Elizon ("we", "us", "our") is committed to protecting the privacy and security of the personal information you share with us. This Privacy Policy explains how we collect, use, store, share, and protect information when you visit our website, request a quote, contact our team, or purchase our products.',
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
          'Contact details such as your name, email address, phone number, and shipping address',
          'Enquiry details submitted through our contact forms, product enquiries, or WhatsApp channel',
          'Order and delivery preferences you share with our team',
          'Communication history including emails, calls, and messages',
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
          'Marketplace platforms such as Amazon, Flipkart, and quick-commerce apps where you have placed an order',
          'Payment gateway and logistics partners involved in fulfilling your order',
          'Referral partners and channel distributors',
          'Publicly available sources for delivery verification',
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
      'Respond to your enquiries, product questions, and support requests',
      'Process orders and coordinate delivery and after-sales support',
      'Provide product information, usage guidance, and warranty coverage',
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
      'Service providers — logistics partners, courier companies, and payment processors',
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
      'Our website and services are intended for general household and consumer use. We do not knowingly collect personal information from anyone under 16 years of age. If we become aware that such information has been collected, we will delete it promptly.',
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

// ─── Shared icon container ───────────────────────────────────
function ContactIcon({ children, interactive = false }) {
  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
        interactive ? 'group-hover:text-white' : ''
      }`}
      style={{ background: FRESH_SOFT, color: FRESH }}
      onMouseEnter={
        interactive
          ? (e) => {
              e.currentTarget.style.background = FRESH;
            }
          : undefined
      }
      onMouseLeave={
        interactive
          ? (e) => {
              e.currentTarget.style.background = FRESH_SOFT;
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  // Track the currently visible policy section.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-gray-100 text-gray-900">
        {/* Soft fresh background glow */}
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ background: `${FRESH}14` }}
        />

        <div
          className="pointer-events-none absolute -bottom-40 -right-24 h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background: `${BRAND}0a` }}
        />

        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(${BRAND} 1px, transparent 1px), linear-gradient(90deg, ${BRAND} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-8 sm:py-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-500"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#0292FD]"
            >
              Home
            </Link>

            <HiOutlineChevronRight
              className="text-xs"
              style={{ color: FRESH }}
            />

            <span className="font-medium text-gray-900">
              Privacy Policy
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-6 text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Privacy{' '}
            <span style={{ color: FRESH }}>Policy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-2xl text-base leading-relaxed text-gray-600 lg:text-lg"
          >
            This policy explains how Elizon collects, uses, and protects the
            personal information you share with us across our website and
            services.
          </motion.p>

          {/* Accent line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 h-[3px] w-16 origin-left rounded-full"
            style={{ background: FRESH }}
          />
        </div>
      </section>

      {/* ─── EFFECTIVE DATE + PRINT ─────────────────────────── */}
      <section className="relative border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400 sm:text-[11px]">
                Effective
              </span>
              <span className="font-medium text-gray-900">
                {EFFECTIVE_DATE}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400 sm:text-[11px]">
                Last updated
              </span>
              <span className="font-medium text-gray-900">
                {LAST_UPDATED}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POLICY CONTENT + TABLE OF CONTENTS ─────────────── */}
      <section className="relative bg-gray-100 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* ─── MAIN POLICY CONTENT ──────────────────────── */}
            <article className="order-2 min-w-0 lg:order-1 lg:col-span-8">
              {SECTIONS.map((section, index) => (
                <motion.div
                  key={section.id}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  id={section.id}
                  className="mb-8 scroll-mt-28 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7 lg:mb-10 lg:p-8 last:mb-0"
                >
                  {/* Section heading */}
                  <div
                    className="mb-5 flex items-baseline gap-3 border-b pb-4 sm:gap-4"
                    style={{ borderColor: 'rgba(2, 146, 253, 0.20)' }}
                  >
                    <span
                      className="shrink-0 text-[11px] font-semibold tracking-[0.2em]"
                      style={{ color: FRESH }}
                    >
                      {section.num}
                    </span>

                    <h2 className="text-xl font-semibold leading-snug tracking-tight text-gray-900 lg:text-2xl">
                      {section.title}
                    </h2>
                  </div>

                  {/* Paragraphs */}
                  {section.body?.map((paragraph, i) => (
                    <p
                      key={i}
                      className="mb-4 text-[14px] leading-[1.9] text-gray-600 last:mb-0 sm:text-[15px] lg:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Bullet list */}
                  {section.list && (
                    <ul className="mt-6 space-y-3">
                      {section.list.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[14px] leading-relaxed text-gray-600 sm:text-[15px]"
                        >
                          <span
                            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: FRESH }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Nested subsections */}
                  {section.subsections && (
                    <div className="mt-6 space-y-4">
                      {section.subsections.map((subsection, i) => (
                        <div
                          key={i}
                          className="rounded-xl border p-4 sm:p-5"
                          style={{
                            background: '#F9FAFB',
                            borderColor: 'rgba(2, 146, 253, 0.16)',
                          }}
                        >
                          <h3 className="mb-4 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
                            {subsection.title}
                          </h3>

                          <ul className="space-y-3">
                            {subsection.list.map((item, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-3 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]"
                              >
                                <span
                                  className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{ background: FRESH }}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Security note */}
                  {section.note && (
                    <div
                      className="mt-6 flex items-start gap-3 rounded-xl border px-4 py-4 sm:px-5"
                      style={{
                        background: FRESH_SOFT,
                        borderColor: FRESH_LINE,
                      }}
                    >
                      <HiOutlineShieldCheck
                        className="mt-0.5 shrink-0 text-lg"
                        style={{ color: FRESH }}
                      />

                      <p className="text-sm leading-relaxed text-gray-700">
                        {section.note}
                      </p>
                    </div>
                  )}

                  {/* Contact cards */}
                  {section.contactCard && (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {/* Email */}
                      <a
                        href="mailto:privacy@elizon.in"
                        className="group flex min-w-0 flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0292FD]/40 hover:shadow-lg sm:p-5"
                      >
                        <ContactIcon interactive>
                          <HiOutlineMail className="text-lg" />
                        </ContactIcon>

                        <div className="min-w-0">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                            Email
                          </p>

                          <p className="break-all text-sm font-medium text-gray-900 transition-colors group-hover:text-[#0273C9]">
                            privacy@elizon.in
                          </p>
                        </div>
                      </a>

                      {/* Phone */}
                      <a
                        href="tel:+919876543210"
                        className="group flex min-w-0 flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0292FD]/40 hover:shadow-lg sm:p-5"
                      >
                        <ContactIcon interactive>
                          <HiOutlinePhone className="text-lg" />
                        </ContactIcon>

                        <div className="min-w-0">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                            Phone
                          </p>

                          <p className="text-sm font-medium text-gray-900 transition-colors group-hover:text-[#0273C9]">
                            +91 98765 43210
                          </p>
                        </div>
                      </a>

                      {/* Address */}
                      <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
                        <ContactIcon>
                          <HiOutlineLocationMarker className="text-lg" />
                        </ContactIcon>

                        <div>
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                            Mail
                          </p>

                          <p className="text-sm font-medium leading-relaxed text-gray-900">
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

              {/* Contact CTA */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Have questions about your privacy?
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    Our team is here to help with your privacy-related
                    enquiries.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: FRESH,
                    boxShadow: `0 8px 22px rgba(2, 146, 253, 0.18)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = FRESH_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = FRESH;
                  }}
                >
                  Contact our team
                  <HiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>

            {/* ─── STICKY TABLE OF CONTENTS ─────────────────── */}
            <aside className="order-1 min-w-0 lg:order-2 lg:col-span-4">
              <div className="space-y-5 lg:sticky lg:top-24">
                {/* TOC card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-4">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-xl"
                      style={{
                        background: FRESH_SOFT,
                        color: FRESH,
                      }}
                    >
                      <HiOutlineShieldCheck className="text-lg" />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        On this page
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        12 policy sections
                      </p>
                    </div>
                  </div>

                  <nav aria-label="Privacy policy sections">
                    <ul className="space-y-1">
                      {SECTIONS.map((section) => {
                        const isActive = activeId === section.id;

                        return (
                          <li key={section.id}>
                            <a
                              href={`#${section.id}`}
                              aria-current={isActive ? 'location' : undefined}
                              className={`relative flex items-start gap-3 rounded-lg px-3 py-2.5 text-[13px] leading-snug transition-all duration-200 ${
                                isActive
                                  ? 'font-semibold'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                              style={
                                isActive
                                  ? {
                                      color: FRESH_HOVER,
                                      background: FRESH_SOFT,
                                    }
                                  : undefined
                              }
                            >
                              {isActive && (
                                <span
                                  className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full"
                                  style={{ background: FRESH }}
                                />
                              )}

                              <span
                                className="shrink-0 pt-0.5 text-[10px] tracking-wider"
                                style={{
                                  color: isActive ? FRESH : '#9CA3AF',
                                }}
                              >
                                {section.num}
                              </span>

                              <span>{section.title}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>

                {/* Privacy assistance card */}
                <div className="relative overflow-hidden rounded-2xl border border-[#0292FD]/20 bg-white p-6 shadow-sm">
                  {/* Decorative glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
                    style={{ background: `${FRESH}25` }}
                  />

                  <div className="relative">
                    <span
                      className="mb-4 grid h-11 w-11 place-items-center rounded-xl"
                      style={{
                        background: FRESH_SOFT,
                        color: FRESH,
                      }}
                    >
                      <HiOutlineShieldCheck className="text-xl" />
                    </span>

                    <p
                      className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: FRESH_HOVER }}
                    >
                      Data request?
                    </p>

                    <h3 className="mb-3 text-lg font-semibold leading-snug text-gray-900">
                      Exercise your privacy rights
                    </h3>

                    <p className="mb-5 text-sm leading-relaxed text-gray-600">
                      Request access, correction, or deletion of your data — we
                      respond within 5 business days.
                    </p>

                    <a
                      href="mailto:privacy@elizon.in"
                      className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#0A367D]"
                      style={{ color: FRESH_HOVER }}
                    >
                      Send a request
                      <HiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
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