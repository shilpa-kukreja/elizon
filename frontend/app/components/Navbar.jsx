'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiArrowRight,
} from 'react-icons/hi';

// ─── Palette ────────────────────────────────────────────────
const BRAND = '#0A367D';
const FRESH = '#0292FD';
const FRESH_DARK = '#0273C9';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/all-products' },
  // { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
  // { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
];

function isLinkActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* ============================================================
          NAVBAR
      ============================================================ */}
      <nav
        aria-label="Primary"
        className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.06)]'
            : 'bg-white/85'
        }`}
        style={{
          borderBottom: `1px solid ${
            scrolled ? `${FRESH}33` : 'rgba(229, 231, 235, 0.7)'
          }`,
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4 lg:gap-6">
            {/* ---------- Logo ---------- */}
            <Link
              href="/"
              aria-label="Elizon home"
              className="group inline-flex items-center gap-3 shrink-0"
            >
              <span className="relative w-[30px] h-[30px] grid place-items-center">
                <span
                  className="absolute inset-0 rounded-lg border-[1.5px] transition-transform duration-500 ease-out group-hover:rotate-45"
                  style={{ borderColor: FRESH }}
                />
                <span
                  className="absolute inset-0 rounded-lg rotate-45 transition-transform duration-500 ease-out group-hover:rotate-0"
                  style={{ borderColor: `${FRESH}66` }}
                />
              </span>

              <span className="text-[17px] sm:text-[19px] font-semibold tracking-[0.24em] sm:tracking-[0.28em] uppercase text-gray-900">
                Eli<span style={{ color: FRESH }}>z</span>on
              </span>
            </Link>

            {/* ---------- Desktop links ---------- */}
            <ul className="hidden lg:flex items-center gap-9 list-none m-0 p-0">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(pathname, link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative inline-block py-1.5 text-[13px] tracking-[0.14em] uppercase transition-colors duration-200 ${
                        active
                          ? 'text-gray-900 font-semibold'
                          : 'text-gray-500 font-medium hover:text-gray-900'
                      }`}
                    >
                      {link.label}

                      {/* Accent gradient underline */}
                      <span
                        className={`pointer-events-none absolute left-0 bottom-0 h-[1.5px] w-full origin-center transition-transform duration-300 ease-out ${
                          active
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                        style={{
                          background: `linear-gradient(90deg, transparent, ${FRESH}, transparent)`,
                        }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ---------- Desktop CTA ---------- */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex group relative items-center justify-center overflow-hidden rounded-full border px-6 py-2.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-gray-900 transition-colors duration-300 hover:text-white"
              style={{ borderColor: `${FRESH}66` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = FRESH;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${FRESH}66`;
              }}
            >
              <span
                className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                style={{ background: FRESH }}
              />
              <span className="relative z-10">Request a Quote</span>
            </Link>

            {/* ---------- Mobile: phone icon + burger ---------- */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:+919876543210"
                aria-label="Call us"
                className="hidden sm:grid w-10 h-10 place-items-center rounded-full border border-gray-200 text-gray-700 transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = FRESH;
                  e.currentTarget.style.borderColor = FRESH;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.color = '#374151';
                }}
              >
                <HiOutlinePhone className="text-base" />
              </a>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                className="relative z-[70] w-10 h-10 rounded-full border border-gray-200 cursor-pointer transition-colors"
                style={{
                  background: open ? FRESH : 'transparent',
                  borderColor: open ? FRESH : '#e5e7eb',
                }}
              >
                <span
                  className={`absolute left-1/2 w-[18px] h-[1.5px] -translate-x-1/2 transition-all duration-300 ${
                    open
                      ? 'top-[19px] rotate-45 bg-white'
                      : 'top-[14px] bg-gray-900'
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-[19px] w-[18px] h-[1.5px] -translate-x-1/2 transition-all duration-300 ${
                    open ? 'opacity-0 bg-white' : 'opacity-100 bg-gray-900'
                  }`}
                />
                <span
                  className={`absolute left-1/2 w-[18px] h-[1.5px] -translate-x-1/2 transition-all duration-300 ${
                    open
                      ? 'top-[19px] -rotate-45 bg-white'
                      : 'top-[24px] bg-gray-900'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================================
          MOBILE DRAWER
      ============================================================ */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[55] lg:hidden transition-transform duration-500 ease-out ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div className="absolute inset-x-0 top-0 max-h-screen overflow-y-auto bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
          {/* Drawer header */}
          <div className="px-6 pt-5 pb-6 border-b border-gray-100">
            <span
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] uppercase mb-2"
              style={{ color: FRESH }}
            >
              <span className="w-5 h-px" style={{ background: FRESH }} />
              Menu
            </span>
            <p className="text-gray-500 text-sm leading-relaxed">
              Explore our full range of cleaning solutions.
            </p>
          </div>

          {/* Nav links */}
          <nav className="px-4 sm:px-6 py-4">
            <ul className="space-y-1 list-none m-0 p-0">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`group flex items-center justify-between py-3.5 px-4 rounded-2xl text-base font-medium tracking-[0.04em] transition-all duration-300 ${
                        active
                          ? 'text-gray-900'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      style={{
                        background: active ? `${FRESH}14` : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!active)
                          e.currentTarget.style.background = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        if (!active)
                          e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="inline-flex w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            background: active ? FRESH : '#d1d5db',
                          }}
                        />
                        {link.label}
                      </span>

                      <HiArrowRight
                        className={`text-base transition-all duration-300 ${
                          active
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                        }`}
                        style={{ color: active ? FRESH : '#9ca3af' }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA + contact */}
          <div className="px-6 pb-8 pt-2 border-t border-gray-100 mt-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 group inline-flex w-full items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-semibold tracking-[0.14em] uppercase text-white transition-colors duration-300"
              style={{ background: FRESH }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = FRESH_DARK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = FRESH;
              }}
            >
              Request a Quote
              <HiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Quick contact row */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span
                  className="inline-flex w-8 h-8 items-center justify-center rounded-full"
                  style={{ background: `${FRESH}15`, color: FRESH }}
                >
                  <HiOutlinePhone className="text-sm" />
                </span>
                +91 98765 43210
              </a>

              <a
                href="mailto:info@elizon.in"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span
                  className="inline-flex w-8 h-8 items-center justify-center rounded-full"
                  style={{ background: `${FRESH}15`, color: FRESH }}
                >
                  <HiOutlineMail className="text-sm" />
                </span>
                info@elizon.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}