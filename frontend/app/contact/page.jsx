"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiArrowRight,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

// ─── Palette ────────────────────────────────────────────────
const BRAND = "#0A367D";
const FRESH = "#0292FD";
const FRESH_DARK = "#0273C9";

// ─── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send. Please try again.");
      }

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Contact rows
  const contactRows = [
    {
      icon: HiOutlinePhone,
      label: "Call Us",
      lines: ["+91 98765 43210", "+91 98765 43211"],
      href: "tel:+919876543210",
    },
    {
      icon: HiOutlineMail,
      label: "Email Us",
      lines: ["info@elizon.in", "sales@elizon.in"],
      href: "mailto:info@elizon.in",
    },
    {
      icon: HiOutlineLocationMarker,
      label: "Visit Us",
      lines: ["Elizon Industrial Park", "Sector 63, Noida — 201301"],
      href: "https://maps.google.com/?q=Noida+Sector+63",
    },
    {
      icon: HiOutlineClock,
      label: "Working Hours",
      lines: ["Mon – Sat", "9:00 AM – 6:30 PM IST"],
      href: null,
    },
  ];

  // Shared input styling
  const inputClass = (name) =>
    `w-full bg-white border rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 ${
      focused === name
        ? "border-[#0292FD] shadow-[0_0_0_4px_rgba(2,146,253,0.10)]"
        : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/contact/banner.jpeg"
          alt="Contact Full Klein"
          className="w-full h-auto block"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, rgba(10,54,125,0.08) 0%, rgba(2,146,253,0.08) 100%)`,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════
          FORM + SIDE PANEL
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-50 py-8 lg:py-12 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* ─── LEFT: FORM ─── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.06)] p-8 lg:p-10"
            >
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-4"
                style={{ color: FRESH }}
              >
                <span className="w-6 h-px" style={{ background: FRESH }} />
                Send a message
              </span>

              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2 leading-tight">
                Tell us what you need
              </h2>

              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Have a question about our detergents, soaps, toilet cleaners,
                or bulk orders? Fill in the details below and our team will
                get back to you within 24 hours.
              </p>

              {/* Success message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-gray-900"
                  style={{
                    background: `${FRESH}10`,
                    borderColor: `${FRESH}40`,
                  }}
                >
                  <HiOutlineCheckCircle
                    className="text-lg shrink-0"
                    style={{ color: FRESH }}
                  />
                  <span>
                    Thanks — your message has been sent. We&apos;ll reach out
                    soon.
                  </span>
                </motion.div>
              )}

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-red-700 bg-red-50 border-red-200"
                >
                  <HiOutlineExclamationCircle className="text-lg shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Rahul Sharma"
                      className={inputClass("name")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="rahul@email.com"
                      className={inputClass("email")}
                    />
                  </div>
                </div>

                {/* Phone + Company */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      placeholder="+91 98765 xxxxx"
                      className={inputClass("phone")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                      Company / Business
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      onFocus={() => setFocused("company")}
                      onBlur={() => setFocused(null)}
                      placeholder="Your company or business"
                      className={inputClass("company")}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your product enquiry, bulk order, dealership requirement, or any other question..."
                    className={`${inputClass("message")} resize-none`}
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex items-center gap-2 overflow-hidden px-7 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{
                      background: FRESH,
                      boxShadow: `0 12px 32px ${FRESH}40`,
                    }}
                    onMouseEnter={(e) => {
                      if (!loading)
                        e.currentTarget.style.background = FRESH_DARK;
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) e.currentTarget.style.background = FRESH;
                    }}
                  >
                    <span
                      className="absolute top-0 left-[-120%] h-full w-[40%] animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                      aria-hidden="true"
                    />

                    <span className="relative z-10 inline-flex items-center gap-2">
                      {loading ? (
                        <>
                          <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <HiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>

            {/* ─── RIGHT: CONTACT INFO PANEL ─── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative h-full bg-[#030712] text-white rounded-3xl p-8 lg:p-10 overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-[340px] h-[340px] rounded-full pointer-events-none"
                  style={{ background: `${FRESH}30`, filter: "blur(120px)" }}
                />
                <div
                  className="absolute bottom-0 left-0 w-[260px] h-[260px] rounded-full pointer-events-none"
                  style={{ background: `${BRAND}30`, filter: "blur(100px)" }}
                />

                <div className="relative">
                  <span
                    className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-4"
                    style={{ color: FRESH }}
                  >
                    <span className="w-6 h-px" style={{ background: FRESH }} />
                    Contact details
                  </span>

                  <h2 className="text-2xl font-semibold mb-2 leading-snug">
                    We&apos;re here to help
                  </h2>

                  <p className="text-sm text-gray-400 leading-relaxed mb-8">
                    Have a product question, bulk enquiry, or need help
                    choosing the right cleaning solution? Reach out through
                    any of the channels below.
                  </p>

                  <ul className="space-y-5">
                    {contactRows.map((row) => {
                      const Icon = row.icon;

                      const content = (
                        <>
                          <span
                            className="shrink-0 w-11 h-11 grid place-items-center rounded-xl transition-all duration-300"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.10)",
                              color: FRESH,
                            }}
                          >
                            <Icon className="text-lg" />
                          </span>

                          <div className="flex-1">
                            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-1">
                              {row.label}
                            </p>

                            {row.lines.map((line, idx) => (
                              <p
                                key={idx}
                                className={`text-sm leading-snug ${
                                  idx === 0
                                    ? "text-white font-medium"
                                    : "text-gray-400"
                                }`}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </>
                      );

                      return (
                        <li
                          key={row.label}
                          className="border-b border-white/[0.06] pb-5 last:border-b-0 last:pb-0"
                        >
                          {row.href ? (
                            <a
                              href={row.href}
                              target={
                                row.href.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel="noreferrer"
                              className="group/row flex items-start gap-4"
                              onMouseEnter={(e) => {
                                const iconBox =
                                  e.currentTarget.querySelector(
                                    "span:first-child"
                                  );
                                if (iconBox) {
                                  iconBox.style.background = FRESH;
                                  iconBox.style.borderColor = FRESH;
                                  iconBox.style.color = "#ffffff";
                                }
                              }}
                              onMouseLeave={(e) => {
                                const iconBox =
                                  e.currentTarget.querySelector(
                                    "span:first-child"
                                  );
                                if (iconBox) {
                                  iconBox.style.background =
                                    "rgba(255,255,255,0.05)";
                                  iconBox.style.borderColor =
                                    "rgba(255,255,255,0.10)";
                                  iconBox.style.color = FRESH;
                                }
                              }}
                            >
                              {content}
                            </a>
                          ) : (
                            <div className="group/row flex items-start gap-4">
                              {content}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 group inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: FRESH,
                      color: "#ffffff",
                      boxShadow: `0 12px 32px ${FRESH}40`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = FRESH_DARK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = FRESH;
                    }}
                  >
                    <FaWhatsapp className="text-base" />
                    Chat on WhatsApp
                    <HiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MAP
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-4"
                style={{ color: FRESH }}
              >
                <span className="w-6 h-px" style={{ background: FRESH }} />
                Find us
              </span>

              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                Visit our facility
              </h2>
            </div>

            <a
              href="https://maps.google.com/?q=Noida+Sector+63"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border border-gray-200 px-5 py-3 rounded-full transition-all duration-300 self-start lg:self-auto"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = FRESH;
                e.currentTarget.style.color = FRESH;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.color = "#111827";
              }}
            >
              <HiOutlineLocationMarker
                className="text-base"
                style={{ color: FRESH }}
              />
              Open in Google Maps
            </a>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <iframe
              title="Full Klein location"
              src="https://www.google.com/maps?q=Noida+Sector+63&output=embed"
              width="100%"
              height="460"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}