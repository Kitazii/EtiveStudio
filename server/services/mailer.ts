import sgMail, { MailDataRequired } from "@sendgrid/mail";
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";
import { CONTACT_LINKS } from "../models/contact";

let contactTemplate: Handlebars.TemplateDelegate | null = null;

function ensureEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

// Call once at server start
export async function initializeMailer() {
  const key = ensureEnv("SENDGRID_API_KEY");
  if (!key.startsWith("SG.")) throw new Error("SENDGRID_API_KEY looks wrong");
  sgMail.setApiKey(key);

  const templatePath = path.resolve(
    process.cwd(),
    "server",
    "email-templates",
    "contact.html"
  );
  const src = await fs.readFile(templatePath, "utf-8");
  contactTemplate = Handlebars.compile(src);
}

type ContactPayload = { name: string; email: string; message: string };

export function formatContactEmail(d: ContactPayload) {
  if (!contactTemplate) throw new Error("Mailer not initialized");
  const html = contactTemplate({
    name: d.name,
    email: d.email,
    messageHtml: d.message.replace(/\n/g, "<br/>"),
    imgSrc: "cid:logoBanner",
    businessEmail: CONTACT_LINKS.email,
    businessPhone: CONTACT_LINKS.phone,
  });
  const text = `New Contact Submission
----------------------
Name: ${d.name}
Email: ${d.email}
Message:
${d.message}`;
  return { html, text };
}

export async function sendContactEmail(data: ContactPayload) {
  const { html, text } = formatContactEmail(data);

  // inline logo
  const logoPath = path.join(
    process.cwd(),
    "attached_assets",
    "ETIVE_black_red_white_bg.png"
  );
  const logoBase64 = (await fs.readFile(logoPath)).toString("base64");

  const msg: MailDataRequired = {
    from: {
      email: ensureEnv("SENDGRID_FROM_EMAIL"),
      name: process.env.SENDGRID_FROM_NAME || "Etive Studio - Website Contact",
    },
    to: CONTACT_LINKS.email,                 // your inbox
    subject: "Etive Studio: New Contact Form Submission",
    html,
    text,
    replyTo: data.email,                     // replies go to the visitor
    categories: ["contact-form"],
    attachments: [
      {
        content: logoBase64,
        filename: "ETIVE_black_red_white_bg.png",
        type: "image/png",
        disposition: "inline",
        content_id: "logoBanner",            // MUST be snake_case for SendGrid
      },
    ],
    trackingSettings: {
    clickTracking: { enable: false },   // transactional-friendly
    openTracking: { enable: false },    // optional; disable if you don't need it
    }
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error: any) {
    console.error('SendGrid Error:', error.response?.body || error);
    throw error;
  }
}