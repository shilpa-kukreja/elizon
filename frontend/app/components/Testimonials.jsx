"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi";

// ─── Palette ────────────────────────────────────────────────
const BRAND = "#0A367D";
const FRESH = "#0292FD";
const STAR = "#F5A623"; // warm amber for star ratings

// ─── Animation Variants ──────────────────────────────────────
const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const lineVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "5rem",
    opacity: 1,
    transition: { delay: 0.3, duration: 0.8 },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } },
};

// ─── Testimonials ────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    name: "Anjali Mehta",
    position: "Homemaker",
    company: "Mumbai",
    rating: 5,
    content:
      "The liquid detergent cleans my kids\u2019 clothes beautifully even in cold water. No stains, no residue, and the freshness lasts the whole week.",
    image: "/testimonials/1.jpg",
  },
  {
    id: 2,
    name: "Rohit Malhotra",
    position: "Restaurant Owner",
    company: "Gurugram",
    rating: 5,
    content:
      "We switched to Full kelin\u2019s dishwash gel for our kitchen and the difference was immediate — cuts grease faster and lasts twice as long as what we used before.",
    image: "/testimonials/2.jpg",
  },
  {
    id: 3,
    name: "Dr. Sanjay Kulkarni",
    position: "Pediatrician",
    company: "Pune",
    rating: 5,
    content:
      "I recommend Full Klein\u2019s gentle handwash to parents concerned about skin sensitivity. It cleans well without drying out little hands — a genuine relief for families.",
    image: "/testimonials/3.jpg",
  },
  {
    id: 4,
    name: "Neha Arora",
    position: "Working Mother",
    company: "Delhi",
    rating: 4,
    content:
      "Between work and two kids, my cleaning routine has to be quick. Full Klein\u2019s toilet cleaner and multi-surface spray make the daily wipe-down genuinely effortless.",
    image: "/testimonials/4.jpeg",
  },
  {
    id: 5,
    name: "Vikas Sharma",
    position: "Facility Manager",
    company: "Ahmedabad",
    rating: 5,
    content:
      "We use Full Klein products across a 200-person office. The floor cleaner leaves no streaks, the toilet care keeps washrooms fresh all day, and the pricing is fair for the quality.",
    image: "/testimonials/5.jpg",
  },
  {
    id: 6,
    name: "Kavita Iyer",
    position: "School Administrator",
    company: "Bengaluru",
    rating: 5,
    content:
      "For a school with 800 children, hygiene matters. Full Klein\u2019s antibacterial soaps and sanitisers have become part of our daily routine — reliable and gentle on skin.",
    image: "/testimonials/6.jpg",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  // Responsive detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Autoplay
  const startAutoplay = () => {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetAutoplay = () => startAutoplay();

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    resetAutoplay();
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
    resetAutoplay();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoplay();
  };

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % TESTIMONIALS.length;
      result.push(TESTIMONIALS[index]);
    }
    return result;
  };

  // ─── Stars ────────────────────────────────────────────────
  const renderStars = (rating) => (
    <div className="flex gap-[3px]">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          fill={i < rating ? STAR : "#e5e7eb"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  // ─── Card ─────────────────────────────────────────────────
  const Card = ({ t, className = "" }) => (
    <div
      className={`group relative h-full flex flex-col bg-white rounded-2xl p-6 lg:p-7 border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_50px_rgba(2,146,253,0.10)] hover:border-[#0292FD]/30 hover:-translate-y-1 transition-all duration-500 overflow-hidden ${className}`}
    >
      {/* Big quote mark */}
      <span
        className="absolute top-2 right-2 text-6xl leading-none font-serif select-none opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500"
        style={{ color: FRESH }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative">
        {/* Quote text */}
        <p className="text-[14px] leading-relaxed text-gray-600 mb-5 lg:min-h-[120px]">
          {t.content}
        </p>

        {/* Stars */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {renderStars(t.rating)}
          <span className="text-[10px] font-medium tracking-[0.16em] uppercase text-gray-400">
            Verified
          </span>
        </div>

        {/* Divider — thin, accent-tinted */}
        <div
          className="w-full h-px mb-4"
          style={{
            background: `linear-gradient(90deg, ${FRESH}40, transparent)`,
          }}
        />

        {/* Author */}
        <div className="flex items-center gap-3 mt-auto">
          {/* Initial avatar */}
          <div
            className="shrink-0 w-11 h-11 grid place-items-center rounded-full text-white text-sm font-semibold select-none"
            style={{
              background: `linear-gradient(135deg, ${FRESH} 0%, ${BRAND} 130%)`,
            }}
            aria-hidden="true"
          >
            {t.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 leading-tight">
              {t.name}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5 leading-tight">
              {t.position}
            </p>
            <p
              className="text-[11px] mt-0.5 font-medium tracking-wide"
              style={{ color: FRESH }}
            >
              {t.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Testimonials"
      className="relative w-full py-8 lg:py-12 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #ffffff 0%, #f8fafb 100%)`,
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-14">
          {/* ---------- LEFT: Text ---------- */}
          <div className="w-full lg:w-[30%] mb-10 lg:mb-0 shrink-0">
            <motion.h2
              variants={headingVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight"
            >
              What our <span style={{ color: FRESH }}>customers say</span>
            </motion.h2>

            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="h-[3px] rounded-full mt-5 mb-6"
              style={{ background: FRESH }}
            />

            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-gray-600 text-[15px] leading-relaxed max-w-md mb-7"
            >
              Real feedback from real homes — mothers, home chefs, teachers, and
              facility managers who trust Full Klein for their everyday cleaning.
            </motion.p>

            {/* Quick stats strip */}
            <motion.div
              variants={subtitleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex items-center gap-6 pt-6 border-t border-gray-100"
            >
              <div>
                <div
                  className="text-2xl font-semibold leading-none"
                  style={{ color: FRESH }}
                >
                  4.9
                </div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 mt-1.5">
                  Avg rating
                </p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <div
                  className="text-2xl font-semibold leading-none"
                  style={{ color: FRESH }}
                >
                  1M+
                </div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 mt-1.5">
                  Happy homes
                </p>
              </div>
            </motion.div>
          </div>

          {/* ---------- RIGHT: Carousel ---------- */}
          <div
            className="w-full lg:w-[70%] relative"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            {/* Desktop: 3-card grid */}
            <div className="hidden lg:grid grid-cols-3 gap-5">
              {getVisibleTestimonials().map((t, idx) => (
                <div
                  key={t.id}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: `opacity 0.7s ease ${idx * 100}ms`,
                  }}
                >
                  <Card t={t} />
                </div>
              ))}
            </div>

            {/* Mobile: single-card carousel */}
            <div className="lg:hidden relative px-2">
              <div
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              >
                <Card t={TESTIMONIALS[currentIndex]} />
              </div>

              {/* Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-white border border-gray-200 text-gray-900 shadow-[0_6px_20px_rgba(15,23,42,0.10)] transition-colors duration-300 z-[2]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = FRESH;
                  e.currentTarget.style.borderColor = FRESH;
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.color = "#111827";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-white border border-gray-200 text-gray-900 shadow-[0_6px_20px_rgba(15,23,42,0.10)] transition-colors duration-300 z-[2]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = FRESH;
                  e.currentTarget.style.borderColor = FRESH;
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.color = "#111827";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-9 lg:mt-10">
              {TESTIMONIALS.map((_, i) => {
                const active = i === currentIndex;
                return (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === currentIndex}
                    className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
                      active ? "w-7" : "w-2"
                    }`}
                    style={{
                      background: active ? FRESH : "#e5e7eb",
                    }}
                    onMouseEnter={(e) => {
                      if (!active)
                        e.currentTarget.style.background = `${FRESH}66`;
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.background = "#e5e7eb";
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}