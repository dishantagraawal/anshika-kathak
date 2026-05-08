import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";

/**
 * Inbox that receives every contact notification (never the visitor).
 * Must match your Resend-account email while using onboarding@resend.dev.
 * Override with CONTACT_FORM_INBOX or CONTACT_MAIL_TO if needed.
 */
const CONTACT_FORM_INBOX_DEFAULT = "bookings@anshikakathak.com";

let cachedClient = null;

async function getDb() {
  if (cachedClient)
    return cachedClient.db(process.env.DB_NAME || "anshika_agrawal");
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  cachedClient = client;
  return client.db(process.env.DB_NAME || "anshika_agrawal");
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sends one email to the site owner only. Visitor `email` is content only (not a Resend `to`).
 * Resend test mode: use onboarding@resend.dev and send `to` only to your Resend login address.
 * Env: RESEND_API_KEY (required). CONTACT_FORM_INBOX = owner inbox. CONTACT_MAIL_FROM optional.
 */
async function sendContactEmail(doc) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const err = new Error(
      "Email is not configured on the server. Set RESEND_API_KEY (create a key at resend.com)."
    );
    err.status = 503;
    throw err;
  }

  const from =
    process.env.CONTACT_MAIL_FROM || "Anshika Kathak <onboarding@resend.dev>";
  const ownerInbox = (
    process.env.CONTACT_FORM_INBOX ||
    process.env.CONTACT_MAIL_TO ||
    CONTACT_FORM_INBOX_DEFAULT
  )
    .trim()
    .toLowerCase();

  const html = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
<h2 style="margin:0 0 12px">New website contact</h2>
<p style="margin:0 0 12px;font-size:13px;color:#555">The address below is what they typed on the form (for your reference). This email was sent only to you.</p>
<p style="margin:8px 0"><strong>Name:</strong> ${escapeHtml(doc.name)}</p>
<p style="margin:8px 0"><strong>Email (from form):</strong> <a href="mailto:${escapeHtml(doc.email)}">${escapeHtml(doc.email)}</a></p>
<p style="margin:8px 0"><strong>Phone:</strong> ${doc.phone ? escapeHtml(doc.phone) : "—"}</p>
<p style="margin:16px 0 4px"><strong>Message</strong></p>
<p style="margin:0;white-space:pre-wrap;border-left:3px solid #c9a227;padding:8px 0 8px 14px;background:#faf8f5">${escapeHtml(doc.message)}</p>
</body></html>`;

  const text = [
    "New website contact (anshikakathak.com)",
    "The Email line is what they entered on the form (information only).",
    "",
    `Name: ${doc.name}`,
    `Email (from form): ${doc.email}`,
    `Phone: ${doc.phone || "—"}`,
    "",
    "Message:",
    doc.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [ownerInbox],
      subject: `Website contact: ${doc.name}`,
      html,
      text,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      (typeof data.message === "string" && data.message) ||
      (data.error && typeof data.error === "string" && data.error) ||
      `Email could not be sent (${res.status})`;
    const err = new Error(msg);
    err.status = res.status >= 400 && res.status < 600 ? res.status : 500;
    throw err;
  }
  return data;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const path = (params?.path || []).join("/");
  try {
    if (path === "" || path === "health") {
      return NextResponse.json(
        { status: "ok", message: "Anshika Agrawal API" },
        { headers: corsHeaders() }
      );
    }
    if (path === "messages") {
      const db = await getDb();
      const items = await db
        .collection("messages")
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();
      return NextResponse.json({ items }, { headers: corsHeaders() });
    }
    return NextResponse.json(
      { error: "Not Found" },
      { status: 404, headers: corsHeaders() }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join("/");
  try {
    const body = await request.json().catch(() => ({}));
    if (path === "contact") {
      const { name, email, phone, message } = body || {};
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: "Name, email and message are required" },
          { status: 400, headers: corsHeaders() }
        );
      }
      const doc = {
        id: uuidv4(),
        name: String(name).trim(),
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : "",
        message: String(message).trim(),
        createdAt: new Date().toISOString(),
      };

      try {
        await sendContactEmail(doc);
      } catch (emailErr) {
        const status = emailErr.status || 500;
        return NextResponse.json(
          { error: emailErr.message || "Failed to send message" },
          { status, headers: corsHeaders() }
        );
      }

      if (process.env.MONGO_URL) {
        try {
          const db = await getDb();
          await db.collection("messages").insertOne(doc);
        } catch (mongoErr) {
          console.error("Contact form MongoDB save failed:", mongoErr);
        }
      }

      return NextResponse.json(
        { ok: true, id: doc.id },
        { headers: corsHeaders() }
      );
    }
    return NextResponse.json(
      { error: "Not Found" },
      { status: 404, headers: corsHeaders() }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}
