"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineSparkles,
  HiArrowRight,
} from "react-icons/hi";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductEnquiryModal from "../../components/ProductEnquiryModel";
import ProductSpecifications from "../../components/ProductSpecifications";
import AnnouncementBar from "../../components/AnnouncementBar";

import {
  getProductBySlug,
  getProductImageSrc,
  getWhatsAppUrl,
  getRelatedProducts,
  getCategoryName,
} from "../../lib/products";

// ─── Palette ────────────────────────────────────────────────
const BRAND = "#0A367D";
const FRESH = "#14B8A6";
const FRESH_DARK = "#0D9488";

// ─── Trust row data ─────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: HiOutlineTruck, label: "Eco-Friendly" },
  { icon: HiOutlineRefresh, label: "Made in India" },
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
            style={{ borderColor: `${FRESH} transparent transparent transparent` }}
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
            The product you're looking for does not exist or has been moved.
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
  const relatedProducts = getRelatedProducts(product.slug);
  const categoryName = getCategoryName(product.category);

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <section className="bg-gray-50 min-h-screen pt-6 lg:pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          {/* ============================================================
              BREADCRUMB
          ============================================================ */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-400 mb-6"
          >
            <Link
              href="/"
              className="hover:text-gray-700 transition-colors"
            >
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

          {/* ============================================================
              PRODUCT DETAIL GRID
          ============================================================ */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 lg:items-stretch">

            {/* ─── LEFT: Product image ─── */}
            <div className="relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.04)] aspect-[4/4] sm:aspect-[3/2] lg:aspect-auto lg:min-h-0 lg:max-h-[min(85vh,680px)] lg:h-full">
              <div className="relative h-full w-full">
                <img
                  src={getProductImageSrc(product.image)}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Category chip */}
                <span
                  className="absolute top-5 left-5 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm"
                  style={{ color: FRESH }}
                >
                  <HiOutlineSparkles className="text-xs" />
                  {categoryName}
                </span>
              </div>
            </div>

            {/* ─── RIGHT: Product information ─── */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col lg:max-h-[min(85vh,680px)] lg:h-full lg:overflow-hidden">

              {/* Product header */}
              <div className="shrink-0 px-5 sm:px-7 pt-6 sm:pt-8 pb-5 border-b border-gray-100">
                {/* Eyebrow */}
                <span
                  className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] uppercase mb-3"
                  style={{ color: FRESH }}
                >
                  <span className="w-5 h-px" style={{ background: FRESH }} />
                  {categoryName}
                </span>

                {/* Product name */}
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {/* Short description */}
                {product.shortDescription ? (
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">
                    {product.shortDescription}
                  </p>
                ) : product.specs ? (
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">
                    {product.specs}
                  </p>
                ) : null}

                {/* Mint-teal divider */}
                <div
                  className="w-12 h-[3px] rounded-full mt-4"
                  style={{ background: FRESH }}
                />
              </div>

              {/* Scrollable specs */}
              <div
                className="px-5 sm:px-7 py-5 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:scrollbar-thin"
                aria-label="Product specifications"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: FRESH }}
                  />
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500">
                    Product Details
                  </p>
                </div>

                <ProductSpecifications items={product.specificationList} />
              </div>

              {/* Action buttons + trust */}
              <div className="shrink-0 px-5 sm:px-7 py-4 sm:py-5 border-t border-gray-100 bg-white">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">

                  {/* Enquiry button */}
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

                  {/* WhatsApp */}
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

                {/* Trust row */}
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

          {/* ============================================================
              RELATED PRODUCTS
          ============================================================ */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">

              {/* Section header */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
                <div>
                  <span
                    className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-3"
                    style={{ color: FRESH }}
                  >
                    <span className="w-6 h-px" style={{ background: FRESH }} />
                    You may also like
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                    More from our{" "}
                    <span style={{ color: FRESH }}>
                      {categoryName}
                    </span>{' '}
                    range
                  </h2>
                </div>

                <Link
                  href={`/all-products?category=${product.category}`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 self-start lg:self-auto"
                  style={{ color: FRESH }}
                >
                  View all
                  <span
                    className="inline-flex w-7 h-7 items-center justify-center rounded-full text-white transition-all duration-500 group-hover:translate-x-0.5"
                    style={{ background: FRESH }}
                  >
                    <HiArrowRight className="text-sm" />
                  </span>
                </Link>
              </div>

              {/* Related products grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {relatedProducts.map((item, i) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    className="block group h-full"
                  >
                    <article className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#14B8A6]/30 hover:shadow-[0_20px_50px_rgba(20,184,166,0.12)] hover:-translate-y-2 transition-all duration-500 h-full">

                      {/* Image */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <img
                          src={getProductImageSrc(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Sparkle on hover */}
                        {/* <span
                          className="hidden md:flex absolute top-3 right-3 w-8 h-8 items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-lg"
                          style={{
                            background: FRESH,
                            boxShadow: `0 6px 16px ${FRESH}50`,
                          }}
                          aria-hidden="true"
                        >
                          <HiOutlineSparkles className="text-xs" />
                        </span> */}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-4 lg:p-5">
                        {/* Divider */}
                        <div
                          className="w-8 group-hover:w-14 h-[2px] rounded-full mb-3 transition-all duration-500"
                          style={{ background: FRESH }}
                        />

                        {/* Product name */}
                        <h3 className="text-[14px] lg:text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 mb-3 group-hover:text-[#14B8A6] transition-colors">
                          {item.name}
                        </h3>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* CTA */}
                        <span
                          className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border px-4 py-2 text-[10px] lg:text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-900 transition-colors duration-300 group-hover:text-white"
                          style={{ borderColor: `${FRESH}66` }}
                        >
                          <span
                            className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                            style={{ background: FRESH }}
                          />
                          <span className="relative z-10 inline-flex items-center gap-1.5">
                            View
                            <HiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          PRODUCT ENQUIRY MODAL
      ============================================================ */}
      <ProductEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
      />

      <Footer />
    </>
  );
}