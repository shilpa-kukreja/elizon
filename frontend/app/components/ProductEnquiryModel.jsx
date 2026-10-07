"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  HiOutlineX,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineSparkles,
} from "react-icons/hi";

// ─── Palette ────────────────────────────────────────────────
const FRESH = "#14B8A6";
const FRESH_DARK = "#0D9488";

export default function ProductEnquiryModal({
  isOpen,
  onClose,
  productName = "",
}) {
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [focused, setFocused] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        productName: productName || "",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmitMessage("");
      setStatus(null);
    }
  }, [isOpen, productName]);

  // Close on Escape + lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus(null);

      const response = await axios.post("/api/product-enquiry", {
        ...formData,
        formSource: "product-enquiry",
      });

      if (response.data.success) {
        setSubmitMessage("Enquiry submitted successfully!");
        setStatus("success");

        setTimeout(() => {
          onClose();
          setSubmitMessage("");
          setStatus(null);
        }, 1800);
      }
    } catch (error) {
      console.log(error);
      setSubmitMessage("Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Shared input class with focus state
  const inputClass = (name) =>
    `w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 ${
      focused === name
        ? "border-[#14B8A6] shadow-[0_0_0_4px_rgba(20,184,166,0.10)]"
        : "border-gray-200 hover:border-gray-300"
    }`;

  const labelClass =
    "block text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-500 mb-2";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Product enquiry form"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-lg rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.25)] max-h-[92vh] overflow-hidden flex flex-col"
          >
            {/* ═══════════════════════════════════════════════════
                HEADER
            ═══════════════════════════════════════════════════ */}
            <div className="relative px-6 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-gray-100">
              {/* Ambient mint glow */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-60"
                style={{ background: `${FRESH}25` }}
              />

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close enquiry form"
                className="absolute top-5 right-5 w-9 h-9 grid place-items-center rounded-full text-gray-400 hover:text-gray-900 transition-colors duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${FRESH}15`;
                  e.currentTarget.style.color = FRESH;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                <HiOutlineX className="text-lg" />
              </button>

              {/* Eyebrow */}
              <span
                className="relative inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] uppercase mb-3"
                style={{ color: FRESH }}
              >
                <span className="w-5 h-px" style={{ background: FRESH }} />
                Product Enquiry
              </span>

              {/* Heading */}
              <h2 className="relative text-xl sm:text-2xl font-semibold text-gray-900 leading-tight mb-2">
                Let&apos;s get you a quote
              </h2>

              <p className="relative text-sm text-gray-500 leading-relaxed">
                Share your details below and our team will reach out within 24
                hours.
              </p>
            </div>

            {/* ═══════════════════════════════════════════════════
                BODY (scrollable)
            ═══════════════════════════════════════════════════ */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">

              {/* Success / Error banner */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm"
                  style={{
                    background:
                      status === "success" ? `${FRESH}10` : "rgba(239,68,68,0.08)",
                    borderColor:
                      status === "success" ? `${FRESH}40` : "rgba(239,68,68,0.3)",
                    color: "#111827",
                  }}
                >
                  {status === "success" ? (
                    <HiOutlineCheckCircle
                      className="text-lg shrink-0"
                      style={{ color: FRESH }}
                    />
                  ) : (
                    <HiOutlineExclamationCircle
                      className="text-lg shrink-0"
                      style={{ color: "#dc2626" }}
                    />
                  )}
                  <span>{submitMessage}</span>
                </motion.div>
              )}

<form
  id="product-enquiry-form"
  onSubmit={handleSubmit}
  className="space-y-5"
>
                {/* Product name (read-only) */}
                <div>
                  <label className={labelClass}>Product</label>
                  <div
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
                  >
                    {/* <HiOutlineSparkles
                      className="text-base shrink-0"
                      style={{ color: FRESH }}
                    /> */}
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {formData.productName || "—"}
                    </span>
                  </div>
                  <input type="hidden" value={formData.productName} readOnly />
                </div>

                {/* Name */}
                <div>
                  <label className={labelClass}>
                    Your Name <span style={{ color: FRESH }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter your full name"
                    className={inputClass("name")}
                    required
                  />
                </div>

                {/* Email + Phone grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Email <span style={{ color: FRESH }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="you@email.com"
                      className={inputClass("email")}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Phone <span style={{ color: FRESH }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      placeholder="+91 98765 xxxxx"
                      className={inputClass("phone")}
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your requirement, quantity, or any questions you have..."
                    className={`${inputClass("message")} resize-none`}
                  />
                </div>
              </form>
            </div>

            {/* ═══════════════════════════════════════════════════
                FOOTER — Submit button
            ═══════════════════════════════════════════════════ */}
            <div className="px-6 sm:px-8 py-5 border-t border-gray-100 bg-gray-50/60">
          <button
  type="submit"
  form="product-enquiry-form"
  disabled={loading}
  className="group relative w-full inline-flex items-center justify-center overflow-hidden py-3.5 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
  style={{
    background: FRESH,
    boxShadow: `0 12px 32px ${FRESH}40`,
  }}
  onMouseEnter={(e) => {
    if (!loading) e.currentTarget.style.background = FRESH_DARK;
  }}
  onMouseLeave={(e) => {
    if (!loading) e.currentTarget.style.background = FRESH;
  }}
>
  <span
    className="absolute top-0 left-[-120%] h-full w-[40%] animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
    aria-hidden="true"
  />
  <span className="relative z-10 inline-flex items-center gap-2">
    {loading ? (
      <>
        <span
          className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
          aria-hidden="true"
        />
        Submitting...
      </>
    ) : (
      "Submit Enquiry"
    )}
  </span>
</button>

              <p className="text-center text-[11px] text-gray-400 mt-3">
                We&apos;ll never share your information.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}