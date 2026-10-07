import { NextResponse } from "next/server";
import { sendFormEmail, escapeHtml } from "../../lib/mailer";

// ═══════════════════════════════════════════════════════════
//   BRAND TOKENS
// ═══════════════════════════════════════════════════════════
const BRAND = "#0A367D";
const FRESH = "#14B8A6";

// ═══════════════════════════════════════════════════════════
//   VALIDATION
// ═══════════════════════════════════════════════════════════
function validate(payload) {
  const errors = [];

  const productName = (payload.productName || "").trim();
  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const phone = (payload.phone || "").trim();
  const message = (payload.message || "").trim();

  if (!productName) errors.push("Product name is missing.");
  if (name.length < 2) errors.push("Please enter your full name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("Please enter a valid email address.");
  if (!/^[+\d][\d\s\-()]{7,}$/.test(phone))
    errors.push("Please enter a valid phone number.");

  return {
    errors,
    data: { productName, name, email, phone, message },
  };
}

// ═══════════════════════════════════════════════════════════
//   HTML EMAIL TEMPLATE
// ═══════════════════════════════════════════════════════════
function buildHtmlEmail({ productName, name, email, phone, message }) {
  const safe = {
    productName: escapeHtml(productName),
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
  };

  const now = new Date();
  const submittedOn = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const firstName = safe.name.split(" ")[0];
  const hasMessage = message && message.trim().length > 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Product Enquiry — ${safe.productName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1a1a1a;-webkit-font-smoothing:antialiased;">

  <!-- Preheader -->
  <div style="display:none;font-size:1px;color:#f4f6f9;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    New enquiry from ${safe.name} about ${safe.productName}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Main container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(15,23,42,0.08);">

          <!-- ═════════════ HEADER ═════════════ -->
          <tr>
            <td style="background:linear-gradient(135deg,#082B66 0%,${BRAND} 55%,${FRESH} 170%);padding:36px 40px 32px;">

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="36" height="36" style="position:relative;">
                          <div style="width:32px;height:32px;border:2px solid ${FRESH};border-radius:8px;position:absolute;top:0;left:0;box-sizing:border-box;"></div>
                          <div style="width:32px;height:32px;border:2px solid rgba(20,184,166,0.45);border-radius:8px;transform:rotate(45deg);position:absolute;top:0;left:0;box-sizing:border-box;"></div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.65);font-weight:600;">
                      ${submittedOn}
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 8px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${FRESH};font-weight:700;">
                Product Enquiry
              </p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:600;letter-spacing:-0.01em;">
                A customer wants a quote
              </h1>
            </td>
          </tr>

          <!-- ═════════════ PRODUCT BLOCK ═════════════ -->
          <tr>
            <td style="padding:0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:-20px;">
                <tr>
                  <td style="background:#ffffff;border:1px solid #e5e7eb;border-left:4px solid ${FRESH};border-radius:12px;padding:20px 24px;box-shadow:0 8px 24px rgba(15,23,42,0.06);">
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#9ca3af;font-weight:700;">
                      Enquiry About
                    </p>
                    <p style="margin:0;font-size:18px;line-height:1.35;color:${BRAND};font-weight:700;">
                      ${safe.productName}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═════════════ BODY ═════════════ -->
          <tr>
            <td style="padding:28px 40px 8px;">

              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">
                A new product enquiry has been submitted through the Elizon website. Customer details are below.
              </p>

              <!-- Customer details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:120px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;font-weight:700;vertical-align:top;padding-top:2px;">Name</td>
                        <td style="font-size:15px;color:#111827;font-weight:600;">${safe.name}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:120px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;font-weight:700;vertical-align:top;padding-top:2px;">Email</td>
                        <td style="font-size:15px;color:#111827;">
                          <a href="mailto:${safe.email}" style="color:${BRAND};text-decoration:none;font-weight:600;">${safe.email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:120px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;font-weight:700;vertical-align:top;padding-top:2px;">Phone</td>
                        <td style="font-size:15px;color:#111827;">
                          <a href="tel:${safe.phone}" style="color:${BRAND};text-decoration:none;font-weight:600;">${safe.phone}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              ${
                hasMessage
                  ? `
              <p style="margin:28px 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#9ca3af;font-weight:700;">Customer Message</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border-left:3px solid ${FRESH};border-radius:0 12px 12px 0;">
                <tr>
                  <td style="padding:20px 24px;font-size:15px;line-height:1.7;color:#374151;">
                    ${safe.message}
                  </td>
                </tr>
              </table>`
                  : `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;background:#f8fafc;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;font-size:13px;color:#9ca3af;font-style:italic;">
                    No additional message was included with this enquiry.
                  </td>
                </tr>
              </table>`
              }

              <!-- Quick actions -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 8px;">
                <tr>
                  <td>
                    <a href="mailto:${safe.email}?subject=Re: Enquiry about ${encodeURIComponent(
                      productName
                    )}"
                       style="display:inline-block;background:${FRESH};color:#ffffff;font-size:14px;font-weight:600;padding:13px 26px;border-radius:999px;text-decoration:none;letter-spacing:0.02em;">
                      Reply to ${firstName}
                    </a>
                  </td>
                  <td width="12"></td>
                  <td>
                    <a href="tel:${safe.phone}"
                       style="display:inline-block;background:transparent;color:${BRAND};border:1.5px solid ${BRAND}33;font-size:14px;font-weight:600;padding:12px 24px;border-radius:999px;text-decoration:none;letter-spacing:0.02em;">
                      Call ${firstName}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ═════════════ FOOTER ═════════════ -->
          <tr>
            <td style="padding:0 40px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e5e7eb;padding-top:24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">
                      Elizon · Product Enquiry
                    </p>
                    <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
                      This email was generated automatically from the product page at
                      <a href="https://elizon.in" style="color:${BRAND};text-decoration:none;font-weight:600;">elizon.in</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Sub-footer -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin-top:16px;">
          <tr>
            <td align="center" style="padding:8px 24px;">
              <p style="margin:0;font-size:11px;color:#9ca3af;letter-spacing:0.06em;line-height:1.6;">
                © ${now.getFullYear()} Elizon · Made in India
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════
//   POST HANDLER
// ═══════════════════════════════════════════════════════════
export async function POST(request) {
  try {
    // 1) Parse body
    let payload;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    // 2) Validate
    const { errors, data } = validate(payload);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors[0], errors },
        { status: 400 }
      );
    }

    // 3) Build email
    const html = buildHtmlEmail(data);
    const subject = `Product Enquiry — ${data.productName} · ${data.name}`;
    const replyTo = `"${data.name}" <${data.email}>`;

    // 4) Send via shared helper
    const info = await sendFormEmail({
      subject,
      html,
      replyTo,
    });

    // 5) Respond
    return NextResponse.json(
      {
        success: true,
        message: "Enquiry sent successfully.",
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[product-enquiry-route] error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while sending your enquiry. Please try again or email us directly at info@elizon.in.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405 }
  );
}