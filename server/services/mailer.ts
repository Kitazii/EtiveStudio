import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { CONTACT_LINKS } from '../models/contact';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let contactTemplate: Handlebars.TemplateDelegate | null = null;

// Call this once at app startup:
export async function initializeMailer() {
  const templatePath = path.resolve(
      process.cwd(),           // → your project root
      'server',
      'email-templates',
      'contact.html'
    );
  const templateSource = await fs.readFile(templatePath, 'utf-8');
  contactTemplate = Handlebars.compile(templateSource);
}

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  logoUrl?: string;
};

function ensureEnv(name: string): string {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return val;
}

// Safe to call after initializeMailer()
export function formatContactEmail(data: ContactPayload) {
  if (!contactTemplate) {
    throw new Error('Mailer not initialized – call initializeMailer() first');
  }

  const html = contactTemplate({
    name: data.name,
    email: data.email,
    // Preserve line breaks:
    messageHtml: data.message.replace(/\n/g, "<br/>"),
    imgSrc: "cid:logoBanner",
    businessEmail: CONTACT_LINKS.email,
    businessPhone: CONTACT_LINKS.phone,
  });

  const text = [
    `New Contact Submission`,
    `----------------------`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Message:`,
    data.message,
  ].join("\n");

  return { html, text };
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ensureEnv("SMTP_USER"),
    pass: ensureEnv("SMTP_PASS"),
  },
  secure: true, // Use SSL/TLS
  port: 465, // Secure SMTP port
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  }
});

/**
 * Send the contact‐form email, including attachments.
 */
export async function sendContactEmail(data: ContactPayload) {
  const mail = formatContactEmail(data);

  // Resolve logo path relative to project root
  const logoPath = path.join(process.cwd(), 'attached_assets', 'ETIVE_black_red_white_bg.png');

  await transporter.sendMail({
    from: `"Website Contact" <${ensureEnv("SMTP_USER")}>`,
    to: CONTACT_LINKS.email,
    subject: 'New Contact Form Submission',
    html: mail.html,
    text: mail.text,
    attachments: [
      {
        filename: 'ETIVE_black_red_white_bg.png',
        path: logoPath,
        cid: 'logoBanner',
        contentType: 'image/png',
      },
    ],
  });
}