'use client';

import { motion } from 'framer-motion';

// ─── Palette ────────────────────────────────────────────────
const BRAND = '#0A367D';
const FRESH = '#0292FD';
const FRESH_SOFT = 'rgba(2, 146, 253, 0.10)';

// ─── Animation ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ─── Badge data ─────────────────────────────────────────────
const BADGES = [
  {
    image: '/trust/1.png',
    alt: 'Dermatologically Tested',
    label: 'Dermatologically Tested',
    sub: 'Safe for sensitive skin',
  },
  {
    image: '/trust/2.png',
    alt: 'Eco-Friendly Formula',
    label: 'Eco-Friendly',
    sub: 'Biodegradable ingredients',
  },
  {
    image: '/trust/3.png',
    alt: 'Made in India',
    label: 'Made in India',
    sub: 'Manufactured locally',
  },
  {
    image: '/trust/4.png',
    alt: 'Cruelty Free',
    label: 'Cruelty Free',
    sub: 'Never tested on animals',
  },
  {
    image: '/trust/5.png',
    alt: 'pH Balanced',
    label: 'pH Balanced',
    sub: 'Gentle on skin and fabric',
  },
  {
    image: '/trust/6.png',
    alt: 'Quality Assured',
    label: 'Quality Assured',
    sub: 'Lab tested formulas',
  },
];

export default function TrustBadges({
  heading = 'Trusted quality ',
  subtitle = 'Every Full Klein product is backed by testing, safety standards, and a promise of consistent performance.',
  badges = BADGES,
  background = 'white', // 'white' | 'gray' | 'dark'
}) {
  // Background variants
  const bgClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-[#030712] text-white',
  }[background];

  const isDark = background === 'dark';

  return (
    <section
      className={`relative w-full py-8 lg:py-12 overflow-hidden ${bgClass}`}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-12 lg:mb-16"
        >
          <h2
            className={`text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {heading}{' '}
            <span style={{ color: FRESH }}>in every pack</span>
          </h2>

          <p
            className={`text-base leading-relaxed max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Badge grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-5">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group flex flex-col items-center text-center"
            >
              {/* Image wrapper */}
              <div
                className={`relative w-24 h-24 lg:w-32 lg:h-32 grid place-items-center rounded-full transition-all duration-500 group-hover:-translate-y-1 ${
                  isDark
                    ? 'bg-white/[0.04] border border-white/10 group-hover:bg-white/[0.07]'
                    : 'bg-white border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
                }`}
                style={
                  isDark
                    ? undefined
                    : undefined
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${FRESH}4d`;
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(2,146,253,0.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <img
                  src={badge.image}
                  alt={badge.alt || badge.label}
                  className="w-14 h-14 lg:w-20 lg:h-20 object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="mt-4">
                <h3
                  className={`text-[13px] lg:text-sm font-semibold leading-snug mb-1 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = FRESH;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '';
                  }}
                >
                  {badge.label}
                </h3>

                {badge.sub && (
                  <p
                    className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}
                  >
                    {badge.sub}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}