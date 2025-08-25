import { RequestHandler } from 'express';
import { insertContactSchema } from '@shared/schema';
import { storage } from '../storage';
import { sendContactEmail } from '../services/mailer';

import { assetUrl } from "../utils/url";

export const createContact: RequestHandler = async (req, res) => {
  const result  = insertContactSchema.safeParse(req.body);
  if (!result .success) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: result .error.errors,
    });
    return;
  }

  const { name, email, message } = result .data;

    // Build absolute logo URL dynamically for this request
  const logoUrl = assetUrl(req, "/attached_assets/ETIVE_black_red_white_bg.png");

  // send the email (attachments, template, etc. all handled in mailer)
  await sendContactEmail({ name, email, message, logoUrl });

  const contact = await storage.createContact(result.data);
  res.json({ success: true, contact });
};

export const getAllContacts: RequestHandler = async (_req, res) => {
  const contacts = await storage.getContacts();
  res.json(contacts);
};