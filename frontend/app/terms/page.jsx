'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import {
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiArrowRight,
  HiOutlineChevronRight,
} from 'react-icons/hi';

// ─── Elizon brand palette ────────────────────────────────────
const BRAND = '#0A367D';
const FRESH = '#14B8A6';
const FRESH_HOVER = '#0D9488';
const FRESH_SOFT = 'rgba(20, 184, 166, 0.10)';
const FRESH_LINE = 'rgba(20, 184, 166, 0.30)';

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

// ─── Metadata ────────────────────────────────────────────────
const LAST_UPDATED = 'May 15, 2024';
const EFFECTIVE_DATE = 'May 15, 2024';

const SECTIONS = [
  {
    id: 'acceptance',
    num: '01',
    title: 'Acceptance of Terms',
    body: [
      'These Terms & Conditions ("Terms") govern your access to and use of the Elizon website, products, and services. By accessing our website, placing an order, or otherwise engaging with us, you agree to be bound by these Terms.',
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
      '"Products" — refers to detergents, soaps, handwash, toilet cleaners, household care, and personal care products manufactured or supplied by Elizon',
      '"Services" — refers to customer support, product guidance, and after-sales assistance provided by Elizon',
      '"Website" — refers to elizon.in and any associated subdomains or digital properties',
      '"Order" — refers to a purchase request accepted by Elizon through our website, WhatsApp, email, or a retail/marketplace partner',
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
      'All product descriptions, images, and specifications on our website are for informational purposes only. While we strive for accuracy, packaging, fragrances, or minor formulation updates may vary as part of our continuous product improvement.',
    ],
    subsections: [
      {
        title: 'Order Acceptance',
        list: [
          'All orders are subject to acceptance by Elizon',
          'We reserve the right to refuse or cancel any order for any reason',
          'An order is considered accepted only when we issue an order confirmation',
          'Prices and availability are subject to change without notice prior to order confirmation',
          'Bulk and wholesale orders may require additional verification and lead time',
        ],
      },
      {
        title: 'Product Information',
        list: [
          'Product images are representative; actual product colours may vary slightly',
          'Fragrances, packaging, and formulations may be updated as part of ongoing improvements',
          'Always refer to the product label for the latest ingredient list and usage instructions',
          'Ingredients and MRP displayed on the packaging take precedence over website information',
        ],
      },
      {
        title: 'Order Cancellation',
        list: [
          'Orders may be cancelled before dispatch at no charge',
          'Once dispatched, cancellation requests are treated as returns (see Section 07)',
          'Cancellation requests must be submitted in writing to info@elizon.in or via WhatsApp',
          'Refunds for eligible cancellations are processed as per our refund policy',
        ],
      },
    ],
  },
  {
    id: 'pricing-payment',
    num: '05',
    title: 'Pricing & Payment',
    body: [
      'All prices are quoted in Indian Rupees (INR) unless otherwise specified. Prices are inclusive of applicable taxes unless expressly stated otherwise. Shipping charges, if any, are shown separately at checkout.',
    ],
    list: [
      'Payment methods — UPI, credit/debit cards, net banking, and cash on delivery (where available)',
      'Orders are processed only after successful payment authorisation',
      'Bulk and wholesale orders — payment terms are defined in the commercial invoice',
      'Late payments on credit terms may attract interest as permitted by law',
      'All bank charges and currency conversion fees (for international orders) are the buyer\'s responsibility',
    ],
  },
  {
    id: 'delivery-shipping',
    num: '06',
    title: 'Delivery & Shipping',
    body: [
      'Delivery timelines are indicative and depend on product availability, order size, and shipping destination. Elizon will make reasonable efforts to meet estimated delivery dates but does not guarantee them.',
    ],
    list: [
      'Standard delivery — 3 to 7 business days within India, depending on pincode',
      'Free shipping on orders above ₹499 (subject to change)',
      'Metro cities may receive orders in 2–3 business days',
      'Remote and rural areas may take longer; tracking details are shared on dispatch',
      'Risk of loss or damage passes to the buyer upon delivery',
      'Bulk and B2B orders are shipped via freight — timelines confirmed at order stage',
    ],
    note: 'Any delays caused by events beyond our reasonable control (force majeure, courier delays, natural events) shall not constitute a breach of these Terms.',
  },
  {
    id: 'returns-refunds',
    num: '07',
    title: 'Returns & Refunds',
    body: [
      'We want you to be completely satisfied with your purchase. If there is an issue with your order, please reach out to us within the return window.',
    ],
    list: [
      'Return requests must be submitted within 7 days of delivery',
      'Products must be unused, unopened, and in original packaging for a return to be accepted',
      'Damaged or incorrect items — report within 48 hours of delivery for a free replacement',
      'Refunds are processed within 5–7 business days after we receive and inspect the returned product',
      'Refunds are issued to the original payment method',
      'Opened personal care products (soaps, handwash, sanitiser) cannot be returned for hygiene reasons',
      'A restocking fee may apply to bulk returns that are not due to a defect',
    ],
    note: 'Shipping costs for returns are refunded only if the return is due to our error (wrong or damaged item).',
  },
  {
    id: 'product-usage',
    num: '08',
    title: 'Product Usage & Safety',
    body: [
      'Our products are formulated for household and commercial cleaning use. Please follow the instructions on the product label carefully.',
    ],
    list: [
      'Keep all cleaning products out of reach of children and pets',
      'Do not mix cleaning products unless the label explicitly permits it — mixing can release harmful fumes',
      'Wear gloves when handling concentrated formulas or when you have sensitive skin',
      'Store in a cool, dry place away from direct sunlight',
      'Discontinue use if irritation occurs and consult a physician',
      'Follow the recommended dosage — using more than directed does not improve results',
    ],
    note: 'Elizon is not liable for damage or injury resulting from misuse, improper storage, or failure to follow label instructions.',
  },
  {
    id: 'intellectual-property',
    num: '09',
    title: 'Intellectual Property',
    body: [
      'All content on this website — including text, graphics, logos, images, product designs, and packaging — is the property of Elizon and is protected by Indian and international copyright and intellectual property laws.',
    ],
    list: [
      'You may not reproduce, distribute, modify, or republish any content without our written permission',
      'The Elizon name, logo, and product names are trademarks of Elizon',
      'Product formulations and packaging designs are proprietary to Elizon',
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
      'Our total liability for any claim shall not exceed the amount paid by the customer for the specific product in question',
      'We are not liable for loss of profits, business, or goodwill',
      'We are not liable for damage caused by misuse, improper storage, or failure to follow label instructions',
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

// ─── Shared teal icon container ──────────────────────────────
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

export default function TermsConditionsPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  // Track the currently visible section.
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

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-gray-100 text-gray-900">
        {/* Soft teal background glow */}
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
            <Link href="/" className="transition-colors hover:text-[#14B8A6]">
              Home
            </Link>

            <HiOutlineChevronRight
              className="text-xs"
              style={{ color: FRESH }}
            />

            <span className="font-medium text-gray-900">
              Terms &amp; Conditions
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-6 text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Terms &amp;{' '}
            <span style={{ color: FRESH }}>Conditions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-2xl text-base leading-relaxed text-gray-600 lg:text-lg"
          >
            Please read these Terms carefully before using our website or
            purchasing any Elizon product. They cover orders, delivery,
            returns, and your rights as a customer.
          </motion.p>

          {/* Teal accent line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 h-[3px] w-16 origin-left rounded-full"
            style={{ background: FRESH }}
          />
        </div>
      </section>

      {/* ─── EFFECTIVE DATE STRIP ───────────────────────────── */}
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

      {/* ─── CONTENT + TOC ──────────────────────────────────── */}
      <section className="relative bg-gray-100 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* ─── MAIN CONTENT ──────────────────────────────── */}
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
                    style={{ borderColor: 'rgba(20, 184, 166, 0.20)' }}
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
                            borderColor: 'rgba(20, 184, 166, 0.16)',
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

                  {/* Note callout */}
                  {section.note && (
                    <div
                      className="mt-6 flex items-start gap-3 rounded-xl border px-4 py-4 sm:px-5"
                      style={{
                        background: FRESH_SOFT,
                        borderColor: FRESH_LINE,
                      }}
                    >
                      <HiOutlineDocumentText
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
                        href="mailto:info@elizon.in"
                        className="group flex min-w-0 flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/40 hover:shadow-lg sm:p-5"
                      >
                        <ContactIcon interactive>
                          <HiOutlineMail className="text-lg" />
                        </ContactIcon>

                        <div className="min-w-0">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                            Email
                          </p>

                          <p className="break-all text-sm font-medium text-gray-900 transition-colors group-hover:text-[#0D9488]">
                            info@elizon.in
                          </p>
                        </div>
                      </a>

                      {/* Phone */}
                      <a
                        href="tel:+919876543210"
                        className="group flex min-w-0 flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/40 hover:shadow-lg sm:p-5"
                      >
                        <ContactIcon interactive>
                          <HiOutlinePhone className="text-lg" />
                        </ContactIcon>

                        <div className="min-w-0">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                            Phone
                          </p>

                          <p className="text-sm font-medium text-gray-900 transition-colors group-hover:text-[#0D9488]">
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
                    Need clarification on these terms?
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    Our team can help with questions about orders, delivery,
                    returns, or product usage.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: FRESH,
                    boxShadow: `0 8px 22px rgba(20, 184, 166, 0.18)`,
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

            {/* ─── STICKY TOC ────────────────────────────────── */}
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
                      <HiOutlineDocumentText className="text-lg" />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        On this page
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        15 policy sections
                      </p>
                    </div>
                  </div>

                  <nav aria-label="Terms and conditions sections">
                    <ul className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
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

                {/* Support card */}
                <div className="relative overflow-hidden rounded-2xl border border-[#14B8A6]/20 bg-white p-6 shadow-sm">
                  {/* Teal decorative glow */}
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
                      Questions?
                    </p>

                    <h3 className="mb-3 text-lg font-semibold leading-snug text-gray-900">
                      Talk to our support team
                    </h3>

                    <p className="mb-5 text-sm leading-relaxed text-gray-600">
                      Clarifications on orders, returns, or product usage — we
                      respond within 5 business days.
                    </p>

                    <a
                      href="mailto:info@elizon.in"
                      className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#0A367D]"
                      style={{ color: FRESH_HOVER }}
                    >
                      Send an enquiry
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