'use client';

import { useState, useEffect } from 'react';

// ---------- Palette ----------
const FRESH = '#0292FD';

// ---------- Desktop slides ----------
const DESKTOP_IMAGES = [
  {
    src: '/imageslider/desktop/desk1.jpg',
    alt: 'Elizon detergent range on a marble countertop',
    title: 'Powerful Cleaning',
    sub: 'Tough on stains, gentle on fabric',
  },
  {
    src: '/imageslider/desktop/desk2.jpg',
    alt: 'Elizon soaps and handwash collection',
    title: 'Everyday Freshness',
    sub: 'Moisturising care for the whole family',
  },
  {
    src: '/imageslider/desktop/desk3.jpg',
    alt: 'Elizon household cleaning essentials',
    title: 'A Cleaner Home',
    sub: 'Every corner, beautifully fresh',
  },
];

// ---------- Mobile slides ----------
const MOBILE_IMAGES = [
  {
    src: '/imageslider/mobile/slider1.jpg',
    alt: 'Elizon liquid detergent bottle',
    title: 'Powerful',
    sub: 'Cuts through stains',
  },
  {
    src: '/imageslider/mobile/slider2.jpg',
    alt: 'Elizon soap bar and handwash',
    title: 'Gentle',
    sub: 'Safe for every day',
  },
  {
    src: '/imageslider/mobile/slider3.jpg',
    alt: 'Elizon toilet cleaner',
    title: 'Fresh',
    sub: 'Lasting fragrance',
  },
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [arrowHover, setArrowHover] = useState(null);

  // Responsive detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const images = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;

  // Reset to first slide on device switch
  useEffect(() => {
    setIndex(0);
  }, [isMobile]);

  // Autoplay — every 4 seconds
  useEffect(() => {
    if (paused || images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, images.length]);

  const go = (dir) =>
    setIndex((i) => (i + dir + images.length) % images.length);

  const current = images[index];

  return (
    <section
      className="relative w-full bg-[#faf8f4]"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
      aria-label="Featured products"
    >
      <div
        className="relative w-full overflow-hidden bg-[#111]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ═══════════════════════════════════════════════════════
            SLIDING TRACK
        ═══════════════════════════════════════════════════════ */}
        <div
          className="flex w-full items-start will-change-transform"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: 'transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          {images.map((img, i) => (
            <div
              key={`${isMobile ? 'm' : 'd'}-${i}`}
              className="relative w-full shrink-0 grow-0 basis-full"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="block w-full h-auto"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            BOTTOM GRADIENT OVERLAY
        ═══════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(3,7,18,0.75) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════════════════
            CAPTION
        ═══════════════════════════════════════════════════════ */}
        <div
          className={`absolute z-[2] text-white transition-opacity duration-500 ${
            isMobile
              ? 'left-5 bottom-6 max-w-[65%]'
              : 'left-12 bottom-10 max-w-[55%]'
          }`}
        >
          {/* Accent bar */}
          <span
            className={`block rounded-full mb-3 lg:mb-4 ${
              isMobile ? 'w-6 h-[3px]' : 'w-8 h-[3px]'
            }`}
            style={{ background: FRESH }}
            aria-hidden="true"
          />

          {/* Title */}
          <p
            className={`m-0 font-semibold leading-tight text-white ${
              isMobile ? 'text-[20px]' : 'text-[30px]'
            }`}
          >
            {current?.title}
          </p>

          {/* Subtitle */}
          <p
            className={`mt-2.5 uppercase tracking-[0.16em] text-white/75 ${
              isMobile ? 'text-[11px]' : 'text-[13px]'
            }`}
          >
            {current?.sub}
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            LEFT ARROW
        ═══════════════════════════════════════════════════════ */}
        <button
          type="button"
          onMouseEnter={() => setArrowHover('left')}
          onMouseLeave={() => setArrowHover(null)}
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className={`absolute top-1/2 -translate-y-1/2 z-[2] grid place-items-center rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer ${
            isMobile ? 'left-3 w-[38px] h-[38px]' : 'left-8 w-12 h-12'
          }`}
          style={{
            background: arrowHover === 'left' ? FRESH : 'rgba(10, 10, 10, 0.55)',
            borderColor:
              arrowHover === 'left' ? FRESH : 'rgba(2, 146, 253, 0.40)',
            color: '#ffffff',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* ═══════════════════════════════════════════════════════
            RIGHT ARROW
        ═══════════════════════════════════════════════════════ */}
        <button
          type="button"
          onMouseEnter={() => setArrowHover('right')}
          onMouseLeave={() => setArrowHover(null)}
          onClick={() => go(1)}
          aria-label="Next slide"
          className={`absolute top-1/2 -translate-y-1/2 z-[2] grid place-items-center rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer ${
            isMobile ? 'right-3 w-[38px] h-[38px]' : 'right-8 w-12 h-12'
          }`}
          style={{
            background:
              arrowHover === 'right' ? FRESH : 'rgba(10, 10, 10, 0.55)',
            borderColor:
              arrowHover === 'right' ? FRESH : 'rgba(2, 146, 253, 0.40)',
            color: '#ffffff',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* ═══════════════════════════════════════════════════════
            DOTS
        ═══════════════════════════════════════════════════════ */}
        <div
          className={`absolute z-[2] flex items-center gap-2 ${
            isMobile ? 'right-5 bottom-7' : 'right-12 bottom-11'
          }`}
        >
          {images.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${
                  active ? 'w-7' : 'w-2'
                }`}
                style={{
                  background: active ? FRESH : 'rgba(255, 255, 255, 0.45)',
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}