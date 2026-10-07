
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Milestones data ──────────────────────────────────────────
const milestones = [
  {
    year: "2017",
    title: "First Major Partnership",
    description:
      "Secured a long-term partnership with a leading automotive manufacturer, marking our entry into the automotive supply chain.",
  },
  {
    year: "2019",
    title: "Expansion into New Markets",
    description:
      "Opened our second manufacturing facility and expanded our product portfolio to include hydraulic presses and CNC machines.",
  },
  {
    year: "2021",
    title: "Innovation & Digitalisation",
    description:
      "Launched our fully digital product catalogue and online enquiry system, streamlining customer interactions.",
  },
  {
    year: "2023",
    title: "Global Reach",
    description:
      "Exported our machines to over 15 countries, establishing Elizon as a trusted global brand.",
  },
];

export default function OurJourneyPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const timeoutRef = useRef(null);

  // ─── Scroll trigger ──────────────────────────────────────────
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-80px" });

  // ─── Controlled blinking sequence ──────────────────────────
  useEffect(() => {
    const startBlink = () => {
      setIsBlinking(true);
      timeoutRef.current = setTimeout(() => {
        setIsBlinking(false);
        timeoutRef.current = setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % milestones.length);
        }, 400);
      }, 2400);
    };

    startBlink();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex]);

  // ─── Animation variants ────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* ─── CSS for blink animation ──────────────── */}
      <style>
        {`
          @keyframes blinkPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.2; }
          }

          .blink-active {
            animation: blinkPulse 1.2s ease-in-out 2;
          }
        `}
      </style>

      <main ref={sectionRef} className="bg-white overflow-hidden">
        <section className="py-8 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            {/* Container with scroll-triggered animations */}
            <motion.div
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
            >
              {/* ─── Left – Title & Timeline ────────────────────── */}
              <motion.div
                variants={itemVariants}
                className="transition-all duration-800 delay-100 transform"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight">
                  Our{" "}
                  <span className="font-medium text-[#0A367D]">
                    Journey
                  </span>
                </h2>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 md:mb-12"
                >
                  We stand apart through a disciplined approach to quality,
                  integrity, and client-focused delivery. Every machine we
                  build is shaped by clarity, consistency, and a strong
                  understanding of industrial requirements.
                </motion.p>

                {/* Timeline */}
                <motion.div
                  className="space-y-6 md:space-y-8"
                  variants={containerVariants}
                >
                  <div className="relative">
                    {/* ─── Vertical line ──────────────────────────── */}
                    <div className="absolute left-[23px] top-3 bottom-3 w-px bg-gradient-to-b from-[#0A367D]/40 via-[#0A367D]/25 to-[#0A367D]/5"></div>

                    {milestones.map((milestone, index) => {
                      const isActive =
                        index === activeIndex && isBlinking;

                      return (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="relative flex gap-4 md:gap-6 pb-6 md:pb-8 last:pb-0 group"
                          whileHover={{ scale: 1.02, x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="relative z-10">
                            {/* ─── Circle ────────────────────────────── */}
                            <div
                              className={`w-12 h-12 rounded-full bg-white border-2 flex items-center justify-center transition-all duration-300 ${
                                isActive
                                  ? "border-[#0A367D] blink-active"
                                  : "border-gray-200 group-hover:border-[#0A367D]/60"
                              }`}
                            >
                              {/* ─── Dot ──────────────────────────────── */}
                              <div
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                  isActive
                                    ? "bg-[#0A367D] blink-active"
                                    : "bg-gray-300 group-hover:bg-[#0A367D]/60"
                                }`}
                              />
                            </div>
                          </div>

                          <div>
                            <span className="text-[15px] font-mono text-gray-400 tracking-wide">
                              {milestone.year}
                            </span>

                            <h4 className="text-lg font-semibold text-[#0A367D] group-hover:text-[#0A367D]/80 transition-colors">
                              {milestone.title}
                            </h4>

                            <p className="text-sm text-gray-500 leading-relaxed mt-1 font-light">
                              {milestone.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>

              {/* ─── Right – Image ─────────────────────────────────── */}
              <motion.div
                variants={imageVariants}
                className="sm:col-span-2 lg:col-span-1 overflow-hidden rounded-lg h-[700px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="overflow-hidden rounded-lg h-full">
                  <img
                    src="/journey/image.png"
                    alt="Elizon manufacturing facility"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
