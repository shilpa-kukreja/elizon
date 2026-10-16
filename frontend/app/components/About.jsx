"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineBeaker,
  HiOutlineHeart,
  HiArrowRight,
} from "react-icons/hi";

// ─── Palette ────────────────────────────────────────────────
const BRAND = "#0A367D";                       // trust anchor
const FRESH = "#0292FD";                       // fresh accent — the new blue
const FRESH_SOFT = "rgba(2, 146, 253, 0.10)";
const FRESH_LINE = "rgba(2, 146, 253, 0.30)";
const FRESH_DARK = "#0273C9";                  // hover state — darker blue

/* ---------- Animation Variants ---------- */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Data ───────────────────────────────────────────────────
const PILLARS = [
  {
    icon: HiOutlineSparkles,
    title: "Powerful",
    text: "Cleans the first time",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Skin Safe",
    text: "pH balanced formulas",
  },
  {
    icon: HiOutlineBeaker,
    title: "Lab Tested",
    text: "Consistent every pack",
  },
  {
    icon: HiOutlineHeart,
    title: "Family First",
    text: "Made for real homes",
  },
];

const MINI_RANGES = [
  { emoji: "🧺", label: "Detergents" },
  { emoji: "🧼", label: "Soaps" },
  { emoji: "🚿", label: "Toilet Care" },
  { emoji: "🏠", label: "Home Care" },
];

// ─── Bubble decoration ──────────────────────────────────────
function Bubbles() {
  const dots = [
    { top: "12%", left: "6%", size: 44 },
    { top: "68%", left: "88%", size: 30 },
    { top: "82%", left: "12%", size: 22 },
    { top: "22%", left: "92%", size: 18 },
    { top: "48%", left: "48%", size: 14 },
  ];

  return <></>;
}

export default function About() {
  return (
    <section className="relative py-8 lg:py-12 bg-gray-100 overflow-hidden">
      <Bubbles />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ═══════════════════════════════════════════════════════
            HEADER
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[1.1] tracking-tight"
          >
            Powerful cleaning for{" "}
            <span style={{ color: FRESH }}>everyday freshness</span>.
          </motion.h2>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            MAIN GRID
        ═══════════════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ─── IMAGE ─── */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.12)] ring-1 ring-gray-100">
              <img
                src="/about/about.jpg"
                alt="Full kelin cleaning products"
                className="w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* ─── CONTENT ─── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* Heading with fresh underline */}
            <motion.div variants={fadeRight}>
              <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug">
                Cleaning products built for{" "}
                <span style={{ color: FRESH }}>real homes</span>.
              </h3>

              <div
                className="w-16 h-[3px] rounded-full mt-4"
                style={{ background: FRESH }}
              />
            </motion.div>

            {/* Body copy */}
            <motion.p
              variants={fadeRight}
              className="text-gray-600 leading-relaxed"
            >
              Full Klein is a homegrown cleaning brand focused on making everyday
              care simpler. Our range — from liquid detergents and
              moisturising soaps to powerful toilet cleaners — is formulated
              for the way families actually live: fast, messy, and beautifully
              human.
            </motion.p>

            <motion.p
              variants={fadeRight}
              className="text-gray-600 leading-relaxed"
            >
              Every product is developed with careful attention to
              performance, skin safety, and freshness — because a clean home
              should never come at the cost of comfort.
            </motion.p>

            {/* ─── 4 pillar mini-grid ─── */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="group text-center p-3 rounded-xl border border-gray-100 transition-all duration-300"
                  >
                    <span
                      className="inline-flex w-9 h-9 items-center justify-center rounded-lg mb-2 transition-all duration-300 group-hover:text-white"
                      style={{ background: FRESH_SOFT, color: FRESH }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = FRESH;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = FRESH_SOFT;
                      }}
                    >
                      <Icon className="text-base" />
                    </span>
                    <p className="text-[12px] font-semibold text-gray-900 leading-tight">
                      {p.title}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                      {p.text}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* ─── Product range chips ─── */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-2 pt-1"
            >
              {MINI_RANGES.map((r) => (
                <span
                  key={r.label}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-medium text-gray-700 border border-gray-200 bg-white transition-colors duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${FRESH}66`;
                    e.currentTarget.style.color = FRESH;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.color = "";
                  }}
                >
                  <span className="text-sm">{r.emoji}</span>
                  {r.label}
                </span>
              ))}
            </motion.div>

            {/* ─── CTA ─── */}
            <motion.div
              variants={fadeUp}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/about"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-medium text-sm tracking-wide shadow-lg transition-all duration-300"
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
                <span
                  className="absolute top-0 left-[-120%] h-full w-[50%] animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  aria-hidden="true"
                />
                <span className="relative z-10">Learn More</span>
                <HiArrowRight className="relative z-10 text-base transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/all-products"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = FRESH;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                }}
              >
                Browse products
                <span
                  className="w-6 h-px bg-gray-300 group-hover:w-10 transition-all duration-300"
                  style={{ transitionProperty: "all" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = FRESH;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                  }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}