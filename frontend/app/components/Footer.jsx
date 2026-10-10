'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaArrowUp,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiArrowRight,
} from 'react-icons/hi';

// ─── Palette ────────────────────────────────────────────────
const BRAND = '#0A367D';
const FRESH = '#14B8A6';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const groups = [
    {
      heading: 'Company',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'All Products', href: '/all-products' },
        // { name: 'Blog', href: '/blogs' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
    {
      heading: 'Categories',
      links: [
        { name: 'Detergents', href: '/all-products?category=detergents' },
        { name: 'Soaps & Handwash', href: '/all-products?category=soaps' },
        { name: 'Toilet Cleaners', href: '/all-products?category=toilet-cleaners' },
        { name: 'Household Care', href: '/all-products?category=household-care' },
        { name: 'All Products', href: '/all-products' },
      ],
    },
  ];

  const tagRail = [
    'Powerful Cleaning',
    'Fresh & Hygienic',
    'Laundry Care',
    'Bathroom Care',
    'Everyday Hygiene',
    'Quality Products',
    'Long-Lasting Freshness',
    'Trusted Cleaning Solutions',
  ];

  const socials = [
    { icon: FaFacebookF, href: 'https://www.facebook.com/', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://www.instagram.com/', label: 'Instagram' },
    // { icon: FaWhatsapp, href: 'https://wa.me/919876543210', label: 'WhatsApp' },
  ];

  return (
    <>
      <footer className="relative bg-[#030712] text-white overflow-hidden">
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: `${FRESH}14` }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: `${BRAND}20` }}
        />

        {/* ═══════════════════════════════════════════════════════
            MAIN NAV
        ═══════════════════════════════════════════════════════ */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 py-14 lg:py-16">
            {/* Left: brand */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <span className="relative w-8 h-8 grid place-items-center">
                  <span
                    className="absolute inset-0 rounded-lg border-[1.5px] transition-transform duration-500 group-hover:rotate-45"
                    style={{ borderColor: FRESH }}
                  />
                  <span
                    className="absolute inset-0 rounded-lg rotate-45 transition-transform duration-500 group-hover:rotate-0"
                    style={{ borderColor: `${FRESH}66` }}
                  />
                </span>

                <span className="text-lg font-semibold tracking-[0.28em] uppercase">
                  Eli<span style={{ color: FRESH }}>z</span>on
                </span>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                Powerful cleaning and personal care solutions designed to keep
                your home fresh, clean, hygienic, and beautifully cared for
                every day.
              </p>

              <div className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-gray-500">
                <span
                  className="inline-block w-6 h-px"
                  style={{ background: FRESH }}
                />
                Since 1999 · Made in India
              </div>
            </div>

            {/* Right: nav columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
              {groups.map((group) => (
                <div key={group.heading}>
                  <h3 className="relative inline-block text-[13px] font-bold tracking-[0.25em] uppercase text-white mb-6">
                    {group.heading}
                    <span
                      className="absolute left-0 -bottom-2 w-8 h-[3px] rounded-full"
                      style={{ background: FRESH }}
                    />
                  </h3>

                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          <span
                            className="inline-block w-0 group-hover:w-3 h-px transition-all duration-300"
                            style={{ background: FRESH }}
                          />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contact column */}
              <div>
                <h3 className="relative inline-block text-[13px] font-bold tracking-[0.25em] uppercase text-white mb-6">
                  Contact
                  <span
                    className="absolute left-0 -bottom-2 w-8 h-[3px] rounded-full"
                    style={{ background: FRESH }}
                  />
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-gray-400">
                    <HiOutlineLocationMarker
                      className="text-lg shrink-0 mt-0.5"
                      style={{ color: FRESH }}
                    />
                    <span className="leading-relaxed">
                      Elizon Industrial Park, Sector 63,
                      <br />
                      Noida, Uttar Pradesh — 201301
                    </span>
                  </li>

                  <li>
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <HiOutlinePhone
                        className="text-base shrink-0"
                        style={{ color: FRESH }}
                      />
                      <span>+91 98765 43210</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="mailto:info@elizon.in"
                      className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <HiOutlineMail
                        className="text-base shrink-0"
                        style={{ color: FRESH }}
                      />
                      <span>info@elizon.in</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            TAG RAIL — horizontal marquee
        ═══════════════════════════════════════════════════════ */}
        {/* <div className="relative border-t border-b border-white/[0.08] py-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#030712] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030712] to-transparent z-10" />

          <div className="flex gap-10 whitespace-nowrap animate-[marquee_40s_linear_infinite]">
            {[...tagRail, ...tagRail].map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-sm tracking-wide text-gray-500"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: FRESH }}
                />
                {tag}
              </span>
            ))}
          </div>
        </div> */}

        {/* ═══════════════════════════════════════════════════════
            BOTTOM BAR
        ═══════════════════════════════════════════════════════ */}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 border-t border-b border-white/[0.1]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-7">
            
            <p className="text-xs text-gray-500 tracking-wide order-2 md:order-1">
              © {currentYear} Elizon. All rights reserved.
            </p>

            <div className="flex items-center gap-3 order-1 md:order-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 grid place-items-center rounded-full border border-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = FRESH;
                      e.currentTarget.style.borderColor = FRESH;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                    }}
                  >
                    <Icon className="text-sm" />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-5 text-xs text-gray-500 order-3">
              <Link className="hover:text-white transition-colors" href="/privacy-policy">
                Privacy
              </Link>
              <span className="w-px h-3 bg-white/10" />
              <Link className="hover:text-white transition-colors" href="/terms">
                Terms
              </Link>
              <span className="w-px h-3 bg-white/10" />
              <Link className="hover:text-white transition-colors" href="/contact">
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Keyframes */}
   <style jsx global>{`
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ─── Inner halo (inside the circle) ─── */
  @keyframes elizon-halo {
    0%, 100% {
      opacity: 0.45;
      transform: scale(0.85);
    }
    50% {
      opacity: 0.85;
      transform: scale(1.1);
    }
  }

  /* ─── Inner halo on hover ─── */
  @keyframes elizon-halo-hover {
    0%, 100% {
      opacity: 0.7;
      transform: scale(0.95);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  /* ─── Inner ring that pulses (contained) ─── */
  @keyframes elizon-inner-ring {
    0%, 100% {
      opacity: 0.25;
      transform: scale(0.75);
    }
    50% {
      opacity: 0.6;
      transform: scale(1);
    }
  }

  /* ─── Inner ring on hover ─── */
  @keyframes elizon-inner-ring-hover {
    0%, 100% {
      opacity: 0.4;
      transform: scale(0.85);
    }
    50% {
      opacity: 0.85;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-\\[marquee_40s_linear_infinite\\] { animation: none; }
    .elizon-halo,
    .elizon-inner-ring { animation: none !important; }
  }
`}</style>
      </footer>

      {/* ═══════════════════════════════════════════════════════
          FLOATING ACTION STACK
      ═══════════════════════════════════════════════════════ */}
      <FloatingActions />
    </>
  );
}

/* ============================================================
   FLOATING ACTIONS — WhatsApp + Call + Back to Top
============================================================ */
function FloatingActions() {
  const [mounted, setMounted] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Config for each action
  const actions = [
    {
      key: 'whatsapp',
      label: 'Chat on WhatsApp',
      href:
        'https://wa.me/919876543210?text=' +
        encodeURIComponent(
          'Hi Elizon, I would like to know more about your products.'
        ),
      target: '_blank',
      bg: '#25D366',
      bgHover: '#1EBE5A',
      glow: 'rgba(37, 211, 102, 0.45)',
      icon: <FaWhatsapp className="text-lg" />,
    },
    {
      key: 'call',
      label: 'Call us now',
      href: 'tel:+919876543210',
      bg: FRESH,
      bgHover: '#0D9488',
      glow: 'rgba(20, 184, 166, 0.45)',
      icon: <HiOutlinePhone className="text-lg" />,
    },
  ];

  return (
    <div
      aria-label="Quick actions"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-3 transition-all duration-500"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: mounted ? 'auto' : 'none',
      }}
    >
      {/* WhatsApp + Call buttons */}
      {actions.map((a) => (
        <FloatingButton
          key={a.key}
          label={a.label}
          href={a.href}
          target={a.target}
          bg={a.bg}
          bgHover={a.bgHover}
          glow={a.glow}
          continuous
        >
          {a.icon}
        </FloatingButton>
      ))}

      {/* Back to Top — appears after scroll */}
      <div
        className="transition-all duration-500"
        style={{
          opacity: showTop ? 1 : 0,
          transform: showTop
            ? 'translateY(0) scale(1)'
            : 'translateY(8px) scale(0.9)',
          pointerEvents: showTop ? 'auto' : 'none',
        }}
      >
        <FloatingButton
          label="Back to top"
          onClick={scrollToTop}
          bg={BRAND}
          bgHover="#082B66"
          glow="rgba(10, 54, 125, 0.55)"
          isButton
          continuous
        >
          <FaArrowUp className="text-base" />
        </FloatingButton>
      </div>
    </div>
  );
}

/* ============================================================
   FLOATING BUTTON — reusable with continuous animation
============================================================ */
/* ============================================================
   FLOATING BUTTON — glow contained inside the circle
============================================================ */
function FloatingButton({
  label,
  href,
  target,
  onClick,
  bg,
  bgHover,
  glow,
  isButton = false,
  continuous = false,
  children,
}) {
  const [hovered, setHovered] = useState(false);

  const baseClass =
    'group relative w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full text-white transition-all duration-300 overflow-hidden';
  const baseStyle = {
    transform: hovered
      ? 'translateY(-2px) scale(1.05)'
      : 'translateY(0) scale(1)',
    // Outer soft drop — still allowed but subtle
    boxShadow: hovered
      ? `0 10px 24px ${glow}`
      : `0 6px 16px ${glow}`,
  };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    'aria-label': label,
  };

  const inner = (
    <>
      {/* ─── Base colour fill ─── */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: hovered ? bgHover : bg,
          transition: 'background 0.3s ease',
        }}
      />

      {/* ─── Inner pulse halo (contained inside circle) ─── */}
      {continuous && (
        <span
          aria-hidden="true"
          className="elizon-halo absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 35%, transparent 70%)`,
            animation: hovered
              ? 'elizon-halo-hover 1.4s ease-in-out infinite'
              : 'elizon-halo 2.4s ease-in-out infinite',
          }}
        />
      )}

      {/* ─── Icon with its own glow ─── */}
      <span
        className="relative z-10 grid place-items-center w-full h-full"
        style={{
          filter: `drop-shadow(0 0 6px rgba(255,255,255,0.55))`,
        }}
      >
        {children}
      </span>

      {/* ─── Subtle inner ring that pulses (contained) ─── */}
      {continuous && (
        <span
          aria-hidden="true"
          className="elizon-inner-ring absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: `1.5px solid rgba(255,255,255,0.55)`,
            animation: hovered
              ? 'elizon-inner-ring-hover 1.4s ease-in-out infinite'
              : 'elizon-inner-ring 2.4s ease-in-out infinite',
          }}
        />
      )}

      {/* ─── Tooltip ─── */}
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-full bg-[#030712] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered
            ? 'translate(-2px, -50%)'
            : 'translate(6px, -50%)',
        }}
      >
        {label}
        <span
          className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent"
          style={{ borderLeftColor: '#030712' }}
        />
      </span>
    </>
  );

  if (isButton) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={baseClass}
        style={baseStyle}
        {...handlers}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={baseClass}
      style={baseStyle}
      {...handlers}
    >
      {inner}
    </a>
  );
}