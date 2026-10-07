'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import {
  HiOutlineDocumentText,
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

// ─── Metadata ────────────────────────────────────────────────
const LAST_UPDATED = 'May 15, 2024';
const EFFECTIVE_DATE = 'May 15, 2024';

const SECTIONS = [
  {
    id: 'acceptance',
    num: '01',
    title: 'Acceptance of Terms',
    body: [
      'These Terms & Conditions ("Terms") govern your access to and use of the Elizon website, products, and services. By accessing our website, requesting a quote, placing an order, or otherwise engaging with us, you agree to be bound by these Terms.',
      'If you do not agree to these Terms, you must not access or use our website or services. These Terms apply to all visitors, customers, and others who access or use our services.',
    ],
  },
  {
    id: 'definitions',
    num: '02',
    title: 'Definitions',
    body: [
      'To ensure clarity throughout this document, the following terms have specific meanings:',
    ],
    list: [
      '"Company", "we", "us", "our" — refers to Elizon, its subsidiaries, and affiliates',
      '"You", "customer", "buyer" — refers to the individual or entity accessing our website or purchasing our products',
      '"Products" — refers to industrial machinery, spare parts, and accessories manufactured or supplied by Elizon',
      '"Services" — refers to installation, training, maintenance, and technical support provided by Elizon',
      '"Website" — refers to elizon.in and any associated subdomains or digital properties',
      '"Order" — refers to a purchase request accepted by Elizon through a signed quotation, purchase order, or online transaction',
    ],
  },
  {
    id: 'use-of-website',
    num: '03',
    title: 'Use of the Website',
    body: [
      'You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of, this website by any third party.',
    ],
    list: [
      'You must not use our website in any way that causes, or may cause, damage to the website or impairment of its availability or accessibility',
      'You must not use our website to copy, store, host, transmit, or distribute any material that contains spyware, viruses, or other malicious software',
      'You must not conduct any systematic or automated data collection activities without our written consent',
      'You must not use our website to transmit or send unsolicited commercial communications',
      'You must not use our website for any purpose related to marketing without our express written consent',
    ],
    note: 'We reserve the right to restrict access to certain areas of our website, or our entire website, at our discretion without notice.',
  },
  {
    id: 'products-orders',
    num: '04',
    title: 'Products & Orders',
    body: [
      'All product descriptions, specifications, and images on our website are for informational purposes only. While we strive for accuracy, actual products may vary slightly in appearance, dimensions, or configuration.',
    ],
    subsections: [
      {
        title: 'Order Acceptance',
        list: [
          'All orders are subject to acceptance by Elizon',
          'We reserve the right to refuse or cancel any order for any reason',
          'An order is considered accepted only when we issue a written confirmation',
          'Quotations are valid for 30 days unless otherwise stated',
          'Prices are subject to change without notice prior to order confirmation',
        ],
      },
      {
        title: 'Product Specifications',
        list: [
          'Specifications listed on the website are indicative and may be updated without notice',
          'Custom configurations are available and must be documented in the order confirmation',
          'Minor variations in colour, finish, or dimensions do not constitute a defect',
          'Technical drawings supersede all other documentation in case of conflict',
        ],
      },
      {
        title: 'Order Cancellation',
        list: [
          'Orders may be cancelled within 24 hours of confirmation without penalty',
          'Cancellation after 24 hours may incur charges for materials or work in progress',
          'Custom-built machines cannot be cancelled once manufacturing has commenced',
          'Cancellation requests must be submitted in writing to info@elizon.in',
        ],
      },
    ],
  },
  {
    id: 'pricing-payment',
    num: '05',
    title: 'Pricing & Payment',
    body: [
      'All prices are quoted in Indian Rupees (INR) unless otherwise specified. Prices are exclusive of GST, freight, installation, and any applicable taxes unless expressly stated.',
    ],
    list: [
      'Advance payment — typically 40–50% of the order value at the time of confirmation',
      'Balance payment — due before dispatch or as per the agreed payment schedule',
      'Custom machines — payment milestones are defined in the order confirmation',
      'Accepted payment methods — bank transfer (NEFT/RTGS), cheque, or letter of credit',
      'Late payments may attract interest at 18% per annum or the maximum permitted by law',
      'All bank charges, currency conversion fees, and taxes are the buyer\'s responsibility',
    ],
  },
  {
    id: 'delivery-installation',
    num: '06',
    title: 'Delivery & Installation',
    body: [
      'Delivery timelines are indicative and depend on product availability, order configuration, and shipping destination. Elizon will make reasonable efforts to meet estimated delivery dates but does not guarantee them.',
    ],
    list: [
      'Standard delivery — 4 to 8 weeks from order confirmation, depending on product',
      'Custom orders — delivery timelines confirmed at order stage',
      'Freight — arranged by Elizon or buyer as agreed in the order confirmation',
      'Risk transfer — risk passes to the buyer upon dispatch unless otherwise agreed',
      'Installation — provided at the buyer\'s site by Elizon engineers when included in the order',
      'Site readiness — buyer is responsible for site preparation, power, and access as specified',
    ],
    note: 'Any delays caused by events beyond our reasonable control (force majeure) shall not constitute a breach of these Terms.',
  },
  {
    id: 'warranty',
    num: '07',
    title: 'Warranty',
    body: [
      'Elizon provides a limited warranty on all new machinery, covering defects in materials and workmanship under normal use and service conditions.',
    ],
    list: [
      'Warranty period — 12 to 24 months from date of dispatch, as specified in the order',
      'Coverage — manufacturing defects, component failure under normal use, and workmanship issues',
      'Exclusions — wear parts, consumables, damage from misuse, unauthorised modifications, or improper installation',
      'Service — warranty service is provided at the buyer\'s site or our facility as deemed appropriate',
      'Response time — we aim to respond to warranty claims within 48 business hours',
      'Replacement — parts may be repaired or replaced at our sole discretion',
    ],
    note: 'Warranty is void if the machine is operated outside specified parameters, serviced by unauthorised personnel, or modified without written approval.',
  },
  {
    id: 'returns-refunds',
    num: '08',
    title: 'Returns & Refunds',
    body: [
      'Due to the nature of industrial machinery, returns are accepted only in limited circumstances and must be authorised in advance.',
    ],
    list: [
      'Return requests must be submitted within 7 days of delivery',
      'Products must be unused, undamaged, and in original packaging',
      'Return shipping costs are the buyer\'s responsibility unless the return is due to our error',
      'Refunds are processed within 15 business days of receiving and inspecting the returned product',
      'Custom-built machinery is non-returnable unless it fails to meet documented specifications',
      'A restocking fee of up to 15% may apply to non-defective returns',
    ],
  },
  {
    id: 'intellectual-property',
    num: '09',
    title: 'Intellectual Property',
    body: [
      'All content on this website — including text, graphics, logos, images, technical drawings, and software — is the property of Elizon and is protected by Indian and international copyright and intellectual property laws.',
    ],
    list: [
      'You may not reproduce, distribute, modify, or republish any content without our written permission',
      'The Elizon name, logo, and product names are trademarks of Elizon',
      'Technical documentation provided with machines is licensed for the buyer\'s internal use only',
      'Any unauthorised use of our intellectual property may result in legal action',
    ],
  },
  {
    id: 'liability',
    num: '10',
    title: 'Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, Elizon shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our products, services, or website.',
    ],
    list: [
      'Our total liability for any claim shall not exceed the amount paid by the buyer for the specific product or service in question',
      'We are not liable for loss of profits, production, business, or goodwill',
      'We are not liable for damage caused by improper installation, operation, or maintenance',
      'We are not liable for delays caused by events beyond our reasonable control',
      'Nothing in these Terms limits liability that cannot be excluded by law',
    ],
  },
  {
    id: 'indemnification',
    num: '11',
    title: 'Indemnification',
    body: [
      'You agree to indemnify and hold harmless Elizon, its directors, employees, and agents from any claims, damages, losses, or expenses arising out of your breach of these Terms, your misuse of our products, or your violation of any law or third-party rights.',
    ],
  },
  {
    id: 'governing-law',
    num: '12',
    title: 'Governing Law & Dispute Resolution',
    body: [
      'These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of Gautam Buddh Nagar, Uttar Pradesh.',
    ],
    list: [
      'Both parties agree to attempt amicable resolution before initiating legal proceedings',
      'Disputes not resolved within 30 days may be referred to arbitration under the Arbitration and Conciliation Act, 1996',
      'The seat of arbitration shall be Noida, Uttar Pradesh',
      'The language of arbitration shall be English',
      'The arbitration award shall be final and binding on both parties',
    ],
  },
  {
    id: 'termination',
    num: '13',
    title: 'Termination',
    body: [
      'We reserve the right to terminate or suspend your access to our website and services at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.',
    ],
  },
  {
    id: 'changes',
    num: '14',
    title: 'Changes to These Terms',
    body: [
      'We may update these Terms from time to time to reflect changes in our practices, products, or legal requirements. When we make material changes, we will update the "Last Updated" date at the top of this page.',
      'Your continued use of our website or services after any changes constitutes acceptance of the revised Terms. We encourage you to review this page periodically.',
    ],
  },
  {
    id: 'contact',
    num: '15',
    title: 'Contact Us',
    body: [
      'If you have any questions, concerns, or requests regarding these Terms & Conditions, please reach out to our team. We aim to respond to all enquiries within 5 business days.',
    ],
    contactCard: true,
  },
];

export default function TermsConditionsPage() {
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
            <HiOutlineChevronRight
              className="text-xs"
              style={{ color: BRAND }}
            />
            <span className="text-white">Terms & Conditions</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-5"
            style={{ color: BRAND }}
          >
            <HiOutlineDocumentText className="text-base" />
            Legal
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight mb-6"
          >
            Terms &
            <br />
            <span style={{ color: BRAND }}>Conditions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-base lg:text-lg text-gray-400 leading-relaxed max-w-2xl"
          >
            Please read these Terms carefully before using our website,
            requesting a quote, or purchasing any Elizon product or service.
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

                  {/* Subsections (used in Section 04) */}
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
                      <HiOutlineDocumentText
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
                        href="mailto:info@elizon.in"
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
                            info@elizon.in
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

              {/* Help strip */}
              <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  Need clarification on any of these terms?
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
                  <ul className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
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
                      Questions?
                    </p>
                    <h3 className="text-base font-semibold leading-snug mb-3">
                      Talk to our legal team
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">
                      Clarifications on orders, warranty, or contractual terms
                      — we respond within 5 business days.
                    </p>
                    <a
                      href="mailto:legal@elizon.in"
                      className="group inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300"
                      style={{ color: BRAND }}
                    >
                      Send an enquiry
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