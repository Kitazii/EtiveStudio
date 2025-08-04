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
const templateSource = await fs.readFile(
    path.join(__dirname, '../server/email-templates/contact.html'),
    'utf-8'
  );
  contactTemplate = Handlebars.compile(templateSource);
}

// Safe to call after initializeMailer()
export function formatContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!contactTemplate) {
    throw new Error('Mailer not initialized – call initializeMailer() first');
  }
  return {
    html: contactTemplate({
      name: data.name,
      email: data.email,
      message: data.message.replace(/\n/g, '<br/>'),
    }),
    text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
  };
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
  tls: { rejectUnauthorized: false },
});

/**
 * Send the contact‐form email, including attachments.
 */
export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const mail = formatContactEmail(data);

  await transporter.sendMail({
    from: `"Website Contact" <${process.env.SMTP_USER}>`,
    to: CONTACT_LINKS.email,
    subject: 'New Contact Form Submission',
    ...mail,
    attachments: [
      {
        filename: 'ETIVE_black_red_white_bg.png',
        path: path.join(__dirname, '../attached_assets/ETIVE_black_red_white_bg.png'),
        cid: 'logoBanner',
      },
    ],
  });
}