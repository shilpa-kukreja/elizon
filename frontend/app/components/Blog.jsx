'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiArrowRight,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { getHomeBlogs } from '../lib/blog';

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

export default function Blog() {
  const posts = getHomeBlogs(4); // 1 featured + 3 recent = 4 total
  const [featured, ...recent] = posts;

  return (
    <section className="relative bg-gray-50 py-8 lg:py-12 overflow-hidden">
      {/* Ambient glows */}
      <div
        className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${FRESH}10` }}
      />
      <div
        className="absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${BRAND}0d` }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════════════
            HEADER
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            {/* <span
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-4"
              style={{ color: FRESH }}
            >
              <span className="w-6 h-px" style={{ background: FRESH }} />
              Our Blog
            </span> */}

            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-semibold text-gray-900 leading-tight tracking-tight">
              Cleaning tips,{" "}
              <span style={{ color: FRESH }}>real-world guides.</span>
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mt-3 max-w-xl">
              Practical advice on detergents, hygiene, and home care — written
              by the people who formulate Elizon products.
            </p>
          </div>

          <Link
            href="/blogs"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white hover:border-[#14B8A6]/50 hover:bg-[#14B8A6]/[0.04] transition-all duration-300 self-start lg:self-auto shrink-0"
          >
            <span className="text-sm font-semibold text-gray-900 group-hover:text-[#14B8A6] transition-colors">
              View all articles
            </span>
            <span
              className="inline-flex w-7 h-7 items-center justify-center rounded-full text-white transition-all duration-500 group-hover:translate-x-0.5"
              style={{ background: FRESH }}
            >
              <HiArrowRight className="text-sm" />
            </span>
          </Link>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            LAYOUT — Featured + 3 recent
        ═══════════════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
          {/* ─── Featured post ─── */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="group block h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_60px_rgba(20,184,166,0.14)] hover:-translate-y-1.5 hover:border-[#14B8A6]/25 transition-all duration-500"
              >
                <div className="grid md:grid-cols-2 h-full">
                  {/* Image */}
                  <div className="relative h-[240px] md:h-full overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Category chip — top-left */}
                    <span
                      className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm"
                      style={{ color: FRESH }}
                    >
                      {featured.category}
                    </span>

                    {/* Featured badge — bottom-left */}
                    <span
                      className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full text-white shadow-lg"
                      style={{
                        background: FRESH,
                        boxShadow: `0 8px 20px ${FRESH}50`,
                      }}
                    >
                      <HiOutlineSparkles className="text-xs" />
                      Featured
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    {/* Meta row */}
                    <div className="flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-gray-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <HiOutlineCalendar className="text-xs" />
                        {featured.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="flex items-center gap-1.5">
                        <HiOutlineClock className="text-xs" />
                        {featured.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-snug mb-3 group-hover:text-[#14B8A6] transition-colors">
                      {featured.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>

                    {/* Author + read row */}
                    <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex w-9 h-9 items-center justify-center rounded-full text-white text-xs font-semibold shrink-0"
                          style={{ background: FRESH }}
                        >
                          {featured.author.charAt(0)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 leading-tight">
                            {featured.author}
                          </p>
                          <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                            {featured.authorRole}
                          </p>
                        </div>
                      </div>

                      <span
                        className="group/btn inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                        style={{ color: FRESH }}
                      >
                        Read
                        <HiArrowRight className="text-base" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ─── Recent 3 ─── */}
          <div className="flex flex-col gap-5">
            {recent.map((post, i) => (
              <motion.div
                key={post.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-[0_16px_40px_rgba(20,184,166,0.12)] hover:-translate-y-1 hover:border-[#14B8A6]/30 transition-all duration-500"
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span
                      className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1.5"
                      style={{ color: FRESH }}
                    >
                      {post.category}
                    </span>

                    <h4 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#14B8A6] transition-colors">
                      {post.title}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-wide mt-auto">
                      <HiOutlineClock className="text-xs" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="self-center shrink-0">
                    <span
                      className="inline-flex w-7 h-7 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5"
                      style={{ background: `${FRESH}15`, color: FRESH }}
                    >
                      <HiArrowRight className="text-sm" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}