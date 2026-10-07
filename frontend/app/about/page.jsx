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
const BRAND = "#0A367D";     // trust — used sparingly
const FRESH = "#14B8A6";     // mint-teal — the "clean" accent
const FRESH_SOFT = "rgba(20, 184, 166, 0.12)";
const FRESH_LINE = "rgba(20, 184, 166, 0.30)";

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

// Product range — the heart of the brand
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

const JOURNEY = [
  {
    year: "1999",
    title: "A Small Beginning",
    text: "Elizon started with one promise — make cleaning products families can genuinely trust.",
  },
  {
    year: "2008",
    title: "Wider Range",
    text: "Added soaps, toilet cleaners, and household care to cover every corner of the home.",
  },
  {
    year: "2015",
    title: "Quality First",
    text: "Strengthened formulation testing, packaging standards, and skin-safety processes.",
  },
  {
    year: "2024",
    title: "A Growing Household Name",
    text: "Trusted by 1M+ homes, with an expanding eco range and pan-India distribution.",
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
            background: `radial-gradient(circle at 30% 30%, rgba(20,184,166,0.18), rgba(20,184,166,0.02))`,
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
            background: `linear-gradient(180deg, rgba(10,54,125,0.10) 0%, rgba(20,184,166,0.08) 100%)`,
          }}
        />
      </section>

      {/* ============================================================
          01 — ABOUT
      ============================================================ */}
      <section className="relative bg-white py-8 lg:py-12 overflow-hidden">
        {/* <Bubbles count={5000} /> */}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase mb-8"
            style={{ color: FRESH }}
          >
            <span className="w-8 h-px" style={{ background: FRESH }} />
            <span>About Elizon</span>
            <span className="text-gray-300">— 01</span>
          </motion.div> */}

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[1.1] tracking-tight mb-6">
                A cleaner home,{" "}
                <span style={{ color: FRESH }}>a fresher day</span>.
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

              <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div
                      className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-none tracking-tight mb-2"
                      style={{ color: BRAND }}
                    >
                      {stat.value}
                    </div>

                    <div className="text-[11px] tracking-[0.2em] uppercase text-gray-500 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
                <img
                  src="/about/about.png"
                  alt="Elizon cleaning products"
                  className="w-full  object-cover"
                />
              </div>

              {/* Fresh corner accent */}
              {/* <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-br-3xl pointer-events-none"
                style={{
                  borderBottom: `2px solid ${FRESH}`,
                  borderRight: `2px solid ${FRESH}`,
                }}
              /> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          02 — PRODUCT RANGE (the heart of the brand)
      ============================================================ */}
      <section className="relative py-8 lg:py-12 bg-gray-50 overflow-hidden">
        {/* <Bubbles count={4} /> */}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase mb-8"
            style={{ color: FRESH }}
          >
            <span className="w-8 h-px" style={{ background: FRESH }} />
            <span>What We Make</span>
            <span className="text-gray-300">— 02</span>
          </motion.div> */}

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
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 lg:p-7 hover:border-[#14B8A6]/40 hover:shadow-[0_16px_40px_rgba(20,184,166,0.10)] hover:-translate-y-1 transition-all duration-500"
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

                {/* <Link
                  href="/all-products"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ color: FRESH }}
                >
                  Explore
                  <HiArrowRight className="text-sm" />
                </Link> */}
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
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase mb-8"
            style={{ color: FRESH }}
          >
            <span className="w-8 h-px" style={{ background: FRESH }} />
            <span>Mission & Vision</span>
            <span className="text-gray-300">— 03</span>
          </motion.div> */}

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* ---- Mission ---- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src="/about/mission.png"
                  alt="Elizon mission"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" /> */}

                <span
                  className="absolute top-5 left-5 inline-flex w-12 h-12 items-center justify-center rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg"
                  style={{ color: FRESH }}
                >
                  <HiOutlineLightningBolt className="text-xl" />
                </span>
              </div>

              <div className="p-8 lg:p-10">
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
              className="group relative bg-white text-black rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src="/about/vision.png"
                  alt="Elizon vision"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-black/40 to-transparent" /> */}

                <span
                  className="absolute top-5 left-5 inline-flex w-12 h-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm shadow-lg"
                  style={{ color: FRESH }}
                >
                  <HiOutlineEye className="text-xl" />
                </span>
              </div>

              {/* Fresh glow */}
              {/* <div
                className="absolute top-0 right-0 w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none"
                style={{ background: `${FRESH}25` }}
              /> */}

              <div className="relative p-8 lg:p-10">
                <p
                  className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3"
                  style={{ color: FRESH }}
                >
                  Our Vision
                </p>

                <h3 className="text-2xl font-semibold leading-snug mb-4">
                  To become India&apos;s most-loved everyday cleaning brand.
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  A household name known not just for what we clean, but for
                  how we clean — responsibly, thoughtfully, and with a
                  commitment to freshness that families can feel from the first
                  wash.
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
        {/* <Bubbles count={5} /> */}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase mb-8"
            style={{ color: FRESH }}
          >
            <span className="w-8 h-px" style={{ background: FRESH }} />
            <span>Why Choose Elizon</span>
            <span className="text-gray-300">— 04</span>
          </motion.div> */}

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
              We do not chase gimmicks. We focus on the three things that
              matter in everyday cleaning — performance, safety, and freshness.
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
                  className="group relative bg-white border border-gray-100 rounded-2xl p-6 lg:p-7 hover:border-[#14B8A6]/40 hover:shadow-[0_16px_40px_rgba(20,184,166,0.10)] hover:-translate-y-1 transition-all duration-500"
                >
                  <span
                    className="inline-flex w-12 h-12 items-center justify-center rounded-xl mb-5 transition-all duration-500 group-hover:text-white"
                    style={{
                      background: FRESH_SOFT,
                      color: FRESH,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = FRESH;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = FRESH_SOFT;
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
          06 — CTA
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
                e.currentTarget.style.background = "#0D9488";
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