'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

// ─── Palette ────────────────────────────────────────────────
const BRAND = '#0A367D';
const FRESH = '#14B8A6';

// ─── Animation ──────────────────────────────────────────────
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
const CATEGORIES = [
  {
    id: 'detergents',
    name: 'Detergents',
    tagline: 'Liquid, powder & concentrated',
    image: '/category/1.avif',
    count: '6 Products',
  },
  {
    id: 'soaps',
    name: 'Soaps & Handwash',
    tagline: 'Moisturising, antibacterial & glycerine',
    image: '/category/2.avif',
    count: '5 Products',
  },
  {
    id: 'toilet-cleaners',
    name: 'Toilet Cleaners',
    tagline: 'Liquids, gels & drop-in tablets',
    image: '/category/3.jpg',
    count: '4 Products',
  },
  {
    id: 'household-care',
    name: 'Household Care',
    tagline: 'Floor, glass, kitchen & more',
    image: '/category/4.avif',
    count: '5 Products',
  },
];

// ─── Single category card ───────────────────────────────────
function CategoryCard({ cat, className = '' }) {
  return (
    <Link
      href={`/all-products?category=${cat.id}`}
      className={`group relative block h-[360px] sm:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] hover:-translate-y-2 transition-all duration-500 ${className}`}
    >
      {/* Image */}
      <img
        src={cat.image}
        alt={cat.name}
        className="absolute inset-0 w-full h-full object-fill transition-transform duration-700 group-hover:scale-110"
      />

      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* Teal tint on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(180deg, ${FRESH}00 0%, ${FRESH}22 100%)`,
        }}
      />

      {/* Count chip */}
      <span className="absolute top-5 right-5 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-gray-900 shadow-sm">
        {cat.count}
      </span>

      {/* Bottom content */}
      <div className="absolute left-0 right-0 bottom-0 p-6 lg:p-7">
        <span
          className="block w-8 group-hover:w-14 h-[3px] rounded-full mb-4 transition-all duration-500"
          style={{ background: FRESH }}
        />

        <h3 className="text-xl lg:text-2xl font-semibold text-white leading-snug mb-2 tracking-tight">
          {cat.name}
        </h3>

        <p className="text-[13px] text-white/70 leading-relaxed mb-5 line-clamp-2">
          {cat.tagline}
        </p>

        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-white transition-all duration-300 group-hover:gap-3">
          <span
            className="inline-flex w-8 h-8 items-center justify-center rounded-full transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <HiArrowRight className="text-sm" />
          </span>
          <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            Explore
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function ShopByCategory({
  heading = 'Choose by category',
  subtitle = 'Find exactly what your home needs — from weekly laundry to a full Sunday deep clean.',
  categories = CATEGORIES,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % categories.length);

  const prevSlide = () =>
    setActiveIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );

  return (
    <section className="relative w-full py-8 lg:py-12 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ─── Header ─── */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 items-end mb-12 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[1.1] tracking-tight">
             Choose by <span className='text-[#14B8A6]'>category</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 text-gray-600 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            DESKTOP — 4-column grid
        ═══════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <CategoryCard cat={cat} />
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            MOBILE — Single-card carousel with arrows
        ═══════════════════════════════════════════════════════ */}
        <div className="lg:hidden relative">
          {/* Card viewport */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <CategoryCard cat={categories[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous category"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 grid place-items-center rounded-full bg-white/95 backdrop-blur-sm text-gray-900 shadow-[0_8px_24px_rgba(15,23,42,0.18)] border border-gray-100 transition-all duration-300 active:scale-95"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = FRESH;
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = FRESH;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
              e.currentTarget.style.color = '#111827';
              e.currentTarget.style.borderColor = '#f3f4f6';
            }}
          >
            <HiChevronLeft className="text-xl" />
          </button>

          {/* Next arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next category"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 grid place-items-center rounded-full bg-white/95 backdrop-blur-sm text-gray-900 shadow-[0_8px_24px_rgba(15,23,42,0.18)] border border-gray-100 transition-all duration-300 active:scale-95"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = FRESH;
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = FRESH;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
              e.currentTarget.style.color = '#111827';
              e.currentTarget.style.borderColor = '#f3f4f6';
            }}
          >
            <HiChevronRight className="text-xl" />
          </button>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {categories.map((_, i) => {
              const active = i === activeIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to category ${i + 1}`}
                  aria-current={active}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active ? 'w-7' : 'w-2'
                  }`}
                  style={{
                    background: active ? FRESH : '#e5e7eb',
                  }}
                />
              );
            })}
          </div>

          {/* Counter */}
          <p className="text-center text-[11px] tracking-[0.2em] uppercase text-gray-400 mt-3">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(categories.length).padStart(2, '0')}
          </p>
        </div>

        {/* ─── View all strip ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/all-products"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-gray-200 hover:border-[#14B8A6]/50 hover:bg-[#14B8A6]/[0.04] transition-all duration-300"
          >
            <span className="text-sm font-semibold text-gray-900 group-hover:text-[#14B8A6] transition-colors">
              View all products
            </span>
            <span
              className="inline-flex w-8 h-8 items-center justify-center rounded-full text-white transition-all duration-500 group-hover:translate-x-0.5"
              style={{ background: FRESH }}
            >
              <HiArrowRight className="text-sm" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}