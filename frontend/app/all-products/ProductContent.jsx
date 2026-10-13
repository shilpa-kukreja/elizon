"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HiArrowRight, HiOutlineSparkles, HiOutlineFilter } from "react-icons/hi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import {
  categories,
  defaultCategoryId,
  isValidCategoryId,
  getProductsForCategory,
  getProductImageSrc,
} from "../lib/products";

// ─── Palette ────────────────────────────────────────────────
const BRAND = "#0A367D";
const FRESH = "#0292FD";

function resolveCategoryId(urlCategory) {
  if (urlCategory && isValidCategoryId(urlCategory)) return urlCategory;
  return defaultCategoryId;
}

// ─── Foam bubbles ───────────────────────────────────────────
function Bubbles() {
  const dots = [
    { top: "8%", left: "4%", size: 60 },
    { top: "75%", left: "92%", size: 44 },
    { top: "50%", left: "48%", size: 24 },
    { top: "20%", left: "88%", size: 32 },
    { top: "82%", left: "10%", size: 26 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle at 30% 30%, rgba(2,146,253,0.16), rgba(2,146,253,0.02))`,
            border: `1px solid rgba(2,146,253,0.24)`,
          }}
        />
      ))}
    </div>
  );
}

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(() =>
    resolveCategoryId(categoryFromUrl),
  );

  const activeProducts = getProductsForCategory(activeCategory);

  useEffect(() => {
    setActiveCategory(resolveCategoryId(categoryFromUrl));
  }, [categoryFromUrl]);

  const activeCategoryName =
    categories.find((c) => c.id === activeCategory)?.name || "Products";

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/category/banner.png"
          alt="Elizon cleaning products"
          className="w-full object-cover object-center block"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, rgba(10,54,125,0.08) 0%, rgba(2,146,253,0.08) 100%)`,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════
          PRODUCTS
      ═══════════════════════════════════════════════════════ */}
      <section className="relative py-8 lg:py-12 bg-gray-50 overflow-hidden">
        {/* Ambient glows */}
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: `${FRESH}14` }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: `${BRAND}0d` }}
        />

        <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 z-10">
          {/* ─── Header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-gray-900 leading-tight tracking-tight">
              Powerful cleaning,{" "}
              <span style={{ color: FRESH }}>beautifully done</span>.
            </h1>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Detergents, soaps, toilet cleaners, and household essentials —
              thoughtfully formulated for real homes and everyday routines.
            </p>
          </motion.div>

          {/* ─── Category tabs ─── */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="relative px-5 py-2.5 rounded-full text-[11px] md:text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-500 border"
                  style={
                    isActive
                      ? {
                          background: FRESH,
                          borderColor: FRESH,
                          color: "#ffffff",
                          boxShadow: `0 8px 24px ${FRESH}40`,
                        }
                      : {
                          background: "#ffffff",
                          borderColor: "#e5e7eb",
                          color: "#4b5563",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = `${FRESH}99`;
                      e.currentTarget.style.color = FRESH;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.color = "#4b5563";
                    }
                  }}
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* ─── Active category indicator ─── */}
          <div className="flex items-center justify-center gap-2 text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-8">
            <HiOutlineFilter className="text-sm" style={{ color: FRESH }} />
            Showing:{" "}
            <span className="font-semibold text-gray-700">
              {activeCategoryName}
            </span>
            <span className="text-gray-300">·</span>
            {activeProducts.length}{" "}
            {activeProducts.length === 1 ? "product" : "products"}
          </div>

          {/* ─── Products grid ─── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
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
                      className="relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0292FD]/30 hover:shadow-[0_20px_50px_rgba(2,146,253,0.12)] hover:-translate-y-2 transition-all duration-500 h-full"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <img
                          src={getProductImageSrc(product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Category chip */}
                        <span
                          className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm"
                          style={{ color: FRESH }}
                        >
                          {activeCategoryName}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5 lg:p-6">
                        {/* Product code */}
                        {product.model && (
                          <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-gray-400 mb-2">
                            {product.model}
                          </p>
                        )}

                        {/* Divider */}
                        <div
                          className="w-10 group-hover:w-16 h-[2px] rounded-full mb-4 transition-all duration-500"
                          style={{ background: FRESH }}
                        />

                        {/* Title */}
                        <h3
                          className="text-[15px] lg:text-[17px] font-semibold text-gray-900 leading-snug line-clamp-2 mb-4 transition-colors duration-300"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = FRESH;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "";
                          }}
                        >
                          {product.name}
                        </h3>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* View Product button */}
                        <span
                          className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border px-5 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-900 transition-colors duration-300 group-hover:text-white"
                          style={{ borderColor: `${FRESH}66` }}
                        >
                          <span
                            className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                            style={{ background: FRESH }}
                          />
                          <span className="relative z-10 inline-flex items-center gap-1.5">
                            View Product
                            <HiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Empty state */}
              {activeProducts.length === 0 && (
                <div className="text-center py-20 max-w-md mx-auto">
                  <span
                    className="inline-flex w-14 h-14 items-center justify-center rounded-full mb-5"
                    style={{ background: `${FRESH}15`, color: FRESH }}
                  >
                    <HiOutlineFilter className="text-2xl" />
                  </span>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    No products in this category yet
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Try browsing a different category.
                  </p>
                  <Link
                    href="/all-products"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-colors duration-300"
                    style={{ background: FRESH }}
                  >
                    View all products
                  </Link>
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