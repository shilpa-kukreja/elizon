"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiArrowRight, HiOutlinePhone, HiOutlineSparkles } from "react-icons/hi";

// ─── Palette ────────────────────────────────────────────────
const BRAND = "#0A367D";
const BRAND_DARK = "#082B66";
const FRESH = "#14B8A6";
const FRESH_DARK = "#0D9488";

// ─── Foam bubbles ───────────────────────────────────────────
function Bubbles() {
  const dots = [
    { top: "10%", left: "5%", size: 90 },
    { top: "70%", left: "92%", size: 70 },
    { top: "40%", left: "48%", size: 30 },
    { top: "15%", left: "85%", size: 50 },
    { top: "80%", left: "12%", size: 40 },
    { top: "55%", left: "20%", size: 22 },
    { top: "25%", left: "30%", size: 16 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.14), rgba(255,255,255,0.02))`,
            border: `1px solid rgba(255,255,255,0.12)`,
          }}
        />
      ))}
    </div>
  );
}

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-8 lg:py-12 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #030712 0%, #0a1a33 50%, #030712 100%)`,
        }}
      />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Fresh + brand glows */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `${FRESH}25`,
          filter: "blur(140px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `${BRAND}30`,
          filter: "blur(140px)",
        }}
      />

      {/* Foam bubbles */}
      <Bubbles />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {/* Eyebrow */}
          {/* <div
            className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-5 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{ color: FRESH }}
          >
            <HiOutlineSparkles className="text-sm" />
            Ready when you are
          </div> */}

          {/* Headline */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.1] tracking-tight mb-5 max-w-3xl mx-auto transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            Make every clean{" "}
            <span style={{ color: FRESH }}>a better clean.</span>
          </h2>

          {/* Description */}
          <p
            className={`text-gray-400 text-base lg:text-[17px] leading-relaxed max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            Detergents, soaps, toilet cleaners, and household essentials —
            designed to bring lasting freshness and everyday hygiene to homes
            and businesses across India.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mb-10 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {/* Primary — Explore products */}
            <Link
              href="/all-products"
              className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              style={{
                background: FRESH,
                boxShadow: `0 12px 32px ${FRESH}40`,
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
              <span className="relative z-10">Explore Products</span>
              <HiArrowRight className="relative z-10 text-base transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary — Call */}
            <a
              href="tel:+917428855574"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white border border-white/20 hover:border-white/50 hover:bg-white/[0.06] transition-all duration-300"
            >
              <HiOutlinePhone className="text-base" style={{ color: FRESH }} />
              <span>Call Us: +91 74288 55574</span>
            </a>
          </div>

          {/* Trust strip */}
          {/* <div
            className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-8 border-t border-white/10 max-w-3xl mx-auto transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {[
              "Free shipping above ₹499",
              "100% secure payments",
              "Easy returns within 7 days",
            ].map((line) => (
              <span
                key={line}
                className="inline-flex items-center gap-2 text-[12px] tracking-wide text-gray-400"
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: FRESH }}
                />
                {line}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}