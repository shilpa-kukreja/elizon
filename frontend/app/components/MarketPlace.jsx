'use client';

import { motion } from 'framer-motion';

// ─── Palette ────────────────────────────────────────────────
const FRESH = '#14B8A6';

// ─── Marketplace list ───────────────────────────────────────
const MARKETPLACES = [
  { name: 'Amazon', logo: '/market/amazon.png', tagline: 'Prime delivery' },
  { name: 'Flipkart', logo: '/market/flipkart.png', tagline: 'Pan-India shipping' },
  { name: 'Blinkit', logo: '/market/blinkit.png', tagline: '10-min delivery' },
  { name: 'Zepto', logo: '/market/zepto.jpeg', tagline: 'Quick commerce' },
  { name: 'BigBasket', logo: '/market/bigbasket.jpg', tagline: 'Grocery & home' },
];

// ─── Repetition count ───────────────────────────────────────
// 4 copies guarantees the track is wider than any viewport
// (up to ~3× ultra-wide) so no gaps appear during animation.
// The keyframe moves exactly 1/4 of the track = one full set.
const COPIES = 4;

export default function MarketplaceMarquee({
  heading = 'Also ',
  subtitle = "Find Full Klein products on India's most trusted marketplaces and quick-commerce platforms.",
  marketplaces = MARKETPLACES,
  speed = 40, // seconds per full set pass
}) {
  // Repeat the set 4× — the animation translates by exactly
  // one set width (−25%), so the seam is mathematically perfect.
  const loopItems = Array.from({ length: COPIES }).flatMap(() => marketplaces);

  // Move by one set = 1 / COPIES of the whole track
  const translatePct = -(100 / COPIES);

  return (
    <>
      <style jsx global>{`
        @keyframes elizon-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(${translatePct}%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .elizon-marquee-track {
            animation: none !important;
          }
        }
      `}</style>

      <section
        aria-label="Available on"
        className="relative w-full py-8 lg:py-12 bg-white overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* ─── Header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-10 lg:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight tracking-tight mb-3">
              {heading} <span className='text-[#0292FD]'>Available In</span>
            </h2>

            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            MARQUEE — full-bleed with edge fades
        ═══════════════════════════════════════════════════════ */}
        <div className="relative">
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />

          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

          {/* Track wrapper */}
          <div className="w-full overflow-hidden">
            <div
              className="elizon-marquee-track flex w-max items-center will-change-transform"
              style={{
                animation: `elizon-marquee ${speed}s linear infinite`,
              }}
            >
              {loopItems.map((market, i) => (
                <MarketplaceCard
                  key={`${market.name}-${i}`}
                  market={market}
                  ariaHidden={i >= marketplaces.length}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── Footnote strip ─── */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 mt-10 lg:mt-12">
          <p className="text-center text-[11px] tracking-[0.22em] uppercase text-gray-400">
            Trusted by 10,000+ retailers &amp; 1M+ homes across India
          </p>
        </div>
      </section>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
//   SINGLE MARKETPLACE CARD
// ═══════════════════════════════════════════════════════════
function MarketplaceCard({ market, ariaHidden }) {
  return (
    <div
      aria-hidden={ariaHidden ? 'true' : undefined}
      // ↓ margin-right replaces the container gap — this is the
      //   fix that eliminates the seam gap in the marquee loop
      className="group shrink-0 mr-5 lg:mr-6 flex items-center gap-4 px-5 lg:px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_32px_rgba(20,184,166,0.12)] hover:border-[#14B8A6]/30 hover:-translate-y-0.5 transition-all duration-500"
    >
      {/* Logo container */}
      <div className="relative w-12 h-12 lg:w-14 lg:h-14 grid place-items-center rounded-xl bg-gray-50 overflow-hidden shrink-0">
        <img
          src={market.logo}
          alt={market.name}
          className=" object-contain"
          loading="lazy"
          onError={(e) => {
            // Fallback: show initials if image fails to load
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent && !parent.querySelector('[data-fallback]')) {
              const span = document.createElement('span');
              span.setAttribute('data-fallback', 'true');
              span.style.fontWeight = '700';
              span.style.fontSize = '14px';
              span.style.color = '#0A367D';
              span.style.letterSpacing = '0.05em';
              span.textContent = market.name
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();
              parent.appendChild(span);
            }
          }}
        />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-[14px] lg:text-[15px] font-semibold text-gray-900 leading-tight whitespace-nowrap">
          {market.name}
        </p>
        <p className="text-[11px] lg:text-[12px] text-gray-500 leading-tight mt-0.5 whitespace-nowrap">
          {market.tagline}
        </p>
      </div>
    </div>
  );
}