"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp, FaLeaf, FaMapMarkerAlt } from "react-icons/fa";
import {
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiArrowRight,
} from "react-icons/hi";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductEnquiryModal from "../../components/ProductEnquiryModel";
import AnnouncementBar from "../../components/AnnouncementBar";

import {
  getProductBySlug,
  getProductImageSrc,
  getWhatsAppUrl,
  getCategoryName,
  categories,
  getProductsForCategory,
} from "../../lib/products";

// ─── Palette ────────────────────────────────────────────────
const BRAND = "#0A367D";
const FRESH = "#0292FD";
const FRESH_DARK = "#0273C9";

// ─── Trust row data ─────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: FaLeaf, label: "Eco-Friendly" },
  { icon: FaMapMarkerAlt, label: "Made in India" },
  { icon: HiOutlineShieldCheck, label: "Quality Assured" },
];

export default function ProductDetailPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (slug) {
      setProduct(getProductBySlug(slug));
    }

    setLoading(false);
  }, [slug]);

  /* ============================================================
      LOADING STATE
  ============================================================ */
  if (loading) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />

        <div className="min-h-screen flex items-center justify-center pt-28 bg-gray-50">
          <div
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: `${FRESH} transparent transparent transparent`,
            }}
          />
        </div>

        <Footer />
      </>
    );
  }

  /* ============================================================
      PRODUCT NOT FOUND
  ============================================================ */
  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />

        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-28 bg-gray-50">
          <span
            className="inline-flex w-16 h-16 items-center justify-center rounded-full mb-5"
            style={{ background: `${FRESH}15`, color: FRESH }}
          >
            <HiOutlineSparkles className="text-2xl" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
            Product Not Found
          </h1>
          <p className="text-sm text-gray-500 mb-6 max-w-sm text-center">
            The product you&apos;re looking for does not exist or has been
            moved.
          </p>

          <Link
            href="/all-products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: FRESH,
              boxShadow: `0 12px 32px ${FRESH}40`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = FRESH_DARK;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = FRESH;
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  const whatsappUrl = getWhatsAppUrl(product);
  const categoryName = getCategoryName(product.category);

  // Other categories (excluding current), each with its product
  const otherCategories = categories
    .filter((c) => c.id !== product.category)
    .map((c) => ({
      ...c,
      product: getProductsForCategory(c.id)[0] || null,
    }));

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          BREADCRUMB + PRODUCT HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 pt-6 lg:pt-10 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-400 mb-6"
          >
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" style={{ color: FRESH }} />
            <Link
              href="/all-products"
              className="hover:text-gray-700 transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="w-3 h-3" style={{ color: FRESH }} />
            <Link
              href={`/all-products?category=${product.category}`}
              className="hover:text-gray-700 transition-colors"
            >
              {categoryName}
            </Link>
            <ChevronRight className="w-3 h-3" style={{ color: FRESH }} />
            <span className="text-gray-700 normal-case tracking-normal truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>

          {/* ═══════════════════════════════════════════════════════
              SECTION 1 — Image + Product Info
          ═══════════════════════════════════════════════════════ */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            {/* LEFT: Image */}
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.04)] aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-full">
                <img
                  src={getProductImageSrc(product.image)}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            </div>

            {/* RIGHT: Info */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col lg:max-h-[min(85vh,680px)] lg:h-full lg:overflow-hidden">
              {/* Header */}
              <div className="shrink-0 px-6 sm:px-8 pt-7 sm:pt-8 pb-5 border-b border-gray-100">
                <span
                  className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] uppercase mb-3"
                  style={{ color: FRESH }}
                >
                  <span className="w-5 h-px" style={{ background: FRESH }} />
                  {categoryName}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight tracking-tight">
                  {product.name}
                </h1>

                {product.shortDescription && (
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">
                    {product.shortDescription}
                  </p>
                )}

                <div
                  className="w-12 h-[3px] rounded-full mt-4"
                  style={{ background: FRESH }}
                />
              </div>

              {/* Description */}
              <div
                className="px-6 sm:px-8 py-6 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain"
                aria-label="Product description"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: FRESH }}
                  />
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500">
                    About This Product
                  </p>
                </div>

                <p className="text-[15px] lg:text-base text-gray-600 leading-[1.85]">
                  {product.longDescription ||
                    product.shortDescription ||
                    "Product details coming soon."}
                </p>
              </div>

              {/* Buttons + trust */}
              <div className="shrink-0 px-6 sm:px-8 py-5 border-t border-gray-100 bg-white">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="group relative overflow-hidden py-3.5 rounded-full text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: FRESH,
                      boxShadow: `0 8px 24px ${FRESH}40`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = FRESH_DARK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = FRESH;
                    }}
                  >
                    <span
                      className="absolute top-0 left-[-120%] h-full w-[40%] animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                      aria-hidden="true"
                    />
                    <span className="relative z-10">Enquire Now</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 rounded-full border-2 text-sm sm:text-base font-semibold transition-colors duration-300 flex items-center justify-center gap-2 hover:bg-[#25D366]/10"
                    style={{ borderColor: "#25D366", color: "#128C7E" }}
                  >
                    <FaWhatsapp className="w-5 h-5 shrink-0" />
                    WhatsApp
                  </a>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                  {TRUST_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-1.5 text-[11px] text-gray-500"
                      >
                        <Icon className="text-sm" style={{ color: FRESH }} />
                        {item.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — Key Benefits (full-width)
      ═══════════════════════════════════════════════════════ */}
      {product.benefits?.length > 0 && (
        <section className="bg-white py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            {/* Section header */}
            <div className="max-w-2xl mb-10">
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-3"
                style={{ color: FRESH }}
              >
                <span className="w-6 h-px" style={{ background: FRESH }} />
                Why You&apos;ll Love It
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight tracking-tight">
                Key <span style={{ color: FRESH }}>benefits</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">
                A few things that make {product.name} stand out in everyday
                use.
              </p>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {product.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-500"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 50px rgba(2,146,253,0.10)`;
                    e.currentTarget.style.borderColor = `${FRESH}4d`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  {/* Icon badge */}
                  <span
                    className="inline-flex w-12 h-12 items-center justify-center rounded-xl mb-5 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: `${FRESH}15`, color: FRESH }}
                  >
                    <HiOutlineCheckCircle className="text-2xl" />
                  </span>

                  {/* Number */}
                  <span
                    className="absolute top-5 right-5 text-[10px] font-semibold tracking-[0.18em]"
                    style={{ color: `${FRESH}80` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — Other Categories (full-width)
      ═══════════════════════════════════════════════════════ */}
      {otherCategories.length > 0 && (
        <section className="bg-gray-50 py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            {/* Section header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <span
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-3"
                  style={{ color: FRESH }}
                >
                  <span className="w-6 h-px" style={{ background: FRESH }} />
                  Explore More
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight tracking-tight">
                  Other <span style={{ color: FRESH }}>Elizon ranges</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">
                  Discover the rest of our everyday cleaning collection.
                </p>
              </div>

              <Link
                href="/all-products"
                className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 self-start lg:self-auto shrink-0"
                style={{ color: FRESH }}
              >
                View all products
                <span
                  className="inline-flex w-7 h-7 items-center justify-center rounded-full text-white transition-all duration-500 group-hover:translate-x-0.5"
                  style={{ background: FRESH }}
                >
                  <HiArrowRight className="text-sm" />
                </span>
              </Link>
            </div>

            {/* Other products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {otherCategories.map((cat) => {
                if (!cat.product) return null;

                return (
                  <Link
                    key={cat.id}
                    href={`/product/${cat.product.slug}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0292FD]/30 hover:shadow-[0_20px_50px_rgba(2,146,253,0.12)] hover:-translate-y-2 transition-all duration-500 h-full"
                  >
                    {/* Image */}
                    <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={getProductImageSrc(cat.product.image)}
                        alt={cat.product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Category chip */}
                      <span
                        className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-sm"
                        style={{ color: FRESH }}
                      >
                        {cat.name}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 lg:p-6">
                      {/* Divider */}
                      <div
                        className="w-10 group-hover:w-16 h-[2px] rounded-full mb-4 transition-all duration-500"
                        style={{ background: FRESH }}
                      />

                      {/* Title */}
                      <h3
                        className="text-base lg:text-lg font-semibold text-gray-900 leading-snug line-clamp-2 mb-3 transition-colors"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = FRESH;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "";
                        }}
                      >
                        {cat.product.name}
                      </h3>

                      {/* Short description */}
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                        {cat.product.shortDescription}
                      </p>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* CTA */}
                      <span
                        className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-900 transition-colors duration-300 group-hover:text-white"
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
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          PRODUCT ENQUIRY MODAL
      ═══════════════════════════════════════════════════════ */}
      <ProductEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
      />

      <Footer />
    </>
  );
}