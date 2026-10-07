'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import {
  HiArrowRight,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineSearch,
  HiOutlineSparkles,
  HiOutlineX,
} from 'react-icons/hi';
import {
  getAllBlogs,
  getFeaturedBlog,
  getAllCategories,
} from '../lib/blog';

// ─── Palette ────────────────────────────────────────────────
const BRAND = '#0A367D';
const FRESH = '#14B8A6';

// ─── Animation ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BlogPage() {
  const allBlogs = getAllBlogs();
  const featured = getFeaturedBlog();
  const categories = ['All', ...getAllCategories()];

  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const rest = allBlogs.filter((b) => !b.featured);

  const filtered = useMemo(() => {
    return rest.filter((b) => {
      const matchesCategory =
        activeCategory === 'All' || b.category === activeCategory;
      const matchesQuery =
        !query.trim() ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [rest, activeCategory, query]);

  const showFeatured =
    activeCategory === 'All' && query.trim() === '' && featured;

  const clearSearch = () => setQuery('');

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/blog/banner.png"
          alt="Elizon Blog"
          className="w-full object-cover block"
        />

      
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, rgba(10,54,125,0.08) 0%, rgba(20,184,166,0.08) 100%)`,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════
          HEADER + SEARCH
      ═══════════════════════════════════════════════════════ */}
   

      {/* ═══════════════════════════════════════════════════════
          FEATURED ARTICLE
      ═══════════════════════════════════════════════════════ */}
      {showFeatured && (
        <section className="relative bg-gray-50 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase mb-8"
            >
              <span className="w-8 h-px" style={{ background: FRESH }} />
              <span style={{ color: FRESH }}>Featured Article</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Image */}
                  <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    <div className="h-[280px] lg:h-[440px] overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Category chip */}
                    <span
                      className="absolute top-5 left-5 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm"
                      style={{ color: FRESH }}
                    >
                      {featured.category}
                    </span>

                    {/* Featured badge */}
                    <span
                      className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full text-white shadow-lg"
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
                  <div>
                    <div className="flex items-center gap-4 text-[11px] tracking-[0.15em] uppercase text-gray-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <HiOutlineCalendar className="text-sm" />
                        {featured.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="flex items-center gap-1.5">
                        <HiOutlineClock className="text-sm" />
                        {featured.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight tracking-tight mb-4 group-hover:text-[#14B8A6] transition-colors">
                      {featured.title}
                    </h2>

                    <p className="text-base lg:text-[17px] text-gray-600 leading-relaxed mb-6">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex w-10 h-10 items-center justify-center rounded-full text-white text-sm font-semibold shrink-0"
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
                        className="group/btn inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300"
                        style={{ color: FRESH }}
                      >
                        Read article
                        <HiArrowRight className="text-base" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          ALL ARTICLES
      ═══════════════════════════════════════════════════════ */}
      <section
        className={`relative py-8 lg:py-12 ${
          showFeatured ? 'bg-white' : 'bg-gray-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header + count */}
          <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              {/* <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase mb-4">
                <span className="w-8 h-px" style={{ background: FRESH }} />
                <span style={{ color: FRESH }}>All Articles</span>
              </div> */}
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
                Browse the blog
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              {filtered.length}{' '}
              {filtered.length === 1 ? 'article' : 'articles'} found
            </p>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[11px] md:text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-500 border ${
                    isActive
                      ? 'text-white border-transparent'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#14B8A6]/60 hover:text-[#14B8A6]'
                  }`}
                  style={
                    isActive
                      ? {
                          background: FRESH,
                          boxShadow: `0 8px 24px ${FRESH}40`,
                        }
                      : undefined
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + query}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((post, i) => (
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
                        className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(20,184,166,0.12)] hover:-translate-y-1.5 hover:border-[#14B8A6]/30 transition-all duration-500"
                      >
                        {/* Image */}
                        <div className="relative h-[220px] overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />

                          {/* Category chip */}
                          <span
                            className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm"
                            style={{ color: FRESH }}
                          >
                            {post.category}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6">
                          {/* Meta */}
                          <div className="flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-gray-400 mb-3">
                            <span className="flex items-center gap-1.5">
                              <HiOutlineCalendar className="text-xs" />
                              {post.date}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="flex items-center gap-1.5">
                              <HiOutlineClock className="text-xs" />
                              {post.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-[17px] font-semibold text-gray-900 leading-snug mb-3 group-hover:text-[#14B8A6] transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
                            {post.excerpt}
                          </p>

                          {/* Spacer */}
                          <div className="flex-1" />

                          {/* Author + arrow */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-8 h-8 rounded-full grid place-items-center text-white text-[11px] font-semibold shrink-0"
                                style={{ background: FRESH }}
                              >
                                {post.author.charAt(0)}
                              </div>
                              <span className="text-xs font-medium text-gray-700">
                                {post.author}
                              </span>
                            </div>

                            <span
                              className="inline-flex w-7 h-7 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5"
                              style={{ background: `${FRESH}15`, color: FRESH }}
                            >
                              <HiArrowRight className="text-sm" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 max-w-md mx-auto">
                  <span
                    className="inline-flex w-14 h-14 items-center justify-center rounded-full mb-5"
                    style={{ background: `${FRESH}15`, color: FRESH }}
                  >
                    <HiOutlineSearch className="text-2xl" />
                  </span>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    No articles found
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Try a different category or clear your search.
                  </p>
                  {(query || activeCategory !== 'All') && (
                    <button
                      onClick={() => {
                        setQuery('');
                        setActiveCategory('All');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-colors duration-300"
                      style={{ background: FRESH }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  );
}