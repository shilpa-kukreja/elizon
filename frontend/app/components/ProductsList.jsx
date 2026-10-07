"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi";

import {
  categories,
  defaultCategoryId,
  getProductsForCategory,
  getProductImageSrc,
} from "../lib/products";

// ─── Palette ────────────────────────────────────────────────
const BRAND = "#0A367D";
const FRESH = "#14B8A6";

// ─── Bubble decoration ──────────────────────────────────────
function Bubbles() {
  const dots = [
    { top: "8%", left: "4%", size: 60 },
    { top: "75%", left: "92%", size: 44 },
    { top: "50%", left: "48%", size: 24 },
    { top: "20%", left: "88%", size: 32 },
    { top: "82%", left: "10%", size: 26 },
  ];

  return (
    // <div className="absolute inset-0 pointer-events-none overflow-hidden">
    //   {dots.map((p, i) => (
    //     <span
    //       key={i}
    //       className="absolute rounded-full"
    //       style={{
    //         top: p.top,
    //         left: p.left,
    //         width: p.size,
    //         height: p.size,
    //         background: `radial-gradient(circle at 30% 30%, rgba(20,184,166,0.18), rgba(20,184,166,0.02))`,
    //         border: `1px solid rgba(20,184,166,0.28)`,
    //       }}
    //     />
    //   ))}
    // </div>
    <>
    </>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(defaultCategoryId);
  const activeProducts = getProductsForCategory(activeCategory);

  const activeCategoryName =
    categories.find((c) => c.id === activeCategory)?.name || "Products";

  return (
    <section className="relative py-8 lg:py-12 bg-gray-50 overflow-hidden">
      <Bubbles />

      {/* Ambient glows */}
      {/* <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${FRESH}14` }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${BRAND}0d` }}
      /> */}

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10 z-10">
        {/* ═══════════════════════════════════════════════════════
            HEADER
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          {/* <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: FRESH }}
          >
            <span className="w-6 h-px" style={{ background: FRESH }} />
            Our Range
          </span> */}

          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semibold text-gray-900 leading-tight tracking-tight">
            Everyday cleaning,{" "}
            <span style={{ color: FRESH }}>beautifully done</span>.
          </h2>

          <p className="text-gray-600 text-base lg:text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
            Detergents, soaps, toilet cleaners, and household essentials —
            thoughtfully formulated for real homes and real routines.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            CATEGORY TABS
        ═══════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 lg:mb-14">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-5 py-2.5 rounded-full text-[11px] md:text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-500 border ${
                  isActive
                    ? "text-white border-transparent"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#14B8A6]/60 hover:text-[#14B8A6]"
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
                {category.name}
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════
            PRODUCTS GRID
        ═══════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
              {activeProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="block group h-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.06,
                    }}
                    className="relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#14B8A6]/30 hover:shadow-[0_20px_50px_rgba(20,184,166,0.12)] hover:-translate-y-2 transition-all duration-500 h-full"
                  >
                    {/* Image */}
                    <div className="relative  overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={getProductImageSrc(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Category chip */}
                      <span
                        className="absolute top-3 left-3 md:top-4 md:left-4 text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-sm"
                        style={{ color: FRESH }}
                      >
                        {activeCategoryName}
                      </span>

                      {/* Fresh badge on hover */}
                      {/* <span
                        className="hidden md:flex absolute top-4 right-4 w-9 h-9 items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-lg"
                        style={{
                          background: FRESH,
                          boxShadow: `0 8px 20px ${FRESH}50`,
                        }}
                        aria-hidden="true"
                      >
                        <HiOutlineSparkles className="text-sm" />
                      </span> */}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-3.5 md:p-5 lg:p-6">
                      {/* Model / code — small detail */}
                      {product.model && (
                        <p className="hidden md:block text-[10px] font-medium tracking-[0.14em] uppercase text-gray-400 mb-2">
                          {product.model}
                        </p>
                      )}

                      {/* Mint-teal divider that grows on hover */}
                      <div
                        className="w-8 md:w-10 group-hover:w-14 md:group-hover:w-16 h-[2px] rounded-full mb-3 md:mb-4 transition-all duration-500"
                        style={{ background: FRESH }}
                      />

                      {/* Title */}
                      <h3 className="text-[13px] md:text-[15px] lg:text-[16px] font-semibold text-gray-900 leading-snug line-clamp-2 mb-3 md:mb-4 group-hover:text-[#14B8A6] transition-colors duration-300">
                        {product.name}
                      </h3>

                      {/* Spacer to push button to bottom */}
                      <div className="flex-1" />

                      {/* View Product button — fresh-fill on hover */}
                      <span
                        className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border px-4 md:px-5 py-2 md:py-2.5 text-[10px] md:text-[11px] font-semibold tracking-[0.14em] md:tracking-[0.16em] uppercase text-gray-900 transition-colors duration-300 group-hover:text-white"
                        style={{ borderColor: `${FRESH}66` }}
                      >
                        {/* Fill-up on hover */}
                        <span
                          className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                          style={{ background: FRESH }}
                        />

                        {/* Label */}
                        <span className="text-[9px] sm:text-[13px] relative z-10 inline-flex items-center gap-1.5">
                          View Product
                          <HiArrowRight className="text-[10px] sm:text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Empty state */}
            {activeProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500">
                  No products in this category yet.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════
            VIEW ALL CTA
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/all-products"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-gray-200 hover:border-[#14B8A6]/50 hover:bg-[#14B8A6]/[0.04] transition-all duration-300"
          >
            <span className="text-sm font-semibold text-gray-900 group-hover:text-[#14B8A6] transition-colors">
              Browse the full range
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