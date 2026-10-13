"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import {
  HiOutlineLightningBolt,
  HiOutlineEye,
  HiOutlineShieldCheck,
  HiOutlineBadgeCheck,
  HiOutlineGlobe,
  HiOutlineSparkles,
  HiOutlineUsers,
  HiOutlineTrendingUp,
  HiOutlineCheckCircle,
  HiOutlineBeaker,
  HiOutlineHeart,
  HiOutlineSun,
  HiArrowRight,
} from "react-icons/hi";

// ─── Palette ────────────────────────────────────────────────
const BRAND = "#0A367D"; // trust — used sparingly
const FRESH = "#0292FD"; // bright blue — the "clean" accent
const FRESH_DARK = "#0273C9";
const FRESH_SOFT = "rgba(2, 146, 253, 0.12)";
const FRESH_LINE = "rgba(2, 146, 253, 0.30)";

// ─── Animation variants ─────────────────────────────────────
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

// ─── Data ───────────────────────────────────────────────────
const STATS = [
  { value: "25+", label: "Years of Care" },
  { value: "1M+", label: "Homes Reached" },
  { value: "10K+", label: "Retail Partners" },
];

// Product range
const PRODUCT_RANGE = [
  {
    emoji: "🧺",
    name: "Detergents",
    text: "Liquid, powder & concentrated formulas for everyday laundry.",
    tint: "#DBEAFE",
  },
  {
    emoji: "🧼",
    name: "Soaps & Handwash",
    text: "Moisturising, antibacterial & glycerine bars and liquids.",
    tint: "#DCFCE7",
  },
  {
    emoji: "🚿",
    name: "Toilet Cleaners",
    text: "Thick liquids, gels & drop-in tablets for a spotless bowl.",
    tint: "#CFFAFE",
  },
  {
    emoji: "🏠",
    name: "Household Care",
    text: "Floor, glass, kitchen & multi-surface cleaning essentials.",
    tint: "#FEF3C7",
  },
  {
    emoji: "🌿",
    name: "Eco Range",
    text: "Plant-based, biodegradable formulas for eco-conscious homes.",
    tint: "#D1FAE5",
  },
  {
    emoji: "🧴",
    name: "Personal Care",
    text: "Body wash, shampoo & hand sanitiser for daily hygiene.",
    tint: "#FCE7F3",
  },
];

const VALUES = [
  {
    icon: HiOutlineSparkles,
    title: "Powerful, Every Time",
    text: "Formulas engineered to deliver the same consistent clean from the first wash to the last.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Safe for the Family",
    text: "Dermatologically tested, pH-balanced, and free from harsh additives that irritate skin.",
  },
  {
    icon: HiOutlineBeaker,
    title: "Thoughtful Science",
    text: "Every ingredient chosen for a purpose — cleaning power, freshness, or fabric care.",
  },
  {
    icon: HiOutlineHeart,
    title: "Made for Real Homes",
    text: "Designed around how families actually live — quick routines, mixed fabrics, busy days.",
  },
  {
    icon: HiOutlineSun,
    title: "Freshness That Lasts",
    text: "Long-lasting fragrances and odour-neutralising technology that goes beyond masking.",
  },
  {
    icon: HiOutlineGlobe,
    title: "Gentler on the Planet",
    text: "Biodegradable formulas, concentrated packaging, and a growing eco range.",
  },
];

// ─── Bubble decoration ──────────────────────────────────────
function Bubbles({ count = 6, className = "" }) {
  const positions = [
    { top: "10%", left: "8%", size: 40 },
    { top: "25%", left: "85%", size: 24 },
    { top: "55%", left: "15%", size: 18 },
    { top: "70%", left: "75%", size: 32 },
    { top: "40%", left: "45%", size: 14 },
    { top: "85%", left: "50%", size: 22 },
    { top: "5%", left: "60%", size: 16 },
    { top: "60%", left: "92%", size: 20 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {positions.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle at 30% 30%, rgba(2,146,253,0.18), rgba(2,146,253,0.02))`,
            border: `1px solid ${FRESH_LINE}`,
          }}
        />
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/about/banner.png"
          alt="About Elizon"
          className="w-full object-cover block"
        />
        {/* subtle fresh overlay tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, rgba(10,54,125,0.10) 0%, rgba(2,146,253,0.08) 100%)`,
          }}
        />
      </section>

      {/* ============================================================
          01 — ABOUT
      ============================================================ */}
      <section className="relative bg-white py-8 lg:py-12 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* ─── LEFT: Heading + paragraphs ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[1.1] tracking-tight mb-6">
                A cleaner home,{" "}
                <span style={{ color: FRESH }}>a fresher day</span>
              </h2>

              <div className="space-y-5 text-gray-600 leading-relaxed max-w-2xl">
                <p>
                  Elizon is a homegrown cleaning-products brand built on one
                  belief: everyday cleaning should be effective, safe, and
                  actually enjoyable. From the first scoop of detergent powder
                  in 1999 to a full range of soaps, toilet cleaners, and
                  household care essentials today, our focus has never changed —
                  make cleaning simpler for real families.
                </p>

                <p>
                  Every product that carries the Elizon name is developed with
                  careful formulation, tested for real-world performance, and
                  packed to stay fresh on your shelf. Whether it&apos;s the
                  weekly laundry load, a quick bathroom refresh, or a full
                  Sunday deep clean, we make sure the job gets done — properly.
                </p>
              </div>
            </motion.div>

            {/* ─── RIGHT: Stats panel ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-gray-100"
            >
              <p
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.24em] uppercase mb-6"
                style={{ color: FRESH }}
              >
                <span className="w-5 h-px" style={{ background: FRESH }} />
                By the numbers
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-7">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-baseline gap-4 lg:gap-5"
                  >
                    <div
                      className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-none tracking-tight"
                      style={{ color: BRAND }}
                    >
                      {stat.value}
                    </div>

                    <div className="text-[11px] tracking-[0.2em] uppercase text-gray-500 font-medium lg:max-w-[140px]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          02 — PRODUCT RANGE
      ============================================================ */}
      <section className="relative py-8 lg:py-12 bg-gray-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[1.1] tracking-tight"
            >
              Six ranges.{" "}
              <span style={{ color: FRESH }}>Every corner of the home.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5 text-gray-600 leading-relaxed"
            >
              From laundry to bathrooms, kitchen to personal care — Elizon has a
              thoughtfully formulated solution for every cleaning job.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_RANGE.map((range, i) => (
              <motion.div
                key={range.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 lg:p-7 transition-all duration-500"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${FRESH}66`;
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(2,146,253,0.10)`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.transform = "";
                }}
              >
                <span
                  className="inline-flex w-14 h-14 items-center justify-center rounded-2xl mb-5 text-2xl transition-transform duration-500 group-hover:scale-110"
                  style={{ background: range.tint }}
                >
                  {range.emoji}
                </span>

                <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                  {range.name}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {range.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          03 — MISSION & VISION
      ============================================================ */}
      <section className="relative bg-white py-8 lg:py-12 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* ---- Mission ---- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="group relative bg-white rounded-3xl border border-gray-100 p-8 lg:p-10 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-500 overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(2,146,253,0.10)`;
                e.currentTarget.style.borderColor = `${FRESH}4d`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.transform = "";
              }}
            >
              {/* Soft corner glow on hover */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `${FRESH}20` }}
              />

              <div className="relative">
                {/* Icon badge */}
                <span
                  className="inline-flex w-14 h-14 items-center justify-center rounded-2xl mb-6 transition-all duration-500 group-hover:scale-105"
                  style={{ background: `${FRESH}15`, color: FRESH }}
                >
                  <HiOutlineLightningBolt className="text-2xl" />
                </span>

                <p
                  className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3"
                  style={{ color: FRESH }}
                >
                  Our Mission
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 leading-snug mb-4">
                  Make everyday cleaning simpler, safer, and more effective.
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  To develop reliable detergents, soaps, toilet cleaners, and
                  household care products that deliver consistent performance
                  while being safe for families, gentle on fabrics, and easy to
                  use every single day.
                </p>
              </div>
            </motion.div>

            {/* ---- Vision ---- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="group relative bg-white rounded-3xl border border-gray-100 p-8 lg:p-10 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-500 overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(2,146,253,0.10)`;
                e.currentTarget.style.borderColor = `${FRESH}4d`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.transform = "";
              }}
            >
              {/* Soft corner glow on hover */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `${FRESH}20` }}
              />

              <div className="relative">
                {/* Icon badge */}
                <span
                  className="inline-flex w-14 h-14 items-center justify-center rounded-2xl mb-6 transition-all duration-500 group-hover:scale-105"
                  style={{ background: `${FRESH}15`, color: FRESH }}
                >
                  <HiOutlineEye className="text-2xl" />
                </span>

                <p
                  className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3"
                  style={{ color: FRESH }}
                >
                  Our Vision
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 leading-snug mb-4">
                  To become India&apos;s most-loved everyday cleaning brand.
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  A household name known not just for what we clean, but for how
                  we clean — responsibly, thoughtfully, and with a commitment to
                  freshness that families can feel from the first wash.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          04 — VALUES / WHY CHOOSE US
      ============================================================ */}
      <section className="relative py-8 lg:py-12 bg-gray-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[1.1] tracking-tight"
            >
              Six reasons families{" "}
              <span style={{ color: FRESH }}>keep coming back</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5 text-gray-600 leading-relaxed"
            >
              We do not chase gimmicks. We focus on the three things that matter
              in everyday cleaning — performance, safety, and freshness.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="group relative bg-white border border-gray-100 rounded-2xl p-6 lg:p-7 transition-all duration-500"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${FRESH}66`;
                    e.currentTarget.style.boxShadow = `0 16px 40px rgba(2,146,253,0.10)`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  <span
                    className="inline-flex w-12 h-12 items-center justify-center rounded-xl mb-5 transition-all duration-500"
                    style={{
                      background: FRESH_SOFT,
                      color: FRESH,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = FRESH;
                      e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = FRESH_SOFT;
                      e.currentTarget.style.color = FRESH;
                    }}
                  >
                    <Icon className="text-xl" />
                  </span>

                  <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          05 — CTA
      ============================================================ */}
      <section className="relative overflow-hidden py-8 lg:py-10 bg-gradient-to-r from-gray-900 to-gray-800">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[140px] rounded-full pointer-events-none"
          style={{ background: `${FRESH}20` }}
        />

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-tight"
          >
            Make every clean{" "}
            <span style={{ color: FRESH }}>a better clean.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base lg:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Explore Elizon&apos;s range of detergents, soaps, toilet cleaners,
            and everyday household essentials — designed for modern homes and
            real families.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/all-products"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white font-semibold rounded-full transition-all duration-300 shadow-lg"
              style={{
                background: FRESH,
                boxShadow: `0 10px 30px ${FRESH}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = FRESH_DARK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = FRESH;
              }}
            >
              Explore Products
              <HiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-white/25 text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}