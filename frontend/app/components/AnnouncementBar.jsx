'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

const announcements = [
  'Powerful cleaning solutions for everyday freshness',
  'Quality detergents, soaps & toilet cleaners',
  'Effective cleaning with long-lasting freshness',
  'Trusted solutions for homes, workplaces & everyday hygiene',
];

// Brand palette
const BRAND_DARK = '#0035BE';
const BRAND = '#0A367D';
const FRESH = '#14B8A6';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  // Render the list twice for a seamless marquee loop
  const loopItems = [...announcements, ...announcements];

  return (
    <>
      <style>{`
        /* ─────────────────────────────────────────────
           Bar container
        ───────────────────────────────────────────── */
        .elizon-bar {
          position: relative;
          width: 100%;
          height: 42px;
          background: linear-gradient(
            90deg,
            ${BRAND_DARK} 0%,
            ${BRAND} 50%,
            ${BRAND_DARK} 100%
          );
          color: #ffffff;
          overflow: hidden;
          display: flex;
          align-items: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          user-select: none;
        }

        /* Top sheen */
        .elizon-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.14) 0%,
            rgba(255, 255, 255, 0) 45%
          );
          z-index: 2;
        }

        /* Edge fades */
        .elizon-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, ${BRAND} 0%, transparent 6%),
            linear-gradient(270deg, ${BRAND} 0%, transparent 6%);
          z-index: 2;
        }

        /* ─────────────────────────────────────────────
           Bottom accent line — a mint-teal strip that
           travels across the full width on a loop
        ───────────────────────────────────────────── */
        .elizon-accent {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            ${FRESH} 30%,
            ${FRESH} 70%,
            transparent 100%
          );
          opacity: 0.55;
          z-index: 3;
          pointer-events: none;
        }

        /* ─────────────────────────────────────────────
           Marquee track
        ───────────────────────────────────────────── */
        .elizon-track {
          display: flex;
          width: max-content;
          animation: elizon-marquee 55s linear infinite;
          will-change: transform;
          z-index: 1;
        }

        .elizon-bar:hover .elizon-track {
          animation-play-state: paused;
        }

        /* ─────────────────────────────────────────────
           Individual announcement item
        ───────────────────────────────────────────── */
        .elizon-item {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding-right: 56px;
          white-space: nowrap;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #ffffff;
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
        }

        /* ─────────────────────────────────────────────
           Separator — a small mint-teal droplet with a
           soft pulsing halo behind it
        ───────────────────────────────────────────── */
        .elizon-sep {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 12px;
          height: 12px;
          color: ${FRESH};
          flex-shrink: 0;
        }

        .elizon-sep::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: ${FRESH};
          opacity: 0.15;
          animation: elizon-pulse 2.4s ease-in-out infinite;
        }

        .elizon-sep svg {
          position: relative;
          width: 11px;
          height: 11px;
          z-index: 1;
        }

        /* ─────────────────────────────────────────────
           Keyframes
        ───────────────────────────────────────────── */
        @keyframes elizon-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes elizon-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.6);
            opacity: 0.05;
          }
        }

        /* ─────────────────────────────────────────────
           CTA pill
        ───────────────────────────────────────────── */
        .elizon-cta {
          position: absolute;
          right: 48px;
          top: 50%;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 26px;
          padding: 0 14px;
          background: ${FRESH};
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 999px;
          z-index: 4;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 2px 10px rgba(20, 184, 166, 0.35);
        }

        .elizon-cta:hover {
          transform: translateY(-50%) translateX(2px);
          background: #0D9488;
          box-shadow: 0 4px 16px rgba(20, 184, 166, 0.5);
        }

        .elizon-cta svg {
          transition: transform 0.2s ease;
        }

        .elizon-cta:hover svg {
          transform: translateX(2px);
        }

        /* ─────────────────────────────────────────────
           Close button
        ───────────────────────────────────────────── */
        .elizon-close {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          background: transparent;
          border: none;
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          line-height: 1;
          cursor: pointer;
          z-index: 4;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .elizon-close:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.18);
        }

        /* ─────────────────────────────────────────────
           Responsive
        ───────────────────────────────────────────── */
        @media (max-width: 768px) {
          .elizon-bar {
            height: 38px;
          }
          .elizon-item {
            font-size: 11.5px;
            letter-spacing: 0.14em;
            gap: 10px;
            padding-right: 42px;
          }
          .elizon-cta {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .elizon-track {
            animation: none;
          }
          .elizon-sep::before {
            animation: none;
          }
        }
      `}</style>

      <div className="elizon-bar" role="region" aria-label="Announcements">
        {/* Bottom mint-teal accent line */}
        <div className="elizon-accent" aria-hidden="true" />

        <div className="elizon-track">
          {loopItems.map((text, i) => {
            const isDuplicate = i >= announcements.length;

            return (
              <span
                className="elizon-item"
                key={i}
                aria-hidden={isDuplicate ? 'true' : undefined}
              >
                {/* Droplet separator */}
                <span className="elizon-sep" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.5S6 10.2 6 15a6 6 0 1 0 12 0c0-4.8-6-12.5-6-12.5z" />
                  </svg>
                </span>
                <span>{text}</span>
              </span>
            );
          })}
        </div>

        {/* Optional CTA — uncomment to enable */}
        {/* <Link href="/all-products" className="elizon-cta">
          Shop Now
          <HiArrowRight size={12} />
        </Link> */}

        {/* Optional close button — uncomment to enable */}
        {/* <button
          className="elizon-close"
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
        >
          ✕
        </button> */}
      </div>
    </>
  );
}