import nodemailer from "nodemailer";

// ═══════════════════════════════════════════════════════════
//   TRANSPORTER — cached for performance
// ═══════════════════════════════════════════════════════════
let cachedTransporter = null;

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP credentials are not configured");
  }

  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
    // Small connection pool — helps with rapid successive sends
    pool: true,
    maxConnections: 1,
    maxMessages: 10,
  });

  return cachedTransporter;
}

// ═══════════════════════════════════════════════════════════
//   SEND FORM EMAIL
// ═══════════════════════════════════════════════════════════
export async function sendFormEmail({ subject, html, replyTo, cc }) {
  const to = process.env.EMAIL_TO || process.env.SMTP_USER;
  const from =
    process.env.EMAIL_FROM || `"Elizon Website" <${process.env.SMTP_USER}>`;

  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from,
    to,
    cc: cc || undefined,
    replyTo,
    subject,
    html,
  });

  return info;
}

// ═══════════════════════════════════════════════════════════
//   HTML ESCAPE
// ═══════════════════════════════════════════════════════════
export function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}