'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import {
  HiArrowRight,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineShare,
  HiOutlineBookOpen,
  HiOutlineChevronRight,
  HiOutlinePrinter,
  HiOutlineSparkles,
} from 'react-icons/hi';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa';
import { getBlogBySlug, getRelatedBlogs } from '../../lib/blog';

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

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const post = getBlogBySlug(slug);
  const [progress, setProgress] = useState(0);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled =
        (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Fallback: article not found ───
  if (!post) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <section className="min-h-[60vh] grid place-items-center py-24 bg-gray-50">
          <div className="text-center max-w-md px-6">
            <span
              className="inline-flex w-14 h-14 items-center justify-center rounded-full mb-5"
              style={{ background: `${FRESH}15`, color: FRESH }}
            >
              <HiOutlineSparkles className="text-2xl" />
            </span>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              Article not found
            </h1>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              The article you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-colors"
              style={{ background: FRESH }}
            >
              Back to blog
              <HiArrowRight className="text-base" />
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const related = getRelatedBlogs(post.slug, 3);

  const toc = post.content
    .filter((block) => block.type === 'heading')
    .map((block) => block.text);

  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : '';
  const shareLinks = [
    {
      icon: FaFacebookF,
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      icon: FaTwitter,
      label: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(post.title)}`,
    },
    {
      icon: FaLinkedinIn,
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(
        post.title + ' ' + shareUrl
      )}`,
    },
  ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          READING PROGRESS BAR
      ═══════════════════════════════════════════════════════ */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] transition-transform duration-100"
        style={{
          background: FRESH,
          transform: `scaleX(${progress / 100})`,
          transformOrigin: 'left',
          boxShadow: `0 0 12px ${FRESH}80`,
        }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#030712] text-white overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] blur-[140px] rounded-full pointer-events-none"
          style={{ background: `${FRESH}25` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] blur-[140px] rounded-full pointer-events-none"
          style={{ background: `${BRAND}25` }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <HiOutlineChevronRight className="text-xs" style={{ color: FRESH }} />
            <Link href="/blogs" className="hover:text-white transition-colors">
              Blog
            </Link>
            <HiOutlineChevronRight className="text-xs" style={{ color: FRESH }} />
            <span style={{ color: FRESH }}>{post.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed max-w-3xl mb-8">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex w-8 h-8 items-center justify-center rounded-full text-white text-[11px] font-semibold"
                style={{ background: FRESH }}
              >
                {post.author.charAt(0)}
              </span>
              <span>{post.author}</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-white/15" />
            <div className="flex items-center gap-2">
              <HiOutlineCalendar className="text-base" style={{ color: FRESH }} />
              <span>{post.date}</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-white/15" />
            <div className="flex items-center gap-2">
              <HiOutlineClock className="text-base" style={{ color: FRESH }} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTENT + SIDEBAR
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* ─── Main article ─── */}
            <article className="lg:col-span-8">
              {/* Featured image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.08)] mb-12"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[280px] sm:h-[380px] lg:h-[440px] object-cover"
                />
                {/* Category chip */}
                <span
                  className="absolute top-5 left-5 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm"
                  style={{ color: FRESH }}
                >
                  {post.category}
                </span>
              </motion.div>

              {/* Content blocks */}
              <div className="space-y-7">
                {post.content.map((block, i) => {
                  if (block.type === 'lead') {
                    return (
                      <motion.p
                        key={i}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="text-lg lg:text-xl text-gray-700 leading-relaxed font-light pl-6"
                        style={{ borderLeft: `4px solid ${FRESH}` }}
                      >
                        {block.text}
                      </motion.p>
                    );
                  }

                  if (block.type === 'heading') {
                    return (
                      <motion.h2
                        key={i}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        id={block.text
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')}
                        className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug tracking-tight pt-6 scroll-mt-28"
                      >
                        {block.text}
                      </motion.h2>
                    );
                  }

                  if (block.type === 'paragraph') {
                    return (
                      <motion.p
                        key={i}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="text-base lg:text-[17px] text-gray-600 leading-[1.85]"
                      >
                        {block.text}
                      </motion.p>
                    );
                  }

                  if (block.type === 'quote') {
                    return (
                      <motion.blockquote
                        key={i}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="relative bg-gray-50 rounded-2xl border border-gray-100 p-6 lg:p-8 my-8 overflow-hidden"
                      >
                        {/* Accent bar */}
                        <span
                          className="absolute left-0 top-0 bottom-0 w-1"
                          style={{ background: FRESH }}
                        />
                        <span
                          className="absolute -top-3 left-6 text-5xl leading-none font-serif"
                          style={{ color: FRESH }}
                        >
                          &ldquo;
                        </span>
                        <p className="text-lg lg:text-xl text-gray-900 leading-relaxed italic mb-4 pl-2">
                          {block.text}
                        </p>
                        {block.cite && (
                          <footer
                            className="text-[11px] tracking-[0.22em] uppercase font-semibold pl-2"
                            style={{ color: FRESH }}
                          >
                            — {block.cite}
                          </footer>
                        )}
                      </motion.blockquote>
                    );
                  }

                  if (block.type === 'list') {
                    return (
                      <motion.ul
                        key={i}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="space-y-3 my-2"
                      >
                        {block.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-base lg:text-[17px] text-gray-600 leading-relaxed"
                          >
                            <span
                              className="shrink-0 w-1.5 h-1.5 rounded-full mt-3"
                              style={{ background: FRESH }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </motion.ul>
                    );
                  }

                  if (block.type === 'orderedList') {
                    return (
                      <motion.ol
                        key={i}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="space-y-4 my-2"
                      >
                        {block.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-4">
                            <span
                              className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-sm font-semibold"
                              style={{
                                background: `${FRESH}15`,
                                color: FRESH,
                              }}
                            >
                              {j + 1}
                            </span>
                            <span className="text-base lg:text-[17px] text-gray-600 leading-relaxed pt-1">
                              {item}
                            </span>
                          </li>
                        ))}
                      </motion.ol>
                    );
                  }

                  return null;
                })}
              </div>

              {/* ─── Author card ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className="mt-16 bg-gray-50 rounded-3xl border border-gray-100 p-6 lg:p-8"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div
                    className="shrink-0 w-16 h-16 rounded-2xl grid place-items-center text-white text-2xl font-semibold"
                    style={{ background: FRESH }}
                  >
                    {post.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-2"
                      style={{ color: FRESH }}
                    >
                      Written by
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {post.author}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {post.authorRole}
                    </p>
                    {post.authorBio && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {post.authorBio}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* ─── Bottom actions: Share (mobile) + Print ─── */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-gray-100">
                {/* Share (visible on mobile / tablet only) */}
                <div className="lg:hidden flex items-center gap-3">
                  <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400">
                    Share
                  </span>
                  {shareLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="w-9 h-9 grid place-items-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:text-white"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = FRESH;
                          e.currentTarget.style.borderColor = FRESH;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '';
                          e.currentTarget.style.borderColor = '';
                        }}
                      >
                        <Icon className="text-sm" />
                      </a>
                    );
                  })}
                </div>

                {/* Print */}
                {/* <button
                  onClick={handlePrint}
                  className="group ml-auto inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = FRESH;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '';
                  }}
                >
                  <HiOutlinePrinter className="text-base" />
                  Print this article
                </button> */}
              </div>
            </article>

            {/* ─── Sidebar ─── */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Table of contents */}
                {toc.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <HiOutlineBookOpen
                        className="text-lg"
                        style={{ color: FRESH }}
                      />
                      <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-900">
                        In this article
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {toc.map((heading, i) => (
                        <li key={i}>
                          <a
                            href={`#${heading
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')}`}
                            className="group flex items-start gap-3 text-sm text-gray-600 transition-colors"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = FRESH;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '';
                            }}
                          >
                            <span
                              className="shrink-0 text-[10px] tracking-widest text-gray-400 mt-1 transition-colors"
                              style={{ minWidth: 18 }}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="leading-snug">{heading}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Share card */}
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <HiOutlineShare
                      className="text-lg"
                      style={{ color: FRESH }}
                    />
                    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-900">
                      Share
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {shareLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                          className="w-10 h-10 grid place-items-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:text-white"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = FRESH;
                            e.currentTarget.style.borderColor = FRESH;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '';
                            e.currentTarget.style.borderColor = '';
                          }}
                        >
                          <Icon className="text-sm" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Contact card */}
                <div className="relative bg-[#030712] text-white rounded-2xl p-6 overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-[200px] h-[200px] blur-[80px] rounded-full pointer-events-none"
                    style={{ background: `${FRESH}40` }}
                  />
                  <div className="relative">
                    <p
                      className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3"
                      style={{ color: FRESH }}
                    >
                      Have a question?
                    </p>
                    <h3 className="text-base font-semibold leading-snug mb-3">
                      Talk to our product team
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">
                      Questions about a product, bulk order, or dealership?
                      We&apos;d love to help.
                    </p>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                      style={{ color: FRESH }}
                    >
                      Get in touch
                      <HiArrowRight className="text-base" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          RELATED ARTICLES
      ═══════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="relative bg-gray-50 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
              <div>
                <p
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-3"
                  style={{ color: FRESH }}
                >
                  <span className="w-6 h-px" style={{ background: FRESH }} />
                  Keep reading
                </p>
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
                  Related articles
                </h2>
              </div>

              <Link
                href="/blogs"
                className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 self-start lg:self-auto"
                style={{ color: FRESH }}
              >
                View all posts
                <span
                  className="inline-flex w-7 h-7 items-center justify-center rounded-full text-white transition-all duration-500 group-hover:translate-x-0.5"
                  style={{ background: FRESH }}
                >
                  <HiArrowRight className="text-sm" />
                </span>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                >
                  <Link
                    href={`/blogs/${r.slug}`}
                    className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
                    style={{ transitionProperty: 'transform, box-shadow, border-color' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 20px 50px rgba(20,184,166,0.12)`;
                      e.currentTarget.style.borderColor = `${FRESH}4d`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '';
                      e.currentTarget.style.borderColor = '';
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span
                        className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm"
                        style={{ color: FRESH }}
                      >
                        {r.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 text-[11px] tracking-wide text-gray-400 uppercase mb-3">
                        <span>{r.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{r.readTime}</span>
                      </div>

                      <h3
                        className="text-base font-semibold text-gray-900 leading-snug mb-3 line-clamp-2 transition-colors"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = FRESH;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '';
                        }}
                      >
                        {r.title}
                      </h3>

                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {r.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}