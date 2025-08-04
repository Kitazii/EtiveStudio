import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";
import { CONTACT_LINKS } from "./models/contact";

import fs from "fs/promises";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";



export async function registerRoutes(app: Express): Promise<Server> {

  // derive __dirname just once at the top of the module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // cache the compiled template
  const templateSource = await fs.readFile(
    path.join(__dirname, "../server/email-templates/contact.html"),
    "utf-8"
  );

  const compileContact = Handlebars.compile(templateSource);

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);

      // Send email notification
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      });

      const html = compileContact({
        name: contactData.name,
        email: contactData.email,
        message: contactData.message.replace(/\n/g, "<br/>"),
      });

      await transporter.sendMail({
        from: `"Website Contact" <${process.env.SMTP_USER}>`,
        to: CONTACT_LINKS.email, // or CONTACT_LINKS.email if imported
        subject: "New Contact Form Submission",
        text: `
          Name: ${contactData.name}
          Email: ${contactData.email}
          Message: ${contactData.message}
        `,
        html
      ,
      attachments: [
        {
          filename: "ETIVE_black_red_white_bg.png",
          path: path.join(__dirname, "../attached_assets/ETIVE_black_red_white_bg.png"), // wherever your logo lives
          cid: "logoBanner",                               // same as in the img src
        },
      ],
      });

      const contact = await storage.createContact(contactData);
      
      res.json({ success: true, contact });
    } catch (error) {
       console.error("Email error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contacts" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
