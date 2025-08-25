import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import { CONTACT_LINKS } from "../models/contact";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let contactTemplate: Handlebars.TemplateDelegate | null = null;
let logoBytes: Buffer | null = null; // <- preload the logo

// Call this once at app startup
export async function initializeMailer() {
  // compile template
  const templatePath = path.resolve(process.cwd(), "server", "email-templates", "contact.html");
  const templateSource = await fs.readFile(templatePath, "utf-8");
  contactTemplate = Handlebars.compile(templateSource);

  // try local, repo-shipped asset first (works on localhost & Render)
  const candidates = [
    path.resolve(__dirname, "../assets/ETIVE_black_red_white_bg.png"),           // recommended location
    path.resolve(process.cwd(), "server", "assets", "ETIVE_black_red_white_bg.png"),
    path.resolve(process.cwd(), "attached_assets", "ETIVE_black_red_white_bg.png"), // fallback if you still keep it here locally
  ];
  for (const p of candidates) {
    try {
      logoBytes = await fs.readFile(p);
      console.log("[mailer] embedded logo loaded from:", p);
      break;
    } catch {}
  }
  if (!logoBytes) {
    console.warn("[mailer] embedded logo NOT found on disk; will try network fetch on send.");
  }
}

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  logoUrl?: string; // optional override (absolute URL)
};

function ensureEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required environment variable: ${name}`);
  return val;
}

export function formatContactEmail(data: ContactPayload) {
  if (!contactTemplate) throw new Error("Mailer not initialized – call initializeMailer() first");

  const html = contactTemplate({
    name: data.name,
    email: data.email,
    messageHtml: data.message.replace(/\n/g, "<br/>"),
    // Template must use: <img src="{{imgSrc}}" ...>
    imgSrc: "cid:logoBanner",
    businessEmail: CONTACT_LINKS.email,
    businessPhone: CONTACT_LINKS.phone,
  });

  const text = [
    "New Contact Submission",
    "----------------------",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    "Message:",
    data.message,
  ].join("\n");

  return { html, text };
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: ensureEnv("SMTP_USER"), pass: ensureEnv("SMTP_PASS") },
  tls: { rejectUnauthorized: false },
});

export async function sendContactEmail(data: ContactPayload) {
  const { html, text } = formatContactEmail(data);

  // If we couldn't preload from disk (very unlikely if you placed it in server/assets),
  // fall back to fetching from a URL (so email still works).
  let content: Buffer | undefined = logoBytes ?? undefined;
  if (!content) {
    const base = process.env.PUBLIC_BASE_URL || "https://www.etivestudios.com";
    const url = data.logoUrl || new URL("/attached_assets/ETIVE_black_red_white_bg.png", base).toString();
    try {
      const resp = await fetch(url);
      console.log("[mailer] fetch logo", url, resp.status);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      content = Buffer.from(await resp.arrayBuffer());
    } catch (e) {
      console.warn("[mailer] failed to fetch logo:", e);
    }
  }

  await transporter.sendMail({
    from: `"Website Contact" <${ensureEnv("SMTP_USER")}>`,
    to: CONTACT_LINKS.email,
    subject: "New Contact Form Submission",
    html,
    text,
    attachments: content
      ? [
          {
            filename: "ETIVE_black_red_white_bg.png",
            content,             // use bytes (no filesystem path)
            cid: "logoBanner",   // must match template's imgSrc
            contentType: "image/png",
          },
        ]
      : [], // still sends even if logo missing
  });
}